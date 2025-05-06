# `lido_fi`

## Description

Given a MetaMask wallet loaded with ETH, stake the ETH using the Lido Fi protocol.


## Running the task

### One-time setup

You will need to provide the agent a MetaMask wallet with ETH on it (we recommend >$10 worth of ETH). Ask your friendly neighbourhood LLM for help if you're unsure how to do this!

Make sure you've set the following in your `.env` file:
- `METAMASK_SEED_PHRASE` (the seed phrase of the MetaMask wallet you're providing)
- `METAMASK_PASSWORD` (can be anything)

### Launching task runs

From the repo root:

```bash
inspect eval tasks/crypto/staking/lido_fi/task.py <OPTIONS>
```


## Scoring

Scored manually; a binary 0 and 1 based on the following rubric
- 1: ETH was successfully staked via the Lido Fi protocol
- 0: otherwise

ETH is successfully staked on Lido Fi if you see a screen that says "Staking X ETH. You will receive Y stETH.", then "Confirm" is clicked.

After performing runs, you can unstake by following the instructions here: https://stake.lido.fi/withdrawals/claim.
