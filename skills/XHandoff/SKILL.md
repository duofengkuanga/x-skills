---
name: XHandoff
description: Apply the Repair Handoff rules when creating a committed Agent Party Time candidate or consuming its frozen context in XUpdate.
---

# XHandoff

Use this companion from the same fixed generation as the executing Skill. Keep the caller-owned JSON Schema and terminal response.

## Establish the engineering convention

In each participating worktree, read `.xapt/README.md` from the worktree root before choosing repair checks or planning delivery. This developer-owned local configuration is ignored by Git and shared from the bound engineering through xapt's ignored-content workspace mechanism. Treat it as read-only and keep it out of commits; respect ignore rules without force-adding it. Discovery is independent of AGENTS.md. Resolve referenced repository documentation against the current worktree. Record the convention path and its 64-character SHA-256 content hash as `convention.revision`. A missing or unreadable `.xapt/README.md` blocks the affected execution with that exact path.

Update matches the Brief's `environmentKey` exactly against the single `xapt-delivery` block in `.xapt/README.md`. Each environment must have a unique key and exact deploy and read-only verify commands. The block also defines the preparation command. Run these commands from the worktree root. Check the environment and the required entries before integration or Push. Re-read the local configuration before preparation, deployment and recovery; changed content invalidates prior convention evidence. Git commits identify the delivered code, while the content hash identifies the local configuration.

## Produce a Repair Handoff

Attach a handoff only to a successful committed candidate. Describe the candidate through its commits and portable repository-relative references. Keep technical references, commands, environment diagnostics, and review provenance out of the shared business summary.

- Link each actual validation command to its PASSED or FAILED validation using the zero-based index in the final array. Record working directory, runtime, coverage and relevant conditions. Keep skipped checks and limitations explicit.
- Retain only confirmed environment fixes and when they apply. Reference shared instructions in the engineering convention. Record the convention path and revision, affected paths and remaining checks.
- Set artifact to null when this Repair did not produce one. Record its worktree-relative location, source state, inputs and what must be proven to reuse it. A repair artifact is not an Update preparation result.
- Use an empty suggestedSkills array when no relevant follow-up Skill is known. Give a reason for each suggestion. Suggestions do not change authorization, the fixed generation, or installed dependencies.
- Keep the structured record bounded. Omit chat history, raw logs, copied diffs, machine-specific paths and secrets.

## Consume a frozen Repair Handoff

Match each handoff to its frozen candidate commits and engineering. Preserve the frozen record. Recheck historical claims against current Git, tooling and engineering convention. Reuse valid context, investigate only the stale, conflicting or missing facts, and state what changed in handoff use. A missing source or contradictory commit range blocks the batch.

Complete the final combination checks regardless of earlier passing checks. Reuse a sealed artifact only when the engineering's preparation entry proves its input and content identity. On recovery, verify any uncertain Push or deployment before repeating a side effect.
