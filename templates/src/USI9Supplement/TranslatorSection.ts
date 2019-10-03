import { USI9SupplementFields } from 'Fields'

export class USI9SupplementTranslator extends USI9SupplementFields {
    protected renderTranslatorSection (
        lastName: JQuery<HTMLElement>,
        lastNameHelp: JQuery<HTMLElement>,
        firstName: JQuery<HTMLElement>,
        firstNameHelp: JQuery<HTMLElement>,
        middleInitial: JQuery<HTMLElement>,
        middleInitialHelp: JQuery<HTMLElement>,
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
        translatorZipHelp: JQuery<HTMLElement>,
        sgnTranslator2: JQuery<HTMLElement>,
        translatorDate2: JQuery<HTMLElement>,
        translatorLastName2: JQuery<HTMLElement>,
        translatorFirstName2: JQuery<HTMLElement>,
        translatorAddress2: JQuery<HTMLElement>,
        translatorCity2: JQuery<HTMLElement>,
        translatorState2: JQuery<HTMLElement>,
        translatorZip2: JQuery<HTMLElement>,
        sgnTranslator3: JQuery<HTMLElement>,
        translatorDate3: JQuery<HTMLElement>,
        translatorLastName3: JQuery<HTMLElement>,
        translatorFirstName3: JQuery<HTMLElement>,
        translatorAddress3: JQuery<HTMLElement>,
        translatorCity3: JQuery<HTMLElement>,
        translatorState3: JQuery<HTMLElement>,
        translatorZip3: JQuery<HTMLElement>,
        sgnTranslator4: JQuery<HTMLElement>,
        translatorDate4: JQuery<HTMLElement>,
        translatorLastName4: JQuery<HTMLElement>,
        translatorFirstName4: JQuery<HTMLElement>,
        translatorAddress4: JQuery<HTMLElement>,
        translatorCity4: JQuery<HTMLElement>,
        translatorState4: JQuery<HTMLElement>,
        translatorZip4: JQuery<HTMLElement>) {
        $('a').prop('target', '_blank')

        this._lastName = this.renderControl(lastName, this._('lastnamehelp.tooltip'))
            .keypress(e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode)

        this._lastNameHelp = this.renderHelpIcon(
            lastNameHelp,
            this._('lastnamehelp.caption'),
            this._('lastnamehelp.text')
        )

        this._firstName = this.renderControl(firstName, this._('firstnamehelp.tooltip'))
            .keypress(e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode)

        this._firstNameHelp = this.renderHelpIcon(
            firstNameHelp,
            this._('firstnamehelp.caption'),
            this._('firstnamehelp.text')
        )

        // N/A option
        this._middleInitial = this.renderControl(middleInitial, this._('middleinitialhelp.tooltip'))
            .keypress(e =>
                this.nameFormat.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode)

        this._middleInitialHelp = this.renderHelpIcon(
            middleInitialHelp,
            this._('middleinitialhelp.caption'),
            this._('middleinitialhelp.text')
        )

        this._sgnTranslator = this.renderControl(sgnTranslator, this._('sgntranslator.tooltip'))

        this._sgnTranslatorHelp = this.renderHelpIcon(
            sgnTranslatorHelp,
            this._('sgntranslatorhelp.caption'),
            this._('sgntranslatorhelp.text')
        )

        this._translatorDate = this.renderControl(translatorDate, this._('translatordate.tooltip'), true, 'left')
            .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled')

        this._translatorDateHelp = this.renderHelpIcon(
            translatorDateHelp,
            this._('translatordatehelp.caption'),
            this._('translatordatehelp.text')
        )

        this._translatorLastName = this.renderControl(translatorLastName, this._('translatorlastname.tooltip'))
            .keypress(e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode)

        this._translatorLastNameHelp = this.renderHelpIcon(
            translatorLastNameHelp,
            this._('translatorlastnamehelp.caption'),
            this._('translatorlastnamehelp.text')
        )

        this._translatorFirstName = this.renderControl(translatorFirstName, this._('translatorfirstname.tooltip'))
            .keypress(e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode)

        this._translatorFirstNameHelp = this.renderHelpIcon(
            translatorFirstNameHelp,
            this._('translatorfirstnamehelp.caption'),
            this._('translatorfirstnamehelp.text')
        )

        this._translatorAddress = this.renderControl(translatorAddress, this._('translatoraddress.tooltip'))

        this._translatorAddressHelp = this.renderHelpIcon(
            translatorAddressHelp,
            this._('translatoraddresshelp.caption'),
            this._('translatoraddresshelp.text')
        )

        this._translatorCity = this.renderControl(translatorCity, this._('translatorcity.tooltip'))

        this._translatorCityHelp = this.renderHelpIcon(
            translatorCityHelp,
            this._('translatorcityhelp.caption'),
            this._('translatorcityhelp.text')
        )

        this._translatorState = this.renderControl(translatorState, this._('translatorstate.tooltip'), true, 'left')
        this.setCombolistText(this._translatorState, ' ', this.blankItem)

        this._translatorStateHelp = this.renderHelpIcon(
            translatorStateHelp,
            this._('translatorstatehelp.caption'),
            this._('translatorstatehelp.text')
        )

        this._translatorZip = this.renderControl(translatorZip, this._('translatorzip.tooltip'))
            .keypress(e => this.zipFormat.test(e.key) || e.key === this.backSpaceCode)

        this._translatorZipHelp = this.renderHelpIcon(
            translatorZipHelp,
            this._('translatorziphelp.caption'),
            this._('translatorziphelp.text')
        )

        this._sgnTranslator2 = this.renderControl(sgnTranslator2, this._('sgntranslator.tooltip'))
        this._translatorDate2 = this.renderControl(translatorDate2, this._('translatordate.tooltip'), true, 'left')
            .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled')

        this._translatorLastName2 = this.renderControl(translatorLastName2, this._('translatorlastname.tooltip'))
            .keypress(e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode)

        this._translatorFirstName2 = this.renderControl(translatorFirstName2, this._('translatorfirstname.tooltip'))
            .keypress(e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode)

        this._translatorAddress2 = this.renderControl(translatorAddress2, this._('translatoraddress.tooltip'))

        this._translatorCity2 = this.renderControl(translatorCity2, this._('translatorcity.tooltip'))

        this._translatorState2 = this.renderControl(translatorState2, this._('translatorstate.tooltip'), true, 'left')
        this.setCombolistText(this._translatorState2, ' ', this.blankItem)

        this._translatorZip2 = this.renderControl(translatorZip2, this._('translatorzip.tooltip'))
            .keypress(e => this.zipFormat.test(e.key) || e.key === this.backSpaceCode)

        this._sgnTranslator3 = this.renderControl(sgnTranslator3, this._('sgntranslator.tooltip'))
        this._translatorDate3 = this.renderControl(translatorDate3, this._('translatordate.tooltip'), true, 'left')
            .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled')

        this._translatorLastName3 = this.renderControl(translatorLastName3, this._('translatorlastname.tooltip'))
            .keypress(e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode)

        this._translatorFirstName3 = this.renderControl(translatorFirstName3, this._('translatorfirstname.tooltip'))
            .keypress(e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode)

        this._translatorAddress3 = this.renderControl(translatorAddress3, this._('translatoraddress.tooltip'))

        this._translatorCity3 = this.renderControl(translatorCity3, this._('translatorcity.tooltip'))

        this._translatorState3 = this.renderControl(translatorState3, this._('translatorstate.tooltip'), true, 'left')
        this.setCombolistText(this._translatorState3, ' ', this.blankItem)

        this._translatorZip3 = this.renderControl(translatorZip3, this._('translatorzip.tooltip'))
            .keypress(e => this.zipFormat.test(e.key) || e.key === this.backSpaceCode)

        this._sgnTranslator4 = this.renderControl(sgnTranslator4, this._('sgntranslator.tooltip'))
        this._translatorDate4 = this.renderControl(translatorDate4, this._('translatordate.tooltip'), true, 'left')
            .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled')

        this._translatorLastName4 = this.renderControl(translatorLastName4, this._('translatorlastname.tooltip'))
            .keypress(e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode)

        this._translatorFirstName4 = this.renderControl(translatorFirstName4, this._('translatorfirstname.tooltip'))
            .keypress(e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode)

        this._translatorAddress4 = this.renderControl(translatorAddress4, this._('translatoraddress.tooltip'))

        this._translatorCity4 = this.renderControl(translatorCity4, this._('translatorcity.tooltip'))

        this._translatorState4 = this.renderControl(translatorState4, this._('translatorstate.tooltip'), true, 'left')
        this.setCombolistText(this._translatorState4, ' ', this.blankItem)

        this._translatorZip4 = this.renderControl(translatorZip4, this._('translatorzip.tooltip'))
            .keypress(e => this.zipFormat.test(e.key) || e.key === this.backSpaceCode)
    }

