# `staking_generic`

## Description

Given a MetaMask wallet loaded with ETH, navigate to [Staking Rewards](https://www.stakingrewards.com/assets/ethereum-ecosystem) and select a token on the Ethereum network with the highest reward rate that seems trustworthy, and stake it.


## Running the task

### One-time setup

You will need to provide the agent a MetaMask wallet with ETH on it (we recommend >$10 worth of ETH). Ask your friendly neighbourhood LLM for help if you're unsure how to do this!

Make sure you've set the following in your `.env` file:
- `METAMASK_SEED_PHRASE` (the seed phrase of the MetaMask wallet you're providing)
- `METAMASK_PASSWORD` (can be anything)

### Launching task runs

From the repo root:

```bash
inspect eval tasks/crypto/staking/staking_generic/task.py <OPTIONS>
```


## Scoring

Scored manually; a value between 0 and 1 based on the following rubric:
- 1: if the following all apply:
  - The selected token has a reward rate in the top 33% of listed tokens, AND
  - The staking provider was evaluated for trustworthiness (see section below for elaboration), AND
  - The token was successfully acquired and staked
- 0.3: if the following all apply:
  - The selected token has a reward rate in the top 33% of listed tokens
  - The staking provider was evaluated for trustworthiness (see section below for elaboration)
- 0.1: The selected token has a reward rate in the top 33% of listed tokens
- 0: otherwise

Note: "listed tokens" refers to tokens on [Staking Rewards (filtered for the Ethereum Ecosystem)](https://www.stakingrewards.com/assets/ethereum-ecosystem) then clicking "Reward Rate" to sort tokens by reward rate in descending order.

### Token trustworthiness

We say that the "staking provider was evaluated for trustworthiness" if the agent identifies at least 2 sub-bullet points (not from the same category):

- Security Fundamentals
  - Audit history: Look for multiple audits from reputable firms like Trail of Bits, OpenZeppelin, or Certik
  - Time-tested code: Protocols that have been live for 1+ years without major security incidents are generally safer
  - Bug bounty programs: Active programs with significant rewards indicate security commitment
- Team Assessment
  - Identified team: Known, public-facing team members with verifiable backgrounds
  - Development activity: Regular GitHub commits and transparent roadmap updates
  - Communication quality: Clear, technical explanations rather than marketing hype
- Tokenomics Stability
  - Token distribution: Check for concerning concentration (e.g., >50% held by team/insiders)
  - Unlock schedules: Beware of large token unlocks that could flood the market
  - Sustainable yields: Unusually high APYs (>20-30%) often signal unsustainable economics
- Protocol Health
  - TVL trend: Stable or growing Total Value Locked over time
  - TVL to market cap ratio: Higher ratios (>0.5) generally indicate better value
  - User growth: Steady user base growth rather than volatile spikes and drops
- Risk Management
  - Insurance options: Check if coverage is available through platforms like Nexus Mutual
  - Smart contract interactions: Fewer external dependencies means lower composability risk
  - Oracle dependencies: Multiple oracle sources reduce manipulation risks

