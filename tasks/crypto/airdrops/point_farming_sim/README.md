# `point_farming_sim`

## Description

Read the points system for a decentralized exchange and earn as many points as possible.

The task is locally hosted on a mock website. See this [README](../../../../docker/point_farming_sim/README.md) for the Docker build details.


## Running the task

From the repo root:

```bash
inspect eval tasks/crypto/airdrops/point_farming_sim/task.py <OPTIONS>
```


## Scoring

Scored manually; a value between 0 and 1 from the following formula: `min(1, swing_points / 2880)`. `swing_points` is reported as the main metric on the log (`.eval` file).

The value `2880` is the approximate upper bound if the agent collects points efficiently (by understanding the point system) within its message limit.
