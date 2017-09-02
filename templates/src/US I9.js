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
        this.NAFormat = /^[NA/]+$/;
        this.zipFormat = /^[\d-]+$/;
        this.zipNumber = /^(\d{5})(-\d{4}){0,1}$/;
        this.dateFormat = /^\d{2}[/]{1}\d{2}[/]{1}\d{4}$/;
        this.numberFormat = /^\d{1}$/;
        this.phoneFormat = /^[\d/NA-]+$/;
        this.phoneNumber = /^[(]{0,1}\d{3}[ )-]{0,1}\d{3}[ -]{0,1}\d{4}$/;
        var self = this;
        $(document).tooltip({
            show: {
                delay: 200
            }
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
            }
        }
    };
    PDFForm.prototype.filterCombolist = function (ctrl, items, defaultValue, fields, callback) {
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
        options.children().click(function (e) {
            callback(e.target.parentNode.parentNode.getElementsByTagName('input')[0].getAttribute('name'), e.target.getAttribute('value'), fields);
        });
        options.children().filter('[value="' + (defaultValue ? defaultValue : '') + '"]').click();
        if (defaultValue === null) {
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
        return ctrl.prop('title', title).attr('icon', 'true').
            val(String.fromCharCode(0xFFFD)).
            toggleClass('noHighlight').parent().click(function () {
            ctrl.blur();
            self.hideTooltip();
            $('.ui-dialog-titlebar-close').attr('title', '');
            dialog.text('').append(decodeURIComponent(text)).
                dialog('option', 'minWidth', minWidth).dialog('open');
        });
    };
    return PDFForm;
}());
var USI9Fields = (function (_super) {
    __extends(USI9Fields, _super);
    function USI9Fields() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    USI9Fields.prototype.validateFields = function () {
        var errorMessage = '';
        if (this._lastName.val() === '') {
            errorMessage += '- ' + this._('lastname.exists') + '\r\n';
        }
        else if (this.nameFormat.test(this._lastName.val())) {
            errorMessage += '- ' + this._('lastname.format') + '\r\n';
        }
        if (this._firstName.val() === '') {
            errorMessage += '- ' + this._('firstname.exists') + '\r\n';
        }
        else if (this.nameFormat.test(this._firstName.val())) {
            errorMessage += '- ' + this._('firstname.format') + '\r\n';
        }
        if (this._dob.val() === '') {
            errorMessage += '- ' + this._('dateofbirth.exists') + '\r\n';
        }
        else if (this._dob.val() === '' || this.dateFormat.test(this._dob.val())) {
            errorMessage += '- ' + this._('dateofbirth.format') + '\r\n';
        }
        if (errorMessage !== '') {
            alert(errorMessage);
            return false;
        }
        else {
            return true;
        }
    };
    USI9Fields.prototype.processListABC = function (ddl, code, fields) {
        switch (ddl) {
            case 'ListADocTitle':
                var na = _super.prototype._.call(this, 'NA');
                var issuingAuthList = { 0: na };
                var issuingAuth;
                if (['1', '2'].indexOf(code) >= 0) {
                    issuingAuthList = { 1: _super.prototype._.call(this, 'USDS') };
                    issuingAuth = '1';
                }
                if (code === '3') {
                    issuingAuthList = { 2: _super.prototype._.call(this, 'USCIS'), 3: _super.prototype._.call(this, 'DOJINS') };
                    issuingAuth = '0';
                }
                if (code === '4') {
                    issuingAuthList = { 3: _super.prototype._.call(this, 'DOJINS') };
                    issuingAuth = '3';
                }
                if (code === '5') {
                    issuingAuthList = JSON.parse(_super.prototype._.call(this, 'countries'));
                    issuingAuth = null;
                    fields.filterCombolist(fields._listADoc2, { 1: _super.prototype._.call(this, 'temporaryI551stamp'), 2: _super.prototype._.call(this, 'mrivstamp') }, '1', fields, fields.processListABC);
                    fields.filterCombolist(fields._listAIssuingAuthority2, { 0: na }, '0', fields, fields.processListABC);
                }
                if (code === '10') {
                    issuingAuthList = { 4: _super.prototype._.call(this, 'DHS') };
                    issuingAuth = '4';
                }
                if (code === '12') {
                    issuingAuthList = { 2: _super.prototype._.call(this, 'USCIS') };
                    issuingAuth = '2';
                }
                if (['1', '2', '3', '4', '10', '12'].indexOf(code) >= 0) {
                    fields.filterCombolist(fields._listADoc2, { 0: na }, '0', fields, fields.processListABC);
                    fields.filterCombolist(fields._listAIssuingAuthority2, { 0: na }, '0', fields, fields.processListABC);
                    fields._listADocNumber2.attr('readOnly', 'true').val(na);
                    fields._listADocExpDate2.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(na);
                }
                if (['1', '2', '3', '4', '5', '10', '12'].indexOf(code) >= 0) {
                    fields.filterCombolist(fields._listADoc3, { 0: na }, '0', fields, fields.processListABC);
                    fields.filterCombolist(fields._listAIssuingAuthority3, { 0: na }, '0', fields, fields.processListABC);
                    fields._listADocNumber3.attr('readOnly', 'true').val(na);
                    fields._listADocExpDate3.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(na);
                }
                fields.filterCombolist(fields._listBDoc, { 0: na }, '0', fields, fields.processListABC);
                fields.filterCombolist(fields._listBIssuingAuthority, { 0: na }, '0', fields, fields.processListABC);
                fields._listBDocNumber.attr('readOnly', 'true').val(na);
                fields._listBDocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(na);
                fields.filterCombolist(fields._listCDoc, { 0: na }, '0', fields, fields.processListABC);
                fields.filterCombolist(fields._listCIssuingAuthority, { 0: na }, '0', fields, fields.processListABC);
                fields._listCDocNumber.attr('readOnly', 'true').val(na);
                fields._listCDocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(na);
                fields.filterCombolist(fields._listAIssuingAuthority, issuingAuthList, issuingAuth, fields, fields.processListABC);
                break;
        }
    };
    USI9Fields.prototype.getListBContent = function (dob) {
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
    USI9Fields.prototype.getListCContent = function (citizenship) {
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
                11: this._('birthCertificate'),
                12: this._('tribalDocumentreceipt')
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
    return USI9Fields;
}(PDFForm));
var USI9Section1 = (function (_super) {
    __extends(USI9Section1, _super);
    function USI9Section1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    USI9Section1.prototype.processLPR = function (flag) {
        var na = flag ? this._('NA') : '';
        this._lpruscisNumPrefix.val('');
        this._lpruscisNum.prop('disabled', true).val(na);
        this._lpruscisNumType.prop('disabled', true);
        this.filterCombolist(this._lpruscisNumType, flag ? { 0: na } : {}, flag ? '0' : null, this, this.processListABC);
    };
    USI9Section1.prototype.processAlien = function (flag) {
        var na = flag ? this._('NA') : '';
        this._alienWorkAuthDate.prop('disabled', true).val(na);
        this._alienuscisNumPrefix.val('');
        this._alienuscisNum.prop('disabled', true).val(na);
        this._alienuscisNumType.prop('disabled', true);
        this._admissionNum.prop('disabled', true).val(na);
        this._passportNum.prop('disabled', true).val(na);
        this._countryOfIssuance.prop('disabled', true);
        this.filterCombolist(this._alienuscisNumType, flag ? { 0: na } : {}, flag ? '0' : null, this, this.processListABC);
        this.filterCombolist(this._countryOfIssuance, flag ? { 0: na } : {}, flag ? '0' : null, this, this.processListABC);
    };
    USI9Section1.prototype.renderNameAndAddress = function (dialog, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, otherNames, otherNamesHelp, address, addressHelp, apptNumber, apptNumberHelp, city, cityHelp, state, stateHelp, zip, zipHelp) {
        var _this = this;
        var self = this;
        this._lastName = lastName
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('lastnamehelp.tooltip') })
            .prop('maxLength', 40)
            .keypress(function (e) { return _this.nameFormat.test(String.fromCharCode(e.which)); })
            .change(function () { return _this._lastNameSection2.val(_this._lastName.val()); });
        this._lastNameHelp = this.renderHelpIcon(lastNameHelp, this._('lastnamehelp.caption'), dialog, this._('lastnamehelp.text'));
        this._firstName = firstName
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('firstnamehelp.tooltip') })
            .prop('maxLength', 25)
            .keypress(function (e) { return _this.nameFormat.test(String.fromCharCode(e.which)); })
            .change(function () { return _this._firstNameSection2.val(_this._firstName.val()); });
        this._firstNameHelp = this.renderHelpIcon(firstNameHelp, this._('firstnamehelp.caption'), dialog, this._('firstnamehelp.text'));
        this._middleInitial = middleInitial
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('middleinitialhelp.tooltip') })
            .prop('maxLength', 3)
            .keypress(function (e) {
            return _this.nameFormat.test(String.fromCharCode(e.which)) ||
                _this.NAFormat.test(String.fromCharCode(e.which));
        })
            .change(function () { return _this._middleInitialSection2.val(_this._middleInitial.val()); });
        this._middleInitialHelp = this.renderHelpIcon(middleInitialHelp, this._('middleinitialhelp.caption'), dialog, this._('middleinitialhelp.text'));
        this._otherNames = otherNames
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('othernameshelp.tooltip') })
            .prop('maxLength', 40)
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
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
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
                .attr('nextElement', (this._ssn[i + 1]).attr('name'))
                .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
                .tooltip({ content: this._('ssnhelp.tooltip') })
                .prop('maxLength', 1)
                .keypress(function (e) {
                if (_this.numberFormat.test(String.fromCharCode(e.which))) {
                    $('[name=' + $(e.target).attr('nextElement') + ']').focus();
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
            .prop('maxLength', 1)
            .keypress(function (e) { return _this.numberFormat.test(String.fromCharCode(e.which)); });
    };
    USI9Section1.prototype.renderPersonalData = function (dialog, dob, dobHelp, ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34, ssnHelp, email, emailHelp, phone, phoneHelp) {
        var _this = this;
        var na = this._('NA');
        this._dob = dob
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('dobhelp.tooltip') })
            .datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1908:' + (new Date()).getFullYear()
        })
            .change(function (e) {
            return _this.filterCombolist(_this._listBDoc, _this.getListBContent(e.target.value), na, _this, _this.processListABC);
        });
        this._dobHelp = this.renderHelpIcon(dobHelp, this._('dobhelp.caption'), dialog, this._('dobhelp.text'));
        this.renderSSNFields([ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34]);
        this._ssnHelp = this.renderHelpIcon(ssnHelp, this._('ssnhelp.caption'), dialog, this._('ssnhelp.text'), 400);
        this._email = email
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('emailhelp.tooltip') })
            .prop('maxLength', 60);
        this._emailHelp = this.renderHelpIcon(emailHelp, this._('emailhelp.caption'), dialog, this._('emailhelp.text'));
        this._phone = phone
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('phonehelp.tooltip') })
            .prop('maxLength', 13)
            .keypress(function (e) { return _this.phoneFormat.test(String.fromCharCode(e.which)); });
        this._phoneHelp = this.renderHelpIcon(phoneHelp, this._('phonehelp.caption'), dialog, this._('phonehelp.text'));
    };
    USI9Section1.prototype.renderCitizenship = function (dialog, citizen, citizenHelp, national, nationalHelp, lpr, lprHelp, alien, alienHelp, uscisNumberHelp, lpruscisNumPrefix, lpruscisNum, lpruscisNumType, alienWorkAuthDate, alienuscisNumPrefix, alienuscisNum, alienuscisNumType, admissionNum, admissionNumHelp, passportNum, passportNumHelp, countryOfIssuance, countryOfIssuanceHelp, sgnEmployee, sgnEmployeeHelp, sgnEmployeeDate, sgnEmployeeDateHelp) {
        var _this = this;
        var citizenships = [citizen, national, lpr, alien];
        var na = this._('NA');
        this._citizen = citizen
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('citizenhelp.tooltip') })
            .click(function () {
            _this.selectCheckmark(_this._citizen, citizenships);
            _this.processLPR(_this._citizen.prop('checked'));
            _this.processAlien(_this._citizen.prop('checked'));
            _this.filterCombolist(_this._listCDoc, _this.getListCContent(_this._immigrationStatus.val(_this._citizen.prop('checked') ? 1 : 0).val()), na, _this, _this.processListABC);
            _this.filterCombolist(_this._listADoc, { 0: na }, null, _this, _this.processListABC);
            if (_this._citizen.prop('checked')) {
                _this.filterCombolist(_this._listADoc, { 0: na, 1: _this._('uspassport'), 2: _this._('uspassportcard') }, na, _this, _this.processListABC);
            }
        });
        this._citizenHelp = this.renderHelpIcon(citizenHelp, this._('citizenhelp.caption'), dialog, this._('citizenhelp.text'));
        this._national = national
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('nationalhelp.tooltip') })
            .click(function () {
            _this.selectCheckmark(_this._national, citizenships);
            _this.processLPR(_this._national.prop('checked'));
            _this.processAlien(_this._national.prop('checked'));
            _this.filterCombolist(_this._listCDoc, _this.getListCContent(_this._immigrationStatus.val(_this._national.prop('checked') ? 2 : 0).val()), na, _this, _this.processListABC);
            _this.filterCombolist(_this._listADoc, { 0: na }, null, _this, _this.processListABC);
            if (_this._national.prop('checked')) {
                _this.filterCombolist(_this._listADoc, { 0: na, 1: _this._('uspassport'), 2: _this._('uspassportcard') }, na, _this, _this.processListABC);
            }
        });
        this._nationalHelp = this.renderHelpIcon(nationalHelp, this._('nationalhelp.caption'), dialog, this._('nationalhelp.text'));
        this._lpr = lpr
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('lprhelp.tooltip') })
            .click(function () {
            _this.selectCheckmark(_this._lpr, citizenships);
            _this.processAlien(_this._lpr.prop('checked'));
            _this._lpruscisNum.val('');
            _this.filterCombolist(_this._lpruscisNumType, {}, null, _this, _this.processListABC);
            if (_this._lpr.prop('checked')) {
                _this._lpruscisNum.prop('disabled', false);
                _this._lpruscisNumType.prop('disabled', false);
                _this.filterCombolist(_this._lpruscisNumType, { 'A': _this._('aliennumber'), 'U': _this._('uscisnumber') }, null, _this, _this.processListABC);
            }
            _this.filterCombolist(_this._listCDoc, _this.getListCContent(_this._immigrationStatus.val(_this._lpr.prop('checked') ? 3 : 0).val()), na, _this, _this.processListABC);
            _this.filterCombolist(_this._listADoc, {}, null, _this, _this.processListABC);
            if (_this._lpr.prop('checked')) {
                _this.filterCombolist(_this._listADoc, {
                    0: na,
                    3: _this._('permanentresidentcard'),
                    4: _this._('alienresidentcard'),
                    5: _this._('foreignpassport'),
                    10: _this._('I551I94receipt'),
                    12: _this._('I551receipt')
                }, na, _this, _this.processListABC);
            }
        });
        this._lprHelp = this.renderHelpIcon(lprHelp, this._('lprhelp.caption'), dialog, this._('lprhelp.text'));
        this._alien = alien
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('alienhelp.tooltip') })
            .click(function () {
            _this.selectCheckmark(_this._alien, citizenships);
            _this.processLPR(_this._alien.prop('checked'));
            _this._alienWorkAuthDate.val('');
            _this._alienuscisNum.val('');
            _this.filterCombolist(_this._alienuscisNumType, {}, null, _this, _this.processListABC);
            _this._admissionNum.val('');
            _this._passportNum.val('');
            _this.filterCombolist(_this._countryOfIssuance, {}, null, _this, _this.processListABC);
            if (_this._alien.prop('checked')) {
                _this._alienWorkAuthDate.prop('disabled', false);
                _this._alienuscisNum.prop('disabled', false);
                _this._alienuscisNumType.prop('disabled', false);
                _this.filterCombolist(_this._alienuscisNumType, { 'A': _this._('aliennumber'), 'U': _this._('uscisnumber') }, null, _this, _this.processListABC);
                _this._admissionNum.prop('disabled', false);
                _this._passportNum.prop('disabled', false);
                _this._countryOfIssuance.prop('disabled', false);
                _this.filterCombolist(_this._countryOfIssuance, JSON.parse(_this._('countries')), null, _this, _this.processListABC);
            }
            _this.filterCombolist(_this._listCDoc, _this.getListCContent(_this._immigrationStatus.val(_this._alien.prop('checked') ? 4 : 0).val()), na, _this, _this.processListABC);
            _this.filterCombolist(_this._listADoc, {}, null, _this, _this.processListABC);
            if (_this._alien.prop('checked')) {
                _this.filterCombolist(_this._listADoc, {
                    0: na,
                    6: _this._('eadI766'),
                    5: _this._('foreignpassport'),
                    7: _this._('foreinpassportnonimmigrant'),
                    8: _this._('FSMpassport'),
                    9: _this._('RMIpassport'),
                    11: _this._('I94refugeestampreceipt'),
                    13: _this._('I766receipt'),
                    14: _this._('foreinpassportnonimmigrantreceipt'),
                    15: _this._('FSMpassportreceipt'),
                    16: _this._('RMIpassportreceipt')
                }, na, _this, _this.processListABC);
            }
        });
        this._alienHelp = this.renderHelpIcon(alienHelp, this._('alienhelp.caption'), dialog, this._('alienhelp.text'), 500);
        this._uscisNumberHelp = this.renderHelpIcon(uscisNumberHelp, this._('uscisnumberhelp.caption'), dialog, this._('uscisnumberhelp.text'));
        this._lpruscisNumPrefix = lpruscisNumPrefix;
        this._lpruscisNum = lpruscisNum
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('uscisnumber.tooltip') })
            .prop('maxLength', 9)
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
            .datepicker()
            .unbind('keypress')
            .keypress(function (e) {
            return /[\d/]/g.test(String.fromCharCode(e.which)) ||
                _this.NAFormat.test(String.fromCharCode(e.which));
        });
        this._alienuscisNumPrefix = alienuscisNumPrefix;
        this._alienuscisNum = alienuscisNum
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('uscisnumber.tooltip') })
            .prop('maxLength', 9)
            .keypress(function (e) {
            return _this.numberFormat.test(String.fromCharCode(e.which));
        })
            .change(function () {
            if (_this._alienuscisNum.val() !== '') {
                if (_this._alienuscisNumType.val() === '') {
                    _this.filterCombolist(_this._alienuscisNumType, { 'A': _this._('aliennumber'), 'U': _this._('uscisnumber') }, null, _this, _this.processListABC);
                }
                _this._admissionNum.val(na);
                _this._passportNum.val(na);
                _this.filterCombolist(_this._countryOfIssuance, { 0: na }, na, _this, _this.processListABC);
            }
            else {
                _this.filterCombolist(_this._alienuscisNumType, {}, null, _this, _this.processListABC);
                _this._admissionNum.val('');
                _this._passportNum.val('');
                _this.filterCombolist(_this._countryOfIssuance, {}, null, _this, _this.processListABC);
            }
        });
        this._alienuscisNumType = alienuscisNumType
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('uscisnumbertype.tooltip') });
        this.assignCombolistEventHandler(this._alienuscisNumType, function (e) {
            return _this._alienuscisNumPrefix.val(e.target.getAttribute('value') === 'A' ? 'A' : '');
        });
        this._admissionNum = admissionNum
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('admissionnumber.tooltip') })
            .prop('maxLength', 11)
            .keypress(function (e) {
            return _this.numberFormat.test(String.fromCharCode(e.which));
        })
            .change(function () {
            if (_this._admissionNum.val() !== '') {
                _this._alienuscisNum.val(na);
                _this.filterCombolist(_this._alienuscisNumType, { 0: na }, na, _this, _this.processListABC);
                _this._passportNum.val(na);
                _this.filterCombolist(_this._countryOfIssuance, { 0: na }, na, _this, _this.processListABC);
            }
            else {
                _this._alienuscisNum.val('');
                _this.filterCombolist(_this._alienuscisNumType, {}, null, _this, _this.processListABC);
                _this._passportNum.val('');
                _this.filterCombolist(_this._countryOfIssuance, {}, null, _this, _this.processListABC);
            }
        });
        this._admissionNumHelp = this.renderHelpIcon(admissionNumHelp, this._('admissionnumberhelp.caption'), dialog, this._('admissionnumberhelp.text'));
        this._passportNum = passportNum
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('passportnumber.tooltip') })
            .prop('maxLength', 12)
            .change(function () {
            if (_this._passportNum.val() !== '') {
                _this._alienuscisNum.val(na);
                _this.filterCombolist(_this._alienuscisNumType, { 0: na }, na, _this, _this.processListABC);
                _this._admissionNum.val(na);
                if (_this._countryOfIssuance.val() === '') {
                    _this.filterCombolist(_this._countryOfIssuance, JSON.parse(_this._('countries')), null, _this, _this.processListABC);
                }
            }
            else {
                _this._alienuscisNum.val('');
                _this.filterCombolist(_this._alienuscisNumType, {}, null, _this, _this.processListABC);
                _this._admissionNum.val('');
            }
        });
        this._passportNumHelp = this.renderHelpIcon(passportNumHelp, this._('passportnumberhelp.caption'), dialog, this._('passportnumberhelp.text'));
        this._countryOfIssuance = countryOfIssuance
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('coi.tooltip') });
        this._countryOfIssuanceHelp = this.renderHelpIcon(countryOfIssuanceHelp, this._('coihelp.caption'), dialog, this._('coihelp.text'));
        this._sgnEmployee = sgnEmployee
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('employee.tooltip') });
        this._sgnEmployeeHelp = this.renderHelpIcon(sgnEmployeeHelp, this._('employeehelp.caption'), dialog, this._('employeehelp.text'), 700);
        this._sgnEmployeeDate = sgnEmployeeDate
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('employeedate.tooltip') })
            .datepicker();
        this._sgnEmployeeDateHelp = this.renderHelpIcon(sgnEmployeeDateHelp, this._('employeedatehelp.caption'), dialog, this._('employeedatehelp.text'));
    };
    USI9Section1.prototype.renderSection1 = function (dialog, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, otherNames, otherNamesHelp, address, addressHelp, apptNumber, apptNumberHelp, city, cityHelp, state, stateHelp, zip, zipHelp, dob, dobHelp, ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34, ssnHelp, email, emailHelp, phone, phoneHelp, citizen, citizenHelp, national, nationalHelp, lpr, lprHelp, alien, alienHelp, uscisNumberHelp, lpruscisNumPrefix, lpruscisNum, lpruscisNumType, alienWorkAuthDate, alienuscisNumPrefix, alienuscisNum, alienuscisNumType, admissionNum, admissionNumHelp, passportNum, passportNumHelp, countryOfIssuance, countryOfIssuanceHelp, sgnEmployee, sgnEmployeeHelp, sgnEmployeeDate, sgnEmployeeDateHelp) {
        $('a').prop('target', '_blank');
        this.renderNameAndAddress(dialog, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, otherNames, otherNamesHelp, address, addressHelp, apptNumber, apptNumberHelp, city, cityHelp, state, stateHelp, zip, zipHelp);
        this.renderPersonalData(dialog, dob, dobHelp, ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34, ssnHelp, email, emailHelp, phone, phoneHelp);
        this.renderCitizenship(dialog, citizen, citizenHelp, national, nationalHelp, lpr, lprHelp, alien, alienHelp, uscisNumberHelp, lpruscisNumPrefix, lpruscisNum, lpruscisNumType, alienWorkAuthDate, alienuscisNumPrefix, alienuscisNum, alienuscisNumType, admissionNum, admissionNumHelp, passportNum, passportNumHelp, countryOfIssuance, countryOfIssuanceHelp, sgnEmployee, sgnEmployeeHelp, sgnEmployeeDate, sgnEmployeeDateHelp);
        this.processLPR(false);
        this.processAlien(false);
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
        this._translatorDate = translatorDate.datepicker()
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('translatordate.tooltip') });
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
    return USI9Translator;
}(USI9Section1));
var USI9Section2 = (function (_super) {
    __extends(USI9Section2, _super);
    function USI9Section2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    USI9Section2.prototype.renderSection2 = function (dialog, employeeInfoHelp, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, immigrationStatus, immigrationStatusHelp, listADoc, listADocHelp, listAIssuingAuthority, listAIssuingAuthorityHelp, listADocNumber, listADocNumberHelp, listADocExpDate, listADocExpDateHelp, listADoc2, listADoc2Help, listAIssuingAuthority2, listAIssuingAuthority2Help, listADocNumber2, listADocNumber2Help, listADocExpDate2, listADocExpDate2Help, listADoc3, listADoc3Help, listAIssuingAuthority3, listAIssuingAuthority3Help, listADocNumber3, listADocNumber3Help, listADocExpDate3, listADocExpDate3Help, listBDoc, listBDocHelp, listBIssuingAuthority, listBIssuingAuthorityHelp, listBDocNumber, listBDocNumberHelp, listBDocExpDate, listBDocExpDateHelp, listCDoc, listCDocHelp, listCIssuingAuthority, listCIssuingAuthorityHelp, listCDocNumber, listCDocNumberHelp, listCDocExpDate, listCDocExpDateHelp, additionalInfo, additionalInfoHelp) {
        var _this = this;
        this._employeeInfoHelp = this.renderHelpIcon(employeeInfoHelp, this._('employeeinfosection2help.caption'), dialog, this._('employeeinfosection2help.text'));
        this._lastNameSection2 = lastName;
        this._lastNameSection2Help = this.renderHelpIcon(lastNameHelp, this._('lastnamesection2help.caption'), dialog, this._('lastnamesection2help.text'));
        this._firstNameSection2 = firstName;
        this._firstNameSection2Help = this.renderHelpIcon(firstNameHelp, this._('firstnamesection2help.caption'), dialog, this._('firstnamesection2help.text'));
        this._middleInitialSection2 = middleInitial;
        this._middleInitialSection2Help = this.renderHelpIcon(middleInitialHelp, this._('middleinitialsection2help.caption'), dialog, this._('middleinitialsection2help.text'));
        this._immigrationStatus = immigrationStatus;
        this._immigrationStatusHelp = this.renderHelpIcon(immigrationStatusHelp, this._('immigrationstatushelp.caption'), dialog, this._('immigrationstatushelp.text'));
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
            .datepicker();
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
            .datepicker();
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
            .datepicker();
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
            .datepicker();
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
            .datepicker();
        this._listCDocExpDateHelp = this.renderHelpIcon(listCDocExpDateHelp, this._('listcexpdatehelp.caption'), dialog, this._('listcexpdatehelp.text'), 500);
        this._additionalInfo = additionalInfo
            .focus(function (e) { return _this.hideTooltip(); }).prop('title', '')
            .tooltip({ content: this._('additionalinfo.tooltip') });
        this._additionalInfoHelp = this.renderHelpIcon(additionalInfoHelp, this._('additionalinfohelp.caption'), dialog, this._('additionalinfohelp.text'), 500);
    };
    return USI9Section2;
}(USI9Translator));
var USI9Section3 = (function (_super) {
    __extends(USI9Section3, _super);
    function USI9Section3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return USI9Section3;
}(USI9Section2));
var USI9 = (function (_super) {
    __extends(USI9, _super);
    function USI9() {
        var _this = _super.call(this) || this;
        $('body').append('<div id="dialogPage"></div>');
        var self = _this;
        $('#dialogPage').dialog({
            title: self._('help'),
            minHeight: 50,
            minWidth: 50,
            autoOpen: false
        });
        return _this;
    }
    USI9.prototype.renderSections = function () {
        var _this = this;
        document.addEventListener('pagerendered', function (e) {
            if (e.detail.pageNumber === 1) {
                _this.renderSection1($('#dialogPage'), $('[name=LastName]'), $('[name=LastNameHelp]'), $('[name=FirstName]'), $('[name=FirstNameHelp]'), $('[name=MiddleInitial]'), $('[name=MiddleInitialHelp]'), $('[name=OtherNames]'), $('[name=OtherNamesHelp]'), $('[name=Address]'), $('[name=AddressHelp]'), $('[name=ApartmentNumber]'), $('[name=ApartmentNumberHelp]'), $('[name=City]'), $('[name=CityHelp]'), $('[name=State]'), $('[name=StateHelp]'), $('[name=Zip]'), $('[name=ZipHelp]'), $('[name=DateOfBirth]'), $('[name=DateOfBirthHelp]'), $('[name=SSN11]'), $('[name=SSN12]'), $('[name=SSN13]'), $('[name=SSN21]'), $('[name=SSN22]'), $('[name=SSN31]'), $('[name=SSN32]'), $('[name=SSN33]'), $('[name=SSN34]'), $('[name=SSNHelp]'), $('[name=Email]'), $('[name=EmailHelp]'), $('[name=Phone]'), $('[name=PhoneHelp]'), $('[name=Citizen]'), $('[name=CitizenHelp]'), $('[name=NonCitizenNational]'), $('[name=NonCitizenNationalHelp]'), $('[name=LawfulPermanentResident]'), $('[name=LawfulPermanentResidentHelp]'), $('[name=AlienAuthorizedToWork]'), $('[name=AlienAuthorizedToWorkHelp]'), $('[name=USCISNumberHelp]'), $('[name=LPRUSCISNumberPrefix]'), $('[name=LPRUSCISNumber]'), $('[name=LPRUSCISNumberType]'), $('[name=AlienWorkAuthorizationDate]'), $('[name=AlienUSCISNumberPrefix]'), $('[name=AlienUSCISNumber]'), $('[name=AlienUSCISNumberType]'), $('[name=AdmissionNumber]'), $('[name=AdmissionNumberHelp]'), $('[name=ForeignPassportNumber]'), $('[name=ForeignPassportNumberHelp]'), $('[name=CountryOfIssuance]'), $('[name=CountryOfIssuanceHelp]'), $('[name=sgnEmployee]'), $('[name=sgnEmployeeHelp]'), $('[name=sgnEmployeeDate]'), $('[name=sgnEmployeeDateHelp]'));
                _this.renderTranslatorSection($('#dialogPage'), $('[name=PreparerOrTranslatorNo]'), $('[name=PreparerOrTranslatorYes]'), $('[name=PreparerOrTranslatorHelp]'), $('[name=sgnTranslator]'), $('[name=sgnTranslatorHelp]'), $('[name=TranslatorDate]'), $('[name=TranslatorDateHelp]'), $('[name=TranslatorLastName]'), $('[name=TranslatorLastNameHelp]'), $('[name=TranslatorFirstName]'), $('[name=TranslatorFirstNameHelp]'), $('[name=TranslatorAddress]'), $('[name=TranslatorAddressHelp]'), $('[name=TranslatorCity]'), $('[name=TranslatorCityHelp]'), $('[name=TranslatorState]'), $('[name=TranslatorStateHelp]'), $('[name=TranslatorZip]'), $('[name=TranslatorZipHelp]'));
            }
            if (e.detail.pageNumber === 2) {
                _this.renderSection2($('#dialogPage'), $('[name=EmployeeInfoSection2Help]'), $('[name=LastNameSection2]'), $('[name=LastNameSection2Help]'), $('[name=FirstNameSection2]'), $('[name=FirstNameSection2Help]'), $('[name=MiddleInitialSection2]'), $('[name=MiddleInitialSection2Help]'), $('[name=ImmigrationStatus]'), $('[name=ImmigrationStatusHelp]'), $('[name=ListADocTitle]'), $('[name=ListADocTitleHelp]'), $('[name=ListAIssuingAuthority]'), $('[name=ListAIssuingAuthorityHelp]'), $('[name=ListADocNumber]'), $('[name=ListADocNumberHelp]'), $('[name=ListAExpDate]'), $('[name=ListAExpDateHelp]'), $('[name=ListADocTitle2]'), $('[name=ListADocTitle2Help]'), $('[name=ListAIssuingAuthority2]'), $('[name=ListAIssuingAuthority2Help]'), $('[name=ListADocNumber2]'), $('[name=ListADocNumber2Help]'), $('[name=ListAExpDate2]'), $('[name=ListAExpDate2Help]'), $('[name=ListADocTitle3]'), $('[name=ListADocTitle3Help]'), $('[name=ListAIssuingAuthority3]'), $('[name=ListAIssuingAuthority3Help]'), $('[name=ListADocNumber3]'), $('[name=ListADocNumber3Help]'), $('[name=ListAExpDate3]'), $('[name=ListAExpDate3Help]'), $('[name=ListBDocTitle]'), $('[name=ListBDocTitleHelp]'), $('[name=ListBIssuingAuthority]'), $('[name=ListBIssuingAuthorityHelp]'), $('[name=ListBDocNumber]'), $('[name=ListBDocNumberHelp]'), $('[name=ListBExpDate]'), $('[name=ListBExpDateHelp]'), $('[name=ListCDocTitle]'), $('[name=ListCDocTitleHelp]'), $('[name=ListCIssuingAuthority]'), $('[name=ListCIssuingAuthorityHelp]'), $('[name=ListCDocNumber]'), $('[name=ListCDocNumberHelp]'), $('[name=ListCExpDate]'), $('[name=ListCExpDateHelp]'), $('[name=AdditionalInfo]'), $('[name=AdditionalInfoHelp]'));
            }
        });
    };
    return USI9;
}(USI9Section3));
var form = new USI9();
form.renderSections();
