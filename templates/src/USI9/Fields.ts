/// <reference path="PDFForm.ts" />

class USI9Fields extends PDFForm {
    //region "Section 1 Personal data Fields"
    protected _lastName: JQuery<HTMLElement>;
    protected _lastNameHelp: JQuery<HTMLElement>;
    protected _firstName: JQuery<HTMLElement>;
    protected _firstNameHelp: JQuery<HTMLElement>;
    protected _middleInitial: JQuery<HTMLElement>;
    protected _middleInitialHelp: JQuery<HTMLElement>;
    protected _otherNames: JQuery<HTMLElement>;
    protected _otherNamesHelp: JQuery<HTMLElement>;
    protected _address: JQuery<HTMLElement>;
    protected _addressHelp: JQuery<HTMLElement>;
    protected _apptNumber: JQuery<HTMLElement>;
    protected _apptNumberHelp: JQuery<HTMLElement>;
    protected _city: JQuery<HTMLElement>;
    protected _cityHelp: JQuery<HTMLElement>;
    protected _state: JQuery<HTMLElement>;
    protected _stateHelp: JQuery<HTMLElement>;
    protected _zip: JQuery<HTMLElement>;
    protected _zipHelp: JQuery<HTMLElement>;
    protected _dob: JQuery<HTMLElement>;
    protected _dobHelp: JQuery<HTMLElement>;
    protected _ssn : JQuery<HTMLElement>[];
    protected _ssnHelp: JQuery<HTMLElement>;
    protected _email: JQuery<HTMLElement>;
    protected _emailHelp: JQuery<HTMLElement>;
    protected _phone: JQuery<HTMLElement>;
    protected _phoneHelp: JQuery<HTMLElement>;
    //endregion

    //region "Citizenship Data fields"
    protected _citizen: JQuery<HTMLElement>;
    protected _citizenHelp: JQuery<HTMLElement>;
    protected _national: JQuery<HTMLElement>;
    protected _nationalHelp: JQuery<HTMLElement>;
    protected _lpr: JQuery<HTMLElement>;
    protected _lprHelp: JQuery<HTMLElement>;
    protected _alien: JQuery<HTMLElement>;
    protected _alienHelp: JQuery<HTMLElement>;
    protected _uscisNumberHelp: JQuery<HTMLElement>;
    protected _lpruscisNumPrefix: JQuery<HTMLElement>;
    protected _lpruscisNum: JQuery<HTMLElement>;
    protected _lpruscisNumType: JQuery<HTMLElement>;
    protected _alienWorkAuthDate: JQuery<HTMLElement>;
    protected _alienuscisNumPrefix: JQuery<HTMLElement>;
    protected _alienuscisNum: JQuery<HTMLElement>;
    protected _alienuscisNumType: JQuery<HTMLElement>;
    protected _admissionNum: JQuery<HTMLElement>;
    protected _admissionNumHelp: JQuery<HTMLElement>;
    protected _passportNum: JQuery<HTMLElement>;
    protected _passportNumHelp: JQuery<HTMLElement>;
    protected _countryOfIssuance: JQuery<HTMLElement>;
    protected _countryOfIssuanceHelp: JQuery<HTMLElement>;
    protected _sgnEmployee: JQuery<HTMLElement>;
    protected _sgnEmployeeHelp: JQuery<HTMLElement>;
    protected _sgnEmployeeDate: JQuery<HTMLElement>;
    protected _sgnEmployeeDateHelp: JQuery<HTMLElement>;
    //endregion

    //region "Translator Section Fields"
    protected _translatorNo: JQuery<HTMLElement>;
    protected _translatorYes: JQuery<HTMLElement>;
    protected _translatorHelp: JQuery<HTMLElement>;
    protected _sgnTranslator: JQuery<HTMLElement>;
    protected _sgnTranslatorHelp: JQuery<HTMLElement>;
    protected _translatorDate: JQuery<HTMLElement>;
    protected _translatorDateHelp: JQuery<HTMLElement>;
    protected _translatorLastName: JQuery<HTMLElement>;
    protected _translatorLastNameHelp: JQuery<HTMLElement>;
    protected _translatorFirstName: JQuery<HTMLElement>;
    protected _translatorFirstNameHelp: JQuery<HTMLElement>;
    protected _translatorAddress: JQuery<HTMLElement>;
    protected _translatorAddressHelp: JQuery<HTMLElement>;
    protected _translatorCity: JQuery<HTMLElement>;
    protected _translatorCityHelp: JQuery<HTMLElement>;
    protected _translatorState: JQuery<HTMLElement>;
    protected _translatorStateHelp: JQuery<HTMLElement>;
    protected _translatorZip: JQuery<HTMLElement>;
    protected _translatorZipHelp: JQuery<HTMLElement>;
    //endregion

