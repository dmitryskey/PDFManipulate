var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PDFForm = (function () {
    function PDFForm() {
        var _this = this;
        this.nameFormat = /^[A-Za-z ']+$/;
        this.nameInitialFormat = /^[A-Za-z]{1}$/;
        this.stateFormat = /^[A-Z]{2,3}$/;
        this.NAFormat = /^[NnAa/]+$/;
        this.NAString = /^N\/A$/;
        this.zipFormat = /^[0-9]+$/;
        this.postalFormat = /^[A-Za-z0-9]+$/;
        this.zipNumberFormat = /^[0-9]{5}$/;
        this.postalCodeFormat = /^[A-Za-z0-9]{6}$/;
        this.dateFormat = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/;
        this.numberFormat = /^[0-9]{1}$/;
        this.alphaNumericFormat = /^[0-9a-zA-Z]{1}$/;
        this.numberWithDashesFormat = /^[0-9]{1}|\-{1}$/;
        this.emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.phoneFormat = /^[0-9/NA-]+$/;
        this.phoneNumber = /^[0-9]{3}\-{1}[0-9]{3}\-{1}[0-9]{4}$/;
        this.uscisNumberFormat = /^[0-9]{7,9}$/;
        this.admissionNumberFormat = /^[0-9]{9}[a-zA-Z]{1}[0-9]{1}$|^[0-9]{11}$/;
        this.usPassportNumberFormat = /^[a-zA-Z0-9]{6,9}$/;
        this.greenCardNumberFormat = /^[A-Za-z]{3}[0-9]{10}$|[0-9]{7,9}|[0-9]{3}\-{0,1}[0-9]{3}\-{0,1}[0-9]{3}$/;
        this.cardNumberFormat = /^[A-Za-z]{3}[0-9]{10}$/;
        this.passportNumberFormat = /^[a-zA-Z0-9]{6,12}$/;
        this.driverLicenseNumberFormat = /^[a-zA-Z0-9]{8,14}$/;
        this.ssnFormat = /^[0-9]{3}[-]*[0-9]{2}[-]*[0-9]{4}$/;
        this.annotationName = 'annotation-name';
        this.annotationRequired = 'annotation-required';
        this.annotationNext = 'annotation-next';
        this.na = this._('NA');
        this.space = ' ';
        this.blankItem = '&nbsp;';
        this.backSpaceCode = 'Backspace';
        this.parentProp = 'parent';
        var monthNames = [];
        var monthNamesShort = [];
        var dayNames = [];
        var dayNamesShort = [];
        var dayNamesMin = [];
        $.each(JSON.parse(this._('monthNames')), function (index, value) {
            monthNamesShort.push(index);
            monthNames.push(value);
        });
        $.each(JSON.parse(this._('dayNames')), function (index, value) {
            dayNamesMin.push(index);
            $.each(value, function (i, v) {
                dayNamesShort.push(i);
                dayNames.push(v);
            });
        });
        $.datepicker.setDefaults({
            closeText: this._('closeText'),
            prevText: this._('prevText'),
            nextText: this._('nextText'),
            currentText: this._('currentText'),
            monthNames: monthNames,
            monthNamesShort: monthNamesShort,
            dayNames: dayNames,
            dayNamesShort: dayNamesShort,
            dayNamesMin: dayNamesMin,
            weekHeader: this._('weekHeader'),
            dateFormat: 'mm/dd/yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        });
        $('body').mouseup(function (e) {
            var popover = $('.popover');
            if (!popover.is(e.target) && popover.has(e.target).length === 0 && popover.prop(_this.parentProp) &&
                popover.prop(_this.parentProp) !== e.target) {
                $(popover.prop(_this.parentProp)).popover('hide').removeProp(_this.parentProp);
            }
        });
    }
    PDFForm.prototype._ = function (t) {
        return document.webL10n.get(t).replace('#', '&#35;');
    };
    PDFForm.prototype.selectCheckmark = function (ctrl, arr) {
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var a = arr_1[_i];
            if (a.attr(this.annotationName) !== ctrl.attr(this.annotationName)) {
                a.prop('checked', false);
                a.parent().children('span').text('');
            }
        }
    };
    PDFForm.prototype.setCombolistValue = function (ctrl, val) {
        var options = ctrl.parent().children().filter('.combo-content');
        options.children().filter("[value='" + val + "']").each(function (index, value) {
            value.onclick(null);
        });
    };
    PDFForm.prototype.setCombolistText = function (ctrl, val, txt) {
        var options = ctrl.parent().children().filter('.combo-content');
        options.children().filter("[value='" + val + "']").html(txt);
    };
    PDFForm.prototype.assignCombolistEventHandler = function (ctrl, f) {
        ctrl.parent().children().filter('.combo-content').click(f);
    };
    PDFForm.prototype.renderControl = function (ctrl, text, onFocus) {
        if (onFocus === void 0) { onFocus = true; }
        return ctrl.popover({ html: true, content: text, trigger: onFocus ? 'focus' : 'hover' });
    };
    PDFForm.prototype.renderHelpIcon = function (ctrl, title, text, maxWidth) {
        var _this = this;
        if (maxWidth === void 0) { maxWidth = '30'; }
        var tag = 'img';
        return ctrl.parent().find(tag).length > 0 ? ctrl : ctrl.hide().parent()
            .append("<" + tag + " src='" + PDFForm.helpIconUrl + "' class='icon' />").children(tag)
            .tooltip({ title: title, placement: 'left' })
            .popover({
            html: true,
            title: decodeURIComponent(this._('help')),
            content: decodeURIComponent(text),
            trigger: 'click'
        })
            .click(function (e) {
            $(e.target).tooltip('hide');
            $('.popover').css('max-width', maxWidth + "%").prop(_this.parentProp, e.target);
        });
    };
    PDFForm.prototype.urlParameter = function (name) {
        var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(window.location.href);
        if (results === null) {
            return null;
        }
        else {
            return decodeURI(results[1]) || 0;
        }
    };
    PDFForm.prototype.validateForm = function (ctrl, errorMessages) {
        if (errorMessages.length > 0) {
            var errorMessage_1 = this._('error.header') + "<br />";
            errorMessages.forEach(function (e) {
                errorMessage_1 += " - " + e + "<br />";
            });
            ctrl.popover({
                html: true,
                title: this._('validation'),
                content: errorMessage_1,
                trigger: 'click',
                placement: 'bottom'
            }).popover('show');
            $('.popover').prop(this.parentProp, ctrl);
            return false;
        }
        else {
            ctrl.popover('hide');
            return true;
        }
    };
    PDFForm.toolbarButtons = ['print', 'download'];
    PDFForm.helpIconUrl = URL.createObjectURL(new Blob([
        "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n    <!-- Created with Inkscape (http://www.inkscape.org/) -->\n    \n    <svg\n       xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n       xmlns:cc=\"http://creativecommons.org/ns#\"\n       xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\n       xmlns:svg=\"http://www.w3.org/2000/svg\"\n       xmlns=\"http://www.w3.org/2000/svg\"\n       xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\n       xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\n       width=\"64px\"\n       height=\"64px\"\n       id=\"svg4310\"\n       version=\"1.1\"\n       inkscape:version=\"0.48.5 r10040\"\n       sodipodi:docname=\"New document 12\">\n      <defs\n         id=\"defs4312\" />\n      <sodipodi:namedview\n         id=\"base\"\n         pagecolor=\"#ffffff\"\n         bordercolor=\"#666666\"\n         borderopacity=\"1.0\"\n         inkscape:pageopacity=\"0.0\"\n         inkscape:pageshadow=\"2\"\n         inkscape:zoom=\"8.109375\"\n         inkscape:cx=\"32\"\n         inkscape:cy=\"32\"\n         inkscape:current-layer=\"layer1\"\n         showgrid=\"true\"\n         inkscape:document-units=\"px\"\n         inkscape:grid-bbox=\"true\"\n         inkscape:window-width=\"1366\"\n         inkscape:window-height=\"706\"\n         inkscape:window-x=\"-8\"\n         inkscape:window-y=\"-8\"\n         inkscape:window-maximized=\"1\" />\n      <metadata\n         id=\"metadata4315\">\n        <rdf:RDF>\n          <cc:Work\n             rdf:about=\"\">\n            <dc:format>image/svg+xml</dc:format>\n            <dc:type\n               rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\" />\n            <dc:title></dc:title>\n          </cc:Work>\n        </rdf:RDF>\n      </metadata>\n      <g\n         id=\"layer1\"\n         inkscape:label=\"Layer 1\"\n         inkscape:groupmode=\"layer\">\n        <path\n           style=\"fill:#ffffff;fill-opacity:1\"\n           d=\"m 15.762549,38.922 c -1.06334,-0.882165 -1.32499,-1.498527 -1.34729,-3.173687 -0.037,-2.776797 1.52601,-5.152147 5.67899,-8.630675 5.33259,-4.466575 6.47416,-8.564501 3.27186,-11.745039 -1.18764,-1.179564 -1.76451,-1.372444 -4.14809,-1.386933 -3.41515,-0.02075 -4.87489,0.960552 -6.75278,4.539549 -1.6751,3.192528 -3.0518803,4.181224 -5.2319903,3.757233 -5.75464,-1.119178 -2.91387,-10.115689 4.4180303,-13.9915496 1.669,-0.8822891 3.09519,-1.1704971 6.45082,-1.3036071 7.53077,-0.29873 12.28335,2.0120271 14.86673,7.2283727 1.14469,2.311347 1.3024,3.11896 1.16013,5.941025 -0.21059,4.177607 -1.49939,6.168229 -6.95257,10.738659 -2.83149,2.373136 -4.27783,3.97627 -4.98858,5.529385 -1.69628,3.706674 -3.92388,4.57246 -6.42526,2.497267 l 0,0 z\"\n           id=\"path4333\"\n           inkscape:connector-curvature=\"0\" />\n        <path\n           style=\"fill:#ffffff;fill-opacity:1\"\n           d=\"m 14.509119,51.233541 c -2.05979,-2.285886 -2.15553,-4.889987 -0.25783,-7.012744 2.73307,-3.057201 7.61599,-1.593986 8.37255,2.508922 0.87511,4.745715 -4.97233,7.991152 -8.11472,4.503822 z\"\n           id=\"path4337\"\n           inkscape:connector-curvature=\"0\" />\n        <path\n           sodipodi:type=\"arc\"\n           style=\"fill:#0000ff;fill-opacity:1\"\n           id=\"path4339\"\n           sodipodi:cx=\"34.978806\"\n           sodipodi:cy=\"36.861271\"\n           sodipodi:rx=\"24.123314\"\n           sodipodi:ry=\"25.932562\"\n           d=\"m 59.102119,36.861271 a 24.123314,25.932562 0 1 1 -48.246627,0 24.123314,25.932562 0 1 1 48.246627,0 z\"\n           transform=\"matrix(1.2376996,0,0,1.145033,-10.225819,-11.080207)\" />\n        <path\n           style=\"fill:#ffffff;fill-opacity:1\"\n           d=\"m 29.191588,39.791319 c -1.06334,-0.882165 -1.32499,-1.498527 -1.34729,-3.173687 -0.037,-2.776797 1.52601,-5.152147 5.678992,-8.630675 5.33259,-4.466575 6.47416,-8.564501 3.27186,-11.745039 -1.18764,-1.179564 -1.76451,-1.372444 -4.14809,-1.386933 -3.415152,-0.02075 -4.874892,0.960552 -6.752782,4.539549 -1.6751,3.192528 -3.05188,4.181224 -5.23199,3.757233 -5.754639,-1.119178 -2.913869,-10.115689 4.41803,-13.9915503 1.669,-0.882289 3.09519,-1.170497 6.45082,-1.303607 7.530772,-0.29873 12.283352,2.012027 14.866732,7.2283733 1.14469,2.311347 1.3024,3.11896 1.16013,5.941025 -0.21059,4.177607 -1.49939,6.168229 -6.95257,10.738659 -2.83149,2.373136 -4.27783,3.97627 -4.98858,5.529385 -1.69628,3.706674 -3.923882,4.57246 -6.425262,2.497267 l 0,0 z\"\n           id=\"path4333-2\"\n           inkscape:connector-curvature=\"0\" />\n        <path\n           style=\"fill:#ffffff;fill-opacity:1\"\n           d=\"m 27.938158,52.10286 c -2.05979,-2.285886 -2.15553,-4.889987 -0.25783,-7.012744 2.73307,-3.057201 7.615992,-1.593986 8.372552,2.508922 0.87511,4.745715 -4.972332,7.991152 -8.114722,4.503822 z\"\n           id=\"path4337-7\"\n           inkscape:connector-curvature=\"0\" />\n      </g>\n    </svg>"
    ], { type: 'image/svg+xml' }));
    return PDFForm;
}());
var USI9SupplementFields = (function (_super) {
    __extends(USI9SupplementFields, _super);
    function USI9SupplementFields() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.paramExistsMsg = _this._('parameter.exists');
        _this.paramLengthMsg = _this._('parameter.length');
        _this.paramFormatMsg = _this._('parameter.format');
        _this.paramMaxValueMsg = _this._('parameter.max');
        _this.paramMinValueMsg = _this._('parameter.min');
        _this.dateFormatMsg = _this._('date.format');
        _this.invalidFieldClass = 'invalid';
        return _this;
    }
    USI9SupplementFields.prototype.validateDateRange = function (f, parameter, errorMessages, prefix) {
        if (prefix === void 0) { prefix = ''; }
        if (!f) {
            return true;
        }
        var maxDate = f.datepicker('option', 'maxDate');
        var minDate = f.datepicker('option', 'minDate');
        if (maxDate) {
            maxDate.setHours(0, 0, 0, 0);
        }
        if (minDate) {
            minDate.setHours(0, 0, 0, 0);
        }
        if (maxDate && f && f.val() && (new Date(f.val()) > maxDate)) {
            errorMessages.push(this.paramMaxValueMsg
                .replace('${prefix}', prefix)
                .replace('${parameter}', parameter)
                .replace('${value}', maxDate.toDateString()));
        }
        else if (minDate && f && f.val() && (new Date(f.val()) < minDate)) {
            errorMessages.push(this.paramMinValueMsg
                .replace('${prefix}', prefix)
                .replace('${parameter}', parameter)
                .replace('${value}', minDate.toDateString()));
        }
        else {
            return true;
        }
        return false;
    };
    USI9SupplementFields.prototype.validateTextField = function (f, parameter, regExs, validateIfEmpty, errorMessages, prefix) {
        if (prefix === void 0) { prefix = ''; }
        var errorFlag = true;
        var length = f.prop('maxLength') ? f.prop('maxLength') : 0;
        if (!f || !f.val() || (f.attr(this.annotationRequired) && f.val().trim() === '')) {
            errorMessages.push(this.paramExistsMsg
                .replace('${prefix}', prefix)
                .replace('${parameter}', parameter));
        }
        else if (f && f.val() && f.val().length > length && length > 0) {
            errorMessages.push(this.paramLengthMsg
                .replace('${prefix}', prefix)
                .replace('${parameter}', parameter)
                .replace('${length}', length.toString()));
        }
        else if ((f && f.val() !== '' || validateIfEmpty) && regExs.length > 0) {
            var validFlag = false;
            for (var i in regExs) {
                if (f && regExs[i].test(f.val())) {
                    validFlag = true;
                    break;
                }
            }
            if (!validFlag) {
                errorMessages.push(this.paramFormatMsg
                    .replace('${prefix}', prefix)
                    .replace('${parameter}', parameter));
            }
            errorFlag = !validFlag;
            if (!errorFlag) {
                errorFlag = !this.validateDateRange(f, parameter, errorMessages, prefix);
            }
        }
        else {
            errorFlag = false;
        }
        if (f) {
            f.toggleClass(this.invalidFieldClass, errorFlag);
        }
        return !errorFlag;
    };
    return USI9SupplementFields;
}(PDFForm));
var USI9SupplementTranslator = (function (_super) {
    __extends(USI9SupplementTranslator, _super);
    function USI9SupplementTranslator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    USI9SupplementTranslator.prototype.renderTranslatorSection = function (lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, sgnTranslator, sgnTranslatorHelp, translatorDate, translatorDateHelp, translatorLastName, translatorLastNameHelp, translatorFirstName, translatorFirstNameHelp, translatorAddress, translatorAddressHelp, translatorCity, translatorCityHelp, translatorState, translatorStateHelp, translatorZip, translatorZipHelp, sgnTranslator2, translatorDate2, translatorLastName2, translatorFirstName2, translatorAddress2, translatorCity2, translatorState2, translatorZip2, sgnTranslator3, translatorDate3, translatorLastName3, translatorFirstName3, translatorAddress3, translatorCity3, translatorState3, translatorZip3, sgnTranslator4, translatorDate4, translatorLastName4, translatorFirstName4, translatorAddress4, translatorCity4, translatorState4, translatorZip4) {
        var _this = this;
        $('a').prop('target', '_blank');
        this._lastName = this.renderControl(lastName, this._('lastnamehelp.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._lastNameHelp = this.renderHelpIcon(lastNameHelp, this._('lastnamehelp.caption'), this._('lastnamehelp.text'));
        this._firstName = this.renderControl(firstName, this._('firstnamehelp.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._firstNameHelp = this.renderHelpIcon(firstNameHelp, this._('firstnamehelp.caption'), this._('firstnamehelp.text'));
        this._middleInitial = this.renderControl(middleInitial, this._('middleinitialhelp.tooltip'))
            .keypress(function (e) {
            return _this.nameFormat.test(e.key) || _this.NAFormat.test(e.key) || e.key === _this.backSpaceCode;
        });
        this._middleInitialHelp = this.renderHelpIcon(middleInitialHelp, this._('middleinitialhelp.caption'), this._('middleinitialhelp.text'));
        this._sgnTranslator = this.renderControl(sgnTranslator, this._('sgntranslator.tooltip'));
        this._sgnTranslatorHelp = this.renderHelpIcon(sgnTranslatorHelp, this._('sgntranslatorhelp.caption'), this._('sgntranslatorhelp.text'));
        this._translatorDate = this.renderControl(translatorDate, this._('translatordate.tooltip'))
            .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled');
        this._translatorDateHelp = this.renderHelpIcon(translatorDateHelp, this._('translatordatehelp.caption'), this._('translatordatehelp.text'));
        this._translatorLastName = this.renderControl(translatorLastName, this._('translatorlastname.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._translatorLastNameHelp = this.renderHelpIcon(translatorLastNameHelp, this._('translatorlastnamehelp.caption'), this._('translatorlastnamehelp.text'));
        this._translatorFirstName = this.renderControl(translatorFirstName, this._('translatorfirstname.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._translatorFirstNameHelp = this.renderHelpIcon(translatorFirstNameHelp, this._('translatorfirstnamehelp.caption'), this._('translatorfirstnamehelp.text'));
        this._translatorAddress = this.renderControl(translatorAddress, this._('translatoraddress.tooltip'));
        this._translatorAddressHelp = this.renderHelpIcon(translatorAddressHelp, this._('translatoraddresshelp.caption'), this._('translatoraddresshelp.text'));
        this._translatorCity = this.renderControl(translatorCity, this._('translatorcity.tooltip'));
        this._translatorCityHelp = this.renderHelpIcon(translatorCityHelp, this._('translatorcityhelp.caption'), this._('translatorcityhelp.text'));
        this._translatorState = this.renderControl(translatorState, this._('translatorstate.tooltip'));
        this.setCombolistText(this._translatorState, ' ', this.blankItem);
        this._translatorStateHelp = this.renderHelpIcon(translatorStateHelp, this._('translatorstatehelp.caption'), this._('translatorstatehelp.text'));
        this._translatorZip = this.renderControl(translatorZip, this._('translatorzip.tooltip'))
            .keypress(function (e) { return _this.zipFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._translatorZipHelp = this.renderHelpIcon(translatorZipHelp, this._('translatorziphelp.caption'), this._('translatorziphelp.text'));
        this._sgnTranslator2 = this.renderControl(sgnTranslator2, this._('sgntranslator.tooltip'));
        this._translatorDate2 = this.renderControl(translatorDate2, this._('translatordate.tooltip'))
            .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled');
        this._translatorLastName2 = this.renderControl(translatorLastName2, this._('translatorlastname.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._translatorFirstName2 = this.renderControl(translatorFirstName2, this._('translatorfirstname.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._translatorAddress2 = this.renderControl(translatorAddress2, this._('translatoraddress.tooltip'));
        this._translatorCity2 = this.renderControl(translatorCity2, this._('translatorcity.tooltip'));
        this._translatorState2 = this.renderControl(translatorState2, this._('translatorstate.tooltip'));
        this.setCombolistText(this._translatorState2, ' ', this.blankItem);
        this._translatorZip2 = this.renderControl(translatorZip2, this._('translatorzip.tooltip'))
            .keypress(function (e) { return _this.zipFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._sgnTranslator3 = this.renderControl(sgnTranslator3, this._('sgntranslator.tooltip'));
        this._translatorDate3 = this.renderControl(translatorDate3, this._('translatordate.tooltip'))
            .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled');
        this._translatorLastName3 = this.renderControl(translatorLastName3, this._('translatorlastname.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._translatorFirstName3 = this.renderControl(translatorFirstName3, this._('translatorfirstname.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._translatorAddress3 = this.renderControl(translatorAddress3, this._('translatoraddress.tooltip'));
        this._translatorCity3 = this.renderControl(translatorCity3, this._('translatorcity.tooltip'));
        this._translatorState3 = this.renderControl(translatorState3, this._('translatorstate.tooltip'));
        this.setCombolistText(this._translatorState3, ' ', this.blankItem);
        this._translatorZip3 = this.renderControl(translatorZip3, this._('translatorzip.tooltip'))
            .keypress(function (e) { return _this.zipFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._sgnTranslator4 = this.renderControl(sgnTranslator4, this._('sgntranslator.tooltip'));
        this._translatorDate4 = this.renderControl(translatorDate4, this._('translatordate.tooltip'))
            .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled');
        this._translatorLastName4 = this.renderControl(translatorLastName4, this._('translatorlastname.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._translatorFirstName4 = this.renderControl(translatorFirstName4, this._('translatorfirstname.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._translatorAddress4 = this.renderControl(translatorAddress4, this._('translatoraddress.tooltip'));
        this._translatorCity4 = this.renderControl(translatorCity4, this._('translatorcity.tooltip'));
        this._translatorState4 = this.renderControl(translatorState4, this._('translatorstate.tooltip'));
        this.setCombolistText(this._translatorState4, ' ', this.blankItem);
        this._translatorZip4 = this.renderControl(translatorZip4, this._('translatorzip.tooltip'))
            .keypress(function (e) { return _this.zipFormat.test(e.key) || e.key === _this.backSpaceCode; });
    };
    USI9SupplementTranslator.prototype.validateFields = function () {
        var errorMessages = [];
        if (this._middleInitial.val().trim() === '') {
            this._middleInitial.val(this.na);
        }
        this.validateTextField(this._lastName, this._('name.last'), [this.nameFormat], false, errorMessages);
        this.validateTextField(this._firstName, this._('name.first'), [this.nameFormat], false, errorMessages);
        this.validateTextField(this._middleInitial, this._('name.middleinitial'), [this.nameInitialFormat, this.NAString], false, errorMessages);
        var prefix = this._('translator.prefix') + ' 1: ';
        this.validateTextField(this._translatorDate, this._('date.sgntranslator'), [this.dateFormat], true, errorMessages, prefix);
        this.validateTextField(this._translatorLastName, this._('translator.lastname'), [this.nameFormat], true, errorMessages, prefix);
        this.validateTextField(this._translatorFirstName, this._('translator.firstname'), [this.nameFormat], true, errorMessages, prefix);
        this.validateTextField(this._translatorAddress, this._('translator.address'), [], true, errorMessages, prefix);
        this.validateTextField(this._translatorCity, this._('translator.city'), [], true, errorMessages, prefix);
        this.validateTextField(this._translatorState, this._('translator.state'), [], true, errorMessages, prefix);
        this.validateTextField(this._translatorZip, this._('translator.zip'), [this.zipNumberFormat], true, errorMessages, prefix);
        if (this._translatorDate2.val().trim() !== '' ||
            this._translatorLastName2.val().trim() !== '' ||
            this._translatorFirstName2.val().trim() !== '' ||
            this._translatorAddress2.val().trim() !== '' ||
            this._translatorCity2.val().trim() !== '' ||
            this._translatorState2.val().trim() !== '' ||
            this._translatorZip2.val().trim() !== '') {
            prefix = this._('translator.prefix') + ' 2: ';
            this.validateTextField(this._translatorDate2, this._('date.sgntranslator'), [this.dateFormat], true, errorMessages, prefix);
            this.validateTextField(this._translatorLastName2, this._('translator.lastname'), [this.nameFormat], true, errorMessages, prefix);
            this.validateTextField(this._translatorFirstName2, this._('translator.firstname'), [this.nameFormat], true, errorMessages, prefix);
            this.validateTextField(this._translatorAddress2, this._('translator.address'), [], true, errorMessages, prefix);
            this.validateTextField(this._translatorCity2, this._('translator.city'), [], true, errorMessages, prefix);
            this.validateTextField(this._translatorState2, this._('translator.state'), [], true, errorMessages, prefix);
            this.validateTextField(this._translatorZip2, this._('translator.zip'), [this.zipNumberFormat], true, errorMessages, prefix);
        }
        if (this._translatorDate3.val().trim() !== '' ||
            this._translatorLastName3.val().trim() !== '' ||
            this._translatorFirstName3.val().trim() !== '' ||
            this._translatorAddress3.val().trim() !== '' ||
            this._translatorCity3.val().trim() !== '' ||
            this._translatorState3.val().trim() !== '' ||
            this._translatorZip3.val().trim() !== '') {
            prefix = this._('translator.prefix') + ' 3: ';
            this.validateTextField(this._translatorDate3, this._('date.sgntranslator'), [this.dateFormat], true, errorMessages, prefix);
            this.validateTextField(this._translatorLastName3, this._('translator.lastname'), [this.nameFormat], true, errorMessages, prefix);
            this.validateTextField(this._translatorFirstName3, this._('translator.firstname'), [this.nameFormat], true, errorMessages, prefix);
            this.validateTextField(this._translatorAddress3, this._('translator.address'), [], true, errorMessages, prefix);
            this.validateTextField(this._translatorCity3, this._('translator.city'), [], true, errorMessages, prefix);
            this.validateTextField(this._translatorState3, this._('translator.state'), [], true, errorMessages, prefix);
            this.validateTextField(this._translatorZip3, this._('translator.zip'), [this.zipNumberFormat], true, errorMessages, prefix);
        }
        if (this._translatorDate4.val().trim() !== '' ||
            this._translatorLastName4.val().trim() !== '' ||
            this._translatorFirstName4.val().trim() !== '' ||
            this._translatorAddress4.val().trim() !== '' ||
            this._translatorCity4.val().trim() !== '' ||
            this._translatorState4.val().trim() !== '' ||
            this._translatorZip4.val().trim() !== '') {
            prefix = this._('translator.prefix') + ' 4: ';
            this.validateTextField(this._translatorDate4, this._('date.sgntranslator'), [this.dateFormat], true, errorMessages, prefix);
            this.validateTextField(this._translatorLastName4, this._('translator.lastname'), [this.nameFormat], true, errorMessages, prefix);
            this.validateTextField(this._translatorFirstName4, this._('translator.firstname'), [this.nameFormat], true, errorMessages, prefix);
            this.validateTextField(this._translatorAddress4, this._('translator.address'), [], true, errorMessages, prefix);
            this.validateTextField(this._translatorCity4, this._('translator.city'), [], true, errorMessages, prefix);
            this.validateTextField(this._translatorState4, this._('translator.state'), [], true, errorMessages, prefix);
            this.validateTextField(this._translatorZip4, this._('translator.zip'), [this.zipNumberFormat], true, errorMessages, prefix);
        }
        return errorMessages;
    };
    return USI9SupplementTranslator;
}(USI9SupplementFields));
var eventBus = PDFViewerApplication.eventBus;
var USI9Supplement = (function (_super) {
    __extends(USI9Supplement, _super);
    function USI9Supplement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    USI9Supplement.prototype.prepareData = function () {
        var _this = this;
        PDFViewerApplication.transformationService = '/?rest_route=/UpdateForm';
        PDFViewerApplication.sessionID = this.urlParameter('session_id');
        PDFViewerApplication.fieldsData = {
            'file': PDFViewerApplication.url,
            'operation': 'f',
            'entries': []
        };
        $("[" + this.annotationName + "]").each(function (i, ctrl) {
            if (!ctrl.disabled && ctrl.value && ctrl.value !== '') {
                PDFViewerApplication.fieldsData.entries.push({
                    'name': ctrl.getAttribute(_this.annotationName),
                    'value': ctrl.type === 'checkbox' ? (ctrl.checked ? 'On' : 'Off') : ctrl.value,
                    'operation': 's'
                });
            }
        });
    };
    USI9Supplement.prototype.prepareFirstPage = function () {
        this.renderTranslatorSection($("[" + this.annotationName + "=LastName]"), $("[" + this.annotationName + "=LastNameHelp]"), $("[" + this.annotationName + "=FirstName]"), $("[" + this.annotationName + "=FirstNameHelp]"), $("[" + this.annotationName + "=MiddleInitial]"), $("[" + this.annotationName + "=MiddleInitialHelp]"), $("[" + this.annotationName + "=sgnTranslator]"), $("[" + this.annotationName + "=sgnTranslatorHelp]"), $("[" + this.annotationName + "=TranslatorDate]"), $("[" + this.annotationName + "=TranslatorDateHelp]"), $("[" + this.annotationName + "=TranslatorLastName]"), $("[" + this.annotationName + "=TranslatorLastNameHelp]"), $("[" + this.annotationName + "=TranslatorFirstName]"), $("[" + this.annotationName + "=TranslatorFirstNameHelp]"), $("[" + this.annotationName + "=TranslatorAddress]"), $("[" + this.annotationName + "=TranslatorAddressHelp]"), $("[" + this.annotationName + "=TranslatorCity]"), $("[" + this.annotationName + "=TranslatorCityHelp]"), $("[" + this.annotationName + "=TranslatorState]"), $("[" + this.annotationName + "=TranslatorStateHelp]"), $("[" + this.annotationName + "=TranslatorZip]"), $("[" + this.annotationName + "=TranslatorZipHelp]"), $("[" + this.annotationName + "=sgnTranslator2]"), $("[" + this.annotationName + "=TranslatorDate2]"), $("[" + this.annotationName + "=TranslatorLastName2]"), $("[" + this.annotationName + "=TranslatorFirstName2]"), $("[" + this.annotationName + "=TranslatorAddress2]"), $("[" + this.annotationName + "=TranslatorCity2]"), $("[" + this.annotationName + "=TranslatorState2]"), $("[" + this.annotationName + "=TranslatorZip2]"), $("[" + this.annotationName + "=sgnTranslator3]"), $("[" + this.annotationName + "=TranslatorDate3]"), $("[" + this.annotationName + "=TranslatorLastName3]"), $("[" + this.annotationName + "=TranslatorFirstName3]"), $("[" + this.annotationName + "=TranslatorAddress3]"), $("[" + this.annotationName + "=TranslatorCity3]"), $("[" + this.annotationName + "=TranslatorState3]"), $("[" + this.annotationName + "=TranslatorZip3]"), $("[" + this.annotationName + "=sgnTranslator4]"), $("[" + this.annotationName + "=TranslatorDate4]"), $("[" + this.annotationName + "=TranslatorLastName4]"), $("[" + this.annotationName + "=TranslatorFirstName4]"), $("[" + this.annotationName + "=TranslatorAddress4]"), $("[" + this.annotationName + "=TranslatorCity4]"), $("[" + this.annotationName + "=TranslatorState4]"), $("[" + this.annotationName + "=TranslatorZip4]"));
    };
    USI9Supplement.prototype.renderSections = function () {
        var _this = this;
        PDFForm.toolbarButtons.forEach(function (e) {
            var eventFuncs = eventBus.get(e);
            eventBus.remove(e);
            eventBus.on(e, function () {
                if (_this.validateForm($("#" + e), _super.prototype.validateFields.call(_this))) {
                    _this.prepareData();
                    eventFuncs.forEach(function (f) { return f(); });
                }
            });
        });
        this.prepareFirstPage();
    };
    return USI9Supplement;
}(USI9SupplementTranslator));
eventBus.on('textlayerrendered', function (e) {
    var form = new USI9Supplement();
    form.renderSections();
});
