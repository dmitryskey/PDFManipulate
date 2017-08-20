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

    renderSection1(dialog,
        lastName, lastNameHelp, firstName, firstNameHelp,
        middleInitial, middleInitialHelp,
        otherNames, otherNamesHelp,
        address, addressHelp, apptNumber, apptNumberHelp,
        city, cityHelp, state, stateHelp, zip, zipHelp,
        dob, dobHelp, ssn11, ssn12, ssn13, ssn21, ssn22, ssn31,
        ssn32, ssn33, ssn34, ssnHelp,
        email, emailHelp, phone, phoneHelp,
        citizen, citizenHelp, national, nationalHelp,
        lpr, lprHelp, alien, alienHelp, uscisNumberHelp,
        lpruscisNumPrefix, lpruscisNum, lpruscisNumType,
        alienWorkAuthDate, alienuscisNumPrefix, alienuscisNum, alienuscisNumType,
        admissionNum, admissionNumHelp, passportNum, passportNumHelp,
        countryOfIssuance, countryOfIssuanceHelp) {

        dialog.dialog({
            title: this._('help'),
            minHeight: 50,
            minWidth: 50,
            autoOpen: false
        });

        $('a').prop('target', '_blank');

        // E-Verify requirements
        this._lastName = lastName;
        this._lastName.prop('title', this._('lastnamehelp.tooltip'));
        this._lastName.prop('maxLength', 40);
        this._lastName.keypress(e =>
            this.nameFormat.test(String.fromCharCode(e.which)));
        this._lastName.blur(() => 
            this._lastNameSection2.val(this._lastName.val())
        );

        this._lastNameHelp = lastNameHelp;
        this.renderHelpIcon(
            this._lastNameHelp,
            this._('lastnamehelp.caption'),
            dialog,
            this._('lastnamehelp.text')
        );

        // E-Verify requirements
        this._firstName = firstName;
        this._firstName.prop('title', this._('firstnamehelp.tooltip'));
        this._firstName.prop('maxLength', 25);
        this._firstName.keypress(e =>
            this.nameFormat.test(String.fromCharCode(e.which)));
        this._firstName.blur(() => 
            this._firstNameSection2.val(this._firstName.val())
        );

        this._firstNameHelp = firstNameHelp;
        this.renderHelpIcon(
            this._firstNameHelp,
            this._('firstnamehelp.caption'),
            dialog,
            this._('firstnamehelp.text')
        );

        // E-Verify requirements + N/A option
        this._middleInitial = middleInitial;
        this._middleInitial.prop('title', this._('middleinitialhelp.tooltip'));
        this._middleInitial.prop('maxLength', 3);
        this._middleInitial.keypress(e =>
            this.nameFormat.test(String.fromCharCode(e.which)) ||
            this.NAFormat.test(String.fromCharCode(e.which)));
        this._middleInitial.blur(() => 
            this._middleInitialSection2.val(this._middleInitial.val())
        );

        this._middleInitialHelp = middleInitialHelp;
        this.renderHelpIcon(
            this._middleInitialHelp,
            this._('middleinitialhelp.caption'),
            dialog,
            this._('middleinitialhelp.text')
        );

        // E-Verify requirements
        this._otherNames = otherNames;
        this._otherNames.prop('title', this._('othernameshelp.tooltip'));
        this._otherNames.prop('maxLength', 40);
        this._otherNames.keypress(e =>
            this.nameFormat.test(String.fromCharCode(e.which)) ||
            this.NAFormat.test(String.fromCharCode(e.which)));

        this._otherNamesHelp = otherNamesHelp;
        this.renderHelpIcon(
            this._otherNamesHelp,
            this._('othernameshelp.caption'),
            dialog,
            this._('othernameshelp.text')
        );

        this._address = address;
        this._address.prop('title', this._('addresshelp.tooltip'));
        this._addressHelp = addressHelp;
        this.renderHelpIcon(
            this._addressHelp,
            this._('addresshelp.caption'),
            dialog,
            this._('addresshelp.text')
        );

        this._apptNumber = apptNumber;
        this._apptNumber.prop('title', this._('apartmentnumberhelp.tooltip'));
        this._apptNumberHelp = apptNumberHelp;
        this.renderHelpIcon(
            this._apptNumberHelp,
            this._('apartmentnumberhelp.caption'),
            dialog,
            this._('apartmentnumberhelp.text')
        );

        this._city = city;
        this._city.prop('title', this._('cityhelp.caption'));
        this._cityHelp = cityHelp;
        this.renderHelpIcon(
            this._cityHelp,
            this._('cityhelp.caption'),
            dialog,
            this._('cityhelp.text')
        );

        this._state = state;
        this._state.prop('title', this._('statehelp.tooltip'));

        this._stateHelp = stateHelp;
        this.renderHelpIcon(
            this._stateHelp,
            this._('statehelp.caption'),
            dialog,
            this._('statehelp.text')
        );

        this._zip = zip;
        this._zip.prop('title', this._('ziphelp.tooltip'));
        this._zip.keypress(e =>
            this.zipFormat.test(String.fromCharCode(e.which)));

        this._zipHelp = zipHelp;
        this.renderHelpIcon(
            this._zipHelp,
            this._('ziphelp.caption'),
            dialog,
            this._('ziphelp.text')
        );

        // E-Verify requirements
        this._dob = dob;
        this._dob.prop('title', this._('dobhelp.tooltip'));
        this._dob.datepicker();

        this._dobHelp = dobHelp;
        this.renderHelpIcon(
            this._dobHelp,
            this._('dobhelp.caption'),
            dialog,
            this._('dobhelp.text')
        );

        this._ssn11 = ssn11;
        this._ssn11.prop('title', this._('ssnhelp.tooltip'));
        this._ssn11.prop('maxLength', 1);
        this._ssn11.keypress(e => 
            this.autoFocus(e, this.numberFormat, 1, this._ssn12));

        this._ssn12 = ssn12;
        this._ssn12.prop('title', this._('ssnhelp.tooltip'));
        this._ssn12.prop('maxLength', 1);
        this._ssn12.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn13));

        this._ssn13 = ssn13;
        this._ssn13.prop('title', this._('ssnhelp.tooltip'));
        this._ssn13.prop('maxLength', 1);
        this._ssn13.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn21));

        this._ssn21 = ssn21;
        this._ssn21.prop('title', this._('ssnhelp.tooltip'));
        this._ssn21.prop('maxLength', 1);
        this._ssn21.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn22));

        this._ssn22 = ssn22;
        this._ssn22.prop('title', this._('ssnhelp.tooltip'));
        this._ssn22.prop('maxLength', 1);
        this._ssn22.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn31));

        this._ssn31 = ssn31;
        this._ssn31.prop('title', this._('ssnhelp.tooltip'));
        this._ssn31.prop('maxLength', 1);
        this._ssn31.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn32));

        this._ssn32 = ssn32;
        this._ssn32.prop('title', this._('ssnhelp.tooltip'));
        this._ssn32.prop('maxLength', 1);
        this._ssn32.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn33));

        this._ssn33 = ssn33;
        this._ssn33.prop('title', this._('ssnhelp.tooltip'));
        this._ssn33.prop('maxLength', 1);
        this._ssn33.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn34));

        this._ssn34 = ssn34;
        this._ssn34.prop('title', this._('ssnhelp.tooltip'));
        this._ssn34.prop('maxLength', 1);
        this._ssn34.keypress(e =>
            this.numberFormat.test(String.fromCharCode(e.which)));

        this._ssnHelp = ssnHelp;
        this.renderHelpIcon(
            this._ssnHelp,
            this._('ssnhelp.caption'),
            dialog,
            this._('ssnhelp.text'),
            400
        );

        this._email = email;
        this._email.prop('title', this._('emailhelp.tooltip'));
        this._email.prop('maxLength', 60);

        this._emailHelp = emailHelp;
        this.renderHelpIcon(
            this._emailHelp,
            this._('emailhelp.caption'),
            dialog,
            this._('emailhelp.text')
        );

        this._phone = phone;
        this._phone.prop('title', this._('phonehelp.tooltip'));
        this._phone.prop('maxLength', 13);
        this._phone.keypress(e =>
            this.phoneFormat.test(String.fromCharCode(e.which)));

        this._phoneHelp = phoneHelp;
        this.renderHelpIcon(
            this._phoneHelp,
            this._('phonehelp.caption'),
            dialog,
            this._('phonehelp.text')
        );

        var arr = [citizen, national, lpr, alien];
        var na = this._('NA');

        this._citizen = citizen;
        this._citizen.prop('title', this._('citizenhelp.tooltip'));
        this._citizen.click(() => {
            this.selectCheckmark(this._citizen, arr);
            this.processLPR(this._citizen.prop('checked'));
            this.processAlien(this._citizen.prop('checked'));
            this._immigrationStatus.val(this._citizen.prop('checked') ? 1 : 0);

            this.filterCombolist(this._listADoc, {0:na});
            if (this._citizen.prop('checked')) {
                this.filterCombolist(this._listADoc, {0:na, 1:this._('uspassport'), 2:this._('uspassportcard')}, na);
            }
        });

        this._citizenHelp = citizenHelp;
        this.renderHelpIcon(
            this._citizenHelp,
            this._('citizenhelp.caption'),
            dialog,
            this._('citizenhelp.text')
        );

        this._national = national;
        this._national.prop('title', this._('nationalhelp.tooltip'));
        this._national.click(() => {
            this.selectCheckmark(this._national, arr);
            this.processLPR(this._national.prop('checked'));
            this.processAlien(this._national.prop('checked'));
            this._immigrationStatus.val(this._national.prop('checked') ? 2 : 0);
            this.filterCombolist(this._listADoc, {0:na});
            if (this._national.prop('checked')) {
                this.filterCombolist(this._listADoc, {0:na, 1:this._('uspassport'), 2:this._('uspassportcard')}, na);
            }
        });

        this._nationalHelp = nationalHelp;
        this.renderHelpIcon(
            this._nationalHelp,
            this._('nationalhelp.caption'),
            dialog,
            this._('nationalhelp.text')
        );

        this._lpr = lpr;
        this._lpr.prop('title', this._('lprhelp.tooltip'));
        this._lpr.click(() => {
            this.selectCheckmark(this._lpr, arr);
            this.processAlien(this._lpr.prop('checked'));
            this._lpruscisNum.val('');
            this.filterCombolist(this._lpruscisNumType, {});

            if (this._lpr.prop('checked')) {
                this._lpruscisNum.prop('disabled', false);
                this._lpruscisNumType.prop('disabled', false);
                this.filterCombolist(this._lpruscisNumType, {'A':this._('aliennumber'), 'U':this._('uscisnumber')});
            }

            this._immigrationStatus.val(this._lpr.prop('checked') ? 3 : 0);

            this.filterCombolist(this._listADoc, {});
            if (this._lpr.prop('checked')) {
                this.filterCombolist(this._listADoc, {
                    0:na,
                    3:this._('permanentresidentcard'),
                    4:this._('alienresidentcard'),
                    5:this._('foreignpassport'),
                    10:this._('I551I94receipt'),
                    12:this._('I551receipt')
                }, na);
            }
        });

        this._lprHelp = lprHelp;
        this.renderHelpIcon(
            this._lprHelp,
            this._('lprhelp.caption'),
            dialog,
            this._('lprhelp.text')
        );

        this._alien = alien;
        this._alien.prop('title', this._('alienhelp.tooltip'));
        this._alien.click(() => {
            this.selectCheckmark(this._alien, arr);
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

                this.filterCombolist(this._alienuscisNumType, {'A':this._('aliennumber'), 'U':this._('uscisnumber')});

                this._admissionNum.prop('disabled', false);
                this._passportNum.prop('disabled', false);

                this._countryOfIssuance.prop('disabled', false);

                this.filterCombolist(this._countryOfIssuance, JSON.parse(this._('countries')));
            }

            this._immigrationStatus.val(this._alien.prop('checked') ? 4 : 0);

            this.filterCombolist(this._listADoc, {});
            if (this._alien.prop('checked')) {
                this.filterCombolist(this._listADoc, {
                    0:na,
                    6:this._('eadI766'),
                    5:this._('foreignpassport'),
                    7:this._('foreinpassportnonimmigrant'),
                    8:this._('FSMpassport'),
                    9:this._('RMIpassport'),
                    11:this._('I94refugeestampreceipt'),
                    13:this._('I766receipt'),
                    14:this._('foreinpassportnonimmigrantreceipt'),
                    15:this._('FSMpassportreceipt'),
                    16:this._('RMIpassportreceipt')
                }, na);
            }
        });

        this._alienHelp = alienHelp;
        this.renderHelpIcon(
            this._alienHelp,
            this._('alienhelp.caption'),
            dialog,
            this._('alienhelp.text'),
            500
        );

        this._uscisNumberHelp = uscisNumberHelp;

        this.renderHelpIcon(
            this._uscisNumberHelp,
            this._('uscisnumberhelp.caption'),
            dialog,
            this._('uscisnumberhelp.text')
        );

        this._lpruscisNumPrefix = lpruscisNumPrefix;

        this._lpruscisNum = lpruscisNum;
        this._lpruscisNum.prop('title', this._('uscisnumber.tooltip'));
        this._lpruscisNum.prop('maxLength', 9);
        this._lpruscisNum.keypress(e =>
            this.numberFormat.test(String.fromCharCode(e.which)));

        this._lpruscisNumType = lpruscisNumType;
        this._lpruscisNumType.prop('title', this._('uscisnumbertype.tooltip'));
        this.assignCombolistEventHandler(this._lpruscisNumType, (e) => 
            this._lpruscisNumPrefix.val(e.target.getAttribute('value') === 'A' ? 'A' : ''));

        this._alienWorkAuthDate = alienWorkAuthDate;
        this._alienWorkAuthDate.prop('title', this._('alienworkauthdate.tooltip'));
        this._alienWorkAuthDate.datepicker();
        this._alienWorkAuthDate.unbind('keypress');
        this._alienWorkAuthDate.keypress(e =>
            /[\d/]/g.test(String.fromCharCode(e.which)) ||
            this.NAFormat.test(String.fromCharCode(e.which))
        );

        this._alienuscisNumPrefix = alienuscisNumPrefix;

        // E-Verify requirements
        this._alienuscisNum = alienuscisNum;
        this._alienuscisNum.prop('title', this._('uscisnumber.tooltip'));
        this._alienuscisNum.prop('maxLength', 9);
        this._alienuscisNum.keypress(e =>
            this.numberFormat.test(String.fromCharCode(e.which)));
        this._alienuscisNum.blur(() => {
            if (this._alienuscisNum.val() !== '') {
                if (this._alienuscisNumType.val() === '') {
                    this.filterCombolist(this._alienuscisNumType, {'A':this._('aliennumber'), 'U':this._('uscisnumber')});
                }

                this._admissionNum.val(na);
                this._passportNum.val(na);
                this.filterCombolist(this._countryOfIssuance, {0:na}, na);
            }
            else {
                this.filterCombolist(this._alienuscisNumType, {});
                this._admissionNum.val('');
                this._passportNum.val('');
                this.filterCombolist(this._countryOfIssuance, {});
            }
        });

        this._alienuscisNumType = alienuscisNumType;
        this._alienuscisNumType.prop('title', this._('uscisnumbertype.tooltip'));
        this.assignCombolistEventHandler(this._alienuscisNumType, e => 
            this._alienuscisNumPrefix.val(e.target.getAttribute('value') === 'A' ? 'A' : ''));

        // E-Verify requirements
        this._admissionNum = admissionNum;
        this._admissionNum.prop('title', this._('admissionnumber.tooltip'));
        this._admissionNum.prop('maxLength', 11);
        this._admissionNum.keypress(e =>
            this.numberFormat.test(String.fromCharCode(e.which)));
        this._admissionNum.blur(() => {
            if (this._admissionNum.val() !== '') {
                this._alienuscisNum.val(na);
                this.filterCombolist(this._alienuscisNumType, {0:na}, na);

                this._passportNum.val(na);
                this.filterCombolist(this._countryOfIssuance, {0:na}, na);
            }
            else {
                this._alienuscisNum.val('');
                this.filterCombolist(this._alienuscisNumType, {});
                this._passportNum.val('');
                this.filterCombolist(this._countryOfIssuance, {});
            }
        });

        this._admissionNumHelp = admissionNumHelp;

        this.renderHelpIcon(
            this._admissionNumHelp,
            this._('admissionnumberhelp.caption'),
            dialog,
            this._('admissionnumberhelp.text')
        );

        // E-Verify requirements
        this._passportNum = passportNum;
        this._passportNum.prop('title', this._('passportnumber.tooltip'));
        this._passportNum.prop('maxLength', 12);
        this._passportNum.blur(() => {
            if (this._passportNum.val() !== '') {
                this._alienuscisNum.val(na);
                this.filterCombolist(this._alienuscisNumType, {0:na}, na);

                this._admissionNum.val(na);
                
                if (this._countryOfIssuance.val() === '') {
                    this.filterCombolist(this._countryOfIssuance, JSON.parse(this._('countries')));
                }
            }
            else {
                this._alienuscisNum.val('');
                this.filterCombolist(this._alienuscisNumType, {});
                this._admissionNum.val('');
            }
        });

        this._passportNumHelp = passportNumHelp;
        
        this.renderHelpIcon(
            this._passportNumHelp,
            this._('passportnumberhelp.caption'),
            dialog,
            this._('passportnumberhelp.text')
        );

        this._countryOfIssuance = countryOfIssuance;
        this._countryOfIssuance.prop('title', this._('coi.tooltip'));

        this._countryOfIssuanceHelp = countryOfIssuanceHelp;
        
        this.renderHelpIcon(
            this._countryOfIssuanceHelp,
            this._('coihelp.caption'),
            dialog,
            this._('coihelp.text')
        );

        this.processLPR(false);
        this.processAlien(false);
    }

    renderSection2(dialog,
        lastName, lastNameHelp, firstName, firstNameHelp,
        middleInitial, middleInitialHelp,
        immigrationStatus, immigrationStatusHelp,
        listADoc, listAIssuingAuthority, listADocNumber, listADocExpDate,
        listADoc2, listAIssuingAuthority2, listADocNumber2, listADocExpDate2,
        listADoc3, listAIssuingAuthority3, listADocNumber3, listADocExpDate3,
        listBDoc, listCDoc) {

        dialog.dialog({
            title: this._('help'),
            autoOpen: false
        });

        this._lastNameSection2 = lastName;
        this._firstNameSection2 = firstName;
        this._middleInitialSection2 = middleInitial;
        this._immigrationStatus = immigrationStatus;

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
        this._listCDoc = listCDoc;
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
        ctrl.val(defaultValue ? defaultValue : '');

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
            this.processListABC(
                e.target.parentNode.parentNode.getElementsByTagName('input')[0].getAttribute('name'),
                e.target.getAttribute('value'));
        });
    }

    assignCombolistEventHandler(ctrl, f) {
        ctrl.parent().children().filter('.combo-content').click(f);
    }

    processListABC(ddl, code) {
        switch(ddl)
        {
        case 'ListADocTitle':
            var na = this._('NA');
            var issuingAuthList = {0: na};
            var issuingAuth = issuingAuthList[0];

            // 1 - U.S. Passport
            // 2 - U.S. Passport Card
            if (code === '1' || code === '2') {
                issuingAuthList = {1:this._('USDS')};
                issuingAuth = issuingAuthList[1];

                this.filterCombolist(this._listADoc2, {0: na}, na);
                this.filterCombolist(this._listAIssuingAuthority2, {0: na}, na);
                this._listADocNumber2.attr('readOnly', true).val(na);
                this._listADocExpDate2.attr('readOnly', true).datepicker('option', 'showOn', 'off').val(na);

                this.filterCombolist(this._listADoc3, {0: na}, na);
                this.filterCombolist(this._listAIssuingAuthority3, {0: na}, na);
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

        this.filterCombolist(this._lpruscisNumType, flag ? {0:na} : {}, flag ? na : '');
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

        this.filterCombolist(this._alienuscisNumType, flag ? {0:na} : {}, flag ? na : '');
        this.filterCombolist(this._countryOfIssuance, flag ? {0:na} : {}, flag ? na : '');
    }

    renderHelpIcon(ctrl, title, dialog, text, minWidth) {
        ctrl.prop('title', title).attr('icon', true).val(String.fromCodePoint(0xFFFD)).
            toggleClass('noHighlight').parent().click(() => {
                ctrl.blur();
                dialog.text('').append(text).
                    dialog('option', 'minWidth', minWidth ? minWidth : 50).dialog('open');              
            });
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
            at: 'center top', // the position of that anchor point relative to selected element
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

    $.datepicker.setDefaults(
        $.extend(
            $.datepicker.regional[form._('jquery.locale')]
        )
    );

    if (e.detail.pageNumber === 1) {
        $('body').append('<div id="dialogPage' + e.detail.pageNumber + '"></div>');

        form.renderSection1(
            $('#dialogPage' + e.detail.pageNumber),
            $('[name=LastName]'),
            $('[name=LastNameHelp]'),
            $('[name=FirstName]'),
            $('[name=FirstNameHelp]'),
            $('[name=MiddleInitial]'),
            $('[name=MiddleInitialHelp]'),
            $('[name=OtherNames]'),
            $('[name=OtherNamesHelp]'),
            $('[name=Address]'),
            $('[name=AddressHelp]'),
            $('[name=ApartmentNumber]'),
            $('[name=ApartmentNumberHelp]'),
            $('[name=City]'),
            $('[name=CityHelp]'),
            $('[name=State]'),
            $('[name=StateHelp]'),
            $('[name=Zip]'),
            $('[name=ZipHelp]'),
            $('[name=DateOfBirth]'),
            $('[name=DateOfBirthHelp]'),
            $('[name=SSN11]'),
            $('[name=SSN12]'),
            $('[name=SSN13]'),
            $('[name=SSN21]'),
            $('[name=SSN22]'),
            $('[name=SSN31]'),
            $('[name=SSN32]'),
            $('[name=SSN33]'),
            $('[name=SSN34]'),
            $('[name=SSNHelp]'),
            $('[name=Email]'),
            $('[name=EmailHelp]'),
            $('[name=Phone]'),
            $('[name=PhoneHelp]'),
            $('[name=Citizen]'),
            $('[name=CitizenHelp]'),
            $('[name=NonCitizenNational]'),
            $('[name=NonCitizenNationalHelp]'),
            $('[name=LawfulPermanentResident]'),
            $('[name=LawfulPermanentResidentHelp]'),
            $('[name=AlienAuthorizedToWork]'),
            $('[name=AlienAuthorizedToWorkHelp]'),
            $('[name=USCISNumberHelp]'),
            $('[name=LPRUSCISNumberPrefix]'),
            $('[name=LPRUSCISNumber]'),
            $('[name=LPRUSCISNumberType]'),
            $('[name=AlienWorkAuthorizationDate]'),
            $('[name=AlienUSCISNumberPrefix]'),
            $('[name=AlienUSCISNumber]'),
            $('[name=AlienUSCISNumberType]'),
            $('[name=AdmissionNumber]'),
            $('[name=AdmissionNumberHelp]'),
            $('[name=ForeignPassportNumber]'),
            $('[name=ForeignPassportNumberHelp]'),
            $('[name=CountryOfIssuance]'),
            $('[name=CountryOfIssuanceHelp]')
        );
    }

    if (e.detail.pageNumber === 2) {
        $('body').append('<div id="dialogPage' + e.detail.pageNumber + '"></div>');

        form.renderSection2(
            $('#dialogPage' + e.detail.pageNumber),
            $('[name=LastNameSection2]'),
            $('[name=LastNameSection2Help]'),
            $('[name=FirstNameSection2]'),
            $('[name=FirstNameSection2Help]'),
            $('[name=MiddleInitialSection2]'),
            $('[name=MiddleInitialSection2Help]'),
            $('[name=ImmigrationStatus]'),
            $('[name=ImmigrationStatusHelp]'),
            $('[name=ListADocTitle]'),
            $('[name=ListAIssuingAuthority]'),
            $('[name=ListADocNumber]'),
            $('[name=ListAExpDate]'),
            $('[name=ListADocTitle2]'),
            $('[name=ListAIssuingAuthority2]'),
            $('[name=ListADocNumber2]'),
            $('[name=ListAExpDate2]'),
            $('[name=ListADocTitle3]'),
            $('[name=ListAIssuingAuthority3]'),
            $('[name=ListADocNumber3]'),
            $('[name=ListAExpDate3]'),
            $('[name=ListBDocTitle]'),
            $('[name=ListCDocTitle]')
        );
    }
}, true);
