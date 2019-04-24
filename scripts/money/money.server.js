
exports = function (browser) {
    
    let HUD_CASH = 3;
    let TLPlayer = {
        money: 0
    };

    // Init
    mp.events.add("render", () => {
        // hide default money hud just in case
        mp.game.ui.hideHudComponentThisFrame(HUD_CASH);
    });

    // Add Commas to numbers
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Calculate Event
    function updateMoneyCaculation(amount) {
        let classToAdd = '';
        let amountSign = '+$';
        let amountDifference = amount;
        
        
        if(TLPlayer.money > amount) {
            // animated negative text
            amountDifference = numberWithCommas(Math.abs(TLPlayer.money-amount));
            classToAdd = "negative";
            amountSign = '-$';
        } else {
            // animate positive text
            amountDifference = numberWithCommas(amount-TLPlayer.money);
            classToAdd = "positive";
        }

        TLPlayer.money = amount;

        browser.execute(`updateMoneyUI("$${numberWithCommas(amount)}", "${amountSign}${amountDifference}", "${classToAdd}")`);
    }

    mp.events.add('updateMoney', (amount) => {
        updateMoneyCaculation(amount);
    });

}
