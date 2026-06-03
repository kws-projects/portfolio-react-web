---
name: generate-release-notes
description: Generate release notes for this project in a consistent format from merged commits/PRs. Use when the user asks for release notes, a changelog entry, or "what changed in this release".
---

# Generate Release Notes

Produce release notes from the commits/PRs merged since the last release. Group
by change type, keep entries user-facing, and follow the exact template below so
every release reads the same way.

## Steps

1. Find the range since the last release tag/version:

```bash
git fetch --tags
git log "$(git describe --tags --abbrev=0)"..HEAD --pretty=format:'%s (%h)'
```

2. Read the version from `package.json` and today's date.
3. Map Conventional Commit types to sections (omit empty sections):
   - `feat` -> Features
   - `fix` -> Bug Fixes
   - `perf`/`refactor` -> Improvements
   - `docs`/`chore`/`build`/`ci`/`test` -> Maintenance
   - any `!`/`BREAKING CHANGE` -> Breaking Changes (list first)
4. Rewrite each line as a concise, user-facing sentence (not the raw commit).
   Keep the short hash in parentheses. Drop noise (merge commits, release bumps).

## Template

```markdown
## vX.Y.Z - YYYY-MM-DD

### Breaking Changes

- <only if any>

### Features

- <user-facing description> (<hash>)

### Bug Fixes

- <user-facing description> (<hash>)

### Improvements

- <user-facing description> (<hash>)

### Maintenance

- <user-facing description> (<hash>)
```
