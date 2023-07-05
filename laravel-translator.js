// Función para cargar las traducciones
function loadTranslations(locale) {
    return fetch(`/translations/${locale}`)
        .then(response => response.json())
        .catch(error => {
            console.error(error);
            return {};
        });
}

// Objeto lang con función de traducción 't'
const lang = {
    translations: {},
    t(key) {
        const translation = this.translations[key];
        if (translation !== undefined) {
            return translation;
        } else {
            return key;
        }
    }
};

// Contenido del archivo .js que deseas traducir
const content = ``;
// Obtener el valor de locale desde la etiqueta HTML
const htmlLang = document.documentElement.lang;
const locale = htmlLang || 'en'; // Si no se encuentra el atributo lang, se utiliza un valor predeterminado (en este caso, 'en')
// Cargar las traducciones
loadTranslations(locale)
  .then(translations => {
    // Asignar las traducciones al objeto lang
    lang.translations = translations;

    // Traducir el contenido del archivo .js
    const translatedContent = content.replace(/lang.t\((.*?)\)/g, (match, p1) => {
      const key = p1.replace(/['"]/g, '');
      return lang.t(key);
    });

    // Ejecutar el contenido traducido
    eval(translatedContent);
  })
  .catch(error => {
    console.error(error);
  });
