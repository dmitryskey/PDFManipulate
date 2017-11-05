/// <reference path="TranslatorSection.ts" />

class USI9Section2 extends USI9Translator {
    private validationExpressionProp = 'validationexpression';
    private validationMessageProp = 'validationmessage';

    protected renderSection2(
        dialog: JQuery<HTMLElement>,
        employeeInfoHelp: JQuery<HTMLElement>,
        lastName: JQuery<HTMLElement>,
        lastNameHelp: JQuery<HTMLElement>,
        firstName: JQuery<HTMLElement>,
        firstNameHelp: JQuery<HTMLElement>,
        middleInitial: JQuery<HTMLElement>,
        middleInitialHelp: JQuery<HTMLElement>,
        immigrationStatus: JQuery<HTMLElement>,
        immigrationStatusHelp: JQuery<HTMLElement>,
        listADoc: JQuery<HTMLElement>,
        listADocHelp: JQuery<HTMLElement>,
        listAIssuingAuthority: JQuery<HTMLElement>,
        listAIssuingAuthorityHelp: JQuery<HTMLElement>,
        listADocNumber: JQuery<HTMLElement>,
        listADocNumberHelp: JQuery<HTMLElement>,
        listADocExpDate: JQuery<HTMLElement>,
        listADocExpDateHelp: JQuery<HTMLElement>,
        listADoc2: JQuery<HTMLElement>,
        listADoc2Help: JQuery<HTMLElement>,
        listAIssuingAuthority2: JQuery<HTMLElement>,
        listAIssuingAuthority2Help: JQuery<HTMLElement>,
        listADocNumber2: JQuery<HTMLElement>,
        listADocNumber2Help: JQuery<HTMLElement>,
        listADocExpDate2: JQuery<HTMLElement>,
        listADocExpDate2Help: JQuery<HTMLElement>,
        listADoc3: JQuery<HTMLElement>,
        listADoc3Help: JQuery<HTMLElement>,
        listAIssuingAuthority3: JQuery<HTMLElement>,
        listAIssuingAuthority3Help: JQuery<HTMLElement>,
        listADocNumber3: JQuery<HTMLElement>,
        listADocNumber3Help: JQuery<HTMLElement>,
        listADocExpDate3: JQuery<HTMLElement>,
        listADocExpDate3Help: JQuery<HTMLElement>,
        listBDoc: JQuery<HTMLElement>,
        listBDocHelp: JQuery<HTMLElement>,
        listBIssuingAuthority: JQuery<HTMLElement>,
        listBIssuingAuthorityHelp: JQuery<HTMLElement>,
        listBDocNumber: JQuery<HTMLElement>,
        listBDocNumberHelp: JQuery<HTMLElement>,
        listBDocExpDate: JQuery<HTMLElement>,
        listBDocExpDateHelp: JQuery<HTMLElement>,
        listCDoc: JQuery<HTMLElement>,
        listCDocHelp: JQuery<HTMLElement>,
        listCIssuingAuthority: JQuery<HTMLElement>,
        listCIssuingAuthorityHelp: JQuery<HTMLElement>,
        listCDocNumber: JQuery<HTMLElement>,
        listCDocNumberHelp: JQuery<HTMLElement>,
        listCDocExpDate: JQuery<HTMLElement>,
        listCDocExpDateHelp: JQuery<HTMLElement>,
        additionalInfo: JQuery<HTMLElement>,
        additionalInfoHelp: JQuery<HTMLElement>,
        hireDate: JQuery<HTMLElement>,
        hireDateHelp: JQuery<HTMLElement>,
        sgnEmployer: JQuery<HTMLElement>,
        sgnEmployerHelp: JQuery<HTMLElement>,
        employerSignDate: JQuery<HTMLElement>,
        employerSignDateHelp: JQuery<HTMLElement>,
        employerTitle: JQuery<HTMLElement>,
        employerTitleHelp: JQuery<HTMLElement>,
        employerLastName: JQuery<HTMLElement>,
        employerLastNameHelp: JQuery<HTMLElement>,
        employerFirstName: JQuery<HTMLElement>,
        employerFirstNameHelp: JQuery<HTMLElement>,
        employerName: JQuery<HTMLElement>,
        employerNameHelp: JQuery<HTMLElement>,
        employerAddress: JQuery<HTMLElement>,
        employerAddressHelp: JQuery<HTMLElement>,
        employerCity: JQuery<HTMLElement>,
        employerCityHelp: JQuery<HTMLElement>,
        employerState: JQuery<HTMLElement>,
        employerStateHelp: JQuery<HTMLElement>,
        employerZip: JQuery<HTMLElement>,
        employerZipHelp: JQuery<HTMLElement>) {

        $('a').prop('target', '_blank');

        this._dob.change(e =>
            this.filterCombolist(
                this._listBDoc,
                this.getListBContent((e.target as HTMLInputElement).value),
                this.na,
                this,
                this.processListABC));

        let citizenships = [this._citizen, this._national, this._lpr, this._alien];

        this._citizen.click(() => {
            this.selectCheckmark(this._citizen, citizenships);
            this.processLPR(this._citizen.prop('checked'));
            this.processAlien(this._citizen.prop('checked'));

            this.clearListABC();

            if (this._citizen.prop('checked')) {
                this.fillListABC('1');
            }
        });

        this._national.click(() => {
            this.selectCheckmark(this._national, citizenships);
            this.processLPR(this._national.prop('checked'));
            this.processAlien(this._national.prop('checked'));

            this.clearListABC();

            if (this._national.prop('checked')) {
                this.fillListABC('2');
            }
        });

        this._lpr.click(() => {
            this.selectCheckmark(this._lpr, citizenships);
            this.processAlien(this._lpr.prop('checked'));
            this._lpruscisNum.val('');
            this.filterCombolist(this._lpruscisNumType, {}, null, this, this.processListABC);

            this.clearListABC();
    
            if (this._lpr.prop('checked')) {
                this._lpruscisNum.prop('disabled', false);
                this._lpruscisNumType.prop('disabled', false);
                this.filterCombolist(
                    this._lpruscisNumType,
                    {'A':this._('aliennumber'), 'U':this._('uscisnumber')},
                    null,
                    this,
                    this.processListABC);

                    this.fillListABC('3');
                }
        });

        this._alien.click(() => {
            this.selectCheckmark(this._alien, citizenships);
            this.processLPR(this._alien.prop('checked'));
            this._alienWorkAuthDate.val('');
            this._alienuscisNum.val('');
            this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
            this._admissionNum.val('');
            this._passportNum.val('');
            this.filterCombolist(this._countryOfIssuance, {}, null, this, this.processListABC);

            this.clearListABC();

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

                    this.fillListABC('4');
                }
        });

        this._alienuscisNum.change(() => {
            if (!this.EmptyOrNA(this._alienuscisNum)) {
                if (this.EmptyOrNA(this._alienuscisNumType)) {
                    this.filterCombolist(
                        this._alienuscisNumType, 
                        {'A':this._('aliennumber'), 'U':this._('uscisnumber')},
                        null,
                        this,
                        this.processListABC);
                }
    
                this._admissionNum.val(this.na);
                this._passportNum.val(this.na);
                this.filterCombolist(this._countryOfIssuance, {0:this.na}, '0', this, this.processListABC);
            }
            else {
                this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
                this._admissionNum.val('');
                this._passportNum.val('');
                this.filterCombolist(this._countryOfIssuance, {}, null, this, this.processListABC);
            }
        });