    //region "Employee Section 2 Data fields"
    protected _employeeInfoHelp: JQuery<HTMLElement>;
    protected _immigrationStatus: JQuery<HTMLElement>;
    protected _immigrationStatusHelp: JQuery<HTMLElement>;
    protected _lastNameSection2: JQuery<HTMLElement>;
    protected _lastNameSection2Help: JQuery<HTMLElement>;
    protected _firstNameSection2: JQuery<HTMLElement>;
    protected _firstNameSection2Help: JQuery<HTMLElement>;
    protected _middleInitialSection2: JQuery<HTMLElement>;
    protected _middleInitialSection2Help: JQuery<HTMLElement>;
    //endregion

    //region "List A, B, C Fields"
    protected _listADoc: JQuery<HTMLElement>;
    protected _listADocHelp: JQuery<HTMLElement>;
    protected _listAIssuingAuthority: JQuery<HTMLElement>;
    protected _listAIssuingAuthorityHelp: JQuery<HTMLElement>;
    protected _listADocNumber: JQuery<HTMLElement>;
    protected _listADocNumberHelp: JQuery<HTMLElement>;
    protected _listADocExpDate: JQuery<HTMLElement>;
    protected _listADocExpDateHelp: JQuery<HTMLElement>;
    protected _listADoc2: JQuery<HTMLElement>;
    protected _listADoc2Help: JQuery<HTMLElement>;
    protected _listAIssuingAuthority2: JQuery<HTMLElement>;
    protected _listAIssuingAuthority2Help: JQuery<HTMLElement>;
    protected _listADocNumber2: JQuery<HTMLElement>;
    protected _listADocNumber2Help: JQuery<HTMLElement>;
    protected _listADocExpDate2: JQuery<HTMLElement>;
    protected _listADocExpDate2Help: JQuery<HTMLElement>;
    protected _listADoc3: JQuery<HTMLElement>;
    protected _listADoc3Help: JQuery<HTMLElement>;
    protected _listAIssuingAuthority3: JQuery<HTMLElement>;
    protected _listAIssuingAuthority3Help: JQuery<HTMLElement>;
    protected _listADocNumber3: JQuery<HTMLElement>;
    protected _listADocNumber3Help: JQuery<HTMLElement>;
    protected _listADocExpDate3: JQuery<HTMLElement>;
    protected _listADocExpDate3Help: JQuery<HTMLElement>;
    protected _listBDoc: JQuery<HTMLElement>;
    protected _listBDocHelp: JQuery<HTMLElement>;
    protected _listBIssuingAuthority: JQuery<HTMLElement>;
    protected _listBIssuingAuthorityHelp: JQuery<HTMLElement>;
    protected _listBDocNumber: JQuery<HTMLElement>;
    protected _listBDocNumberHelp: JQuery<HTMLElement>;
    protected _listBDocExpDate: JQuery<HTMLElement>;
    protected _listBDocExpDateHelp: JQuery<HTMLElement>;
    protected _listCDoc: JQuery<HTMLElement>;
    protected _listCDocHelp: JQuery<HTMLElement>;
    protected _listCIssuingAuthority: JQuery<HTMLElement>;
    protected _listCIssuingAuthorityHelp: JQuery<HTMLElement>;
    protected _listCDocNumber: JQuery<HTMLElement>;
    protected _listCDocNumberHelp: JQuery<HTMLElement>;
    protected _listCDocExpDate: JQuery<HTMLElement>;
    protected _listCDocExpDateHelp: JQuery<HTMLElement>;
    protected _additionalInfo: JQuery<HTMLElement>;
    protected _additionalInfoHelp: JQuery<HTMLElement>;
    //endregion

