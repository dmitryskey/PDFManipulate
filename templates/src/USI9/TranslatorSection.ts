import { USI9Section1 } from './Section1'

export class USI9Translator extends USI9Section1 {
    protected renderTranslatorSection (
        tabIndex: number,
        translatorNo: JQuery<HTMLElement>,
        translatorYes: JQuery<HTMLElement>,
        translatorHelp: JQuery<HTMLElement>,
        sgnTranslator: JQuery<HTMLElement>,
        sgnTranslatorHelp: JQuery<HTMLElement>,
        translatorDate: JQuery<HTMLElement>,
        translatorDateHelp: JQuery<HTMLElement>,
        translatorLastName: JQuery<HTMLElement>,
        translatorLastNameHelp: JQuery<HTMLElement>,
        translatorFirstName: JQuery<HTMLElement>,
        translatorFirstNameHelp: JQuery<HTMLElement>,
        translatorAddress: JQuery<HTMLElement>,
        translatorAddressHelp: JQuery<HTMLElement>,
        translatorCity: JQuery<HTMLElement>,
        translatorCityHelp: JQuery<HTMLElement>,
        translatorState: JQuery<HTMLElement>,
        translatorStateHelp: JQuery<HTMLElement>,
        translatorZip: JQuery<HTMLElement>,
        translatorZipHelp: JQuery<HTMLElement>) {
        var translator = [translatorNo, translatorYes]

        this._translatorNo = this.renderControl(translatorNo, this._('translator.tooltip'), false)
            .on('click', () => {
                this.selectCheckmark(this._translatorNo, translator)

                this._sgnTranslator.val('').prop('disabled', true)
                this._translatorDate.val('').prop('disabled', true)
                this._translatorLastName.val('').prop('disabled', true)
                this._translatorFirstName.val('').prop('disabled', true)
                this._translatorAddress.val('').prop('disabled', true)
                this._translatorCity.val('').prop('disabled', true)
                this._translatorState.val('').prop('disabled', true)
                this._translatorZip.val('').prop('disabled', true)
            })
            .attr('tabindex', tabIndex++)

        this._translatorYes = this.renderControl(translatorYes, this._('translator.tooltip'), false)
            .on('click', () => {
                this.selectCheckmark(this._translatorYes, translator)

                this._sgnTranslator.prop('disabled', false)
                this._translatorDate.prop('disabled', false)
                this._translatorLastName.prop('disabled', false)
                this._translatorFirstName.prop('disabled', false)
                this._translatorAddress.prop('disabled', false)
                this._translatorCity.prop('disabled', false)
                this._translatorState.prop('disabled', false)
                this._translatorZip.prop('disabled', false)
            })
            .attr('tabindex', tabIndex++)

        this._translatorHelp = this.renderHelpIcon(
            translatorHelp,
            this._('translatorhelp.caption'),
            this._('translatorhelp.text')
        )

        this._sgnTranslator = this.renderControl(sgnTranslator, this._('sgntranslator.tooltip'))
            .attr('tabindex', tabIndex++)

        this._sgnTranslatorHelp = this.renderHelpIcon(
            sgnTranslatorHelp,
            this._('sgntranslatorhelp.caption'),
            this._('sgntranslatorhelp.text')
        )

        this._translatorDate = this.renderControl(translatorDate, this._('translatordate.tooltip'), true, 'left')
            .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled')
            .attr('tabindex', tabIndex++)

        this._translatorDateHelp = this.renderHelpIcon(
            translatorDateHelp,
            this._('translatordatehelp.caption'),
            this._('translatordatehelp.text')
        )

        this._translatorLastName = this.renderControl(translatorLastName, this._('translatorlastname.tooltip'))
            .on('keypress', e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode)
            .attr('tabindex', tabIndex++)

        this._translatorLastNameHelp = this.renderHelpIcon(
            translatorLastNameHelp,
            this._('translatorlastnamehelp.caption'),
            this._('translatorlastnamehelp.text')
        )

        this._translatorFirstName = this.renderControl(translatorFirstName, this._('translatorfirstname.tooltip'))
            .on('keypress', e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode)
            .attr('tabindex', tabIndex++)

        this._translatorFirstNameHelp = this.renderHelpIcon(
            translatorFirstNameHelp,
            this._('translatorfirstnamehelp.caption'),
            this._('translatorfirstnamehelp.text')
        )

        this._translatorAddress = this.renderControl(translatorAddress, this._('translatoraddress.tooltip'))
            .attr('tabindex', tabIndex++)

        this._translatorAddressHelp = this.renderHelpIcon(
            translatorAddressHelp,
            this._('translatoraddresshelp.caption'),
            this._('translatoraddresshelp.text')
        )

        this._translatorCity = this.renderControl(translatorCity, this._('translatorcity.tooltip'))
            .attr('tabindex', tabIndex++)

        this._translatorCityHelp = this.renderHelpIcon(
            translatorCityHelp,
            this._('translatorcityhelp.caption'),
            this._('translatorcityhelp.text')
        )

        this._translatorState = this.renderControl(translatorState, this._('translatorstate.tooltip'), true, 'left')
            .attr('tabindex', tabIndex++)
        this.setCombolistText(this._translatorState, ' ', this.blankItem)

        this._translatorStateHelp = this.renderHelpIcon(
            translatorStateHelp,
            this._('translatorstatehelp.caption'),
            this._('translatorstatehelp.text')
        )

        this._translatorZip = this.renderControl(translatorZip, this._('translatorzip.tooltip'))
            .on('keypress', e => this.zipFormat.test(e.key) || e.key === this.backSpaceCode)
            .attr('tabindex', tabIndex++)

        this._translatorZipHelp = this.renderHelpIcon(
            translatorZipHelp,
            this._('translatorziphelp.caption'),
            this._('translatorziphelp.text')
        )

        return tabIndex
    }

