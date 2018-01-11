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
    protected _signDateSec3: JQuery<HTMLElement>;
    protected _signDateSec3Help: JQuery<HTMLElement>;
    protected _employerNameSec3: JQuery<HTMLElement>;
    protected _employerNameSec3Help: JQuery<HTMLElement>;
    //endregion

    protected paramExistsMsg = this._('parameter.exists');
    protected paramLengthMsg = this._('parameter.length');
    protected paramFormatMsg = this._('parameter.format');
    protected paramMaxValueMsg = this._('parameter.max');
    protected paramMinValueMsg = this._('parameter.min');
    protected dateFormatMsg = this._('date.format');

    protected invalidFieldClass = 'invalid';

    protected validateDateRange(f: JQuery<HTMLElement>, parameter: string, errorMessages: string[], prefix: string = '') : boolean {
        if (!f) {
            return true;
        }

        let maxDate = f.datepicker('option', 'maxDate') as Date;
        let minDate = f.datepicker('option', 'minDate') as Date;
        if (maxDate) {
            maxDate.setHours(0, 0, 0, 0);
        }

        if (minDate) {
            minDate.setHours(0, 0, 0, 0);
        }

        if (maxDate && f && f.val() && (new Date(f.val() as string) > maxDate)) {
            errorMessages.push(
                this.paramMaxValueMsg
                .replace('${prefix}', prefix)
                .replace('${parameter}', parameter)
                .replace('${value}', maxDate.toDateString())
            );
        } else if (minDate && f && f.val() && (new Date(f.val() as string) < minDate)) {
            errorMessages.push(
                this.paramMinValueMsg
                .replace('${prefix}', prefix)
                .replace('${parameter}', parameter)
                .replace('${value}', minDate.toDateString())
            );
        } else {
            return true;
        }

        return false
    }

    protected validateTextField(
        f: JQuery<HTMLElement>,
        parameter: string,
        regExs: RegExp[],
        validateIfEmpty: boolean,
        errorMessages: string[],
        prefix: string = ''): boolean {

        let errorFlag = true;
        let length = f.prop('maxLength') ? f.prop('maxLength') : 0;

        if (!f || !f.val() || (f.attr(this.annotationRequired) && (f.val() as string).trim() === '')) {   
            errorMessages.push(
                this.paramExistsMsg
                .replace('${prefix}', prefix)
                .replace('${parameter}', parameter));
        } else if (f && f.val() && (f.val() as string).length > length && length > 0) {
            errorMessages.push(
                this.paramLengthMsg
                .replace('${prefix}', prefix)
                .replace('${parameter}', parameter)
                .replace('${length}', length.toString()));
        } else if ((f && f.val() !== '' || validateIfEmpty) && regExs.length > 0) {
            let validFlag = false;
            for (let i in regExs) {
                if (f && regExs[i].test(f.val() as string)) {
                    validFlag = true;
                    break;
                }
            }

            if (!validFlag) {
                errorMessages.push(
                    this.paramFormatMsg
                    .replace('${prefix}', prefix)
                    .replace('${parameter}', parameter));
            }

            errorFlag = !validFlag;

            if (!errorFlag) {
                errorFlag = !this.validateDateRange(f, parameter, errorMessages, prefix);
            }
        } else {
            errorFlag = false;
        }

        if (f) {
            f.toggleClass(this.invalidFieldClass, errorFlag);
        }

        return !errorFlag;
    }

    protected filterCombolist(
        ctrl: JQuery<HTMLElement>,
        items: { [index: string]: string; },
        defaultValue: string,
        fields: USI9Section2,
        callback: (ddl: string, code: string, parent: USI9Section2) => any) {
        if (!ctrl) {
            return;
        }

        var options = ctrl.parent().children().filter('.combo-content');

        for (let index in items) {
            options.children().filter('[value="' + index + '"]').html(items[index]);
        }

        options.children().show();
        options.children().each((code: number, item: HTMLElement) => {
            var val = item.getAttribute('value');
            if (items && !(val in items)) {
                options.children().filter('[value="' + val + '"]').hide();
            }
        });

        if (callback) {
            options.children().click(e => {
                let inputText = (e.target.parentNode.parentNode as HTMLElement).getElementsByTagName('input')[0];
                if (e.target.innerHTML === this.blankItem) {
                    inputText.value = '';
                }

                callback(
                    inputText.getAttribute(this.annotationName),
                    e.target.getAttribute('value'),
                    fields
                );
            });
        }

        if (defaultValue) {
            this.setCombolistValue(ctrl, defaultValue);
        }
        else {
            ctrl.val('');
        }
    }
}