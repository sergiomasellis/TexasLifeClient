
exports = function (browser) {
    // Login Functions
    mp.events.add('loginInformationToServer', (username, password) => {
        mp.events.callRemote('OnPlayerLoginAttempt', username.toLowerCase(), password);
    });

    mp.events.add('registerInformationToServer', (username, password) => {
        mp.events.callRemote('OnPlayerRegisterAttempt', username, password);
    });

    mp.events.add('playerLoggedIn', () => {
        mp.players.local.freezePosition(false);
        browser.execute("showMoney();");
    });

    mp.events.add('LoginResult', (result) => {
        if (result == 1) {
            //Success we destroy the loginBrowser as we don't need it anymore
            mp.gui.cursor.show(false, false);
            browser.execute(`hideLogin()`);
        }
    });
}