        this._admissionNum.change(() => {
            if (!this.EmptyOrNA(this._admissionNum)) {
                this._alienuscisNum.val(this.na);
                this._alienuscisNumPrefix.val('');
                this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
    
                this._passportNum.val(this.na);
                this.filterCombolist(this._countryOfIssuance, {0:this.na}, '0', this, this.processListABC);
            }
            else {
                this._alienuscisNum.val('');
                this._alienuscisNumPrefix.val('');
                this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
                this._passportNum.val('');
                this.filterCombolist(this._countryOfIssuance, {}, null, this, this.processListABC);
            }
        });

        this._passportNum.change(() => {
            if (!this.EmptyOrNA(this._passportNum)) {
                this._alienuscisNum.val(this.na);
                this._alienuscisNumPrefix.val('');
                this.filterCombolist(this._alienuscisNumType, {0:this.na}, this.na, this, this.processListABC);
    
                this._admissionNum.val(this.na);
            
                if (this.EmptyOrNA(this._countryOfIssuance)) {
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

        this.processLPR(false);
        this.processAlien(false);

        this._employeeInfoHelp = this.renderHelpIcon(
            employeeInfoHelp,
            this._('employeeinfosection2help.caption'),
            dialog,
            this._('employeeinfosection2help.text')
        );            
    
        this._lastNameSection2 = lastName;
    
        this._lastNameSection2Help = this.renderHelpIcon(
            lastNameHelp,
            this._('lastnamesection2help.caption'),
            dialog,
            this._('lastnamesection2help.text')
        );
    
        this._firstNameSection2 = firstName;
    
        this._firstNameSection2Help = this.renderHelpIcon(
            firstNameHelp,
            this._('firstnamesection2help.caption'),
            dialog,
            this._('firstnamesection2help.text')
        );
            
        this._middleInitialSection2 = middleInitial;
    
        this._middleInitialSection2Help = this.renderHelpIcon(
            middleInitialHelp,
            this._('middleinitialsection2help.caption'), 
            dialog,
            this._('middleinitialsection2help.text')
        );
        
        this._immigrationStatus = immigrationStatus;
    
        this._immigrationStatusHelp = this.renderHelpIcon(
            immigrationStatusHelp,
            this._('immigrationstatushelp.caption'),
            dialog,
            this._('immigrationstatushelp.text')
        );

        this.renderListABC(
            dialog,
            listADoc,
            listADocHelp,
            listAIssuingAuthority,
            listAIssuingAuthorityHelp,
            listADocNumber,
            listADocNumberHelp,
            listADocExpDate,
            listADocExpDateHelp,
            listADoc2,
            listADoc2Help,
            listAIssuingAuthority2,
            listAIssuingAuthority2Help,
            listADocNumber2,
            listADocNumber2Help,
            listADocExpDate2,
            listADocExpDate2Help,
            listADoc3,
            listADoc3Help,
            listAIssuingAuthority3,
            listAIssuingAuthority3Help,
            listADocNumber3,
            listADocNumber3Help,
            listADocExpDate3,
            listADocExpDate3Help,
            listBDoc,
            listBDocHelp,
            listBIssuingAuthority,
            listBIssuingAuthorityHelp,
            listBDocNumber,
            listBDocNumberHelp,
            listBDocExpDate,
            listBDocExpDateHelp,
            listCDoc,
            listCDocHelp,
            listCIssuingAuthority,
            listCIssuingAuthorityHelp,
            listCDocNumber,
            listCDocNumberHelp,
            listCDocExpDate,
            listCDocExpDateHelp
        );
        
        this._additionalInfo = additionalInfo
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({ content: this._('additionalinfo.tooltip') })

        this._additionalInfoHelp = this.renderHelpIcon(
            additionalInfoHelp,
            this._('additionalinfohelp.caption'),
            dialog,
            this._('additionalinfohelp.text'),
            500
        );

        this.clearListABC();

        this._hireDate = hireDate
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({ content: this._('hiredate.tooltip') })
        .datepicker({minDate: new Date()});

        this._hireDateHelp = this.renderHelpIcon(
            hireDateHelp,
            this._('hiredatehelp.caption'),
            dialog,
            this._('hiredatehelp.text')
        );

        this.renderEmployerData(
            dialog,
            sgnEmployer,
            sgnEmployerHelp,
            employerSignDate,
            employerSignDateHelp,
            employerTitle,
            employerTitleHelp,
            employerLastName,
            employerLastNameHelp,
            employerFirstName,
            employerFirstNameHelp,
            employerName,
            employerNameHelp,
            employerAddress,
            employerAddressHelp,
            employerCity,
            employerCityHelp,
            employerState,
            employerStateHelp,
            employerZip,
            employerZipHelp
        );
    }

    protected validateFields(): string[] {
        let errorMessages = super.validateFields();

        // List A, B, C Fields
        let section2Fields = [this._listADoc,
                              this._listAIssuingAuthority,
                              this._listADocNumber,
                              this._listADocExpDate,
                              this._listADoc2,
                              this._listAIssuingAuthority2,
                              this._listADocNumber2,
                              this._listADocExpDate2,
                              this._listADoc3,
                              this._listAIssuingAuthority3,
                              this._listADocNumber3,
                              this._listADocExpDate3,
                              this._listBDoc,
                              this._listBIssuingAuthority,
                              this._listBDocNumber,
                              this._listBDocExpDate,
                              this._listCDoc,
                              this._listCIssuingAuthority,
                              this._listCDocNumber,
                              this._listCDocExpDate,
                              this._additionalInfo];
                              
        if (section2Fields.filter(f => (f.val() as string).trim() !== '').length == 0) {
            return errorMessages;
        }

        section2Fields.filter(f => (f.val() as string).trim() === '' && !f.prop('required')).forEach(f => f.val(this.na));

        section2Fields.forEach(f => f.toggleClass(this.invalidFieldClass, false));

        this._lastNameSection2.val(this._lastName.val());
        this._firstNameSection2.val(this._firstName.val());
        this._middleInitialSection2.val(this._middleInitial.val());
        this._immigrationStatus.val(this._citizen.prop('checked') ? 1 :
            (this._national.prop('checked') ? 2 : (this._lpr.prop('checked') ? 3 :
            (this._alien.prop('checked') ? 4 : ''))));

        if (((this._listADoc.val() as string).trim() !== this.na &&
            ((this._listBDoc.val() as string).trim() !== this.na ||
             (this._listCDoc.val() as string).trim() !== this.na) ||
            ((this._listADoc.val() as string).trim() === this.na &&
            ((this._listBDoc.val() as string).trim() === this.na ||
             (this._listCDoc.val() as string).trim() === this.na)))) {
            errorMessages.push(this._('section2.listabc'));
        } else if ((this._listADoc.val() as string).trim() !== this.na) {
            if ((this._listADocNumber.val() as string).trim() === '') {
                errorMessages.push(this._('section2.listafirstdocnumber'));
                this._listADocNumber.toggleClass(this.invalidFieldClass, true);
            }
            else if (this._listADocNumber.prop(this.validationExpressionProp) &&
                !(this._listADocNumber.prop(this.validationExpressionProp) as RegExp)
                 .test(this._listADocNumber.val() as string) &&
                 this._listADocNumber.prop(this.validationMessageProp)) {
                errorMessages.push(this._listADocNumber.prop(this.validationMessageProp));
                this._listADocNumber.toggleClass(this.invalidFieldClass, true);
            }
            
            if ((this._listADocNumber2.val() as string).trim() === '') {
                errorMessages.push(this._('section2.listaseconddocnumber'));
                this._listADocNumber2.toggleClass(this.invalidFieldClass, true);
            }
            
            if ((this._listADocNumber3.val() as string).trim() === '') {
                errorMessages.push(this._('section2.listathirddocnumber'));
                this._listADocNumber3.toggleClass(this.invalidFieldClass, true);
            }
            
            if ((this._listADocExpDate.val() as string).trim() === '') {
                errorMessages.push(this._('section2.listafirstexpdate'));
                this._listADocExpDate.toggleClass(this.invalidFieldClass, true);
            }
            
            if ((this._listADocExpDate2.val() as string).trim() === '') {
                errorMessages.push(this._('section2.listasecondexpdate'));
                this._listADocExpDate2.toggleClass(this.invalidFieldClass, true);
            }
            
            if ((this._listADocExpDate3.val() as string).trim() === '') {
                errorMessages.push(this._('section2.listathirdexpdate'));
                this._listADocExpDate3.toggleClass(this.invalidFieldClass, true);
            }
        } else { 
            if ((this._listBDoc.val() as string).trim() !== this.na) {
                if ((this._listBDocNumber.val() as string).trim() === '') {
                    errorMessages.push(this._('section2.listbdocnumber'));
                    this._listBDocNumber.toggleClass(this.invalidFieldClass, true);
                } else if (this._listBDocNumber.prop(this.validationExpressionProp) &&
                    !(this._listBDocNumber.prop(this.validationExpressionProp) as RegExp)
                    .test(this._listBDocNumber.val() as string) &&
                    this._listBDocNumber.prop(this.validationMessageProp)) {
                    errorMessages.push(this._listBDocNumber.prop(this.validationMessageProp));
                    this._listBDocNumber.toggleClass(this.invalidFieldClass, true);
                }
            }

            if ((this._listCDoc.val() as string).trim() !== this.na) {
                if (this._listCDoc.prop('ssncard') && !confirm(this._('section2.ssncardnotvalid'))) {
                    errorMessages.push(this._('section2.ssncardnotvalidformat'));
                    this._listCDoc.toggleClass(this.invalidFieldClass, true);
                } else if (this._listCDocNumber.prop(this.validationExpressionProp) &&
                    !(this._listCDocNumber.prop(this.validationExpressionProp) as RegExp)
                    .test(this._listCDocNumber.val() as string) &&
                    this._listCDocNumber.prop(this.validationMessageProp)) {
                    errorMessages.push(this._listCDocNumber.prop(this.validationMessageProp));
                    this._listCDocNumber.toggleClass(this.invalidFieldClass, true);
                }
            }
        }

        return errorMessages;
    }

    private processLPR(flag: boolean) {
        var na = flag ? this.na : '';
        this._lpruscisNumPrefix.val('');
        this._lpruscisNum.prop('disabled', true).val(na);
        this._lpruscisNumType.prop('disabled', true);

        this.filterCombolist(this._lpruscisNumType, {}, null, this, this.processListABC);
    }

    private processAlien(flag: boolean) {
        var na = flag ? this.na : '';
        this._alienWorkAuthDate.prop('disabled', true).val(na);
        this._alienuscisNumPrefix.val('');
        this._alienuscisNum.prop('disabled', true).val(na);
        this._alienuscisNumType.prop('disabled', true);
        this._admissionNum.prop('disabled', true).val(na);
        this._passportNum.prop('disabled', true).val(na);
        this._countryOfIssuance.prop('disabled', true);

        this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
        this.filterCombolist(this._countryOfIssuance, flag ? {0:na} : {}, flag ? '0' : null, this, this.processListABC);
    }

    private renderEmployerData(
        dialog: JQuery<HTMLElement>,
        sgnEmployer: JQuery<HTMLElement>,
        sgnEmployerHelp: JQuery<HTMLElement>,
        employerSignDate: JQuery<HTMLElement>,
        employerSignDateHelp: JQuery<HTMLElement>,
        employerTitle: JQuery<HTMLElement>,
        employerTitleHelp: JQuery<HTMLElement>,
        employerLastName: JQuery<HTMLElement>,
        employerLastNameHelp: JQuery<HTMLElement>,
        employerFirstName: JQuery<HTMLElement>,
        employerFirstNameHelp: JQuery<HTMLElement>,
        employerName: JQuery<HTMLElement>,
        employerNameHelp: JQuery<HTMLElement>,
        employerAddress: JQuery<HTMLElement>,
        employerAddressHelp: JQuery<HTMLElement>,
        employerCity: JQuery<HTMLElement>,
        employerCityHelp: JQuery<HTMLElement>,
        employerState: JQuery<HTMLElement>,
        employerStateHelp: JQuery<HTMLElement>,
        employerZip: JQuery<HTMLElement>,
        employerZipHelp: JQuery<HTMLElement>){
            
        this._sgnEmployer = sgnEmployer
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('sgnemployer.tooltip')});

        this._sgnEmployerHelp = this.renderHelpIcon(
            sgnEmployerHelp,
            this._('sgnemployerhelp.caption'),
            dialog,
            this._('sgnemployerhelp.text'),
            500
        );

        this._employerSignDate = employerSignDate
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employersigndate.tooltip')})
        .datepicker({minDate: new Date()});

        this._employerSignDateHelp = this.renderHelpIcon(
            employerSignDateHelp,
            this._('employersigndatehelp.caption'),
            dialog,
            this._('employersigndatehelp.text'),
            500
        );

        this._employerTitle = employerTitle
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employertitle.tooltip')});

        this._employerTitleHelp = this.renderHelpIcon(
            employerTitleHelp,
            this._('employertitlehelp.caption'),
            dialog,
            this._('employertitlehelp.text'),
            500
        );

        this._employerLastName = employerLastName
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employerlastname.tooltip')});

        this._employerLastNameHelp = this.renderHelpIcon(
            employerLastNameHelp,
            this._('employerlastnamehelp.caption'),
            dialog,
            this._('employerlastnamehelp.text'),
            500
        );

        this._employerFirstName = employerFirstName
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employerfirstname.tooltip')});

        this._employerFirstNameHelp = this.renderHelpIcon(
            employerFirstNameHelp,
            this._('employerfirstnamehelp.caption'),
            dialog,
            this._('employerfirstnamehelp.text'),
            500
        );

        this._employerName = employerName
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employername.tooltip')});

        this._employerNameHelp = this.renderHelpIcon(
            employerNameHelp,
            this._('employernamehelp.caption'),
            dialog,
            this._('employernamehelp.text'),
            500
        );

        this._employerAddress = employerAddress
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employeraddress.tooltip')});

        this._employerAddressHelp = this.renderHelpIcon(
            employerAddressHelp,
            this._('employeraddresshelp.caption'),
            dialog,
            this._('employeraddresshelp.text'),
            500
        );

        this._employerCity = employerCity
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employercity.tooltip')});

        this._employerCityHelp = this.renderHelpIcon(
            employerCityHelp,
            this._('employercityhelp.caption'),
            dialog,
            this._('employercityhelp.text'),
            500
        );

        this._employerState = employerState
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employerstate.tooltip')});

        this._employerStateHelp = this.renderHelpIcon(
            employerStateHelp,
            this._('employerstatehelp.caption'),
            dialog,
            this._('employerstatehelp.text'),
            500
        );

        this._employerZip = employerZip
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employerzip.tooltip')})
        .keypress(e => this.zipFormat.test(String.fromCharCode(e.which)));

        this._employerZipHelp = this.renderHelpIcon(
            employerZipHelp,
            this._('employerziphelp.caption'),
            dialog,
            this._('employerziphelp.text')
        );
    }

    //region "List A/B/C" methods
    private renderListABC(
        dialog: JQuery<HTMLElement>,
        listADoc: JQuery<HTMLElement>,
        listADocHelp: JQuery<HTMLElement>,
        listAIssuingAuthority: JQuery<HTMLElement>,
        listAIssuingAuthorityHelp: JQuery<HTMLElement>,
        listADocNumber: JQuery<HTMLElement>,
        listADocNumberHelp: JQuery<HTMLElement>,
        listADocExpDate: JQuery<HTMLElement>,
        listADocExpDateHelp: JQuery<HTMLElement>,
        listADoc2: JQuery<HTMLElement>,
        listADoc2Help: JQuery<HTMLElement>,
        listAIssuingAuthority2: JQuery<HTMLElement>,
        listAIssuingAuthority2Help: JQuery<HTMLElement>,
        listADocNumber2: JQuery<HTMLElement>,
        listADocNumber2Help: JQuery<HTMLElement>,
        listADocExpDate2: JQuery<HTMLElement>,
        listADocExpDate2Help: JQuery<HTMLElement>,
        listADoc3: JQuery<HTMLElement>,
        listADoc3Help: JQuery<HTMLElement>,
        listAIssuingAuthority3: JQuery<HTMLElement>,
        listAIssuingAuthority3Help: JQuery<HTMLElement>,
        listADocNumber3: JQuery<HTMLElement>,
        listADocNumber3Help: JQuery<HTMLElement>,
        listADocExpDate3: JQuery<HTMLElement>,
        listADocExpDate3Help: JQuery<HTMLElement>,
        listBDoc: JQuery<HTMLElement>,
        listBDocHelp: JQuery<HTMLElement>,
        listBIssuingAuthority: JQuery<HTMLElement>,
        listBIssuingAuthorityHelp: JQuery<HTMLElement>,
        listBDocNumber: JQuery<HTMLElement>,
        listBDocNumberHelp: JQuery<HTMLElement>,
        listBDocExpDate: JQuery<HTMLElement>,
        listBDocExpDateHelp: JQuery<HTMLElement>,
        listCDoc: JQuery<HTMLElement>,
        listCDocHelp: JQuery<HTMLElement>,
        listCIssuingAuthority: JQuery<HTMLElement>,
        listCIssuingAuthorityHelp: JQuery<HTMLElement>,
        listCDocNumber: JQuery<HTMLElement>,
        listCDocNumberHelp: JQuery<HTMLElement>,
        listCDocExpDate: JQuery<HTMLElement>,
        listCDocExpDateHelp: JQuery<HTMLElement>){

        this._listADoc = listADoc
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listadoc.tooltip')});
    
        this._listADocHelp = this.renderHelpIcon(
            listADocHelp,
            this._('listadochelp.caption'),
            dialog,
            this._('listadochelp.text'),
            500
        );
    
        this._listAIssuingAuthority = listAIssuingAuthority
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listaissuingauthority.tooltip')});
    
        this._listAIssuingAuthorityHelp = this.renderHelpIcon(
            listAIssuingAuthorityHelp,
            this._('listaissuingauthorityhelp.caption'),
            dialog,
            this._('listaissuingauthorityhelp.text'),
            500
        );
    
        this._listADocNumber = listADocNumber
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listadocnumber.tooltip')});
    
        this._listADocNumberHelp = this.renderHelpIcon(
            listADocNumberHelp,
            this._('listadocnumberhelp.caption'),
            dialog,
            this._('listadocnumberhelp.text'),
            500
        );
    
        this._listADocExpDate = listADocExpDate
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listaexpdate.tooltip')})
        .datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        });
    
