var Keyboard = {
    initShortcuts: function () {
        document.addEventListener('keypress', function (key) {

            // CTRL
            if (key.ctrlKey) {

                // ctrl+d
                if (key.charCode === 4) {
                    win.showDevTools();
                }

                // ctrl+r
                if (key.ctrlKey && key.charCode === 18) {
                    Actions.restartApp();
                }

            }
            
            // ALT
            if (key.altKey) {}
            
            // SHIFT
            if (key.shiftKey) {}
            
        });
    },
}