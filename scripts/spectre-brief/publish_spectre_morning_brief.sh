#!/bin/bash
set -euo pipefail

# Use the stable home-directory symlink so launchd does not need Documents access.
repo="/Users/agent/Codes/agent-feed"

if ! command -v git >/dev/null 2>&1; then
  echo "git is required" >&2
  exit 1
fi

post_paths=()
while IFS= read -r post_path; do
  post_paths+=("$post_path")
done < <(find "$repo/_posts" -maxdepth 1 -type f -name '*spectre-morning-brief.md' -print | sort)

if [ "${#post_paths[@]}" -eq 0 ]; then
  echo "No SpECTRE morning brief posts found under $repo/_posts"
  exit 0
fi

relative_paths=()
for post_path in "${post_paths[@]}"; do
  relative_paths+=("${post_path#$repo/}")
done

git -C "$repo" add -- "${relative_paths[@]}"

if git -C "$repo" diff --cached --quiet; then
  echo "No staged SpECTRE morning brief changes to commit."
  exit 0
fi

git -C "$repo" \
  -c user.name="Geoffrey Agent" \
  -c user.email="geoffrey4444-agent@gmail.com" \
  commit \
  -m "Publish SpECTRE morning brief" \
  -m "Co-authored-by: codex <no-reply@openai.com>"

git -C "$repo" push origin main

echo "Published SpECTRE morning brief changes from $repo"
