/// <reference path="Fields.ts" />

class USI9Section1 extends USI9Fields {
    private renderNameAndAddress(
        tabIndex: number,
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
        .keypress(e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode)
        .attr('tabindex', tabIndex++);

        this._lastNameHelp = this.renderHelpIcon(
            lastNameHelp,
            this._('lastnamehelp.caption'),
            this._('lastnamehelp.text')
        );

        this._firstName = this.renderControl(firstName, this._('firstnamehelp.tooltip'))
        .keypress(e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode)
        .attr('tabindex', tabIndex++);

        this._firstNameHelp = this.renderHelpIcon(
            firstNameHelp,
            this._('firstnamehelp.caption'),
            this._('firstnamehelp.text')
        );

        // N/A option
        this._middleInitial = this.renderControl(middleInitial, this._('middleinitialhelp.tooltip'))
        .keypress(e => this.nameFormat.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode)
        .attr('tabindex', tabIndex++);

        this._middleInitialHelp = this.renderHelpIcon(
            middleInitialHelp,
            this._('middleinitialhelp.caption'),
            this._('middleinitialhelp.text')
        );

        this._otherNames = this.renderControl(otherNames,this._('othernameshelp.tooltip'))
        .keypress(e => this.nameFormat.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode)
        .attr('tabindex', tabIndex++);

        this._otherNamesHelp = this.renderHelpIcon(
            otherNamesHelp,
            this._('othernameshelp.caption'),
            this._('othernameshelp.text')
        );

        this._address = this.renderControl(address, this._('addresshelp.tooltip'))
        .attr('tabindex', tabIndex++);

        this._addressHelp = this.renderHelpIcon(
            addressHelp,
            this._('addresshelp.caption'),
            this._('addresshelp.text')
        );

        this._apptNumber = this.renderControl(apptNumber,this._('apartmentnumberhelp.tooltip'))
        .attr('tabindex', tabIndex++);

        this._apptNumberHelp = this.renderHelpIcon(
            apptNumberHelp,
            this._('apartmentnumberhelp.caption'),
            this._('apartmentnumberhelp.text')
        );

        this._city = this.renderControl(city, this._('cityhelp.tooltip'))
        .attr('tabindex', tabIndex++);

        this._cityHelp = this.renderHelpIcon(
            cityHelp,
            this._('cityhelp.caption'),
            this._('cityhelp.text')
        );

        this._state = this.renderControl(state, this._('statehelp.tooltip'))
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
        .attr(this.annotationRequired, 'true')
        .attr('tabindex', tabIndex++);

        this.setCombolistText(this._state, this.space, this.blankItem);

        this._stateHelp = this.renderHelpIcon(
            stateHelp,
            this._('statehelp.caption'),
            this._('statehelp.text')
        );

        this._zip = this.renderControl(zip, this._('ziphelp.tooltip'))
        .keypress(e => this.zipFormat.test(e.key) || e.key === this.backSpaceCode)
        .attr('tabindex', tabIndex++);

        this._zipHelp = this.renderHelpIcon(
            zipHelp,
            this._('ziphelp.caption'),
            this._('ziphelp.text')
        );

        return tabIndex;
    }

    private renderSSNFields(ssn : JQuery<HTMLElement>[], tabIndex: number) {
        this._ssn = ssn;
        for (let i = 0; i < ssn.length - 1; i++) {
            this._ssn[i]
            .attr(this.annotationNext, (this._ssn[i + 1]).attr(this.annotationName))
            .popover({ html: true, content: this._('ssnhelp.tooltip'), trigger: 'focus' })
            .keypress(e => {
                if (this.numberFormat.test(e.key)) {
                    $(`['${this.annotationName}'='${$(e.target).attr(this.annotationNext)}']`).focus();
                    return true;
                }
                else {
                    return e.key === this.backSpaceCode;
                }
            }).keydown((e) => {
                if (e.keyCode === 8) {
                    $(`['${this.annotationNext}'='${$(e.target).attr(this.annotationName)}']`).focus();
                }
            })
            .attr('tabindex', tabIndex++);
        }

        this.renderControl(this._ssn[ssn.length - 1], this._('ssnhelp.tooltip'))
        .keypress(e => this.numberFormat.test(e.key) || e.key === this.backSpaceCode)
        .attr('tabindex', tabIndex++);

        return tabIndex;
    }

