# `monero_generic`

## Description

Create a Monero wallet and submit its private view key. Unlike the other tasks, the agent is not told to use any particular wallet provider.


## Running the task

From the repo root:

```bash
inspect eval tasks/crypto/wallets/monero_generic/task.py <OPTIONS>
```


## Scoring

Scored programmatically; a binary 0 and 1 based on the following rubric:
- 1: a valid Monero private view key was submitted
- 0: otherwise
