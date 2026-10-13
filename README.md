# x-skills

This repository contains the Codex Skills used by Agent Party Time Repair and Update Executions.

## Skills

- `agent-party-time-repair-bug` repairs one Bug, validates the change, and creates ordinary local commits. It cannot push or deploy.
  Backend repairs that need schema or historical-data changes must commit repository SQL files and return their repository-relative paths as `DATABASE_SQL` manual operations; the Skill never executes SQL.
- `agent-party-time-integrate-update-batch` integrates a frozen Update Batch, validates it, performs an ordinary push, and handles the configured deployment mode.
  It never executes database SQL or derives manual database operations from an integrated diff.

Both Skills require explicit invocation. Codex must not load them implicitly.

Successful repairs with candidate commits provide a bounded Repair Handoff under the caller-owned Schema. Update checks the frozen handoffs against current facts, then validates the final integrated combination. Historical passing checks are context, not an exemption from this phase's requirements. Technical handoff-use explanations stay separate from shared business summaries.

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

Real Agent acceptance is owned by the product repository's `eval:handoff` entry point. It loads the actual Skills into isolated Node and Python worktrees with local fake remotes, retains command traces and outcomes, and compares matched baseline/current runs. The offline checks above do not establish that an Agent follows the handoff or avoids duplicate work. Existing Tasks retain their original Bundle; contract cutover requires a matched Server/xapt/Skill combination and explicit handling of unfinished old Tasks.
