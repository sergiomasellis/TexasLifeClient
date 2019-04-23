let TLUI = mp.browsers.new("package://texaslife/index.html");
let HUD_CASH = 3;
let TLPlayer = {
    money: 0
};

mp.gui.cursor.show(true, true);


// General Server Events
mp.players.local.freezePosition(true);

mp.events.add('playerLoggedIn', () => {
    mp.players.local.freezePosition(false);
    TLUI.execute("showMoney();");
});

mp.events.add("render", () => {
    // hide default money hud just in case
    mp.game.ui.hideHudComponentThisFrame(HUD_CASH);
});

// Money Functions
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

    TLUI.execute(`updateMoneyUI("$${numberWithCommas(amount)}", "${amountSign}${amountDifference}", "${classToAdd}")`);
}

mp.events.add('updateMoney', (amount) => {
    updateMoneyCaculation(amount);
});


// Login Functions
mp.events.add('loginInformationToServer', (username, password) => {
    mp.events.callRemote('OnPlayerLoginAttempt', username.toLowerCase(), password);
});

mp.events.add('registerInformationToServer', (username, password) => {
    mp.events.callRemote('OnPlayerRegisterAttempt', username, password);
});

mp.events.add('LoginResult', (result) => {
    if (result == 1) {
        //Success we destroy the loginBrowser as we don't need it anymore
        mp.gui.cursor.show(false, false);
        TLUI.execute(`hideLogin()`);
    }
});

const Natives = {
    SWITCH_OUT_PLAYER: '0xAAB3200ED59016BC',
    SWITCH_IN_PLAYER: '0xD8295AF639FD9CB8',
    IS_PLAYER_SWITCH_IN_PROGRESS: '0xD9D2CFFF49FAB35F'
};
let gui;

mp.events.add('moveSkyCamera', moveFromToAir);

function moveFromToAir(player, moveTo, switchType, showGui) {   
    /*
        switchType: 0 - 3

        0: 1 step towards ped
        1: 3 steps out from ped (Recommended)
        2: 1 step out from ped
        3: 1 step towards ped
    */
   switch (moveTo) {
       case 'up':
            if (showGui == false) {
                mp.gui.chat.show(showGui);
                gui = 'false';
            };
            mp.game.invoke(Natives.SWITCH_OUT_PLAYER, player.handle, 0, parseInt(switchType));
           break;
       case 'down':
            if (gui == 'false') {
                checkCamInAir();
            };
            mp.game.invoke(Natives.SWITCH_IN_PLAYER, player.handle);
           break;
   
       default:
           break;
   }
}

// Checks whether the camera is in the air. If so, then reset the timer
function checkCamInAir() {
    if (mp.game.invoke(Natives.IS_PLAYER_SWITCH_IN_PROGRESS)) {
        setTimeout(() => {
            checkCamInAir();
        }, 400);
    } else {
        mp.gui.chat.show(true);
        gui = 'true';
    }
}