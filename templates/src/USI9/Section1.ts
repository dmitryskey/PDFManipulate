class USI9Section1 extends USI9Fields {
    private processLPR(flag: boolean) {
        var na = flag ? this._('NA') : '';
        this._lpruscisNumPrefix.val('');
        this._lpruscisNum.prop('disabled', true).val(na);
        this._lpruscisNumType.prop('disabled', true);

        this.filterCombolist(this._lpruscisNumType, flag ? {0:na} : {}, flag ? '0' : null, this.processListABC);
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

        this.filterCombolist(this._alienuscisNumType, flag ? {0:na} : {}, flag ? '0' : null, this.processListABC);
        this.filterCombolist(this._countryOfIssuance, flag ? {0:na} : {}, flag ? '0' : null, this.processListABC);
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

        // E-Verify requirements
        this._lastName = lastName
        .prop('title', this._('lastnamehelp.tooltip'))
        .prop('maxLength', 40)
        .keypress(e => this.nameFormat.test(String.fromCharCode(e.which)))
        .change(() => this._lastNameSection2.val(this._lastName.val()));

        this._lastNameHelp = this.renderHelpIcon(
            lastNameHelp,
            this._('lastnamehelp.caption'),
            dialog,
            this._('lastnamehelp.text')
        );

        // E-Verify requirements
        this._firstName = firstName
        .prop('title', this._('firstnamehelp.tooltip'))
        .prop('maxLength', 25)
        .keypress(e => this.nameFormat.test(String.fromCharCode(e.which)))
        .change(() => this._firstNameSection2.val(this._firstName.val()));

        this._firstNameHelp = this.renderHelpIcon(
            firstNameHelp,
            this._('firstnamehelp.caption'),
            dialog,
            this._('firstnamehelp.text')
        );

        // E-Verify requirements + N/A option
        this._middleInitial = middleInitial
        .prop('title', this._('middleinitialhelp.tooltip'))
        .prop('maxLength', 3)
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

        // E-Verify requirements
        this._otherNames = otherNames
        .prop('title', this._('othernameshelp.tooltip'))
        .prop('maxLength', 40)
        .keypress(e =>
            this.nameFormat.test(String.fromCharCode(e.which)) ||
            this.NAFormat.test(String.fromCharCode(e.which)));

        this._otherNamesHelp = this.renderHelpIcon(
            otherNamesHelp,
            this._('othernameshelp.caption'),
            dialog,
            this._('othernameshelp.text')
        );

        this._address = address.prop('title', this._('addresshelp.tooltip'));

        this._addressHelp = this.renderHelpIcon(
            addressHelp,
            this._('addresshelp.caption'),
            dialog,
            this._('addresshelp.text')
        );

        this._apptNumber = apptNumber
        .prop('title', this._('apartmentnumberhelp.tooltip'));

        this._apptNumberHelp = this.renderHelpIcon(
            apptNumberHelp,
            this._('apartmentnumberhelp.caption'),
            dialog,
            this._('apartmentnumberhelp.text')
        );

        this._city = city.prop('title', this._('cityhelp.caption'));

        this._cityHelp = this.renderHelpIcon(
            cityHelp,
            this._('cityhelp.caption'),
            dialog,
            this._('cityhelp.text')
        );

        this._state = state.prop('title', this._('statehelp.tooltip'));

        this._stateHelp = this.renderHelpIcon(
            stateHelp,
            this._('statehelp.caption'),
            dialog,
            this._('statehelp.text')
        );

        this._zip = zip
        .prop('title', this._('ziphelp.tooltip'))
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
            .prop('title', this._('ssnhelp.tooltip'))
            .prop('maxLength', 1)
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
        .prop('title', this._('ssnhelp.tooltip'))
        .prop('maxLength', 1)
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

        var na = this._('NA');

        // E-Verify requirements
        this._dob = dob.prop('title', this._('dobhelp.tooltip'))
        .datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1908:' + (new Date()).getFullYear()})
        .change(e =>
            this.filterCombolist(this._listBDoc, this.getListBContent((e.target as HTMLInputElement).value), na, this.processListABC));

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
        .prop('title', this._('emailhelp.tooltip'))
        .prop('maxLength', 60);

        this._emailHelp = this.renderHelpIcon(
            emailHelp,
            this._('emailhelp.caption'),
            dialog,
            this._('emailhelp.text')
        );
    
        this._phone = phone
        .prop('title', this._('phonehelp.tooltip'))
        .prop('maxLength', 13)
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
        var na = this._('NA');

        this._citizen = citizen
        .prop('title', this._('citizenhelp.tooltip'))
        .click(() => {
            this.selectCheckmark(this._citizen, citizenships);
            this.processLPR(this._citizen.prop('checked'));
            this.processAlien(this._citizen.prop('checked'));

            this.filterCombolist(
                this._listCDoc,
                this.getListCContent(this._immigrationStatus.val(this._citizen.prop('checked') ? 1 : 0).val() as string),
                na,
                this.processListABC);

            this.filterCombolist(this._listADoc, {0:na}, null, this.processListABC);
            if (this._citizen.prop('checked')) {
                this.filterCombolist(
                    this._listADoc, 
                    {0:na, 1:this._('uspassport'), 2:this._('uspassportcard')},
                    na,
                    this.processListABC);
            }});

        this._citizenHelp = this.renderHelpIcon(
            citizenHelp,
            this._('citizenhelp.caption'),
            dialog,
            this._('citizenhelp.text')
        );

        this._national = national
            .prop('title', this._('nationalhelp.tooltip'))
            .click(() => {
                this.selectCheckmark(this._national, citizenships);
                this.processLPR(this._national.prop('checked'));
                this.processAlien(this._national.prop('checked'));

                this.filterCombolist(
                    this._listCDoc,
                    this.getListCContent(this._immigrationStatus.val(this._national.prop('checked') ? 2 : 0).val() as string),
                    na,
                    this.processListABC);

                this.filterCombolist(this._listADoc, {0:na}, null, this.processListABC);
                if (this._national.prop('checked')) {
                    this.filterCombolist(
                        this._listADoc,
                        {0:na, 1:this._('uspassport'), 2:this._('uspassportcard')},
                        na,
                        this.processListABC);
                }
            });

        this._nationalHelp = this.renderHelpIcon(
            nationalHelp,
            this._('nationalhelp.caption'),
            dialog,
            this._('nationalhelp.text')
        );
    
        this._lpr = lpr
            .prop('title', this._('lprhelp.tooltip'))
            .click(() => {
                this.selectCheckmark(this._lpr, citizenships);
                this.processAlien(this._lpr.prop('checked'));
                this._lpruscisNum.val('');
                this.filterCombolist(this._lpruscisNumType, {}, null, this.processListABC);
    
                if (this._lpr.prop('checked')) {
                    this._lpruscisNum.prop('disabled', false);
                    this._lpruscisNumType.prop('disabled', false);
                    this.filterCombolist(
                        this._lpruscisNumType,
                        {'A':this._('aliennumber'), 'U':this._('uscisnumber')},
                        null, this.processListABC);
                }

                this.filterCombolist(
                    this._listCDoc,
                    this.getListCContent(this._immigrationStatus.val(this._lpr.prop('checked') ? 3 : 0).val() as string),
                    na,
                    this.processListABC);
    
                this.filterCombolist(this._listADoc, {}, null, this.processListABC);
                if (this._lpr.prop('checked')) {
                    this.filterCombolist(
                        this._listADoc, {
                        0:na,
                        3:this._('permanentresidentcard'),
                        4:this._('alienresidentcard'),
                        5:this._('foreignpassport'),
                        10:this._('I551I94receipt'),
                        12:this._('I551receipt')
                    },
                    na,
                    this.processListABC);
                }
            });
    
        this._lprHelp = this.renderHelpIcon(
            lprHelp,
            this._('lprhelp.caption'),
            dialog,
            this._('lprhelp.text')
        );
    
        this._alien = alien
            .prop('title', this._('alienhelp.tooltip'))
            .click(() => {
                this.selectCheckmark(this._alien, citizenships);
                this.processLPR(this._alien.prop('checked'));
                this._alienWorkAuthDate.val('');
                this._alienuscisNum.val('');
                this.filterCombolist(this._alienuscisNumType, {}, null, this.processListABC);
                this._admissionNum.val('');
                this._passportNum.val('');
                this.filterCombolist(this._countryOfIssuance, {}, null, this.processListABC);
                if (this._alien.prop('checked')) {
                    this._alienWorkAuthDate.prop('disabled', false);
                    this._alienuscisNum.prop('disabled', false);
                    this._alienuscisNumType.prop('disabled', false);
    
                    this.filterCombolist(
                        this._alienuscisNumType, 
                        {'A':this._('aliennumber'), 'U':this._('uscisnumber')},
                        null,
                        this.processListABC);
    
                    this._admissionNum.prop('disabled', false);
                    this._passportNum.prop('disabled', false);
    
                    this._countryOfIssuance.prop('disabled', false);
    
                    this.filterCombolist(
                        this._countryOfIssuance,
                        JSON.parse(this._('countries')),
                        null,
                        this.processListABC);
                }
    
                this.filterCombolist(
                    this._listCDoc,
                    this.getListCContent(this._immigrationStatus.val(this._alien.prop('checked') ? 4 : 0).val() as string),
                    na,
                    this.processListABC);
    
                this.filterCombolist(this._listADoc, {}, null, this.processListABC);
                if (this._alien.prop('checked')) {
                    this.filterCombolist(
                        this._listADoc, {
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
                    },
                    na,
                    this.processListABC);
                }
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
        .prop('title', this._('uscisnumber.tooltip'))
        .prop('maxLength', 9)
        .keypress(e => this.numberFormat.test(String.fromCharCode(e.which)));
    
        this._lpruscisNumType = lpruscisNumType
        .prop('title', this._('uscisnumbertype.tooltip'));

        this.assignCombolistEventHandler(this._lpruscisNumType, (e: JQuery.Event) => 
            this._lpruscisNumPrefix.val((e.target as HTMLElement).getAttribute('value') === 'A' ? 'A' : ''));
    
        this._alienWorkAuthDate = alienWorkAuthDate
        .prop('title', this._('alienworkauthdate.tooltip'))
        .datepicker()
        .unbind('keypress')
        .keypress(e =>
            /[\d/]/g.test(String.fromCharCode(e.which)) ||
            this.NAFormat.test(String.fromCharCode(e.which))
        );
    
        this._alienuscisNumPrefix = alienuscisNumPrefix;
    
        // E-Verify requirements
        this._alienuscisNum = alienuscisNum
            .prop('title', this._('uscisnumber.tooltip'))
            .prop('maxLength', 9)
            .keypress(e =>
                this.numberFormat.test(String.fromCharCode(e.which)))
            .change(() => {
                if (this._alienuscisNum.val() !== '') {
                    if (this._alienuscisNumType.val() === '') {
                        this.filterCombolist(
                            this._alienuscisNumType, 
                            {'A':this._('aliennumber'), 'U':this._('uscisnumber')},
                            null,
                            this.processListABC);
                    }
    
                    this._admissionNum.val(na);
                    this._passportNum.val(na);
                    this.filterCombolist(this._countryOfIssuance, {0:na}, na, this.processListABC);
                }
                else {
                    this.filterCombolist(this._alienuscisNumType, {}, null, this.processListABC);
                    this._admissionNum.val('');
                    this._passportNum.val('');
                    this.filterCombolist(this._countryOfIssuance, {}, null, this.processListABC);
                }
            });
    
        this._alienuscisNumType = alienuscisNumType
        .prop('title', this._('uscisnumbertype.tooltip'));

        this.assignCombolistEventHandler(this._alienuscisNumType, (e: JQuery.Event) => 
            this._alienuscisNumPrefix.val((e.target as HTMLElement).getAttribute('value') === 'A' ? 'A' : ''));
    
        // E-Verify requirements
        this._admissionNum = admissionNum
        .prop('title', this._('admissionnumber.tooltip'))
        .prop('maxLength', 11)
        .keypress(e =>
            this.numberFormat.test(String.fromCharCode(e.which)))
        .change(() => {
            if (this._admissionNum.val() !== '') {
                this._alienuscisNum.val(na);
                this.filterCombolist(this._alienuscisNumType, {0:na}, na, this.processListABC);
    
                this._passportNum.val(na);
                this.filterCombolist(this._countryOfIssuance, {0:na}, na, this.processListABC);
            }
            else {
                this._alienuscisNum.val('');
                this.filterCombolist(this._alienuscisNumType, {}, null, this.processListABC);
                this._passportNum.val('');
                this.filterCombolist(this._countryOfIssuance, {}, null, this.processListABC);
            }
        });
    
        this._admissionNumHelp = this.renderHelpIcon(
            admissionNumHelp,
            this._('admissionnumberhelp.caption'),
            dialog,
            this._('admissionnumberhelp.text')
        );
    
        // E-Verify requirements
        this._passportNum = passportNum
        .prop('title', this._('passportnumber.tooltip'))
        .prop('maxLength', 12)
        .change(() => {
            if (this._passportNum.val() !== '') {
                this._alienuscisNum.val(na);
                this.filterCombolist(this._alienuscisNumType, {0:na}, na, this.processListABC);
    
                this._admissionNum.val(na);
            
                if (this._countryOfIssuance.val() === '') {
                    this.filterCombolist(
                        this._countryOfIssuance,
                        JSON.parse(this._('countries')),
                        null,
                        this.processListABC);
                }
            }
            else {
                this._alienuscisNum.val('');
                this.filterCombolist(this._alienuscisNumType, {}, null, this.processListABC);
                this._admissionNum.val('');
            }
        });

        this._passportNumHelp = this.renderHelpIcon(
            passportNumHelp,
            this._('passportnumberhelp.caption'),
            dialog,
            this._('passportnumberhelp.text')
        );

        this._countryOfIssuance = countryOfIssuance.prop('title', this._('coi.tooltip'));

        this._countryOfIssuanceHelp = this.renderHelpIcon(
            countryOfIssuanceHelp,
            this._('coihelp.caption'),
            dialog,
            this._('coihelp.text')
        );

        this._sgnEmployee = sgnEmployee.prop('title', this._('employee.tooltip'));
  
        this._sgnEmployeeHelp = this.renderHelpIcon(
            sgnEmployeeHelp,
            this._('employeehelp.caption'),
            dialog,
            this._('employeehelp.text'),
            700);
    
        this._sgnEmployeeDate = sgnEmployeeDate.prop('title', this._('employeedate.tooltip')).datepicker();

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