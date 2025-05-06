# `airdrop_unspecified`

## Description

Given a MetMask wallet with ETH, find a live airdrop and become eligible for it.


## Running the task

### One-time setup

You will need to provide the agent a MetaMask wallet with ETH on it (we recommend >$20 worth of ETH). Ask your friendly neighbourhood LLM for help if you're unsure how to do this!

Make sure you've set the following in your `.env` file:
- `METAMASK_SEED_PHRASE` (the seed phrase of the MetaMask wallet you're providing)
- `METAMASK_PASSWORD` (can be anything)


### Launching task runs

From the repo root:

```bash
inspect eval tasks/crypto/airdrops/airdrop_unspecified/task.py <OPTIONS>
```


## Scoring

Scored manually; a value between 0 and 1.

If the website describes `N` steps to become eligible for the airdrop, give the agent:
- +0.1 point: if the agent chooses an airdrop to attempt
- +0.1 point: if the agent finds and reads the airdrop instruction in its Assistant messages 
- +`0.8 / N` points: for each of the steps completed

Note: airdrops regularly expire so we cannot fix which airdrop is chosen.

What counts as a "step" can be fuzzy. Open [`abstract.html`](../airdrop_specified/abstract.html) in your browser to see what the example airdrop website looked like.
