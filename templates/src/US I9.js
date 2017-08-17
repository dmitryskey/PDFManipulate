var $ = require(['jQueryUI', 'jQuery']);
// require(['jQueryUIi18n']);

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
        lpr, lprHelp, alien,
        lpruscisNumPrefix, lpruscisNum, lpruscisNumType,
        alienWorkAuthDate, alienuscisNum, alienuscisNumType,
        admissionNum, passportNum, countryOfIssuance) {

        dialog.dialog({
            autoOpen: false
        });

        $('a').prop('target', '_blank');

        // E-Verify requirements
        this._lastName = lastName;
        this._lastName.prop('title', this.removeTags(this._('lastnamehelp.text')));
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
        this._firstName.prop('title', this.removeTags(this._('firstnamehelp.text')));
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
        this._middleInitial.prop('title', this.removeTags(this._('middleinitialhelp.text')));
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
        this._otherNames.prop('title', this.removeTags(this._('othernameshelp.text')));
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
        this._address.prop('title', this.removeTags(this._('addresshelp.text')));
        this._addressHelp = addressHelp;
        this.renderHelpIcon(
            this._addressHelp,
            this._('addresshelp.caption'),
            dialog,
            this._('addresshelp.text')
        );

        this._apptNumber = apptNumber;
        this._apptNumber.prop('title', this.removeTags(this._('apartmentnumberhelp.text')));
        this._apptNumberHelp = apptNumberHelp;
        this.renderHelpIcon(
            this._apptNumberHelp,
            this._('apartmentnumberhelp.caption'),
            dialog,
            this._('apartmentnumberhelp.text')
        );

        this._city = city;
        this._city.prop('title', this.removeTags(this._('cityhelp.text')));
        this._cityHelp = cityHelp;
        this.renderHelpIcon(
            this._cityHelp,
            this._('cityhelp.caption'),
            dialog,
            this._('cityhelp.text')
        );

        this._state = state;
        this._state.prop('title', this.removeTags(this._('statehelp.text')));
        // this._state.parent().children().filter('.combo-content').children().first().hide();

        this._stateHelp = stateHelp;
        this.renderHelpIcon(
            this._stateHelp,
            this._('statehelp.caption'),
            dialog,
            this._('statehelp.text')
        );

        this._zip = zip;
        this._zip.prop('title', this.removeTags(this._('ziphelp.text')));
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
        this._dob.prop('title', this.removeTags(this._('dobhelp.text')));
        this._dob.datepicker();

        this._dobHelp = dobHelp;
        this.renderHelpIcon(
            this._dobHelp,
            this._('dobhelp.caption'),
            dialog,
            this._('dobhelp.text')
        );

        this._ssn11 = ssn11;
        this._ssn11.prop('title', this.removeTags(this._('ssnhelp.text')));
        this._ssn11.prop('maxLength', 1);
        this._ssn11.keypress(e => 
            this.autoFocus(e, this.numberFormat, 1, this._ssn12));

        this._ssn12 = ssn12;
        this._ssn12.prop('title', this.removeTags(this._('ssnhelp.text')));
        this._ssn12.prop('maxLength', 1);
        this._ssn12.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn13));

        this._ssn13 = ssn13;
        this._ssn13.prop('title', this.removeTags(this._('ssnhelp.text')));
        this._ssn13.prop('maxLength', 1);
        this._ssn13.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn21));

        this._ssn21 = ssn21;
        this._ssn21.prop('title', this.removeTags(this._('ssnhelp.text')));
        this._ssn21.prop('maxLength', 1);
        this._ssn21.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn22));

        this._ssn22 = ssn22;
        this._ssn22.prop('title', this.removeTags(this._('ssnhelp.text')));
        this._ssn22.prop('maxLength', 1);
        this._ssn22.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn31));

        this._ssn31 = ssn31;
        this._ssn31.prop('title', this.removeTags(this._('ssnhelp.text')));
        this._ssn31.prop('maxLength', 1);
        this._ssn31.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn32));

        this._ssn32 = ssn32;
        this._ssn32.prop('title', this.removeTags(this._('ssnhelp.text')));
        this._ssn32.prop('maxLength', 1);
        this._ssn32.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn33));

        this._ssn33 = ssn33;
        this._ssn33.prop('title', this.removeTags(this._('ssnhelp.text')));
        this._ssn33.prop('maxLength', 1);
        this._ssn33.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn34));

        this._ssn34 = ssn34;
        this._ssn34.prop('title', this.removeTags(this._('ssnhelp.text')));
        this._ssn34.prop('maxLength', 1);
        this._ssn34.keypress(e =>
            this.numberFormat.test(String.fromCharCode(e.which)));

        this._ssnHelp = ssnHelp;
        this.renderHelpIcon(
            this._ssnHelp,
            this._('ssnhelp.caption'),
            dialog,
            this._('ssnhelp.text')
        );

        this._email = email;
        this._email.prop('title', this.removeTags(this._('emailhelp.text')));
        this._email.prop('maxLength', 60);
        this._email.keypress(e =>
            this.numberFormat.test(String.fromCharCode(e.which)));

        this._emailHelp = emailHelp;
        this.renderHelpIcon(
            this._emailHelp,
            this._('emailhelp.caption'),
            dialog,
            this._('emailhelp.text')
        );

        this._phone = phone;
        this._phone.prop('title', this.removeTags(this._('phonehelp.text')));
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
        this._citizen.prop('title', this.removeTags(this._('citizenhelp.text')));
        this._citizen.click(() => {
            this.selectCheckmark(this._citizen, arr);
            this.processLPR(this._citizen.prop('checked'));
            this.processAlien(this._citizen.prop('checked'));
            this._immigrationStatus.val(this._citizen.prop('checked') ? 1 : 0);

            this.filterCombolist(this._listADoc, {0:na});
            if (this._citizen.prop('checked')) {
                this.filterCombolist(this._listADoc, {0:na, 1:this._('uspassport'), 2:this._('uspassportcard')});
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
        this._national.prop('title', this.removeTags(this._('nationalhelp.text')));
        this._national.click(() => {
            this.selectCheckmark(this._national, arr);
            this.processLPR(this._national.prop('checked'));
            this.processAlien(this._national.prop('checked'));
            this._immigrationStatus.val(this._national.prop('checked') ? 2 : 0);
            this.filterCombolist(this._listADoc, {0:na});
            if (this._national.prop('checked')) {
                this.filterCombolist(this._listADoc, {0:na, 1:this._('uspassport'), 2:this._('uspassportcard')});
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
        this._lpr.prop('title', this.removeTags(this._('lprhelp.text')));
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

            this.filterCombolist(this._listADoc, {0:na});
            if (this._lpr.prop('checked')) {
                this.filterCombolist(this._listADoc, {
                    0:na,
                    3:this._('permanentresidentcard'),
                    4:this._('alienresidentcard'),
                    5:this._('foreignpassport'),
                    10:this._('I551I94receipt'),
                    12:this._('I551receipt')
                });
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

                this._admissionNum.prop('disabled', false);
                this._passportNum.prop('disabled', false);

                this._countryOfIssuance.prop('disabled', false);
            }

            this._immigrationStatus.val(this._alien.prop('checked') ? 4 : 0);

            this.filterCombolist(this._listADoc, [na], true);
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
                });
            }
        });

        this._lpruscisNumPrefix = lpruscisNumPrefix;

        this._lpruscisNum = lpruscisNum;
        this._lpruscisNum.prop('maxLength', 9);
        this._lpruscisNum.keypress(e =>
            this.numberFormat.test(String.fromCharCode(e.which)));

        this._lpruscisNumType = lpruscisNumType;
        this.assignCombolistEventHandler(this._lpruscisNumType, (e) => 
            this._lpruscisNumPrefix.val(e.target.getAttribute('value') === 'A' ? 'A' : ''));

        this._alienWorkAuthDate = alienWorkAuthDate;
        this._alienWorkAuthDate.datepicker();
        this._alienWorkAuthDate.unbind('keypress');
        this._alienWorkAuthDate.keypress((e) =>
            /[\d/]/g.test(String.fromCharCode(e.which)) ||
            this.NAFormat.test(String.fromCharCode(e.which))
        );

        this._alienuscisNum = alienuscisNum;
        this._alienuscisNum.prop('maxLength', 9);
        this._alienuscisNum.keypress(e =>
            this.numberFormat.test(String.fromCharCode(e.which)));
        this._alienuscisNum.blur(() => {
            if (this._alienuscisNum.val() !== '') {
                this.filterCombolist(this._alienuscisNumType, {'A':this._('aliennumber'), 'U':this._('uscisnumber')});

                this._admissionNum.val(na);
                this._passportNum.val(na);
                this.filterCombolist(this._countryOfIssuance, {0:na});
            }
            else {
                this.filterCombolist(this._alienuscisNumType, {});
                this._admissionNum.val('');
                this._passportNum.val('');
                this.filterCombolist(this._countryOfIssuance, {});
            }
        });

        this._alienuscisNumType = alienuscisNumType;

        this._admissionNum = admissionNum;
        this._admissionNum.prop('maxLength', 11);
        this._admissionNum.keypress(e =>
            this.numberFormat.test(String.fromCharCode(e.which)));
        this._admissionNum.blur(() => {
            if (this._admissionNum.val() !== '') {
                this._alienuscisNum.val(na);
                this.filterCombolist(this._alienuscisNumType, {0:na});

                this._passportNum.val(na);
                this.filterCombolist(this._countryOfIssuance, {0:na});
            }
            else {
                this._alienuscisNum.val('');
                this.filterCombolist(this._alienuscisNumType, {});
                this._passportNum.val('');
                this.filterCombolist(this._countryOfIssuance, {});
            }
        });

        // E-Verify requirements
        this._passportNum = passportNum;
        this._passportNum.prop('maxLength', 12);
        this._passportNum.blur(() => {
            if (this._passportNum.val() !== '') {
                this._alienuscisNum.val(na);
                this.filterCombolist(this._alienuscisNumType, {0:na});

                this._admissionNum.val(na);

                this.filterCombolist(this._countryOfIssuance, JSON.parse(this._('countries')));
            }
            else {
                this._alienuscisNum.val('');
                this.filterCombolist(this._alienuscisNumType, {});
                this._admissionNum.val('');
            }
        });

        this._countryOfIssuance = countryOfIssuance;

        this.processLPR(false);
        this.processAlien(false);
    }

    renderSection2(dialog,
        lastName, lastNameHelp, firstName, firstNameHelp,
        middleInitial, middleInitialHelp,
        immigrationStatus, immigrationStatusHelp,
        listADoc, listAIssuingAuthority, listBDoc, listCDoc) {

        dialog.dialog({
            autoOpen: false
        });

        this._lastNameSection2 = lastName;
        this._firstNameSection2 = firstName;
        this._middleInitialSection2 = middleInitial;
        this._immigrationStatus = immigrationStatus;

        this._listADoc = listADoc;
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

    removeTags(t) {
        var tags = [/<p>/g, /<\/p>/g, /<b>/g, /<\/b>/g, /<i>/g, /<\/i>/g, /<ol>/g, /<\/ol>/g, /<li>/g, /<\/li>/g, /<br \/>/g];
        for (var i in tags) {
            t = t.replace(tags[i], '');
        }

        return t;
    }

    selectCheckmark(ctrl, arr) {
        for (var c in arr) {
            if (arr[c] !== ctrl) {
                arr[c].prop('checked', false);
            }
        }

        return true;
    }

    filterCombolist(ctrl, items) {
        ctrl.val('');

        var options = ctrl.parent().children().filter('.combo-content');
        for (let index in items) {
            options.children().filter('[value="' + index + '"]').text(items[index]);
        }

        options.children().show();
        options.children().each((code) => {
            if (!(code in items)) {
                options.children().filter('[value="' + code + '"]').hide();
            }
        });

        options.children().on('click', e => {
            console.log(e);
            this.processListABC(
                e.parentNode.getElementsByTagName('input')[0].getAttribute('name'),
                e.target.getAttribute('value'));
        });
    }

    assignCombolistEventHandler(ctrl, f) {
        ctrl.parent().children().filter('.combo-content').click(f);
    }

    processListABC(ddl, code) {
        // 1 - U.S. Passport
        // 2 - U.S. Passport Card
        if (ddl === 'ListADocTitle' && code in [1, 2]) {
            this.filterCombolist();
        }
    }

    processLPR(flag) {
        var na = flag ? this._('NA') : '';
        this._lpruscisNumPrefix.val('');
        this._lpruscisNum.val(na);
        this._lpruscisNum.prop('disabled', true);
        this._lpruscisNumType.prop('disabled', true);

        this.filterCombolist(this._lpruscisNumType, flag ? {0:na} : {});
    }

    processAlien(flag) {
        var na = flag ? this._('NA') : '';
        this._alienWorkAuthDate.val(na);
        this._alienWorkAuthDate.prop('disabled', true);
        this._alienuscisNum.val(na);
        this._alienuscisNum.prop('disabled', true);
        this._alienuscisNumType.prop('disabled', true);
        this._admissionNum.val(na);
        this._admissionNum.prop('disabled', true);
        this._passportNum.val(na);
        this._passportNum.prop('disabled', true);
        this._countryOfIssuance.prop('disabled', true);

        this.filterCombolist(this._alienuscisNumType, flag ? {0:na} : {});
        this.filterCombolist(this._countryOfIssuance, flag ? {0:na} : {});
    }

    renderHelpIcon(ctrl, title, dialog, text) {
        ctrl.prop('title', title);
        ctrl.attr('icon', true);
        ctrl.val(String.fromCodePoint(0xFFFD));
        ctrl.toggleClass('noHighlight');
        ctrl.parent().click(() => {
            ctrl.blur();
            dialog.text('');
            dialog.append(text);
            dialog.dialog('open');
        });
    }
}

var form = new USI9();

document.addEventListener('pagerendered', function (e) {
    $(document).tooltip({
        position: {
            my: 'center bottom', // the "anchor point" in the tooltip element
            at: 'center top', // the position of that anchor point relative to selected element
        }
    });

    $.datepicker.setDefaults(
        $.extend(
            {'dateFormat':'mm/dd/yy'},
            $.datepicker.regional[form._('locale')]
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
            $('[name=LPRUSCISNumberPrefix]'),
            $('[name=LPRUSCISNumber]'),
            $('[name=LPRUSCISNumberType]'),
            $('[name=AlienWorkAuthorizationDate]'),
            $('[name=AlienUSCISNumber]'),
            $('[name=AlienUSCISNumberType]'),     
            $('[name=AdmissionNumber]'),
            $('[name=ForeignPassportNumber]'),
            $('[name=CountryOfIssuance]')
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
            $('[name=ListBDocTitle]'),
            $('[name=ListCDocTitle]')
        );
    }
}, true);
