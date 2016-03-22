var Actions = {

    restartApp: function () {
        var argv = gui.App.fullArgv,
            CWD = process.cwd();

        argv.push(CWD);
        require('child_process').spawn(process.execPath, argv, {
            cwd: CWD,
            detached: true,
            stdio: ['ignore', 'ignore', 'ignore']
        }).unref();
        gui.App.quit();
    },

    check_position: function () {
        // remember positionning
        win.on('move', function (x, y) {
            if (localStorage && x && y) {
                localStorage.posX = Math.round(x);
                localStorage.posY = Math.round(y);
            }
        });

        var screen = window.screen;
        var defaultWidth = require('../package.json').window.width;
        var defaultHeight = require('../package.json').window.height;

        var width = parseInt(localStorage.width ? localStorage.width : defaultWidth);
        var height = parseInt(localStorage.height ? localStorage.height : defaultHeight);
        var x = parseInt(localStorage.posX ? localStorage.posX : -1);
        var y = parseInt(localStorage.posY ? localStorage.posY : -1);

        // reset x
        if (x < 0 || (x + width) > screen.width) {
            x = Math.round((screen.availWidth - width) / 2);
        }

        // reset y
        if (y < 0 || (y + height) > screen.height) {
            y = Math.round((screen.availHeight - height) / 2);
        }

        win.moveTo(x, y);
    },
};