let moneyChangeEL = document.getElementsByClassName('money__amount-change')[0];
let moneyAmountEL = document.getElementsByClassName('money__amount')[0];

function showMoney() {
    document.getElementsByClassName('money')[0].style.opacity = 1;
}

function updateMoneyUI(amount, amountDifference, classToAdd) {
    moneyChangeEL.innerHTML = amountDifference;
    moneyChangeEL.classList.add('money__amount-change--'+classToAdd);

    setTimeout(() => {
        moneyChangeEL.classList.remove('money__amount-change--'+classToAdd);
        moneyAmountEL.innerHTML = amount;
    }, 2000);
}
