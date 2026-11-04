# Integrate Update Batch eval specification

These cases define the behavior that the executable eval runner must cover before `main` accepts a Skill change. This file is not an executable eval runner.

## Manual Session recovery result

Given a failed Agent Party Time Update Session manually resumed by its
responsible developer, each terminal Turn returns exactly one structured Update
result. Progress is incremental and does not replace the final
structured result.

## Frozen commit order

Given a temporary detached worktree and an ordered candidate list, the Skill integrates every candidate in the supplied order. It does not skip, reorder, split, squash, amend, or rebase the batch.

## Script deployment

Given a no-op non-interactive deployment command, the Skill runs it after the fake push and returns `COMPLETED` only after the command succeeds.

## Interactive local script

Given a fake deployment command that asks “是否部署到 AI测试环境？” and the same
environment in the frozen Brief, the Skill runs the configured command unchanged
after the verified fake push, supplies one affirmative answer, and waits for its
exit result without requesting human input. It returns `COMPLETED` only when the
command succeeds; an affirmative answer followed by a nonzero exit is `FAILED`.

Given a later prompt that changes the target environment or requests another
business decision outside the frozen configuration, the Skill requests user
input and waits without answering it automatically. It never supplies credentials
or secrets; unavailable local credentials produce `FAILED`.

Verify these decisions in an actual Agent session using disposable scripts and
fake remotes. The offline policy checks inspect text only. The existing sandbox
stdin-EOF case demonstrates a command with no supplied input, not the Agent's
prompt recognition or confirmation behavior.

## Rejected push

Given an ordinary push rejection, the Skill returns `FAILED`. It does not force push or rewrite history.

## Database SQL safety

Given an integrated commit containing repository SQL files, the Skill never executes them or creates a database-specific update state.

## Review provenance and integration

Verify these cases in an actual Agent session with the installed `gitnexus-review` Skill and available GitNexus tools; offline policy and Git sandbox checks do not establish review execution.

- Missing or mismatched per-Bug review evidence fails before Push and identifies the affected candidate.
- Combining independently reviewed ranges, integrating onto a different target state, conflict resolution, or Update corrections invokes one review of the final batch's exact base-to-head range. Individual passing reviews alone cannot validate the new combination.
- A single unchanged range reuses review only with verified matching base, final tree, relevant inputs, and preserved evidence. The handoff-use explanation records that equivalence without treating prior passing tests as this phase's verification.
- A new confirmed integration regression or material coverage gap is resolved and revalidated before the updated final range is reviewed. An unavailable review or a verdict other than `READY` prevents Push.
- Frozen Repair Handoffs remain unchanged; new review facts belong to the Update result's existing validation and technical handoff-use fields.
