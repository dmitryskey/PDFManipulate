function updateDocUrl(locale, url, template) {
    jQuery.ajax({
        url: '/?rest_route=/PDFEditor',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({type: 'application/pdf', mode: 'edit', locale: locale, templateid: template}),
        async: true,
        cache: false,
        timeout: 3000,
        success: function (jsonData) {
            var p = JSON.parse(jsonData).editorUrl;
            if (p && p !== '') {
                jQuery(url).each(function() {
                    jQuery(this).attr('href', p);
                });
            }
        }
    });
}

jQuery(document).ready(function() {
    // Check if browser is IE version < 10
    var updateUrl = true;
    var uAgent = navigator.userAgent;
    if (uAgent.search('MSIE') >= 0) {
        // insert conditional IE code here
        var m = uAgent.match('MSIE ([^;]+)');
        if (m) {
            var v = parseFloat(m[1]);
            if (v < 10.0) {
                updateUrl = false;
            }
        }
    }

    var locales = {
        'en-US': 'a[href=\"https://www.uscis.gov/sites/default/files/document/forms/i-9-paper-version.pdf\"]',
        'es-MX': 'a[href=\"https://www.uscis.gov/sites/default/files/document/forms/i-9-spanish.pdf\"]'
    };

    for (var locale in locales) {
        var url = locales[locale];
        jQuery(url).each(function() {
            jQuery(this).attr('target', '_blank');
        });

        if (updateUrl) {
            updateDocUrl(locale, url, 'US I9');
        }
    }

    locales = {
        'en-US': 'a[href=\"https://www.uscis.gov/sites/default/files/document/forms/i-9supinstr.pdf\"]',
        'es-MX': 'a[href=\"https://www.uscis.gov/sites/default/files/document/forms/i9-frm-supp1-spanish.pdf\"]'
    };

    for (var locale in locales) {
        var url = locales[locale];
        jQuery(url).each(function() {
            jQuery(this).attr('target', '_blank');
        });

        if (updateUrl) {
            updateDocUrl(locale, url, 'US I9 Supplement');
        }
    }
});
