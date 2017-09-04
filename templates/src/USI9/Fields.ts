/// <reference path="PDFForm.ts" />

class USI9Fields extends PDFForm {
    protected _lastName: JQuery<HTMLElement>;
    protected _lastNameHelp: JQuery<HTMLElement>;
    protected _firstName: JQuery<HTMLElement>;
    protected _firstNameHelp: JQuery<HTMLElement>;
    protected _middleInitial: JQuery<HTMLElement>;
    protected _middleInitialHelp: JQuery<HTMLElement>;
    protected _middleInitialSection2: JQuery<HTMLElement>
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

    protected _employeeInfoHelp: JQuery<HTMLElement>;
    protected _immigrationStatus: JQuery<HTMLElement>;
    protected _immigrationStatusHelp: JQuery<HTMLElement>;
    protected _lastNameSection2: JQuery<HTMLElement>;
    protected _lastNameSection2Help: JQuery<HTMLElement>;
    protected _firstNameSection2: JQuery<HTMLElement>;
    protected _firstNameSection2Help: JQuery<HTMLElement>;
    protected _middleInitialSection2Help: JQuery<HTMLElement>;

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

    protected validateFields() {
        var errorMessage = '';

        if (this._lastName.val() === '') {
            errorMessage += '- ' + this._('lastname.exists') + '\r\n';
        } else if (this.nameFormat.test(this._lastName.val() as string)) {
            errorMessage += '- ' + this._('lastname.format') + '\r\n';
        }

        if (this._firstName.val() === '') {
            errorMessage += '- ' + this._('firstname.exists') + '\r\n';
        } else if (this.nameFormat.test(this._firstName.val() as string)) {
            errorMessage += '- ' + this._('firstname.format') + '\r\n';
        }

        if (this._dob.val() === '') {
            errorMessage += '- ' + this._('dateofbirth.exists') + '\r\n';
        } else if (this._dob.val() === '' || this.dateFormat.test(this._dob.val() as string)) {
            errorMessage += '- ' + this._('dateofbirth.format') + '\r\n';
        }

        if (errorMessage !== '') {
            alert(errorMessage);
            return false;
        } else {
            return true;
        }
    }

