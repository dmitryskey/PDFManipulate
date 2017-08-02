var $ = require(['jQuery', 'jQueryUI']);

class USI9 {
    get _() {
        return document.webL10n.get;
    }

    get States() {
        return ['AK', 'AL', 'AR', 'AS', 'AZ', 'CA',
            'CO', 'CT', 'DC', 'DE', 'FL', 'FM', 'GA', 'GU', 'HI', 
            'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD',
            'ME', 'MH', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT', 'NC',
            'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK',
            'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
            'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'];
    }

    constructor() {
        this.nameFormat = /^[A-Za-z ']+$/;
        this.zipFormat = /^[\d-]+$/;
        this.zipNumber = /^(\d{5})(-\d{4}){0,1}$/;
        this.dateFormat = /^\d{2}[/]{1}\d{2}[/]{1}\d{4}$/;
        this.numberFormat = /^\d{1}$/;
        this.phoneFormat = /^[\d \-()]+$/;
        this.phoneNumber = /^[(]{0,1}\d{3}[ )-]{0,1}\d{3}[ -]{0,1}\d{4}$/;
    }

    renderPage1(dialog,
        lastName, lastNameHelp, firstName, firstNameHelp,
        middleInitial, 
        otherNames, address, apptNumber, city,
        state, zip, dob, ssn11, ssn12, ssn13,
        ssn21, ssn22, ssn31, ssn32, ssn33, ssn34,
        email, phone, citizen, national, lpr, alien,
        lpruscisNum, lpruscisNumType, alienWorkAuthDate,
        alienuscisNum, alienuscisNumType, admissionNum,
        passportNum, countryOfIssuance) {

        dialog.dialog({
            autoOpen: false
        });

        // E-Verify requirements
        this._lastName = lastName;
        this._lastName.prop('maxLength', 40);
        this._lastName.keypress(e =>
            this.nameFormat.test(String.fromCharCode(e.which)));

        this._lastNameHelp = lastNameHelp;
        this.renderHelpIcon(
            this._lastNameHelp,
            this._('lastnamehelp.caption'),
            dialog,
            this._('lastnamehelp.text')
        );

        // E-Verify requirements
        this._firstName = firstName;
        this._firstName.prop('maxLength', 25);
        this._firstName.keypress(e =>
            this.nameFormat.test(String.fromCharCode(e.which)));

        this._firstNameHelp = firstNameHelp;
        this.renderHelpIcon(
            this._firstNameHelp,
            this._('firstnamehelp.caption'),
            dialog,
            this._('firstnamehelp.text')
        );

        // E-Verify requirements
        this._middleInitial = middleInitial;
        this._middleInitial.prop('maxLength', 1);
        this._middleInitial.keypress(e =>
            this.nameFormat.test(String.fromCharCode(e.which)));

        // E-Verify requirements
        this._otherNames = otherNames;
        this._otherNames.prop('maxLength', 40);
        this._otherNames.keypress(e =>
            this.nameFormat.test(String.fromCharCode(e.which)));

        this._address = address;
        this._apptNumber = apptNumber;
        this._city = city;

        this._state = state;
        this._state.empty();
        for (let stateCode of this.States) {
            this._state.append('<option>' + stateCode + '</option>');
        }

        this._zip = zip;
        this._zip.keypress(e =>
            this.zipFormat.test(String.fromCharCode(e.which)));

        // E-Verify requirements
        this._dob = dob;
        this._dob.datepicker();

        this._ssn11 = ssn11;
        this._ssn11.prop('maxLength', 1);
        this._ssn11.keypress(e => 
            this.autoFocus(e, this.numberFormat, 1, this._ssn12));

        this._ssn12 = ssn12;
        this._ssn12.prop('maxLength', 1);
        this._ssn12.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn13));