    //region "Employer Data Fields"
    protected _hireDate: JQuery<HTMLElement>;
    protected _hireDateHelp: JQuery<HTMLElement>;
    protected _sgnEmployer: JQuery<HTMLElement>;
    protected _sgnEmployerHelp: JQuery<HTMLElement>;
    protected _employerSignDate: JQuery<HTMLElement>;
    protected _employerSignDateHelp: JQuery<HTMLElement>;
    protected _employerTitle: JQuery<HTMLElement>;
    protected _employerTitleHelp: JQuery<HTMLElement>;
    protected _employerLastName: JQuery<HTMLElement>;
    protected _employerLastNameHelp: JQuery<HTMLElement>;
    protected _employerFirstName: JQuery<HTMLElement>;
    protected _employerFirstNameHelp: JQuery<HTMLElement>;
    protected _employerName: JQuery<HTMLElement>;
    protected _employerNameHelp: JQuery<HTMLElement>;
    protected _employerAddress: JQuery<HTMLElement>;
    protected _employerAddressHelp: JQuery<HTMLElement>;
    protected _employerCity: JQuery<HTMLElement>;
    protected _employerCityHelp: JQuery<HTMLElement>;
    protected _employerState: JQuery<HTMLElement>;
    protected _employerStateHelp: JQuery<HTMLElement>;
    protected _employerZip: JQuery<HTMLElement>;
    protected _employerZipHelp: JQuery<HTMLElement>;
    //endregion

    //region "Section 3 Fields"
    protected _newlastName: JQuery<HTMLElement>;
    protected _newlastNameHelp: JQuery<HTMLElement>;
    protected _newfirstName: JQuery<HTMLElement>;
    protected _newfirstNameHelp: JQuery<HTMLElement>;
    protected _newmiddleInitial: JQuery<HTMLElement>;
    protected _newmiddleInitialHelp: JQuery<HTMLElement>;
    protected _rehireDate: JQuery<HTMLElement>;
    protected _rehireDateHelp: JQuery<HTMLElement>;
    protected _docTitleSec3: JQuery<HTMLElement>;
    protected _docTitleSec3Help: JQuery<HTMLElement>;
    protected _docNumberSec3: JQuery<HTMLElement>;
    protected _docNumberSec3Help: JQuery<HTMLElement>;
    protected _expDateSec3: JQuery<HTMLElement>;
    protected _expDateSec3Help: JQuery<HTMLElement>;
    protected _sgnEmployerSec3: JQuery<HTMLElement>;
    protected _sgnEmployerSec3Help: JQuery<HTMLElement>;
    protected _employerSignDateSec3: JQuery<HTMLElement>;
    protected _employerSignDateSec3Help: JQuery<HTMLElement>;
    protected _employerNameSec3: JQuery<HTMLElement>;
    protected _employerNameSec3Help: JQuery<HTMLElement>;
    //endregion

    private numberMaxLength = 15;
    private fieldFormat = /^[a-zA-Z0-9]+$/;
    private issuingAuthList: { [index: string]: string; };
    private issuingAuth: string;

    protected paramExistsMsg = this._('parameter.exists');
    protected paramLengthMsg = this._('parameter.length');
    protected paramFormatMsg = this._('parameter.format');
    protected paramMaxValueMsg = this._('parameter.max');
    protected paramMinValueMsg = this._('parameter.min');
    protected dateFormatMsg = this._('date.format');

    protected invalidFieldClass = 'invalid';

    protected annotationName = 'annotation-name';
    protected annotationRequired = 'annotation-required';
    protected na = super._('NA');

    protected validateTextField(
        field: JQuery<HTMLElement>,
        parameter: string,
        regExs: RegExp[],
        validateIfEmpty: boolean,
        errorMessages: string[]): boolean {
        let errorFlag = true;
        let length = field.prop('maxLength') ? field.prop('maxLength') : 0;

        if (field.attr(this.annotationRequired) && field.val() === '') {   
            errorMessages.push(this.paramExistsMsg.replace('${parameter}', parameter));
        } else if ((field.val() as string).length > length && length > 0) {
            errorMessages.push(this.paramLengthMsg
              .replace('${parameter}', parameter)
              .replace('${length}', length.toString()));
        } else if ((field.val() !== '' || validateIfEmpty) && regExs.length > 0) {
            let validFlag = false;
            for (let i in regExs) {
                if (regExs[i].test(field.val() as string)) {
                    validFlag = true;
                    break;
                }
            }

            if (!validFlag) {
                errorMessages.push(this.paramFormatMsg.replace('${parameter}', parameter));
            }

            errorFlag = !validFlag;

            if (!errorFlag) {
                let maxDate = field.datepicker('option', 'maxDate') as Date;
                let minDate = field.datepicker('option', 'minDate') as Date;
                if (maxDate) {
                    maxDate.setHours(0, 0, 0, 0);
                }

                if (minDate) {
                    minDate.setHours(0, 0, 0, 0);
                }
                
                if (maxDate && (new Date(field.val()) > maxDate)) {
                    errorMessages.push(
                        this.paramMaxValueMsg
                        .replace('${parameter}', parameter)
                        .replace('${value}', maxDate.toDateString())
                    );
                } else if (minDate && (new Date(field.val()) < minDate)) {
                    errorMessages.push(
                        this.paramMinValueMsg
                        .replace('${parameter}', parameter)
                        .replace('${value}', minDate.toDateString())
                    );
                } else {
                    errorFlag = false;
                }
            }
        } else {
            errorFlag = false;
        }

        field.toggleClass(this.invalidFieldClass, errorFlag);

        return errorFlag;
    }

