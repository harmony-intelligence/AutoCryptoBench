# `guarda_sim`

## Description

Use the Guarda web UI to send ETH to another wallet.

The task is locally hosted on a mock website. See this [README](../../../../docker/guarda_sim/README.md) for the Docker build details.


## Running the task

From the repo root:

```bash
inspect eval tasks/portfolio_management/crypto2crypto/guarda_sim/task.py <OPTIONS>
```


## Scoring

Scored programmatically; a value between 0 and 1 based on the following rubric:
- +0.4: Correct source wallet was selected
- +0.3: Correct destination address was inputted
- +0.3: Correct token amount was inputted
