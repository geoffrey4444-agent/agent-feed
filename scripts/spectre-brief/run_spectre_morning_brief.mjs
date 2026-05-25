#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

process.env.TZ = "America/Los_Angeles";

const repo = "sxs-collaboration/spectre";
const user = "geoffrey4444";
const outbox = "/Users/agent/Documents/AgentVault/Outbox";
const feedRepo = "/Users/agent/Codes/agent-feed";
const maxOngoingIssues = 10;

function run(cmd, args, options = {}) {
  return execFileSync(cmd, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  });
}

function ghJson(args) {
  return JSON.parse(run("gh", args));
}

function pacificDateParts(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: date.getDay(),
  };
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function ymd(date) {
  const parts = pacificDateParts(date);
  return `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`;
}

function hms(date) {
  return `${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

function pacificTimestamp(date) {
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absolute = Math.abs(offsetMinutes);
  return `${ymd(date)} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${sign}${pad(Math.floor(absolute / 60))}${pad(absolute % 60)}`;
}

function previousWeekdayStart(now) {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  do {
    start.setDate(start.getDate() - 1);
  } while (start.getDay() === 0 || start.getDay() === 6);
  return start;
}

function names(items = []) {
  return items.map((item) => item.login).filter(Boolean).join(", ") || "none";
}

function clean(text = "") {
  return text
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/###?\s*(Proposed changes|Upgrade instructions|Code review checklist|Further comments)/gi, "")
    .replace(/-\s*\[[ x]\]\s*.*/gi, "")
    .replace(/#+\s*/g, "")
    .replace(/\r/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sentence(text) {
  const cleaned = clean(text);
  const first = cleaned.match(/.*?[.!?](?:\s|$)/)?.[0]?.trim() || cleaned;
  if (!first) {
    return "";
  }
  return first.length > 220 ? `${first.slice(0, 217)}...` : first;
}

function summary(item) {
  return sentence(item.body) || (item.title.endsWith(".") ? item.title : `${item.title}.`);
}

function markdownLink(item) {
  return `[#${item.number}: ${item.title}](${item.url})`;
}

function dedupe(items) {
  const seen = new Map();
  for (const item of items.flat()) {
    seen.set(item.url, item);
  }
  return [...seen.values()].sort((a, b) => String(b.updatedAt || b.closedAt || "").localeCompare(String(a.updatedAt || a.closedAt || "")));
}

function connectedIssues(extraArgs) {
  const base = ["search", "issues", "--repo", repo, "--limit", "100", "--json", "number,title,url,author,assignees,updatedAt,body,state"];
  return dedupe([
    ghJson([...base, ...extraArgs, `author:${user}`]),
    ghJson([...base, ...extraArgs, `assignee:${user}`]),
    ghJson([...base, ...extraArgs, `mentions:${user}`]),
  ]);
}

function connectedPrs(extraArgs) {
  const base = ["search", "prs", "--repo", repo, "--state", "open", "--limit", "100", "--json", "number,title,url,author,assignees,updatedAt,body"];
  return dedupe([
    ghJson([...base, ...extraArgs, `author:${user}`]),
    ghJson([...base, ...extraArgs, `assignee:${user}`]),
    ghJson([...base, ...extraArgs, `mentions:${user}`]),
  ]);
}

function itemLine(item, activity = "") {
  const meta = `Author: ${item.author?.login || "unknown"}; assignees: ${names(item.assignees)}.`;
  return `- ${markdownLink(item)} - ${meta} ${summary(item)}${activity ? ` ${activity}` : ""}`;
}

function shortLine(item) {
  return `- ${markdownLink(item)} - ${summary(item)}`;
}

function buildBrief({ generatedAt, windowStart, closedPrs, recentPrs, recentIssues, ongoingPrs, ongoingIssues, jekyll, postSlug }) {
  const lines = [];
  if (jekyll) {
    lines.push(
      "---",
      "layout: post",
      'title: "SpECTRE Morning Brief"',
      `date: ${pacificTimestamp(generatedAt)}`,
      `permalink: /spectre-morning-brief/${postSlug}/`,
      "---",
      "",
    );
  } else {
    lines.push("---", 'tags: ["#aiGenerated"]', `generated: "${pacificTimestamp(generatedAt)}"`, `repository: "${repo}"`, `window_start: "${pacificTimestamp(windowStart)}"`, "---", "");
  }

  lines.push("# SpECTRE Morning Brief", "");
  lines.push(`Repository: [${repo}](https://github.com/${repo})`);
  lines.push(`Window start: ${pacificTimestamp(windowStart)}`, "");

  lines.push("## Recently Closed PRs");
  if (closedPrs.length === 0) {
    lines.push("None found.");
  } else {
    for (const pr of closedPrs) {
      lines.push(`- ${markdownLink(pr)} - ${pr.mergedAt ? "Merged" : "Closed"}. ${summary(pr)}`);
    }
  }
  lines.push("");

  lines.push("## Recent Activity");
  if (recentPrs.length === 0 && recentIssues.length === 0) {
    lines.push("None found.");
  } else {
    for (const pr of recentPrs) {
      lines.push(itemLine(pr, `Updated ${pacificTimestamp(new Date(pr.updatedAt))}.`));
    }
    for (const issue of recentIssues) {
      lines.push(itemLine(issue, `Updated ${pacificTimestamp(new Date(issue.updatedAt))}.`));
    }
  }
  lines.push("");

  lines.push(`## Ongoing PRs ${user} Is Connected To`);
  if (ongoingPrs.length === 0) {
    lines.push("None found.");
  } else {
    for (const pr of ongoingPrs) {
      lines.push(shortLine(pr));
    }
  }
  lines.push("");

  lines.push(`## Selected Ongoing Issues ${user} Is Connected To`);
  lines.push(`Most recently updated open issues only; limited to ${maxOngoingIssues} to keep the brief readable.`);
  if (ongoingIssues.length === 0) {
    lines.push("None found.");
  } else {
    for (const issue of ongoingIssues) {
      lines.push(shortLine(issue));
    }
  }
  lines.push("");

  return `${lines.join("\n")}\n`;
}

function main() {
  const generatedAt = new Date();
  const windowStart = previousWeekdayStart(generatedAt);
  const dateSlug = ymd(generatedAt);
  const postSlug = `${dateSlug}-${hms(generatedAt)}`;
  const since = windowStart.toISOString();

  const closedPrs = ghJson([
    "pr",
    "list",
    "--repo",
    repo,
    "--state",
    "closed",
    "--search",
    `closed:>=${since}`,
    "--limit",
    "100",
    "--json",
    "number,title,url,author,assignees,closedAt,mergedAt,body",
  ]);
  const recentPrs = ghJson([
    "search",
    "prs",
    "--repo",
    repo,
    "--state",
    "open",
    "--updated",
    `>=${since}`,
    "--limit",
    "100",
    "--json",
    "number,title,url,author,assignees,updatedAt,body",
  ]);
  const recentIssues = connectedIssues(["--updated", `>=${since}`]);
  const ongoingPrs = connectedPrs([]);
  const ongoingIssues = connectedIssues(["--state", "open"]).slice(0, maxOngoingIssues);

  const outboxPath = path.join(outbox, `${postSlug}-spectre-morning-brief.md`);
  const feedPostPath = path.join(feedRepo, "_posts", `${dateSlug}-${postSlug}-spectre-morning-brief.md`);

  fs.writeFileSync(
    outboxPath,
    buildBrief({ generatedAt, windowStart, closedPrs, recentPrs, recentIssues, ongoingPrs, ongoingIssues, jekyll: false, postSlug }),
  );
  fs.writeFileSync(
    feedPostPath,
    buildBrief({ generatedAt, windowStart, closedPrs, recentPrs, recentIssues, ongoingPrs, ongoingIssues, jekyll: true, postSlug }),
  );

  console.log(`Wrote ${outboxPath}`);
  console.log(`Wrote ${feedPostPath}`);
  console.log("Skipped git publish. The 6:05 AM LaunchAgent publisher will add, commit, and push the feed post.");
}

main();
