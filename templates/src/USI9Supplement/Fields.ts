import { PDFForm } from 'PDFForm'

export class USI9SupplementFields extends PDFForm {
    // region "Section 1 Personal data Fields"
    protected _lastName: JQuery<HTMLElement>;
    protected _lastNameHelp: JQuery<HTMLElement>;
    protected _firstName: JQuery<HTMLElement>;
    protected _firstNameHelp: JQuery<HTMLElement>;
    protected _middleInitial: JQuery<HTMLElement>;
    protected _middleInitialHelp: JQuery<HTMLElement>;
    // endregion

    // region "Translator Section Fields"
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
    // endregion

    // region "Translator 2 Section Fields"
    protected _sgnTranslator2: JQuery<HTMLElement>;
    protected _sgnTranslator2Help: JQuery<HTMLElement>;
    protected _translatorDate2: JQuery<HTMLElement>;
    protected _translatorDate2Help: JQuery<HTMLElement>;
    protected _translatorLastName2: JQuery<HTMLElement>;
    protected _translatorLastName2Help: JQuery<HTMLElement>;
    protected _translatorFirstName2: JQuery<HTMLElement>;
    protected _translatorFirstName2Help: JQuery<HTMLElement>;
    protected _translatorAddress2: JQuery<HTMLElement>;
    protected _translatorAddress2Help: JQuery<HTMLElement>;
    protected _translatorCity2: JQuery<HTMLElement>;
    protected _translatorCity2Help: JQuery<HTMLElement>;
    protected _translatorState2: JQuery<HTMLElement>;
    protected _translatorState2Help: JQuery<HTMLElement>;
    protected _translatorZip2: JQuery<HTMLElement>;
    protected _translatorZip2Help: JQuery<HTMLElement>;
    // endregion

    // region "Translator 3 Section Fields"
    protected _sgnTranslator3: JQuery<HTMLElement>;
    protected _sgnTranslator3Help: JQuery<HTMLElement>;
    protected _translatorDate3: JQuery<HTMLElement>;
    protected _translatorDate3Help: JQuery<HTMLElement>;
    protected _translatorLastName3: JQuery<HTMLElement>;
    protected _translatorLastName3Help: JQuery<HTMLElement>;
    protected _translatorFirstName3: JQuery<HTMLElement>;
    protected _translatorFirstName3Help: JQuery<HTMLElement>;
    protected _translatorAddress3: JQuery<HTMLElement>;
    protected _translatorAddress3Help: JQuery<HTMLElement>;
    protected _translatorCity3: JQuery<HTMLElement>;
    protected _translatorCity3Help: JQuery<HTMLElement>;
    protected _translatorState3: JQuery<HTMLElement>;
    protected _translatorState3Help: JQuery<HTMLElement>;
    protected _translatorZip3: JQuery<HTMLElement>;
    protected _translatorZip3Help: JQuery<HTMLElement>;
    // endregion

    // region "Translator 4 Section Fields"
    protected _sgnTranslator4: JQuery<HTMLElement>;
    protected _sgnTranslator4Help: JQuery<HTMLElement>;
    protected _translatorDate4: JQuery<HTMLElement>;
    protected _translatorDate4Help: JQuery<HTMLElement>;
    protected _translatorLastName4: JQuery<HTMLElement>;
    protected _translatorLastName4Help: JQuery<HTMLElement>;
    protected _translatorFirstName4: JQuery<HTMLElement>;
    protected _translatorFirstName4Help: JQuery<HTMLElement>;
    protected _translatorAddress4: JQuery<HTMLElement>;
    protected _translatorAddress4Help: JQuery<HTMLElement>;
    protected _translatorCity4: JQuery<HTMLElement>;
    protected _translatorCity4Help: JQuery<HTMLElement>;
    protected _translatorState4: JQuery<HTMLElement>;
    protected _translatorState4Help: JQuery<HTMLElement>;
    protected _translatorZip4: JQuery<HTMLElement>;
    protected _translatorZip4Help: JQuery<HTMLElement>;
    // endregion

    protected paramExistsMsg = this._('parameter.exists');
    protected paramLengthMsg = this._('parameter.length');
    protected paramFormatMsg = this._('parameter.format');
    protected paramMaxValueMsg = this._('parameter.max');
    protected paramMinValueMsg = this._('parameter.min');
    protected dateFormatMsg = this._('date.format');

    protected invalidFieldClass = 'invalid';

    protected validateDateRange (f: JQuery<HTMLElement>, parameter: string, errorMessages: string[], prefix: string = '') : boolean {
        if (!f) {
            return true
        }

        const maxDate = f.datepicker('option', 'maxDate') as Date
        const minDate = f.datepicker('option', 'minDate') as Date
        if (maxDate) {
            maxDate.setHours(0, 0, 0, 0)
        }

        if (minDate) {
            minDate.setHours(0, 0, 0, 0)
        }

        if (maxDate && f && f.val() && (new Date(f.val() as string) > maxDate)) {
            errorMessages.push(
                this.paramMaxValueMsg
                    .replace('$[prefix]', prefix)
                    .replace('$[parameter]', parameter)
                    .replace('$[value]', maxDate.toDateString())
            )
        } else if (minDate && f && f.val() && (new Date(f.val() as string) < minDate)) {
            errorMessages.push(
                this.paramMinValueMsg
                    .replace('$[prefix]', prefix)
                    .replace('$[parameter]', parameter)
                    .replace('$[value]', minDate.toDateString())
            )
        } else {
            return true
        }

        return false
    }

    protected validateTextField (
        f: JQuery<HTMLElement>,
        parameter: string,
        regExs: RegExp[],
        validateIfEmpty: boolean,
        errorMessages: string[],
        prefix: string = ''): boolean {
        let errorFlag = true
        const length = f.prop('maxLength') ? f.prop('maxLength') : 0

        if (!f || !f.val() || (f.attr(this.annotationRequired) && (f.val() as string).trim() === '')) {
            errorMessages.push(
                this.paramExistsMsg
                    .replace('$[prefix]', prefix)
                    .replace('$[parameter]', parameter))
        } else if (f && f.val() && (f.val() as string).length > length && length > 0) {
            errorMessages.push(
                this.paramLengthMsg
                    .replace('$[prefix]', prefix)
                    .replace('$[parameter]', parameter)
                    .replace('$[length]', length.toString()))
        } else if (((f && f.val() !== '') || validateIfEmpty) && regExs.length > 0) {
            let validFlag = false
            for (const i in regExs) {
                if (f && regExs[i].test(f.val() as string)) {
                    validFlag = true
                    break
                }
            }

            if (!validFlag) {
                errorMessages.push(
                    this.paramFormatMsg
                        .replace('$[prefix]', prefix)
                        .replace('$[parameter]', parameter))
            }

            errorFlag = !validFlag

            if (!errorFlag) {
                errorFlag = !this.validateDateRange(f, parameter, errorMessages, prefix)
            }
        } else {
            errorFlag = false
        }

        if (f) {
            f.toggleClass(this.invalidFieldClass, errorFlag)
        }

        return !errorFlag
    }
}
