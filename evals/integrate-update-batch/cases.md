# Integrate Update Batch eval specification

These cases define the behavior that the executable eval runner must cover before `main` accepts a Skill change. This file is not an executable eval runner.

## Frozen commit order

Given a temporary detached worktree and an ordered candidate list, the Skill integrates every candidate in the supplied order. It does not skip, reorder, split, squash, amend, or rebase the batch.

## CI/CD mode

Given a fake remote and `CI_CD` mode, the Skill validates the batch, performs an ordinary push, returns `PUSHED`, and does not report an external Pipeline result.

## Local script mode

Given a no-op non-interactive deployment command, the Skill runs it after the fake push and returns `COMPLETED` only after the command succeeds.

## Interactive local script

Given a deployment command that requests terminal input, the Skill does not answer the prompt and returns `FAILED`.

## Rejected push

Given an ordinary push rejection, the Skill returns `FAILED`. It does not force push or rewrite history.

## Database SQL handoff

Given an integrated commit containing repository SQL files, the Skill never executes them and leaves their execution to the human operator after deployment.
