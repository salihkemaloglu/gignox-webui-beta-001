import i18next from 'i18next';

let lang = localStorage.getItem("languagecode") === null ? JSON.parse(JSON.stringify("en")) : localStorage.getItem("languagecode")
var en_data = require('../app_root/languages/en.json');
var tr_data = require('../app_root/languages/tr.json');
i18next.init({
  lng: lang,
  debug: true,
  resources: {
    en: {
      translation: en_data
    },
    tr: {
      translation: tr_data
    },
  }
})

export { i18next, lang }

