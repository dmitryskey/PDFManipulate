/// <reference path="Fields.ts" />

class USI9Section1 extends USI9Fields {
    private renderNameAndAddress(
        dialog: JQuery<HTMLElement>,
        lastName: JQuery<HTMLElement>,
        lastNameHelp: JQuery<HTMLElement>,
        firstName: JQuery<HTMLElement>,
        firstNameHelp: JQuery<HTMLElement>,
        middleInitial: JQuery<HTMLElement>,
        middleInitialHelp: JQuery<HTMLElement>,
        otherNames: JQuery<HTMLElement>,
        otherNamesHelp: JQuery<HTMLElement>,
        address: JQuery<HTMLElement>,
        addressHelp: JQuery<HTMLElement>,
        apptNumber: JQuery<HTMLElement>,
        apptNumberHelp: JQuery<HTMLElement>,
        city: JQuery<HTMLElement>,
        cityHelp: JQuery<HTMLElement>,
        state: JQuery<HTMLElement>,
        stateHelp: JQuery<HTMLElement>,
        zip: JQuery<HTMLElement>,
        zipHelp: JQuery<HTMLElement>) {

        this._lastName = this.renderControl(lastName, this._('lastnamehelp.tooltip'))
        .keypress(e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode);

        this._lastNameHelp = this.renderHelpIcon(
            lastNameHelp,
            this._('lastnamehelp.caption'),
            dialog,
            this._('lastnamehelp.text')
        );

        this._firstName = this.renderControl(firstName, this._('firstnamehelp.tooltip'))
        .keypress(e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode);

        this._firstNameHelp = this.renderHelpIcon(
            firstNameHelp,
            this._('firstnamehelp.caption'),
            dialog,
            this._('firstnamehelp.text')
        );

        // N/A option
        this._middleInitial = this.renderControl(middleInitial, this._('middleinitialhelp.tooltip'))
        .keypress(e =>
            this.nameFormat.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode);

        this._middleInitialHelp = this.renderHelpIcon(
            middleInitialHelp,
            this._('middleinitialhelp.caption'),
            dialog,
            this._('middleinitialhelp.text')
        );

        this._otherNames = this.renderControl(otherNames,this._('othernameshelp.tooltip'))
        .keypress(e =>
            this.nameFormat.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode);

        this._otherNamesHelp = this.renderHelpIcon(
            otherNamesHelp,
            this._('othernameshelp.caption'),
            dialog,
            this._('othernameshelp.text')
        );

        this._address = this.renderControl(address, this._('addresshelp.tooltip'));

        this._addressHelp = this.renderHelpIcon(
            addressHelp,
            this._('addresshelp.caption'),
            dialog,
            this._('addresshelp.text')
        );

        this._apptNumber = this.renderControl(apptNumber,this._('apartmentnumberhelp.tooltip'));

        this._apptNumberHelp = this.renderHelpIcon(
            apptNumberHelp,
            this._('apartmentnumberhelp.caption'),
            dialog,
            this._('apartmentnumberhelp.text')
        );

        this._city = this.renderControl(city, this._('cityhelp.tooltip'));

        this._cityHelp = this.renderHelpIcon(
            cityHelp,
            this._('cityhelp.caption'),
            dialog,
            this._('cityhelp.text')
        );

        this._state = state
        .focus(e => {
            $(e.target).tooltip('close');

            let nonUSCountries = ['CAN', 'MEX'];

            let zipCode = nonUSCountries.indexOf((e.currentTarget as HTMLInputElement).value) < 0;
            this._zip.unbind('keypress');
            this._zip.keypress(e => {
                return ((nonUSCountries.indexOf(this._state.val() as string) < 0
                  ? this.zipFormat : this.postalFormat).test(e.key) || e.key === this.backSpaceCode)
            });

            this._zip.prop('maxLength', zipCode ? 5 : 6);
        })
        .prop('title', '').attr(this.annotationRequired, 'true')
        .tooltip({ content: this._('statehelp.tooltip') })

        this.setCombolistText(this._state, this.space, this.blankItem);

        this._stateHelp = this.renderHelpIcon(
            stateHelp,
            this._('statehelp.caption'),
            dialog,
            this._('statehelp.text')
        );

        this._zip = this.renderControl(zip, this._('ziphelp.tooltip'))
        .keypress(e => this.zipFormat.test(e.key) || e.key === this.backSpaceCode);

        this._zipHelp = this.renderHelpIcon(
            zipHelp,
            this._('ziphelp.caption'),
            dialog,
            this._('ziphelp.text')
        );
    }

