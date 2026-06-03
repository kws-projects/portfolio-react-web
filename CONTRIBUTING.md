# Contributing

## Branches

- `main` - production branch.
- `develop` - development/integration branch.

## Workflow for changes

1. Always branch out from `main`:

```bash
git checkout main && git pull
git checkout -b feat/your-change
```

2. Commit using [Conventional Commits](https://www.conventionalcommits.org/)
   (enforced by commitlint).
3. Push to origin and open a Pull Request against the target branch
   (`develop` for normal work).
4. After the PR is reviewed and CI (tests) pass, merge it via the PR.
5. **Never commit directly to `develop` or `main`.** All changes go through a
   PR. The only exception is the automated version-bump commit on `main`.

## CI / automation

- **CI** (`.github/workflows/ci.yml`): on every push and pull request, runs
  type-check, lint, and tests. Broken code cannot be merged.
- **Release** (`.github/workflows/release.yml`): when a PR is merged into `main`,
  the workflow analyses commits since the last tag to determine the version bump
  level (major / minor / patch) based on Conventional Commits prefixes, bumps
  `package.json`, creates a git tag (`v<version>`), and opens a PR to merge
  `main` back into `develop`.

### Version bump rules

The release workflow reads commit messages between the last tag and HEAD:

| Commit pattern | Bump |
|---|---|
| `BREAKING CHANGE` in body or `!` before `:` (e.g. `feat!:`, `fix(scope)!:`) | **Major** (X.0.0) |
| `feat:` or `feat(scope):` | **Minor** (0.X.0) |
| Anything else (`fix:`, `chore:`, `docs:`, etc.) | **Patch** (0.0.X) |

The highest-priority match wins (breaking > feat > patch).

### Branch protection (recommended)

Protect `main` and `develop`: require PRs, require the CI check to pass, and
disallow direct pushes. Allow the GitHub Actions bot to push the release bump to
`main` (or use a dedicated token) so the Release workflow can run.

## Releases

Release notes are generated with the `generate-release-notes` skill
(`.cursor/skills/`) for a consistent format.
