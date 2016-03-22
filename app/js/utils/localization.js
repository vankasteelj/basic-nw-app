var i18n = require('i18n');

var Localization = {
        setup: function() {
            Localization.availableLocales = [];
            fs.readdir(path.join(process.cwd(), 'app/localization'), function(err, locales) {
                for (i in locales) {
                    Localization.availableLocales.push(locales[i].replace('.json', ''));
                }
                i18n.configure({
                    defaultLocale: Localization.detectLocale(),
                    locales: Localization.availableLocales,
                    directory: './app/localization'
                });
                Localization.setLocale(localStorage.locale);
                Localization.localizeApp();
            });
        },
        detectLocale: function() {
            // The full OS language (with localization, like 'en-uk')
            var pureLanguage = navigator.language.toLowerCase();
            // The global language name (without localization, like 'en')
            var baseLanguage = navigator.language.toLowerCase().slice(0, 2);

            if (Localization.availableLocales.indexOf(pureLanguage) !== -1) {
                return pureLanguage;
            } else if (Localization.availableLocales.indexOf(baseLanguage) !== -1) {
                return baseLanguage;
            } else {
                return 'en';
            }
        },
        setLocale: function(locale) {
            if (locale) {
                i18n.setLocale(locale);
            } else {
                i18n.setLocale(Localization.detectLocale());
            }
        },
        localizeApp: function() {
            var t = document.getElementsByTagName('i18n');
            var c = document.getElementsByClassName('i18n');
            for (var i = 0; i < t.length; i++) {
                if (t[i].innerText) t[i].innerText = i18n.__(t[i].innerText);
            }
            for (var j = 0; j < c.length; j++) {
                if (c[j].title) c[j].title = i18n.__(c[j].title);
                if (c[j].placeholder) c[j].placeholder = i18n.__(c[j].placeholder);
            }
        }
};