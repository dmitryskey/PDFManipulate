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
        this.nameFormat = /^[A-Za-z ']+$/;
        this.nameInitialFormat = /^[A-Za-z]{1}$/;
        this.stateFormat = /^[A-Z]{2,3}$/;
        this.NAFormat = /^[NnAa/]+$/;
        this.NAString = /^N\/A$/;
        this.zipFormat = /^\d+$/;
        this.postalFormat = /^[A-Za-z0-9]+$/;
        this.zipNumberFormat = /^\d{5}$/;
        this.postalCodeFormat = /^[A-Za-z0-9]{6}$/;
        this.dateFormat = /^\d{2}[/]{1}\d{2}[/]{1}\d{4}$/;
        this.numberFormat = /^\d{1}$/;
        this.numberWithDashesFormat = /^\d{1}|\-{1}$/;
        this.emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.phoneFormat = /^[\d/NA-]+$/;
        this.phoneNumber = /^\d{3}\-{1}\d{3}\-{1}\d{4}$/;
        this.uscisNumberFormat = /^\d{7,9}$/;
        this.admissionNumberFormat = /^\d{11}$/;
        this.usPassportNumberFormat = /^[a-zA-Z0-9]{6,9}$/;
        this.greenCardNumberFormat = /^[A-Za-z]{3}[0-9]{10}$|\d{7,9}|\d{3}\-{0,1}\d{3}\-{0,1}\d{3}$/;
        this.cardNumberFormat = /^[A-Za-z]{3}[0-9]{10}$/;
        this.passportNumberFormat = /^[a-zA-Z0-9]{6,12}$/;
        this.driverLicenseNumberFormat = /^[a-zA-Z0-9]{8,14}$/;
        this.ssnFormat = /^\d{3}[-]*\d{2}[-]*\d{4}$/;
        this.annotationName = 'annotation-name';
        this.annotationRequired = 'annotation-required';
        this.annotationNext = 'annotation-next';
        this.na = this._('NA');
        this.space = ' ';
        this.blankItem = '&nbsp;';
        this.backSpaceCode = 'Backspace';
        var self = this;
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
    }
    PDFForm.prototype._ = function (t) {
        return document.webL10n.get(t);
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
        options.children().filter('[value="' + val + '"]').each(function (index, value) {
            value.onclick(null);
        });
    };
    PDFForm.prototype.setCombolistText = function (ctrl, val, txt) {
        var options = ctrl.parent().children().filter('.combo-content');
        options.children().filter('[value="' + val + '"]').html(txt);
    };
    PDFForm.prototype.assignCombolistEventHandler = function (ctrl, f) {
        ctrl.parent().children().filter('.combo-content').click(f);
    };
    PDFForm.prototype.renderControl = function (ctrl, text) {
        if (navigator.platform.indexOf('iPad') != -1 || navigator.platform.indexOf('iPhone') != -1) {
            return ctrl;
        }
        else {
            return ctrl.focus(function (e) { return $(e.target).tooltip('close'); }).prop('title', '')
                .tooltip({ content: text, show: { delay: 1000 } });
        }
    };
    PDFForm.prototype.renderHelpIcon = function (ctrl, title, dialog, text, minWidth) {
        if (minWidth === void 0) { minWidth = 50; }
        var self = this;
        var tag = 'div';
        ctrl.hide().parent().children(tag).remove();
        return ctrl.parent().append('<' + tag + '>�</' + tag + '>')
            .children(tag).prop('title', title)
            .css({ 'color': ctrl.css('color'),
            'font-size': ctrl.css('font-size') })
            .toggleClass('icon').parent().click(function (e) {
            $('.ui-dialog-titlebar-close').attr('title', '');
            dialog.text('').append(decodeURIComponent(text))
                .dialog('option', 'title', self._('help'))
                .dialog('option', 'minWidth', minWidth).dialog('open');
        });
    };
    PDFForm.prototype.urlParameter = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results === null) {
            return null;
        }
        else {
            return decodeURI(results[1]) || 0;
        }
    };
    PDFForm.prototype.addDialog = function () {
        $('body').append('<div id="dialogPage"></div>');
        $('#dialogPage').dialog({
            minHeight: 50,
            minWidth: 50,
            autoOpen: false,
            buttons: [{
                    text: 'OK',
                    click: function () {
                        $(this).dialog('close');
                    }
                }]
        });
    };
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
    USI9SupplementTranslator.prototype.renderTranslatorSection = function (dialog, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, sgnTranslator, sgnTranslatorHelp, translatorDate, translatorDateHelp, translatorLastName, translatorLastNameHelp, translatorFirstName, translatorFirstNameHelp, translatorAddress, translatorAddressHelp, translatorCity, translatorCityHelp, translatorState, translatorStateHelp, translatorZip, translatorZipHelp, sgnTranslator2, translatorDate2, translatorLastName2, translatorFirstName2, translatorAddress2, translatorCity2, translatorState2, translatorZip2, sgnTranslator3, translatorDate3, translatorLastName3, translatorFirstName3, translatorAddress3, translatorCity3, translatorState3, translatorZip3, sgnTranslator4, translatorDate4, translatorLastName4, translatorFirstName4, translatorAddress4, translatorCity4, translatorState4, translatorZip4) {
        var _this = this;
        $('a').prop('target', '_blank');
        this._lastName = this.renderControl(lastName, this._('lastnamehelp.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._lastNameHelp = this.renderHelpIcon(lastNameHelp, this._('lastnamehelp.caption'), dialog, this._('lastnamehelp.text'));
        this._firstName = this.renderControl(firstName, this._('firstnamehelp.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._firstNameHelp = this.renderHelpIcon(firstNameHelp, this._('firstnamehelp.caption'), dialog, this._('firstnamehelp.text'));
        this._middleInitial = this.renderControl(middleInitial, this._('middleinitialhelp.tooltip'))
            .keypress(function (e) {
            return _this.nameFormat.test(e.key) || _this.NAFormat.test(e.key) || e.key === _this.backSpaceCode;
        });
        this._middleInitialHelp = this.renderHelpIcon(middleInitialHelp, this._('middleinitialhelp.caption'), dialog, this._('middleinitialhelp.text'));
        this._sgnTranslator = this.renderControl(sgnTranslator, this._('sgntranslator.tooltip'));
        this._sgnTranslatorHelp = this.renderHelpIcon(sgnTranslatorHelp, this._('sgntranslatorhelp.caption'), dialog, this._('sgntranslatorhelp.text'));
        this._translatorDate = this.renderControl(translatorDate, this._('translatordate.tooltip'))
            .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled');
        this._translatorDateHelp = this.renderHelpIcon(translatorDateHelp, this._('translatordatehelp.caption'), dialog, this._('translatordatehelp.text'));
        this._translatorLastName = this.renderControl(translatorLastName, this._('translatorlastname.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._translatorLastNameHelp = this.renderHelpIcon(translatorLastNameHelp, this._('translatorlastnamehelp.caption'), dialog, this._('translatorlastnamehelp.text'));
        this._translatorFirstName = this.renderControl(translatorFirstName, this._('translatorfirstname.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._translatorFirstNameHelp = this.renderHelpIcon(translatorFirstNameHelp, this._('translatorfirstnamehelp.caption'), dialog, this._('translatorfirstnamehelp.text'));
        this._translatorAddress = this.renderControl(translatorAddress, this._('translatoraddress.tooltip'));
        this._translatorAddressHelp = this.renderHelpIcon(translatorAddressHelp, this._('translatoraddresshelp.caption'), dialog, this._('translatoraddresshelp.text'));
        this._translatorCity = this.renderControl(translatorCity, this._('translatorcity.tooltip'));
        this._translatorCityHelp = this.renderHelpIcon(translatorCityHelp, this._('translatorcityhelp.caption'), dialog, this._('translatorcityhelp.text'));
        this._translatorState = this.renderControl(translatorState, this._('translatorstate.tooltip'));
        this.setCombolistText(this._translatorState, ' ', this.blankItem);
        this._translatorStateHelp = this.renderHelpIcon(translatorStateHelp, this._('translatorstatehelp.caption'), dialog, this._('translatorstatehelp.text'));
        this._translatorZip = this.renderControl(translatorZip, this._('translatorzip.tooltip'))
            .keypress(function (e) { return _this.zipFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._translatorZipHelp = this.renderHelpIcon(translatorZipHelp, this._('translatorziphelp.caption'), dialog, this._('translatorziphelp.text'));
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
var USI9Supplement = (function (_super) {
    __extends(USI9Supplement, _super);
    function USI9Supplement() {
        var _this = _super.call(this) || this;
        _this.addDialog();
        return _this;
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
        $('[' + this.annotationName + ']').each(function (index, ctrl) {
            var op = !ctrl.disabled;
            PDFViewerApplication.fieldsData.entries.push({
                'name': ctrl.getAttribute(_this.annotationName),
                'value': op ? (ctrl.type === 'checkbox' ? (ctrl.checked ? 'On' : 'Off') : ctrl.value) : '',
                'operation': op ? 's' : 'd'
            });
        });
    };
    USI9Supplement.prototype.prepareFirstPage = function () {
        this.renderTranslatorSection($('#dialogPage'), $('[' + this.annotationName + '=LastName]'), $('[' + this.annotationName + '=LastNameHelp]'), $('[' + this.annotationName + '=FirstName]'), $('[' + this.annotationName + '=FirstNameHelp]'), $('[' + this.annotationName + '=MiddleInitial]'), $('[' + this.annotationName + '=MiddleInitialHelp]'), $('[' + this.annotationName + '=sgnTranslator]'), $('[' + this.annotationName + '=sgnTranslatorHelp]'), $('[' + this.annotationName + '=TranslatorDate]'), $('[' + this.annotationName + '=TranslatorDateHelp]'), $('[' + this.annotationName + '=TranslatorLastName]'), $('[' + this.annotationName + '=TranslatorLastNameHelp]'), $('[' + this.annotationName + '=TranslatorFirstName]'), $('[' + this.annotationName + '=TranslatorFirstNameHelp]'), $('[' + this.annotationName + '=TranslatorAddress]'), $('[' + this.annotationName + '=TranslatorAddressHelp]'), $('[' + this.annotationName + '=TranslatorCity]'), $('[' + this.annotationName + '=TranslatorCityHelp]'), $('[' + this.annotationName + '=TranslatorState]'), $('[' + this.annotationName + '=TranslatorStateHelp]'), $('[' + this.annotationName + '=TranslatorZip]'), $('[' + this.annotationName + '=TranslatorZipHelp]'), $('[' + this.annotationName + '=sgnTranslator2]'), $('[' + this.annotationName + '=TranslatorDate2]'), $('[' + this.annotationName + '=TranslatorLastName2]'), $('[' + this.annotationName + '=TranslatorFirstName2]'), $('[' + this.annotationName + '=TranslatorAddress2]'), $('[' + this.annotationName + '=TranslatorCity2]'), $('[' + this.annotationName + '=TranslatorState2]'), $('[' + this.annotationName + '=TranslatorZip2]'), $('[' + this.annotationName + '=sgnTranslator3]'), $('[' + this.annotationName + '=TranslatorDate3]'), $('[' + this.annotationName + '=TranslatorLastName3]'), $('[' + this.annotationName + '=TranslatorFirstName3]'), $('[' + this.annotationName + '=TranslatorAddress3]'), $('[' + this.annotationName + '=TranslatorCity3]'), $('[' + this.annotationName + '=TranslatorState3]'), $('[' + this.annotationName + '=TranslatorZip3]'), $('[' + this.annotationName + '=sgnTranslator4]'), $('[' + this.annotationName + '=TranslatorDate4]'), $('[' + this.annotationName + '=TranslatorLastName4]'), $('[' + this.annotationName + '=TranslatorFirstName4]'), $('[' + this.annotationName + '=TranslatorAddress4]'), $('[' + this.annotationName + '=TranslatorCity4]'), $('[' + this.annotationName + '=TranslatorState4]'), $('[' + this.annotationName + '=TranslatorZip4]'));
    };
    USI9Supplement.prototype.validateForm = function (dialog) {
        var errorMessages = _super.prototype.validateFields.call(this);
        if (errorMessages.length > 0) {
            var errorMessage = this._('error.header') + '<br />';
            errorMessages.forEach(function (element) {
                errorMessage += ' - ' + element + '<br />';
            });
            $('.ui-dialog-titlebar-close').attr('title', '');
            dialog.dialog('option', 'minWidth', 500).text('')
                .dialog('option', 'title', this._('validation'))
                .append(errorMessage).dialog('open');
            return false;
        }
        else {
            return true;
        }
    };
    USI9Supplement.prototype.renderSections = function () {
        var _this = this;
        $('#print').off('click').click(function () {
            if (_this.validateForm($('#dialogPage'))) {
                _this.prepareData();
                PDFViewerApplication.print();
            }
        });
        $('#download').off('click').click(function () {
            if (_this.validateForm($('#dialogPage'))) {
                _this.prepareData();
                PDFViewerApplication.download();
            }
        });
        this.prepareFirstPage();
    };
    return USI9Supplement;
}(USI9SupplementTranslator));
$(document).on('textlayerrendered', function (e) {
    var form = new USI9Supplement();
    form.renderSections();
});
