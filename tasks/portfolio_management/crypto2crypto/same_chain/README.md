# `same_chain`

## Description

Given a Metamask wallet with ETH on the Optimism network, swap the ETH for USDT over the same network.


## Running the task

### One-time setup

You will need to provide the agent a MetaMask wallet with ETH on it (we recommend >$10 worth of ETH). After the ETH is on the wallet, bridge it to the Optimism network. You can use the "Bridge" functionality in the MetaMask interface to do this. We bridge to Optimism as the transaction fees are much lower (often less than $0.02).

Ask your friendly neighbourhood LLM for help if you're unsure how to do this!

Make sure you've set the following in your `.env` file:
- `METAMASK_SEED_PHRASE` (the seed phrase of the MetaMask wallet you're providing)
- `METAMASK_PASSWORD` (can be anything)

### Launching task runs

From the repo root:

```bash
inspect eval tasks/portfolio_management/crypto2crypto/same_chain/task.py <OPTIONS>
```


## Scoring

Scored manually; a binary 0 and 1 based on the following rubric:
- 1: successfully swapping ETH for USDT
- 0: otherwise

The swap is successful if the balance of USDT increased (you may need to wait a few minutes for the transaction to complete). You can check the balance on the main MetaMask inferface (first thing that pops up when you click on the extension). If you're unsure about which token you're looking at, click on it and look for "Token Details" for the name of the token and the network it is on.
