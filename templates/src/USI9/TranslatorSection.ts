/// <reference path="Section1.ts" />

class USI9Translator extends USI9Section1 {
    protected renderTranslatorSection(
        dialog: JQuery<HTMLElement>,
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

        var translator = [translatorYes, translatorNo];
            
        this._translatorYes = this.renderControl(translatorYes, this._('translator.tooltip'))
        .click(() => { 
            this.selectCheckmark(this._translatorYes, translator);

            this._sgnTranslator.prop('disabled', false);
            this._translatorDate.prop('disabled', false);
            this._translatorLastName.prop('disabled', false);
            this._translatorFirstName.prop('disabled', false);
            this._translatorAddress.prop('disabled', false);
            this._translatorCity.prop('disabled', false);
            this._translatorState.prop('disabled', false);
            this._translatorZip.prop('disabled', false);
        });
            
        this._translatorNo = this.renderControl(translatorNo, this._('translator.tooltip'))
        .click(() => {
            this.selectCheckmark(this._translatorNo, translator);
            
            this._sgnTranslator.val('').prop('disabled', true);
            this._translatorDate.val('').prop('disabled', true);
            this._translatorLastName.val('').prop('disabled', true);
            this._translatorFirstName.val('').prop('disabled', true);
            this._translatorAddress.val('').prop('disabled', true);
            this._translatorCity.val('').prop('disabled', true);
            this._translatorState.val('').prop('disabled', true);
            this._translatorZip.val('').prop('disabled', true);
        });
            
        this._translatorHelp = this.renderHelpIcon(
            translatorHelp,
            this._('translatorhelp.caption'),
            dialog,
            this._('translatorhelp.text'),
            500
        );
            
        this._sgnTranslator = this.renderControl(sgnTranslator, this._('sgntranslator.tooltip'));

        this._sgnTranslatorHelp = this.renderHelpIcon(
            sgnTranslatorHelp,
            this._('sgntranslatorhelp.caption'),
            dialog,
            this._('sgntranslatorhelp.text')
        );
            
        this._translatorDate = this.renderControl(translatorDate, this._('translatordate.tooltip'))
        .datepicker({ minDate: new Date() });

        this._translatorDateHelp = this.renderHelpIcon(
            translatorDateHelp,
            this._('translatordatehelp.caption'),
            dialog,
            this._('translatordatehelp.text')
        );
            
        this._translatorLastName = this.renderControl(translatorLastName, this._('translatorlastname.tooltip'))
        .keypress(e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode);

        this._translatorLastNameHelp = this.renderHelpIcon(
            translatorLastNameHelp,
            this._('translatorlastnamehelp.caption'),
            dialog,
            this._('translatorlastnamehelp.text')
        );
            
        this._translatorFirstName = this.renderControl(translatorFirstName, this._('translatorfirstname.tooltip'))
        .keypress(e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode);

        this._translatorFirstNameHelp = this.renderHelpIcon(
            translatorFirstNameHelp,
            this._('translatorfirstnamehelp.caption'),
            dialog,
            this._('translatorfirstnamehelp.text')
        );
            
        this._translatorAddress = this.renderControl(translatorAddress, this._('translatoraddress.tooltip'));

        this._translatorAddressHelp = this.renderHelpIcon(
            translatorAddressHelp,
            this._('translatoraddresshelp.caption'),
            dialog,
            this._('translatoraddresshelp.text')
        );
            
        this._translatorCity = this.renderControl(translatorCity, this._('translatorcity.tooltip'));

        this._translatorCityHelp = this.renderHelpIcon(
            translatorCityHelp,
            this._('translatorcityhelp.caption'),
            dialog,
            this._('translatorcityhelp.text')
        );
            
        this._translatorState = this.renderControl(translatorState, this._('translatorstate.tooltip'));
        this.setCombolistText(this._translatorState, ' ', this.blankItem);

        this._translatorStateHelp = this.renderHelpIcon(
            translatorStateHelp,
            this._('translatorstatehelp.caption'),
            dialog,
            this._('translatorstatehelp.text')
        );
            
        this._translatorZip = this.renderControl(translatorZip, this._('translatorzip.tooltip'))
        .keypress(e => this.zipFormat.test(e.key) || e.key === this.backSpaceCode);

        this._translatorZipHelp = this.renderHelpIcon(
            translatorZipHelp,
            this._('translatorziphelp.caption'),
            dialog,
            this._('translatorziphelp.text')
        );
    }

    protected validateFields(): string[] {
        let errorMessages = super.validateFields();

        let translator = [this._translatorNo, this._translatorYes];
        let statusSelected = translator.filter(status => status.prop('checked')).length > 0;
        if (!statusSelected) {
            errorMessages.push(this._('translator.status'));
        }
        
        translator.forEach(status => status.toggleClass(this.invalidFieldClass, !statusSelected));
        
        if (this._translatorYes.prop('checked')) {
            this._translatorDate.attr(this.annotationRequired, 'true');
            this.validateTextField(this._translatorDate, this._('date.sgntranslator'), [this.dateFormat], true, errorMessages);
            this._translatorLastName.attr(this.annotationRequired, 'true');
            this.validateTextField(this._translatorLastName, this._('translator.lastname'), [this.nameFormat], true, errorMessages);
            this._translatorFirstName.attr(this.annotationRequired, 'true');
            this.validateTextField(this._translatorFirstName, this._('translator.firstname'), [this.nameFormat], true, errorMessages);
            this._translatorAddress.attr(this.annotationRequired, 'true');
            this.validateTextField(this._translatorAddress, this._('translator.address'), [], true, errorMessages);
            this._translatorCity.attr(this.annotationRequired, 'true');
            this.validateTextField(this._translatorCity, this._('translator.city'), [], true, errorMessages);
            this._translatorState.attr(this.annotationRequired, 'true');
            this.validateTextField(this._translatorState, this._('translator.state'), [], true, errorMessages);
            this._translatorZip.attr(this.annotationRequired, 'true');
            this.validateTextField(this._translatorZip, this._('translator.zip'), [this.zipNumberFormat], true, errorMessages);
        } else {
            this._translatorDate.removeAttr(this.annotationRequired);
            this._translatorLastName.removeAttr(this.annotationRequired);
            this._translatorFirstName.removeAttr(this.annotationRequired);
            this._translatorAddress.removeAttr(this.annotationRequired);
            this._translatorCity.removeAttr(this.annotationRequired);
            this._translatorState.removeAttr(this.annotationRequired);
            this._translatorZip.removeAttr(this.annotationRequired);
        }

        return errorMessages;
    }
}