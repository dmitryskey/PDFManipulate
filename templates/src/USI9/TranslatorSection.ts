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
            
        this._translatorYes = translatorYes
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('translator.tooltip')})
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
            
        this._translatorNo = translatorNo
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('translator.tooltip')})
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
            
        this._sgnTranslator = sgnTranslator
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('sgntranslator.tooltip')});

        this._sgnTranslatorHelp = this.renderHelpIcon(
            sgnTranslatorHelp,
            this._('sgntranslatorhelp.caption'),
            dialog,
            this._('sgntranslatorhelp.text')
        );
            
        this._translatorDate = translatorDate
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('translatordate.tooltip')})
        .datepicker({minDate: new Date()});

        this._translatorDateHelp = this.renderHelpIcon(
            translatorDateHelp,
            this._('translatordatehelp.caption'),
            dialog,
            this._('translatordatehelp.text')
        );
            
        this._translatorLastName = translatorLastName
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('translatorlastname.tooltip')})
        .prop('maxLength', 40)
        .keypress(e => this.nameFormat.test(String.fromCharCode(e.which)));

        this._translatorLastNameHelp = this.renderHelpIcon(
            translatorLastNameHelp,
            this._('translatorlastnamehelp.caption'),
            dialog,
            this._('translatorlastnamehelp.text')
        );
            
        this._translatorFirstName = translatorFirstName
        .prop('title', '').tooltip({content: this._('translatorfirstname.tooltip')})
        .prop('maxLength', 25)
        .keypress(e => this.nameFormat.test(String.fromCharCode(e.which)));

        this._translatorFirstNameHelp = this.renderHelpIcon(
            translatorFirstNameHelp,
            this._('translatorfirstnamehelp.caption'),
            dialog,
            this._('translatorfirstnamehelp.text')
        );
            
        this._translatorAddress = translatorAddress
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('translatoraddress.tooltip')});

        this._translatorAddressHelp = this.renderHelpIcon(
            translatorAddressHelp,
            this._('translatoraddresshelp.caption'),
            dialog,
            this._('translatoraddresshelp.text')
        );
            
        this._translatorCity = translatorCity
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('translatorcity.tooltip')});

        this._translatorCityHelp = this.renderHelpIcon(
            translatorCityHelp,
            this._('translatorcityhelp.caption'),
            dialog,
            this._('translatorcityhelp.text')
        );
            
        this._translatorState = translatorState
        .prop('title', '').tooltip({content: this._('translatorstate.tooltip')});

        this._translatorStateHelp = this.renderHelpIcon(
            translatorStateHelp,
            this._('translatorstatehelp.caption'),
            dialog,
            this._('translatorstatehelp.text')
        );
            
        this._translatorZip = translatorZip
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('translatorzip.tooltip')})
        .keypress(e => this.zipFormat.test(String.fromCharCode(e.which)));

        this._translatorZipHelp = this.renderHelpIcon(
            translatorZipHelp,
            this._('translatorziphelp.caption'),
            dialog,
            this._('translatorziphelp.text')
        );
    }
}