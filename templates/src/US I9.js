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
var USI9Fields = (function (_super) {
    __extends(USI9Fields, _super);
    function USI9Fields() {
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
    USI9Fields.prototype.validateDateRange = function (f, parameter, errorMessages, prefix) {
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
    USI9Fields.prototype.validateTextField = function (f, parameter, regExp, validateIfEmpty, errorMessages, prefix) {
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
        else if ((f && f.val() !== '' || validateIfEmpty) && regExp.length > 0) {
            var validFlag = false;
            for (var _i = 0, regExp_1 = regExp; _i < regExp_1.length; _i++) {
                var r = regExp_1[_i];
                if (f && r.test(f.val())) {
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
    USI9Fields.prototype.filterCombolist = function (ctrl, items, defaultValue, fields, callback) {
        var _this = this;
        if (!ctrl) {
            return;
        }
        var options = ctrl.parent().children().filter('.combo-content');
        for (var index in items) {
            options.children().filter('[value="' + index + '"]').html(items[index]);
        }
        options.children().show();
        options.children().each(function (code, item) {
            var val = item.getAttribute('value');
            if (items && !(val in items)) {
                options.children().filter('[value="' + val + '"]').hide();
            }
        });
        if (callback) {
            options.children().click(function (e) {
                var inputText = e.target.parentNode.parentNode.getElementsByTagName('input')[0];
                if (e.target.innerHTML === _this.blankItem) {
                    inputText.value = '';
                }
                callback(inputText.getAttribute(_this.annotationName), e.target.getAttribute('value'), fields);
            });
        }
        if (defaultValue) {
            this.setCombolistValue(ctrl, defaultValue);
        }
        else {
            ctrl.val('');
        }
    };
    return USI9Fields;
}(PDFForm));
var USI9Section1 = (function (_super) {
    __extends(USI9Section1, _super);
    function USI9Section1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    USI9Section1.prototype.renderNameAndAddress = function (tabIndex, dialog, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, otherNames, otherNamesHelp, address, addressHelp, apptNumber, apptNumberHelp, city, cityHelp, state, stateHelp, zip, zipHelp) {
        var _this = this;
        this._lastName = this.renderControl(lastName, this._('lastnamehelp.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._lastNameHelp = this.renderHelpIcon(lastNameHelp, this._('lastnamehelp.caption'), dialog, this._('lastnamehelp.text'));
        this._firstName = this.renderControl(firstName, this._('firstnamehelp.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._firstNameHelp = this.renderHelpIcon(firstNameHelp, this._('firstnamehelp.caption'), dialog, this._('firstnamehelp.text'));
        this._middleInitial = this.renderControl(middleInitial, this._('middleinitialhelp.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || _this.NAFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._middleInitialHelp = this.renderHelpIcon(middleInitialHelp, this._('middleinitialhelp.caption'), dialog, this._('middleinitialhelp.text'));
        this._otherNames = this.renderControl(otherNames, this._('othernameshelp.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || _this.NAFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._otherNamesHelp = this.renderHelpIcon(otherNamesHelp, this._('othernameshelp.caption'), dialog, this._('othernameshelp.text'));
        this._address = this.renderControl(address, this._('addresshelp.tooltip'))
            .attr('tabindex', tabIndex++);
        this._addressHelp = this.renderHelpIcon(addressHelp, this._('addresshelp.caption'), dialog, this._('addresshelp.text'));
        this._apptNumber = this.renderControl(apptNumber, this._('apartmentnumberhelp.tooltip'))
            .attr('tabindex', tabIndex++);
        this._apptNumberHelp = this.renderHelpIcon(apptNumberHelp, this._('apartmentnumberhelp.caption'), dialog, this._('apartmentnumberhelp.text'));
        this._city = this.renderControl(city, this._('cityhelp.tooltip'))
            .attr('tabindex', tabIndex++);
        this._cityHelp = this.renderHelpIcon(cityHelp, this._('cityhelp.caption'), dialog, this._('cityhelp.text'));
        this._state = state
            .focus(function (e) {
            $(e.target).tooltip('close');
            var nonUSCountries = ['CAN', 'MEX'];
            var zipCode = nonUSCountries.indexOf(e.currentTarget.value) < 0;
            _this._zip.unbind('keypress');
            _this._zip.keypress(function (e) {
                return ((nonUSCountries.indexOf(_this._state.val()) < 0
                    ? _this.zipFormat : _this.postalFormat).test(e.key) || e.key === _this.backSpaceCode);
            });
            _this._zip.prop('maxLength', zipCode ? 5 : 6);
        })
            .prop('title', '').attr(this.annotationRequired, 'true')
            .tooltip({ content: this._('statehelp.tooltip') })
            .attr('tabindex', tabIndex++);
        this.setCombolistText(this._state, this.space, this.blankItem);
        this._stateHelp = this.renderHelpIcon(stateHelp, this._('statehelp.caption'), dialog, this._('statehelp.text'));
        this._zip = this.renderControl(zip, this._('ziphelp.tooltip'))
            .keypress(function (e) { return _this.zipFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._zipHelp = this.renderHelpIcon(zipHelp, this._('ziphelp.caption'), dialog, this._('ziphelp.text'));
        return tabIndex;
    };
    USI9Section1.prototype.renderSSNFields = function (ssn, tabIndex) {
        var _this = this;
        this._ssn = ssn;
        for (var i = 0; i < ssn.length - 1; i++) {
            this._ssn[i]
                .attr(this.annotationNext, (this._ssn[i + 1]).attr(this.annotationName))
                .focus(function (e) { return $(e.target).tooltip('close'); }).prop('title', '')
                .tooltip({ content: this._('ssnhelp.tooltip') })
                .keypress(function (e) {
                if (_this.numberFormat.test(e.key)) {
                    $('[' + _this.annotationName + '=' + $(e.target).attr(_this.annotationNext) + ']').focus();
                    return true;
                }
                else {
                    return e.key === _this.backSpaceCode;
                }
            }).keydown(function (e) {
                if (e.keyCode === 8) {
                    $('[' + _this.annotationNext + '=' + $(e.target).attr(_this.annotationName) + ']').focus();
                }
            })
                .attr('tabindex', tabIndex++);
        }
        this.renderControl(this._ssn[ssn.length - 1], this._('ssnhelp.tooltip'))
            .keypress(function (e) { return _this.numberFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        return tabIndex;
    };
    USI9Section1.prototype.renderPersonalData = function (tabIndex, dialog, dob, dobHelp, ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34, ssnHelp, email, emailHelp, phone, phoneHelp) {
        var _this = this;
        var maxDOB = new Date();
        maxDOB.setFullYear(maxDOB.getFullYear() - 14);
        this._dob = this.renderControl(dob, this._('dobhelp.tooltip'))
            .datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1908:' + maxDOB.getFullYear(),
            maxDate: maxDOB
        }).attr('autocomplete', 'disabled')
            .attr('tabindex', tabIndex++);
        this._dobHelp = this.renderHelpIcon(dobHelp, this._('dobhelp.caption'), dialog, this._('dobhelp.text'));
        tabIndex = this.renderSSNFields([ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34], tabIndex);
        this._ssnHelp = this.renderHelpIcon(ssnHelp, this._('ssnhelp.caption'), dialog, this._('ssnhelp.text'), 400);
        this._email = this.renderControl(email, this._('emailhelp.tooltip'))
            .attr('tabindex', tabIndex++);
        this._emailHelp = this.renderHelpIcon(emailHelp, this._('emailhelp.caption'), dialog, this._('emailhelp.text'));
        this._phone = this.renderControl(phone, this._('phonehelp.tooltip'))
            .keypress(function (e) { return _this.phoneFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._phoneHelp = this.renderHelpIcon(phoneHelp, this._('phonehelp.caption'), dialog, this._('phonehelp.text'));
        return tabIndex;
    };
    USI9Section1.prototype.renderCitizenship = function (tabIndex, dialog, citizen, citizenHelp, national, nationalHelp, lpr, lprHelp, alien, alienHelp, uscisNumberHelp, lpruscisNumPrefix, lpruscisNum, lpruscisNumType, alienWorkAuthDate, alienuscisNumPrefix, alienuscisNum, alienuscisNumType, admissionNum, admissionNumHelp, passportNum, passportNumHelp, countryOfIssuance, countryOfIssuanceHelp, sgnEmployee, sgnEmployeeHelp, sgnEmployeeDate, sgnEmployeeDateHelp) {
        var _this = this;
        this._citizen = this.renderControl(citizen, this._('citizenhelp.tooltip'))
            .attr('tabindex', tabIndex++);
        this._citizenHelp = this.renderHelpIcon(citizenHelp, this._('citizenhelp.caption'), dialog, this._('citizenhelp.text'));
        this._national = this.renderControl(national, this._('nationalhelp.tooltip'))
            .attr('tabindex', tabIndex++);
        this._nationalHelp = this.renderHelpIcon(nationalHelp, this._('nationalhelp.caption'), dialog, this._('nationalhelp.text'));
        this._lpr = this.renderControl(lpr, this._('lprhelp.tooltip'))
            .attr('tabindex', tabIndex++);
        this._lprHelp = this.renderHelpIcon(lprHelp, this._('lprhelp.caption'), dialog, this._('lprhelp.text'));
        this._alien = this.renderControl(alien, this._('alienhelp.tooltip'))
            .attr('tabindex', tabIndex++);
        this._alienHelp = this.renderHelpIcon(alienHelp, this._('alienhelp.caption'), dialog, this._('alienhelp.text'), 500);
        this._uscisNumberHelp = this.renderHelpIcon(uscisNumberHelp, this._('uscisnumberhelp.caption'), dialog, this._('uscisnumberhelp.text'));
        this._lpruscisNumPrefix = lpruscisNumPrefix;
        this._lpruscisNum = this.renderControl(lpruscisNum, this._('uscisnumber.tooltip'))
            .keypress(function (e) { return _this.numberFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._lpruscisNumType = this.renderControl(lpruscisNumType, this._('uscisnumbertype.tooltip'))
            .attr('tabindex', tabIndex++);
        this.assignCombolistEventHandler(this._lpruscisNumType, function (e) {
            return _this._lpruscisNumPrefix.val(e.target.getAttribute('value') === 'A' ? 'A' : '');
        });
        this._alienWorkAuthDate = this.renderControl(alienWorkAuthDate, this._('alienworkauthdate.tooltip'))
            .datepicker({ changeMonth: true, changeYear: true, minDate: new Date() }).attr('autocomplete', 'disabled')
            .unbind('keypress')
            .keypress(function (e) { return /[\d/]/g.test(e.key) || _this.NAFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._alienuscisNumPrefix = alienuscisNumPrefix;
        this._alienuscisNum = this.renderControl(alienuscisNum, this._('uscisnumber.tooltip'))
            .keypress(function (e) { return _this.numberFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._alienuscisNumType = this.renderControl(alienuscisNumType, this._('uscisnumbertype.tooltip'))
            .attr('tabindex', tabIndex++);
        this.assignCombolistEventHandler(this._alienuscisNumType, function (e) {
            return _this._alienuscisNumPrefix.val(e.target.getAttribute('value') === 'A' ? 'A' : '');
        });
        this._admissionNum = this.renderControl(admissionNum, this._('admissionnumber.tooltip'))
            .keypress(function (e) { return _this.numberFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._admissionNumHelp = this.renderHelpIcon(admissionNumHelp, this._('admissionnumberhelp.caption'), dialog, this._('admissionnumberhelp.text'));
        this._passportNum = this.renderControl(passportNum, this._('passportnumber.tooltip'))
            .attr('tabindex', tabIndex++);
        this._passportNumHelp = this.renderHelpIcon(passportNumHelp, this._('passportnumberhelp.caption'), dialog, this._('passportnumberhelp.text'));
        this._countryOfIssuance = this.renderControl(countryOfIssuance, this._('coi.tooltip'))
            .attr('tabindex', tabIndex++);
        this._countryOfIssuanceHelp = this.renderHelpIcon(countryOfIssuanceHelp, this._('coihelp.caption'), dialog, this._('coihelp.text'));
        this._sgnEmployee = this.renderControl(sgnEmployee, this._('sgnemployee.tooltip'))
            .attr('tabindex', tabIndex++);
        this._sgnEmployeeHelp = this.renderHelpIcon(sgnEmployeeHelp, this._('sgnemployeehelp.caption'), dialog, this._('sgnemployeehelp.text'), 700);
        this._sgnEmployeeDate = this.renderControl(sgnEmployeeDate, this._('employeedate.tooltip'))
            .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled')
            .attr('tabindex', tabIndex++);
        this._sgnEmployeeDateHelp = this.renderHelpIcon(sgnEmployeeDateHelp, this._('employeedatehelp.caption'), dialog, this._('employeedatehelp.text'));
        return tabIndex;
    };
    USI9Section1.prototype.renderSection1 = function (tabIndex, dialog, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, otherNames, otherNamesHelp, address, addressHelp, apptNumber, apptNumberHelp, city, cityHelp, state, stateHelp, zip, zipHelp, dob, dobHelp, ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34, ssnHelp, email, emailHelp, phone, phoneHelp, citizen, citizenHelp, national, nationalHelp, lpr, lprHelp, alien, alienHelp, uscisNumberHelp, lpruscisNumPrefix, lpruscisNum, lpruscisNumType, alienWorkAuthDate, alienuscisNumPrefix, alienuscisNum, alienuscisNumType, admissionNum, admissionNumHelp, passportNum, passportNumHelp, countryOfIssuance, countryOfIssuanceHelp, sgnEmployee, sgnEmployeeHelp, sgnEmployeeDate, sgnEmployeeDateHelp) {
        $('a').prop('target', '_blank');
        tabIndex = this.renderNameAndAddress(tabIndex, dialog, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, otherNames, otherNamesHelp, address, addressHelp, apptNumber, apptNumberHelp, city, cityHelp, state, stateHelp, zip, zipHelp);
        tabIndex = this.renderPersonalData(tabIndex, dialog, dob, dobHelp, ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34, ssnHelp, email, emailHelp, phone, phoneHelp);
        tabIndex = this.renderCitizenship(tabIndex, dialog, citizen, citizenHelp, national, nationalHelp, lpr, lprHelp, alien, alienHelp, uscisNumberHelp, lpruscisNumPrefix, lpruscisNum, lpruscisNumType, alienWorkAuthDate, alienuscisNumPrefix, alienuscisNum, alienuscisNumType, admissionNum, admissionNumHelp, passportNum, passportNumHelp, countryOfIssuance, countryOfIssuanceHelp, sgnEmployee, sgnEmployeeHelp, sgnEmployeeDate, sgnEmployeeDateHelp);
        return tabIndex;
    };
    USI9Section1.prototype.validateFields = function () {
        var _this = this;
        var errorMessages = [];
        [this._middleInitial, this._otherNames, this._apptNumber, this._email, this._phone]
            .filter(function (f) { return f.val().trim() === '' || f.val().toUpperCase() === _this.na; })
            .forEach(function (f) { return f.val(_this.na); });
        this.validateTextField(this._lastName, this._('name.last'), [this.nameFormat], false, errorMessages);
        this.validateTextField(this._firstName, this._('name.first'), [this.nameFormat], false, errorMessages);
        this.validateTextField(this._middleInitial, this._('name.middleinitial'), [this.nameInitialFormat, this.NAString], false, errorMessages);
        this.validateTextField(this._otherNames, this._('name.othernames'), [this.nameFormat, this.NAString], false, errorMessages);
        this.validateTextField(this._address, this._('address.address'), [], false, errorMessages);
        this.validateTextField(this._apptNumber, this._('address.apartment'), [], false, errorMessages);
        this.validateTextField(this._city, this._('address.city'), [], false, errorMessages);
        this.validateTextField(this._state, this._('address.state'), [this.stateFormat], false, errorMessages);
        this.validateTextField(this._zip, this._('address.zip'), [['CAN', 'MEX'].indexOf(this._state.val()) < 0 ? this.zipNumberFormat : this.postalCodeFormat], false, errorMessages);
        this.validateTextField(this._dob, this._('date.dob'), [this.dateFormat], true, errorMessages);
        var areaCode = Math.round(100 * this._ssn[0].val() +
            10 * this._ssn[1].val() +
            1 * this._ssn[2].val());
        this._ssn.forEach(function (field) { return field.toggleClass(_this.invalidFieldClass, false); });
        if (this._ssn.filter(function (element) { return element.val() !== ''; }).length > 0) {
            if (this._ssn.filter(function (element) { return element.val() === ''; }).length > 0) {
                errorMessages.push(this._('ssn.allfields'));
                this._ssn.forEach(function (field) { return field.toggleClass(_this.invalidFieldClass, true); });
            }
            else if (this._ssn.filter(function (element) { return !_this.numberFormat.test(element.val()); }).length > 0) {
                errorMessages.push(this._('ssn.allnumeric'));
                this._ssn.filter(function (element) { return !_this.numberFormat.test(element.val()); }).forEach(function (field) { return field.toggleClass(_this.invalidFieldClass, true); });
            }
            else if (areaCode === 0 || areaCode === 666 || areaCode > 899) {
                errorMessages.push(this._('ssn.areanumber'));
                [this._ssn[0], this._ssn[1], this._ssn[2]].forEach(function (field) { return field.toggleClass(_this.invalidFieldClass, true); });
            }
            else if (Math.round(10 * this._ssn[3].val() + 1 * this._ssn[4].val()) === 0) {
                errorMessages.push(this._('ssn.groupnumber'));
                [this._ssn[3], this._ssn[4]].forEach(function (field) { return field.toggleClass(_this.invalidFieldClass, true); });
            }
            else if (Math.round(1000 * this._ssn[5].val() +
                100 * this._ssn[6].val() +
                10 * this._ssn[7].val() +
                1 * this._ssn[8].val()) === 0) {
                errorMessages.push(this._('ssn.serialnumber'));
                [this._ssn[5], this._ssn[6], this._ssn[7], this._ssn[8]].forEach(function (field) { return field.toggleClass(_this.invalidFieldClass, true); });
            }
        }
        this.validateTextField(this._email, this._('email.address'), [this.NAString, this.emailFormat], false, errorMessages);
        this.validateTextField(this._phone, this._('employee.phone'), [this.NAString, this.phoneNumber], false, errorMessages);
        var citizenship = [this._citizen, this._national, this._lpr, this._alien];
        var statusSelected = citizenship.filter(function (status) { return status.prop('checked'); }).length > 0;
        if (!statusSelected) {
            errorMessages.push(this._('citizenship.status'));
        }
        citizenship.forEach(function (status) { return status.toggleClass(_this.invalidFieldClass, !statusSelected); });
        if (this._lpr.prop('checked')) {
            this._lpruscisNum.attr(this.annotationRequired, 'true');
            this.validateTextField(this._lpruscisNum, this._('citizenship.uscis'), [this.uscisNumberFormat], true, errorMessages);
        }
        else {
            this._lpruscisNum.removeAttr(this.annotationRequired);
        }
        if (this._alien.prop('checked')) {
            this._alienWorkAuthDate.attr(this.annotationRequired, 'true');
            this.validateTextField(this._alienWorkAuthDate, this._('citizenship.alienworkauthdate'), [this.NAString, this.dateFormat], true, errorMessages);
            [this._alienuscisNum, this._admissionNum, this._passportNum, this._countryOfIssuance].forEach(function (field) {
                return field.toggleClass(_this.invalidFieldClass, false);
            });
            this.validateTextField(this._alienuscisNum, this._('citizenship.uscis'), [this.NAString, this.uscisNumberFormat], false, errorMessages);
            this.validateTextField(this._admissionNum, this._('citizenship.admission'), [this.NAString, this.admissionNumberFormat], false, errorMessages);
            this.validateTextField(this._passportNum, this._('citizenship.passport'), [this.NAString, this.passportNumberFormat], false, errorMessages);
            if (this.EmptyOrNA(this._alienuscisNum) && this.EmptyOrNA(this._admissionNum) &&
                this.EmptyOrNA(this._passportNum) && this.EmptyOrNA(this._countryOfIssuance)) {
                [this._alienuscisNum, this._admissionNum, this._passportNum, this._countryOfIssuance].forEach(function (field) {
                    return field.toggleClass(_this.invalidFieldClass, true);
                });
                errorMessages.push(this.paramExistsMsg.replace('${prefix}', '')
                    .replace('${parameter}', this._('citizenship.alienadmissionpassport')));
            }
            else if (this.EmptyOrNA(this._alienuscisNum) && this.EmptyOrNA(this._admissionNum) &&
                (this.EmptyOrNA(this._passportNum) || this.EmptyOrNA(this._countryOfIssuance))) {
                [this._passportNum, this._countryOfIssuance].forEach(function (field) {
                    return field.toggleClass(_this.invalidFieldClass, true);
                });
                errorMessages.push(this.paramExistsMsg.replace('${prefix}', '')
                    .replace('${parameter}', this._('citizenship.passportcountry')));
            }
        }
        else {
            this._alienWorkAuthDate.removeAttr(this.annotationRequired);
        }
        this.validateTextField(this._sgnEmployeeDate, this._('date.sgnemployee'), [this.dateFormat], true, errorMessages);
        return errorMessages;
    };
    USI9Section1.prototype.EmptyOrNA = function (field) {
        return [null, '', this.na].indexOf(field.val()) >= 0;
    };
    return USI9Section1;
}(USI9Fields));
var USI9Translator = (function (_super) {
    __extends(USI9Translator, _super);
    function USI9Translator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    USI9Translator.prototype.renderTranslatorSection = function (tabIndex, dialog, translatorNo, translatorYes, translatorHelp, sgnTranslator, sgnTranslatorHelp, translatorDate, translatorDateHelp, translatorLastName, translatorLastNameHelp, translatorFirstName, translatorFirstNameHelp, translatorAddress, translatorAddressHelp, translatorCity, translatorCityHelp, translatorState, translatorStateHelp, translatorZip, translatorZipHelp) {
        var _this = this;
        var translator = [translatorNo, translatorYes];
        this._translatorNo = this.renderControl(translatorNo, this._('translator.tooltip'))
            .click(function () {
            _this.selectCheckmark(_this._translatorNo, translator);
            _this._sgnTranslator.val('').prop('disabled', true);
            _this._translatorDate.val('').prop('disabled', true);
            _this._translatorLastName.val('').prop('disabled', true);
            _this._translatorFirstName.val('').prop('disabled', true);
            _this._translatorAddress.val('').prop('disabled', true);
            _this._translatorCity.val('').prop('disabled', true);
            _this._translatorState.val('').prop('disabled', true);
            _this._translatorZip.val('').prop('disabled', true);
        })
            .attr('tabindex', tabIndex++);
        this._translatorYes = this.renderControl(translatorYes, this._('translator.tooltip'))
            .click(function () {
            _this.selectCheckmark(_this._translatorYes, translator);
            _this._sgnTranslator.prop('disabled', false);
            _this._translatorDate.prop('disabled', false);
            _this._translatorLastName.prop('disabled', false);
            _this._translatorFirstName.prop('disabled', false);
            _this._translatorAddress.prop('disabled', false);
            _this._translatorCity.prop('disabled', false);
            _this._translatorState.prop('disabled', false);
            _this._translatorZip.prop('disabled', false);
        })
            .attr('tabindex', tabIndex++);
        this._translatorHelp = this.renderHelpIcon(translatorHelp, this._('translatorhelp.caption'), dialog, this._('translatorhelp.text'), 500);
        this._sgnTranslator = this.renderControl(sgnTranslator, this._('sgntranslator.tooltip'))
            .attr('tabindex', tabIndex++);
        this._sgnTranslatorHelp = this.renderHelpIcon(sgnTranslatorHelp, this._('sgntranslatorhelp.caption'), dialog, this._('sgntranslatorhelp.text'));
        this._translatorDate = this.renderControl(translatorDate, this._('translatordate.tooltip'))
            .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled')
            .attr('tabindex', tabIndex++);
        this._translatorDateHelp = this.renderHelpIcon(translatorDateHelp, this._('translatordatehelp.caption'), dialog, this._('translatordatehelp.text'));
        this._translatorLastName = this.renderControl(translatorLastName, this._('translatorlastname.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._translatorLastNameHelp = this.renderHelpIcon(translatorLastNameHelp, this._('translatorlastnamehelp.caption'), dialog, this._('translatorlastnamehelp.text'));
        this._translatorFirstName = this.renderControl(translatorFirstName, this._('translatorfirstname.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._translatorFirstNameHelp = this.renderHelpIcon(translatorFirstNameHelp, this._('translatorfirstnamehelp.caption'), dialog, this._('translatorfirstnamehelp.text'));
        this._translatorAddress = this.renderControl(translatorAddress, this._('translatoraddress.tooltip'))
            .attr('tabindex', tabIndex++);
        this._translatorAddressHelp = this.renderHelpIcon(translatorAddressHelp, this._('translatoraddresshelp.caption'), dialog, this._('translatoraddresshelp.text'));
        this._translatorCity = this.renderControl(translatorCity, this._('translatorcity.tooltip'))
            .attr('tabindex', tabIndex++);
        this._translatorCityHelp = this.renderHelpIcon(translatorCityHelp, this._('translatorcityhelp.caption'), dialog, this._('translatorcityhelp.text'));
        this._translatorState = this.renderControl(translatorState, this._('translatorstate.tooltip'))
            .attr('tabindex', tabIndex++);
        this.setCombolistText(this._translatorState, ' ', this.blankItem);
        this._translatorStateHelp = this.renderHelpIcon(translatorStateHelp, this._('translatorstatehelp.caption'), dialog, this._('translatorstatehelp.text'));
        this._translatorZip = this.renderControl(translatorZip, this._('translatorzip.tooltip'))
            .keypress(function (e) { return _this.zipFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._translatorZipHelp = this.renderHelpIcon(translatorZipHelp, this._('translatorziphelp.caption'), dialog, this._('translatorziphelp.text'));
        return tabIndex;
    };
    USI9Translator.prototype.validateFields = function () {
        var _this = this;
        var errorMessages = _super.prototype.validateFields.call(this);
        var translator = [this._translatorNo, this._translatorYes];
        var statusSelected = translator.filter(function (status) { return status.prop('checked'); }).length > 0;
        if (!statusSelected) {
            errorMessages.push(this._('translator.status'));
        }
        translator.forEach(function (status) { return status.toggleClass(_this.invalidFieldClass, !statusSelected); });
        if (this._translatorYes.prop('checked')) {
            this._translatorDate.attr(this.annotationRequired, 'true');
            this.validateTextField(this._translatorDate, this._('date.sgntranslator'), [this.dateFormat], true, errorMessages);
            this._translatorLastName.attr(this.annotationRequired, 'true');
            this.validateTextField(this._translatorLastName, this._('translator.lastname'), [this.nameFormat], true, errorMessages);
            this._translatorFirstName.attr(this.annotationRequired, 'true');
            this.validateTextField(this._translatorFirstName, this._('translator.firstname'), [this.nameFormat], true, errorMessages);
            this._translatorAddress.attr(this.annotationRequired, 'true');
            this.validateTextField(this._translatorAddress, this._('translator.address'), [], true, errorMessages);
            this._translatorCity.attr(this.annotationRequired, 'true');
            this.validateTextField(this._translatorCity, this._('translator.city'), [], true, errorMessages);
            this._translatorState.attr(this.annotationRequired, 'true');
            this.validateTextField(this._translatorState, this._('translator.state'), [], true, errorMessages);
            this._translatorZip.attr(this.annotationRequired, 'true');
            this.validateTextField(this._translatorZip, this._('translator.zip'), [this.zipNumberFormat], true, errorMessages);
        }
        else {
            this._translatorDate.removeAttr(this.annotationRequired);
            this._translatorLastName.removeAttr(this.annotationRequired);
            this._translatorFirstName.removeAttr(this.annotationRequired);
            this._translatorAddress.removeAttr(this.annotationRequired);
            this._translatorCity.removeAttr(this.annotationRequired);
            this._translatorState.removeAttr(this.annotationRequired);
            this._translatorZip.removeAttr(this.annotationRequired);
        }
        return errorMessages;
    };
    return USI9Translator;
}(USI9Section1));
var USI9Section2 = (function (_super) {
    __extends(USI9Section2, _super);
    function USI9Section2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.validationExpressionProp = 'validationexpression';
        _this.validationMessageProp = 'validationmessage';
        _this.freeTextProp = 'freeText';
        _this.requiredProp = 'required';
        return _this;
    }
    USI9Section2.prototype.renderSection2 = function (tabIndex, dialog, employeeInfoHelp, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, immigrationStatus, immigrationStatusHelp, listADoc, listADocHelp, listAIssuingAuthority, listAIssuingAuthorityHelp, listADocNumber, listADocNumberHelp, listADocExpDate, listADocExpDateHelp, listADoc2, listADoc2Help, listAIssuingAuthority2, listAIssuingAuthority2Help, listADocNumber2, listADocNumber2Help, listADocExpDate2, listADocExpDate2Help, listADoc3, listADoc3Help, listAIssuingAuthority3, listAIssuingAuthority3Help, listADocNumber3, listADocNumber3Help, listADocExpDate3, listADocExpDate3Help, listBDoc, listBDocHelp, listBIssuingAuthority, listBIssuingAuthorityHelp, listBDocNumber, listBDocNumberHelp, listBDocExpDate, listBDocExpDateHelp, listCDoc, listCDocHelp, listCIssuingAuthority, listCIssuingAuthorityHelp, listCDocNumber, listCDocNumberHelp, listCDocExpDate, listCDocExpDateHelp, additionalInfo, additionalInfoHelp, hireDate, hireDateHelp, sgnEmployer, sgnEmployerHelp, employerSignDate, employerSignDateHelp, employerTitle, employerTitleHelp, employerLastName, employerLastNameHelp, employerFirstName, employerFirstNameHelp, employerName, employerNameHelp, employerAddress, employerAddressHelp, employerCity, employerCityHelp, employerState, employerStateHelp, employerZip, employerZipHelp) {
        var _this = this;
        $('a').prop('target', '_blank');
        this._dob.change(function (e) {
            return _this.filterCombolist(_this._listBDoc, _this.getListBContent(e.target.value), _this.na, _this, _this.processListABC);
        });
        this._employeeInfoHelp = this.renderHelpIcon(employeeInfoHelp, this._('employeeinfosection2help.caption'), dialog, this._('employeeinfosection2help.text'));
        this._lastNameSection2 = lastName;
        this._lastNameSection2Help = this.renderHelpIcon(lastNameHelp, this._('lastnamesection2help.caption'), dialog, this._('lastnamesection2help.text'));
        this._firstNameSection2 = firstName;
        this._firstNameSection2Help = this.renderHelpIcon(firstNameHelp, this._('firstnamesection2help.caption'), dialog, this._('firstnamesection2help.text'));
        this._middleInitialSection2 = middleInitial;
        this._middleInitialSection2Help = this.renderHelpIcon(middleInitialHelp, this._('middleinitialsection2help.caption'), dialog, this._('middleinitialsection2help.text'));
        this._immigrationStatus = immigrationStatus;
        this._immigrationStatusHelp = this.renderHelpIcon(immigrationStatusHelp, this._('immigrationstatushelp.caption'), dialog, this._('immigrationstatushelp.text'));
        tabIndex = this.renderListABC(tabIndex, dialog, listADoc, listADocHelp, listAIssuingAuthority, listAIssuingAuthorityHelp, listADocNumber, listADocNumberHelp, listADocExpDate, listADocExpDateHelp, listADoc2, listADoc2Help, listAIssuingAuthority2, listAIssuingAuthority2Help, listADocNumber2, listADocNumber2Help, listADocExpDate2, listADocExpDate2Help, listADoc3, listADoc3Help, listAIssuingAuthority3, listAIssuingAuthority3Help, listADocNumber3, listADocNumber3Help, listADocExpDate3, listADocExpDate3Help, listBDoc, listBDocHelp, listBIssuingAuthority, listBIssuingAuthorityHelp, listBDocNumber, listBDocNumberHelp, listBDocExpDate, listBDocExpDateHelp, listCDoc, listCDocHelp, listCIssuingAuthority, listCIssuingAuthorityHelp, listCDocNumber, listCDocNumberHelp, listCDocExpDate, listCDocExpDateHelp);
        this._additionalInfo = this.renderControl(additionalInfo, this._('additionalinfo.tooltip'))
            .attr('tabindex', tabIndex++);
        this._additionalInfoHelp = this.renderHelpIcon(additionalInfoHelp, this._('additionalinfohelp.caption'), dialog, this._('additionalinfohelp.text'), 500);
        if (!this._citizen.prop('checked') && !this._national.prop('checked') &&
            !this._lpr.prop('checked') && this._alien.prop('checked')) {
            this.clearListABC();
        }
        this._hireDate = this.renderControl(hireDate, this._('hiredate.tooltip'))
            .datepicker().attr('autocomplete', 'disabled')
            .attr('tabindex', tabIndex++);
        this._hireDateHelp = this.renderHelpIcon(hireDateHelp, this._('hiredatehelp.caption'), dialog, this._('hiredatehelp.text'));
        tabIndex = this.renderEmployerData(tabIndex, dialog, sgnEmployer, sgnEmployerHelp, employerSignDate, employerSignDateHelp, employerTitle, employerTitleHelp, employerLastName, employerLastNameHelp, employerFirstName, employerFirstNameHelp, employerName, employerNameHelp, employerAddress, employerAddressHelp, employerCity, employerCityHelp, employerState, employerStateHelp, employerZip, employerZipHelp);
        return tabIndex;
    };
    USI9Section2.prototype.validateFields = function () {
        var _this = this;
        var errorMessages = _super.prototype.validateFields.call(this);
        var section2Fields = [
            this._listADoc,
            this._listAIssuingAuthority,
            this._listADocNumber,
            this._listADocExpDate,
            this._listADoc2,
            this._listAIssuingAuthority2,
            this._listADocNumber2,
            this._listADocExpDate2,
            this._listADoc3,
            this._listAIssuingAuthority3,
            this._listADocNumber3,
            this._listADocExpDate3,
            this._listBDoc,
            this._listBIssuingAuthority,
            this._listBDocNumber,
            this._listBDocExpDate,
            this._listCDoc,
            this._listCIssuingAuthority,
            this._listCDocNumber,
            this._listCDocExpDate,
            this._additionalInfo
        ];
        if (section2Fields.filter(function (f) { return f && f.val() && f.val().trim() !== ''; }).length == 0) {
            return errorMessages;
        }
        section2Fields.filter(function (f) { return (f.val().trim() === '' && !f.prop(_this.requiredProp))
            || f.val().toUpperCase() === _this.na; })
            .forEach(function (f) { return f.val(_this.na); });
        section2Fields.forEach(function (f) { return f.toggleClass(_this.invalidFieldClass, false); });
        this._lastNameSection2.val(this._lastName.val());
        this._firstNameSection2.val(this._firstName.val());
        this._middleInitialSection2.val(this._middleInitial.val());
        this._immigrationStatus.val(this._citizen.prop('checked') ? 1 :
            (this._national.prop('checked') ? 2 : (this._lpr.prop('checked') ? 3 :
                (this._alien.prop('checked') ? 4 : ''))));
        if ((this._listADoc.val().trim() !== this.na &&
            (this._listBDoc.val().trim() !== this.na ||
                this._listCDoc.val().trim() !== this.na) ||
            (this._listADoc.val().trim() === this.na &&
                (this._listBDoc.val().trim() === this.na ||
                    this._listCDoc.val().trim() === this.na)))) {
            errorMessages.push(this._('section2.listabc'));
        }
        else if (this._listADoc.val().trim() !== this.na) {
            if (this._listAIssuingAuthority.val().trim() === '') {
                errorMessages.push(this._('section2.listafirstissuingauthority'));
                this._listAIssuingAuthority.toggleClass(this.invalidFieldClass, true);
            }
            if (this._listADocNumber.val().trim() === '') {
                errorMessages.push(this._('section2.listafirstdocnumber'));
                this._listADocNumber.toggleClass(this.invalidFieldClass, true);
            }
            else if (this._listADocNumber.prop(this.validationExpressionProp) &&
                !this._listADocNumber.prop(this.validationExpressionProp)
                    .test(this._listADocNumber.val()) &&
                this._listADocNumber.prop(this.validationMessageProp)) {
                errorMessages.push(this._listADocNumber.prop(this.validationMessageProp));
                this._listADocNumber.toggleClass(this.invalidFieldClass, true);
            }
            if (this._listAIssuingAuthority2.val().trim() === '') {
                errorMessages.push(this._('section2.listasecondissuingauthority'));
                this._listAIssuingAuthority2.toggleClass(this.invalidFieldClass, true);
            }
            if (this._listADocNumber2.val().trim() === '') {
                errorMessages.push(this._('section2.listaseconddocnumber'));
                this._listADocNumber2.toggleClass(this.invalidFieldClass, true);
            }
            if (this._listAIssuingAuthority3.val().trim() === '') {
                errorMessages.push(this._('section2.listathirdissuingauthority'));
                this._listAIssuingAuthority3.toggleClass(this.invalidFieldClass, true);
            }
            if (this._listADocNumber3.val().trim() === '') {
                errorMessages.push(this._('section2.listathirddocnumber'));
                this._listADocNumber3.toggleClass(this.invalidFieldClass, true);
            }
            if (!this.validateDateRange(this._listADocExpDate, '', []) ||
                (!this._listADocExpDate.prop(this.freeTextProp) &&
                    !this.validateTextField(this._listADocExpDate, '', [this.dateFormat, this.NAString], true, [])) ||
                (this._listADocExpDate.prop(this.freeTextProp) && this._listADocExpDate.val() === '')) {
                errorMessages.push(this._('section2.listafirstexpdate'));
                this._listADocExpDate.toggleClass(this.invalidFieldClass, true);
            }
            if (!this.validateDateRange(this._listADocExpDate2, '', []) ||
                (!this._listADocExpDate2.prop(this.freeTextProp) &&
                    !this.validateTextField(this._listADocExpDate2, '', [this.dateFormat, this.NAString], true, [])) ||
                (this._listADocExpDate2.prop(this.freeTextProp) && this._listADocExpDate2.val() === '')) {
                errorMessages.push(this._('section2.listasecondexpdate'));
                this._listADocExpDate2.toggleClass(this.invalidFieldClass, true);
            }
            if (!this.validateDateRange(this._listADocExpDate3, '', []) ||
                (!this._listADocExpDate3.prop(this.freeTextProp) &&
                    !this.validateTextField(this._listADocExpDate3, '', [this.dateFormat, this.NAString], true, [])) ||
                (this._listADocExpDate3.prop(this.freeTextProp) && this._listADocExpDate3.val() === '')) {
                errorMessages.push(this._('section2.listathirdexpdate'));
                this._listADocExpDate3.toggleClass(this.invalidFieldClass, true);
            }
        }
        else {
            if (this._listBDoc.val().trim() !== this.na) {
                if (this._listBIssuingAuthority.val().trim() === '') {
                    errorMessages.push(this._('section2.listbissuingauthority'));
                    this._listBIssuingAuthority.toggleClass(this.invalidFieldClass, true);
                }
                if (this._listBDocNumber.val().trim() === '') {
                    errorMessages.push(this._('section2.listbdocnumber'));
                    this._listBDocNumber.toggleClass(this.invalidFieldClass, true);
                }
                else if (this._listBDocNumber.prop(this.validationExpressionProp) &&
                    !this._listBDocNumber.prop(this.validationExpressionProp)
                        .test(this._listBDocNumber.val()) &&
                    this._listBDocNumber.prop(this.validationMessageProp)) {
                    errorMessages.push(this._listBDocNumber.prop(this.validationMessageProp));
                    this._listBDocNumber.toggleClass(this.invalidFieldClass, true);
                }
                if (!this.validateDateRange(this._listBDocExpDate, '', []) ||
                    !this.validateTextField(this._listBDocExpDate, '', [this.dateFormat, this.NAString], true, [])) {
                    errorMessages.push(this._('section2.listbexpdate'));
                    this._listBDocExpDate.toggleClass(this.invalidFieldClass, true);
                }
            }
            if (this._listCDoc.val().trim() !== this.na) {
                if (this._listCIssuingAuthority.val().trim() === '') {
                    errorMessages.push(this._('section2.listcissuingauthority'));
                    this._listCIssuingAuthority.toggleClass(this.invalidFieldClass, true);
                }
                if (this._listCDoc.prop('ssncard') && !confirm(this._('section2.ssncardnotvalid'))) {
                    errorMessages.push(this._('section2.ssncardnotvalidformat'));
                    this._listCDoc.toggleClass(this.invalidFieldClass, true);
                }
                else if (this._listCDoc.prop('i551') && !confirm(this._('section2.expiredformI551confirmation'))) {
                    errorMessages.push(this._('section2.expiredformI551notvalid'));
                    this._listCDoc.toggleClass(this.invalidFieldClass, true);
                }
                else if (this._listCDocNumber.prop(this.validationExpressionProp) &&
                    !this._listCDocNumber.prop(this.validationExpressionProp)
                        .test(this._listCDocNumber.val()) &&
                    this._listCDocNumber.prop(this.validationMessageProp)) {
                    errorMessages.push(this._listCDocNumber.prop(this.validationMessageProp));
                    this._listCDocNumber.toggleClass(this.invalidFieldClass, true);
                }
                if (!this.validateDateRange(this._listCDocExpDate, '', []) ||
                    !this.validateTextField(this._listCDocExpDate, '', [this.dateFormat, this.NAString], true, [])) {
                    errorMessages.push(this._('section2.listcexpdate'));
                    this._listCDocExpDate.toggleClass(this.invalidFieldClass, true);
                }
            }
        }
        [this._hireDate, this._employerSignDate, this._employerLastName, this._employerFirstName,
            this._employerTitle, this._employerName, this._employerAddress, this._employerCity,
            this._employerState, this._employerZip].forEach(function (f) {
            return f.attr(_this.annotationRequired, 'true');
        });
        this.validateTextField(this._hireDate, this._('section2.hiredate'), [this.dateFormat], true, errorMessages);
        this.validateTextField(this._employerSignDate, this._('section2.sgnemployer'), [this.dateFormat], true, errorMessages);
        this.validateTextField(this._employerTitle, this._('section2.title'), [this.nameFormat], true, errorMessages);
        this.validateTextField(this._employerLastName, this._('section2.lastname'), [this.nameFormat], true, errorMessages);
        this.validateTextField(this._employerFirstName, this._('section2.firstname'), [this.nameFormat], true, errorMessages);
        this.validateTextField(this._employerName, this._('section2.name'), [], true, errorMessages);
        this.validateTextField(this._employerAddress, this._('section2.address'), [], true, errorMessages);
        this.validateTextField(this._employerCity, this._('section2.city'), [], true, errorMessages);
        this.validateTextField(this._employerState, this._('section2.state'), [], true, errorMessages);
        this.validateTextField(this._employerZip, this._('section2.zip'), [this.zipNumberFormat], true, errorMessages);
        return errorMessages;
    };
    USI9Section2.prototype.renderEmployerData = function (tabIndex, dialog, sgnEmployer, sgnEmployerHelp, employerSignDate, employerSignDateHelp, employerTitle, employerTitleHelp, employerLastName, employerLastNameHelp, employerFirstName, employerFirstNameHelp, employerName, employerNameHelp, employerAddress, employerAddressHelp, employerCity, employerCityHelp, employerState, employerStateHelp, employerZip, employerZipHelp) {
        var _this = this;
        this._sgnEmployer = this.renderControl(sgnEmployer, this._('sgnemployer.tooltip'))
            .attr('tabindex', tabIndex++);
        this._sgnEmployerHelp = this.renderHelpIcon(sgnEmployerHelp, this._('sgnemployerhelp.caption'), dialog, this._('sgnemployerhelp.text'), 500);
        this._employerSignDate = this.renderControl(employerSignDate, this._('employersigndate.tooltip'))
            .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled')
            .attr('tabindex', tabIndex++);
        this._employerSignDateHelp = this.renderHelpIcon(employerSignDateHelp, this._('employersigndatehelp.caption'), dialog, this._('employersigndatehelp.text'), 500);
        this._employerTitle = this.renderControl(employerTitle, this._('employertitle.tooltip'))
            .attr('tabindex', tabIndex++);
        this._employerTitleHelp = this.renderHelpIcon(employerTitleHelp, this._('employertitlehelp.caption'), dialog, this._('employertitlehelp.text'), 500);
        this._employerLastName = this.renderControl(employerLastName, this._('employerlastname.tooltip'))
            .attr('tabindex', tabIndex++);
        this._employerLastNameHelp = this.renderHelpIcon(employerLastNameHelp, this._('employerlastnamehelp.caption'), dialog, this._('employerlastnamehelp.text'), 500);
        this._employerFirstName = this.renderControl(employerFirstName, this._('employerfirstname.tooltip'))
            .attr('tabindex', tabIndex++);
        this._employerFirstNameHelp = this.renderHelpIcon(employerFirstNameHelp, this._('employerfirstnamehelp.caption'), dialog, this._('employerfirstnamehelp.text'), 500);
        this._employerName = this.renderControl(employerName, this._('employername.tooltip'))
            .attr('tabindex', tabIndex++);
        this._employerNameHelp = this.renderHelpIcon(employerNameHelp, this._('employernamehelp.caption'), dialog, this._('employernamehelp.text'), 500);
        this._employerAddress = this.renderControl(employerAddress, this._('employeraddress.tooltip'))
            .attr('tabindex', tabIndex++);
        this._employerAddressHelp = this.renderHelpIcon(employerAddressHelp, this._('employeraddresshelp.caption'), dialog, this._('employeraddresshelp.text'), 500);
        this._employerCity = this.renderControl(employerCity, this._('employercity.tooltip'))
            .attr('tabindex', tabIndex++);
        this._employerCityHelp = this.renderHelpIcon(employerCityHelp, this._('employercityhelp.caption'), dialog, this._('employercityhelp.text'), 500);
        this._employerState = this.renderControl(employerState, this._('employerstate.tooltip'))
            .attr('tabindex', tabIndex++);
        this.setCombolistText(this._employerState, this.space, this.blankItem);
        this._employerStateHelp = this.renderHelpIcon(employerStateHelp, this._('employerstatehelp.caption'), dialog, this._('employerstatehelp.text'), 500);
        this._employerZip = this.renderControl(employerZip, this._('employerzip.tooltip'))
            .keypress(function (e) { return _this.zipFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._employerZipHelp = this.renderHelpIcon(employerZipHelp, this._('employerziphelp.caption'), dialog, this._('employerziphelp.text'));
        return tabIndex;
    };
    USI9Section2.prototype.renderListABC = function (tabIndex, dialog, listADoc, listADocHelp, listAIssuingAuthority, listAIssuingAuthorityHelp, listADocNumber, listADocNumberHelp, listADocExpDate, listADocExpDateHelp, listADoc2, listADoc2Help, listAIssuingAuthority2, listAIssuingAuthority2Help, listADocNumber2, listADocNumber2Help, listADocExpDate2, listADocExpDate2Help, listADoc3, listADoc3Help, listAIssuingAuthority3, listAIssuingAuthority3Help, listADocNumber3, listADocNumber3Help, listADocExpDate3, listADocExpDate3Help, listBDoc, listBDocHelp, listBIssuingAuthority, listBIssuingAuthorityHelp, listBDocNumber, listBDocNumberHelp, listBDocExpDate, listBDocExpDateHelp, listCDoc, listCDocHelp, listCIssuingAuthority, listCIssuingAuthorityHelp, listCDocNumber, listCDocNumberHelp, listCDocExpDate, listCDocExpDateHelp) {
        this._listADoc = this.renderControl(listADoc, this._('listadoc.tooltip'))
            .attr('tabindex', tabIndex++);
        this._listADocHelp = this.renderHelpIcon(listADocHelp, this._('listadochelp.caption'), dialog, this._('listadochelp.text'), 500);
        this._listAIssuingAuthority = this.renderControl(listAIssuingAuthority, this._('listaissuingauthority.tooltip'))
            .attr('tabindex', tabIndex++);
        this._listAIssuingAuthorityHelp = this.renderHelpIcon(listAIssuingAuthorityHelp, this._('listaissuingauthorityhelp.caption'), dialog, this._('listaissuingauthorityhelp.text'), 500);
        this._listADocNumber = this.renderControl(listADocNumber, this._('listadocnumber.tooltip'))
            .attr('tabindex', tabIndex++);
        this._listADocNumberHelp = this.renderHelpIcon(listADocNumberHelp, this._('listadocnumberhelp.caption'), dialog, this._('listadocnumberhelp.text'), 500);
        this._listADocExpDate = this.renderControl(listADocExpDate, this._('listaexpdate.tooltip'))
            .datepicker({ changeMonth: true, changeYear: true, minDate: new Date() }).attr('autocomplete', 'disabled')
            .attr('tabindex', tabIndex++);
        this._listADocExpDateHelp = this.renderHelpIcon(listADocExpDateHelp, this._('listaexpdatehelp.caption'), dialog, this._('listaexpdatehelp.text'), 500);
        this._listADoc2 = this.renderControl(listADoc2, this._('listadoc2.tooltip'))
            .attr('tabindex', tabIndex++);
        this._listADoc2Help = this.renderHelpIcon(listADoc2Help, this._('listadoc2help.caption'), dialog, this._('listadoc2help.text'), 500);
        this._listAIssuingAuthority2 = this.renderControl(listAIssuingAuthority2, this._('listaissuingauthority2.tooltip'))
            .attr('tabindex', tabIndex++);
        this._listAIssuingAuthority2Help = this.renderHelpIcon(listAIssuingAuthority2Help, this._('listaissuingauthority2help.caption'), dialog, this._('listaissuingauthority2help.text'), 500);
        this._listADocNumber2 = this.renderControl(listADocNumber2, this._('listadocnumber2.tooltip'))
            .attr('tabindex', tabIndex++);
        this._listADocNumber2Help = this.renderHelpIcon(listADocNumber2Help, this._('listadocnumber2help.caption'), dialog, this._('listadocnumber2help.text'), 500);
        this._listADocExpDate2 = this.renderControl(listADocExpDate2, this._('listaexpdate2.tooltip'))
            .datepicker({ changeMonth: true, changeYear: true, minDate: new Date() }).attr('autocomplete', 'disabled')
            .attr('tabindex', tabIndex++);
        this._listADocExpDate2Help = this.renderHelpIcon(listADocExpDate2Help, this._('listaexpdate2help.caption'), dialog, this._('listaexpdate2help.text'), 500);
        this._listADoc3 = this.renderControl(listADoc3, this._('listadoc3.tooltip'))
            .attr('tabindex', tabIndex++);
        this._listADoc3Help = this.renderHelpIcon(listADoc3Help, this._('listadoc3help.caption'), dialog, this._('listadoc3help.text'), 500);
        this._listAIssuingAuthority3 = this.renderControl(listAIssuingAuthority3, this._('listaissuingauthority3.tooltip'))
            .attr('tabindex', tabIndex++);
        this._listAIssuingAuthority3Help = this.renderHelpIcon(listAIssuingAuthority3Help, this._('listaissuingauthority3help.caption'), dialog, this._('listaissuingauthority3help.text'), 500);
        this._listADocNumber3 = this.renderControl(listADocNumber3, this._('listadocnumber3.tooltip'))
            .attr('tabindex', tabIndex++);
        this._listADocNumber3Help = this.renderHelpIcon(listADocNumber3Help, this._('listadocnumber3help.caption'), dialog, this._('listadocnumber3help.text'), 500);
        this._listADocExpDate3 = this.renderControl(listADocExpDate3, this._('listaexpdate3.tooltip'))
            .datepicker({ changeMonth: true, changeYear: true, minDate: new Date() }).attr('autocomplete', 'disabled')
            .attr('tabindex', tabIndex++);
        this._listADocExpDate3Help = this.renderHelpIcon(listADocExpDate3Help, this._('listaexpdate3help.caption'), dialog, this._('listaexpdate3help.text'), 500);
        this._listBDoc = this.renderControl(listBDoc, this._('listbdoc.tooltip'))
            .attr('tabindex', tabIndex++);
        this._listBDocHelp = this.renderHelpIcon(listBDocHelp, this._('listbdochelp.caption'), dialog, this._('listbdochelp.text'), 600);
        this.filterCombolist(this._listBDoc, this.getListBContent(null), null, this, this.processListABC);
        this._listBIssuingAuthority = this.renderControl(listBIssuingAuthority, this._('listbissuingauthority.tooltip'))
            .attr('tabindex', tabIndex++);
        this._listBIssuingAuthorityHelp = this.renderHelpIcon(listBIssuingAuthorityHelp, this._('listbissuingauthorityhelp.caption'), dialog, this._('listbissuingauthorityhelp.text'), 500);
        this._listBDocNumber = this.renderControl(listBDocNumber, this._('listbdocnumber.tooltip'))
            .attr('tabindex', tabIndex++);
        this._listBDocNumberHelp = this.renderHelpIcon(listBDocNumberHelp, this._('listbdocnumberhelp.caption'), dialog, this._('listbdocnumberhelp.text'));
        this._listBDocExpDate = this.renderControl(listBDocExpDate, this._('listbexpdate.tooltip'))
            .datepicker({ changeMonth: true, changeYear: true, minDate: new Date() }).attr('autocomplete', 'disabled')
            .attr('tabindex', tabIndex++);
        this._listBDocExpDateHelp = this.renderHelpIcon(listBDocExpDateHelp, this._('listbexpdatehelp.caption'), dialog, this._('listbexpdatehelp.text'), 500);
        this._listCDoc = this.renderControl(listCDoc, this._('listcdoc.tooltip'))
            .attr('tabindex', tabIndex++);
        this._listCDocHelp = this.renderHelpIcon(listCDocHelp, this._('listcdochelp.caption'), dialog, this._('listcdochelp.text'), 700);
        this.filterCombolist(this._listCDoc, this.getListCContent(null), null, this, this.processListABC);
        this._listCIssuingAuthority = this.renderControl(listCIssuingAuthority, this._('listcissuingauthority.tooltip'))
            .attr('tabindex', tabIndex++);
        this._listCIssuingAuthorityHelp = this.renderHelpIcon(listCIssuingAuthorityHelp, this._('listcissuingauthorityhelp.caption'), dialog, this._('listcissuingauthorityhelp.text'), 500);
        this._listCDocNumber = this.renderControl(listCDocNumber, this._('listcdocnumber.tooltip'))
            .attr('tabindex', tabIndex++);
        this._listCDocNumberHelp = this.renderHelpIcon(listCDocNumberHelp, this._('listcdocnumberhelp.caption'), dialog, this._('listcdocnumberhelp.text'));
        this._listCDocExpDate = this.renderControl(listCDocExpDate, this._('listcexpdate.tooltip'))
            .datepicker({ changeMonth: true, changeYear: true, minDate: new Date() }).attr('autocomplete', 'disabled')
            .attr('tabindex', tabIndex++);
        this._listCDocExpDateHelp = this.renderHelpIcon(listCDocExpDateHelp, this._('listcexpdatehelp.caption'), dialog, this._('listcexpdatehelp.text'), 500);
        return tabIndex;
    };
    USI9Section2.prototype.processListABC = function (ddl, code, self) {
        switch (ddl) {
            case 'ListADocTitle':
                self.listADocTitle(code);
                break;
            case 'ListADocTitle2':
                self.listADocTitle2(code);
                break;
            case 'ListADocTitle3':
                self.listADocTitle3(code);
                break;
            case 'ListBDocTitle':
                self.listBDocTitle(code);
                break;
            case 'ListCDocTitle':
                self.listCDocTitle(code);
                break;
        }
    };
    USI9Section2.prototype.getListAContent = function (citizenship) {
        var usCitizenOrNational = { spaceSymbol: this.blankItem, 0: this.na, 1: this._('uspassport'), 2: this._('uspassportcard') };
        var lpr = {
            spaceSymbol: this.blankItem,
            0: this.na,
            3: this._('permanentresidentcard'),
            4: this._('alienresidentcard'),
            5: this._('foreignpassport'),
            10: this._('I551I94receipt'),
            12: this._('I551receipt')
        };
        var alien = {
            spaceSymbol: this.blankItem,
            0: this.na,
            6: this._('eadI766'),
            7: this._('foreinpassportnonimmigrant'),
            8: this._('FSMpassport'),
            9: this._('RMIpassport'),
            11: this._('I94refugeestampreceipt'),
            13: this._('I766receipt'),
            14: this._('foreinpassportnonimmigrantreceipt'),
            15: this._('FSMpassportreceipt'),
            16: this._('RMIpassportreceipt'),
            17: this._('expiredeadI766')
        };
        switch (citizenship) {
            case '0':
            case null:
                return {};
            case '1':
            case '2':
                return usCitizenOrNational;
            case '3':
                return lpr;
            case '4':
                return alien;
        }
    };
    USI9Section2.prototype.getListBContent = function (dob) {
        var isMinorUnderAge18 = false;
        var ms = Date.parse(dob);
        if (!isNaN(ms)) {
            var ageDifMs = Date.now() - ms;
            var ageDate = new Date(ageDifMs);
            isMinorUnderAge18 = Math.abs(ageDate.getUTCFullYear() - 1970) < 18;
        }
        var listB = {
            spaceSymbol: this.blankItem,
            0: this._('NA'),
            1: this._('driverlicence'),
            2: this._('idcard'),
            3: this._('govermentid'),
            4: this._('schoolid'),
            5: this._('votercard'),
            6: this._('militaryid'),
            7: this._('draftrecord'),
            8: this._('militarydependedid'),
            9: this._('marinercard'),
            10: this._('indiantribalid'),
            11: this._('canadiandriverlicense'),
            20: this._('specialplacement'),
            21: this._('driverlicencereceipt'),
            22: this._('idcardreceipt'),
            23: this._('govermentidreceipt'),
            24: this._('schoolidreceipt'),
            25: this._('votercardreceipt'),
            26: this._('militaryidreceipt'),
            27: this._('militarydependedidreceipt'),
            28: this._('draftrecordreceipt'),
            29: this._('marinercardreceipt'),
            30: this._('canadiandriverlicensereceipt'),
            31: this._('indiantribalidreceipt')
        };
        if (isMinorUnderAge18 || dob === null) {
            listB = $.extend(listB, {
                12: this._('schoolrecord'),
                13: this._('reportcard'),
                14: this._('clinicrecord'),
                15: this._('doctorrecord'),
                16: this._('hospitalrecord'),
                17: this._('datecarerecord'),
                18: this._('nurseryschoolrecord'),
                19: this._('individualunderage18'),
                32: this._('schoolrecordreceipt'),
                33: this._('reportcardreceipt'),
                34: this._('clinicrecordreceipt'),
                35: this._('doctorrecordreceipt'),
                36: this._('hospitalrecordreceipt'),
                37: this._('datecarerecordreceipt'),
                38: this._('nurseryschoolrecordreceipt')
            });
        }
        $.each(listB, function (i, v) { return listB[i] = decodeURIComponent(v); });
        return listB;
    };
    USI9Section2.prototype.getListCContent = function (citizenship) {
        var listC = {
            spaceSymbol: this.blankItem,
            0: this._('NA'),
            1: this._('ssncard'),
            10: this._('ssnCardReceipt')
        };
        if (['1', '2', '0', null].indexOf(citizenship) >= 0) {
            listC = $.extend(listC, {
                2: this._('formFS545'),
                3: this._('formDS1350'),
                4: this._('formFS240'),
                5: this._('birthCertificate'),
                6: this._('tribalDocument'),
                7: this._('formI197'),
                8: this._('formI179'),
                11: this._('birthCertificateReceipt'),
                12: this._('tribalDocumentReceipt')
            });
        }
        if (['3', '4', '0', null].indexOf(citizenship) >= 0) {
            listC = $.extend(listC, {
                9: this._('eadListC'),
                13: this._('eadListCReceipt'),
                14: this._('expiredFormI551')
            });
        }
        $.each(listC, function (i, v) { return listC[i] = decodeURIComponent(v); });
        return listC;
    };
    USI9Section2.prototype.listADocTitle = function (code) {
        var _this = this;
        var USDS = 'USDS';
        var USCIS = 'USCIS';
        var DOJINS = 'DOJINS';
        var DHS = 'DHS';
        var CBP = 'CBP';
        var FSM = 'FSM';
        var RMI = 'RMI';
        var numberMaxLength = 15;
        var fieldFormat = /^[a-zA-Z0-9]+$/;
        var fieldValidationExpression = null;
        var fieldValidationMessage = null;
        var issuingAuthList;
        var issuingAuth = null;
        this._listADocNumber.prop(this.requiredProp, true)
            .removeAttr('readOnly').val('');
        this._listADocNumber2.prop(this.requiredProp, false);
        this._listADocExpDate2.prop(this.requiredProp, false);
        this._listADocExpDate
            .removeAttr('readOnly')
            .datepicker('option', 'minDate', new Date())
            .datepicker('option', 'maxDate', null)
            .datepicker('option', 'showOn', 'focus')
            .attr('autocomplete', 'disabled').val('')
            .prop(this.requiredProp, true).prop(this.freeTextProp, false);
        var tenYearsFromNow = new Date();
        tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);
        if (['1', '2'].indexOf(code) >= 0) {
            issuingAuthList = { USDS: this._(USDS) };
            issuingAuth = USDS;
            numberMaxLength = 9;
            fieldValidationExpression = this.usPassportNumberFormat;
            fieldValidationMessage = this._('section2.uspassportformat');
            this._listADocExpDate.datepicker('option', 'maxDate', tenYearsFromNow);
        }
        else if (code === '3') {
            issuingAuthList = { USCIS: this._(USCIS), DOJINS: this._(DOJINS) };
            issuingAuth = USCIS;
            numberMaxLength = 13;
            fieldFormat = this.numberWithDashesFormat;
            fieldValidationExpression = this.greenCardNumberFormat;
            fieldValidationMessage = this._('section2.cardformat');
            this._listADocExpDate.datepicker('option', 'maxDate', tenYearsFromNow);
        }
        else if (code === '4') {
            issuingAuthList = { DOJINS: this._(DOJINS) };
            issuingAuth = DOJINS;
            numberMaxLength = 13;
            fieldValidationExpression = this.cardNumberFormat;
            fieldValidationMessage = this._('section2.cardformat');
            this._listADocExpDate.datepicker('option', 'maxDate', tenYearsFromNow);
        }
        else if (code === '5') {
            issuingAuthList = JSON.parse(this._('countries'));
            issuingAuth = null;
            numberMaxLength = 12;
            fieldValidationExpression = this.passportNumberFormat;
            fieldValidationMessage = this._('section2.passportformat');
            this.filterCombolist(this._listADoc2, { 1: this._('temporaryI551stamp'), 2: this._('mrivstamp') }, '1', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority2, { USCIS: this._(USCIS), DOJINS: this._(DOJINS) }, USCIS, this, this.processListABC);
            this._listADocNumber2.attr('readOnly', 'true').val(this.na);
            this._listADocExpDate2
                .removeAttr('readOnly')
                .datepicker('option', 'minDate', new Date())
                .datepicker('option', 'maxDate', null)
                .datepicker('option', 'showOn', 'focus')
                .attr('autocomplete', 'disabled').val('')
                .unbind('keypress')
                .prop(this.requiredProp, true).prop(this.freeTextProp, true);
        }
        else if (code === '10') {
            issuingAuthList = { DHS: this._(DHS) };
            issuingAuth = DHS;
            numberMaxLength = 11;
            fieldFormat = this.numberFormat;
            fieldValidationExpression = this.admissionNumberFormat;
            fieldValidationMessage = this._('admissionnumber.format');
            this._listADocExpDate
                .unbind('keypress')
                .prop(this.freeTextProp, true);
        }
        else if (code === '12') {
            issuingAuthList = { USCIS: this._(USCIS) };
            issuingAuth = USCIS;
            numberMaxLength = 13;
            fieldValidationExpression = this.cardNumberFormat;
            fieldValidationMessage = this._('section2.cardformat');
            this._listADocExpDate
                .unbind('keypress')
                .prop(this.freeTextProp, true);
        }
        else if (code === '6') {
            issuingAuthList = { USCIS: this._(USCIS) };
            issuingAuth = USCIS;
            numberMaxLength = 13;
            fieldValidationExpression = this.cardNumberFormat;
            fieldValidationMessage = this._('section2.cardformat');
            this._listADocExpDate.prop(this.freeTextProp, true);
        }
        else if (code === '17') {
            issuingAuthList = { USCIS: this._(USCIS) };
            issuingAuth = USCIS;
            numberMaxLength = 13;
            fieldValidationExpression = this.cardNumberFormat;
            fieldValidationMessage = this._('section2.cardformat');
            this._listADocExpDate
                .removeAttr('readOnly')
                .datepicker('option', 'minDate', null)
                .datepicker('option', 'maxDate', new Date())
                .datepicker('option', 'showOn', 'focus')
                .attr('autocomplete', 'disabled').val('');
            this.filterCombolist(this._listADoc2, { 5: this._('formI797C'), 6: this._('formI20') }, '5', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority2, { USCIS: this._(USCIS) }, USCIS, this, this.processListABC);
            this._listADocNumber2.removeAttr('readOnly').val('').prop(this.requiredProp, true);
            this._listADocExpDate2
                .removeAttr('readOnly')
                .datepicker('option', 'minDate', new Date())
                .datepicker('option', 'maxDate', null)
                .datepicker('option', 'showOn', 'focus')
                .attr('autocomplete', 'disabled').val('')
                .prop(this.requiredProp, true);
        }
        else if (['7', '14'].indexOf(code) >= 0) {
            issuingAuthList = JSON.parse(this._('countries'));
            issuingAuth = null;
            numberMaxLength = 12;
            fieldValidationExpression = this.passportNumberFormat;
            fieldValidationMessage = this._('section2.passportformat');
            this.filterCombolist(this._listADoc2, { 3: this._('formI94'), 4: this._('formI94receipt') }, '3', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority2, { USCIS: this._(USCIS), CBP: this._(CBP) }, USCIS, this, this.processListABC);
            this._listADocNumber2.removeAttr('readOnly').val('').prop(this.requiredProp, true);
            this._listADocExpDate2
                .removeAttr('readOnly')
                .datepicker('option', 'minDate', new Date())
                .datepicker('option', 'maxDate', null)
                .datepicker('option', 'showOn', 'focus')
                .attr('autocomplete', 'disabled').val('')
                .unbind('keypress')
                .prop(this.requiredProp, true).prop(this.freeTextProp, true);
            this.filterCombolist(this._listADoc3, { 0: this.na, 1: this._('formI20'), 2: this._('formDS2019') }, '0', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority3, { 0: this.na }, '0', this, this.processListABC);
            this._listADocNumber3.attr('readOnly', 'true').val(this.na);
            this._listADocExpDate3.attr('readOnly', 'true')
                .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
        }
        else if (code === '8') {
            issuingAuthList = { FSM: this._(FSM) };
            issuingAuth = FSM;
            numberMaxLength = 12;
            fieldValidationExpression = this.passportNumberFormat;
            fieldValidationMessage = this._('section2.passportformat');
            this.filterCombolist(this._listADoc2, { 3: this._('formI94'), 4: this._('formI94receipt') }, '3', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority2, { USCIS: this._(USCIS), CBP: this._(CBP) }, USCIS, this, this.processListABC);
            this._listADocNumber2.removeAttr('readOnly').val('').prop(this.requiredProp, true);
            this._listADocExpDate2
                .datepicker('option', 'minDate', new Date())
                .datepicker('option', 'maxDate', null)
                .datepicker('option', 'showOn', 'focus')
                .attr('autocomplete', 'disabled').val('')
                .unbind('keypress')
                .prop(this.requiredProp, true).prop(this.freeTextProp, true);
        }
        else if (code === '9') {
            issuingAuthList = { RMI: this._(RMI) };
            issuingAuth = RMI;
            numberMaxLength = 12;
            fieldValidationExpression = this.passportNumberFormat;
            fieldValidationMessage = this._('section2.passportformat');
            this.filterCombolist(this._listADoc2, { 3: this._('formI94'), 4: this._('formI94receipt') }, '3', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority2, { USCIS: this._(USCIS), CBP: this._(CBP) }, USCIS, this, this.processListABC);
            this._listADocNumber2.removeAttr('readOnly').val('').prop(this.requiredProp, true);
            this._listADocExpDate2
                .datepicker('option', 'minDate', new Date())
                .datepicker('option', 'maxDate', null)
                .datepicker('option', 'showOn', 'focus')
                .attr('autocomplete', 'disabled').val('')
                .unbind('keypress')
                .prop(this.requiredProp, true).prop(this.freeTextProp, true);
        }
        else if (code === '11') {
            issuingAuthList = { DHS: this._(DHS) };
            issuingAuth = DHS;
            numberMaxLength = 11;
            numberMaxLength = 11;
            fieldFormat = this.numberFormat;
            fieldValidationExpression = this.admissionNumberFormat;
            fieldValidationMessage = this._('admissionnumber.format');
            this._listADocExpDate.prop(this.freeTextProp, true);
        }
        else if (code === '13') {
            issuingAuthList = { USCIS: this._(USCIS) };
            issuingAuth = USCIS;
            numberMaxLength = 13;
            fieldValidationExpression = this.cardNumberFormat;
            fieldValidationMessage = this._('section2.cardformat');
            this._listADocExpDate.prop(this.freeTextProp, true);
        }
        else if (code === '15') {
            issuingAuthList = { 'FSM': this._('FSM') };
            issuingAuth = 'FSM';
            numberMaxLength = 12;
            fieldValidationExpression = this.passportNumberFormat;
            fieldValidationMessage = this._('section2.passportformat');
        }
        else if (code === '16') {
            issuingAuthList = { RMI: this._(RMI) };
            issuingAuth = RMI;
            numberMaxLength = 12;
            fieldValidationExpression = this.passportNumberFormat;
            fieldValidationMessage = this._('section2.passportformat');
        }
        this._listADocNumber
            .prop('maxLength', numberMaxLength)
            .keypress(function (e) { return fieldFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this._listADocExpDate.unbind('keypress');
        if (!this._listADocExpDate.prop(this.freeTextProp)) {
            this._listADocExpDate
                .keypress(function (e) { return /[\d/]/g.test(e.key) || _this.NAFormat.test(e.key) || e.key === _this.backSpaceCode; });
        }
        this._listADocNumber.prop(this.validationExpressionProp, fieldValidationExpression);
        this._listADocNumber.prop(this.validationMessageProp, fieldValidationMessage);
        this.filterCombolist(this._listAIssuingAuthority.prop(this.requiredProp, true), $.extend({ spaceSymbol: this.blankItem }, issuingAuthList), issuingAuth, this, this.processListABC);
        if (['1', '2', '3', '4', '6', '10', '11', '12'].indexOf(code) >= 0) {
            this.filterCombolist(this._listADoc2, { 0: this.na }, '0', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority2, { 0: this.na }, '0', this, this.processListABC);
            this._listADocNumber2.attr('readOnly', 'true').val(this.na);
            this._listADocExpDate2.attr('readOnly', 'true')
                .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
        }
        if (['1', '2', '3', '4', '5', '6', '8', '9', '10', '11', '12', '15', '16', '17'].indexOf(code) >= 0) {
            this.filterCombolist(this._listADoc3, { 0: this.na }, '0', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority3, { 0: this.na }, '0', this, this.processListABC);
            this._listADocNumber3.attr('readOnly', 'true').val(this.na);
            this._listADocExpDate3
                .attr('readOnly', 'true')
                .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
        }
        if (code !== '0' && code.trim() !== '') {
            this.clearListB();
            this.clearListC();
        }
        if (code === '0') {
            this.clearListA();
        }
    };
    USI9Section2.prototype.listADocTitle2 = function (code) {
        var _this = this;
        var USDS = 'USDS';
        var USCIS = 'USCIS';
        var DOJINS = 'DOJINS';
        var ICE = 'ICE';
        var numberMaxLength = 11;
        var fieldFormat = /^[a-zA-Z0-9]+$/;
        this._listADocNumber2.removeAttr('readOnly').val('');
        this._listADocExpDate2.removeAttr('readOnly').val('');
        if (code === '1') {
            this.filterCombolist(this._listAIssuingAuthority2, { spaceSymbol: this.blankItem, USCIS: this._(USCIS), DOJINS: this._(DOJINS) }, USCIS, this, this.processListABC);
        }
        else if (code === '2') {
            this.filterCombolist(this._listAIssuingAuthority2, { spaceSymbol: this.blankItem, USDS: this._(USDS) }, USDS, this, this.processListABC);
        }
        else if (code === '3') {
            fieldFormat = /^\d+$/;
        }
        else if (code === '5') {
            this.filterCombolist(this._listAIssuingAuthority2, { USCIS: this._(USCIS) }, USCIS, this, this.processListABC);
        }
        else if (code === '6') {
            this.filterCombolist(this._listAIssuingAuthority2, { spaceSymbol: this.blankItem, ICE: this._(ICE), DOJINS: this._(DOJINS) }, ICE, this, this.processListABC);
        }
        this._listADocNumber2
            .prop('maxLength', numberMaxLength)
            .prop(this.requiredProp, true)
            .keypress(function (e) { return fieldFormat.test(e.key) || e.key === _this.backSpaceCode; });
    };
    USI9Section2.prototype.listADocTitle3 = function (code) {
        var ICE = 'ICE';
        var DOJINS = 'DOJINS';
        var USDS = 'USDS';
        this._listADocNumber3.prop(this.requiredProp, true);
        this._listADocExpDate3.prop(this.requiredProp, true);
        if (code === '0') {
            this.filterCombolist(this._listAIssuingAuthority3, { 0: this.na }, '0', this, this.processListABC);
            this._listADocNumber3.attr('readOnly', 'true').val(this.na);
            this._listADocExpDate3.attr('readOnly', 'true')
                .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
        }
        else if (code === '1') {
            this.filterCombolist(this._listAIssuingAuthority3, { spaceSymbol: this.blankItem, ICE: this._(ICE), DOJINS: this._(DOJINS) }, ICE, this, this.processListABC);
            this._listADocNumber3.removeAttr('readOnly').val('');
            this._listADocExpDate3.removeAttr('readOnly').val('')
                .datepicker('option', 'showOn', 'focus').attr('autocomplete', 'disabled')
                .prop(this.requiredProp, true).prop(this.freeTextProp, false);
        }
        else if (code === '2') {
            this.filterCombolist(this._listAIssuingAuthority3, { spaceSymbol: this.blankItem, USDS: this._(USDS) }, USDS, this, this.processListABC);
            this._listADocNumber3.removeAttr('readOnly').val('');
            this._listADocExpDate3.removeAttr('readOnly').val('')
                .datepicker('option', 'showOn', 'focus').attr('autocomplete', 'disabled')
                .prop(this.requiredProp, true).prop(this.freeTextProp, false);
        }
    };
    USI9Section2.prototype.listBDocTitle = function (code) {
        var _this = this;
        var USCG = 'USCG';
        var numberMaxLength = 15;
        var fieldFormat = /^[a-zA-Z0-9]+$/;
        var fieldValidationExpression = null;
        var fieldValidationMessage = null;
        var issuingAuthList;
        var issuingAuth = null;
        this._listBDocNumber.prop('maxLength', '100').unbind('keypress');
        this._listBIssuingAuthority.prop(this.requiredProp, true);
        this._listBDocNumber.prop(this.requiredProp, true);
        this._listBDocExpDate.prop(this.requiredProp, true);
        if (['19', '20'].indexOf(code) < 0) {
            this._listBDocNumber.removeAttr('readOnly').val('');
            this._listBDocExpDate
                .removeAttr('readOnly')
                .datepicker('option', 'showOn', 'focus').attr('autocomplete', 'disabled').val('')
                .unbind('keypress')
                .keypress(function (e) { return /[\d/]/g.test(e.key) || _this.NAFormat.test(e.key) || e.key === _this.backSpaceCode; });
        }
        if (['1', '2', '21', '22'].indexOf(code) >= 0) {
            issuingAuthList = JSON.parse(this._('usstates'));
            issuingAuth = 'AL';
            numberMaxLength = 14;
            this._listBDocNumber
                .prop('maxLength', numberMaxLength)
                .unbind('keypress')
                .keypress(function (e) { return fieldFormat.test(e.key) || _this.NAFormat.test(e.key) || e.key === _this.backSpaceCode; });
            fieldValidationExpression = this.driverLicenseNumberFormat;
            fieldValidationMessage = this._('section2.listbnumberformat');
        }
        else if (['3', '4', '5', '6', '7', '8', '10', '12', '13', '14', '15', '16', '17', '18',
            '23', '24', '25', '26', '27', '28', '31', '32', '33', '34', '35', '36', '37', '38'].indexOf(code) >= 0) {
            issuingAuthList = {};
            issuingAuth = null;
            this._listBIssuingAuthority.removeAttr('readOnly');
        }
        else if (['9', '29'].indexOf(code) >= 0) {
            issuingAuthList = { USCG: this._(USCG) };
            issuingAuth = USCG;
            this._listBIssuingAuthority.attr('readOnly', 'true');
        }
        else if (['11', '30'].indexOf(code) >= 0) {
            issuingAuthList = JSON.parse(this._('canada'));
            issuingAuth = null;
            this._listBIssuingAuthority.attr('readOnly', 'true');
        }
        else if (['19'].indexOf(code) >= 0) {
            issuingAuthList = { '0': this.na };
            issuingAuth = '0';
            this._listBDocNumber.attr('readOnly', 'true').val(this.na);
            this._listBDocExpDate
                .attr('readOnly', 'true')
                .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
        }
        this.filterCombolist(this._listBIssuingAuthority, $.extend({ spaceSymbol: this.blankItem }, issuingAuthList), issuingAuth, this, this.processListABC);
        this._listBDocNumber.prop(this.validationExpressionProp, fieldValidationExpression);
        this._listBDocNumber.prop(this.validationMessageProp, fieldValidationMessage);
        if (code !== '0' && code.trim() !== '') {
            this.clearListA();
        }
        if (code === '0') {
            this.clearListB();
        }
    };
    USI9Section2.prototype.listCDocTitle = function (code) {
        var _this = this;
        var SSA = 'SSA';
        var USDHHS = 'USDHHS';
        var SSD = 'SSD';
        var DHEW = 'DHEW';
        var USDS = 'USDS';
        var USCIS = 'USCIS';
        var DOJINS = 'DOJINS';
        var numberMaxLength = 15;
        var fieldFormat = /^[a-zA-Z0-9]+$/;
        var fieldValidationExpression = null;
        var fieldValidationMessage = null;
        var issuingAuthList;
        var issuingAuth;
        this._listCIssuingAuthority.prop(this.requiredProp, true);
        this._listCDocNumber.prop(this.requiredProp, true);
        this._listCDocExpDate.prop(this.requiredProp, true);
        this._listCIssuingAuthority.attr('readOnly', 'true');
        this._listCDocExpDate
            .removeAttr('readOnly')
            .datepicker('option', 'minDate', new Date())
            .datepicker('option', 'maxDate', null)
            .datepicker('option', 'showOn', 'focus')
            .attr('autocomplete', 'disabled')
            .unbind('keypress')
            .keypress(function (e) { return /[\d/]/g.test(e.key) || _this.NAFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .val('');
        this._listCDoc.prop('ssncard', false).prop('i551', false);
        if (code === '1') {
            issuingAuthList = { SSA: this._(SSA), USDHHS: this._(USDHHS), SSD: this._(SSD), DHEW: this._(DHEW) };
            issuingAuth = SSA;
            numberMaxLength = 11;
            fieldFormat = /^[\d-]+$/;
            fieldValidationExpression = this.ssnFormat;
            fieldValidationMessage = this._('section2.ssnformat');
            this._listCDocExpDate
                .attr('readOnly', 'true')
                .datepicker('option', 'showOn', 'off')
                .attr('autocomplete', 'disabled').val(this.na);
            this._listCDoc.prop('ssncard', true);
        }
        else if (['2', '3', '4'].indexOf(code) >= 0) {
            issuingAuthList = { USDS: this._(USDS) };
            issuingAuth = USDS;
        }
        else if (['5', '6', '11', '12'].indexOf(code) >= 0) {
            issuingAuthList = {};
            issuingAuth = null;
            this._listCIssuingAuthority.removeAttr('readOnly');
        }
        else if (['7', '8'].indexOf(code) >= 0) {
            issuingAuthList = { DOJINS: this._(DOJINS) };
            issuingAuth = DOJINS;
        }
        else if (['9', '13'].indexOf(code) >= 0) {
            var name_1 = decodeURIComponent(code === '9' ? this._('listC7') : this._('listC7Receipt'));
            issuingAuthList = { 0: name_1 };
            issuingAuth = '0';
            this._listCIssuingAuthority
                .removeAttr('readOnly')
                .keypress(function (e) {
                var val = _this._listCIssuingAuthority.val();
                if (val.length >= name_1.length) {
                    return val.substr(0, name_1.length) === name_1;
                }
                return true;
            })
                .keyup(function (e) {
                var val = _this._listCIssuingAuthority.val();
                if (val.length <= name_1.length ||
                    (val.length === name_1.length + 1 && val.substr(0, name_1.length) !== name_1)) {
                    _this._listCIssuingAuthority.val(name_1);
                }
            });
        }
        else if (code === '10') {
            issuingAuthList = { SSA: this._(SSA) };
            issuingAuth = SSA;
        }
        else if (code === '14') {
            issuingAuthList = { USCIS: this._(USCIS), DOJINS: this._(DOJINS) };
            issuingAuth = USCIS;
            numberMaxLength = 13;
            fieldValidationExpression = this.cardNumberFormat;
            fieldValidationMessage = this._('section2.cardformat');
            this._listCDoc.prop('i551', true);
            this._listCDocExpDate
                .removeAttr('readOnly')
                .datepicker('option', 'minDate', null)
                .datepicker('option', 'maxDate', new Date())
                .datepicker('option', 'showOn', 'focus')
                .attr('autocomplete', 'disabled').val('');
        }
        this._listCDocNumber
            .prop('maxLength', numberMaxLength)
            .removeAttr('readOnly').val('')
            .keypress(function (e) { return fieldFormat.test(e.key) || e.key === _this.backSpaceCode; });
        this.filterCombolist(this._listCIssuingAuthority, $.extend({ spaceSymbol: this.blankItem }, issuingAuthList), issuingAuth, this, this.processListABC);
        this._listCDocNumber
            .prop(this.validationExpressionProp, fieldValidationExpression)
            .prop(this.validationMessageProp, fieldValidationMessage);
        if (code !== '0' && code.trim() !== '') {
            this.clearListA();
        }
        if (code === '0') {
            this.clearListC();
        }
    };
    USI9Section2.prototype.fillListABC = function (status) {
        this.filterCombolist(this._listADoc, this.getListAContent(status), null, this, this.processListABC);
        this.filterCombolist(this._listBDoc, this.getListBContent(this._dob.val()), null, this, this.processListABC);
        this.filterCombolist(this._listCDoc, this.getListCContent(status), null, this, this.processListABC);
    };
    USI9Section2.prototype.clearListABC = function () {
        this._lastNameSection2.val('');
        this._firstNameSection2.val('');
        this._middleInitialSection2.val('');
        this._immigrationStatus.val('');
        this.filterCombolist(this._listADoc, {}, null, this, null);
        this.filterCombolist(this._listAIssuingAuthority, {}, null, this, null);
        this._listADocNumber.val('');
        this._listADocExpDate.val('');
        this.filterCombolist(this._listADoc2, {}, null, this, null);
        this.filterCombolist(this._listAIssuingAuthority2, {}, null, this, null);
        this._listADocNumber2.val('');
        this._listADocExpDate2.val('');
        this.filterCombolist(this._listADoc3, {}, null, this, null);
        this.filterCombolist(this._listAIssuingAuthority3, {}, null, this, null);
        this._listADocNumber3.val('');
        this._listADocExpDate3.val('');
        this.filterCombolist(this._listBDoc, {}, null, this, null);
        this.filterCombolist(this._listBIssuingAuthority, {}, null, this, null);
        this._listBDocNumber.val('');
        this._listBDocExpDate.val('');
        this.filterCombolist(this._listCDoc, {}, null, this, null);
        this.filterCombolist(this._listCIssuingAuthority, {}, null, this, null);
        this._listCDocNumber.val('');
        this._listCDocExpDate.val('');
    };
    USI9Section2.prototype.clearListA = function () {
        this.setCombolistValue(this._listADoc, '0');
        this.filterCombolist(this._listAIssuingAuthority, { 0: this.na }, '0', this, this.processListABC);
        this._listADocNumber.attr('readOnly', 'true').val(this.na);
        this._listADocExpDate.attr('readOnly', 'true')
            .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
        this.filterCombolist(this._listADoc2, { 0: this.na }, '0', this, this.processListABC);
        this.filterCombolist(this._listAIssuingAuthority2, { 0: this.na }, '0', this, this.processListABC);
        this._listADocNumber2.attr('readOnly', 'true').val(this.na);
        this._listADocExpDate2.attr('readOnly', 'true')
            .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
        this.filterCombolist(this._listADoc3, { 0: this.na }, '0', this, this.processListABC);
        this.filterCombolist(this._listAIssuingAuthority3, { 0: this.na }, '0', this, this.processListABC);
        this._listADocNumber3.attr('readOnly', 'true').val(this.na);
        this._listADocExpDate3.attr('readOnly', 'true')
            .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
    };
    USI9Section2.prototype.clearListB = function () {
        this.setCombolistValue(this._listBDoc, '0');
        this.filterCombolist(this._listBIssuingAuthority, { 0: this.na }, '0', this, null);
        this._listBDocNumber.attr('readOnly', 'true').val(this.na);
        this._listBDocExpDate
            .attr('readOnly', 'true')
            .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
    };
    USI9Section2.prototype.clearListC = function () {
        this.setCombolistValue(this._listCDoc, '0');
        this.filterCombolist(this._listCIssuingAuthority, { 0: this.na }, '0', this, null);
        this._listCDocNumber.attr('readOnly', 'true').val(this.na);
        this._listCDocExpDate
            .attr('readOnly', 'true')
            .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
    };
    return USI9Section2;
}(USI9Translator));
var USI9Section3 = (function (_super) {
    __extends(USI9Section3, _super);
    function USI9Section3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    USI9Section3.prototype.renderSection3 = function (tabIndex, dialog, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, rehireDate, rehireDateHelp, docTitleSec3, docTitleSec3Help, docNumberSec3, docNumberSec3Help, expDateSec3, expDateSec3Help, sgnEmployerSec3, sgnEmployerSec3Help, signDateSec3, signDateSec3Help, employerNameSec3, employerNameSec3Help) {
        var _this = this;
        var spaceSymbol = this.space;
        var citizenships = [this._citizen, this._national, this._lpr, this._alien];
        this._citizen.click(function () {
            _this.selectCheckmark(_this._citizen, citizenships);
            _this.processLPR(_this._citizen.prop('checked'));
            _this.processAlien(_this._citizen.prop('checked'));
            _this.clearListABC();
            if (_this._citizen.prop('checked')) {
                _this.fillListABC('1');
            }
        });
        this._national.click(function () {
            _this.selectCheckmark(_this._national, citizenships);
            _this.processLPR(_this._national.prop('checked'));
            _this.processAlien(_this._national.prop('checked'));
            _this.clearListABC();
            if (_this._national.prop('checked')) {
                _this.fillListABC('2');
            }
        });
        this._lpr.click(function () {
            _this.selectCheckmark(_this._lpr, citizenships);
            _this.processAlien(_this._lpr.prop('checked'));
            _this._lpruscisNum.val('');
            _this.filterCombolist(_this._lpruscisNumType, {}, null, _this, _this.processListABC);
            _this.clearListABC();
            if (_this._lpr.prop('checked')) {
                _this._lpruscisNum.prop('disabled', false);
                _this._lpruscisNumType.prop('disabled', false);
                _this.filterCombolist(_this._lpruscisNumType, { 'A': _this._('aliennumber'), 'U': _this._('uscisnumber') }, null, _this, _this.processListABC);
                _this.fillListABC('3');
            }
        });
        this._alien.click(function () {
            _this.selectCheckmark(_this._alien, citizenships);
            _this.processLPR(_this._alien.prop('checked'));
            _this._alienWorkAuthDate.val('');
            _this._alienuscisNum.val('');
            _this.filterCombolist(_this._alienuscisNumType, {}, null, _this, _this.processListABC);
            _this._admissionNum.val('');
            _this._passportNum.val('');
            _this.filterCombolist(_this._countryOfIssuance, {}, null, _this, _this.processListABC);
            _this.clearListABC();
            if (_this._alien.prop('checked')) {
                _this._alienWorkAuthDate.prop('disabled', false);
                _this._alienuscisNum.prop('disabled', false);
                _this._alienuscisNumType.prop('disabled', false);
                _this.filterCombolist(_this._alienuscisNumType, { 'A': _this._('aliennumber'), 'U': _this._('uscisnumber') }, null, _this, _this.processListABC);
                _this._admissionNum.prop('disabled', false);
                _this._passportNum.prop('disabled', false);
                _this._countryOfIssuance.prop('disabled', false);
                _this.filterCombolist(_this._countryOfIssuance, JSON.parse(_this._('countries')), null, _this, _this.processListABC);
                _this.fillListABC('4');
            }
        });
        this._alienuscisNum.change(function () {
            if (!_this.EmptyOrNA(_this._alienuscisNum)) {
                if (_this.EmptyOrNA(_this._alienuscisNumType)) {
                    _this.filterCombolist(_this._alienuscisNumType, { 'A': _this._('aliennumber'), 'U': _this._('uscisnumber') }, null, _this, _this.processListABC);
                }
                _this._admissionNum.val(_this.na);
                _this._passportNum.val(_this.na);
                _this.filterCombolist(_this._countryOfIssuance, { 0: _this.na }, '0', _this, _this.processListABC);
            }
            else {
                _this.filterCombolist(_this._alienuscisNumType, {}, null, _this, _this.processListABC);
                _this._admissionNum.val('');
                _this._passportNum.val('');
                _this.filterCombolist(_this._countryOfIssuance, {}, null, _this, _this.processListABC);
            }
        });
        this._admissionNum.change(function () {
            if (!_this.EmptyOrNA(_this._admissionNum)) {
                _this._alienuscisNum.val(_this.na);
                _this._alienuscisNumPrefix.val('');
                _this.filterCombolist(_this._alienuscisNumType, {}, null, _this, _this.processListABC);
                _this._passportNum.val(_this.na);
                _this.filterCombolist(_this._countryOfIssuance, { 0: _this.na }, '0', _this, _this.processListABC);
            }
            else {
                _this._alienuscisNum.val('');
                _this._alienuscisNumPrefix.val('');
                _this.filterCombolist(_this._alienuscisNumType, {}, null, _this, _this.processListABC);
                _this._passportNum.val('');
                _this.filterCombolist(_this._countryOfIssuance, {}, null, _this, _this.processListABC);
            }
        });
        this._passportNum.change(function () {
            if (!_this.EmptyOrNA(_this._passportNum)) {
                _this._alienuscisNum.val(_this.na);
                _this._alienuscisNumPrefix.val('');
                _this.filterCombolist(_this._alienuscisNumType, { 0: _this.na }, _this.na, _this, _this.processListABC);
                _this._admissionNum.val(_this.na);
                if (_this.EmptyOrNA(_this._countryOfIssuance)) {
                    _this.filterCombolist(_this._countryOfIssuance, JSON.parse(_this._('countries')), null, _this, _this.processListABC);
                }
            }
            else {
                _this._alienuscisNum.val('');
                _this.filterCombolist(_this._alienuscisNumType, {}, null, _this, _this.processListABC);
                _this._admissionNum.val('');
            }
        });
        this.processLPR(false);
        this.processAlien(false);
        this._newlastName = this.renderControl(lastName, this._('newlastname.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || _this.NAFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._newlastNameHelp = this.renderHelpIcon(lastNameHelp, this._('newlastnamehelp.caption'), dialog, this._('newlastnamehelp.text'));
        this._newfirstName = this.renderControl(firstName, this._('newfirstname.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || _this.NAFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._newfirstNameHelp = this.renderHelpIcon(firstNameHelp, this._('newfirstnamehelp.caption'), dialog, this._('newfirstnamehelp.text'));
        this._newmiddleInitial = this.renderControl(middleInitial, this._('newmiddleinitial.tooltip'))
            .keypress(function (e) { return _this.nameFormat.test(e.key) || _this.NAFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._newmiddleInitialHelp = this.renderHelpIcon(middleInitialHelp, this._('newmiddleinitialhelp.caption'), dialog, this._('newmiddleinitialhelp.text'));
        this._rehireDate = this.renderControl(rehireDate, this._('rehiredate.tooltip'))
            .datepicker().attr('autocomplete', 'disabled')
            .unbind('keypress')
            .keypress(function (e) { return /[\d/]/g.test(e.key) || _this.NAFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._rehireDateHelp = this.renderHelpIcon(rehireDateHelp, this._('rehiredatehelp.caption'), dialog, this._('rehiredatehelp.text'), 500);
        this._docTitleSec3 = this.renderControl(docTitleSec3, this._('doctitlesec3.tooltip'))
            .attr('tabindex', tabIndex++);
        this.filterCombolist(this._docTitleSec3, {
            spaceSymbol: this.blankItem,
            0: this.na,
            1: this._('uspassport'),
            2: this._('uspassportcard'),
            3: this._('permanentresidentcard'),
            4: this._('alienresidentcard'),
            5: this._('foreignpassportwithtempI551stamp'),
            6: this._('foreignpassportwithtempI551mriv'),
            7: this._('I766receipt'),
            8: this._('foreignpassportwithI94'),
            9: this._('FSMpassport'),
            10: this._('RMIpassport'),
            11: this._('I551I94receipt'),
            12: this._('I94refugeestampreceipt') + spaceSymbol + this._('reclassofadmission'),
            13: this._('ssncard'),
            14: this._('formFS545'),
            15: this._('formDS1350'),
            16: this._('formFS240'),
            17: this._('birthCertificate'),
            18: this._('tribalDocument'),
            19: this._('formI197'),
            20: this._('formI179'),
            21: this._('eadAuthDocument'),
            22: this._('I551receipt'),
            23: this._('I766receipt'),
            24: this._('foreignpassportwithI94Receipt'),
            25: this._('FSMpassportreceipt'),
            26: this._('RMIpassportreceipt'),
            27: this._('ssnCardReceipt'),
            28: this._('birthCertificateReceipt'),
            29: this._('tribalDocumentReceipt'),
            30: this._('eadListCReceipt')
        }, null, this, this.processListABC);
        this._docTitleSec3Help = this.renderHelpIcon(docTitleSec3Help, this._('doctitlesec3help.caption'), dialog, this._('doctitlesec3help.text'), 500);
        this._docNumberSec3 = this.renderControl(docNumberSec3, this._('docnumbersec3.tooltip'))
            .attr('tabindex', tabIndex++);
        this._docNumberSec3Help = this.renderHelpIcon(docNumberSec3Help, this._('docnumbersec3help.caption'), dialog, this._('docnumbersec3help.text'), 500);
        this._expDateSec3 = this.renderControl(expDateSec3, this._('expdatesec3.tooltip'))
            .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled')
            .unbind('keypress')
            .keypress(function (e) { return /[\d/]/g.test(e.key) || _this.NAFormat.test(e.key) || e.key === _this.backSpaceCode; })
            .attr('tabindex', tabIndex++);
        this._expDateSec3Help = this.renderHelpIcon(expDateSec3Help, this._('expdatesec3help.caption'), dialog, this._('expdatesec3help.text'), 500);
        this._sgnEmployerSec3 = this.renderControl(sgnEmployerSec3, this._('sgnemployersec3.tooltip'))
            .attr('tabindex', tabIndex++);
        this._sgnEmployerSec3Help = this.renderHelpIcon(sgnEmployerSec3Help, this._('sgnemployersec3help.caption'), dialog, this._('sgnemployersec3help.text'), 500);
        this._signDateSec3 = this.renderControl(signDateSec3, this._('employersigndatesec3.tooltip'))
            .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled')
            .attr(this.annotationRequired, 'true')
            .attr('readonly', 'true')
            .focus(function () { return _this._signDateSec3.removeAttr('readonly'); })
            .blur(function () { return _this._signDateSec3.attr('readonly', 'true'); })
            .attr('tabindex', tabIndex++);
        this._signDateSec3Help = this.renderHelpIcon(signDateSec3Help, this._('employersigndatesec3help.caption'), dialog, this._('employersigndatesec3help.text'), 500);
        this._employerNameSec3 = this.renderControl(employerNameSec3, this._('employernamesec3.tooltip'))
            .attr(this.annotationRequired, 'true')
            .attr('tabindex', tabIndex++);
        this._employerNameSec3Help = this.renderHelpIcon(employerNameSec3Help, this._('employernamesec3help.caption'), dialog, this._('employernamesec3help.text'), 500);
        return tabIndex;
    };
    USI9Section3.prototype.validateFields = function () {
        var _this = this;
        var errorMessages = _super.prototype.validateFields.call(this);
        var section3Fields = [this._newlastName, this._newfirstName, this._newmiddleInitial, this._rehireDate,
            this._docTitleSec3, this._docNumberSec3, this._expDateSec3, this._sgnEmployerSec3,
            this._signDateSec3, this._employerNameSec3];
        section3Fields.forEach(function (f) { return f && f.toggleClass(_this.invalidFieldClass, false); });
        if (section3Fields.filter(function (e) { return e && e.val() && e.val() !== ''; }).length > 0) {
            [this._newlastName, this._newfirstName, this._newmiddleInitial, this._rehireDate,
                this._docTitleSec3, this._docNumberSec3, this._expDateSec3].filter(function (f) { return f.val() === '' || f.val().toUpperCase() === _this.na; })
                .forEach(function (f) { return f && f.val(_this.na); });
            this.validateTextField(this._newlastName, this._('name.last') + this.space + this._('section3.suffix'), [this.nameFormat, this.NAString], false, errorMessages);
            this.validateTextField(this._newfirstName, this._('name.first') + this.space + this._('section3.suffix'), [this.nameFormat, this.NAString], false, errorMessages);
            this.validateTextField(this._newmiddleInitial, this._('name.middleinitial') + this.space + this._('section3.suffix'), [this.nameInitialFormat, this.NAString], false, errorMessages);
            this.validateTextField(this._rehireDate, this._('section3.rehire'), [this.dateFormat, this.NAString], true, errorMessages);
            var fieldValidationExpression = /^[a-zA-Z0-9]+$/;
            switch (this._docTitleSec3.val()) {
                case '1':
                case '2':
                    fieldValidationExpression = this.usPassportNumberFormat;
                    break;
                case '3':
                case '4':
                    fieldValidationExpression = this.greenCardNumberFormat;
                    break;
                case '5':
                case '6':
                case '8':
                case '9':
                case '10':
                    fieldValidationExpression = this.passportNumberFormat;
                    break;
                case '7':
                    fieldValidationExpression = this.cardNumberFormat;
                    break;
                case '11':
                case '12':
                    fieldValidationExpression = this.admissionNumberFormat;
                    break;
                case '13':
                    fieldValidationExpression = this.ssnFormat;
                    break;
                case '14':
                case '15':
                case '16':
                case '17':
                case '18':
                case '19':
                case '20':
                case '21':
                case '22':
                case '23':
                case '24':
                case '25':
                case '26':
                case '27':
                case '28':
                case '29':
                case '30':
                    break;
            }
            this.validateTextField(this._docNumberSec3, this._('section3.docnumber') + this.space + this._('section3.suffix'), [fieldValidationExpression, this.NAString], false, errorMessages);
            this.validateTextField(this._expDateSec3, this._('section3.expdate') + this.space + this._('section3.suffix'), [this.dateFormat, this.NAString], false, errorMessages);
            this.validateTextField(this._signDateSec3, this._('section3.today') + this.space + this._('section3.suffix'), [this.dateFormat], true, errorMessages);
            this.validateTextField(this._employerNameSec3, this._('section3.employer') + this.space + this._('section3.suffix'), [this.nameFormat], true, errorMessages);
        }
        return errorMessages;
    };
    USI9Section3.prototype.processLPR = function (flag) {
        var na = flag ? this.na : '';
        this._lpruscisNumPrefix.val('');
        this._lpruscisNum.prop('disabled', true).val(na);
        this._lpruscisNumType.prop('disabled', true);
        this.filterCombolist(this._lpruscisNumType, {}, null, this, this.processListABC);
    };
    USI9Section3.prototype.processAlien = function (flag) {
        var na = flag ? this.na : '';
        this._alienWorkAuthDate.prop('disabled', true).val(na);
        this._alienuscisNumPrefix.val('');
        this._alienuscisNum.prop('disabled', true).val(na);
        this._alienuscisNumType.prop('disabled', true);
        this._admissionNum.prop('disabled', true).val(na);
        this._passportNum.prop('disabled', true).val(na);
        this._countryOfIssuance.prop('disabled', true);
        this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
        this.filterCombolist(this._countryOfIssuance, flag ? { 0: na } : {}, flag ? '0' : null, this, this.processListABC);
    };
    return USI9Section3;
}(USI9Section2));
var renderedPages = [false, false, false];
var form = null;
var pageToLoad;
var USI9 = (function (_super) {
    __extends(USI9, _super);
    function USI9() {
        var _this = _super.call(this) || this;
        _this.addDialog();
        return _this;
    }
    USI9.prototype.prepareData = function () {
        var _this = this;
        PDFViewerApplication.transformationService = '/?rest_route=/UpdateForm';
        PDFViewerApplication.sessionID = this.urlParameter('session_id');
        PDFViewerApplication.fieldsData = {
            'file': PDFViewerApplication.url,
            'operation': 'f',
            'entries': []
        };
        var readOnlyFieldsToFlat = ['LPRUSCISNumber', 'LPRUSCISNumberPrefix', 'AlienUSCISNumberPrefix',
            'AlienWorkAuthorizationDate', 'AlienUSCISNumber',
            'AdmissionNumber', 'ForeignPassportNumber', 'CountryOfIssuance',
            'LastNameSection2', 'FirstNameSection2',
            'MiddleInitialSection2', 'ImmigrationStatus'];
        $('[' + this.annotationName + ']').each(function (index, ctrl) {
            var op = !ctrl.disabled ||
                readOnlyFieldsToFlat.indexOf(ctrl.getAttribute(_this.annotationName)) > -1;
            PDFViewerApplication.fieldsData.entries.push({
                'name': ctrl.getAttribute(_this.annotationName),
                'value': op ? (ctrl.type === 'checkbox' ? (ctrl.checked ? 'On' : 'Off') : ctrl.value) : '',
                'operation': op ? 's' : 'd'
            });
        });
    };
    USI9.prototype.prepareFirstPage = function (tabIndex) {
        tabIndex = this.renderSection1(tabIndex, $('#dialogPage'), $('[' + this.annotationName + '=LastName]'), $('[' + this.annotationName + '=LastNameHelp]'), $('[' + this.annotationName + '=FirstName]'), $('[' + this.annotationName + '=FirstNameHelp]'), $('[' + this.annotationName + '=MiddleInitial]'), $('[' + this.annotationName + '=MiddleInitialHelp]'), $('[' + this.annotationName + '=OtherNames]'), $('[' + this.annotationName + '=OtherNamesHelp]'), $('[' + this.annotationName + '=Address]'), $('[' + this.annotationName + '=AddressHelp]'), $('[' + this.annotationName + '=ApartmentNumber]'), $('[' + this.annotationName + '=ApartmentNumberHelp]'), $('[' + this.annotationName + '=City]'), $('[' + this.annotationName + '=CityHelp]'), $('[' + this.annotationName + '=State]'), $('[' + this.annotationName + '=StateHelp]'), $('[' + this.annotationName + '=Zip]'), $('[' + this.annotationName + '=ZipHelp]'), $('[' + this.annotationName + '=DateOfBirth]'), $('[' + this.annotationName + '=DateOfBirthHelp]'), $('[' + this.annotationName + '=SSN11]'), $('[' + this.annotationName + '=SSN12]'), $('[' + this.annotationName + '=SSN13]'), $('[' + this.annotationName + '=SSN21]'), $('[' + this.annotationName + '=SSN22]'), $('[' + this.annotationName + '=SSN31]'), $('[' + this.annotationName + '=SSN32]'), $('[' + this.annotationName + '=SSN33]'), $('[' + this.annotationName + '=SSN34]'), $('[' + this.annotationName + '=SSNHelp]'), $('[' + this.annotationName + '=Email]'), $('[' + this.annotationName + '=EmailHelp]'), $('[' + this.annotationName + '=Phone]'), $('[' + this.annotationName + '=PhoneHelp]'), $('[' + this.annotationName + '=Citizen]'), $('[' + this.annotationName + '=CitizenHelp]'), $('[' + this.annotationName + '=NonCitizenNational]'), $('[' + this.annotationName + '=NonCitizenNationalHelp]'), $('[' + this.annotationName + '=LawfulPermanentResident]'), $('[' + this.annotationName + '=LawfulPermanentResidentHelp]'), $('[' + this.annotationName + '=AlienAuthorizedToWork]'), $('[' + this.annotationName + '=AlienAuthorizedToWorkHelp]'), $('[' + this.annotationName + '=USCISNumberHelp]'), $('[' + this.annotationName + '=LPRUSCISNumberPrefix]'), $('[' + this.annotationName + '=LPRUSCISNumber]'), $('[' + this.annotationName + '=LPRUSCISNumberType]'), $('[' + this.annotationName + '=AlienWorkAuthorizationDate]'), $('[' + this.annotationName + '=AlienUSCISNumberPrefix]'), $('[' + this.annotationName + '=AlienUSCISNumber]'), $('[' + this.annotationName + '=AlienUSCISNumberType]'), $('[' + this.annotationName + '=AdmissionNumber]'), $('[' + this.annotationName + '=AdmissionNumberHelp]'), $('[' + this.annotationName + '=ForeignPassportNumber]'), $('[' + this.annotationName + '=ForeignPassportNumberHelp]'), $('[' + this.annotationName + '=CountryOfIssuance]'), $('[' + this.annotationName + '=CountryOfIssuanceHelp]'), $('[' + this.annotationName + '=sgnEmployee]'), $('[' + this.annotationName + '=sgnEmployeeHelp]'), $('[' + this.annotationName + '=sgnEmployeeDate]'), $('[' + this.annotationName + '=sgnEmployeeDateHelp]'));
        tabIndex = this.renderTranslatorSection(tabIndex, $('#dialogPage'), $('[' + this.annotationName + '=PreparerOrTranslatorNo]'), $('[' + this.annotationName + '=PreparerOrTranslatorYes]'), $('[' + this.annotationName + '=PreparerOrTranslatorHelp]'), $('[' + this.annotationName + '=sgnTranslator]'), $('[' + this.annotationName + '=sgnTranslatorHelp]'), $('[' + this.annotationName + '=TranslatorDate]'), $('[' + this.annotationName + '=TranslatorDateHelp]'), $('[' + this.annotationName + '=TranslatorLastName]'), $('[' + this.annotationName + '=TranslatorLastNameHelp]'), $('[' + this.annotationName + '=TranslatorFirstName]'), $('[' + this.annotationName + '=TranslatorFirstNameHelp]'), $('[' + this.annotationName + '=TranslatorAddress]'), $('[' + this.annotationName + '=TranslatorAddressHelp]'), $('[' + this.annotationName + '=TranslatorCity]'), $('[' + this.annotationName + '=TranslatorCityHelp]'), $('[' + this.annotationName + '=TranslatorState]'), $('[' + this.annotationName + '=TranslatorStateHelp]'), $('[' + this.annotationName + '=TranslatorZip]'), $('[' + this.annotationName + '=TranslatorZipHelp]'));
        return tabIndex;
    };
    USI9.prototype.prepareSecondPage = function (tabIndex) {
        tabIndex = this.renderSection2(tabIndex, $('#dialogPage'), $('[' + this.annotationName + '=EmployeeInfoSection2Help]'), $('[' + this.annotationName + '=LastNameSection2]'), $('[' + this.annotationName + '=LastNameSection2Help]'), $('[' + this.annotationName + '=FirstNameSection2]'), $('[' + this.annotationName + '=FirstNameSection2Help]'), $('[' + this.annotationName + '=MiddleInitialSection2]'), $('[' + this.annotationName + '=MiddleInitialSection2Help]'), $('[' + this.annotationName + '=ImmigrationStatus]'), $('[' + this.annotationName + '=ImmigrationStatusHelp]'), $('[' + this.annotationName + '=ListADocTitle]'), $('[' + this.annotationName + '=ListADocTitleHelp]'), $('[' + this.annotationName + '=ListAIssuingAuthority]'), $('[' + this.annotationName + '=ListAIssuingAuthorityHelp]'), $('[' + this.annotationName + '=ListADocNumber]'), $('[' + this.annotationName + '=ListADocNumberHelp]'), $('[' + this.annotationName + '=ListAExpDate]'), $('[' + this.annotationName + '=ListAExpDateHelp]'), $('[' + this.annotationName + '=ListADocTitle2]'), $('[' + this.annotationName + '=ListADocTitle2Help]'), $('[' + this.annotationName + '=ListAIssuingAuthority2]'), $('[' + this.annotationName + '=ListAIssuingAuthority2Help]'), $('[' + this.annotationName + '=ListADocNumber2]'), $('[' + this.annotationName + '=ListADocNumber2Help]'), $('[' + this.annotationName + '=ListAExpDate2]'), $('[' + this.annotationName + '=ListAExpDate2Help]'), $('[' + this.annotationName + '=ListADocTitle3]'), $('[' + this.annotationName + '=ListADocTitle3Help]'), $('[' + this.annotationName + '=ListAIssuingAuthority3]'), $('[' + this.annotationName + '=ListAIssuingAuthority3Help]'), $('[' + this.annotationName + '=ListADocNumber3]'), $('[' + this.annotationName + '=ListADocNumber3Help]'), $('[' + this.annotationName + '=ListAExpDate3]'), $('[' + this.annotationName + '=ListAExpDate3Help]'), $('[' + this.annotationName + '=ListBDocTitle]'), $('[' + this.annotationName + '=ListBDocTitleHelp]'), $('[' + this.annotationName + '=ListBIssuingAuthority]'), $('[' + this.annotationName + '=ListBIssuingAuthorityHelp]'), $('[' + this.annotationName + '=ListBDocNumber]'), $('[' + this.annotationName + '=ListBDocNumberHelp]'), $('[' + this.annotationName + '=ListBExpDate]'), $('[' + this.annotationName + '=ListBExpDateHelp]'), $('[' + this.annotationName + '=ListCDocTitle]'), $('[' + this.annotationName + '=ListCDocTitleHelp]'), $('[' + this.annotationName + '=ListCIssuingAuthority]'), $('[' + this.annotationName + '=ListCIssuingAuthorityHelp]'), $('[' + this.annotationName + '=ListCDocNumber]'), $('[' + this.annotationName + '=ListCDocNumberHelp]'), $('[' + this.annotationName + '=ListCExpDate]'), $('[' + this.annotationName + '=ListCExpDateHelp]'), $('[' + this.annotationName + '=AdditionalInfo]'), $('[' + this.annotationName + '=AdditionalInfoHelp]'), $('[' + this.annotationName + '=HireDate]'), $('[' + this.annotationName + '=HireDateHelp]'), $('[' + this.annotationName + '=sgnEmployer]'), $('[' + this.annotationName + '=sgnEmployerHelp]'), $('[' + this.annotationName + '=EmployerSignDate]'), $('[' + this.annotationName + '=EmployerSignDateHelp]'), $('[' + this.annotationName + '=EmployerTitle]'), $('[' + this.annotationName + '=EmployerTitleHelp]'), $('[' + this.annotationName + '=EmployerLastName]'), $('[' + this.annotationName + '=EmployerLastNameHelp]'), $('[' + this.annotationName + '=EmployerFirstName]'), $('[' + this.annotationName + '=EmployerFirstNameHelp]'), $('[' + this.annotationName + '=EmployerName]'), $('[' + this.annotationName + '=EmployerNameHelp]'), $('[' + this.annotationName + '=EmployerAddress]'), $('[' + this.annotationName + '=EmployerAddressHelp]'), $('[' + this.annotationName + '=EmployerCity]'), $('[' + this.annotationName + '=EmployerCityHelp]'), $('[' + this.annotationName + '=EmployerState]'), $('[' + this.annotationName + '=EmployerStateHelp]'), $('[' + this.annotationName + '=EmployerZip]'), $('[' + this.annotationName + '=EmployerZipHelp]'));
        tabIndex = this.renderSection3(tabIndex, $('#dialogPage'), $('[' + this.annotationName + '=NewLastName]'), $('[' + this.annotationName + '=NewLastNameHelp]'), $('[' + this.annotationName + '=NewFirstName]'), $('[' + this.annotationName + '=NewFirstNameHelp]'), $('[' + this.annotationName + '=NewMiddleInitial]'), $('[' + this.annotationName + '=NewMiddleInitialHelp]'), $('[' + this.annotationName + '=RehireDate]'), $('[' + this.annotationName + '=RehireDateHelp]'), $('[' + this.annotationName + '=DocTitleSec3]'), $('[' + this.annotationName + '=DocTitleSec3Help]'), $('[' + this.annotationName + '=DocNumberSec3]'), $('[' + this.annotationName + '=DocNumberSec3Help]'), $('[' + this.annotationName + '=ExpDateSec3]'), $('[' + this.annotationName + '=ExpDateSec3Help]'), $('[' + this.annotationName + '=sgnEmployerSec3]'), $('[' + this.annotationName + '=sgnEmployerSec3Help]'), $('[' + this.annotationName + '=SignDateSec3]'), $('[' + this.annotationName + '=SignDateSec3Help]'), $('[' + this.annotationName + '=EmployerNameSec3]'), $('[' + this.annotationName + '=EmployerNameSec3Help]'));
        return tabIndex;
    };
    USI9.prototype.validateForm = function (dialog) {
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
    USI9.prototype.renderSections = function () {
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
        this.prepareSecondPage(this.prepareFirstPage(100));
    };
    return USI9;
}(USI9Section3));
$(document).on('textlayerrendered', function (e) {
    renderedPages[e.detail.pageNumber - 1] = true;
    if (e.detail.pageNumber == 1 && !renderedPages[1]) {
        PDFViewerApplication.eventBus.dispatch('nextpage');
        pageToLoad = 'firstpage';
        return;
    }
    if (e.detail.pageNumber >= 2 && !renderedPages[0]) {
        PDFViewerApplication.eventBus.dispatch('firstpage');
        return;
    }
    if (pageToLoad) {
        PDFViewerApplication.eventBus.dispatch(pageToLoad);
    }
    if (renderedPages[0] && renderedPages[1] && form == null) {
        form = new USI9();
        form.renderSections();
    }
});