        this._ssn13 = ssn13;
        this._ssn13.prop('maxLength', 1);
        this._ssn13.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn21));

        this._ssn21 = ssn21;
        this._ssn21.prop('maxLength', 1);
        this._ssn21.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn22));
        
        this._ssn22 = ssn22;
        this._ssn22.prop('maxLength', 1);
        this._ssn22.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn31));

        this._ssn31 = ssn31;
        this._ssn31.prop('maxLength', 1);
        this._ssn31.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn32));

        this._ssn32 = ssn32;
        this._ssn32.prop('maxLength', 1);
        this._ssn32.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn33));

        this._ssn33 = ssn33;
        this._ssn33.prop('maxLength', 1);
        this._ssn33.keypress(e =>
            this.autoFocus(e, this.numberFormat, 1, this._ssn34));

        this._ssn34 = ssn34;
        this._ssn34.prop('maxLength', 1);
        this._ssn34.keypress(e =>
            this.numberFormat.test(String.fromCharCode(e.which)));

        this._email = email;
        this._email.prop('maxLength', 50);
        this._email.keypress(e =>
            this.numberFormat.test(String.fromCharCode(e.which)));

        this._phone = phone;
        this._phone.prop('maxLength', 13);
        this._phone.keypress(e =>
            this.phoneFormat.test(String.fromCharCode(e.which)));

        var arr = [citizen, national, lpr, alien];

        this._citizen = citizen;
        this._citizen.click(() => {
            this.selectCheckmark(this._citizen, arr);
            this.processLPR(this._citizen.prop('checked'));
            this.processAlien(this._citizen.prop('checked'));
        });

        this._national = national;
        this._national.click(() => {
            this.selectCheckmark(this._national, arr);
            this.processLPR(this._national.prop('checked'));
            this.processAlien(this._national.prop('checked'));
        });

        this._lpr = lpr;
        this._lpr.click(() => {
            this.selectCheckmark(this._lpr, arr);
            this.processAlien(this._lpr.prop('checked'));
        });

        this._alien = alien;
        this._alien.click(() => {
            this.selectCheckmark(this._alien, arr);
            this.processLPR(this._alien.prop('checked'));
            this._countryOfIssuance.empty();
            var countries = JSON.parse(this._('countries'));
            for (var c in countries) {
                this._countryOfIssuance.append('<option value="' + c + '">' + countries[c] + '</option>');
            }
        });

        this._lpruscisNum = lpruscisNum;
        this._lpruscisNumType = lpruscisNumType;
        this._alienWorkAuthDate = alienWorkAuthDate;
        this._alienuscisNum = alienuscisNum;
        this._alienuscisNumType = alienuscisNumType;

        this._admissionNum = admissionNum;
        this._passportNum = passportNum;
        this._countryOfIssuance = countryOfIssuance;
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

    processLPR(flag) {
        var na = this._('NA');
        if (flag) {
            this._lpruscisNum.val(na);
            this._lpruscisNumType.empty();
            this._lpruscisNumType.append('<option>' + na + '</option>');
        }
        else {
            this._lpruscisNum.val('');
            this._lpruscisNumType.empty();
        }
    }

    processAlien(flag) {
        if (flag) {
            var na = this._('NA');
            this._alienWorkAuthDate.val(na);
            this._alienuscisNum.val(na);
            this._alienuscisNumType.empty();
            this._alienuscisNumType.append('<option>' + na + '</option>');
            this._admissionNum.val(na);
            this._passportNum.val(na);
            this._countryOfIssuance.empty();
            this._countryOfIssuance.append('<option>' + na + '</option>');
        }
        else {
            this._alienWorkAuthDate.val('');
            this._alienuscisNum.val('');
            this._alienuscisNumType.empty();
            this._admissionNum.val('');
            this._passportNum.val('');
            this._countryOfIssuance.empty();
        }
    }

    renderHelpIcon(ctrl, title, dialog, text) {
        ctrl.prop('disabled', true);
        ctrl.prop('title', title);
        ctrl.val(String.fromCodePoint(0xFFFD));
        ctrl.parent().toggleClass('noHighlight');
        ctrl.parent().click(() => {
            dialog.text('');
            dialog.append(text);
            dialog.dialog('open');
        });
    }
}

var form = new USI9();

document.addEventListener('pagerendered', function (e) {
    if (e.detail.pageNumber === 1) {
        $('body').append('<div id="dialogPage' + e.detail.pageNumber + '"></div>');
        $(document).tooltip();

        form.renderPage1(
            $('#dialogPage' + e.detail.pageNumber),
            $('[name=LastName]'),
            $('[name=LastNameHelp]'),
            $('[name=FirstName]'),
            $('[name=FirstNameHelp]'),
            $('[name=MiddleInitial]'),
            $('[name=OtherNames]'),
            $('[name=Address]'),
            $('[name=AppartmentNumber]'),
            $('[name=City]'),
            $('[name=State]'),
            $('[name=Zip]'),
            $('[name=DateOfBirth]'),
            $('[name=SSN11]'),
            $('[name=SSN12]'),
            $('[name=SSN13]'),
            $('[name=SSN21]'),
            $('[name=SSN22]'),
            $('[name=SSN31]'),
            $('[name=SSN32]'),
            $('[name=SSN33]'),
            $('[name=SSN34]'),
            $('[name=EmailAddress]'),
            $('[name=PhoneNumber]'),
            $('[name=Citizen]'),
            $('[name=NonCitizenNational]'),
            $('[name=LawfulPermanentResident]'),
            $('[name=AlienAuthorizedToWork]'),
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
}, true);