    protected validateFields (confirmFlag: boolean): string[] {
        const errorMessages = super.validateFields(confirmFlag)

        const translator = [this._translatorNo, this._translatorYes]
        const statusSelected = translator.filter(status => status.prop('checked')).length > 0
        if (!statusSelected) {
            errorMessages.push(this._('translator.status'))
        }

        translator.forEach(status => status.toggleClass(this.invalidFieldClass, !statusSelected))

        if (this._translatorYes.prop('checked')) {
            this._translatorDate.attr(this.annotationRequired, 'true')
            this.validateTextField(this._translatorDate, this._('date.sgntranslator'), [this.dateFormat], true, errorMessages)
            this._translatorLastName.attr(this.annotationRequired, 'true')
            this.validateTextField(this._translatorLastName, this._('translator.lastname'), [this.nameFormat], true, errorMessages)
            this._translatorFirstName.attr(this.annotationRequired, 'true')
            this.validateTextField(this._translatorFirstName, this._('translator.firstname'), [this.nameFormat], true, errorMessages)
            this._translatorAddress.attr(this.annotationRequired, 'true')
            this.validateTextField(this._translatorAddress, this._('translator.address'), [], true, errorMessages)
            this._translatorCity.attr(this.annotationRequired, 'true')
            this.validateTextField(this._translatorCity, this._('translator.city'), [], true, errorMessages)
            this._translatorState.attr(this.annotationRequired, 'true')
            this.validateTextField(this._translatorState, this._('translator.state'), [], true, errorMessages)
            this._translatorZip.attr(this.annotationRequired, 'true')
            this.validateTextField(this._translatorZip, this._('translator.zip'), [this.zipNumberFormat], true, errorMessages)
        } else {
            this._translatorDate.removeAttr(this.annotationRequired)
            this._translatorLastName.removeAttr(this.annotationRequired)
            this._translatorFirstName.removeAttr(this.annotationRequired)
            this._translatorAddress.removeAttr(this.annotationRequired)
            this._translatorCity.removeAttr(this.annotationRequired)
            this._translatorState.removeAttr(this.annotationRequired)
            this._translatorZip.removeAttr(this.annotationRequired)
        }

        return errorMessages
    }
}