    private renderSSNFields(ssn : JQuery<HTMLElement>[]) {
        this._ssn = ssn;
        for (let i = 0; i < ssn.length - 1; i++) {
            this._ssn[i]
            .attr(this.annotationNext, (this._ssn[i + 1]).attr(this.annotationName))
            .focus(e => $(e.target).tooltip('close')).prop('title', '')
            .tooltip({ content: this._('ssnhelp.tooltip') })
            .keypress(e => {
                if (this.numberFormat.test(e.key)) {
                    $('[' + this.annotationName + '=' + $(e.target).attr(this.annotationNext) + ']').focus();
                    return true;
                }
                else {
                    return e.key === this.backSpaceCode;
                }
            }).keydown((e) => {
                if (e.keyCode === 8) {
                    $('[' + this.annotationNext + '=' + $(e.target).attr(this.annotationName) + ']').focus();
                }
            });
        }

        this.renderControl(this._ssn[ssn.length - 1], this._('ssnhelp.tooltip'))
        .keypress(e => this.numberFormat.test(e.key) || e.key === this.backSpaceCode);
    }

    private renderPersonalData(
        dialog: JQuery<HTMLElement>,
        dob: JQuery<HTMLElement>,
        dobHelp: JQuery<HTMLElement>,
        ssn11: JQuery<HTMLElement>,
        ssn12: JQuery<HTMLElement>,
        ssn13: JQuery<HTMLElement>,
        ssn21: JQuery<HTMLElement>,
        ssn22: JQuery<HTMLElement>,
        ssn31: JQuery<HTMLElement>,
        ssn32: JQuery<HTMLElement>,
        ssn33: JQuery<HTMLElement>,
        ssn34: JQuery<HTMLElement>,
        ssnHelp: JQuery<HTMLElement>,
        email: JQuery<HTMLElement>,
        emailHelp: JQuery<HTMLElement>,
        phone: JQuery<HTMLElement>,
        phoneHelp: JQuery<HTMLElement>) {

        let maxDOB = new Date();
        maxDOB.setFullYear(maxDOB.getFullYear() - 14);

        // E-Verify requirements
        this._dob = this.renderControl(dob, this._('dobhelp.tooltip'))
        .datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1908:' + maxDOB.getFullYear(),
            maxDate: maxDOB}).attr('autocomplete', 'false');

        this._dobHelp = this.renderHelpIcon(
            dobHelp,
            this._('dobhelp.caption'),
            dialog,
            this._('dobhelp.text')
        );

        this.renderSSNFields([ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34])

        this._ssnHelp = this.renderHelpIcon(
            ssnHelp,
            this._('ssnhelp.caption'),
            dialog,
            this._('ssnhelp.text'),
            400
        );

        this._email = this.renderControl(email, this._('emailhelp.tooltip'))

        this._emailHelp = this.renderHelpIcon(
            emailHelp,
            this._('emailhelp.caption'),
            dialog,
            this._('emailhelp.text')
        );
    
        this._phone = this.renderControl(phone, this._('phonehelp.tooltip'))
        .keypress(e => this.phoneFormat.test(e.key) || e.key === this.backSpaceCode);
    
        this._phoneHelp = this.renderHelpIcon(
            phoneHelp,
            this._('phonehelp.caption'),
            dialog,
            this._('phonehelp.text')
        ); 
    }

    private renderCitizenship(
        dialog: JQuery<HTMLElement>,
        citizen: JQuery<HTMLElement>,
        citizenHelp: JQuery<HTMLElement>,
        national: JQuery<HTMLElement>,
        nationalHelp: JQuery<HTMLElement>,
        lpr: JQuery<HTMLElement>,
        lprHelp: JQuery<HTMLElement>,
        alien: JQuery<HTMLElement>,
        alienHelp: JQuery<HTMLElement>,
        uscisNumberHelp: JQuery<HTMLElement>,
        lpruscisNumPrefix: JQuery<HTMLElement>,
        lpruscisNum: JQuery<HTMLElement>,
        lpruscisNumType: JQuery<HTMLElement>,
        alienWorkAuthDate: JQuery<HTMLElement>,
        alienuscisNumPrefix: JQuery<HTMLElement>,
        alienuscisNum: JQuery<HTMLElement>,
        alienuscisNumType: JQuery<HTMLElement>,
        admissionNum: JQuery<HTMLElement>,
        admissionNumHelp: JQuery<HTMLElement>,
        passportNum: JQuery<HTMLElement>,
        passportNumHelp: JQuery<HTMLElement>,
        countryOfIssuance: JQuery<HTMLElement>,
        countryOfIssuanceHelp: JQuery<HTMLElement>,
        sgnEmployee: JQuery<HTMLElement>,
        sgnEmployeeHelp: JQuery<HTMLElement>,
        sgnEmployeeDate: JQuery<HTMLElement>,
        sgnEmployeeDateHelp: JQuery<HTMLElement>) {

        this._citizen = this.renderControl(citizen, this._('citizenhelp.tooltip'));

        this._citizenHelp = this.renderHelpIcon(
            citizenHelp,
            this._('citizenhelp.caption'),
            dialog,
            this._('citizenhelp.text')
        );

        this._national = this.renderControl(national, this._('nationalhelp.tooltip'));

        this._nationalHelp = this.renderHelpIcon(
            nationalHelp,
            this._('nationalhelp.caption'),
            dialog,
            this._('nationalhelp.text')
        );
    
        this._lpr = this.renderControl(lpr, this._('lprhelp.tooltip'));
    
        this._lprHelp = this.renderHelpIcon(
            lprHelp,
            this._('lprhelp.caption'),
            dialog,
            this._('lprhelp.text')
        );
    
        this._alien = this.renderControl(alien, this._('alienhelp.tooltip'));
    
        this._alienHelp = this.renderHelpIcon(
            alienHelp,
            this._('alienhelp.caption'),
            dialog,
            this._('alienhelp.text'),
            500
        );
    
        this._uscisNumberHelp = this.renderHelpIcon(
            uscisNumberHelp,
            this._('uscisnumberhelp.caption'),
            dialog,
            this._('uscisnumberhelp.text')
        );
    
        this._lpruscisNumPrefix = lpruscisNumPrefix;
    
        this._lpruscisNum = this.renderControl(lpruscisNum, this._('uscisnumber.tooltip'))
        .keypress(e => this.numberFormat.test(e.key) || e.key === this.backSpaceCode);
    
        this._lpruscisNumType = this.renderControl(lpruscisNumType, this._('uscisnumbertype.tooltip'));

        this.assignCombolistEventHandler(this._lpruscisNumType, (e: JQuery.Event) => 
            this._lpruscisNumPrefix.val((e.target as HTMLElement).getAttribute('value') === 'A' ? 'A' : ''));
    
        this._alienWorkAuthDate = this.renderControl(alienWorkAuthDate, this._('alienworkauthdate.tooltip'))
        .datepicker({ changeMonth: true, changeYear: true, minDate: new Date() }).attr('autocomplete', 'false')
        .unbind('keypress')
        .keypress(e =>
            /[\d/]/g.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode
        );
    
        this._alienuscisNumPrefix = alienuscisNumPrefix;
    
        this._alienuscisNum = this.renderControl(alienuscisNum, this._('uscisnumber.tooltip'))
        .keypress(e => this.numberFormat.test(e.key) || e.key === this.backSpaceCode);
    
        this._alienuscisNumType = this.renderControl(alienuscisNumType, this._('uscisnumbertype.tooltip'));

        this.assignCombolistEventHandler(this._alienuscisNumType, (e: JQuery.Event) => 
            this._alienuscisNumPrefix.val((e.target as HTMLElement).getAttribute('value') === 'A' ? 'A' : ''));
    
        this._admissionNum = this.renderControl(admissionNum, this._('admissionnumber.tooltip'))
        .keypress(e => this.numberFormat.test(e.key) || e.key === this.backSpaceCode);
    
        this._admissionNumHelp = this.renderHelpIcon(
            admissionNumHelp,
            this._('admissionnumberhelp.caption'),
            dialog,
            this._('admissionnumberhelp.text')
        );
    
        this._passportNum = this.renderControl(passportNum, this._('passportnumber.tooltip'));

        this._passportNumHelp = this.renderHelpIcon(
            passportNumHelp,
            this._('passportnumberhelp.caption'),
            dialog,
            this._('passportnumberhelp.text')
        );

        this._countryOfIssuance = this.renderControl(countryOfIssuance, this._('coi.tooltip'));

        this._countryOfIssuanceHelp = this.renderHelpIcon(
            countryOfIssuanceHelp,
            this._('coihelp.caption'),
            dialog,
            this._('coihelp.text')
        );

        this._sgnEmployee = this.renderControl(sgnEmployee, this._('sgnemployee.tooltip'));
  
        this._sgnEmployeeHelp = this.renderHelpIcon(
            sgnEmployeeHelp,
            this._('sgnemployeehelp.caption'),
            dialog,
            this._('sgnemployeehelp.text'),
            700);
    
        this._sgnEmployeeDate = this.renderControl(sgnEmployeeDate, this._('employeedate.tooltip'))
        .datepicker({ minDate: new Date() }).attr('autocomplete', 'false');

        this._sgnEmployeeDateHelp = this.renderHelpIcon(
            sgnEmployeeDateHelp,
            this._('employeedatehelp.caption'),
            dialog,
            this._('employeedatehelp.text'));  
    }

    protected renderSection1(
        dialog: JQuery<HTMLElement>,
        lastName: JQuery<HTMLElement>,
        lastNameHelp: JQuery<HTMLElement>,
        firstName: JQuery<HTMLElement>,
        firstNameHelp: JQuery<HTMLElement>,
        middleInitial: JQuery<HTMLElement>,
        middleInitialHelp: JQuery<HTMLElement>,
        otherNames: JQuery<HTMLElement>,
        otherNamesHelp: JQuery<HTMLElement>,
        address: JQuery<HTMLElement>,
        addressHelp: JQuery<HTMLElement>,
        apptNumber: JQuery<HTMLElement>,
        apptNumberHelp: JQuery<HTMLElement>,
        city: JQuery<HTMLElement>,
        cityHelp: JQuery<HTMLElement>,
        state: JQuery<HTMLElement>,
        stateHelp: JQuery<HTMLElement>,
        zip: JQuery<HTMLElement>,
        zipHelp: JQuery<HTMLElement>,
        dob: JQuery<HTMLElement>,
        dobHelp: JQuery<HTMLElement>,
        ssn11: JQuery<HTMLElement>,
        ssn12: JQuery<HTMLElement>,
        ssn13: JQuery<HTMLElement>,
        ssn21: JQuery<HTMLElement>,
        ssn22: JQuery<HTMLElement>,
        ssn31: JQuery<HTMLElement>,
        ssn32: JQuery<HTMLElement>,
        ssn33: JQuery<HTMLElement>,
        ssn34: JQuery<HTMLElement>,
        ssnHelp: JQuery<HTMLElement>,
        email: JQuery<HTMLElement>,
        emailHelp: JQuery<HTMLElement>,
        phone: JQuery<HTMLElement>,
        phoneHelp: JQuery<HTMLElement>,
        citizen: JQuery<HTMLElement>,
        citizenHelp: JQuery<HTMLElement>,
        national: JQuery<HTMLElement>,
        nationalHelp: JQuery<HTMLElement>,
        lpr: JQuery<HTMLElement>,
        lprHelp: JQuery<HTMLElement>,
        alien: JQuery<HTMLElement>,
        alienHelp: JQuery<HTMLElement>,
        uscisNumberHelp: JQuery<HTMLElement>,
        lpruscisNumPrefix: JQuery<HTMLElement>,
        lpruscisNum: JQuery<HTMLElement>,
        lpruscisNumType: JQuery<HTMLElement>,
        alienWorkAuthDate: JQuery<HTMLElement>,
        alienuscisNumPrefix: JQuery<HTMLElement>,
        alienuscisNum: JQuery<HTMLElement>,
        alienuscisNumType: JQuery<HTMLElement>,
        admissionNum: JQuery<HTMLElement>,
        admissionNumHelp: JQuery<HTMLElement>,
        passportNum: JQuery<HTMLElement>,
        passportNumHelp: JQuery<HTMLElement>,
        countryOfIssuance: JQuery<HTMLElement>,
        countryOfIssuanceHelp: JQuery<HTMLElement>,
        sgnEmployee: JQuery<HTMLElement>,
        sgnEmployeeHelp: JQuery<HTMLElement>,
        sgnEmployeeDate: JQuery<HTMLElement>,
        sgnEmployeeDateHelp: JQuery<HTMLElement>) {

        $('a').prop('target', '_blank');

        this.renderNameAndAddress(dialog,
            lastName, lastNameHelp, firstName, firstNameHelp,
            middleInitial, middleInitialHelp,
            otherNames, otherNamesHelp,
            address, addressHelp, apptNumber, apptNumberHelp,
            city, cityHelp, state, stateHelp, zip, zipHelp);

        this.renderPersonalData(dialog,
            dob, dobHelp,
            ssn11, ssn12, ssn13, ssn21, ssn22, ssn31,
            ssn32, ssn33, ssn34, ssnHelp,
            email, emailHelp, phone, phoneHelp);

        this.renderCitizenship(dialog,
            citizen, citizenHelp, national, nationalHelp,
            lpr, lprHelp, alien, alienHelp, uscisNumberHelp,
            lpruscisNumPrefix, lpruscisNum, lpruscisNumType,
            alienWorkAuthDate, alienuscisNumPrefix, alienuscisNum, alienuscisNumType,
            admissionNum, admissionNumHelp, passportNum, passportNumHelp,
            countryOfIssuance, countryOfIssuanceHelp,
            sgnEmployee, sgnEmployeeHelp,
            sgnEmployeeDate, sgnEmployeeDateHelp);
    }

    protected validateFields(): string[] {
        let errorMessages: string[] = [];

        // Put N/A if required
        [this._middleInitial, this._otherNames, this._apptNumber, this._email, this._phone]
           .filter(f => (f.val() as string).trim() === '').forEach(f => f.val(this.na));

        this.validateTextField(this._lastName, this._('name.last'), [this.nameFormat], false, errorMessages);
        this.validateTextField(this._firstName, this._('name.first'), [this.nameFormat], false, errorMessages);
        this.validateTextField(this._middleInitial, this._('name.middleinitial'), [this.nameInitialFormat, this.NAString], false, errorMessages);
        this.validateTextField(this._otherNames, this._('name.othernames'), [this.nameFormat, this.NAString], false, errorMessages);
        this.validateTextField(this._address, this._('address.address'), [], false, errorMessages);
        this.validateTextField(this._apptNumber, this._('address.appartment'), [this.NAString], false, errorMessages);
        this.validateTextField(this._city, this._('address.city'), [], false, errorMessages);
        this.validateTextField(this._state, this._('address.state'), [this.stateFormat], false, errorMessages);
        this.validateTextField(this._zip, this._('address.zip'),
            [['CAN', 'MEX'].indexOf(this._state.val() as string) < 0 ? this.zipNumberFormat: this.postalCodeFormat], false, errorMessages);
        this.validateTextField(this._dob, this._('date.dob'), [this.dateFormat], true, errorMessages);

        let areaCode = Math.round(100 * (this._ssn[0].val() as number) +
                                  10 * (this._ssn[1].val() as number) +
                                  1 * (this._ssn[2].val() as number));

        this._ssn.forEach(field => field.toggleClass(this.invalidFieldClass, false));
        if (this._ssn.filter(element => element.val() !== '').length > 0) {
            if (this._ssn.filter(element => element.val() === '').length > 0) {
                errorMessages.push(this._('ssn.allfields'));
                this._ssn.forEach(field => field.toggleClass(this.invalidFieldClass, true));
            }
            else if (this._ssn.filter(element => !this.numberFormat.test(element.val() as string)).length > 0) {
                errorMessages.push(this._('ssn.allnumeric'));
                this._ssn.filter(element => !this.numberFormat.test(element.val() as string)).forEach(
                    field => field.toggleClass(this.invalidFieldClass, true));
            }
            else if (areaCode === 0 || areaCode === 666 || areaCode > 899) {
                errorMessages.push(this._('ssn.areanumber'));
                [this._ssn[0], this._ssn[1], this._ssn[2]].forEach(
                    field => field.toggleClass(this.invalidFieldClass, true));
            }
            else if (Math.round(10 * (this._ssn[3].val() as number) + 1 * (this._ssn[4].val() as number)) === 0) {
                errorMessages.push(this._('ssn.groupnumber'));
                [this._ssn[3], this._ssn[4]].forEach(
                    field => field.toggleClass(this.invalidFieldClass, true));
            }
            else if (Math.round(1000 * (this._ssn[5].val() as number) +
                                100 * (this._ssn[6].val() as number) +
                                10 * (this._ssn[7].val() as number) +
                                1 * (this._ssn[8].val() as number)) === 0) {
                errorMessages.push(this._('ssn.serialnumber'));
                [this._ssn[5], this._ssn[6], this._ssn[7], this._ssn[8]].forEach(
                    field => field.toggleClass(this.invalidFieldClass, true));
            }
        }

        this.validateTextField(this._email, this._('email.address'), [this.NAString, this.emailFormat], false, errorMessages);
        this.validateTextField(this._phone, this._('employee.phone'), [this.NAString, this.phoneNumber], false, errorMessages);

        let citizenship = [this._citizen, this._national, this._lpr, this._alien];
        let statusSelected = citizenship.filter(status => status.prop('checked')).length > 0;
        if (!statusSelected) {
            errorMessages.push(this._('citizenship.status'));
        }

        citizenship.forEach(status => status.toggleClass(this.invalidFieldClass, !statusSelected));

        if (this._lpr.prop('checked')) {
            this._lpruscisNum.attr(this.annotationRequired, 'true');
            this.validateTextField(this._lpruscisNum, this._('citizenship.uscis'), [this.uscisNumberFormat], true, errorMessages);
        } else {
            this._lpruscisNum.removeAttr(this.annotationRequired);
        }

        if (this._alien.prop('checked')) {
            this._alienWorkAuthDate.attr(this.annotationRequired, 'true');
            this.validateTextField(
                this._alienWorkAuthDate,
                this._('citizenship.alienworkauthdate'),
                [this.NAString, this.dateFormat],
                true,
                errorMessages);

            [this._alienuscisNum, this._admissionNum, this._passportNum, this._countryOfIssuance].forEach(field =>
                field.toggleClass(this.invalidFieldClass, false));
            
            this.validateTextField(this._alienuscisNum, this._('citizenship.uscis'), [this.NAFormat, this.uscisNumberFormat], false, errorMessages);
            this.validateTextField(this._admissionNum, this._('citizenship.admission'), [this.NAFormat, this.admissionNumberFormat], false, errorMessages);
            this.validateTextField(this._passportNum, this._('citizenship.passport'), [this.NAFormat, this.passportNumberFormat], false, errorMessages);
            
            if (this.EmptyOrNA(this._alienuscisNum) && this.EmptyOrNA(this._admissionNum) &&
                this.EmptyOrNA(this._passportNum) && this.EmptyOrNA(this._countryOfIssuance)) {
                [this._alienuscisNum, this._admissionNum, this._passportNum, this._countryOfIssuance].forEach(field =>
                    field.toggleClass(this.invalidFieldClass, true));

                errorMessages.push(this.paramExistsMsg.replace('${parameter}', this._('citizenship.alienadmissionpassport')));
            } else if (this.EmptyOrNA(this._alienuscisNum) && this.EmptyOrNA(this._admissionNum) &&
               (this.EmptyOrNA(this._passportNum) || this.EmptyOrNA(this._countryOfIssuance))) {
                [this._passportNum, this._countryOfIssuance].forEach(field =>
                field.toggleClass(this.invalidFieldClass, true));

                errorMessages.push(this.paramExistsMsg.replace('${parameter}', this._('citizenship.passportcountry')));
            }
        } else {
            this._alienWorkAuthDate.removeAttr(this.annotationRequired);
        }

        this.validateTextField(this._sgnEmployeeDate, this._('date.sgnemployee'), [this.dateFormat], true, errorMessages);

        return errorMessages;
    }

    protected EmptyOrNA(field: JQuery<HTMLElement>) : boolean {
        return [null, '', this.na].indexOf(field.val() as string) >= 0;
    }
}