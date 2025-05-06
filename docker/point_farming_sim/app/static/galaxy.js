import {
    createNodeFromHTML,
    questItemHTMLTemplate,
    transferButtonHTMLActive,
    transferButtonHTMLInactive,
    transferDetailsHTMLInactive,
    transferDetailsHTMLTemplate,
} from './utils/templates.js';

import { convert, convertToUSD, formatAmount, formatAmountUSD, calculateFees } from './utils/prices.js';


///////////////////////////////////////////////////////////////////////////////
// Constants
///////////////////////////////////////////////////////////////////////////////

const DIALOG_DISPLAY = {
    SHOW: '',
    HIDE: 'display: none;'
};

const SwapSide = {
    SEND: 'Send',
    RECEIVE: 'Receive'
};

const CHAIN_ICONS = {
    'Arbitrum One': 'var(--chain-icon-arbitrum)',
    'Avalanche': 'var(--chain-icon-avalanche)',
    'Binance Smart Chain': 'var(--chain-icon-binance)',
    'Ethereum': 'var(--chain-icon-ethereum)',
    'Optimism': 'var(--chain-icon-optimism)'
};

const TOKEN_ICONS = {
    'AAVE': 'var(--token-icon-AAVE)',
    'ARB': 'var(--token-icon-ARB)',
    'AVAX': 'var(--token-icon-AVAX)',
    'BNB': 'var(--token-icon-BNB)',
    'DAI': 'var(--token-icon-DAI)',
    'ETH': 'var(--token-icon-ETH)',
    'LINK': 'var(--token-icon-LINK)',
    'MNT': 'var(--token-icon-MNT)',
    'NEAR': 'var(--token-icon-NEAR)',
    'OM': 'var(--token-icon-OM)',
    'PEPE': 'var(--token-icon-PEPE)',
    'POL': 'var(--token-icon-POL)',
    'SHIB': 'var(--token-icon-SHIB)',
    'stETH': 'var(--token-icon-stETH)',
    'UNI': 'var(--token-icon-UNI)',
    'USDC': 'var(--token-icon-USDC)',
    'USDe': 'var(--token-icon-USDe)',
    'USDT': 'var(--token-icon-USDT)',
    'WBTC': 'var(--token-icon-WBTC)'
};

const INDEX_TO_TOKEN = {
    0: 'AAVE',
    1: 'ARB',
    2: 'AVAX',
    3: 'BNB',
    4: 'DAI',
    5: 'ETH',
    6: 'LINK',
    7: 'MNT',
    8: 'NEAR',
    9: 'OM',
    10: 'PEPE',
    11: 'POL',
    12: 'SHIB',
    13: 'stETH',
    14: 'UNI',
    15: 'USDC',
    16: 'USDe',
    17: 'USDT',
    18: 'WBTC'
};


///////////////////////////////////////////////////////////////////////////////
// Helper Functions
///////////////////////////////////////////////////////////////////////////////

function isPositiveFloat(str) {
    // If the string is empty or not a string type, return false
    if (!str || typeof str !== 'string') {
        return false;
    }

    // Convert string to number and check if it's a positive float
    const num = parseFloat(str);

    // Check if:
    // 1. It's a valid number (not NaN)
    // 2. It's positive
    // 3. It's finite
    // 4. The string doesn't start with '+' (which parseFloat accepts but might not be desired)
    // 5. The string matches a decimal number pattern (allows trailing zeros)
    return !isNaN(num) &&
           num > 0 &&
           isFinite(num) &&
           !str.startsWith('+') &&
           /^\d*\.?\d+$/.test(str);
}


///////////////////////////////////////////////////////////////////////////////
// Swap Interface Class
///////////////////////////////////////////////////////////////////////////////

class SwapState {
    constructor() {
        this.swapSide = SwapSide.SEND;
        this.selectedTokenSend = 'ETH';
        this.selectedChainSend = 'Ethereum';
        this.selectedTokenReceive = 'ETH';
        this.selectedChainReceive = 'Arbitrum One';
    }

    switchSendReceive() {
        [this.selectedTokenSend, this.selectedTokenReceive] =
            [this.selectedTokenReceive, this.selectedTokenSend];
        [this.selectedChainSend, this.selectedChainReceive] =
            [this.selectedChainReceive, this.selectedChainSend];
    }
}