    protected validateFields (): string[] {
        const errorMessages: string[] = []

        // Put N/A if required
        if ((this._middleInitial.val() as string).trim() === '') {
            this._middleInitial.val(this.na)
        }

        this.validateTextField(this._lastName, this._('name.last'), [this.nameFormat], false, errorMessages)
        this.validateTextField(this._firstName, this._('name.first'), [this.nameFormat], false, errorMessages)
        this.validateTextField(this._middleInitial, this._('name.middleinitial'), [this.nameInitialFormat, this.NAString], false, errorMessages)

        let prefix = this._('translator.prefix') + ' 1: '

        this.validateTextField(this._translatorDate, this._('date.sgntranslator'), [this.dateFormat], true, errorMessages, prefix)
        this.validateTextField(this._translatorLastName, this._('translator.lastname'), [this.nameFormat], true, errorMessages, prefix)
        this.validateTextField(this._translatorFirstName, this._('translator.firstname'), [this.nameFormat], true, errorMessages, prefix)
        this.validateTextField(this._translatorAddress, this._('translator.address'), [], true, errorMessages, prefix)
        this.validateTextField(this._translatorCity, this._('translator.city'), [], true, errorMessages, prefix)
        this.validateTextField(this._translatorState, this._('translator.state'), [], true, errorMessages, prefix)
        this.validateTextField(this._translatorZip, this._('translator.zip'), [this.zipNumberFormat], true, errorMessages, prefix)

        if ((this._translatorDate2.val() as string).trim() !== '' ||
            (this._translatorLastName2.val() as string).trim() !== '' ||
            (this._translatorFirstName2.val() as string).trim() !== '' ||
            (this._translatorAddress2.val() as string).trim() !== '' ||
            (this._translatorCity2.val() as string).trim() !== '' ||
            (this._translatorState2.val() as string).trim() !== '' ||
            (this._translatorZip2.val() as string).trim() !== '') {
            prefix = this._('translator.prefix') + ' 2: '

            this.validateTextField(this._translatorDate2, this._('date.sgntranslator'), [this.dateFormat], true, errorMessages, prefix)
            this.validateTextField(this._translatorLastName2, this._('translator.lastname'), [this.nameFormat], true, errorMessages, prefix)
            this.validateTextField(this._translatorFirstName2, this._('translator.firstname'), [this.nameFormat], true, errorMessages, prefix)
            this.validateTextField(this._translatorAddress2, this._('translator.address'), [], true, errorMessages, prefix)
            this.validateTextField(this._translatorCity2, this._('translator.city'), [], true, errorMessages, prefix)
            this.validateTextField(this._translatorState2, this._('translator.state'), [], true, errorMessages, prefix)
            this.validateTextField(this._translatorZip2, this._('translator.zip'), [this.zipNumberFormat], true, errorMessages, prefix)
        }

        if ((this._translatorDate3.val() as string).trim() !== '' ||
            (this._translatorLastName3.val() as string).trim() !== '' ||
            (this._translatorFirstName3.val() as string).trim() !== '' ||
            (this._translatorAddress3.val() as string).trim() !== '' ||
            (this._translatorCity3.val() as string).trim() !== '' ||
            (this._translatorState3.val() as string).trim() !== '' ||
            (this._translatorZip3.val() as string).trim() !== '') {
            prefix = this._('translator.prefix') + ' 3: '

            this.validateTextField(this._translatorDate3, this._('date.sgntranslator'), [this.dateFormat], true, errorMessages, prefix)
            this.validateTextField(this._translatorLastName3, this._('translator.lastname'), [this.nameFormat], true, errorMessages, prefix)
            this.validateTextField(this._translatorFirstName3, this._('translator.firstname'), [this.nameFormat], true, errorMessages, prefix)
            this.validateTextField(this._translatorAddress3, this._('translator.address'), [], true, errorMessages, prefix)
            this.validateTextField(this._translatorCity3, this._('translator.city'), [], true, errorMessages, prefix)
            this.validateTextField(this._translatorState3, this._('translator.state'), [], true, errorMessages, prefix)
            this.validateTextField(this._translatorZip3, this._('translator.zip'), [this.zipNumberFormat], true, errorMessages, prefix)
        }

        if ((this._translatorDate4.val() as string).trim() !== '' ||
            (this._translatorLastName4.val() as string).trim() !== '' ||
            (this._translatorFirstName4.val() as string).trim() !== '' ||
            (this._translatorAddress4.val() as string).trim() !== '' ||
            (this._translatorCity4.val() as string).trim() !== '' ||
            (this._translatorState4.val() as string).trim() !== '' ||
            (this._translatorZip4.val() as string).trim() !== '') {
            prefix = this._('translator.prefix') + ' 4: '

            this.validateTextField(this._translatorDate4, this._('date.sgntranslator'), [this.dateFormat], true, errorMessages, prefix)
            this.validateTextField(this._translatorLastName4, this._('translator.lastname'), [this.nameFormat], true, errorMessages, prefix)
            this.validateTextField(this._translatorFirstName4, this._('translator.firstname'), [this.nameFormat], true, errorMessages, prefix)
            this.validateTextField(this._translatorAddress4, this._('translator.address'), [], true, errorMessages, prefix)
            this.validateTextField(this._translatorCity4, this._('translator.city'), [], true, errorMessages, prefix)
            this.validateTextField(this._translatorState4, this._('translator.state'), [], true, errorMessages, prefix)
            this.validateTextField(this._translatorZip4, this._('translator.zip'), [this.zipNumberFormat], true, errorMessages, prefix)
        }

        return errorMessages
    }
}
