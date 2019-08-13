let hash = document.location.hash.substring(1);
let parts = hash.split('&');
let params = Object.create(null);
for (let i = 0, ii = parts.length; i < ii; ++i) {
    let param = parts[i].split('=');
    let key = param[0].toLowerCase();
    let value = param.length > 1 ? param[1] : null;
    params[decodeURIComponent(key)] = decodeURIComponent(value);
}

require.config({
    urlArgs: 'bust=' + (new Date()).getTime()
});

if ('templateid' in params) {
    require(['/templates/' + params['templateid'] + '.js'], () => require(['Init']));
}
