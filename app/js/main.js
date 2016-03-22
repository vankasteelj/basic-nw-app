/* global */
var gui = require('nw.gui'),
    win = gui.Window.get(),
    path = require('path'),
    fs = require('fs');

/* main */
var Main = {
    loadPages: function () {
        console.debug('Main.loadPages');
        var pages = [];
        var sections = document.getElementsByTagName('section');
        for (var i = 0; i < sections.length; i++) {
            pages.push(sections[i]);
        }
        return Promise.all(pages.map(function (el) {            
            // css
            var csscontent = document.getElementsByTagName('style')[0].innerText + fs.readFileSync(path.join(process.cwd(), 'app/pages', el.id, el.id + '.css')).toString();
            document.getElementsByTagName('style')[0].innerText = csscontent;

            // html
            var htmlcontent = fs.readFileSync(path.join(process.cwd(), 'app/pages', el.id, el.id + '.tpl')).toString();
            el.innerHTML = htmlcontent;

            // js
            var jscontent = require(path.join(process.cwd(), 'app/pages', el.id, el.id + '.js'));
            Main[el.id] = jscontent;          
        }));
    },
    loadApplication: function () {
        console.debug('Main.loadApplication');
        Keyboard.initShortcuts();
        Actions.check_position();
        Main.loadPages().then(function () {
            Localization.setup();
            win.show();
        });
    }
};