class SwapInterface {
    constructor() {
        this.state = new SwapState();
        this.initializeElements();
        this.setupEventListeners();
        // Initialize balances as empty objects for all chains
        this.balances = {
            'Arbitrum One': {},
            'Avalanche': {},
            'Binance Smart Chain': {},
            'Ethereum': {},
            'Optimism': {}
        };
        // Fetch initial points and transactions
        fetch('/api/points')
            .then(response => response.json())
            .then(data => {
                this.updatePointsAndTransactions(data.points, data.num_transactions);
            })
            .catch(error => {
                console.error('Error fetching points:', error);
            });
        // Fetch initial balances
        this.fetchBalances()
            .then(() => {
                // Only update UI after balances are fetched
                this.updateSwapBalance();
                this.updateTokenListBalances();
            });
        // Trigger input event on amount field
        this.elements.amountField.dispatchEvent(new Event('input'));
        // Update quest list
        this.updateQuestList();
    }

    initializeElements() {
        this.elements = {
            infoDialog: document.getElementById('radix-:r2h:'),
            selectTokenDialog: document.getElementById('select-token'),
            selectChainDialog: document.getElementById('select-chain'),
            tokenList: document.getElementById('token-list'),
            chainList: document.getElementById('chain-list'),
            amountField: document.getElementById('input-amount'),
            transferDetails: document.getElementById('transfer-details'),
            transferButton: document.getElementById('transfer-button-container'),
        };
    }

    setupEventListeners() {
        this.setupDialogListeners();
        this.setupTokenListeners();
        this.setupChainListeners();
        this.setupSwitchListener();
        this.setupAmountFieldListener();
        this.setupTransferButtonListener();
    }

    setupDialogListeners() {
        // Info dialog
        document.getElementById('info-icon')
            .addEventListener('click', () => this.showDialog(this.elements.infoDialog));
        document.getElementById('info-dialog-close')
            .addEventListener('click', () => this.hideDialog(this.elements.infoDialog));

        // Token selection dialog
        document.getElementById('select-token-open-send')
            .addEventListener('click', () => this.openTokenSelection(SwapSide.SEND));
        document.getElementById('select-token-open-receive')
            .addEventListener('click', () => this.openTokenSelection(SwapSide.RECEIVE));
        document.getElementById('select-token-close')
            .addEventListener('click', () => this.hideDialog(this.elements.selectTokenDialog));

        // Chain selection dialog
        document.getElementById('select-chain-open')
            .addEventListener('click', () => this.showDialog(this.elements.selectChainDialog));
        document.getElementById('select-chain-back')
            .addEventListener('click', () => this.handleChainDialogBack());
        document.getElementById('select-chain-close')
            .addEventListener('click', () => this.handleChainDialogClose());

        // Add click away listener for info dialog
        document.addEventListener('click', (event) => {
            const infoDialog = this.elements.infoDialog;
            const infoIcon = document.getElementById('info-icon');
            if (infoDialog.style.display !== 'none' &&
                !infoDialog.contains(event.target) &&
                !infoIcon.contains(event.target)) {
                this.hideDialog(infoDialog);
            }
        });

        // Add click away listener for select token dialog
        document.addEventListener('click', (event) => {
            const selectTokenDialog = this.elements.selectTokenDialog;
            const sendTokenButton = document.getElementById('select-token-open-send');
            const receiveTokenButton = document.getElementById('select-token-open-receive');
            const chainBackButton = document.getElementById('select-chain-back');

            if (selectTokenDialog.style.display !== 'none' &&
                !selectTokenDialog.contains(event.target) &&
                !sendTokenButton.contains(event.target) &&
                !receiveTokenButton.contains(event.target) &&
                !chainBackButton.contains(event.target)) {
                this.hideDialog(selectTokenDialog);
            }
        });

        // Add click away listener for select chain dialog
        document.addEventListener('click', (event) => {
            const selectChainDialog = this.elements.selectChainDialog;
            const chainCloseButton = document.getElementById('select-chain-close');
            const selectChainOpen = document.getElementById('select-chain-open');

            if (selectChainDialog.style.display !== 'none' &&
                !selectChainDialog.contains(event.target) &&
                !chainCloseButton.contains(event.target) &&
                !selectChainOpen.contains(event.target)) {
                this.hideDialog(selectChainDialog);
            }
        });
    }

    setupTokenListeners() {
        Array.from(this.elements.tokenList.children).forEach(token => {
            token.addEventListener('click', () => {
                const tokenName = token.querySelector('.text-sm.font-bold.leading-tight').textContent;
                if (this.state.swapSide === SwapSide.SEND) {
                    this.state.selectedTokenSend = tokenName;
                } else {
                    this.state.selectedTokenReceive = tokenName;
                }
                this.updateSwap();
                this.hideDialog(this.elements.selectTokenDialog);
            });
        });
    }

