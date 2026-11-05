# x-skills

This repository contains the Codex Skills used by Agent Party Time Repair and Update Executions.

## Skills

- `XBugRepaire` repairs one Bug, validates the change, and creates ordinary local commits. It cannot push or deploy.
  Backend repairs that need schema or historical-data changes must commit repository SQL files and return their repository-relative paths as `DATABASE_SQL` manual operations; the Skill never executes SQL.
- `XUpdate` integrates a frozen Update Batch, validates it, performs an ordinary push, and runs the deployment entry from each engineering convention.
  It never executes database SQL or derives manual database operations from an integrated diff.

`XHandoff` defines the shared discovery and handoff rules. Repair and Update load its verified file from their fixed Skill generation.

Each engineering keeps its version-controlled execution convention at `.xapt/README.md`. The Skills read this fixed path directly; no convention link in `AGENTS.md` is required. Keep runtime, validation, delivery and recovery guidance there, linking existing repository documentation for detail. The single `xapt-delivery` block belongs in this file and its commands run from the repository root.

`XBugRepaire` invokes the installed `gitnexus-review` Skill for every Bug after local validation and commits, including a no-change repair. It pins the attempt's starting and final commits, resolves confirmed defects and material test gaps, and records review evidence in the existing validation and Repair Handoff fields. `XUpdate` checks that evidence for every frozen candidate and reviews the final combination when integration changes its reviewed context. Review failure or unavailable dependencies prevents success; a review never proves that all unknown risks are absent.

Install GitNexus and the official `gitnexus-review` Skill on every executing machine before using these Skills. xapt does not install or update that external dependency. The Skill must be discoverable by the executing Codex; a missing dependency produces an explicit failure rather than an unreviewed repair. Original acceptance scenarios and derived regression scenarios stay distinct, and derived scenarios require evidence connecting them to the actual diff.

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
`XBugRepaire`, `XUpdate` and `XHandoff` are explicit case-sensitive naming exceptions. All other frontmatter, path, and explicit-invocation checks remain required.

Evals must use temporary repositories, fake remotes, and commands without external side effects. They must not push to a real remote or run a real deployment.

Real Agent acceptance is owned by the product repository's `eval:handoff` entry point. It loads the actual Skills into isolated Node and Python worktrees with local fake remotes, retains command traces and outcomes, and compares matched baseline/current runs. The offline checks above do not establish that an Agent follows the handoff or avoids duplicate work. Existing Tasks retain their original Bundle; contract cutover requires a matched Server/xapt/Skill combination and explicit handling of unfinished old Tasks.

After this rename, deploy the matched Server/xapt source and run `xapt skills update` to select the new names for new Tasks. Existing Tasks keep their original names and immutable Bundles; they do not acquire this review requirement retroactively. Complete old Tasks under their pinned rules or explicitly start new Tasks when the new review workflow is required. Do not rewrite their bindings or modify installed historical Bundles.