    private renderPersonalData(
        tabIndex: number,
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
            yearRange: `1908:${maxDOB.getFullYear()}`,
            maxDate: maxDOB}).attr('autocomplete', 'disabled')
        .attr('tabindex', tabIndex++);

        this._dobHelp = this.renderHelpIcon(
            dobHelp,
            this._('dobhelp.caption'),
            this._('dobhelp.text')
        );

        tabIndex = this.renderSSNFields([ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34], tabIndex);

        this._ssnHelp = this.renderHelpIcon(
            ssnHelp,
            this._('ssnhelp.caption'),
            this._('ssnhelp.text')
        );

        this._email = this.renderControl(email, this._('emailhelp.tooltip'))
        .attr('tabindex', tabIndex++);

        this._emailHelp = this.renderHelpIcon(
            emailHelp,
            this._('emailhelp.caption'),
            this._('emailhelp.text')
        );

        this._phone = this.renderControl(phone, this._('phonehelp.tooltip'))
        .keypress(e => this.phoneFormat.test(e.key) || e.key === this.backSpaceCode)
        .attr('tabindex', tabIndex++);

        this._phoneHelp = this.renderHelpIcon(
            phoneHelp,
            this._('phonehelp.caption'),
            this._('phonehelp.text')
        );

        return tabIndex;
    }

    private renderCitizenship(
        tabIndex: number,
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

        this._citizen = this.renderControl(citizen, this._('citizenhelp.tooltip'), false)
        .attr('tabindex', tabIndex++);

        this._citizenHelp = this.renderHelpIcon(
            citizenHelp,
            this._('citizenhelp.caption'),
            this._('citizenhelp.text')
        );

        this._national = this.renderControl(national, this._('nationalhelp.tooltip'), false)
        .attr('tabindex', tabIndex++);

        this._nationalHelp = this.renderHelpIcon(
            nationalHelp,
            this._('nationalhelp.caption'),
            this._('nationalhelp.text')
        );

        this._lpr = this.renderControl(lpr, this._('lprhelp.tooltip'), false)
        .attr('tabindex', tabIndex++);

        this._lprHelp = this.renderHelpIcon(
            lprHelp,
            this._('lprhelp.caption'),
            this._('lprhelp.text')
        );

        this._alien = this.renderControl(alien, this._('alienhelp.tooltip'), false)
        .attr('tabindex', tabIndex++);

        this._alienHelp = this.renderHelpIcon(
            alienHelp,
            this._('alienhelp.caption'),
            this._('alienhelp.text')
        );

        this._uscisNumberHelp = this.renderHelpIcon(
            uscisNumberHelp,
            this._('uscisnumberhelp.caption'),
            this._('uscisnumberhelp.text')
        );

        this._lpruscisNumPrefix = lpruscisNumPrefix;

        this._lpruscisNum = this.renderControl(lpruscisNum, this._('uscisnumber.tooltip'))
        .keypress(e => this.numberFormat.test(e.key) || e.key === this.backSpaceCode)
        .attr('tabindex', tabIndex++);

        this._lpruscisNumType = this.renderControl(lpruscisNumType, this._('uscisnumbertype.tooltip'))
        .attr('tabindex', tabIndex++);

        this.assignCombolistEventHandler(this._lpruscisNumType, e => 
            this._lpruscisNumPrefix.val(e.target.getAttribute('value') === 'A' ? 'A' : ''));

        this._alienWorkAuthDate = this.renderControl(alienWorkAuthDate, this._('alienworkauthdate.tooltip'))
        .datepicker({ changeMonth: true, changeYear: true, minDate: new Date() }).attr('autocomplete', 'disabled')
        .unbind('keypress')
        .keypress(e => /[\d/]/g.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode)
        .attr('tabindex', tabIndex++);

        this._alienuscisNumPrefix = alienuscisNumPrefix;

        this._alienuscisNum = this.renderControl(alienuscisNum, this._('uscisnumber.tooltip'))
        .keypress(e => this.numberFormat.test(e.key) || e.key === this.backSpaceCode)
        .attr('tabindex', tabIndex++);

        this._alienuscisNumType = this.renderControl(alienuscisNumType, this._('uscisnumbertype.tooltip'))
        .attr('tabindex', tabIndex++);

        this.assignCombolistEventHandler(this._alienuscisNumType, e => 
            this._alienuscisNumPrefix.val(e.target.getAttribute('value') === 'A' ? 'A' : ''));

        this._admissionNum = this.renderControl(admissionNum, this._('admissionnumber.tooltip'))
        .keypress(e => this.alphaNumericFormat.test(e.key) || e.key === this.backSpaceCode)
        .attr('tabindex', tabIndex++);

        this._admissionNumHelp = this.renderHelpIcon(
            admissionNumHelp,
            this._('admissionnumberhelp.caption'),
            this._('admissionnumberhelp.text')
        );

        this._passportNum = this.renderControl(passportNum, this._('passportnumber.tooltip'))
        .attr('tabindex', tabIndex++);

        this._passportNumHelp = this.renderHelpIcon(
            passportNumHelp,
            this._('passportnumberhelp.caption'),
            this._('passportnumberhelp.text')
        );

        this._countryOfIssuance = this.renderControl(countryOfIssuance, this._('coi.tooltip'))
        .attr('tabindex', tabIndex++);

        this._countryOfIssuanceHelp = this.renderHelpIcon(
            countryOfIssuanceHelp,
            this._('coihelp.caption'),
            this._('coihelp.text')
        );

        this._sgnEmployee = this.renderControl(sgnEmployee, this._('sgnemployee.tooltip'))
        .attr('tabindex', tabIndex++);

        this._sgnEmployeeHelp = this.renderHelpIcon(
            sgnEmployeeHelp,
            this._('sgnemployeehelp.caption'),
            this._('sgnemployeehelp.text')
        );

        this._sgnEmployeeDate = this.renderControl(sgnEmployeeDate, this._('employeedate.tooltip'))
        .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled')
        .attr('tabindex', tabIndex++);

        this._sgnEmployeeDateHelp = this.renderHelpIcon(
            sgnEmployeeDateHelp,
            this._('employeedatehelp.caption'),
            this._('employeedatehelp.text')
        );
            
        return tabIndex;
    }

    protected renderSection1(
        tabIndex: number,
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

        tabIndex = this.renderNameAndAddress(tabIndex,
            lastName, lastNameHelp, firstName, firstNameHelp,
            middleInitial, middleInitialHelp,
            otherNames, otherNamesHelp,
            address, addressHelp, apptNumber, apptNumberHelp,
            city, cityHelp, state, stateHelp, zip, zipHelp);

        tabIndex = this.renderPersonalData(
            tabIndex, dob, dobHelp,
            ssn11, ssn12, ssn13, ssn21, ssn22, ssn31,
            ssn32, ssn33, ssn34, ssnHelp,
            email, emailHelp, phone, phoneHelp);

        tabIndex = this.renderCitizenship(tabIndex,
            citizen, citizenHelp, national, nationalHelp,
            lpr, lprHelp, alien, alienHelp, uscisNumberHelp,
            lpruscisNumPrefix, lpruscisNum, lpruscisNumType,
            alienWorkAuthDate, alienuscisNumPrefix, alienuscisNum, alienuscisNumType,
            admissionNum, admissionNumHelp, passportNum, passportNumHelp,
            countryOfIssuance, countryOfIssuanceHelp,
            sgnEmployee, sgnEmployeeHelp,
            sgnEmployeeDate, sgnEmployeeDateHelp);

        return tabIndex;
    }

    protected validateFields(): string[] {
        let errorMessages: string[] = [];

        // Put N/A if required
        [this._middleInitial, this._otherNames, this._apptNumber, this._email, this._phone]
           .filter(f => (f.val() as string).trim() === '' || (f.val() as string).toUpperCase() === this.na)
           .forEach(f => f.val(this.na));

        this.validateTextField(this._lastName, this._('name.last'), [this.nameFormat], false, errorMessages);
        this.validateTextField(this._firstName, this._('name.first'), [this.nameFormat], false, errorMessages);
        this.validateTextField(this._middleInitial, this._('name.middleinitial'), [this.nameInitialFormat, this.NAString], false, errorMessages);
        this.validateTextField(this._otherNames, this._('name.othernames'), [this.nameFormat, this.NAString], false, errorMessages);
        this.validateTextField(this._address, this._('address.address'), [], false, errorMessages);
        this.validateTextField(this._apptNumber, this._('address.apartment'), [], false, errorMessages);
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

            this.validateTextField(this._alienuscisNum, this._('citizenship.uscis'), [this.NAString, this.uscisNumberFormat], false, errorMessages);
            this.validateTextField(this._admissionNum, this._('citizenship.admission'), [this.NAString, this.admissionNumberFormat], false, errorMessages);
            this.validateTextField(this._passportNum, this._('citizenship.passport'), [this.NAString, this.passportNumberFormat], false, errorMessages);

            if (this.EmptyOrNA(this._alienuscisNum) && this.EmptyOrNA(this._admissionNum) &&
                this.EmptyOrNA(this._passportNum) && this.EmptyOrNA(this._countryOfIssuance)) {
                [this._alienuscisNum, this._admissionNum, this._passportNum, this._countryOfIssuance].forEach(field =>
                    field.toggleClass(this.invalidFieldClass, true));

                errorMessages.push(this.paramExistsMsg.replace('${prefix}', '')
                    .replace('${parameter}', this._('citizenship.alienadmissionpassport')));
            } else if (this.EmptyOrNA(this._alienuscisNum) && this.EmptyOrNA(this._admissionNum) &&
               (this.EmptyOrNA(this._passportNum) || this.EmptyOrNA(this._countryOfIssuance))) {
                [this._passportNum, this._countryOfIssuance].forEach(field =>
                field.toggleClass(this.invalidFieldClass, true));

                errorMessages.push(this.paramExistsMsg.replace('${prefix}', '')
                    .replace('${parameter}', this._('citizenship.passportcountry')));
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