    setupChainListeners() {
        Array.from(this.elements.chainList.children).forEach(chain => {
            chain.addEventListener('click', () => {
                const chainName = chain.querySelector('.text-sm.font-bold').textContent.trim();
                if (this.state.swapSide === SwapSide.SEND) {
                    this.state.selectedChainSend = chainName;
                } else {
                    this.state.selectedChainReceive = chainName;
                }
                this.updateSelectTokenDialog();
                this.updateSwap();
                this.hideDialog(this.elements.selectChainDialog);
                this.updateTokenListBalances();
            });
        });
    }

    setupSwitchListener() {
        document.getElementById('switch-send-receive').addEventListener('click', () => {
            this.state.switchSendReceive();
            this.updateSwap();
        });
    }

    setupAmountFieldListener() {
        this.elements.amountField.addEventListener('input', () => {
            this.updateTransferDetails();
        });
    }

    setupTransferButtonListener() {
        this.elements.transferButton.addEventListener('click', () => {
            console.log('Transfer button clicked');
            const sendChain = this.state.selectedChainSend;
            const sendToken = this.state.selectedTokenSend;
            const receiveChain = this.state.selectedChainReceive;
            const receiveToken = this.state.selectedTokenReceive;
            const sendAmount = parseFloat(this.elements.amountField.value);
            const sendAmountUSD = convertToUSD(sendAmount, sendToken);
            const fees = calculateFees(sendAmount, sendChain, sendToken);
            const feesUSD = convertToUSD(fees, sendToken);
            const receiveAmount = convert(sendAmount - fees, sendToken, receiveToken);

            fetch('/api/transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sendChain,
                    sendToken,
                    receiveChain,
                    receiveToken,
                    sendAmount,
                    sendAmountUSD,
                    receiveAmount,
                    feesUSD,
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Transfer response:', data);
                // Clear the amount field
                this.elements.amountField.value = '';
                this.elements.amountField.dispatchEvent(new Event('input'));
                // Update points and transactions
                this.updatePointsAndTransactions(data.points, data.num_transactions);
                // Fetch balances again
                this.fetchBalances().then(() => {
                    // Only update UI after balances are fetched
                    this.updateSwapBalance();
                    this.updateTokenListBalances();
                });
                // Update quest list
                this.updateQuestList();
            })
            .catch(error => {
                console.error('Transfer error:', error);
            });
        });
    }

    updateSwap() {
        this.updateTokenAndChain('send', this.state.selectedTokenSend, this.state.selectedChainSend);
        this.updateTokenAndChain('receive', this.state.selectedTokenReceive, this.state.selectedChainReceive);
        this.updateSwapBalance();
    }

    updateTokenAndChain(side, token, chain) {
        // Update token
        document.getElementById(`${side}-token`).innerText = token;
        const tokenIcon = document.getElementById(`${side}-token-icon`);
        tokenIcon.style.backgroundImage = TOKEN_ICONS[token];
        tokenIcon.alt = token;

        // Update chain
        document.getElementById(`${side}-chain`).innerText = chain;
        const chainIcon = document.getElementById(`${side}-chain-icon`);
        chainIcon.style.backgroundImage = CHAIN_ICONS[chain];
        chainIcon.alt = chain;

        // Conditionally update transfer details
        if (this.elements.amountField.value) {
            this.updateTransferDetails();
        }
    }

    updateTransferDetails() {
        const balance = this.balances[this.state.selectedChainSend][this.state.selectedTokenSend] || 0;
        const sendAmount = parseFloat(this.elements.amountField.value);
        const fees = calculateFees(sendAmount, this.state.selectedChainSend, this.state.selectedTokenSend);
        const receiveAmount = convert(sendAmount - fees, this.state.selectedTokenSend, this.state.selectedTokenReceive);

        const isInputValid = isPositiveFloat(this.elements.amountField.value);
        const isBalanceSufficient = !isNaN(sendAmount) && balance >= sendAmount;
        const isReceivePositive = !isNaN(receiveAmount) && receiveAmount > 0;
        const isChainOrTokenDifferent = (
            this.state.selectedChainSend !== this.state.selectedChainReceive ||
            this.state.selectedTokenSend !== this.state.selectedTokenReceive
        );
        const isTransferValid = isInputValid && isReceivePositive && isBalanceSufficient && isChainOrTokenDifferent;

        if (isTransferValid) {
            this.elements.transferButton.innerHTML = transferButtonHTMLActive;
            this.elements.transferDetails.innerHTML = transferDetailsHTMLTemplate;

            const receiveAmountHTML = document.getElementById("receive-amount");
            const receiveAmountUSDHTML = document.getElementById("receive-amount-usd");
            const receiveFeesUSDHTML = document.getElementById("receive-fees-usd");

            const receiveAmountUSD = convertToUSD(receiveAmount, this.state.selectedTokenReceive);
            const feesUSD = convertToUSD(fees, this.state.selectedTokenSend);

            const formattedReceiveAmount = formatAmount(receiveAmount);
            const formattedReceiveAmountUSD = formatAmountUSD(receiveAmountUSD);
            const formattedFeesUSD = formatAmountUSD(feesUSD);

            receiveAmountHTML.innerText = `${formattedReceiveAmount} ${this.state.selectedTokenReceive}`;
            receiveAmountUSDHTML.innerText = `${formattedReceiveAmountUSD} USD`;
            receiveFeesUSDHTML.innerText = `${formattedFeesUSD} Fees`;
        } else {
            this.elements.transferButton.innerHTML = transferButtonHTMLInactive;
            this.elements.transferDetails.innerHTML = transferDetailsHTMLInactive;
        }
    }

    updateSwapBalance() {
        const swapBalance = document.getElementById('swap-balance');
        const chainBalances = this.balances[this.state.selectedChainSend] || {};
        const amount = chainBalances[this.state.selectedTokenSend] || 0;
        const amountUSD = convertToUSD(amount, this.state.selectedTokenSend);
        const formattedAmount = formatAmount(amount);
        const formattedAmountUSD = formatAmountUSD(amountUSD);
        swapBalance.innerText = `Bal: ${formattedAmount} ${this.state.selectedTokenSend} (${formattedAmountUSD} USD)`;
    }

    updateSelectTokenDialog() {
        const selectedChain = this.state.swapSide === SwapSide.SEND
            ? this.state.selectedChainSend
            : this.state.selectedChainReceive;

        document.getElementById('swap-side').innerText = this.state.swapSide;
        document.getElementById('select-token-selected-chain').innerText = selectedChain;

        const chainIcon = document.getElementById('select-token-selected-chain-icon');
        chainIcon.style.backgroundImage = CHAIN_ICONS[selectedChain];
    }

    updateTokenListBalances() {
        const balances = this.state.swapSide === SwapSide.SEND
            ? (this.balances[this.state.selectedChainSend] || {})
            : (this.balances[this.state.selectedChainReceive] || {});

        const tokenList = document.getElementById('token-list');

        for (let i = 0; i < tokenList.children.length; i++) {
            const amount = balances[INDEX_TO_TOKEN[i]] || 0;
            const amountUSD = convertToUSD(amount, INDEX_TO_TOKEN[i]);
            const formattedAmount = formatAmount(amount);
            const formattedAmountUSD = formatAmountUSD(amountUSD);

            const container = tokenList.children[i].getElementsByClassName("w-10 flex-1 truncate text-right text-sm")[0];
            container.children[0].textContent = formattedAmount;
            container.children[1].textContent = `${formattedAmountUSD}`;
        }
    }

    updatePointsAndTransactions(points, numTransactions) {
        const pointsHTML = document.getElementById('points');
        const numTransactionsHTML = document.getElementById('num_transactions');
        pointsHTML.textContent = points;
        numTransactionsHTML.textContent = numTransactions;
    }

    updateQuestList() {
        fetch('/api/quests')
            .then(response => response.json())
            .then(quests => {
                const questList = document.getElementById('quest-list');
                questList.innerHTML = '';
                for (const [chain, numRemaining] of Object.entries(quests)) {
                    if (numRemaining > 0) {
                        const questItem = createNodeFromHTML(questItemHTMLTemplate);
                        questItem.querySelector('#name').textContent = `Bridge to ${chain}`;
                        questItem.querySelector('#remaining').textContent = `${numRemaining} Remaining`;
                        questList.appendChild(questItem);
                    }
                }
            });
    }
    
    openTokenSelection(side) {
        this.state.swapSide = side;
        this.showDialog(this.elements.selectTokenDialog);
        this.updateSelectTokenDialog();
        this.updateTokenListBalances();
    }

    handleChainDialogBack() {
        this.hideDialog(this.elements.selectChainDialog);
        this.showDialog(this.elements.selectTokenDialog);
    }

    handleChainDialogClose() {
        this.hideDialog(this.elements.selectChainDialog);
        this.hideDialog(this.elements.selectTokenDialog);
    }

    showDialog(dialog) {
        dialog.style = DIALOG_DISPLAY.SHOW;
    }

    hideDialog(dialog) {
        dialog.style = DIALOG_DISPLAY.HIDE;
    }

    fetchBalances() {
        return fetch('/api/balances')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.balances = data;
                return data;
            })
            .catch(error => {
                console.error('Error fetching balances:', error);
                // Keep the initialized empty balances on error
            });
    }
}

// Initialize the interface
const swapInterface = new SwapInterface();
window.swapInterface = swapInterface;
