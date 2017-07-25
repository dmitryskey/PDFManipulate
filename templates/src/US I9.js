var $ = require('jQuery');

class USI9 {
    constructor(lastName, firstName, middleInitial, 
        otherNames, address, apptNumber, dob, city,
        state, zip) {
        const nameFormat = /^[^A-Za-z ']+$/;
        const dateFormat = /^[^0-9/.]+$/;
        const zipFormat = /^[^0-9-]+$/;

        // E-Verify requirements
        this._lastName = lastName;
        this._lastName.prop('maxLength', 40);
        this._lastName.keypress(e =>
            String.fromCharCode(e.which).match(nameFormat));

        // E-Verify requirements
        this._firstName = firstName;
        this._firstName.prop('maxLength', 25);
        this._firstName.keypress(e =>
            String.fromCharCode(e.which).match(nameFormat));

        // E-Verify requirements
        this._middleInitial = middleInitial;
        this._middleInitial.prop('maxLength', 1);
        this._middleInitial.keypress(e =>
            String.fromCharCode(e.which).match(nameFormat));

        // E-Verify requirements
        this._otherNames = otherNames;
        this._otherNames.prop('maxLength', 40);
        this._otherNames.keypress(e =>
            String.fromCharCode(e.which).match(nameFormat));

        this._address = address;
        this._apptNumber = apptNumber;
        this._city = city;

        var stateCodes = ['AK', 'AL', 'AR', 'AS', 'AZ', 'CA',
            'CO', 'CT', 'DC', 'DE', 'FL', 'FM', 'GA', 'GU', 'HI', 
            'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD',
            'ME', 'MH', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT', 'NC',
            'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK',
            'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
            'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'];
        this._state = state;
        for (let stateCode of stateCodes) {
            this._state.append('<option>' + stateCode + '</option>');
        }

        this._zip = zip;
        this._zip.keypress(e =>
            String.fromCharCode(e.which).match(zipFormat));

        // E-Verify requirements
        this._dob = dob;
        this._dob.keypress(e =>
            String.fromCharCode(e.which).match(dateFormat));
        this._dob.datepicker();
    }

    validateFields() {
        const dateFormat = /^[\d{1,2}[/.]{1}\d{1,2}[/.]{1}\d{4}]+$/;

        var errorMessage = '';

        if (this._lastName.val() === '') {
            errorMessage += '- Please enter the First Name\r\n';
        }

        if (this._dob.val() === '' || !this._dob.val().match(dateFormat)) {
            errorMessage += '- Please enter the Date of Birth in the format mm/dd/yyyy\r\n';
        }

        if (errorMessage !== '') {
            alert(errorMessage);
            return false;
        } else {
            return true;
        }
    }
}

$(document).ready(() => {
    var form = new USI9(
        $('[name=LastName]'),
        $('[name=FirstName]'),
        $('[name=MiddleInitial]'),
        $('[name=OtherNames]'),
        $('[name=Address]'),
        $('[name=AppartmentNumber]'),
        $('[name=City]'),
        $('[name=State]'),
        $('[name=Zip]'),
        $('[name=DateOfBirth]'));
});
