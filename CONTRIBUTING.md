# Contributing

Thank you for your interest in contributing! This repository contains multiple packages and templates (JavaScript and TypeScript). The guidelines below will help your contributions get accepted quickly.

## Table of contents
- Getting started
- Reporting issues
- Working on changes
- Pull request process
- Coding style & tests
- Commit messages
- Reviewing and merging
- Security and license

## Getting started

- Fork the repo and create a topic branch: `git checkout -b feat/my-feature`
- Install dependencies in the package you will modify (for example):

```
npm install
```

- Run the project's tests for the package you're changing (see the package's `package.json`):

```
npm test
```

If your change touches multiple packages, run install and tests in each affected package.

## Reporting issues

When opening an issue, include:
- A short, descriptive title
- A clear description of the problem or feature request
- Steps to reproduce (when applicable)
- Expected behavior and actual behavior
- Version information (package version, Node.js version, OS)

Use Issues for tracking bugs and feature requests — we may ask follow-up questions or request a small reproducible example.

## Working on changes

- Create a focused branch per change: `feat/`, `fix/`, or `chore/` prefixes are preferred (example: `fix/healthcheck-logging`).
- Keep PRs small and focused — smaller PRs are reviewed and merged faster.
- Update or add tests covering your change. Ensure tests pass locally before opening a PR.

## Pull request process

1. Push your branch to your fork and open a pull request against this repository's `main` (or the target branch specified in the issue).
2. In the PR description, include:
   - A summary of the change
   - Related issue number (if any)
   - How to test the change locally
3. Link to any relevant discussion or design notes.
4. Maintain CI green: fix lint, type, and test failures reported by CI.

PR checklist (fill before requesting review):
- [ ] Tests added/updated
- [ ] Linting and formatting applied
- [ ] Type checks pass (for TypeScript changes)
- [ ] Documentation updated (if needed)

## Coding style & tests

- Follow existing patterns present in the codebase (JS or TS). Use the linters and formatters configured for the package (for example `eslint` and `prettier` if present).
- For TypeScript changes, make sure the code compiles: `tsc --noEmit` or the package `build` script.
- Add unit tests for bug fixes and new features. Tests should be deterministic and fast.

## Commit messages

Use Conventional Commits style for commit messages where possible. Examples:

```
feat(router): add support for X
fix(db): handle null connections
chore(deps): bump dependency Y
```

Keep each commit focused and descriptive.

## Reviewing and merging

- A maintainer will review your PR and may request changes. Please address review comments promptly.
- Squash or rebase your branch if requested by the maintainers to keep history tidy.

## Security

If you discover a security vulnerability, please do not open a public issue. Instead, contact the maintainers privately so the issue can be handled responsibly.

## License and copyright

By contributing, you agree that your contributions will be licensed under the project's existing license. Do not submit third-party copyrighted code unless you have the right to do so and you include license headers as appropriate.

## Questions or help

If you're unsure where to start, open an issue asking for guidance and maintainers will help you find a good first task.

Thanks again — we appreciate your contributions!
