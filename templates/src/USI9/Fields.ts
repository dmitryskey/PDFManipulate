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
    protected _listAIssuingAuthority: JQuery<HTMLElement>;
    protected _listADocNumber: JQuery<HTMLElement>;
    protected _listADocExpDate: JQuery<HTMLElement>;
    protected _listADoc2: JQuery<HTMLElement>;
    protected _listAIssuingAuthority2: JQuery<HTMLElement>;
    protected _listADocNumber2: JQuery<HTMLElement>;
    protected _listADocExpDate2: JQuery<HTMLElement>;
    protected _listADoc3: JQuery<HTMLElement>;
    protected _listAIssuingAuthority3: JQuery<HTMLElement>;
    protected _listADocNumber3: JQuery<HTMLElement>;
    protected _listADocExpDate3: JQuery<HTMLElement>;
    protected _listBDoc: JQuery<HTMLElement>;
    protected _listBIssuingAuthority: JQuery<HTMLElement>;
    protected _listBDocNumber: JQuery<HTMLElement>;
    protected _listBDocExpDate: JQuery<HTMLElement>;
    protected _listCDoc: JQuery<HTMLElement>;
    protected _listCIssuingAuthority: JQuery<HTMLElement>;
    protected _listCDocNumber: JQuery<HTMLElement>;
    protected _listCDocExpDate: JQuery<HTMLElement>;

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

    protected processListABC(ddl: string, code: string) {
        switch(ddl)
        {
        case 'ListADocTitle':
            var na = this._('NA');
            var issuingAuthList;
            var issuingAuth: string;

            // US Citizens & Non-citizen nationals
            // 1 - U.S. Passport
            // 2 - U.S. Passport Card
            if (['1', '2'].indexOf(code) >= 0) {
                issuingAuthList = {1:this._('USDS')};
                issuingAuth = '1';
            }

            // LPR
            // 3 - Perm. Resident Card (Form I-551)
            if (code === '3') {
                let issuingAuthList = {2:this._('USCIS'), 3:this._('DOJINS')};
                issuingAuth = '0';
            }

            // 4 - Alien Reg. Receipt Card (Form I-551)
            if (code === '4') {
                let issuingAuthList = {3:this._('DOJINS')};
                issuingAuth = '3';
            }

            // 5 - Foreign Passport
            if (code === '5') {
                issuingAuthList = JSON.parse(this._('countries'));
                issuingAuth = null;

                this.filterCombolist(this._listADoc2, {1: this._('temporaryI551stamp'), 2: this._('mrivstamp')}, '1', this.processListABC);
                this.filterCombolist(this._listAIssuingAuthority2, {0: na}, '0', this.processListABC);
            }

            // 10 - Receipt: Form I-94/I-94A w/I-551 stamp, photo
            if (code === '10') {
                issuingAuthList = {4:this._('DHS')};
                issuingAuth = '4';
            }

            // 12 - Receipt replacement Perm. Res. Card (Form I-551)
            if (code === '12') {
                issuingAuthList = {2:this._('USCIS')};
                issuingAuth = '2';
            }

            if (['1', '2', '3', '4', '10', '12'].indexOf(code) >= 0) {
                this.filterCombolist(this._listADoc2, {0: na}, '0', this.processListABC);
                this.filterCombolist(this._listAIssuingAuthority2, {0: na}, '0', this.processListABC);
                this._listADocNumber2.attr('readOnly', 'true').val(na);
                (this._listADocExpDate2.attr('readOnly', 'true') as any).datepicker('option', 'showOn', 'off').val(na);
            }

            if (['1', '2', '3', '4', '5', '10', '12'].indexOf(code) >= 0) {
                this.filterCombolist(this._listADoc3, {0: na}, '0', this.processListABC);
                this.filterCombolist(this._listAIssuingAuthority3, {0: na}, '0', this.processListABC);
                this._listADocNumber3.attr('readOnly', 'true').val(na);
                (this._listADocExpDate3.attr('readOnly', 'true') as any).datepicker('option', 'showOn', 'off').val(na);
            }

            if (!issuingAuthList) {
                issuingAuthList = {0:na};
            }

            this.filterCombolist(
                this._listAIssuingAuthority,
                issuingAuthList,
                issuingAuth,
                this.processListABC);

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

        return listC;
    }
}