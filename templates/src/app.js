// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
require.config({
    baseUrl: '/jquery',
    paths: {
        jQuery: 'jquery',
        jQueryUI: 'jquery-ui',
        jQueryUIi18n: 'jquery-ui-i18n'
    }
});

let hash = document.location.hash.substring(1);
let parts = hash.split('&');
let params = Object.create(null);
for (let i = 0, ii = parts.length; i < ii; ++i) {
    let param = parts[i].split('=');
    let key = param[0].toLowerCase();
    let value = param.length > 1 ? param[1] : null;
    params[decodeURIComponent(key)] = decodeURIComponent(value);
}

if ('templateid' in params) {
    require(['/templates/' + params['templateid'] + '.js']);
}