let TLUI = mp.browsers.new("package://texaslife/index.html");

// Show Cursor
mp.gui.cursor.show(true, true);

// General Server Events
mp.players.local.freezePosition(true);

const camera = require('./texaslife/scripts/camera/camera.server.js');
const doors = require('./texaslife/scripts/doors/doors.server.js');


(function initClient(){
    const login = require('./texaslife/scripts/login/login.server.js')(TLUI);
    const money = require('./texaslife/scripts/money/money.server.js')(TLUI);
    camera();
    doors();
})()