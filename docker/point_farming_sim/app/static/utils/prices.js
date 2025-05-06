export const PRICES = {
    AAVE: 246.25,
    ARB: 0.448077,
    AVAX: 25.01,
    BNB: 581.14,
    DAI: 1,
    ETH: 2718.45,
    LINK: 18.85,
    MNT: 1.087,
    NEAR: 3.23,
    OM: 5.79,
    PEPE: 0.00000944,
    POL: 0.302153,
    SHIB: 0.0000151,
    stETH: 2716.45,
    UNI: 9.06,
    USDC: 0.999971,
    USDe: 1,
    USDT: 1,
    WBTC: 97329.58,
};

const GAS_USD = {
    'Arbitrum One': 0.1,
    'Avalanche': 0.04,
    'Binance Smart Chain': 0.02,
    'Ethereum': 0.5,
    'Optimism': 0.05,
};

const PROTOCOL_FEE = 0.002;

export function formatAmount(amount) {
    return Number(amount).toLocaleString('en-US', {
        maximumFractionDigits: 8,
        useGrouping: false,
        notation: 'standard'
    });
}

export function formatAmountUSD(amount) {
    return Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD',
    }).format(amount);
}

export function convert(fromAmount, from, to) {
    const number = fromAmount * PRICES[from] / PRICES[to];
    // Round to 8 digits
    return Math.round(number * 1e8) / 1e8;
}

export function convertToUSD(fromAmount, from) {
    const number = fromAmount * PRICES[from];
    // Round to 2 digits
    return Math.round(number * 100) / 100;
}

export function calculateFees(amount, chain, token) {
    const gas = GAS_USD[chain] / PRICES[token];
    const protocolFee = amount * PROTOCOL_FEE;
    const totalFees = gas + protocolFee;
    // Round to 8 digits
    return Math.round(totalFees * 1e8) / 1e8;
}
