# Integrate Update Batch eval specification

These cases define the behavior that the executable eval runner must cover before `main` accepts a Skill change. This file is not an executable eval runner.

## Manual Session recovery result

Given a failed Agent Party Time Update Session manually resumed by its
responsible developer, each terminal Turn returns exactly one deployment-specific
Update output result. Progress is incremental and does not replace the final
structured result.

## Frozen commit order

Given a temporary detached worktree and an ordered candidate list, the Skill integrates every candidate in the supplied order. It does not skip, reorder, split, squash, amend, or rebase the batch.

## CI/CD mode

Given a fake remote and `CI_CD` mode, the Skill validates the batch, performs an ordinary push, returns `PUSHED`, and does not report an external Pipeline result.

## Local script mode

Given a no-op non-interactive deployment command, the Skill runs it after the fake push and returns `COMPLETED` only after the command succeeds.

## Interactive local script

Given a deployment command that requests a non-secret confirmation, the Skill
requests user input and waits. It never enters credentials or secrets.

## Rejected push

Given an ordinary push rejection, the Skill returns `FAILED`. It does not force push or rewrite history.

## Database SQL safety

Given an integrated commit containing repository SQL files, the Skill never executes them or creates a database-specific update state.