    protected processListABC(ddl: string, code: string, fields: USI9Fields) {
        let na = super._('NA');
        let numberMaxLength = 15;
        let numberFormat = /^[a-zA-Z0-9]+$/;
        let issuingAuthList: { [index: string]: string; } = {0:na};
        let issuingAuth: string;

        switch(ddl)
        {
        case 'ListADocTitle':
            // restore min date after 6:I-766
            fields._listADocExpDate.datepicker('option', 'minDate', new Date());

            // US Citizens & Non-citizen nationals
            // 1 - U.S. Passport
            // 2 - U.S. Passport Card
            if (['1', '2'].indexOf(code) >= 0) {
                issuingAuthList = {'USDS':super._('USDS')};
                issuingAuth = 'USDS';
                numberMaxLength = 9;
            }

            // LPR
            // 3 - Perm. Resident Card (Form I-551)
            if (code === '3') {
                issuingAuthList = {'USCIS':super._('USCIS'), 'DOJINS':super._('DOJINS')};
                issuingAuth = 'USCIS';
                numberMaxLength = 13;
            }

            // 4 - Alien Reg. Receipt Card (Form I-551)
            if (code === '4') {
                issuingAuthList = {'DOJINS':super._('DOJINS')};
                issuingAuth = 'DOJINS';
                numberMaxLength = 13;
            }

            // 5 - Foreign Passport
            if (code === '5') {
                issuingAuthList = JSON.parse(super._('countries'));
                issuingAuth = null;

                numberMaxLength = 12;

                fields.filterCombolist(
                    fields._listADoc2,
                    {1: super._('temporaryI551stamp'), 2: super._('mrivstamp')},
                    '1',
                    fields,
                    fields.processListABC);

                fields.filterCombolist(
                    fields._listAIssuingAuthority2,
                    {'USCIS':super._('USCIS'), 'DOJINS':super._('DOJINS')},
                    'USCIS',
                    fields,
                    fields.processListABC);

                fields._listADocNumber2.attr('readOnly', 'true').val(na);
            }

            // 10 - Receipt: Form I-94/I-94A w/I-551 stamp, photo
            if (code === '10') {
                issuingAuthList = {'DHS':super._('DHS')};
                issuingAuth = 'DHS';
                
                numberMaxLength = 11;
                numberFormat = /^\d+$/;
            }

            // 12 - Receipt replacement Perm. Res. Card (Form I-551)
            if (code === '12') {
                issuingAuthList = {'USCIS':super._('USCIS')};
                issuingAuth = 'USCIS';

                numberMaxLength = 13;
            }

            // Alien authorized to work
            // 6 - Employment Auth. Document (Form I-766)
            if (code === '6') {
                issuingAuthList = {'USCIS':super._('USCIS')};
                issuingAuth = 'USCIS';
                numberMaxLength = 13;

                // I-766 can be expired in conjuction with I-797C (up to 180 days);
                fields._listADocExpDate.datepicker('option', 'minDate', 
                    new Date(Date.now() - 180 * 24 * 3600 * 1000));
            }

            // 7 - Foreign Passport, work-authorized nonimmigrant
            // 14 - Receipt: Replacement Foreign Passport, work-authorized nonimmigrant
            if (['7', '14'].indexOf(code) >= 0) {
                issuingAuthList = JSON.parse(super._('countries'));
                issuingAuth = null;

                numberMaxLength = 12;

                fields.filterCombolist(
                    fields._listADoc2,
                    {3: super._('formI94'), 4: super._('formI94receipt')},
                    '3',
                    fields,
                    fields.processListABC);

                fields.filterCombolist(
                    fields._listAIssuingAuthority2,
                    {'USCIS':super._('USCIS'), 'CBP':super._('CBP')},
                    'USCIS',
                    fields,
                    fields.processListABC);

                fields.filterCombolist(
                    fields._listADoc3,
                    {0: na, 1: super._('formI20'), 2: super._('formDS2019')},
                    '0',
                    fields,
                    fields.processListABC);

                fields.filterCombolist(fields._listAIssuingAuthority3, {0:na}, '0', fields, fields.processListABC);
                fields._listADocNumber3.attr('readOnly', 'true').val(na);
                fields._listADocExpDate3.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(na);
            }

            // 8 - FSM Passport with Form I-94
            if (code === '8') {
                issuingAuthList = {'FSM':super._('FSM')};
                issuingAuth = 'FSM';

                numberMaxLength = 12;

                fields.filterCombolist(
                    fields._listADoc2,
                    {3: super._('formI94'), 4: super._('formI94receipt')},
                    '3',
                    fields,
                    fields.processListABC);

                fields.filterCombolist(
                    fields._listAIssuingAuthority2,
                    {'USCIS':super._('USCIS'), 'CBP':super._('CBP')},
                    'USCIS',
                    fields,
                    fields.processListABC);
            }

            // 9 - RMI Passport with Form I-94
            if (code === '9') {
                issuingAuthList = {'RMI':super._('RMI')};
                issuingAuth = 'RMI';
        
                numberMaxLength = 12;

                fields.filterCombolist(
                    fields._listADoc2,
                    {3: super._('formI94'), 4: super._('formI94receipt')},
                    '3',
                    fields,
                    fields.processListABC);

                fields.filterCombolist(
                    fields._listAIssuingAuthority2,
                    {'USCIS':super._('USCIS'), 'CBP':super._('CBP')},
                    'USCIS',
                    fields,
                    fields.processListABC);
            }

            // 11 - Receipt: Form I-94/I-94A w/refugee stamp
            if (code === '11') {
                issuingAuthList = {'DHS':super._('DHS')};
                issuingAuth = 'DHS';
                
                numberMaxLength = 11;
                numberFormat = /^\d+$/;
            }

            // 13 - Receipt replacement EAD (Form I-766)
            if (code === '13') {
                issuingAuthList = {'USCIS':super._('USCIS')};
                issuingAuth = 'USCIS';
        
                numberMaxLength = 13;
            }

            // 15 - Receipt: Replacement FSM Passport with Form I-94
            if (code === '15') {
                issuingAuthList = {'FSM':super._('FSM')};
                issuingAuth = 'FSM';

                numberMaxLength = 12;
            }

            // 16 - Receipt: Replacement RMI Passport with Form I-94
            if (code === '16') {
                issuingAuthList = {'RMI':super._('RMI')};
                issuingAuth = 'RMI';
        
                numberMaxLength = 12;
            }

            fields._listADocNumber
            .prop('maxLength', numberMaxLength)
            .keypress(e => numberFormat.test(String.fromCharCode(e.which)));

            fields.filterCombolist(
                fields._listAIssuingAuthority,
                issuingAuthList,
                issuingAuth,
                fields,
                fields.processListABC);

            if (['1', '2', '3', '4', '6', '10', '11', '12'].indexOf(code) >= 0) {
                fields.filterCombolist(fields._listADoc2, {0:na}, '0', fields, fields.processListABC);
                fields.filterCombolist(fields._listAIssuingAuthority2, {0:na}, '0', fields, fields.processListABC);
                fields._listADocNumber2.attr('readOnly', 'true').val(na);
                fields._listADocExpDate2.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(na);
            }

            if (['1', '2', '3', '4', '5', '6', '8', '9', '10', '11', '12', '15', '16'].indexOf(code) >= 0) {
                fields.filterCombolist(fields._listADoc3, {0:na}, '0', fields, fields.processListABC);
                fields.filterCombolist(fields._listAIssuingAuthority3, {0:na}, '0', fields, fields.processListABC);
                fields._listADocNumber3.attr('readOnly', 'true').val(na);
                fields._listADocExpDate3.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(na);
            }

            // List B area
            fields.filterCombolist(fields._listBDoc, {0:na}, '0', fields, fields.processListABC);
            fields.filterCombolist(fields._listBIssuingAuthority, {0:na}, '0', fields, fields.processListABC);
            fields._listBDocNumber.attr('readOnly', 'true').val(na);
            fields._listBDocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(na);

            // List C area
            fields.filterCombolist(fields._listCDoc, {0:na}, '0', fields, fields.processListABC);
            fields.filterCombolist(fields._listCIssuingAuthority, {0:na}, '0', fields, fields.processListABC);
            fields._listCDocNumber.attr('readOnly', 'true').val(na);
            fields._listCDocExpDate.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(na);

            break;

        case 'ListADocTitle2':
            // 1 - Temporary I-551 Stamp
            if (code === '1'){
                fields.filterCombolist(
                    fields._listAIssuingAuthority2,
                    {'USCIS':super._('USCIS'), 'DOJINS':super._('DOJINS')},
                    'USCIS',
                    fields,
                    fields.processListABC);
            }

            // 2 - Machine-readable immigrant visa (MRIV)
            if (code === '2') {
                fields.filterCombolist(
                    fields._listAIssuingAuthority2,
                    {'USDS':super._('USDS')},
                    'USDS',
                    fields,
                    fields.processListABC);
                }

                numberMaxLength = 11;

            // 3 - Form I-94/I-94A
            if (code === '3') {
                numberMaxLength = 11;
                numberFormat = /^\d+$/;
            }

            // 4 - Receipt: Replacement Form I-94/I-94A
            // default parameters

            fields._listADocNumber2
            .prop('maxLength', numberMaxLength)
            .keypress(e => numberFormat.test(String.fromCharCode(e.which)));

            fields._listADocExpDate2
            .unbind('keypress');

            break;
        
        case 'ListADocTitle3':
            // 0 - N/A
            if (code === '0') {
                fields.filterCombolist(fields._listAIssuingAuthority3, {0:na}, '0', fields, fields.processListABC);
                fields._listADocNumber3.attr('readOnly', 'true').val(na);
                fields._listADocExpDate3.attr('readOnly', 'true').datepicker('option', 'showOn', 'off').val(na);
            }

            // 1 - Form I-20
            if (code === '1') {
                fields.filterCombolist(
                    fields._listAIssuingAuthority3,
                    {'ICE':super._('ICE'), 'DOJINS':super._('DOJINS')},
                    'ICE',
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

            // 2 - Form DS-2019
            if (code === '2') {
                fields.filterCombolist(
                    fields._listAIssuingAuthority3,
                    {'USDS':super._('USDS')},
                    'USDS',
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

            break;

        case 'ListBDocTitle':
            // 1 - Driver’s license issued by state/territory
            // 2 - ID card issued by state/territory
            if (['1', '2'].indexOf(code) >= 0) {
                issuingAuthList = JSON.parse(super._('usstates'));
                issuingAuth = null;

                numberMaxLength = 14;
            }

            // 11 - Canadian driver’s license
            if (code === '11') {
                issuingAuthList = JSON.parse(super._('canada'));
                issuingAuth = null;
            }

            fields.filterCombolist(
                fields._listBIssuingAuthority,
                issuingAuthList,
                issuingAuth,
                fields,
                fields.processListABC);

            break;
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
                11: this._('birthCertificate'),
                12: this._('tribalDocumentreceipt')
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
}