    protected processListABC(ddl: string, code: string, fields: USI9Fields) {
        this.numberMaxLength = 15;
        this.fieldFormat = /^[a-zA-Z0-9]+$/;
        this.issuingAuthList = {0:this.na};

        switch(ddl)
        {
        case 'ListADocTitle':
            fields.listADocTitle(ddl, code, fields);

            break;

        case 'ListADocTitle2':
            fields.listADocTitle2(ddl, code, fields);

            break;
        
        case 'ListADocTitle3':
            fields.listADocTitle3(ddl, code, fields);

            break;

        case 'ListBDocTitle':
            fields.listBDocTitle(ddl, code, fields);

            break;

        case 'ListCDocTitle':
            fields.listCDocTitle(ddl, code, fields);

            break;
        }
    }

    protected getListAContent(citizenship: string) {
        let usCitizenorNational = {0:this.na, 1:this._('uspassport'), 2:this._('uspassportcard')};
        let lpr = {
            0:this.na,
            3:this._('permanentresidentcard'),
            4:this._('alienresidentcard'),
            5:this._('foreignpassport'),
            10:this._('I551I94receipt'),
            12:this._('I551receipt')
        };
        let alien = {
            0:this.na,
            6:this._('eadI766'),
            7:this._('foreinpassportnonimmigrant'),
            8:this._('FSMpassport'),
            9:this._('RMIpassport'),
            11:this._('I94refugeestampreceipt'),
            13:this._('I766receipt'),
            14:this._('foreinpassportnonimmigrantreceipt'),
            15:this._('FSMpassportreceipt'),
            16:this._('RMIpassportreceipt')
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

    private listADocTitle(ddl: string, code: string, fields: USI9Fields) {
        let USDS = 'USDS';
        let USCIS = 'USCIS'
        let DOJINS = 'DOJINS';
        let DHS = 'DHS';
        let CBP = 'CBP';
        let FSM = 'FSM';
        let RMI = 'RMI';

        // restore min date after 6:I-766
        fields._listADocExpDate.datepicker('option', 'minDate', new Date());
            
        // US Citizens & Non-citizen nationals
        // 1 - U.S. Passport
        // 2 - U.S. Passport Card
        if (['1', '2'].indexOf(code) >= 0) {
            this.issuingAuthList = {USDS:super._(USDS)};
            this.issuingAuth = USDS;
            this.numberMaxLength = 9;
        }
        
        // LPR
        // 3 - Perm. Resident Card (Form I-551)
        if (code === '3') {
            this.issuingAuthList = {USCIS:super._(USCIS), DOJINS:super._(DOJINS)};
            this.issuingAuth = USCIS;
            this.numberMaxLength = 13;
        }
        
        // 4 - Alien Reg. Receipt Card (Form I-551)
        if (code === '4') {
            this.issuingAuthList = {DOJINS:super._(DOJINS)};
            this.issuingAuth = DOJINS;
            this.numberMaxLength = 13;
        }
        
        // 5 - Foreign Passport
        if (code === '5') {
            this.issuingAuthList = JSON.parse(super._('countries'));
            this.issuingAuth = null;        
            this.numberMaxLength = 12;
        
            fields.filterCombolist(
                fields._listADoc2,
                {1: super._('temporaryI551stamp'), 2: super._('mrivstamp')},
                '1',
                fields,
                fields.processListABC);
        
            fields.filterCombolist(
                fields._listAIssuingAuthority2,
                {USCIS:super._(USCIS), DOJINS:super._(DOJINS)},
                USCIS,
                fields,
                fields.processListABC);
        
            fields._listADocNumber2.attr('readOnly', 'true').val(this.na);
        }
        
        // 10 - Receipt: Form I-94/I-94A w/I-551 stamp, photo
        if (code === '10') {
            this.issuingAuthList = {DHS:super._(DHS)};
            this.issuingAuth = DHS;            
            this.numberMaxLength = 11;
            this.fieldFormat = /^\d+$/;
        }
        
        // 12 - Receipt replacement Perm. Res. Card (Form I-551)
        if (code === '12') {
            this.issuingAuthList = {USCIS:super._(USCIS)};
            this.issuingAuth = USCIS;        
            this.numberMaxLength = 13;
        }
        
        // Alien authorized to work
        // 6 - Employment Auth. Document (Form I-766)
        if (code === '6') {
            this.issuingAuthList = {USCIS:super._(USCIS)};
            this.issuingAuth = USCIS;
            this.numberMaxLength = 13;
        
            // I-766 can be expired in conjuction with I-797C (up to 180 days);
            fields._listADocExpDate.datepicker('option', 'minDate', 
                new Date(Date.now() - 180 * 24 * 3600 * 1000));
        }
        
        // 7 - Foreign Passport, work-authorized nonimmigrant
        // 14 - Receipt: Replacement Foreign Passport, work-authorized nonimmigrant
        if (['7', '14'].indexOf(code) >= 0) {
            this.issuingAuthList = JSON.parse(super._('countries'));
            this.issuingAuth = null;        
            this.numberMaxLength = 12;
        
            fields.filterCombolist(
                fields._listADoc2,
                {3: super._('formI94'), 4: super._('formI94receipt')},
                '3',
                fields,
                fields.processListABC);
        
            fields.filterCombolist(
                fields._listAIssuingAuthority2,
                {USCIS:super._(USCIS), CBP:super._(CBP)},
                USCIS,
                fields,
                fields.processListABC);
        
            fields.filterCombolist(
                fields._listADoc3,
                {0: this.na, 1: super._('formI20'), 2: super._('formDS2019')},
                '0',
                fields,
                fields.processListABC);
        
            fields.filterCombolist(fields._listAIssuingAuthority3, {0:this.na}, '0', fields, fields.processListABC);
            fields._listADocNumber3.attr('readOnly', 'true').val(this.na);
            fields._listADocExpDate3.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        }
        
        // 8 - FSM Passport with Form I-94
        if (code === '8') {
            this.issuingAuthList = {FSM:super._(FSM)};
            this.issuingAuth = FSM;        
            this.numberMaxLength = 12;
        
            fields.filterCombolist(
                fields._listADoc2,
                {3: super._('formI94'), 4: super._('formI94receipt')},
                '3',
                fields,
                fields.processListABC);
        
            fields.filterCombolist(
                fields._listAIssuingAuthority2,
                {USCIS:super._(USCIS), CBP:super._(CBP)},
                USCIS,
                fields,
                fields.processListABC);
        }
        
        // 9 - RMI Passport with Form I-94
        if (code === '9') {
            this.issuingAuthList = {RMI:super._(RMI)};
            this.issuingAuth = RMI;
            this.numberMaxLength = 12;
        
            fields.filterCombolist(
                fields._listADoc2,
                {3: super._('formI94'), 4: super._('formI94receipt')},
                '3',
                fields,
                fields.processListABC);
        
            fields.filterCombolist(
                fields._listAIssuingAuthority2,
                {USCIS:super._(USCIS), CBP:super._(CBP)},
                USCIS,
                fields,
                fields.processListABC);
        }
        
        // 11 - Receipt: Form I-94/I-94A w/refugee stamp
        if (code === '11') {
            this.issuingAuthList = {DHS:super._(DHS)};
            this.issuingAuth = DHS;      
            this.numberMaxLength = 11;
            this.fieldFormat = /^\d+$/;
        }
        
        // 13 - Receipt replacement EAD (Form I-766)
        if (code === '13') {
            this.issuingAuthList = {USCIS:super._(USCIS)};
            this.issuingAuth = USCIS;        
            this.numberMaxLength = 13;
        }
        
        // 15 - Receipt: Replacement FSM Passport with Form I-94
        if (code === '15') {
            this.issuingAuthList = {'FSM':super._('FSM')};
            this.issuingAuth = 'FSM';
            this.numberMaxLength = 12;
        }
        
        // 16 - Receipt: Replacement RMI Passport with Form I-94
        if (code === '16') {
            this.issuingAuthList = {RMI:super._(RMI)};
            this.issuingAuth = RMI;
            this.numberMaxLength = 12;
        }
        
        fields._listADocNumber
        .prop('maxLength', this.numberMaxLength)
        .keypress(e => this.fieldFormat.test(String.fromCharCode(e.which)));
        
        fields.filterCombolist(
            fields._listAIssuingAuthority,
            this.issuingAuthList,
            this.issuingAuth,
            fields,
            fields.processListABC);
        
        if (['1', '2', '3', '4', '6', '10', '11', '12'].indexOf(code) >= 0) {
            fields.filterCombolist(fields._listADoc2, {0:this.na}, '0', fields, fields.processListABC);
            fields.filterCombolist(fields._listAIssuingAuthority2, {0:this.na}, '0', fields, fields.processListABC);
            fields._listADocNumber2.attr('readOnly', 'true').val(this.na);
            fields._listADocExpDate2.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        }
        
        if (['1', '2', '3', '4', '5', '6', '8', '9', '10', '11', '12', '15', '16'].indexOf(code) >= 0) {
            fields.filterCombolist(fields._listADoc3, {0:this.na}, '0', fields, fields.processListABC);
            fields.filterCombolist(fields._listAIssuingAuthority3, {0:this.na}, '0', fields, fields.processListABC);
            fields._listADocNumber3.attr('readOnly', 'true').val(this.na);
            fields._listADocExpDate3.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        }
        
        // List B area
        fields.filterCombolist(fields._listBDoc, {0:this.na}, '0', fields, fields.processListABC);
        fields.filterCombolist(fields._listBIssuingAuthority, {0:this.na}, '0', fields, fields.processListABC);
        fields._listBDocNumber.attr('readOnly', 'true').val(this.na);
        fields._listBDocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        
        // List C area
        fields.filterCombolist(fields._listCDoc, {0:this.na}, '0', fields, fields.processListABC);
        fields.filterCombolist(fields._listCIssuingAuthority, {0:this.na}, '0', fields, fields.processListABC);
        fields._listCDocNumber.attr('readOnly', 'true').val(this.na);
        fields._listCDocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
    }

    private listADocTitle2(ddl: string, code: string, fields: USI9Fields) {
        let USDS = 'USDS';
        let USCIS = 'USCIS';
        let DOJINS = 'DOJINS';

        // 1 - Temporary I-551 Stamp
        if (code === '1'){
            fields.filterCombolist(
                fields._listAIssuingAuthority2,
                {USCIS:super._(USCIS), DOJINS:super._(DOJINS)},
                USCIS,
                fields,
                fields.processListABC);
        }

        // 2 - Machine-readable immigrant visa (MRIV)
        if (code === '2') {
            fields.filterCombolist(
                fields._listAIssuingAuthority2,
                {USDS:super._(USDS)},
                USDS,
                fields,
                fields.processListABC);
            }

            this.numberMaxLength = 11;

        // 3 - Form I-94/I-94A
        if (code === '3') {
            this.numberMaxLength = 11;
            this.fieldFormat = /^\d+$/;
        }

        // 4 - Receipt: Replacement Form I-94/I-94A
        // default parameters

        fields._listADocNumber2
        .prop('maxLength', this.numberMaxLength)
        .keypress(e => this.fieldFormat.test(String.fromCharCode(e.which)));

        fields._listADocExpDate2
        .unbind('keypress');
    }

    private listADocTitle3(ddl: string, code: string, fields: USI9Fields) {
        let ICE = 'ICE';
        let DOJINS = 'DOJINS';
        let USDS = 'USDS';

        // 0 - N/A
        if (code === '0') {
            fields.filterCombolist(fields._listAIssuingAuthority3, {0:this.na}, '0', fields, fields.processListABC);
            fields._listADocNumber3.attr('readOnly', 'true').val(this.na);
            fields._listADocExpDate3.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        }

        // 1 - Form I-20
        if (code === '1') {
            fields.filterCombolist(
                fields._listAIssuingAuthority3,
                {ICE:super._(ICE), DOJINS:super._(DOJINS)},
                ICE,
                fields,
                fields.processListABC);
            
            fields._listADocNumber3.removeAttr('readOnly').val('');
            fields._listADocExpDate3.removeAttr('readOnly')
            .unbind('keypress')
            .keypress(e =>
                /[\d/]/g.test(String.fromCharCode(e.which)) ||
                this.NAFormat.test(String.fromCharCode(e.which)))
            .val('').datepicker('option', 'showOn', 'focus');
        }

        // 2 - Form DS-2019
        if (code === '2') {
            fields.filterCombolist(
                fields._listAIssuingAuthority3,
                {USDS:super._(USDS)},
                USDS,
                fields,
                fields.processListABC);
            
            fields._listADocNumber3.removeAttr('readOnly').val('');
            fields._listADocExpDate3.removeAttr('readOnly')
            .unbind('keypress')
            .keypress(e =>
                /[\d/]/g.test(String.fromCharCode(e.which)) ||
                this.NAFormat.test(String.fromCharCode(e.which))
            ).val('').datepicker('option', 'showOn', 'focus');
        }
    }

    private listBDocTitle(ddl: string, code: string, fields: USI9Fields) {
        let USCG = 'USCG';

        fields._listBDocNumber
        .prop('maxLength', '100')
        .unbind('keypress');

        this.clearListA(fields);

        // NOT 19 - Individual under Age 18
        // NOT 20 - Special Placement
        if (['19', '20'].indexOf(code) < 0) {
            fields._listBDocNumber.removeAttr('readOnly').val('');
            fields._listBDocExpDate.removeAttr('readOnly')
            .unbind('keypress')
            .keypress(e =>
                /[\d/]/g.test(String.fromCharCode(e.which)) ||
                this.NAFormat.test(String.fromCharCode(e.which)))
            .val('').datepicker('option', 'showOn', 'focus');
        }

        // 1 - Driver’s license issued by state/territory
        // 2 - ID card issued by state/territory
        // 21 - Receipt: Replacement driver’s license
        // 22 - Receipt: Replacement ID card
        if (['1', '2', '21', '22'].indexOf(code) >= 0) {
            this.issuingAuthList = JSON.parse(super._('usstates'));
            this.issuingAuth = null;

            this.numberMaxLength = 14;

            fields._listBDocNumber
            .prop('maxLength', this.numberMaxLength)
            .keypress(e => this.fieldFormat.test(String.fromCharCode(e.which)));

            fields._listBIssuingAuthority.attr('readOnly', 'true');
        }

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
        if (['3', '4', '5', '6', '7', '8', '10', '12', '13', '14', '15', '16', '17', '18',
             '23', '24', '25', '26', '27', '28', '31', '32', '33', '34', '35', '36', '37', '38'].indexOf(code) >= 0) {
            this.issuingAuthList = {};
            this.issuingAuth = null;

            fields._listBIssuingAuthority.removeAttr('readOnly');
        }

        // 9 - USCG Merchant Mariner card
        // 29 - Receipt: Replacement Merchant Mariner
        if (['9', '29'].indexOf(code) >= 0) {
            this.issuingAuthList = {USCG: super._(USCG)};
            this.issuingAuth = USCG;

            fields._listBIssuingAuthority.attr('readOnly', 'true');
        }

        // 11 - Canadian driver’s license
        // 30 - Receipt: Replacement Canadian DL
        if (['11', '30'].indexOf(code) >= 0) {
            this.issuingAuthList = JSON.parse(super._('canada'));
            this.issuingAuth = null;

            fields._listBIssuingAuthority.attr('readOnly', 'true');
        }

        // 19 - Individual under Age 18
        // 20 - Special Placement
        if (['19'].indexOf(code) >= 0) {
            this.issuingAuthList = {'0':this.na};
            this.issuingAuth = '0';

            fields._listBDocNumber.attr('readOnly', 'true').val(this.na);
            fields._listBDocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        }

        fields.filterCombolist(
            fields._listBIssuingAuthority,
            this.issuingAuthList,
            this.issuingAuth,
            fields,
            fields.processListABC);

    }

    private listCDocTitle(ddl: string, code: string, fields: USI9Fields) {
        let SSA = 'SSA';
        let USDHHS = 'USDHHS';
        let SSD = 'SSD';
        let DHEW = 'DHEW';
        let USDS = 'USDS';
        let DOJINS = 'DOJINS';

        this.clearListA(fields);

        fields._listCIssuingAuthority.attr('readOnly', 'true');
        fields._listCDocExpDate.removeAttr('readOnly')
        .unbind('keypress')
        .keypress(e =>
            /[\d/]/g.test(String.fromCharCode(e.which)) ||
            this.NAFormat.test(String.fromCharCode(e.which)))
        .val('').datepicker('option', 'showOn', 'focus');

        // 1 - (Unrestricted) Social Security Card
        if (code === '1') {
            this.issuingAuthList = {SSA: super._(SSA), USDHHS: super._(USDHHS), SSD: super._(SSD), DHEW: super._(DHEW)};
            this.issuingAuth = SSA;

            this.numberMaxLength = 11;
            this.fieldFormat = /^[\d-]+$/;

            fields._listCDocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        }

        // 2 - Form FS-545
        // 3 - Form DS-1350
        // 4 - Form FS-240
        if (['2', '3', '4'].indexOf(code) >= 0) {
            this.issuingAuthList = {USDS: super._(USDS)};
            this.issuingAuth = USDS;
        }

        // 5 - Birth Certificate
        // 6 - Native American tribal document
        // 11 - Receipt: Replacement Birth Certificate
        // 12 - Receipt: Replacement Native American Tribal Doc.
        if (['5', '6', '11', '12'].indexOf(code) >= 0) {
            this.issuingAuthList = {};
            this.issuingAuth = null;

            fields._listCIssuingAuthority.removeAttr('readOnly');
        }

        // 7 - Form I-197
        // 8 - Form I-179
        if (['7', '8'].indexOf(code) >= 0) {
            this.issuingAuthList = {DOJINS: super._(DOJINS)};
            this.issuingAuth = DOJINS;
        }

        // 9 - Employment Auth. document (DHS) List C #7
        // 13 - Receipt: Replacement Employment Auth. Doc. (DHS)
        if (['9', '13'].indexOf(code) >= 0) {
            let name = decodeURIComponent(code === '9' ? super._('listC7') : super._('listC7Receipt'));
            this.issuingAuthList = {0: name};
            this.issuingAuth = '0';

            fields._listCIssuingAuthority
            .removeAttr('readOnly')
            .keypress(e => {
                let val = fields._listCIssuingAuthority.val() as string;

                if (val.length >= name.length) {
                    return val.substr(0, name.length) === name;
                }

                return true;
            })
            .keyup(e => {
                let val = fields._listCIssuingAuthority.val() as string;

                if (val.length <= name.length ||
                (val.length === name.length + 1 && val.substr(0, name.length) !== name)) {
                    fields._listCIssuingAuthority.val(name);
                }
            });
        }

        // 10 - Receipt: Replacement Unrestricted SS Card
        if (code === '10') {
            this.issuingAuthList = {SSA: super._(SSA)};
            this.issuingAuth = SSA;
        }

        fields._listCDocNumber
        .prop('maxLength', this.numberMaxLength)
        .keypress(e => this.fieldFormat.test(String.fromCharCode(e.which)));

        fields.filterCombolist(
            fields._listCIssuingAuthority,
            this.issuingAuthList,
            this.issuingAuth,
            fields,
            fields.processListABC);
    }

    private clearListA(fields: USI9Fields) {
        // List A area
        fields.filterCombolist(
            fields._listADoc,
            fields._listBDoc.val() === this.na && fields._listCDoc.val() === this.na ?
            this.getListAContent(this._immigrationStatus.val() as string) : {0: this.na},
            '0',
            fields, fields.processListABC);
    
        fields.filterCombolist(fields._listAIssuingAuthority, {0:this.na}, '0', fields, fields.processListABC);
        fields._listADocNumber.attr('readOnly', 'true').val(this.na);
        fields._listADocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
        
        fields.filterCombolist(fields._listADoc2, {0:this.na}, '0', fields, fields.processListABC);
        fields.filterCombolist(fields._listAIssuingAuthority2, {0:this.na}, '0', fields, fields.processListABC);
        fields._listADocNumber2.attr('readOnly', 'true').val(this.na);
        fields._listADocExpDate2.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
    
        fields.filterCombolist(fields._listADoc3, {0:this.na}, '0', fields, fields.processListABC);
        fields.filterCombolist(fields._listAIssuingAuthority3, {0:this.na}, '0', fields, fields.processListABC);
        fields._listADocNumber3.attr('readOnly', 'true').val(this.na);
        fields._listADocExpDate3.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(this.na);
    }
}