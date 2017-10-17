/// <reference path="Fields.ts" />

class USI9Section1 extends USI9Fields {
    private processLPR(flag: boolean) {
        var na = flag ? this._('NA') : '';
        this._lpruscisNumPrefix.val('');
        this._lpruscisNum.prop('disabled', true).val(na);
        this._lpruscisNumType.prop('disabled', true);

        this.filterCombolist(this._lpruscisNumType, flag ? {0:na} : {}, flag ? '0' : null, this, this.processListABC);
    }

    private processAlien(flag: boolean) {
        var na = flag ? this._('NA') : '';
        this._alienWorkAuthDate.prop('disabled', true).val(na);
        this._alienuscisNumPrefix.val('');
        this._alienuscisNum.prop('disabled', true).val(na);
        this._alienuscisNumType.prop('disabled', true);
        this._admissionNum.prop('disabled', true).val(na);
        this._passportNum.prop('disabled', true).val(na);
        this._countryOfIssuance.prop('disabled', true);

        this.filterCombolist(this._alienuscisNumType, flag ? {0:na} : {}, flag ? '0' : null, this, this.processListABC);
        this.filterCombolist(this._countryOfIssuance, flag ? {0:na} : {}, flag ? '0' : null, this, this.processListABC);
    }

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

        this._lastName = lastName
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('lastnamehelp.tooltip')})
        .keypress(e => this.nameFormat.test(String.fromCharCode(e.which)))
        .change(() => this._lastNameSection2.val(this._lastName.val()));

        this._lastNameHelp = this.renderHelpIcon(
            lastNameHelp,
            this._('lastnamehelp.caption'),
            dialog,
            this._('lastnamehelp.text')
        );

        this._firstName = firstName
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('firstnamehelp.tooltip')})
        .keypress(e => this.nameFormat.test(String.fromCharCode(e.which)))
        .change(() => this._firstNameSection2.val(this._firstName.val()));

        this._firstNameHelp = this.renderHelpIcon(
            firstNameHelp,
            this._('firstnamehelp.caption'),
            dialog,
            this._('firstnamehelp.text')
        );

        // N/A option
        this._middleInitial = middleInitial
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('middleinitialhelp.tooltip')})
        .keypress(e =>
            this.nameFormat.test(String.fromCharCode(e.which)) ||
            this.NAFormat.test(String.fromCharCode(e.which)))
        .change(() => this._middleInitialSection2.val(this._middleInitial.val()));

        this._middleInitialHelp = this.renderHelpIcon(
            middleInitialHelp,
            this._('middleinitialhelp.caption'),
            dialog,
            this._('middleinitialhelp.text')
        );

        this._otherNames = otherNames
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('othernameshelp.tooltip')})
        .keypress(e =>
            this.nameFormat.test(String.fromCharCode(e.which)) ||
            this.NAFormat.test(String.fromCharCode(e.which)));

        this._otherNamesHelp = this.renderHelpIcon(
            otherNamesHelp,
            this._('othernameshelp.caption'),
            dialog,
            this._('othernameshelp.text')
        );

        this._address = address
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('addresshelp.tooltip')});

        this._addressHelp = this.renderHelpIcon(
            addressHelp,
            this._('addresshelp.caption'),
            dialog,
            this._('addresshelp.text')
        );

        this._apptNumber = apptNumber
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('apartmentnumberhelp.tooltip')});

        this._apptNumberHelp = this.renderHelpIcon(
            apptNumberHelp,
            this._('apartmentnumberhelp.caption'),
            dialog,
            this._('apartmentnumberhelp.text')
        );

        this._city = city
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('cityhelp.tooltip')});

        this._cityHelp = this.renderHelpIcon(
            cityHelp,
            this._('cityhelp.caption'),
            dialog,
            this._('cityhelp.text')
        );

        this._state = state
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('statehelp.tooltip')})

        this._stateHelp = this.renderHelpIcon(
            stateHelp,
            this._('statehelp.caption'),
            dialog,
            this._('statehelp.text')
        );

        this._zip = zip
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('ziphelp.tooltip')})
        .keypress(e => this.zipFormat.test(String.fromCharCode(e.which)));

        this._zipHelp = this.renderHelpIcon(
            zipHelp,
            this._('ziphelp.caption'),
            dialog,
            this._('ziphelp.text')
        );
    }

    private renderSSNFields(ssn : JQuery<HTMLElement>[]) {
        this._ssn = ssn;
        for (var i = 0; i < ssn.length - 1; i++) {
            this._ssn[i]
            .attr('nextElement', (this._ssn[i + 1]).attr('name'))
            .focus(e => this.hideTooltip()).prop('title', '')
            .tooltip({content: this._('ssnhelp.tooltip')})
            .keypress(e => {
                if (this.numberFormat.test(String.fromCharCode(e.which))) {
                    $('[name=' + $(e.target).attr('nextElement') + ']').focus();
                    return true;
                }
                else {
                    return false;
                }
            });
        }

        this._ssn[ssn.length - 1]
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('ssnhelp.tooltip')})
        .keypress(e => this.numberFormat.test(String.fromCharCode(e.which)));
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
        this._dob = dob
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('dobhelp.tooltip')})
        .datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1908:' + maxDOB.getFullYear(),
            maxDate: maxDOB})
        .change(e =>
            this.filterCombolist(
                this._listBDoc,
                this.getListBContent((e.target as HTMLInputElement).value),
                this.na,
                this,
                this.processListABC));

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

        this._email = email
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('emailhelp.tooltip')})

        this._emailHelp = this.renderHelpIcon(
            emailHelp,
            this._('emailhelp.caption'),
            dialog,
            this._('emailhelp.text')
        );
    
        this._phone = phone
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('phonehelp.tooltip')})
        .keypress(e => this.phoneFormat.test(String.fromCharCode(e.which)));
    
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

        var citizenships = [citizen, national, lpr, alien];

        this.filterCombolist(this._listADoc, this.getListAContent('0'), this.na, this, this.processListABC);
        this.filterCombolist(this._listCDoc, this.getListCContent('0'), this.na, this, this.processListABC);

        this._citizen = citizen
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('citizenhelp.tooltip')})
        .click(() => {
            this.selectCheckmark(this._citizen, citizenships);
            this.processLPR(this._citizen.prop('checked'));
            this.processAlien(this._citizen.prop('checked'));

            this.filterCombolist(this._listADoc, this.getListAContent(this._citizen.prop('checked') ? '1' : '0'), this.na, this, this.processListABC);

            this.filterCombolist(
                this._listCDoc,
                this.getListCContent(this._immigrationStatus.val(this._citizen.prop('checked') ? 1 : 0).val() as string),
                this.na,
                this,
                this.processListABC);
        });

        this._citizenHelp = this.renderHelpIcon(
            citizenHelp,
            this._('citizenhelp.caption'),
            dialog,
            this._('citizenhelp.text')
        );

        this._national = national
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('nationalhelp.tooltip')})
        .click(() => {
            this.selectCheckmark(this._national, citizenships);
            this.processLPR(this._national.prop('checked'));
            this.processAlien(this._national.prop('checked'));

            this.filterCombolist(this._listADoc, this.getListAContent(this._national.prop('checked') ? '2' : '0'), this.na, this, this.processListABC);

            this.filterCombolist(
                this._listCDoc,
                this.getListCContent(this._immigrationStatus.val(this._national.prop('checked') ? 2 : 0).val() as string),
                this.na,
                this,
                this.processListABC);
        });

        this._nationalHelp = this.renderHelpIcon(
            nationalHelp,
            this._('nationalhelp.caption'),
            dialog,
            this._('nationalhelp.text')
        );
    
        this._lpr = lpr
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('lprhelp.tooltip')})
        .click(() => {
            this.selectCheckmark(this._lpr, citizenships);
            this.processAlien(this._lpr.prop('checked'));
            this._lpruscisNum.val('');
            this.filterCombolist(this._lpruscisNumType, {}, null, this, this.processListABC);
    
            if (this._lpr.prop('checked')) {
                this._lpruscisNum.prop('disabled', false);
                this._lpruscisNumType.prop('disabled', false);
                this.filterCombolist(
                    this._lpruscisNumType,
                    {'A':this._('aliennumber'), 'U':this._('uscisnumber')},
                    null,
                    this,
                    this.processListABC);
            }
    
            this.filterCombolist(this._listADoc, {}, null, this, this.processListABC);
            if (this._lpr.prop('checked')) {
                this.filterCombolist(this._listADoc, this.getListAContent('3'), this.na, this, this.processListABC);
            }

            this.filterCombolist(
                this._listCDoc,
                this.getListCContent(this._immigrationStatus.val(this._lpr.prop('checked') ? 3 : 0).val() as string),
                this.na,
                this,
                this.processListABC);
        });
    
        this._lprHelp = this.renderHelpIcon(
            lprHelp,
            this._('lprhelp.caption'),
            dialog,
            this._('lprhelp.text')
        );
    
        this._alien = alien
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('alienhelp.tooltip')})
        .click(() => {
            this.selectCheckmark(this._alien, citizenships);
            this.processLPR(this._alien.prop('checked'));
            this._alienWorkAuthDate.val('');
            this._alienuscisNum.val('');
            this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
            this._admissionNum.val('');
            this._passportNum.val('');
            this.filterCombolist(this._countryOfIssuance, {}, null, this, this.processListABC);
            if (this._alien.prop('checked')) {
                this._alienWorkAuthDate.prop('disabled', false);
                this._alienuscisNum.prop('disabled', false);
                this._alienuscisNumType.prop('disabled', false);
    
                this.filterCombolist(
                    this._alienuscisNumType, 
                    {'A':this._('aliennumber'), 'U':this._('uscisnumber')},
                    null,
                    this,
                    this.processListABC);
    
                this._admissionNum.prop('disabled', false);
                this._passportNum.prop('disabled', false);
    
                this._countryOfIssuance.prop('disabled', false);
    
                this.filterCombolist(
                    this._countryOfIssuance,
                    JSON.parse(this._('countries')),
                    null,
                    this,
                    this.processListABC);
            }
    
            this.filterCombolist(this._listADoc, this.getListAContent(this._alien.prop('checked') ? '4' : '0'), this.na, this, this.processListABC);

            this.filterCombolist(
                this._listCDoc,
                this.getListCContent(this._immigrationStatus.val(this._alien.prop('checked') ? 4 : 0).val() as string),
                this.na,
                this,
                this.processListABC);
        });
    
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
    
        this._lpruscisNum = lpruscisNum
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('uscisnumber.tooltip')})
        .keypress(e => this.numberFormat.test(String.fromCharCode(e.which)));
    
        this._lpruscisNumType = lpruscisNumType
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('uscisnumbertype.tooltip')});

        this.assignCombolistEventHandler(this._lpruscisNumType, (e: JQuery.Event) => 
            this._lpruscisNumPrefix.val((e.target as HTMLElement).getAttribute('value') === 'A' ? 'A' : ''));
    
        this._alienWorkAuthDate = alienWorkAuthDate
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('alienworkauthdate.tooltip')})
        .datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        })
        .unbind('keypress')
        .keypress(e =>
            /[\d/]/g.test(String.fromCharCode(e.which)) ||
            this.NAFormat.test(String.fromCharCode(e.which))
        );
    
        this._alienuscisNumPrefix = alienuscisNumPrefix;
    
        this._alienuscisNum = alienuscisNum
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('uscisnumber.tooltip')})
        .keypress(e => this.numberFormat.test(String.fromCharCode(e.which)))
        .change(() => {
            if (this._alienuscisNum.val() !== '') {
                if (this._alienuscisNumType.val() === '') {
                    this.filterCombolist(
                        this._alienuscisNumType, 
                        {'A':this._('aliennumber'), 'U':this._('uscisnumber')},
                        null,
                        this,
                        this.processListABC);
                }
    
                this._admissionNum.val(this.na);
                this._passportNum.val(this.na);
                this.filterCombolist(this._countryOfIssuance, {0:this.na}, this.na, this, this.processListABC);
            }
            else {
                this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
                this._admissionNum.val('');
                this._passportNum.val('');
                this.filterCombolist(this._countryOfIssuance, {}, null, this, this.processListABC);
            }
        });
    
        this._alienuscisNumType = alienuscisNumType
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('uscisnumbertype.tooltip')});

        this.assignCombolistEventHandler(this._alienuscisNumType, (e: JQuery.Event) => 
            this._alienuscisNumPrefix.val((e.target as HTMLElement).getAttribute('value') === 'A' ? 'A' : ''));
    
        this._admissionNum = admissionNum
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('admissionnumber.tooltip')})
        .keypress(e =>
            this.numberFormat.test(String.fromCharCode(e.which)))
        .change(() => {
            if (this._admissionNum.val() !== '') {
                this._alienuscisNum.val(this.na);
                this.filterCombolist(this._alienuscisNumType, {0:this.na}, this.na, this, this.processListABC);
    
                this._passportNum.val(this.na);
                this.filterCombolist(this._countryOfIssuance, {0:this.na}, this.na, this, this.processListABC);
            }
            else {
                this._alienuscisNum.val('');
                this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
                this._passportNum.val('');
                this.filterCombolist(this._countryOfIssuance, {}, null, this, this.processListABC);
            }
        });
    
        this._admissionNumHelp = this.renderHelpIcon(
            admissionNumHelp,
            this._('admissionnumberhelp.caption'),
            dialog,
            this._('admissionnumberhelp.text')
        );
    
        this._passportNum = passportNum
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('passportnumber.tooltip')})
        .change(() => {
            if (this._passportNum.val() !== '') {
                this._alienuscisNum.val(this.na);
                this.filterCombolist(this._alienuscisNumType, {0:this.na}, this.na, this, this.processListABC);
    
                this._admissionNum.val(this.na);
            
                if (this._countryOfIssuance.val() === '') {
                    this.filterCombolist(
                        this._countryOfIssuance,
                        JSON.parse(this._('countries')),
                        null,
                        this,
                        this.processListABC);
                }
            }
            else {
                this._alienuscisNum.val('');
                this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
                this._admissionNum.val('');
            }
        });

        this._passportNumHelp = this.renderHelpIcon(
            passportNumHelp,
            this._('passportnumberhelp.caption'),
            dialog,
            this._('passportnumberhelp.text')
        );

        this._countryOfIssuance = countryOfIssuance
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('coi.tooltip')});

        this._countryOfIssuanceHelp = this.renderHelpIcon(
            countryOfIssuanceHelp,
            this._('coihelp.caption'),
            dialog,
            this._('coihelp.text')
        );

        this._sgnEmployee = sgnEmployee
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('sgnemployee.tooltip')});
  
        this._sgnEmployeeHelp = this.renderHelpIcon(
            sgnEmployeeHelp,
            this._('sgnemployeehelp.caption'),
            dialog,
            this._('sgnemployeehelp.text'),
            700);
    
        this._sgnEmployeeDate = sgnEmployeeDate
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employeedate.tooltip')})
        .datepicker({minDate: new Date()});

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

        this.processLPR(false);
        this.processAlien(false);
    }
}