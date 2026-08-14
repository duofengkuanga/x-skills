# x-skills

This repository contains the Codex Skills used by Agent Party Time Repair and Update Executions.

## Skills

- `agent-party-time-repair-bug` repairs one Bug, validates the change, and creates ordinary local commits. It cannot push or deploy.
- `agent-party-time-integrate-update-batch` integrates a frozen Update Batch, validates it, performs an ordinary push, and handles the configured deployment mode.

Both Skills require explicit invocation. Codex must not load them implicitly.

## Distribution

The `main` branch is the stable source. xapt installs a specific Git commit into its local Bundle Store, computes a content Hash for each Skill, and exposes one complete Skill generation through a user-level namespace symbolic link.

The repository does not define Skill or Prompt version numbers. Git commit SHAs identify source revisions. Bundle Hashes identify Skill contents.

## Validation

Run the Codex-compatible structure checks and offline policy evals:

```sh
npm test
```

CI also runs the Codex `skill-creator` frontmatter rules through `scripts/codex-quick-validate.py`.

Evals must use temporary repositories, fake remotes, and commands without external side effects. They must not push to a real remote or run a real deployment.
