function openPdf(loc, ctrl) {
    jQuery.ajax({
        url: '/?rest_route=/PDFEditor',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({type: 'application/pdf', mode: 'edit', locale: loc, templateid: 'US I9'}),
        async: true,
        cache: false,
        timeout: 3000,
        success: function (jsonData) {
            var p = JSON.parse(jsonData).editorUrl;
            if (p && p !== '') {
                ctrl.attr('href', p);
                ctrl.attr('target', '_blank')
            }
        }
    });
}

jQuery(document).ready(function() {
    jQuery('a[href=\"https://www.uscis.gov/system/files_force/files/form/i-9-paper-version.pdf\"]')
    .each(function() {
        openPdf('en-US', jQuery(this));
    });

    jQuery('a[href=\"https://www.uscis.gov/system/files_force/files/form/i-9-spanish.pdf\"]')
    .each(function() {
        openPdf('es-MX', jQuery(this));
    });
});
