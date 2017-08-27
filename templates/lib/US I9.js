var $ = require(['jQueryUI', 'jQuery']);

class USI9 {
    get _() {
        return document.webL10n.get;
    }

    constructor() {
        this.nameFormat = /^[A-Za-z ']+$/;
        this.NAFormat = /^[NA/]+$/;
        this.zipFormat = /^[\d-]+$/;
        this.zipNumber = /^(\d{5})(-\d{4}){0,1}$/;
        this.dateFormat = /^\d{2}[/]{1}\d{2}[/]{1}\d{4}$/;
        this.numberFormat = /^\d{1}$/;
        this.phoneFormat = /^[\d/NA-]+$/;
        this.phoneNumber = /^[(]{0,1}\d{3}[ )-]{0,1}\d{3}[ -]{0,1}\d{4}$/;
    }

    renderSection1(dialog, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, otherNames, otherNamesHelp, address, addressHelp, apptNumber, apptNumberHelp, city, cityHelp, state, stateHelp, zip, zipHelp, dob, dobHelp, ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34, ssnHelp, email, emailHelp, phone, phoneHelp, citizen, citizenHelp, national, nationalHelp, lpr, lprHelp, alien, alienHelp, uscisNumberHelp, lpruscisNumPrefix, lpruscisNum, lpruscisNumType, alienWorkAuthDate, alienuscisNumPrefix, alienuscisNum, alienuscisNumType, admissionNum, admissionNumHelp, passportNum, passportNumHelp, countryOfIssuance, countryOfIssuanceHelp, sgnEmployee, sgnEmployeeHelp, sgnEmployeeDate, sgnEmployeeDateHelp) {

        dialog.dialog({
            title: this._('help'),
            minHeight: 50,
            minWidth: 50,
            autoOpen: false
        });

        $('a').prop('target', '_blank');

        // E-Verify requirements
        this._lastName = lastName.prop('title', this._('lastnamehelp.tooltip')).prop('maxLength', 40).keypress(e => this.nameFormat.test(String.fromCharCode(e.which))).blur(() => this._lastNameSection2.val(this._lastName.val()));

        this._lastNameHelp = this.renderHelpIcon(lastNameHelp, this._('lastnamehelp.caption'), dialog, this._('lastnamehelp.text'));

        // E-Verify requirements
        this._firstName = firstName.prop('title', this._('firstnamehelp.tooltip')).prop('maxLength', 25).keypress(e => this.nameFormat.test(String.fromCharCode(e.which))).blur(() => this._firstNameSection2.val(this._firstName.val()));

        this._firstNameHelp = this.renderHelpIcon(firstNameHelp, this._('firstnamehelp.caption'), dialog, this._('firstnamehelp.text'));

        // E-Verify requirements + N/A option
        this._middleInitial = middleInitial.prop('title', this._('middleinitialhelp.tooltip')).prop('maxLength', 3).keypress(e => this.nameFormat.test(String.fromCharCode(e.which)) || this.NAFormat.test(String.fromCharCode(e.which))).blur(() => this._middleInitialSection2.val(this._middleInitial.val()));

        this._middleInitialHelp = this.renderHelpIcon(middleInitialHelp, this._('middleinitialhelp.caption'), dialog, this._('middleinitialhelp.text'));

        // E-Verify requirements
        this._otherNames = otherNames.prop('title', this._('othernameshelp.tooltip')).prop('maxLength', 40).keypress(e => this.nameFormat.test(String.fromCharCode(e.which)) || this.NAFormat.test(String.fromCharCode(e.which)));

        this._otherNamesHelp = this.renderHelpIcon(otherNamesHelp, this._('othernameshelp.caption'), dialog, this._('othernameshelp.text'));

        this._address = address.prop('title', this._('addresshelp.tooltip'));

        this._addressHelp = this.renderHelpIcon(addressHelp, this._('addresshelp.caption'), dialog, this._('addresshelp.text'));

        this._apptNumber = apptNumber.prop('title', this._('apartmentnumberhelp.tooltip'));

        this._apptNumberHelp = this.renderHelpIcon(apptNumberHelp, this._('apartmentnumberhelp.caption'), dialog, this._('apartmentnumberhelp.text'));

        this._city = city.prop('title', this._('cityhelp.caption'));

        this._cityHelp = this.renderHelpIcon(cityHelp, this._('cityhelp.caption'), dialog, this._('cityhelp.text'));

        this._state = state.prop('title', this._('statehelp.tooltip'));

        this._stateHelp = this.renderHelpIcon(stateHelp, this._('statehelp.caption'), dialog, this._('statehelp.text'));

        this._zip = zip.prop('title', this._('ziphelp.tooltip')).keypress(e => this.zipFormat.test(String.fromCharCode(e.which)));

        this._zipHelp = this.renderHelpIcon(zipHelp, this._('ziphelp.caption'), dialog, this._('ziphelp.text'));

        // E-Verify requirements
        this._dob = dob.prop('title', this._('dobhelp.tooltip')).datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1908:' + new Date().getFullYear() }).change(e => this.filterCombolist(this._listBDoc, this.getListBContent(e.target.value), na));

        this._dobHelp = this.renderHelpIcon(dobHelp, this._('dobhelp.caption'), dialog, this._('dobhelp.text'));

        this._ssn11 = ssn11.prop('title', this._('ssnhelp.tooltip')).prop('maxLength', 1).keypress(e => this.autoFocus(e, this.numberFormat, 1, this._ssn12));

        this._ssn12 = ssn12.prop('title', this._('ssnhelp.tooltip')).prop('maxLength', 1).keypress(e => this.autoFocus(e, this.numberFormat, 1, this._ssn13));

        this._ssn13 = ssn13.prop('title', this._('ssnhelp.tooltip')).prop('maxLength', 1).keypress(e => this.autoFocus(e, this.numberFormat, 1, this._ssn21));

        this._ssn21 = ssn21.prop('title', this._('ssnhelp.tooltip')).prop('maxLength', 1).keypress(e => this.autoFocus(e, this.numberFormat, 1, this._ssn22));

        this._ssn22 = ssn22.prop('title', this._('ssnhelp.tooltip')).prop('maxLength', 1).keypress(e => this.autoFocus(e, this.numberFormat, 1, this._ssn31));

        this._ssn31 = ssn31.prop('title', this._('ssnhelp.tooltip')).prop('maxLength', 1).keypress(e => this.autoFocus(e, this.numberFormat, 1, this._ssn32));

        this._ssn32 = ssn32.prop('title', this._('ssnhelp.tooltip')).prop('maxLength', 1).keypress(e => this.autoFocus(e, this.numberFormat, 1, this._ssn33));

        this._ssn33 = ssn33.prop('title', this._('ssnhelp.tooltip')).prop('maxLength', 1).keypress(e => this.autoFocus(e, this.numberFormat, 1, this._ssn34));

        this._ssn34 = ssn34.prop('title', this._('ssnhelp.tooltip')).prop('maxLength', 1).keypress(e => this.numberFormat.test(String.fromCharCode(e.which)));

        this._ssnHelp = this.renderHelpIcon(ssnHelp, this._('ssnhelp.caption'), dialog, this._('ssnhelp.text'), 400);

        this._email = email.prop('title', this._('emailhelp.tooltip')).prop('maxLength', 60);

        this._emailHelp = this.renderHelpIcon(emailHelp, this._('emailhelp.caption'), dialog, this._('emailhelp.text'));

        this._phone = phone.prop('title', this._('phonehelp.tooltip')).prop('maxLength', 13).keypress(e => this.phoneFormat.test(String.fromCharCode(e.which)));

        this._phoneHelp = this.renderHelpIcon(phoneHelp, this._('phonehelp.caption'), dialog, this._('phonehelp.text'));

        var citizenships = [citizen, national, lpr, alien];
        var na = this._('NA');

        this._citizen = citizen.prop('title', this._('citizenhelp.tooltip')).click(() => {
            this.selectCheckmark(this._citizen, citizenships);
            this.processLPR(this._citizen.prop('checked'));
            this.processAlien(this._citizen.prop('checked'));

            this.filterCombolist(this._listCDoc, this.getListCContent(this._immigrationStatus.val(this._citizen.prop('checked') ? 1 : 0).val()), na);

            this.filterCombolist(this._listADoc, { 0: na });
            if (this._citizen.prop('checked')) {
                this.filterCombolist(this._listADoc, { 0: na, 1: this._('uspassport'), 2: this._('uspassportcard') }, na);
            }
        });

        this._citizenHelp = this.renderHelpIcon(citizenHelp, this._('citizenhelp.caption'), dialog, this._('citizenhelp.text'));

        this._national = national.prop('title', this._('nationalhelp.tooltip')).click(() => {
            this.selectCheckmark(this._national, citizenships);
            this.processLPR(this._national.prop('checked'));
            this.processAlien(this._national.prop('checked'));

            this.filterCombolist(this._listCDoc, this.getListCContent(this._immigrationStatus.val(this._national.prop('checked') ? 2 : 0).val()), na);

            this.filterCombolist(this._listADoc, { 0: na });
            if (this._national.prop('checked')) {
                this.filterCombolist(this._listADoc, { 0: na, 1: this._('uspassport'), 2: this._('uspassportcard') }, na);
            }
        });

        this._nationalHelp = this.renderHelpIcon(nationalHelp, this._('nationalhelp.caption'), dialog, this._('nationalhelp.text'));

        this._lpr = lpr.prop('title', this._('lprhelp.tooltip')).click(() => {
            this.selectCheckmark(this._lpr, citizenships);
            this.processAlien(this._lpr.prop('checked'));
            this._lpruscisNum.val('');
            this.filterCombolist(this._lpruscisNumType, {});

            if (this._lpr.prop('checked')) {
                this._lpruscisNum.prop('disabled', false);
                this._lpruscisNumType.prop('disabled', false);
                this.filterCombolist(this._lpruscisNumType, { 'A': this._('aliennumber'), 'U': this._('uscisnumber') });
            }

            this.filterCombolist(this._listCDoc, this.getListCContent(this._immigrationStatus.val(this._lpr.prop('checked') ? 3 : 0).val()), na);

            this.filterCombolist(this._listADoc, {});
            if (this._lpr.prop('checked')) {
                this.filterCombolist(this._listADoc, {
                    0: na,
                    3: this._('permanentresidentcard'),
                    4: this._('alienresidentcard'),
                    5: this._('foreignpassport'),
                    10: this._('I551I94receipt'),
                    12: this._('I551receipt')
                }, na);
            }
        });

        this._lprHelp = this.renderHelpIcon(lprHelp, this._('lprhelp.caption'), dialog, this._('lprhelp.text'));

        this._alien = alien.prop('title', this._('alienhelp.tooltip')).click(() => {
            this.selectCheckmark(this._alien, citizenships);
            this.processLPR(this._alien.prop('checked'));
            this._alienWorkAuthDate.val('');
            this._alienuscisNum.val('');
            this.filterCombolist(this._alienuscisNumType, {});
            this._admissionNum.val('');
            this._passportNum.val('');
            this.filterCombolist(this._countryOfIssuance, {});
            if (this._alien.prop('checked')) {
                this._alienWorkAuthDate.prop('disabled', false);
                this._alienuscisNum.prop('disabled', false);
                this._alienuscisNumType.prop('disabled', false);

                this.filterCombolist(this._alienuscisNumType, { 'A': this._('aliennumber'), 'U': this._('uscisnumber') });

                this._admissionNum.prop('disabled', false);
                this._passportNum.prop('disabled', false);

                this._countryOfIssuance.prop('disabled', false);

                this.filterCombolist(this._countryOfIssuance, JSON.parse(this._('countries')));
            }

            this.filterCombolist(this._listCDoc, this.getListCContent(this._immigrationStatus.val(this._alien.prop('checked') ? 4 : 0).val()), na);

            this.filterCombolist(this._listADoc, {});
            if (this._alien.prop('checked')) {
                this.filterCombolist(this._listADoc, {
                    0: na,
                    6: this._('eadI766'),
                    5: this._('foreignpassport'),
                    7: this._('foreinpassportnonimmigrant'),
                    8: this._('FSMpassport'),
                    9: this._('RMIpassport'),
                    11: this._('I94refugeestampreceipt'),
                    13: this._('I766receipt'),
                    14: this._('foreinpassportnonimmigrantreceipt'),
                    15: this._('FSMpassportreceipt'),
                    16: this._('RMIpassportreceipt')
                }, na);
            }
        });

        this._alienHelp = this.renderHelpIcon(alienHelp, this._('alienhelp.caption'), dialog, this._('alienhelp.text'), 500);

        this._uscisNumberHelp = this.renderHelpIcon(uscisNumberHelp, this._('uscisnumberhelp.caption'), dialog, this._('uscisnumberhelp.text'));

        this._lpruscisNumPrefix = lpruscisNumPrefix;

        this._lpruscisNum = lpruscisNum.prop('title', this._('uscisnumber.tooltip')).prop('maxLength', 9).keypress(e => this.numberFormat.test(String.fromCharCode(e.which)));

        this._lpruscisNumType = lpruscisNumType.prop('title', this._('uscisnumbertype.tooltip'));
        this.assignCombolistEventHandler(this._lpruscisNumType, e => this._lpruscisNumPrefix.val(e.target.getAttribute('value') === 'A' ? 'A' : ''));

        this._alienWorkAuthDate = alienWorkAuthDate.prop('title', this._('alienworkauthdate.tooltip')).datepicker().unbind('keypress').keypress(e => /[\d/]/g.test(String.fromCharCode(e.which)) || this.NAFormat.test(String.fromCharCode(e.which)));

        this._alienuscisNumPrefix = alienuscisNumPrefix;

        // E-Verify requirements
        this._alienuscisNum = alienuscisNum.prop('title', this._('uscisnumber.tooltip')).prop('maxLength', 9).keypress(e => this.numberFormat.test(String.fromCharCode(e.which))).blur(() => {
            if (this._alienuscisNum.val() !== '') {
                if (this._alienuscisNumType.val() === '') {
                    this.filterCombolist(this._alienuscisNumType, { 'A': this._('aliennumber'), 'U': this._('uscisnumber') });
                }

                this._admissionNum.val(na);
                this._passportNum.val(na);
                this.filterCombolist(this._countryOfIssuance, { 0: na }, na);
            } else {
                this.filterCombolist(this._alienuscisNumType, {});
                this._admissionNum.val('');
                this._passportNum.val('');
                this.filterCombolist(this._countryOfIssuance, {});
            }
        });

        this._alienuscisNumType = alienuscisNumType.prop('title', this._('uscisnumbertype.tooltip'));
        this.assignCombolistEventHandler(this._alienuscisNumType, e => this._alienuscisNumPrefix.val(e.target.getAttribute('value') === 'A' ? 'A' : ''));

        // E-Verify requirements
        this._admissionNum = admissionNum.prop('title', this._('admissionnumber.tooltip')).prop('maxLength', 11).keypress(e => this.numberFormat.test(String.fromCharCode(e.which))).blur(() => {
            if (this._admissionNum.val() !== '') {
                this._alienuscisNum.val(na);
                this.filterCombolist(this._alienuscisNumType, { 0: na }, na);

                this._passportNum.val(na);
                this.filterCombolist(this._countryOfIssuance, { 0: na }, na);
            } else {
                this._alienuscisNum.val('');
                this.filterCombolist(this._alienuscisNumType, {});
                this._passportNum.val('');
                this.filterCombolist(this._countryOfIssuance, {});
            }
        });

        this._admissionNumHelp = this.renderHelpIcon(admissionNumHelp, this._('admissionnumberhelp.caption'), dialog, this._('admissionnumberhelp.text'));

        // E-Verify requirements
        this._passportNum = passportNum.prop('title', this._('passportnumber.tooltip')).prop('maxLength', 12).blur(() => {
            if (this._passportNum.val() !== '') {
                this._alienuscisNum.val(na);
                this.filterCombolist(this._alienuscisNumType, { 0: na }, na);

                this._admissionNum.val(na);

                if (this._countryOfIssuance.val() === '') {
                    this.filterCombolist(this._countryOfIssuance, JSON.parse(this._('countries')));
                }
            } else {
                this._alienuscisNum.val('');
                this.filterCombolist(this._alienuscisNumType, {});
                this._admissionNum.val('');
            }
        });

        this._passportNumHelp = this.renderHelpIcon(passportNumHelp, this._('passportnumberhelp.caption'), dialog, this._('passportnumberhelp.text'));

        this._countryOfIssuance = countryOfIssuance.prop('title', this._('coi.tooltip'));

        this._countryOfIssuanceHelp = this.renderHelpIcon(countryOfIssuanceHelp, this._('coihelp.caption'), dialog, this._('coihelp.text'));

        this._sgnEmployee = sgnEmployee.prop('title', this._('employee.tooltip'));

        this._sgnEmployeeHelp = this.renderHelpIcon(sgnEmployeeHelp, this._('employeehelp.caption'), dialog, this._('employeehelp.text'), 700);

        this._sgnEmployeeDate = sgnEmployeeDate.prop('title', this._('employeedate.tooltip')).datepicker();

        this._sgnEmployeeDateHelp = this.renderHelpIcon(sgnEmployeeDateHelp, this._('employeedatehelp.caption'), dialog, this._('employeedatehelp.text'));

        this.processLPR(false);
        this.processAlien(false);
    }

    renderTranslatorSection(dialog, translatorNo, translatorYes, translatorHelp, sgnTranslator, sgnTranslatorHelp, translatorDate, translatorDateHelp, translatorLastName, translatorLastNameHelp, translatorFirstName, translatorFirstNameHelp, translatorAddress, translatorAddressHelp, translatorCity, translatorCityHelp, translatorState, translatorStateHelp, translatorZip, translatorZipHelp) {

        var translator = [translatorYes, translatorNo];

        this._translatorYes = translatorYes.prop('title', this._('translator.tooltip')).click(() => {
            this.selectCheckmark(this._translatorYes, translator);

            this._sgnTranslator.prop('disabled', false);
            this._translatorDate.prop('disabled', false);
            this._translatorLastName.prop('disabled', false);
            this._translatorFirstName.prop('disabled', false);
            this._translatorAddress.prop('disabled', false);
            this._translatorCity.prop('disabled', false);
            this._translatorState.prop('disabled', false);
            this._translatorZip.prop('disabled', false);
        });

        this._translatorNo = translatorNo.prop('title', this._('translator.tooltip')).click(() => {
            this.selectCheckmark(this._translatorNo, translator);

            this._sgnTranslator.val('').prop('disabled', true);
            this._translatorDate.val('').prop('disabled', true);
            this._translatorLastName.val('').prop('disabled', true);
            this._translatorFirstName.val('').prop('disabled', true);
            this._translatorAddress.val('').prop('disabled', true);
            this._translatorCity.val('').prop('disabled', true);
            this._translatorState.val('').prop('disabled', true);
            this._translatorZip.val('').prop('disabled', true);
        });

        this._translatorHelp = this.renderHelpIcon(translatorHelp, this._('translatorhelp.caption'), dialog, this._('translatorhelp.text'), 500);

        this._sgnTranslator = sgnTranslator.prop('title', this._('sgntranslator.tooltip'));

        this._sgnTranslatorHelp = this.renderHelpIcon(sgnTranslatorHelp, this._('sgntranslatorhelp.caption'), dialog, this._('sgntranslatorhelp.text'));

        this._translatorDate = translatorDate.datepicker().prop('title', this._('translatordate.tooltip'));

        this._translatorDateHelp = this.renderHelpIcon(translatorDateHelp, this._('translatordatehelp.caption'), dialog, this._('translatordatehelp.text'));

        this._translatorLastName = translatorLastName.prop('title', this._('translatorlastname.tooltip')).prop('maxLength', 40).keypress(e => this.nameFormat.test(String.fromCharCode(e.which)));

        this._translatorLastNameHelp = this.renderHelpIcon(translatorLastNameHelp, this._('translatorlastnamehelp.caption'), dialog, this._('translatorlastnamehelp.text'));

        this._translatorFirstName = translatorFirstName.prop('title', this._('translatorfirstname.tooltip')).prop('maxLength', 25).keypress(e => this.nameFormat.test(String.fromCharCode(e.which)));

        this._translatorFirstNameHelp = this.renderHelpIcon(translatorFirstNameHelp, this._('translatorfirstnamehelp.caption'), dialog, this._('translatorfirstnamehelp.text'));

        this._translatorAddress = translatorAddress.prop('title', this._('translatoraddress.tooltip'));

        this._translatorAddressHelp = this.renderHelpIcon(translatorAddressHelp, this._('translatoraddresshelp.caption'), dialog, this._('translatoraddresshelp.text'));

        this._translatorCity = translatorCity.prop('title', this._('translatorcity.tooltip'));

        this._translatorCityHelp = this.renderHelpIcon(translatorCityHelp, this._('translatorcityhelp.caption'), dialog, this._('translatorcityhelp.text'));

        this._translatorState = translatorState.prop('title', this._('translatorstate.tooltip'));

        this._translatorStateHelp = this.renderHelpIcon(translatorStateHelp, this._('translatorstatehelp.caption'), dialog, this._('translatorstatehelp.text'));

        this._translatorZip = translatorZip.prop('title', this._('translatorzip.tooltip')).keypress(e => this.zipFormat.test(String.fromCharCode(e.which)));

        this._translatorZipHelp = this.renderHelpIcon(translatorZipHelp, this._('translatorziphelp.caption'), dialog, this._('translatorziphelp.text'));
    }

    renderSection2(dialog, employeeInfoHelp, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, immigrationStatus, immigrationStatusHelp, listADoc, listAIssuingAuthority, listADocNumber, listADocExpDate, listADoc2, listAIssuingAuthority2, listADocNumber2, listADocExpDate2, listADoc3, listAIssuingAuthority3, listADocNumber3, listADocExpDate3, listBDoc, listCDoc) {

        this._employeeInfoSection2Help = this.renderHelpIcon(employeeInfoHelp, this._('employeeinfosection2help.caption'), dialog, this._('employeeinfosection2help.text'));

        this._lastNameSection2 = lastName;

        this._lastNameSection2Help = this.renderHelpIcon(lastNameHelp, this._('lastnamesection2help.caption'), dialog, this._('lastnamesection2help.text'));

        this._firstNameSection2 = firstName;

        this._firstNameSection2Help = this.renderHelpIcon(firstNameHelp, this._('firstnamesection2help.caption'), dialog, this._('firstnamesection2help.text'));

        this._middleInitialSection2 = middleInitial;

        this._middleInitialSection2Help = this.renderHelpIcon(middleInitialHelp, this._('middleinitialsection2help.caption'), dialog, this._('middleinitialsection2help.text'));

        this._immigrationStatus = immigrationStatus;

        this._immigrationStatusHelp = this.renderHelpIcon(immigrationStatusHelp, this._('immigrationstatushelp.caption'), dialog, this._('immigrationstatushelp.text'));

        this._listADoc = listADoc;
        this._listAIssuingAuthority = listAIssuingAuthority;
        this._listADocNumber = listADocNumber;
        this._listADocExpDate = listADocExpDate;
        this._listADocExpDate.datepicker();

        this._listADoc2 = listADoc2;
        this._listAIssuingAuthority2 = listAIssuingAuthority2;
        this._listADocNumber2 = listADocNumber2;
        this._listADocExpDate2 = listADocExpDate2;
        this._listADocExpDate2.datepicker();

        this._listADoc3 = listADoc3;
        this._listAIssuingAuthority3 = listAIssuingAuthority3;
        this._listADocNumber3 = listADocNumber3;
        this._listADocExpDate3 = listADocExpDate3;
        this._listADocExpDate3.datepicker();

        this._listBDoc = listBDoc;

        this.filterCombolist(this._listBDoc, this.getListBContent(null));

        this._listCDoc = listCDoc;

        this.filterCombolist(this._listCDoc, this.getListCContent(null));
    }

    validateFields() {
        var errorMessage = '';

        if (this._lastName.val() === '') {
            errorMessage += '- ' + this._('lastname.exists') + '\r\n';
        } else if (this.nameFormat.test(this._lastName.val())) {
            errorMessage += '- ' + this._('lastname.format') + '\r\n';
        }

        if (this._firstName.val() === '') {
            errorMessage += '- ' + this._('firstname.exists') + '\r\n';
        } else if (this.nameFormat.test(this._firstName.val())) {
            errorMessage += '- ' + this._('firstname.format') + '\r\n';
        }

        if (this._dob.val() === '') {
            errorMessage += '- ' + this._('dateofbirth.exists') + '\r\n';
        } else if (this._dob.val() === '' || this.dateFormat.test(this._dob.val())) {
            errorMessage += '- ' + this._('dateofbirth.format') + '\r\n';
        }

        if (errorMessage !== '') {
            alert(errorMessage);
            return false;
        } else {
            return true;
        }
    }

    autoFocus(e, regex, length, ctrl) {
        var res = regex.test(String.fromCharCode(e.which));
        if (res && e.target.value.length === length - 1) {
            ctrl.focus();
        }

        return res;
    }

    selectCheckmark(ctrl, arr) {
        for (var c in arr) {
            if (arr[c] !== ctrl) {
                arr[c].prop('checked', false);
            }
        }

        return true;
    }

    filterCombolist(ctrl, items, defaultValue) {
        var options = ctrl.parent().children().filter('.combo-content');
        for (let index in items) {
            options.children().filter('[value="' + index + '"]').text(items[index]);
        }

        options.children().show();
        options.children().each((code, item) => {
            var val = item.getAttribute('value');
            if (!(val in items)) {
                options.children().filter('[value="' + val + '"]').hide();
            }
        });

        options.children().click(e => {
            this.processListABC(e.target.parentNode.parentNode.getElementsByTagName('input')[0].getAttribute('name'), e.target.getAttribute('value'));
        });

        options.children().filter('[value="' + (defaultValue ? defaultValue : '') + '"]').click();

        if (defaultValue === null) {
            ctrl.val('');
        }
    }

    assignCombolistEventHandler(ctrl, f) {
        ctrl.parent().children().filter('.combo-content').click(f);
    }

    processListABC(ddl, code) {
        switch (ddl) {
            case 'ListADocTitle':
                var na = this._('NA');
                var issuingAuthList = { 0: na };
                var issuingAuth = issuingAuthList[0];

                // US Citizens & Non-citizen nationals
                // 1 - U.S. Passport
                // 2 - U.S. Passport Card
                if (['1', '2'].includes(code)) {
                    issuingAuthList = { 1: this._('USDS') };
                    issuingAuth = 1;
                }

                // LPR
                // 3 - Perm. Resident Card (Form I-551)
                if (code === '3') {
                    issuingAuthList = { 2: this._('USCIS'), 3: this._('DOJINS') };
                    issuingAuth = 0;
                }

                // 4 - Alien Reg. Receipt Card (Form I-551)
                if (code === '4') {
                    issuingAuthList = { 3: this._('DOJINS') };
                    issuingAuth = 3;
                }

                // 5 - Foreign Passport
                if (code === '5') {
                    issuingAuthList = JSON.parse(this._('countries'));
                    issuingAuth = null;

                    this.filterCombolist(this._listADoc2, { 1: this._('temporaryI551stamp'), 2: this._('mrivstamp') }, 1);
                    this.filterCombolist(this._listAIssuingAuthority2, { 0: na }, 0);
                }

                // 10 - Receipt: Form I-94/I-94A w/I-551 stamp, photo
                if (code === '10') {
                    issuingAuthList = { 4: this._('DHS') };
                    issuingAuth = 4;
                }

                // 12 - Receipt replacement Perm. Res. Card (Form I-551)
                if (code === '12') {
                    issuingAuthList = { 2: this._('USCIS') };
                    issuingAuth = 2;
                }

                if (['1', '2', '3', '4', '10', '12'].includes(code)) {
                    this.filterCombolist(this._listADoc2, { 0: na }, 0);
                    this.filterCombolist(this._listAIssuingAuthority2, { 0: na }, 0);
                    this._listADocNumber2.attr('readOnly', true).val(na);
                    this._listADocExpDate2.attr('readOnly', true).datepicker('option', 'showOn', 'off').val(na);
                }

                if (['1', '2', '3', '4', '5', '10', '12'].includes(code)) {
                    this.filterCombolist(this._listADoc3, { 0: na }, 0);
                    this.filterCombolist(this._listAIssuingAuthority3, { 0: na }, 0);
                    this._listADocNumber3.attr('readOnly', true).val(na);
                    this._listADocExpDate3.attr('readOnly', true).datepicker('option', 'showOn', 'off').val(na);
                }

                this.filterCombolist(this._listAIssuingAuthority, issuingAuthList, issuingAuth);

                break;
        }
    }

    processLPR(flag) {
        var na = flag ? this._('NA') : '';
        this._lpruscisNumPrefix.val('');
        this._lpruscisNum.prop('disabled', true).val(na);
        this._lpruscisNumType.prop('disabled', true);

        this.filterCombolist(this._lpruscisNumType, flag ? { 0: na } : {}, flag ? 0 : null);
    }

    processAlien(flag) {
        var na = flag ? this._('NA') : '';
        this._alienWorkAuthDate.prop('disabled', true).val(na);
        this._alienuscisNumPrefix.val('');
        this._alienuscisNum.prop('disabled', true).val(na);
        this._alienuscisNumType.prop('disabled', true);
        this._admissionNum.prop('disabled', true).val(na);
        this._passportNum.prop('disabled', true).val(na);
        this._countryOfIssuance.prop('disabled', true);

        this.filterCombolist(this._alienuscisNumType, flag ? { 0: na } : {}, flag ? 0 : null);
        this.filterCombolist(this._countryOfIssuance, flag ? { 0: na } : {}, flag ? 0 : null);
    }

    renderHelpIcon(ctrl, title, dialog, text, minWidth) {
        return ctrl.prop('title', title).attr('icon', true).val(String.fromCodePoint(0xFFFD)).toggleClass('noHighlight').parent().click(() => {
            ctrl.blur();
            dialog.text('').append(text).dialog('option', 'minWidth', minWidth ? minWidth : 50).dialog('open');
        });
    }

    getListBContent(dob) {
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

        return listB;
    }

    getListCContent(citizenship) {
        var listC = {
            0: this._('NA'),
            1: this._('ssncard'),
            10: this._('ssnCardReceipt')
        };

        if (['1', '2', '0', null].includes(citizenship)) {
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

        if (['3', '4', '0', null].includes(citizenship)) {
            listC = $.extend(listC, {
                9: this._('eadListC'),
                13: this._('eadListCReceipt')
            });
        }

        return listC;
    }
}

var form = new USI9();

document.addEventListener('pagerendered', function (e) {
    $(document).tooltip({
        show: {
            delay: 200
        },
        open: (event, ui) => setTimeout(() => $(ui.tooltip).hide('fadeOut'), 5000),
        position: {
            my: 'center bottom', // the "anchor point" in the tooltip element
            at: 'center top' // the position of that anchor point relative to selected element
        }
    });

    /* Inicialización en español para la extensión 'UI date picker' para jQuery. */
    /* Traducido por Vester (xvester@gmail.com). */
    $.datepicker.regional.es = {
        closeText: 'Cerrar',
        prevText: '&#x3C;Ant',
        nextText: 'Sig&#x3E;',
        currentText: 'Hoy',
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        weekHeader: 'Sm',
        dateFormat: 'mm/dd/yy', // I-9 should use mm/dd/yyyy format 
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: '' };
    $.datepicker.setDefaults($.datepicker.regional.es);

    $.datepicker.setDefaults($.extend($.datepicker.regional[form._('jquery.locale')]));

    $('body').append('<div id="dialogPage"></div>');

    $('#dialogPage').dialog({
        title: '',
        minHeight: 50,
        minWidth: 50,
        autoOpen: false
    });

    if (e.detail.pageNumber === 1) {
        form.renderSection1($('#dialogPage'), $('[name=LastName]'), $('[name=LastNameHelp]'), $('[name=FirstName]'), $('[name=FirstNameHelp]'), $('[name=MiddleInitial]'), $('[name=MiddleInitialHelp]'), $('[name=OtherNames]'), $('[name=OtherNamesHelp]'), $('[name=Address]'), $('[name=AddressHelp]'), $('[name=ApartmentNumber]'), $('[name=ApartmentNumberHelp]'), $('[name=City]'), $('[name=CityHelp]'), $('[name=State]'), $('[name=StateHelp]'), $('[name=Zip]'), $('[name=ZipHelp]'), $('[name=DateOfBirth]'), $('[name=DateOfBirthHelp]'), $('[name=SSN11]'), $('[name=SSN12]'), $('[name=SSN13]'), $('[name=SSN21]'), $('[name=SSN22]'), $('[name=SSN31]'), $('[name=SSN32]'), $('[name=SSN33]'), $('[name=SSN34]'), $('[name=SSNHelp]'), $('[name=Email]'), $('[name=EmailHelp]'), $('[name=Phone]'), $('[name=PhoneHelp]'), $('[name=Citizen]'), $('[name=CitizenHelp]'), $('[name=NonCitizenNational]'), $('[name=NonCitizenNationalHelp]'), $('[name=LawfulPermanentResident]'), $('[name=LawfulPermanentResidentHelp]'), $('[name=AlienAuthorizedToWork]'), $('[name=AlienAuthorizedToWorkHelp]'), $('[name=USCISNumberHelp]'), $('[name=LPRUSCISNumberPrefix]'), $('[name=LPRUSCISNumber]'), $('[name=LPRUSCISNumberType]'), $('[name=AlienWorkAuthorizationDate]'), $('[name=AlienUSCISNumberPrefix]'), $('[name=AlienUSCISNumber]'), $('[name=AlienUSCISNumberType]'), $('[name=AdmissionNumber]'), $('[name=AdmissionNumberHelp]'), $('[name=ForeignPassportNumber]'), $('[name=ForeignPassportNumberHelp]'), $('[name=CountryOfIssuance]'), $('[name=CountryOfIssuanceHelp]'), $('[name=sgnEmployee]'), $('[name=sgnEmployeeHelp]'), $('[name=sgnEmployeeDate]'), $('[name=sgnEmployeeDateHelp]'));

        form.renderTranslatorSection($('#dialogPage'), $('[name=PreparerOrTranslatorNo]'), $('[name=PreparerOrTranslatorYes]'), $('[name=PreparerOrTranslatorHelp]'), $('[name=sgnTranslator]'), $('[name=sgnTranslatorHelp]'), $('[name=TranslatorDate]'), $('[name=TranslatorDateHelp]'), $('[name=TranslatorLastName]'), $('[name=TranslatorLastNameHelp]'), $('[name=TranslatorFirstName]'), $('[name=TranslatorFirstNameHelp]'), $('[name=TranslatorAddress]'), $('[name=TranslatorAddressHelp]'), $('[name=TranslatorCity]'), $('[name=TranslatorCityHelp]'), $('[name=TranslatorState]'), $('[name=TranslatorStateHelp]'), $('[name=TranslatorZip]'), $('[name=TranslatorZipHelp]'));
    }

    if (e.detail.pageNumber === 2) {
        form.renderSection2($('#dialogPage'), $('[name=EmployeeInfoSection2Help]'), $('[name=LastNameSection2]'), $('[name=LastNameSection2Help]'), $('[name=FirstNameSection2]'), $('[name=FirstNameSection2Help]'), $('[name=MiddleInitialSection2]'), $('[name=MiddleInitialSection2Help]'), $('[name=ImmigrationStatus]'), $('[name=ImmigrationStatusHelp]'), $('[name=ListADocTitle]'), $('[name=ListAIssuingAuthority]'), $('[name=ListADocNumber]'), $('[name=ListAExpDate]'), $('[name=ListADocTitle2]'), $('[name=ListAIssuingAuthority2]'), $('[name=ListADocNumber2]'), $('[name=ListAExpDate2]'), $('[name=ListADocTitle3]'), $('[name=ListAIssuingAuthority3]'), $('[name=ListADocNumber3]'), $('[name=ListAExpDate3]'), $('[name=ListBDocTitle]'), $('[name=ListCDocTitle]'));
    }
}, true);