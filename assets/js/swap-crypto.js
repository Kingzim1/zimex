// Crypto Swap
let swapCrypto = document.getElementById('crypto-swap'); // Whole form
let selectFromCrypto = document.getElementById('crypto-from'); // Select from
let selectToCrypto = document.getElementById('crypto-to'); // Select to
let enterCrypto = document.getElementById('crypto-enter'); // Enter amount
let receiveCrypto = document.getElementById('crypto-receive'); // Receive amount
let circleCrypto = document.getElementById('circle-crypto');

// Functions

// Currency pairs object as a 'const variable'
const currencyCryptoPairs = {
    BTC: 'ETH'
}

// start of PAIRs SELECTION

/**
 * Listens to the currency selection and execute pairs, 
 * it follows the const of 'currencyCryptoPairs' mapping the key-value pairs
 * and acting accordingly.
 */
function currencyCryptoPairsCrypto(event) {
    let selectedKeyCurrencyFrom = selectFromCrypto.value;
    let selectedKeyCurrencyto = selectToCrypto.value;
    enterCrypto.value = 0;
    receiveCrypto.value = 0;

    if (currencyCryptoPairs[selectedKeyCurrencyFrom]) {
        selectToCrypto.value = currencyCryptoPairs[selectedKeyCurrencyFrom];
    } else if (currencyCryptoPairs[selectedKeyCurrencyto]) {
        selectFromCrypto.value = currencyCryptoPairs[selectedKeyCurrencyto];
    }
}
selectFromCrypto.addEventListener('change', currencyCryptoPairsCrypto);
selectToCrypto.addEventListener('change', currencyCryptoPairsCrypto);
circleCrypto.addEventListener('click', currencyCryptoPairsCrypto);

// end of PAIRs SELECTION

// start of RATE CALCULATION

/**
 * RateCryptoCalc to run a calculation based on a specific currency selection
 */

let calcMyNumberCrypto;
let selectedCurrencyCrypto;
function rateCryptoCalc(event) {
    selectedCurrencyCrypto = selectFromCrypto.value;
    calcMyNumberCrypto = Number(enterCrypto.value);

    if (selectedCurrencyCrypto === 'BTC') {
        if (calcMyNumberCrypto >= 0) {
            ETHRateCryptoCalc(calcMyNumberCrypto);
        }
    } 
}

/**
 * Targeted from RateCryptoCalc for ETH-BTC rate calculation
 */

let finalETH;
function ETHRateCryptoCalc(amount) {
    let selectedToETH = selectToCrypto.value;
    if (selectedToETH === 'ETH') {
        let receiveMyNumberETH = amount * 15.33;
        receiveCrypto.value = receiveMyNumberETH.toFixed(3);
        finalETH = receiveCrypto.value;
        if (finalETH < 0) {
            finalETH = 0;
        }
    }
}
enterCrypto.addEventListener('input', rateCryptoCalc);

// end of RATE CALCULATION

/**
 * Listen to 'Swap' button, then after swap 
 * it will update ETH & BTC balances repectively
 */

function updateNumbersCrypto(event) {
    event.preventDefault();

    // From ETH to BTC

    //ETH
    let totalConvertedAmountBTC = parseFloat(calcMyNumberCrypto);
    totalConvertedBTC += totalConvertedAmountBTC;
    let newBalanceBTC = usersAccount[0].cryptoBTC - totalConvertedBTC; // Balance

    //BTC
    let totalConvertedAmountETH = parseFloat(finalETH);
    convertedETH += totalConvertedAmountETH;
    let newBalanceETH = usersAccount[0].cryptoETH + convertedETH; // Balance

    //From BTC to ETH

    if (selectedCurrencyCrypto === 'BTC') {
        if (newBalanceBTC >= 0 && newBalanceETH >= 0) {
            balanceCrypto.children[1].innerHTML = `<li><b>ETH</b> = ${newBalanceETH.toFixed(3)}</li>
        <li><b>BTC</b> = ${newBalanceBTC.toFixed(3)}</li>`
        }else {
            alert('No balance!')
        }
    } 
}

swapCrypto.addEventListener('submit', updateNumbersCrypto);

// end of BALANCE UPDATE