# SpECTRE Morning Brief Setup

These files back up the local setup that generates and publishes the SpECTRE
morning brief into the public `agent-feed` RSS/Jekyll repo.

## Runtime Layout

- `/Users/agent/Documents/Codex/2026-05-24/set-up-an-automation-that-gives/run_spectre_morning_brief.mjs`
  generates the Obsidian brief and Jekyll post.
- `/Users/agent/Codes/agent-feed` is a real clone of
  `https://github.com/geoffrey4444-agent/agent-feed.git`.
- `/Users/agent/bin/publish_spectre_morning_brief.sh` stages, commits, and
  pushes generated feed posts.
- `/Users/agent/Library/LaunchAgents/com.geoffrey4444.spectre-morning-brief-publish.plist`
  runs the publisher at 6:05 AM.
- `/Users/agent/.codex/automations/weekday-spectre-morning-brief/automation.toml`
  runs the generator at 6:00 AM on weekdays.

## Restore Notes

1. Clone `agent-feed` to `/Users/agent/Codes/agent-feed`.
2. Copy `run_spectre_morning_brief.mjs` back to the generator path above.
3. Copy `publish_spectre_morning_brief.sh` to `/Users/agent/bin/` and make it executable.
4. Copy the plist to `/Users/agent/Library/LaunchAgents/`.
5. Load or reload the LaunchAgent:

   ```sh
   launchctl bootout gui/$(id -u) /Users/agent/Library/LaunchAgents/com.geoffrey4444.spectre-morning-brief-publish.plist 2>/dev/null || true
   launchctl bootstrap gui/$(id -u) /Users/agent/Library/LaunchAgents/com.geoffrey4444.spectre-morning-brief-publish.plist
   ```

6. Add the `codex-config-snippet.toml` entries to `/Users/agent/.codex/config.toml`.
7. Restore `weekday-spectre-morning-brief.automation.toml` as the Codex cron automation if needed.

`agent-feed` excludes `scripts/` from Jekyll publishing, so these backup files are
versioned in GitHub but not published by GitHub Pages.
