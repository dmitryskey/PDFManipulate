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
        this.NAFormat = /^[NA/]+$/;
        this.NAString = /^N\/A$/;
        this.DSFormat = /^[DS/]+$/;
        this.zipFormat = /^\d+$/;
        this.postalFormat = /^[A-Za-z0-9]+$/;
        this.zipNumberFormat = /^\d{5}$/;
        this.postalCodeFormat = /^[A-Za-z0-9]{6}$/;
        this.dateFormat = /^\d{2}[/]{1}\d{2}[/]{1}\d{4}$/;
        this.numberFormat = /^\d{1}$/;
        this.emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.phoneFormat = /^[\d/NA-]+$/;
        this.phoneNumber = /^\d{3}\-{1}\d{3}\-{1}\d{4}$/;
        this.uscisNumberFormat = /^\d{7,9}$/;
        this.admissionNumberFormat = /^\d{1}$/;
        this.usPassportNumber = /^[a-zA-Z0-9]{6,9}$/;
        this.cardNumber = /^[A-Za-z]{3}[0-9]{10}$/;
        this.passportNumber = /^[a-zA-Z0-9]{6,12}$/;
        this.i94Number = /^\d{11}$/;
        this.annotationName = 'annotation-name';
        this.annotationRequired = 'annotation-required';
        this.na = this._('NA');
        var self = this;
        $(document).tooltip({
            show: { delay: 200 }
        });
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
        for (var c in arr) {
            if (arr[c] !== ctrl) {
                arr[c].prop('checked', false);
                arr[c].parent().children('span').text('');
            }
        }
    };
    PDFForm.prototype.filterCombolist = function (ctrl, items, defaultValue, fields, callback) {
        var _this = this;
        if (!ctrl) {
            return;
        }
        var options = ctrl.parent().children().filter('.combo-content');
        for (var index in items) {
            options.children().filter('[value="' + index + '"]').text(items[index]);
        }
        options.children().show();
        options.children().each(function (code, item) {
            var val = item.getAttribute('value');
            if (!(val in items)) {
                options.children().filter('[value="' + val + '"]').hide();
            }
        });
        if (callback) {
            options.children().click(function (e) {
                callback(e.target.parentNode.parentNode
                    .getElementsByTagName('input')[0].getAttribute(_this.annotationName), e.target.getAttribute('value'), fields);
            });
        }
        if (defaultValue) {
            options.children().filter('[value="' + defaultValue + '"]').each(function (index, value) {
                ctrl.val(value.textContent);
            });
        }
        else {
            ctrl.val('');
        }
    };
    PDFForm.prototype.assignCombolistEventHandler = function (ctrl, f) {
        ctrl.parent().children().filter('.combo-content').click(f);
    };
    PDFForm.prototype.hideTooltip = function () {
        $('.ui-tooltip').hide();
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
            .toggleClass('icon').parent().click(function () {
            self.hideTooltip();
            $('.ui-dialog-titlebar-close').attr('title', '');
            dialog.text('').append(decodeURIComponent(text))
                .dialog('option', 'title', self._('help'))
                .dialog('option', 'minWidth', minWidth).dialog('open');
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
    USI9Fields.prototype.validateTextField = function (field, parameter, regExs, validateIfEmpty, errorMessages) {
        var errorFlag = true;
        var length = field.prop('maxLength') ? field.prop('maxLength') : 0;
        if (field.attr(this.annotationRequired) && field.val().trim() === '') {
            errorMessages.push(this.paramExistsMsg.replace('${parameter}', parameter));
        }
        else if (field.val().length > length && length > 0) {
            errorMessages.push(this.paramLengthMsg
                .replace('${parameter}', parameter)
                .replace('${length}', length.toString()));
        }
        else if ((field.val() !== '' || validateIfEmpty) && regExs.length > 0) {
            var validFlag = false;
            for (var i in regExs) {
                if (regExs[i].test(field.val())) {
                    validFlag = true;
                    break;
                }
            }
            if (!validFlag) {
                errorMessages.push(this.paramFormatMsg.replace('${parameter}', parameter));
            }
            errorFlag = !validFlag;
            if (!errorFlag) {
                var maxDate = field.datepicker('option', 'maxDate');
                var minDate = field.datepicker('option', 'minDate');
                if (maxDate) {
                    maxDate.setHours(0, 0, 0, 0);
                }
                if (minDate) {
                    minDate.setHours(0, 0, 0, 0);
                }
                if (maxDate && (new Date(field.val()) > maxDate)) {
                    errorMessages.push(this.paramMaxValueMsg
                        .replace('${parameter}', parameter)
                        .replace('${value}', maxDate.toDateString()));
                }
                else if (minDate && (new Date(field.val()) < minDate)) {
                    errorMessages.push(this.paramMinValueMsg
                        .replace('${parameter}', parameter)
                        .replace('${value}', minDate.toDateString()));
                }
                else {
                    errorFlag = false;
                }
            }
        }
        else {
            errorFlag = false;
        }
        field.toggleClass(this.invalidFieldClass, errorFlag);
        return errorFlag;
    };
    return USI9Fields;
}(PDFForm));
var USI9Section1 = (function (_super) {
    __extends(USI9Section1, _super);
    function USI9Section1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    USI9Section1.prototype.renderNameAndAddress = function (dialog, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, otherNames, otherNamesHelp, address, addressHelp, apptNumber, apptNumberHelp, city, cityHelp, state, stateHelp, zip, zipHelp) {
        var _this = this;
        this._lastName = lastName
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('lastnamehelp.tooltip') })
            .keypress(function (e) { return _this.nameFormat.test(String.fromCharCode(e.which)); });
        this._lastNameHelp = this.renderHelpIcon(lastNameHelp, this._('lastnamehelp.caption'), dialog, this._('lastnamehelp.text'));
        this._firstName = firstName
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('firstnamehelp.tooltip') })
            .keypress(function (e) { return _this.nameFormat.test(String.fromCharCode(e.which)); });
        this._firstNameHelp = this.renderHelpIcon(firstNameHelp, this._('firstnamehelp.caption'), dialog, this._('firstnamehelp.text'));
        this._middleInitial = middleInitial
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('middleinitialhelp.tooltip') })
            .keypress(function (e) {
            return _this.nameFormat.test(String.fromCharCode(e.which)) ||
                _this.NAFormat.test(String.fromCharCode(e.which));
        });
        this._middleInitialHelp = this.renderHelpIcon(middleInitialHelp, this._('middleinitialhelp.caption'), dialog, this._('middleinitialhelp.text'));
        this._otherNames = otherNames
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('othernameshelp.tooltip') })
            .keypress(function (e) {
            return _this.nameFormat.test(String.fromCharCode(e.which)) ||
                _this.NAFormat.test(String.fromCharCode(e.which));
        });
        this._otherNamesHelp = this.renderHelpIcon(otherNamesHelp, this._('othernameshelp.caption'), dialog, this._('othernameshelp.text'));
        this._address = address
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('addresshelp.tooltip') });
        this._addressHelp = this.renderHelpIcon(addressHelp, this._('addresshelp.caption'), dialog, this._('addresshelp.text'));
        this._apptNumber = apptNumber
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('apartmentnumberhelp.tooltip') });
        this._apptNumberHelp = this.renderHelpIcon(apptNumberHelp, this._('apartmentnumberhelp.caption'), dialog, this._('apartmentnumberhelp.text'));
        this._city = city
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('cityhelp.tooltip') });
        this._cityHelp = this.renderHelpIcon(cityHelp, this._('cityhelp.caption'), dialog, this._('cityhelp.text'));
        this._state = state
            .focus(function (e) {
            _this.hideTooltip();
            var nonUSCountries = ['CAN', 'MEX'];
            var zipCode = nonUSCountries.indexOf(e.currentTarget.value) < 0;
            _this._zip.unbind('keypress');
            _this._zip.keypress(function (e) {
                return (nonUSCountries.indexOf(_this._state.val()) < 0
                    ? _this.zipFormat : _this.postalFormat).test(String.fromCharCode(e.which));
            });
            _this._zip.prop('maxLength', zipCode ? 5 : 6);
        })
            .prop('title', '')
            .tooltip({ content: this._('statehelp.tooltip') });
        this._stateHelp = this.renderHelpIcon(stateHelp, this._('statehelp.caption'), dialog, this._('statehelp.text'));
        this._zip = zip
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('ziphelp.tooltip') })
            .keypress(function (e) { return _this.zipFormat.test(String.fromCharCode(e.which)); });
        this._zipHelp = this.renderHelpIcon(zipHelp, this._('ziphelp.caption'), dialog, this._('ziphelp.text'));
    };
    USI9Section1.prototype.renderSSNFields = function (ssn) {
        var _this = this;
        this._ssn = ssn;
        for (var i = 0; i < ssn.length - 1; i++) {
            this._ssn[i]
                .attr('nextElement', (this._ssn[i + 1]).attr(this.annotationName))
                .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
                .tooltip({ content: this._('ssnhelp.tooltip') })
                .keypress(function (e) {
                if (_this.numberFormat.test(String.fromCharCode(e.which))) {
                    $('[' + _this.annotationName + '=' + $(e.target).attr('nextElement') + ']').focus();
                    return true;
                }
                else {
                    return false;
                }
            });
        }
        this._ssn[ssn.length - 1]
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('ssnhelp.tooltip') })
            .keypress(function (e) { return _this.numberFormat.test(String.fromCharCode(e.which)); });
    };
    USI9Section1.prototype.renderPersonalData = function (dialog, dob, dobHelp, ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34, ssnHelp, email, emailHelp, phone, phoneHelp) {
        var _this = this;
        var maxDOB = new Date();
        maxDOB.setFullYear(maxDOB.getFullYear() - 14);
        this._dob = dob
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('dobhelp.tooltip') })
            .datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1908:' + maxDOB.getFullYear(),
            maxDate: maxDOB
        });
        this._dobHelp = this.renderHelpIcon(dobHelp, this._('dobhelp.caption'), dialog, this._('dobhelp.text'));
        this.renderSSNFields([ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34]);
        this._ssnHelp = this.renderHelpIcon(ssnHelp, this._('ssnhelp.caption'), dialog, this._('ssnhelp.text'), 400);
        this._email = email
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('emailhelp.tooltip') });
        this._emailHelp = this.renderHelpIcon(emailHelp, this._('emailhelp.caption'), dialog, this._('emailhelp.text'));
        this._phone = phone
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('phonehelp.tooltip') })
            .keypress(function (e) { return _this.phoneFormat.test(String.fromCharCode(e.which)); });
        this._phoneHelp = this.renderHelpIcon(phoneHelp, this._('phonehelp.caption'), dialog, this._('phonehelp.text'));
    };
    USI9Section1.prototype.renderCitizenship = function (dialog, citizen, citizenHelp, national, nationalHelp, lpr, lprHelp, alien, alienHelp, uscisNumberHelp, lpruscisNumPrefix, lpruscisNum, lpruscisNumType, alienWorkAuthDate, alienuscisNumPrefix, alienuscisNum, alienuscisNumType, admissionNum, admissionNumHelp, passportNum, passportNumHelp, countryOfIssuance, countryOfIssuanceHelp, sgnEmployee, sgnEmployeeHelp, sgnEmployeeDate, sgnEmployeeDateHelp) {
        var _this = this;
        this._citizen = citizen
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('citizenhelp.tooltip') });
        this._citizenHelp = this.renderHelpIcon(citizenHelp, this._('citizenhelp.caption'), dialog, this._('citizenhelp.text'));
        this._national = national
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('nationalhelp.tooltip') });
        this._nationalHelp = this.renderHelpIcon(nationalHelp, this._('nationalhelp.caption'), dialog, this._('nationalhelp.text'));
        this._lpr = lpr
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('lprhelp.tooltip') });
        this._lprHelp = this.renderHelpIcon(lprHelp, this._('lprhelp.caption'), dialog, this._('lprhelp.text'));
        this._alien = alien
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('alienhelp.tooltip') });
        this._alienHelp = this.renderHelpIcon(alienHelp, this._('alienhelp.caption'), dialog, this._('alienhelp.text'), 500);
        this._uscisNumberHelp = this.renderHelpIcon(uscisNumberHelp, this._('uscisnumberhelp.caption'), dialog, this._('uscisnumberhelp.text'));
        this._lpruscisNumPrefix = lpruscisNumPrefix;
        this._lpruscisNum = lpruscisNum
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('uscisnumber.tooltip') })
            .keypress(function (e) { return _this.numberFormat.test(String.fromCharCode(e.which)); });
        this._lpruscisNumType = lpruscisNumType
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('uscisnumbertype.tooltip') });
        this.assignCombolistEventHandler(this._lpruscisNumType, function (e) {
            return _this._lpruscisNumPrefix.val(e.target.getAttribute('value') === 'A' ? 'A' : '');
        });
        this._alienWorkAuthDate = alienWorkAuthDate
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('alienworkauthdate.tooltip') })
            .datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        })
            .unbind('keypress')
            .keypress(function (e) {
            return /[\d/]/g.test(String.fromCharCode(e.which)) ||
                _this.NAFormat.test(String.fromCharCode(e.which));
        });
        this._alienuscisNumPrefix = alienuscisNumPrefix;
        this._alienuscisNum = alienuscisNum
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('uscisnumber.tooltip') })
            .keypress(function (e) { return _this.numberFormat.test(String.fromCharCode(e.which)); });
        this._alienuscisNumType = alienuscisNumType
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('uscisnumbertype.tooltip') });
        this.assignCombolistEventHandler(this._alienuscisNumType, function (e) {
            return _this._alienuscisNumPrefix.val(e.target.getAttribute('value') === 'A' ? 'A' : '');
        });
        this._admissionNum = admissionNum
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('admissionnumber.tooltip') })
            .keypress(function (e) { return _this.numberFormat.test(String.fromCharCode(e.which)); });
        this._admissionNumHelp = this.renderHelpIcon(admissionNumHelp, this._('admissionnumberhelp.caption'), dialog, this._('admissionnumberhelp.text'));
        this._passportNum = passportNum
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('passportnumber.tooltip') });
        this._passportNumHelp = this.renderHelpIcon(passportNumHelp, this._('passportnumberhelp.caption'), dialog, this._('passportnumberhelp.text'));
        this._countryOfIssuance = countryOfIssuance
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('coi.tooltip') });
        this._countryOfIssuanceHelp = this.renderHelpIcon(countryOfIssuanceHelp, this._('coihelp.caption'), dialog, this._('coihelp.text'));
        this._sgnEmployee = sgnEmployee
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('sgnemployee.tooltip') });
        this._sgnEmployeeHelp = this.renderHelpIcon(sgnEmployeeHelp, this._('sgnemployeehelp.caption'), dialog, this._('sgnemployeehelp.text'), 700);
        this._sgnEmployeeDate = sgnEmployeeDate
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('employeedate.tooltip') })
            .datepicker({ minDate: new Date() });
        this._sgnEmployeeDateHelp = this.renderHelpIcon(sgnEmployeeDateHelp, this._('employeedatehelp.caption'), dialog, this._('employeedatehelp.text'));
    };
    USI9Section1.prototype.renderSection1 = function (dialog, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, otherNames, otherNamesHelp, address, addressHelp, apptNumber, apptNumberHelp, city, cityHelp, state, stateHelp, zip, zipHelp, dob, dobHelp, ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34, ssnHelp, email, emailHelp, phone, phoneHelp, citizen, citizenHelp, national, nationalHelp, lpr, lprHelp, alien, alienHelp, uscisNumberHelp, lpruscisNumPrefix, lpruscisNum, lpruscisNumType, alienWorkAuthDate, alienuscisNumPrefix, alienuscisNum, alienuscisNumType, admissionNum, admissionNumHelp, passportNum, passportNumHelp, countryOfIssuance, countryOfIssuanceHelp, sgnEmployee, sgnEmployeeHelp, sgnEmployeeDate, sgnEmployeeDateHelp) {
        $('a').prop('target', '_blank');
        this.renderNameAndAddress(dialog, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, otherNames, otherNamesHelp, address, addressHelp, apptNumber, apptNumberHelp, city, cityHelp, state, stateHelp, zip, zipHelp);
        this.renderPersonalData(dialog, dob, dobHelp, ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34, ssnHelp, email, emailHelp, phone, phoneHelp);
        this.renderCitizenship(dialog, citizen, citizenHelp, national, nationalHelp, lpr, lprHelp, alien, alienHelp, uscisNumberHelp, lpruscisNumPrefix, lpruscisNum, lpruscisNumType, alienWorkAuthDate, alienuscisNumPrefix, alienuscisNum, alienuscisNumType, admissionNum, admissionNumHelp, passportNum, passportNumHelp, countryOfIssuance, countryOfIssuanceHelp, sgnEmployee, sgnEmployeeHelp, sgnEmployeeDate, sgnEmployeeDateHelp);
    };
    USI9Section1.prototype.validateFields = function () {
        var _this = this;
        var errorMessages = [];
        var naFields = [this._middleInitial, this._otherNames, this._apptNumber, this._email, this._phone];
        for (var idx in naFields) {
            if (naFields[idx].val() === '') {
                naFields[idx].val(this.na);
            }
        }
        this.validateTextField(this._lastName, this._('name.last'), [this.nameFormat], false, errorMessages);
        this.validateTextField(this._firstName, this._('name.first'), [this.nameFormat], false, errorMessages);
        this.validateTextField(this._middleInitial, this._('name.middleinitial'), [this.nameInitialFormat, this.NAString], false, errorMessages);
        this.validateTextField(this._otherNames, this._('name.othernames'), [this.nameFormat, this.NAString], false, errorMessages);
        this.validateTextField(this._address, this._('address.address'), [], false, errorMessages);
        this.validateTextField(this._apptNumber, this._('address.appartment'), [this.NAString], false, errorMessages);
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
            this.validateTextField(this._alienuscisNum, this._('citizenship.uscis'), [this.NAFormat, this.uscisNumberFormat], false, errorMessages);
            this.validateTextField(this._admissionNum, this._('citizenship.admission'), [this.NAFormat, this.admissionNumberFormat], false, errorMessages);
            this.validateTextField(this._passportNum, this._('citizenship.passport'), [this.NAFormat, this.passportNumber], false, errorMessages);
            if (this.EmptyOrNA(this._alienuscisNum) && this.EmptyOrNA(this._admissionNum) &&
                this.EmptyOrNA(this._passportNum) && this.EmptyOrNA(this._countryOfIssuance)) {
                [this._alienuscisNum, this._admissionNum, this._passportNum, this._countryOfIssuance].forEach(function (field) {
                    return field.toggleClass(_this.invalidFieldClass, true);
                });
                errorMessages.push(this.paramExistsMsg.replace('${parameter}', this._('citizenship.alienadmissionpassport')));
            }
            else if (this.EmptyOrNA(this._alienuscisNum) && this.EmptyOrNA(this._admissionNum) &&
                (this.EmptyOrNA(this._passportNum) || this.EmptyOrNA(this._countryOfIssuance))) {
                [this._passportNum, this._countryOfIssuance].forEach(function (field) {
                    return field.toggleClass(_this.invalidFieldClass, true);
                });
                errorMessages.push(this.paramExistsMsg.replace('${parameter}', this._('citizenship.passportcountry')));
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
    USI9Translator.prototype.renderTranslatorSection = function (dialog, translatorNo, translatorYes, translatorHelp, sgnTranslator, sgnTranslatorHelp, translatorDate, translatorDateHelp, translatorLastName, translatorLastNameHelp, translatorFirstName, translatorFirstNameHelp, translatorAddress, translatorAddressHelp, translatorCity, translatorCityHelp, translatorState, translatorStateHelp, translatorZip, translatorZipHelp) {
        var _this = this;
        var translator = [translatorYes, translatorNo];
        this._translatorYes = translatorYes
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('translator.tooltip') })
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
        });
        this._translatorNo = translatorNo
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('translator.tooltip') })
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
        });
        this._translatorHelp = this.renderHelpIcon(translatorHelp, this._('translatorhelp.caption'), dialog, this._('translatorhelp.text'), 500);
        this._sgnTranslator = sgnTranslator
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('sgntranslator.tooltip') });
        this._sgnTranslatorHelp = this.renderHelpIcon(sgnTranslatorHelp, this._('sgntranslatorhelp.caption'), dialog, this._('sgntranslatorhelp.text'));
        this._translatorDate = translatorDate
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('translatordate.tooltip') })
            .datepicker({ minDate: new Date() });
        this._translatorDateHelp = this.renderHelpIcon(translatorDateHelp, this._('translatordatehelp.caption'), dialog, this._('translatordatehelp.text'));
        this._translatorLastName = translatorLastName
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('translatorlastname.tooltip') })
            .prop('maxLength', 40)
            .keypress(function (e) { return _this.nameFormat.test(String.fromCharCode(e.which)); });
        this._translatorLastNameHelp = this.renderHelpIcon(translatorLastNameHelp, this._('translatorlastnamehelp.caption'), dialog, this._('translatorlastnamehelp.text'));
        this._translatorFirstName = translatorFirstName
            .prop('title', '').tooltip({ content: this._('translatorfirstname.tooltip') })
            .prop('maxLength', 25)
            .keypress(function (e) { return _this.nameFormat.test(String.fromCharCode(e.which)); });
        this._translatorFirstNameHelp = this.renderHelpIcon(translatorFirstNameHelp, this._('translatorfirstnamehelp.caption'), dialog, this._('translatorfirstnamehelp.text'));
        this._translatorAddress = translatorAddress
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('translatoraddress.tooltip') });
        this._translatorAddressHelp = this.renderHelpIcon(translatorAddressHelp, this._('translatoraddresshelp.caption'), dialog, this._('translatoraddresshelp.text'));
        this._translatorCity = translatorCity
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('translatorcity.tooltip') });
        this._translatorCityHelp = this.renderHelpIcon(translatorCityHelp, this._('translatorcityhelp.caption'), dialog, this._('translatorcityhelp.text'));
        this._translatorState = translatorState
            .prop('title', '').tooltip({ content: this._('translatorstate.tooltip') });
        this._translatorStateHelp = this.renderHelpIcon(translatorStateHelp, this._('translatorstatehelp.caption'), dialog, this._('translatorstatehelp.text'));
        this._translatorZip = translatorZip
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('translatorzip.tooltip') })
            .keypress(function (e) { return _this.zipFormat.test(String.fromCharCode(e.which)); });
        this._translatorZipHelp = this.renderHelpIcon(translatorZipHelp, this._('translatorziphelp.caption'), dialog, this._('translatorziphelp.text'));
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    USI9Section2.prototype.processLPR = function (flag) {
        var na = flag ? this._('NA') : '';
        this._lpruscisNumPrefix.val('');
        this._lpruscisNum.prop('disabled', true).val(na);
        this._lpruscisNumType.prop('disabled', true);
        this.filterCombolist(this._lpruscisNumType, {}, null, this, this.processListABC);
    };
    USI9Section2.prototype.processAlien = function (flag) {
        var na = flag ? this._('NA') : '';
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
    USI9Section2.prototype.CleanListABC = function () {
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
    USI9Section2.prototype.renderSection2 = function (dialog, employeeInfoHelp, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, immigrationStatus, immigrationStatusHelp, listADoc, listADocHelp, listAIssuingAuthority, listAIssuingAuthorityHelp, listADocNumber, listADocNumberHelp, listADocExpDate, listADocExpDateHelp, listADoc2, listADoc2Help, listAIssuingAuthority2, listAIssuingAuthority2Help, listADocNumber2, listADocNumber2Help, listADocExpDate2, listADocExpDate2Help, listADoc3, listADoc3Help, listAIssuingAuthority3, listAIssuingAuthority3Help, listADocNumber3, listADocNumber3Help, listADocExpDate3, listADocExpDate3Help, listBDoc, listBDocHelp, listBIssuingAuthority, listBIssuingAuthorityHelp, listBDocNumber, listBDocNumberHelp, listBDocExpDate, listBDocExpDateHelp, listCDoc, listCDocHelp, listCIssuingAuthority, listCIssuingAuthorityHelp, listCDocNumber, listCDocNumberHelp, listCDocExpDate, listCDocExpDateHelp, additionalInfo, additionalInfoHelp, hireDate, hireDateHelp, sgnEmployer, sgnEmployerHelp, employerSignDate, employerSignDateHelp, employerTitle, employerTitleHelp, employerLastName, employerLastNameHelp, employerFirstName, employerFirstNameHelp, employerName, employerNameHelp, employerAddress, employerAddressHelp, employerCity, employerCityHelp, employerState, employerStateHelp, employerZip, employerZipHelp) {
        var _this = this;
        $('a').prop('target', '_blank');
        this._dob.change(function (e) {
            return _this.filterCombolist(_this._listBDoc, _this.getListBContent(e.target.value), _this.na, _this, _this.processListABC);
        });
        var citizenships = [this._citizen, this._national, this._lpr, this._alien];
        this._citizen.click(function () {
            _this.selectCheckmark(_this._citizen, citizenships);
            _this.processLPR(_this._citizen.prop('checked'));
            _this.processAlien(_this._citizen.prop('checked'));
            _this.CleanListABC();
            if (_this._citizen.prop('checked')) {
                _this.filterCombolist(_this._listADoc, _this.getListAContent('1'), null, _this, _this.processListABC);
                _this.filterCombolist(_this._listCDoc, _this.getListCContent('1'), null, _this, _this.processListABC);
            }
        });
        this._national.click(function () {
            _this.selectCheckmark(_this._national, citizenships);
            _this.processLPR(_this._national.prop('checked'));
            _this.processAlien(_this._national.prop('checked'));
            _this.CleanListABC();
            if (_this._national.prop('checked')) {
                _this.filterCombolist(_this._listADoc, _this.getListAContent('2'), null, _this, _this.processListABC);
                _this.filterCombolist(_this._listCDoc, _this.getListCContent('2'), null, _this, _this.processListABC);
            }
        });
        this._lpr.click(function () {
            _this.selectCheckmark(_this._lpr, citizenships);
            _this.processAlien(_this._lpr.prop('checked'));
            _this._lpruscisNum.val('');
            _this.filterCombolist(_this._lpruscisNumType, {}, null, _this, _this.processListABC);
            _this.CleanListABC();
            if (_this._lpr.prop('checked')) {
                _this._lpruscisNum.prop('disabled', false);
                _this._lpruscisNumType.prop('disabled', false);
                _this.filterCombolist(_this._lpruscisNumType, { 'A': _this._('aliennumber'), 'U': _this._('uscisnumber') }, null, _this, _this.processListABC);
                _this.filterCombolist(_this._listADoc, _this.getListAContent('3'), null, _this, _this.processListABC);
                _this.filterCombolist(_this._listCDoc, _this.getListCContent('3'), null, _this, _this.processListABC);
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
            _this.CleanListABC();
            if (_this._alien.prop('checked')) {
                _this._alienWorkAuthDate.prop('disabled', false);
                _this._alienuscisNum.prop('disabled', false);
                _this._alienuscisNumType.prop('disabled', false);
                _this.filterCombolist(_this._alienuscisNumType, { 'A': _this._('aliennumber'), 'U': _this._('uscisnumber') }, null, _this, _this.processListABC);
                _this._admissionNum.prop('disabled', false);
                _this._passportNum.prop('disabled', false);
                _this._countryOfIssuance.prop('disabled', false);
                _this.filterCombolist(_this._countryOfIssuance, JSON.parse(_this._('countries')), null, _this, _this.processListABC);
                _this.filterCombolist(_this._listADoc, _this.getListAContent('4'), null, _this, _this.processListABC);
                _this.filterCombolist(_this._listCDoc, _this.getListCContent('4'), _this.na, _this, _this.processListABC);
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
        this._employeeInfoHelp = this.renderHelpIcon(employeeInfoHelp, this._('employeeinfosection2help.caption'), dialog, this._('employeeinfosection2help.text'));
        this._lastNameSection2 = lastName;
        this._lastNameSection2Help = this.renderHelpIcon(lastNameHelp, this._('lastnamesection2help.caption'), dialog, this._('lastnamesection2help.text'));
        this._firstNameSection2 = firstName;
        this._firstNameSection2Help = this.renderHelpIcon(firstNameHelp, this._('firstnamesection2help.caption'), dialog, this._('firstnamesection2help.text'));
        this._middleInitialSection2 = middleInitial;
        this._middleInitialSection2Help = this.renderHelpIcon(middleInitialHelp, this._('middleinitialsection2help.caption'), dialog, this._('middleinitialsection2help.text'));
        this._immigrationStatus = immigrationStatus;
        this._immigrationStatusHelp = this.renderHelpIcon(immigrationStatusHelp, this._('immigrationstatushelp.caption'), dialog, this._('immigrationstatushelp.text'));
        this.renderListABC(dialog, listADoc, listADocHelp, listAIssuingAuthority, listAIssuingAuthorityHelp, listADocNumber, listADocNumberHelp, listADocExpDate, listADocExpDateHelp, listADoc2, listADoc2Help, listAIssuingAuthority2, listAIssuingAuthority2Help, listADocNumber2, listADocNumber2Help, listADocExpDate2, listADocExpDate2Help, listADoc3, listADoc3Help, listAIssuingAuthority3, listAIssuingAuthority3Help, listADocNumber3, listADocNumber3Help, listADocExpDate3, listADocExpDate3Help, listBDoc, listBDocHelp, listBIssuingAuthority, listBIssuingAuthorityHelp, listBDocNumber, listBDocNumberHelp, listBDocExpDate, listBDocExpDateHelp, listCDoc, listCDocHelp, listCIssuingAuthority, listCIssuingAuthorityHelp, listCDocNumber, listCDocNumberHelp, listCDocExpDate, listCDocExpDateHelp);
        this._additionalInfo = additionalInfo
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('additionalinfo.tooltip') });
        this._additionalInfoHelp = this.renderHelpIcon(additionalInfoHelp, this._('additionalinfohelp.caption'), dialog, this._('additionalinfohelp.text'), 500);
        this.CleanListABC();
        this._hireDate = hireDate
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('hiredate.tooltip') })
            .datepicker({ minDate: new Date() });
        this._hireDateHelp = this.renderHelpIcon(hireDateHelp, this._('hiredatehelp.caption'), dialog, this._('hiredatehelp.text'));
        this.renderEmployerData(dialog, sgnEmployer, sgnEmployerHelp, employerSignDate, employerSignDateHelp, employerTitle, employerTitleHelp, employerLastName, employerLastNameHelp, employerFirstName, employerFirstNameHelp, employerName, employerNameHelp, employerAddress, employerAddressHelp, employerCity, employerCityHelp, employerState, employerStateHelp, employerZip, employerZipHelp);
    };
    USI9Section2.prototype.validateFields = function () {
        var _this = this;
        var errorMessages = _super.prototype.validateFields.call(this);
        var section2Fields = [this._listADoc,
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
            this._additionalInfo];
        if (section2Fields.filter(function (f) { return f.val().trim() !== ''; }).length == 0) {
            return errorMessages;
        }
        section2Fields.filter(function (f) { return f.val().trim() === '' && !f.prop('required'); }).forEach(function (f) { return f.val(_this.na); });
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
        else {
            if (this._listADocNumber.val().trim() === '') {
                errorMessages.push(this._('section2.listafirstdocnumber'));
                this._listADocNumber.toggleClass(this.invalidFieldClass, true);
            }
            if (this._listADocNumber2.val().trim() === '') {
                errorMessages.push(this._('section2.listaseconddocnumber'));
                this._listADocNumber2.toggleClass(this.invalidFieldClass, true);
            }
            if (this._listADocNumber3.val().trim() === '') {
                errorMessages.push(this._('section2.listathirddocnumber'));
                this._listADocNumber3.toggleClass(this.invalidFieldClass, true);
            }
            if (this._listADocExpDate.val().trim() === '') {
                errorMessages.push(this._('section2.listafirstexpdate'));
                this._listADocExpDate.toggleClass(this.invalidFieldClass, true);
            }
            if (this._listADocExpDate2.val().trim() === '') {
                errorMessages.push(this._('section2.listasecondexpdate'));
                this._listADocExpDate2.toggleClass(this.invalidFieldClass, true);
            }
            if (this._listADocExpDate3.val().trim() === '') {
                errorMessages.push(this._('section2.listathirdexpdate'));
                this._listADocExpDate3.toggleClass(this.invalidFieldClass, true);
            }
        }
        return errorMessages;
    };
    USI9Section2.prototype.renderListABC = function (dialog, listADoc, listADocHelp, listAIssuingAuthority, listAIssuingAuthorityHelp, listADocNumber, listADocNumberHelp, listADocExpDate, listADocExpDateHelp, listADoc2, listADoc2Help, listAIssuingAuthority2, listAIssuingAuthority2Help, listADocNumber2, listADocNumber2Help, listADocExpDate2, listADocExpDate2Help, listADoc3, listADoc3Help, listAIssuingAuthority3, listAIssuingAuthority3Help, listADocNumber3, listADocNumber3Help, listADocExpDate3, listADocExpDate3Help, listBDoc, listBDocHelp, listBIssuingAuthority, listBIssuingAuthorityHelp, listBDocNumber, listBDocNumberHelp, listBDocExpDate, listBDocExpDateHelp, listCDoc, listCDocHelp, listCIssuingAuthority, listCIssuingAuthorityHelp, listCDocNumber, listCDocNumberHelp, listCDocExpDate, listCDocExpDateHelp) {
        var _this = this;
        this._listADoc = listADoc
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listadoc.tooltip') });
        this._listADocHelp = this.renderHelpIcon(listADocHelp, this._('listadochelp.caption'), dialog, this._('listadochelp.text'), 500);
        this._listAIssuingAuthority = listAIssuingAuthority
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listaissuingauthority.tooltip') });
        this._listAIssuingAuthorityHelp = this.renderHelpIcon(listAIssuingAuthorityHelp, this._('listaissuingauthorityhelp.caption'), dialog, this._('listaissuingauthorityhelp.text'), 500);
        this._listADocNumber = listADocNumber
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listadocnumber.tooltip') });
        this._listADocNumberHelp = this.renderHelpIcon(listADocNumberHelp, this._('listadocnumberhelp.caption'), dialog, this._('listadocnumberhelp.text'), 500);
        this._listADocExpDate = listADocExpDate
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listaexpdate.tooltip') })
            .datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        });
        this._listADocExpDateHelp = this.renderHelpIcon(listADocExpDateHelp, this._('listaexpdatehelp.caption'), dialog, this._('listaexpdatehelp.text'), 500);
        this._listADoc2 = listADoc2
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listadoc2.tooltip') });
        this._listADoc2Help = this.renderHelpIcon(listADoc2Help, this._('listadoc2help.caption'), dialog, this._('listadoc2help.text'), 500);
        this._listAIssuingAuthority2 = listAIssuingAuthority2
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listaissuingauthority2.tooltip') });
        this._listAIssuingAuthority2Help = this.renderHelpIcon(listAIssuingAuthority2Help, this._('listaissuingauthority2help.caption'), dialog, this._('listaissuingauthority2help.text'), 500);
        this._listADocNumber2 = listADocNumber2
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listadocnumber2.tooltip') });
        this._listADocNumber2Help = this.renderHelpIcon(listADocNumber2Help, this._('listadocnumber2help.caption'), dialog, this._('listadocnumber2help.text'), 500);
        this._listADocExpDate2 = listADocExpDate2
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listaexpdate2.tooltip') })
            .datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        });
        this._listADocExpDate2Help = this.renderHelpIcon(listADocExpDate2Help, this._('listaexpdate2help.caption'), dialog, this._('listaexpdate2help.text'), 500);
        this._listADoc3 = listADoc3
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listadoc3.tooltip') });
        this._listADoc3Help = this.renderHelpIcon(listADoc3Help, this._('listadoc3help.caption'), dialog, this._('listadoc3help.text'), 500);
        this._listAIssuingAuthority3 = listAIssuingAuthority3
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listaissuingauthority3.tooltip') });
        this._listAIssuingAuthority3Help = this.renderHelpIcon(listAIssuingAuthority3Help, this._('listaissuingauthority3help.caption'), dialog, this._('listaissuingauthority3help.text'), 500);
        this._listADocNumber3 = listADocNumber3
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listadocnumber3.tooltip') });
        this._listADocNumber3Help = this.renderHelpIcon(listADocNumber3Help, this._('listadocnumber3help.caption'), dialog, this._('listadocnumber3help.text'), 500);
        this._listADocExpDate3 = listADocExpDate3
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listaexpdate3.tooltip') })
            .datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        });
        this._listADocExpDate3Help = this.renderHelpIcon(listADocExpDate3Help, this._('listaexpdate3help.caption'), dialog, this._('listaexpdate3help.text'), 500);
        this._listBDoc = listBDoc
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listbdoc.tooltip') });
        this._listBDocHelp = this.renderHelpIcon(listBDocHelp, this._('listbdochelp.caption'), dialog, this._('listbdochelp.text'), 600);
        this.filterCombolist(this._listBDoc, this.getListBContent(null), null, this, this.processListABC);
        this._listBIssuingAuthority = listBIssuingAuthority
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listbissuingauthority.tooltip') });
        this._listBIssuingAuthorityHelp = this.renderHelpIcon(listBIssuingAuthorityHelp, this._('listbissuingauthorityhelp.caption'), dialog, this._('listbissuingauthorityhelp.text'), 500);
        this._listBDocNumber = listBDocNumber
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listbdocnumber.tooltip') });
        this._listBDocNumberHelp = this.renderHelpIcon(listBDocNumberHelp, this._('listbdocnumberhelp.caption'), dialog, this._('listbdocnumberhelp.text'));
        this._listBDocExpDate = listBDocExpDate
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listbexpdate.tooltip') })
            .datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        });
        this._listBDocExpDateHelp = this.renderHelpIcon(listBDocExpDateHelp, this._('listbexpdatehelp.caption'), dialog, this._('listbexpdatehelp.text'), 500);
        this._listCDoc = listCDoc
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listcdoc.tooltip') });
        this._listCDocHelp = this.renderHelpIcon(listCDocHelp, this._('listcdochelp.caption'), dialog, this._('listcdochelp.text'), 600);
        this.filterCombolist(this._listCDoc, this.getListCContent(null), null, this, this.processListABC);
        this._listCIssuingAuthority = listCIssuingAuthority
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listcissuingauthority.tooltip') });
        this._listCIssuingAuthorityHelp = this.renderHelpIcon(listCIssuingAuthorityHelp, this._('listcissuingauthorityhelp.caption'), dialog, this._('listcissuingauthorityhelp.text'), 500);
        this._listCDocNumber = listCDocNumber
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listcdocnumber.tooltip') });
        this._listCDocNumberHelp = this.renderHelpIcon(listCDocNumberHelp, this._('listcdocnumberhelp.caption'), dialog, this._('listcdocnumberhelp.text'));
        this._listCDocExpDate = listCDocExpDate
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('listcexpdate.tooltip') })
            .datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        });
        this._listCDocExpDateHelp = this.renderHelpIcon(listCDocExpDateHelp, this._('listcexpdatehelp.caption'), dialog, this._('listcexpdatehelp.text'), 500);
    };
    USI9Section2.prototype.renderEmployerData = function (dialog, sgnEmployer, sgnEmployerHelp, employerSignDate, employerSignDateHelp, employerTitle, employerTitleHelp, employerLastName, employerLastNameHelp, employerFirstName, employerFirstNameHelp, employerName, employerNameHelp, employerAddress, employerAddressHelp, employerCity, employerCityHelp, employerState, employerStateHelp, employerZip, employerZipHelp) {
        var _this = this;
        this._sgnEmployer = sgnEmployer
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('sgnemployer.tooltip') });
        this._sgnEmployerHelp = this.renderHelpIcon(sgnEmployerHelp, this._('sgnemployerhelp.caption'), dialog, this._('sgnemployerhelp.text'), 500);
        this._employerSignDate = employerSignDate
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('employersigndate.tooltip') })
            .datepicker({ minDate: new Date() });
        this._employerSignDateHelp = this.renderHelpIcon(employerSignDateHelp, this._('employersigndatehelp.caption'), dialog, this._('employersigndatehelp.text'), 500);
        this._employerTitle = employerTitle
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('employertitle.tooltip') });
        this._employerTitleHelp = this.renderHelpIcon(employerTitleHelp, this._('employertitlehelp.caption'), dialog, this._('employertitlehelp.text'), 500);
        this._employerLastName = employerLastName
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('employerlastname.tooltip') });
        this._employerLastNameHelp = this.renderHelpIcon(employerLastNameHelp, this._('employerlastnamehelp.caption'), dialog, this._('employerlastnamehelp.text'), 500);
        this._employerFirstName = employerFirstName
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('employerfirstname.tooltip') });
        this._employerFirstNameHelp = this.renderHelpIcon(employerFirstNameHelp, this._('employerfirstnamehelp.caption'), dialog, this._('employerfirstnamehelp.text'), 500);
        this._employerName = employerName
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('employername.tooltip') });
        this._employerNameHelp = this.renderHelpIcon(employerNameHelp, this._('employernamehelp.caption'), dialog, this._('employernamehelp.text'), 500);
        this._employerAddress = employerAddress
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('employeraddress.tooltip') });
        this._employerAddressHelp = this.renderHelpIcon(employerAddressHelp, this._('employeraddresshelp.caption'), dialog, this._('employeraddresshelp.text'), 500);
        this._employerCity = employerCity
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('employercity.tooltip') });
        this._employerCityHelp = this.renderHelpIcon(employerCityHelp, this._('employercityhelp.caption'), dialog, this._('employercityhelp.text'), 500);
        this._employerState = employerState
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('employerstate.tooltip') });
        this._employerStateHelp = this.renderHelpIcon(employerStateHelp, this._('employerstatehelp.caption'), dialog, this._('employerstatehelp.text'), 500);
        this._employerZip = employerZip
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('employerzip.tooltip') })
            .keypress(function (e) { return _this.zipFormat.test(String.fromCharCode(e.which)); });
        this._employerZipHelp = this.renderHelpIcon(employerZipHelp, this._('employerziphelp.caption'), dialog, this._('employerziphelp.text'));
    };
    USI9Section2.prototype.processListABC = function (ddl, code, self) {
        switch (ddl) {
            case 'ListADocTitle':
                self.listADocTitle(ddl, code);
                break;
            case 'ListADocTitle2':
                self.listADocTitle2(ddl, code);
                break;
            case 'ListADocTitle3':
                self.listADocTitle3(ddl, code);
                break;
            case 'ListBDocTitle':
                self.listBDocTitle(ddl, code);
                break;
            case 'ListCDocTitle':
                self.listCDocTitle(ddl, code);
                break;
        }
    };
    USI9Section2.prototype.getListAContent = function (citizenship) {
        var usCitizenorNational = { '': '', 0: this.na, 1: this._('uspassport'), 2: this._('uspassportcard') };
        var lpr = {
            0: this.na,
            3: this._('permanentresidentcard'),
            4: this._('alienresidentcard'),
            5: this._('foreignpassport'),
            10: this._('I551I94receipt'),
            12: this._('I551receipt')
        };
        var alien = {
            0: this.na,
            6: this._('eadI766'),
            7: this._('foreinpassportnonimmigrant'),
            8: this._('FSMpassport'),
            9: this._('RMIpassport'),
            11: this._('I94refugeestampreceipt'),
            13: this._('I766receipt'),
            14: this._('foreinpassportnonimmigrantreceipt'),
            15: this._('FSMpassportreceipt'),
            16: this._('RMIpassportreceipt')
        };
        switch (citizenship) {
            case '0':
            case null:
                return $.extend(usCitizenorNational, lpr, alien);
            case '1':
            case '2':
                return usCitizenorNational;
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
                13: this._('eadListCReceipt')
            });
        }
        $.each(listC, function (i, v) { return listC[i] = decodeURIComponent(v); });
        return listC;
    };
    USI9Section2.prototype.listADocTitle = function (ddl, code) {
        var USDS = 'USDS';
        var USCIS = 'USCIS';
        var DOJINS = 'DOJINS';
        var DHS = 'DHS';
        var CBP = 'CBP';
        var FSM = 'FSM';
        var RMI = 'RMI';
        var numberMaxLength = 15;
        var fieldFormat = /^[a-zA-Z0-9]+$/;
        var issuingAuthList;
        var issuingAuth;
        this._listADocExpDate.datepicker('option', 'minDate', new Date());
        this._listADocNumber.prop('required', true);
        this._listADocExpDate.prop('required', true);
        if (['1', '2'].indexOf(code) >= 0) {
            issuingAuthList = { USDS: this._(USDS) };
            issuingAuth = USDS;
            numberMaxLength = 9;
        }
        else if (code === '3') {
            issuingAuthList = { USCIS: this._(USCIS), DOJINS: this._(DOJINS) };
            issuingAuth = USCIS;
            numberMaxLength = 13;
        }
        else if (code === '4') {
            issuingAuthList = { DOJINS: this._(DOJINS) };
            issuingAuth = DOJINS;
            numberMaxLength = 13;
        }
        else if (code === '5') {
            issuingAuthList = JSON.parse(this._('countries'));
            issuingAuth = null;
            numberMaxLength = 12;
            this.filterCombolist(this._listADoc2, { 1: this._('temporaryI551stamp'), 2: this._('mrivstamp') }, '1', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority2, { USCIS: this._(USCIS), DOJINS: this._(DOJINS) }, USCIS, this, this.processListABC);
            this._listADocNumber2.attr('readOnly', 'true').val(this.na);
        }
        else if (code === '10') {
            issuingAuthList = { DHS: this._(DHS) };
            issuingAuth = DHS;
            numberMaxLength = 11;
            fieldFormat = /^\d+$/;
        }
        else if (code === '12') {
            issuingAuthList = { USCIS: this._(USCIS) };
            issuingAuth = USCIS;
            numberMaxLength = 13;
        }
        else if (code === '6') {
            issuingAuthList = { USCIS: this._(USCIS) };
            issuingAuth = USCIS;
            numberMaxLength = 13;
            this._listADocExpDate.datepicker('option', 'minDate', new Date(Date.now() - 180 * 24 * 3600 * 1000));
        }
        else if (['7', '14'].indexOf(code) >= 0) {
            issuingAuthList = JSON.parse(this._('countries'));
            issuingAuth = null;
            numberMaxLength = 12;
            this.filterCombolist(this._listADoc2, { 3: this._('formI94'), 4: this._('formI94receipt') }, '3', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority2, { USCIS: this._(USCIS), CBP: this._(CBP) }, USCIS, this, this.processListABC);
            this.filterCombolist(this._listADoc3, { 0: this.na, 1: this._('formI20'), 2: this._('formDS2019') }, '0', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority3, { 0: this.na }, '0', this, this.processListABC);
            this._listADocNumber3.attr('readOnly', 'true').val(this.na);
            this._listADocExpDate3.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        }
        else if (code === '8') {
            issuingAuthList = { FSM: this._(FSM) };
            issuingAuth = FSM;
            numberMaxLength = 12;
            this.filterCombolist(this._listADoc2, { 3: this._('formI94'), 4: this._('formI94receipt') }, '3', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority2, { USCIS: this._(USCIS), CBP: this._(CBP) }, USCIS, this, this.processListABC);
        }
        else if (code === '9') {
            issuingAuthList = { RMI: this._(RMI) };
            issuingAuth = RMI;
            numberMaxLength = 12;
            this.filterCombolist(this._listADoc2, { 3: this._('formI94'), 4: this._('formI94receipt') }, '3', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority2, { USCIS: this._(USCIS), CBP: this._(CBP) }, USCIS, this, this.processListABC);
        }
        else if (code === '11') {
            issuingAuthList = { DHS: this._(DHS) };
            issuingAuth = DHS;
            numberMaxLength = 11;
            fieldFormat = /^\d+$/;
        }
        else if (code === '13') {
            issuingAuthList = { USCIS: this._(USCIS) };
            issuingAuth = USCIS;
            numberMaxLength = 13;
        }
        else if (code === '15') {
            issuingAuthList = { 'FSM': this._('FSM') };
            issuingAuth = 'FSM';
            numberMaxLength = 12;
        }
        else if (code === '16') {
            issuingAuthList = { RMI: this._(RMI) };
            issuingAuth = RMI;
            numberMaxLength = 12;
        }
        this._listADocNumber
            .prop('maxLength', numberMaxLength)
            .keypress(function (e) { return fieldFormat.test(String.fromCharCode(e.which)); });
        this.filterCombolist(this._listAIssuingAuthority, issuingAuthList, issuingAuth, this, this.processListABC);
        if (['1', '2', '3', '4', '6', '10', '11', '12'].indexOf(code) >= 0) {
            this.filterCombolist(this._listADoc2, { 0: this.na }, '0', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority2, { 0: this.na }, '0', this, this.processListABC);
            this._listADocNumber2.attr('readOnly', 'true').val(this.na);
            this._listADocExpDate2.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        }
        if (['1', '2', '3', '4', '5', '6', '8', '9', '10', '11', '12', '15', '16'].indexOf(code) >= 0) {
            this.filterCombolist(this._listADoc3, { 0: this.na }, '0', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority3, { 0: this.na }, '0', this, this.processListABC);
            this._listADocNumber3.attr('readOnly', 'true').val(this.na);
            this._listADocExpDate3.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        }
        this.filterCombolist(this._listBDoc, { 0: this.na }, '0', this, null);
        this.filterCombolist(this._listBIssuingAuthority, { 0: this.na }, '0', this, null);
        this._listBDocNumber.attr('readOnly', 'true').val(this.na);
        this._listBDocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        this.filterCombolist(this._listCDoc, { 0: this.na }, '0', this, null);
        this.filterCombolist(this._listCIssuingAuthority, { 0: this.na }, '0', this, null);
        this._listCDocNumber.attr('readOnly', 'true').val(this.na);
        this._listCDocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
    };
    USI9Section2.prototype.listADocTitle2 = function (ddl, code) {
        var USDS = 'USDS';
        var USCIS = 'USCIS';
        var DOJINS = 'DOJINS';
        var numberMaxLength = 11;
        var fieldFormat = /^[a-zA-Z0-9]+$/;
        this._listADocNumber2.prop('required', true);
        this._listADocExpDate2.prop('required', true);
        if (code === '1') {
            this.filterCombolist(this._listAIssuingAuthority2, { USCIS: this._(USCIS), DOJINS: this._(DOJINS) }, USCIS, this, this.processListABC);
        }
        else if (code === '2') {
            this.filterCombolist(this._listAIssuingAuthority2, { USDS: this._(USDS) }, USDS, this, this.processListABC);
        }
        else if (code === '3') {
            fieldFormat = /^\d+$/;
        }
        this._listADocNumber2
            .prop('maxLength', numberMaxLength)
            .keypress(function (e) { return fieldFormat.test(String.fromCharCode(e.which)); });
        this._listADocExpDate2
            .unbind('keypress');
    };
    USI9Section2.prototype.listADocTitle3 = function (ddl, code) {
        var _this = this;
        var ICE = 'ICE';
        var DOJINS = 'DOJINS';
        var USDS = 'USDS';
        this._listADocNumber3.prop('required', true);
        this._listADocExpDate3.prop('required', true);
        if (code === '0') {
            this.filterCombolist(this._listAIssuingAuthority3, { 0: this.na }, '0', this, this.processListABC);
            this._listADocNumber3.attr('readOnly', 'true').val(this.na);
            this._listADocExpDate3.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        }
        else if (code === '1') {
            this.filterCombolist(this._listAIssuingAuthority3, { ICE: this._(ICE), DOJINS: this._(DOJINS) }, ICE, this, this.processListABC);
            this._listADocNumber3.removeAttr('readOnly').val('');
            this._listADocExpDate3.removeAttr('readOnly')
                .unbind('keypress')
                .keypress(function (e) {
                return /[\d/]/g.test(String.fromCharCode(e.which)) ||
                    _this.NAFormat.test(String.fromCharCode(e.which));
            })
                .val('').datepicker('option', 'showOn', 'focus');
        }
        else if (code === '2') {
            this.filterCombolist(this._listAIssuingAuthority3, { USDS: this._(USDS) }, USDS, this, this.processListABC);
            this._listADocNumber3.removeAttr('readOnly').val('');
            this._listADocExpDate3.removeAttr('readOnly')
                .unbind('keypress')
                .keypress(function (e) {
                return /[\d/]/g.test(String.fromCharCode(e.which)) ||
                    _this.NAFormat.test(String.fromCharCode(e.which));
            }).val('').datepicker('option', 'showOn', 'focus');
        }
    };
    USI9Section2.prototype.listBDocTitle = function (ddl, code) {
        var _this = this;
        var USCG = 'USCG';
        var numberMaxLength = 15;
        var fieldFormat = /^[a-zA-Z0-9]+$/;
        var issuingAuthList;
        var issuingAuth;
        this._listBDocNumber
            .prop('maxLength', '100')
            .unbind('keypress');
        this.clearListA();
        this._listBDocNumber.prop('required', true);
        this._listBDocExpDate.prop('required', true);
        if (['19', '20'].indexOf(code) < 0) {
            this._listBDocNumber.removeAttr('readOnly').val('');
            this._listBDocExpDate.removeAttr('readOnly')
                .unbind('keypress')
                .keypress(function (e) {
                return /[\d/]/g.test(String.fromCharCode(e.which)) ||
                    _this.NAFormat.test(String.fromCharCode(e.which));
            })
                .val('').datepicker('option', 'showOn', 'focus');
        }
        if (['1', '2', '21', '22'].indexOf(code) >= 0) {
            issuingAuthList = JSON.parse(this._('usstates'));
            issuingAuth = null;
            numberMaxLength = 14;
            this._listBDocNumber
                .prop('maxLength', numberMaxLength)
                .keypress(function (e) { return fieldFormat.test(String.fromCharCode(e.which)); });
            this._listBIssuingAuthority.attr('readOnly', 'true');
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
            this._listBDocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        }
        this.filterCombolist(this._listBIssuingAuthority, issuingAuthList, issuingAuth, this, this.processListABC);
    };
    USI9Section2.prototype.listCDocTitle = function (ddl, code) {
        var _this = this;
        var SSA = 'SSA';
        var USDHHS = 'USDHHS';
        var SSD = 'SSD';
        var DHEW = 'DHEW';
        var USDS = 'USDS';
        var DOJINS = 'DOJINS';
        var numberMaxLength = 15;
        var fieldFormat = /^[a-zA-Z0-9]+$/;
        var issuingAuthList;
        var issuingAuth;
        this.clearListA();
        this._listCDocNumber.prop('required', true);
        this._listCDocExpDate.prop('required', true);
        this._listCIssuingAuthority.attr('readOnly', 'true');
        this._listCDocExpDate.removeAttr('readOnly')
            .unbind('keypress')
            .keypress(function (e) {
            return /[\d/]/g.test(String.fromCharCode(e.which)) ||
                _this.NAFormat.test(String.fromCharCode(e.which));
        })
            .val('').datepicker('option', 'showOn', 'focus');
        if (code === '1') {
            issuingAuthList = { SSA: this._(SSA), USDHHS: this._(USDHHS), SSD: this._(SSD), DHEW: this._(DHEW) };
            issuingAuth = SSA;
            numberMaxLength = 11;
            fieldFormat = /^[\d-]+$/;
            this._listCDocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
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
        this._listCDocNumber
            .prop('maxLength', numberMaxLength)
            .keypress(function (e) { return fieldFormat.test(String.fromCharCode(e.which)); });
        this.filterCombolist(this._listCIssuingAuthority, issuingAuthList, issuingAuth, this, this.processListABC);
    };
    USI9Section2.prototype.clearListA = function () {
        this.filterCombolist(this._listADoc, this._listBDoc.val() === this.na && this._listCDoc.val() === this.na ?
            this.getListAContent(this._immigrationStatus.val()) : { 0: this.na }, '0', this, this.processListABC);
        this.filterCombolist(this._listAIssuingAuthority, { 0: this.na }, '0', this, this.processListABC);
        this._listADocNumber.attr('readOnly', 'true').val(this.na);
        this._listADocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        this.filterCombolist(this._listADoc2, { 0: this.na }, '0', this, this.processListABC);
        this.filterCombolist(this._listAIssuingAuthority2, { 0: this.na }, '0', this, this.processListABC);
        this._listADocNumber2.attr('readOnly', 'true').val(this.na);
        this._listADocExpDate2.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        this.filterCombolist(this._listADoc3, { 0: this.na }, '0', this, this.processListABC);
        this.filterCombolist(this._listAIssuingAuthority3, { 0: this.na }, '0', this, this.processListABC);
        this._listADocNumber3.attr('readOnly', 'true').val(this.na);
        this._listADocExpDate3.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
    };
    return USI9Section2;
}(USI9Translator));
var USI9Section3 = (function (_super) {
    __extends(USI9Section3, _super);
    function USI9Section3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    USI9Section3.prototype.renderSection3 = function (dialog, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, rehireDate, rehireDateHelp, docTitleSec3, docTitleSec3Help, docNumberSec3, docNumberSec3Help, expDateSec3, expDateSec3Help, sgnEmployerSec3, sgnEmployerSec3Help, employerSignDateSec3, employerSignDateSec3Help, employerNameSec3, employerNameSec3Help) {
        var _this = this;
        this._newlastName = lastName
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('newlastname.tooltip') })
            .keypress(function (e) { return _this.nameFormat.test(String.fromCharCode(e.which)); });
        this._newlastNameHelp = this.renderHelpIcon(lastNameHelp, this._('newlastnamehelp.caption'), dialog, this._('newlastnamehelp.text'));
        this._newfirstName = firstName
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('newfirstname.tooltip') })
            .keypress(function (e) { return _this.nameFormat.test(String.fromCharCode(e.which)); });
        this._newfirstNameHelp = this.renderHelpIcon(firstNameHelp, this._('newfirstnamehelp.caption'), dialog, this._('newfirstnamehelp.text'));
        this._newmiddleInitial = middleInitial
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('newmiddleinitial.tooltip') })
            .keypress(function (e) {
            return _this.nameFormat.test(String.fromCharCode(e.which)) ||
                _this.NAFormat.test(String.fromCharCode(e.which));
        });
        this._newmiddleInitialHelp = this.renderHelpIcon(middleInitialHelp, this._('newmiddleinitialhelp.caption'), dialog, this._('newmiddleinitialhelp.text'));
        this._rehireDate = rehireDate
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('rehiredate.tooltip') })
            .datepicker();
        this._rehireDateHelp = this.renderHelpIcon(rehireDateHelp, this._('rehiredatehelp.caption'), dialog, this._('rehiredatehelp.text'), 500);
        this._docTitleSec3 = docTitleSec3
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('doctitlesec3.tooltip') });
        this._docTitleSec3Help = this.renderHelpIcon(docTitleSec3Help, this._('doctitlesec3help.caption'), dialog, this._('doctitlesec3help.text'), 500);
        this._docNumberSec3 = docNumberSec3
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('docnumbersec3.tooltip') });
        this._docNumberSec3Help = this.renderHelpIcon(docNumberSec3Help, this._('docnumbersec3help.caption'), dialog, this._('docnumbersec3help.text'), 500);
        this._expDateSec3 = expDateSec3
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('expdatesec3.tooltip') })
            .datepicker({ minDate: new Date() });
        this._expDateSec3Help = this.renderHelpIcon(expDateSec3Help, this._('expdatesec3help.caption'), dialog, this._('expdatesec3help.text'), 500);
        this._sgnEmployerSec3 = sgnEmployerSec3
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('sgnemployersec3.tooltip') });
        this._sgnEmployerSec3Help = this.renderHelpIcon(sgnEmployerSec3Help, this._('sgnemployersec3help.caption'), dialog, this._('sgnemployersec3help.text'), 500);
        this._employerSignDateSec3 = employerSignDateSec3
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('employersigndatesec3.tooltip') })
            .datepicker({ minDate: new Date() });
        this._employerSignDateSec3Help = this.renderHelpIcon(employerSignDateSec3Help, this._('employersigndatesec3help.caption'), dialog, this._('employersigndatesec3help.text'), 500);
        this._employerNameSec3 = employerNameSec3
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('employernamesec3.tooltip') })
            .datepicker({ minDate: new Date() });
        this._employerNameSec3Help = this.renderHelpIcon(employerNameSec3Help, this._('employernamesec3help.caption'), dialog, this._('employernamesec3help.text'), 500);
    };
    USI9Section3.prototype.validateFields = function () {
        var errorMessages = _super.prototype.validateFields.call(this);
        return errorMessages;
    };
    return USI9Section3;
}(USI9Section2));
var USI9 = (function (_super) {
    __extends(USI9, _super);
    function USI9() {
        var _this = _super.call(this) || this;
        _this.firstPageRendered = false;
        _this.secondPageRendered = false;
        $('body').append('<div id="dialogPage"></div>');
        var self = _this;
        $('#dialogPage').dialog({
            minHeight: 50,
            minWidth: 50,
            autoOpen: false,
            buttons: [{
                    text: 'OK',
                    click: function () {
                        $(this).dialog("close");
                    }
                }]
        });
        return _this;
    }
    USI9.prototype.prepareData = function () {
        var _this = this;
        PDFViewerApplication.transformationService = 'http://' + window.location.hostname + ':8080/update';
        PDFViewerApplication.fieldsData = {
            'file': PDFViewerApplication.url,
            'operation': 'f',
            'entries': []
        };
        var readOnlyFieldsToFlat = ['LPRUSCISNumberPrefix', 'AlienUSCISNumberPrefix',
            'LastNameSection2', 'FirstNameSection2',
            'MiddleInitialSection2', 'ImmigrationStatus'];
        $('[' + this.annotationName + ']').each(function (index, ctrl) {
            var op = !ctrl.disabled ||
                readOnlyFieldsToFlat.indexOf(ctrl.getAttribute(_this.annotationName)) > -1;
            PDFViewerApplication.fieldsData.entries.push({
                'name': ctrl.getAttribute('annotation-name'),
                'value': op ? (ctrl.type === 'checkbox' ? (ctrl.checked ? 'Yes' : 'No') : ctrl.value) : '',
                'operation': op ? 's' : 'd'
            });
        });
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
        $('#print').click(function () {
            if (_this.validateForm($('#dialogPage'))) {
                _this.prepareData();
                PDFViewerApplication.print();
            }
        });
        $('#download').click(function () {
            if (_this.validateForm($('#dialogPage'))) {
                _this.prepareData();
                PDFViewerApplication.download();
            }
        });
        $(document).on('textlayerrendered', function (e) {
            PDFViewerApplication.eventBus.dispatch('firstpage');
            if (!_this.secondPageRendered) {
                PDFViewerApplication.eventBus.dispatch('nextpage');
            }
        });
        $(document).on('pagerendered', function (e) {
            if (e.detail.pageNumber === 1 && !_this.firstPageRendered) {
                _this.renderSection1($('#dialogPage'), $('[' + _this.annotationName + '=LastName]'), $('[' + _this.annotationName + '=LastNameHelp]'), $('[' + _this.annotationName + '=FirstName]'), $('[' + _this.annotationName + '=FirstNameHelp]'), $('[' + _this.annotationName + '=MiddleInitial]'), $('[' + _this.annotationName + '=MiddleInitialHelp]'), $('[' + _this.annotationName + '=OtherNames]'), $('[' + _this.annotationName + '=OtherNamesHelp]'), $('[' + _this.annotationName + '=Address]'), $('[' + _this.annotationName + '=AddressHelp]'), $('[' + _this.annotationName + '=ApartmentNumber]'), $('[' + _this.annotationName + '=ApartmentNumberHelp]'), $('[' + _this.annotationName + '=City]'), $('[' + _this.annotationName + '=CityHelp]'), $('[' + _this.annotationName + '=State]'), $('[' + _this.annotationName + '=StateHelp]'), $('[' + _this.annotationName + '=Zip]'), $('[' + _this.annotationName + '=ZipHelp]'), $('[' + _this.annotationName + '=DateOfBirth]'), $('[' + _this.annotationName + '=DateOfBirthHelp]'), $('[' + _this.annotationName + '=SSN11]'), $('[' + _this.annotationName + '=SSN12]'), $('[' + _this.annotationName + '=SSN13]'), $('[' + _this.annotationName + '=SSN21]'), $('[' + _this.annotationName + '=SSN22]'), $('[' + _this.annotationName + '=SSN31]'), $('[' + _this.annotationName + '=SSN32]'), $('[' + _this.annotationName + '=SSN33]'), $('[' + _this.annotationName + '=SSN34]'), $('[' + _this.annotationName + '=SSNHelp]'), $('[' + _this.annotationName + '=Email]'), $('[' + _this.annotationName + '=EmailHelp]'), $('[' + _this.annotationName + '=Phone]'), $('[' + _this.annotationName + '=PhoneHelp]'), $('[' + _this.annotationName + '=Citizen]'), $('[' + _this.annotationName + '=CitizenHelp]'), $('[' + _this.annotationName + '=NonCitizenNational]'), $('[' + _this.annotationName + '=NonCitizenNationalHelp]'), $('[' + _this.annotationName + '=LawfulPermanentResident]'), $('[' + _this.annotationName + '=LawfulPermanentResidentHelp]'), $('[' + _this.annotationName + '=AlienAuthorizedToWork]'), $('[' + _this.annotationName + '=AlienAuthorizedToWorkHelp]'), $('[' + _this.annotationName + '=USCISNumberHelp]'), $('[' + _this.annotationName + '=LPRUSCISNumberPrefix]'), $('[' + _this.annotationName + '=LPRUSCISNumber]'), $('[' + _this.annotationName + '=LPRUSCISNumberType]'), $('[' + _this.annotationName + '=AlienWorkAuthorizationDate]'), $('[' + _this.annotationName + '=AlienUSCISNumberPrefix]'), $('[' + _this.annotationName + '=AlienUSCISNumber]'), $('[' + _this.annotationName + '=AlienUSCISNumberType]'), $('[' + _this.annotationName + '=AdmissionNumber]'), $('[' + _this.annotationName + '=AdmissionNumberHelp]'), $('[' + _this.annotationName + '=ForeignPassportNumber]'), $('[' + _this.annotationName + '=ForeignPassportNumberHelp]'), $('[' + _this.annotationName + '=CountryOfIssuance]'), $('[' + _this.annotationName + '=CountryOfIssuanceHelp]'), $('[' + _this.annotationName + '=sgnEmployee]'), $('[' + _this.annotationName + '=sgnEmployeeHelp]'), $('[' + _this.annotationName + '=sgnEmployeeDate]'), $('[' + _this.annotationName + '=sgnEmployeeDateHelp]'));
                _this.renderTranslatorSection($('#dialogPage'), $('[' + _this.annotationName + '=PreparerOrTranslatorNo]'), $('[' + _this.annotationName + '=PreparerOrTranslatorYes]'), $('[' + _this.annotationName + '=PreparerOrTranslatorHelp]'), $('[' + _this.annotationName + '=sgnTranslator]'), $('[' + _this.annotationName + '=sgnTranslatorHelp]'), $('[' + _this.annotationName + '=TranslatorDate]'), $('[' + _this.annotationName + '=TranslatorDateHelp]'), $('[' + _this.annotationName + '=TranslatorLastName]'), $('[' + _this.annotationName + '=TranslatorLastNameHelp]'), $('[' + _this.annotationName + '=TranslatorFirstName]'), $('[' + _this.annotationName + '=TranslatorFirstNameHelp]'), $('[' + _this.annotationName + '=TranslatorAddress]'), $('[' + _this.annotationName + '=TranslatorAddressHelp]'), $('[' + _this.annotationName + '=TranslatorCity]'), $('[' + _this.annotationName + '=TranslatorCityHelp]'), $('[' + _this.annotationName + '=TranslatorState]'), $('[' + _this.annotationName + '=TranslatorStateHelp]'), $('[' + _this.annotationName + '=TranslatorZip]'), $('[' + _this.annotationName + '=TranslatorZipHelp]'));
                _this.firstPageRendered = true;
            }
            if (e.detail.pageNumber === 2 && _this.firstPageRendered && !_this.secondPageRendered) {
                _this.renderSection2($('#dialogPage'), $('[' + _this.annotationName + '=EmployeeInfoSection2Help]'), $('[' + _this.annotationName + '=LastNameSection2]'), $('[' + _this.annotationName + '=LastNameSection2Help]'), $('[' + _this.annotationName + '=FirstNameSection2]'), $('[' + _this.annotationName + '=FirstNameSection2Help]'), $('[' + _this.annotationName + '=MiddleInitialSection2]'), $('[' + _this.annotationName + '=MiddleInitialSection2Help]'), $('[' + _this.annotationName + '=ImmigrationStatus]'), $('[' + _this.annotationName + '=ImmigrationStatusHelp]'), $('[' + _this.annotationName + '=ListADocTitle]'), $('[' + _this.annotationName + '=ListADocTitleHelp]'), $('[' + _this.annotationName + '=ListAIssuingAuthority]'), $('[' + _this.annotationName + '=ListAIssuingAuthorityHelp]'), $('[' + _this.annotationName + '=ListADocNumber]'), $('[' + _this.annotationName + '=ListADocNumberHelp]'), $('[' + _this.annotationName + '=ListAExpDate]'), $('[' + _this.annotationName + '=ListAExpDateHelp]'), $('[' + _this.annotationName + '=ListADocTitle2]'), $('[' + _this.annotationName + '=ListADocTitle2Help]'), $('[' + _this.annotationName + '=ListAIssuingAuthority2]'), $('[' + _this.annotationName + '=ListAIssuingAuthority2Help]'), $('[' + _this.annotationName + '=ListADocNumber2]'), $('[' + _this.annotationName + '=ListADocNumber2Help]'), $('[' + _this.annotationName + '=ListAExpDate2]'), $('[' + _this.annotationName + '=ListAExpDate2Help]'), $('[' + _this.annotationName + '=ListADocTitle3]'), $('[' + _this.annotationName + '=ListADocTitle3Help]'), $('[' + _this.annotationName + '=ListAIssuingAuthority3]'), $('[' + _this.annotationName + '=ListAIssuingAuthority3Help]'), $('[' + _this.annotationName + '=ListADocNumber3]'), $('[' + _this.annotationName + '=ListADocNumber3Help]'), $('[' + _this.annotationName + '=ListAExpDate3]'), $('[' + _this.annotationName + '=ListAExpDate3Help]'), $('[' + _this.annotationName + '=ListBDocTitle]'), $('[' + _this.annotationName + '=ListBDocTitleHelp]'), $('[' + _this.annotationName + '=ListBIssuingAuthority]'), $('[' + _this.annotationName + '=ListBIssuingAuthorityHelp]'), $('[' + _this.annotationName + '=ListBDocNumber]'), $('[' + _this.annotationName + '=ListBDocNumberHelp]'), $('[' + _this.annotationName + '=ListBExpDate]'), $('[' + _this.annotationName + '=ListBExpDateHelp]'), $('[' + _this.annotationName + '=ListCDocTitle]'), $('[' + _this.annotationName + '=ListCDocTitleHelp]'), $('[' + _this.annotationName + '=ListCIssuingAuthority]'), $('[' + _this.annotationName + '=ListCIssuingAuthorityHelp]'), $('[' + _this.annotationName + '=ListCDocNumber]'), $('[' + _this.annotationName + '=ListCDocNumberHelp]'), $('[' + _this.annotationName + '=ListCExpDate]'), $('[' + _this.annotationName + '=ListCExpDateHelp]'), $('[' + _this.annotationName + '=AdditionalInfo]'), $('[' + _this.annotationName + '=AdditionalInfoHelp]'), $('[' + _this.annotationName + '=HireDate]'), $('[' + _this.annotationName + '=HireDateHelp]'), $('[' + _this.annotationName + '=sgnEmployer]'), $('[' + _this.annotationName + '=sgnEmployerHelp]'), $('[' + _this.annotationName + '=EmployerSignDate]'), $('[' + _this.annotationName + '=EmployerSignDateHelp]'), $('[' + _this.annotationName + '=EmployerTitle]'), $('[' + _this.annotationName + '=EmployerTitleHelp]'), $('[' + _this.annotationName + '=EmployerLastName]'), $('[' + _this.annotationName + '=EmployerLastNameHelp]'), $('[' + _this.annotationName + '=EmployerFirstName]'), $('[' + _this.annotationName + '=EmployerFirstNameHelp]'), $('[' + _this.annotationName + '=EmployerName]'), $('[' + _this.annotationName + '=EmployerNameHelp]'), $('[' + _this.annotationName + '=EmployerAddress]'), $('[' + _this.annotationName + '=EmployerAddressHelp]'), $('[' + _this.annotationName + '=EmployerCity]'), $('[' + _this.annotationName + '=EmployerCityHelp]'), $('[' + _this.annotationName + '=EmployerState]'), $('[' + _this.annotationName + '=EmployerStateHelp]'), $('[' + _this.annotationName + '=EmployerZip]'), $('[' + _this.annotationName + '=EmployerZipHelp]'));
                _this.renderSection3($('#dialogPage'), $('[' + _this.annotationName + '=NewLastName]'), $('[' + _this.annotationName + '=NewLastNameHelp]'), $('[' + _this.annotationName + '=NewFirstName]'), $('[' + _this.annotationName + '=NewFirstNameHelp]'), $('[' + _this.annotationName + '=NewMiddleInitial]'), $('[' + _this.annotationName + '=NewMiddleInitialHelp]'), $('[' + _this.annotationName + '=RehireDate]'), $('[' + _this.annotationName + '=RehireDateHelp]'), $('[' + _this.annotationName + '=DocTitleSec3]'), $('[' + _this.annotationName + '=DocTitleSec3Help]'), $('[' + _this.annotationName + '=DocNumberSec3]'), $('[' + _this.annotationName + '=DocNumberSec3Help]'), $('[' + _this.annotationName + '=ExpDateSec3]'), $('[' + _this.annotationName + '=ExpDateSec3Help]'), $('[' + _this.annotationName + '=sgnEmployerSec3]'), $('[' + _this.annotationName + '=sgnEmployerSec3Help]'), $('[' + _this.annotationName + '=EmployerSignDateSec3]'), $('[' + _this.annotationName + '=EmployerSignDateSec3Help]'), $('[' + _this.annotationName + '=EmployerNameSec3]'), $('[' + _this.annotationName + '=EmployerNameSec3Help]'));
                _this.secondPageRendered = true;
            }
        });
    };
    return USI9;
}(USI9Section3));
var form = new USI9();
form.renderSections();