        this._listADocExpDateHelp = this.renderHelpIcon(
            listADocExpDateHelp,
            this._('listaexpdatehelp.caption'),
            dialog,
            this._('listaexpdatehelp.text'),
            500
        );
    
        this._listADoc2 = listADoc2
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listadoc2.tooltip')});
    
        this._listADoc2Help = this.renderHelpIcon(
            listADoc2Help,
            this._('listadoc2help.caption'),
            dialog,
            this._('listadoc2help.text'),
            500
        );
    
        this._listAIssuingAuthority2 = listAIssuingAuthority2
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listaissuingauthority2.tooltip')});
        
        this._listAIssuingAuthority2Help = this.renderHelpIcon(
            listAIssuingAuthority2Help,
            this._('listaissuingauthority2help.caption'),
            dialog,
            this._('listaissuingauthority2help.text'),
            500
        );
    
        this._listADocNumber2 = listADocNumber2
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listadocnumber2.tooltip')});
        
        this._listADocNumber2Help = this.renderHelpIcon(
            listADocNumber2Help,
            this._('listadocnumber2help.caption'),
            dialog,
            this._('listadocnumber2help.text'),
            500
        );
    
        this._listADocExpDate2 = listADocExpDate2
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listaexpdate2.tooltip')})
        .datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        });
        
        this._listADocExpDate2Help = this.renderHelpIcon(
            listADocExpDate2Help,
            this._('listaexpdate2help.caption'),
            dialog,
            this._('listaexpdate2help.text'),
            500
        );
    
        this._listADoc3 = listADoc3
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listadoc3.tooltip')});
    
        this._listADoc3Help = this.renderHelpIcon(
            listADoc3Help,
            this._('listadoc3help.caption'),
            dialog,
            this._('listadoc3help.text'),
            500
        );
        
        this._listAIssuingAuthority3 = listAIssuingAuthority3
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listaissuingauthority3.tooltip')});
        
        this._listAIssuingAuthority3Help = this.renderHelpIcon(
            listAIssuingAuthority3Help,
            this._('listaissuingauthority3help.caption'),
            dialog,
            this._('listaissuingauthority3help.text'),
            500
        );
    
        this._listADocNumber3 = listADocNumber3
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listadocnumber3.tooltip')});
        
        this._listADocNumber3Help = this.renderHelpIcon(
            listADocNumber3Help,
            this._('listadocnumber3help.caption'),
            dialog,
            this._('listadocnumber3help.text'),
            500
        );
    
        this._listADocExpDate3 = listADocExpDate3
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listaexpdate3.tooltip')})
        .datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        });
        
        this._listADocExpDate3Help = this.renderHelpIcon(
            listADocExpDate3Help,
            this._('listaexpdate3help.caption'),
            dialog,
            this._('listaexpdate3help.text'),
            500
        );
    
        this._listBDoc = listBDoc
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listbdoc.tooltip')});
    
        this._listBDocHelp = this.renderHelpIcon(
            listBDocHelp,
            this._('listbdochelp.caption'),
            dialog,
            this._('listbdochelp.text'),
            600
        );
    
        this.filterCombolist(this._listBDoc, this.getListBContent(null), null, this, this.processListABC);
    
        this._listBIssuingAuthority = listBIssuingAuthority
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listbissuingauthority.tooltip')});
        
        this._listBIssuingAuthorityHelp = this.renderHelpIcon(
            listBIssuingAuthorityHelp,
            this._('listbissuingauthorityhelp.caption'),
            dialog,
            this._('listbissuingauthorityhelp.text'),
            500
        );
    
        this._listBDocNumber = listBDocNumber
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listbdocnumber.tooltip')});
    
        this._listBDocNumberHelp = this.renderHelpIcon(
            listBDocNumberHelp,
            this._('listbdocnumberhelp.caption'),
            dialog,
            this._('listbdocnumberhelp.text'),
        );
    
        this._listBDocExpDate = listBDocExpDate
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listbexpdate.tooltip')})
        .datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        });
        
        this._listBDocExpDateHelp = this.renderHelpIcon(
            listBDocExpDateHelp,
            this._('listbexpdatehelp.caption'),
            dialog,
            this._('listbexpdatehelp.text'),
            500
        );
    
        this._listCDoc = listCDoc
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listcdoc.tooltip')});
    
        this._listCDocHelp = this.renderHelpIcon(
            listCDocHelp,
            this._('listcdochelp.caption'),
            dialog,
            this._('listcdochelp.text'),
            600
        );
    
        this.filterCombolist(this._listCDoc, this.getListCContent(null), null, this, this.processListABC);
    
        this._listCIssuingAuthority = listCIssuingAuthority
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listcissuingauthority.tooltip')});
        
        this._listCIssuingAuthorityHelp = this.renderHelpIcon(
            listCIssuingAuthorityHelp,
            this._('listcissuingauthorityhelp.caption'),
            dialog,
            this._('listcissuingauthorityhelp.text'),
            500
        );
    
        this._listCDocNumber = listCDocNumber
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listcdocnumber.tooltip')});
    
        this._listCDocNumberHelp = this.renderHelpIcon(
            listCDocNumberHelp,
            this._('listcdocnumberhelp.caption'),
            dialog,
            this._('listcdocnumberhelp.text'),
        );
    
        this._listCDocExpDate = listCDocExpDate
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listcexpdate.tooltip')})
        .datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        });
        
        this._listCDocExpDateHelp = this.renderHelpIcon(
            listCDocExpDateHelp,
            this._('listcexpdatehelp.caption'),
            dialog,
            this._('listcexpdatehelp.text'),
            500
        );
    }

    protected processListABC(ddl: string, code: string, self: USI9Section2) {
        switch(ddl)
        {
        case 'ListADocTitle':
            self.listADocTitle(ddl, code);

            break;

        case 'ListADocTitle2':
            self.listADocTitle2(ddl, code);

            break;
        
        case 'ListADocTitle3':
            self.listADocTitle3(ddl, code);

            break;

        case 'ListBDocTitle':
            self.listBDocTitle(ddl, code);

            break;

        case 'ListCDocTitle':
            self.listCDocTitle(ddl, code);

            break;
        }
    }

    protected getListAContent(citizenship: string) {
        let usCitizenorNational = {'': '', 0: this.na, 1: this._('uspassport'), 2: this._('uspassportcard')};
        let lpr = {
            0: this.na,
            3: this._('permanentresidentcard'),
            4: this._('alienresidentcard'),
            5: this._('foreignpassport'),
            10: this._('I551I94receipt'),
            12: this._('I551receipt')
        };
        let alien = {
            0: this.na,
            6: this._('eadI766'),
            7: this._('foreinpassportnonimmigrant'),
            8: this._('FSMpassport'),
            9: this._('RMIpassport'),
            11: this._('I94refugeestampreceipt'),
            13: this._('I766receipt'),
            14: this._('foreinpassportnonimmigrantreceipt'),
            15: this._('FSMpassportreceipt'),
            16: this._('RMIpassportreceipt')
        };

        switch (citizenship)
        {
            case '0': case null:
                return $.extend(usCitizenorNational, lpr, alien);
            case '1': case '2':
                return usCitizenorNational;
            case '3':
                return lpr;
            case '4':
                return alien;
        }
    }

    protected getListBContent(dob: string) {
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

        $.each(listB, (i, v) => listB[i] = decodeURIComponent(v));

        return listB;
    }

    protected getListCContent(citizenship: string) {
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
                11: this._('birthCertificateReceipt'),
                12: this._('tribalDocumentReceipt')
            });
        }

        if (['3', '4', '0', null].indexOf(citizenship) >= 0) {
            listC = $.extend(listC, {
                9: this._('eadListC'),
                13: this._('eadListCReceipt')
            });
        }

        $.each(listC, (i, v) => listC[i] = decodeURIComponent(v));

        return listC;
    }

    private listADocTitle(ddl: string, code: string) {
        let USDS = 'USDS';
        let USCIS = 'USCIS'
        let DOJINS = 'DOJINS';
        let DHS = 'DHS';
        let CBP = 'CBP';
        let FSM = 'FSM';
        let RMI = 'RMI';

        let numberMaxLength = 15;
        let fieldFormat = /^[a-zA-Z0-9]+$/;
        let fieldValidationExpression: RegExp = null;
        let fieldValidationMessage: string = null;
        let issuingAuthList: { [index: string]: string; };
        let issuingAuth: string = null;

        // restore min date after 6:I-766
        this._listADocExpDate.datepicker('option', 'minDate', new Date());

        this._listADocNumber.prop('required', true);
        this._listADocExpDate.prop('required', true);
            
        if (['1', '2'].indexOf(code) >= 0) {
            // 1 - U.S. Passport
            // 2 - U.S. Passport Card
            issuingAuthList = { USDS: this._(USDS) };
            issuingAuth = USDS;
            numberMaxLength = 9;
            fieldValidationExpression = this.usPassportNumberFormat;
            fieldValidationMessage = this._('section2.uspassportformat');
        } else if (code === '3') {
            // 3 - Perm. Resident Card (Form I-551)
            issuingAuthList = { USCIS: this._(USCIS), DOJINS: this._(DOJINS) };
            issuingAuth = USCIS;
            numberMaxLength = 13;
            fieldValidationExpression = this.cardNumberFormat;
            fieldValidationMessage = this._('section2.cardformat');
        } else if (code === '4') {
            // 4 - Alien Reg. Receipt Card (Form I-551)
            issuingAuthList = { DOJINS: this._(DOJINS) };
            issuingAuth = DOJINS;
            numberMaxLength = 13;
            fieldValidationExpression = this.cardNumberFormat;
            fieldValidationMessage = this._('section2.cardformat');
        } else if (code === '5') {
            // 5 - Foreign Passport
            issuingAuthList = JSON.parse(this._('countries'));
            issuingAuth = null;        
            numberMaxLength = 12;
            fieldValidationExpression = this.passportNumberFormat;
            fieldValidationMessage = this._('section2.passportformat');
        
            this.filterCombolist(
                this._listADoc2,
                {1: this._('temporaryI551stamp'), 2: this._('mrivstamp')},
                '1',
                this,
                this.processListABC);
        
            this.filterCombolist(
                this._listAIssuingAuthority2,
                { USCIS: this._(USCIS), DOJINS: this._(DOJINS) },
                USCIS,
                this,
                this.processListABC);
        
            this._listADocNumber2.attr('readOnly', 'true').val(this.na);
        } else if (code === '10') {
            // 10 - Receipt: Form I-94/I-94A w/I-551 stamp, photo
            issuingAuthList = {DHS: this._(DHS)};
            issuingAuth = DHS;            
            numberMaxLength = 11;
            fieldFormat = this.numberFormat;
            fieldValidationExpression = this.admissionNumberFormat
            fieldValidationMessage = this._('admissionnumber.format');
        } else if (code === '12') {
            // 12 - Receipt replacement Perm. Res. Card (Form I-551)
            issuingAuthList = { USCIS: this._(USCIS) };
            issuingAuth = USCIS;        
            numberMaxLength = 13;
            fieldValidationExpression = this.cardNumberFormat;
            fieldValidationMessage = this._('section2.cardformat');
        } else if (code === '6') {
            // Alien authorized to work
            // 6 - Employment Auth. Document (Form I-766)
            issuingAuthList = { USCIS: this._(USCIS) };
            issuingAuth = USCIS;
            numberMaxLength = 13;
            fieldValidationExpression = this.cardNumberFormat;
            fieldValidationMessage = this._('section2.cardformat');
        
            // I-766 can be expired in conjuction with I-797C (up to 180 days);
            this._listADocExpDate.datepicker('option', 'minDate', 
                new Date(Date.now() - 180 * 24 * 3600 * 1000));
        } else if (['7', '14'].indexOf(code) >= 0) {
             // 7 - Foreign Passport, work-authorized nonimmigrant
            // 14 - Receipt: Replacement Foreign Passport, work-authorized nonimmigrant
            issuingAuthList = JSON.parse(this._('countries'));
            issuingAuth = null;        
            numberMaxLength = 12;
            fieldValidationExpression = this.passportNumberFormat;
            fieldValidationMessage = this._('section2.passportformat');
        
            this.filterCombolist(
                this._listADoc2,
                {3: this._('formI94'), 4: this._('formI94receipt')},
                '3',
                this,
                this.processListABC);
        
            this.filterCombolist(
                this._listAIssuingAuthority2,
                {USCIS:this._(USCIS), CBP:this._(CBP)},
                USCIS,
                this,
                this.processListABC);
        
            this.filterCombolist(
                this._listADoc3,
                {0: this.na, 1: this._('formI20'), 2: this._('formDS2019')},
                '0',
                this,
                this.processListABC);
        
            this.filterCombolist(this._listAIssuingAuthority3, {0:this.na}, '0', this, this.processListABC);
            this._listADocNumber3.attr('readOnly', 'true').val(this.na);
            this._listADocExpDate3.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        } else if (code === '8') {
            // 8 - FSM Passport with Form I-94
            issuingAuthList = { FSM: this._(FSM) };
            issuingAuth = FSM;        
            numberMaxLength = 12;
            fieldValidationExpression = this.passportNumberFormat;
            fieldValidationMessage = this._('section2.passportformat');
        
            this.filterCombolist(
                this._listADoc2,
                {3: this._('formI94'), 4: this._('formI94receipt')},
                '3',
                this,
                this.processListABC);
        
            this.filterCombolist(
                this._listAIssuingAuthority2,
                {USCIS:this._(USCIS), CBP:this._(CBP)},
                USCIS,
                this,
                this.processListABC);
        } else if (code === '9') {
            // 9 - RMI Passport with Form I-94
            issuingAuthList = { RMI: this._(RMI) };
            issuingAuth = RMI;
            numberMaxLength = 12;
            fieldValidationExpression = this.passportNumberFormat;
            fieldValidationMessage = this._('section2.passportformat');
        
            this.filterCombolist(
                this._listADoc2,
                {3: this._('formI94'), 4: this._('formI94receipt')},
                '3',
                this,
                this.processListABC);
        
            this.filterCombolist(
                this._listAIssuingAuthority2,
                {USCIS:this._(USCIS), CBP:this._(CBP)},
                USCIS,
                this,
                this.processListABC);
        } else if (code === '11') {
            // 11 - Receipt: Form I-94/I-94A w/refugee stamp
            issuingAuthList = { DHS: this._(DHS) };
            issuingAuth = DHS;      
            numberMaxLength = 11;
            numberMaxLength = 11;
            fieldFormat = this.numberFormat;
            fieldValidationExpression = this.admissionNumberFormat
            fieldValidationMessage = this._('admissionnumber.format');
        } else if (code === '13') {
            // 13 - Receipt replacement EAD (Form I-766)
            issuingAuthList = { USCIS: this._(USCIS) };
            issuingAuth = USCIS;        
            numberMaxLength = 13;
            fieldValidationExpression = this.cardNumberFormat;
            fieldValidationMessage = this._('section2.cardformat');
        } else if (code === '15') {
            // 15 - Receipt: Replacement FSM Passport with Form I-94
            issuingAuthList = { 'FSM': this._('FSM') };
            issuingAuth = 'FSM';
            numberMaxLength = 12;
            fieldValidationExpression = this.passportNumberFormat;
            fieldValidationMessage = this._('section2.passportformat');
        } else if (code === '16') {
            // 16 - Receipt: Replacement RMI Passport with Form I-94
            issuingAuthList = { RMI: this._(RMI) };
            issuingAuth = RMI;
            numberMaxLength = 12;
            fieldValidationExpression = this.passportNumberFormat;
            fieldValidationMessage = this._('section2.passportformat');
        }
        
        this._listADocNumber
        .prop('maxLength', numberMaxLength)
        .keypress(e => fieldFormat.test(String.fromCharCode(e.which)));

        this._listADocNumber.prop(this.validationExpressionProp,  fieldValidationExpression);    
        this._listADocNumber.prop(this.validationMessageProp, fieldValidationMessage);

        this.filterCombolist(
            this._listAIssuingAuthority,
            issuingAuthList,
            issuingAuth,
            this,
            this.processListABC);
        
        if (['1', '2', '3', '4', '6', '10', '11', '12'].indexOf(code) >= 0) {
            this.filterCombolist(this._listADoc2, {0:this.na}, '0', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority2, {0: this.na}, '0', this, this.processListABC);
            this._listADocNumber2.attr('readOnly', 'true').val(this.na);
            this._listADocExpDate2.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        }
        
        if (['1', '2', '3', '4', '5', '6', '8', '9', '10', '11', '12', '15', '16'].indexOf(code) >= 0) {
            this.filterCombolist(this._listADoc3, {0:this.na}, '0', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority3, {0: this.na}, '0', this, this.processListABC);
            this._listADocNumber3.attr('readOnly', 'true').val(this.na);
            this._listADocExpDate3.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        }
        
        if (code !== '0'){
            // List B area
            this.setCombolistValue(this._listBDoc, '0');
            this.filterCombolist(this._listBIssuingAuthority, {0: this.na}, '0', this, null);
            this._listBDocNumber.attr('readOnly', 'true').val(this.na);
            this._listBDocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        
            // List C area
            this.setCombolistValue(this._listCDoc, '0');
            this.filterCombolist(this._listCIssuingAuthority, {0: this.na}, '0', this, null);
            this._listCDocNumber.attr('readOnly', 'true').val(this.na);
            this._listCDocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        }
    }

    private listADocTitle2(ddl: string, code: string) {
        let USDS = 'USDS';
        let USCIS = 'USCIS';
        let DOJINS = 'DOJINS';

        let numberMaxLength = 11;
        let fieldFormat = /^[a-zA-Z0-9]+$/;

        this._listADocNumber2.prop('required', true);
        this._listADocExpDate2.prop('required', true);
      
        if (code === '1') {
            // 1 - Temporary I-551 Stamp
            this.filterCombolist(
                this._listAIssuingAuthority2,
                { USCIS: this._(USCIS), DOJINS: this._(DOJINS) },
                USCIS,
                this,
                this.processListABC);
        } else if (code === '2') {
            // 2 - Machine-readable immigrant visa (MRIV)
            this.filterCombolist(
                this._listAIssuingAuthority2,
                { USDS: this._(USDS) },
                USDS,
                this,
                this.processListABC);
        } else if (code === '3') {
            // 3 - Form I-94/I-94A
            fieldFormat = /^\d+$/;
        }

        // 4 - Receipt: Replacement Form I-94/I-94A
        // default parameters

        this._listADocNumber2
        .prop('maxLength', numberMaxLength)
        .keypress(e => fieldFormat.test(String.fromCharCode(e.which)));

        this._listADocExpDate2
        .unbind('keypress');
    }

    private listADocTitle3(ddl: string, code: string) {
        let ICE = 'ICE';
        let DOJINS = 'DOJINS';
        let USDS = 'USDS';

        this._listADocNumber3.prop('required', true);
        this._listADocExpDate3.prop('required', true);

        // 0 - N/A
        if (code === '0') {
            this.filterCombolist(this._listAIssuingAuthority3, {0:this.na}, '0', this, this.processListABC);
            this._listADocNumber3.attr('readOnly', 'true').val(this.na);
            this._listADocExpDate3.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        } else if (code === '1') {
            // 1 - Form I-20
            this.filterCombolist(
                this._listAIssuingAuthority3,
                { ICE: this._(ICE), DOJINS: this._(DOJINS) },
                ICE,
                this,
                this.processListABC);
            
            this._listADocNumber3.removeAttr('readOnly').val('');
            this._listADocExpDate3.removeAttr('readOnly')
            .unbind('keypress')
            .keypress(e =>
                /[\d/]/g.test(String.fromCharCode(e.which)) ||
                this.NAFormat.test(String.fromCharCode(e.which)))
            .val('').datepicker('option', 'showOn', 'focus');
        } else if (code === '2') {
            // 2 - Form DS-2019
            this.filterCombolist(
                this._listAIssuingAuthority3,
                { USDS: this._(USDS) },
                USDS,
                this,
                this.processListABC);
            
            this._listADocNumber3.removeAttr('readOnly').val('');
            this._listADocExpDate3.removeAttr('readOnly')
            .unbind('keypress')
            .keypress(e =>
                /[\d/]/g.test(String.fromCharCode(e.which)) ||
                this.NAFormat.test(String.fromCharCode(e.which))
            ).val('').datepicker('option', 'showOn', 'focus');
        }
    }

    private listBDocTitle(ddl: string, code: string) {
        let USCG = 'USCG';

        let numberMaxLength = 15;
        let fieldFormat = /^[a-zA-Z0-9]+$/;
        let fieldValidationExpression: RegExp = null;
        let fieldValidationMessage: string = null;
        let issuingAuthList: { [index: string]: string; };
        let issuingAuth: string = null;

        this._listBDocNumber
        .prop('maxLength', '100')
        .unbind('keypress');

        this.clearListA();

        this._listBDocNumber.prop('required', true);
        this._listBDocExpDate.prop('required', true);

        // NOT 19 - Individual under Age 18
        // NOT 20 - Special Placement
        if (['19', '20'].indexOf(code) < 0) {
            this._listBDocNumber.removeAttr('readOnly').val('');
            this._listBDocExpDate.removeAttr('readOnly')
            .unbind('keypress')
            .keypress(e =>
                /[\d/]/g.test(String.fromCharCode(e.which)) ||
                this.NAFormat.test(String.fromCharCode(e.which)))
            .val('').datepicker('option', 'showOn', 'focus');
        }

        if (['1', '2', '21', '22'].indexOf(code) >= 0) {
            // 1 - Driver’s license issued by state/territory
            // 2 - ID card issued by state/territory
            // 21 - Receipt: Replacement driver’s license
            // 22 - Receipt: Replacement ID card
            issuingAuthList = JSON.parse(this._('usstates'));
            issuingAuth = 'AL';

            numberMaxLength = 14;

            this._listBDocNumber
            .prop('maxLength', numberMaxLength)
            .keypress(e => fieldFormat.test(String.fromCharCode(e.which)));

            this._listBIssuingAuthority.attr('readOnly', 'true');

            fieldValidationExpression = this.driverLicenseNumberFormat;
            fieldValidationMessage = this._('section2.listbnumberformat');
        } else if (['3', '4', '5', '6', '7', '8', '10', '12', '13', '14', '15', '16', '17', '18',
             '23', '24', '25', '26', '27', '28', '31', '32', '33', '34', '35', '36', '37', '38'].indexOf(code) >= 0) {
            // 3 - Government ID
            // 4 - School ID
            // 5 - Voter registration card
            // 6 - U.S. Military card
            // 7 - U.S. Military draft record
            // 8 - Military dependent’s ID card
            // 10 - Native American tribal document
            // 12 - School record (under age 18)
            // 13 - Report card (under age 18)
            // 14 - Clinic record (under age 18)
            // 15 - Doctor record (under age 18)
            // 16 - Hospital record (under age 18)
            // 17 - Day-care record (under age 18)
            // 18 - Nursery school record (under age 18)
            // 23 - Receipt: Replacement Gov’t ID
            // 24 - Receipt: Replacement School ID
            // 25 - Receipt: Replacement Voter reg. card
            // 26 - Receipt: Replacement U.S. Military card
            // 27 - Receipt: Replacement U.S. Military dep.
            // 28 - Receipt: Replacement Military draft record
            // 31 - Receipt: Replacement Native American tribal doc
            // 32 - Replacement School record (under age 18)
            // 33 - Replacement Report card (under age 18)
            // 34 - Receipt: Replacement Clinic record (under age 18)
            // 35 - Receipt: Replacement Doctor record (under age 18)
            // 36 - Receipt: Replacement Hospital record (under age 18)
            // 37 - Receipt: Replacement Day-care record (under age 18)
            // 38 - Receipt: Replacement Nursery school record (under age 18)
            issuingAuthList = {};
            issuingAuth = null;

            this._listBIssuingAuthority.removeAttr('readOnly');
        } else if (['9', '29'].indexOf(code) >= 0) {
            // 9 - USCG Merchant Mariner card
            // 29 - Receipt: Replacement Merchant Mariner
            issuingAuthList = { USCG: this._(USCG) };
            issuingAuth = USCG;

            this._listBIssuingAuthority.attr('readOnly', 'true');
        } else  if (['11', '30'].indexOf(code) >= 0) {
            // 11 - Canadian driver’s license
            // 30 - Receipt: Replacement Canadian DL
            issuingAuthList = JSON.parse(this._('canada'));
            issuingAuth = null;

            this._listBIssuingAuthority.attr('readOnly', 'true');
        } else if (['19'].indexOf(code) >= 0) {
            // 19 - Individual under Age 18
            // 20 - Special Placement
            issuingAuthList = {'0':this.na};
            issuingAuth = '0';

            this._listBDocNumber.attr('readOnly', 'true').val(this.na);
            this._listBDocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        }

        this.filterCombolist(
            this._listBIssuingAuthority,
            issuingAuthList,
            issuingAuth,
            this,
            this.processListABC);

        this._listBDocNumber.prop(this.validationExpressionProp,  fieldValidationExpression);    
        this._listBDocNumber.prop(this.validationMessageProp, fieldValidationMessage);
    }

    private listCDocTitle(ddl: string, code: string) {
        let SSA = 'SSA';
        let USDHHS = 'USDHHS';
        let SSD = 'SSD';
        let DHEW = 'DHEW';
        let USDS = 'USDS';
        let DOJINS = 'DOJINS';

        let numberMaxLength = 15;
        let fieldFormat = /^[a-zA-Z0-9]+$/;
        let fieldValidationExpression: RegExp = null;
        let fieldValidationMessage: string = null;        
        let issuingAuthList: { [index: string]: string; };
        let issuingAuth: string;

        this.clearListA();

        this._listCDocNumber.prop('required', true);
        this._listCDocExpDate.prop('required', true);

        this._listCIssuingAuthority.attr('readOnly', 'true');
        this._listCDocExpDate.removeAttr('readOnly')
        .unbind('keypress')
        .keypress(e =>
            /[\d/]/g.test(String.fromCharCode(e.which)) ||
            this.NAFormat.test(String.fromCharCode(e.which)))
        .val('').datepicker('option', 'showOn', 'focus');

        this._listCDoc.prop('ssncard', false);
    
        if (code === '1') {
            // 1 - (Unrestricted) Social Security Card
            issuingAuthList = { SSA: this._(SSA), USDHHS: this._(USDHHS), SSD: this._(SSD), DHEW: this._(DHEW) };
            issuingAuth = SSA;

            numberMaxLength = 11;
            fieldFormat = /^[\d-]+$/;

            fieldValidationExpression = this.ssnFormat;
            fieldValidationMessage = this._('section2.ssnformat');

            this._listCDocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);

            this._listCDoc.prop('ssncard', true);
        } else if (['2', '3', '4'].indexOf(code) >= 0) {
            // 2 - Form FS-545
            // 3 - Form DS-1350
            // 4 - Form FS-240
            issuingAuthList = { USDS: this._(USDS) };
            issuingAuth = USDS;
        } else if (['5', '6', '11', '12'].indexOf(code) >= 0) {
            // 5 - Birth Certificate
            // 6 - Native American tribal document
            // 11 - Receipt: Replacement Birth Certificate
            // 12 - Receipt: Replacement Native American Tribal Doc.
            issuingAuthList = {};
            issuingAuth = null;

            this._listCIssuingAuthority.removeAttr('readOnly');
        } else if (['7', '8'].indexOf(code) >= 0) {
            // 7 - Form I-197
            // 8 - Form I-179
            issuingAuthList = { DOJINS: this._(DOJINS) };
            issuingAuth = DOJINS;
        } else if (['9', '13'].indexOf(code) >= 0) {
            // 9 - Employment Auth. document (DHS) List C #7
            // 13 - Receipt: Replacement Employment Auth. Doc. (DHS)
            let name = decodeURIComponent(code === '9' ? this._('listC7') : this._('listC7Receipt'));
            issuingAuthList = { 0: name };
            issuingAuth = '0';

            this._listCIssuingAuthority
            .removeAttr('readOnly')
            .keypress(e => {
                let val = this._listCIssuingAuthority.val() as string;

                if (val.length >= name.length) {
                    return val.substr(0, name.length) === name;
                }

                return true;
            })
            .keyup(e => {
                let val = this._listCIssuingAuthority.val() as string;

                if (val.length <= name.length ||
                (val.length === name.length + 1 && val.substr(0, name.length) !== name)) {
                    this._listCIssuingAuthority.val(name);
                }
            });
        } else if (code === '10') {
            // 10 - Receipt: Replacement Unrestricted SS Card
            issuingAuthList = { SSA: this._(SSA) };
            issuingAuth = SSA;
        }

        this._listCDocNumber
        .prop('maxLength', numberMaxLength)
        .keypress(e => fieldFormat.test(String.fromCharCode(e.which)));

        this.filterCombolist(
            this._listCIssuingAuthority,
            issuingAuthList,
            issuingAuth,
            this,
            this.processListABC);

        this._listCDocNumber.prop(this.validationExpressionProp,  fieldValidationExpression);    
        this._listCDocNumber.prop(this.validationMessageProp, fieldValidationMessage);
    }
    
    private fillListABC(status: string) {
        this.filterCombolist(
            this._listADoc,
            this.getListAContent(status),
            null,
            this,
            this.processListABC);

        this.filterCombolist(
            this._listBDoc,
            this.getListBContent(this._dob.val() as string),
            null,
            this,
            this.processListABC);

        this.filterCombolist(
            this._listCDoc,
            this.getListCContent(status),
            null,
            this,
            this.processListABC);
    }

    private clearListABC() {
        this._lastNameSection2.val('');
        this._firstNameSection2.val('');
        this._middleInitialSection2.val('');
        this._immigrationStatus.val('');

        this.filterCombolist(this._listADoc, {}, null, this, null);
        this.filterCombolist(this._listAIssuingAuthority, {}, null, this, null);
        this._listADocNumber.val('');
        this._listADocExpDate.val('');
        this.filterCombolist(this._listADoc2, {}, null, this, null);
        this.filterCombolist(this._listAIssuingAuthority2, {}, null, this, null);
        this._listADocNumber2.val('');
        this._listADocExpDate2.val('');
        this.filterCombolist(this._listADoc3, {}, null, this, null);
        this.filterCombolist(this._listAIssuingAuthority3, {}, null, this, null);
        this._listADocNumber3.val('');
        this._listADocExpDate3.val('');
        this.filterCombolist(this._listBDoc, {}, null, this, null);
        this.filterCombolist(this._listBIssuingAuthority, {}, null, this, null);
        this._listBDocNumber.val('');
        this._listBDocExpDate.val('');
        this.filterCombolist(this._listCDoc, {}, null, this, null);
        this.filterCombolist(this._listCIssuingAuthority, {}, null, this, null);
        this._listCDocNumber.val('');
        this._listCDocExpDate.val('');
    }

    private clearListA() {
        // List A area
        this.setCombolistValue(this._listADoc, '0');
        this.filterCombolist(this._listAIssuingAuthority, {0:this.na}, '0', this, this.processListABC);
        this._listADocNumber.attr('readOnly', 'true').val(this.na);
        this._listADocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        
        this.filterCombolist(this._listADoc2, {0:this.na}, '0', this, this.processListABC);
        this.filterCombolist(this._listAIssuingAuthority2, {0:this.na}, '0', this, this.processListABC);
        this._listADocNumber2.attr('readOnly', 'true').val(this.na);
        this._listADocExpDate2.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
    
        this.filterCombolist(this._listADoc3, {0:this.na}, '0', this, this.processListABC);
        this.filterCombolist(this._listAIssuingAuthority3, {0:this.na}, '0', this, this.processListABC);
        this._listADocNumber3.attr('readOnly', 'true').val(this.na);
        this._listADocExpDate3.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
    }
    //endregion
}