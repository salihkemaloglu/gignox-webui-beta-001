import i18next from 'i18next';

let lang = sessionStorage.getItem("language") === null ? JSON.parse(JSON.stringify("en")) : sessionStorage.getItem("language")
var en_data = require('./multi-language/langs/en.json');
var tr_data = require('./multi-language/langs/tr.json');
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

export default i18next