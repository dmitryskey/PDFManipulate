/// <reference path="TranslatorSection.ts" />

// Global PDF.JS object references.
declare var PDFViewerApplication: any;

class USI9Supplement extends USI9SupplementTranslator {
    constructor() {
        super();

        this.addDialog();
    }

    private prepareData() {
        PDFViewerApplication.transformationService = '/?rest_route=/UpdateForm';
        PDFViewerApplication.sessionID = this.urlParameter('session_id');
        PDFViewerApplication.fieldsData = {
            'file': PDFViewerApplication.url,
            'operation': 'f',
            'entries': []
        }

        $('[' + this.annotationName + ']').each((i, ctrl: HTMLInputElement) => {
            if (!ctrl.disabled && ctrl.value && ctrl.value !== '') {
                PDFViewerApplication.fieldsData.entries.push({
                    'name': ctrl.getAttribute(this.annotationName),
                    'value': ctrl.type === 'checkbox' ? (ctrl.checked ? 'On' : 'Off') : ctrl.value,
                    'operation': 's'});
                }
        });
    }

    private prepareFirstPage() {
        this.renderTranslatorSection(
            $('#dialogPage'),
            $('[' + this.annotationName + '=LastName]'),
            $('[' + this.annotationName + '=LastNameHelp]'),
            $('[' + this.annotationName + '=FirstName]'),
            $('[' + this.annotationName + '=FirstNameHelp]'),
            $('[' + this.annotationName + '=MiddleInitial]'),
            $('[' + this.annotationName + '=MiddleInitialHelp]'),
            $('[' + this.annotationName + '=sgnTranslator]'),
            $('[' + this.annotationName + '=sgnTranslatorHelp]'),
            $('[' + this.annotationName + '=TranslatorDate]'),
            $('[' + this.annotationName + '=TranslatorDateHelp]'),
            $('[' + this.annotationName + '=TranslatorLastName]'),
            $('[' + this.annotationName + '=TranslatorLastNameHelp]'),
            $('[' + this.annotationName + '=TranslatorFirstName]'),
            $('[' + this.annotationName + '=TranslatorFirstNameHelp]'),
            $('[' + this.annotationName + '=TranslatorAddress]'),
            $('[' + this.annotationName + '=TranslatorAddressHelp]'),
            $('[' + this.annotationName + '=TranslatorCity]'),
            $('[' + this.annotationName + '=TranslatorCityHelp]'),
            $('[' + this.annotationName + '=TranslatorState]'),
            $('[' + this.annotationName + '=TranslatorStateHelp]'),
            $('[' + this.annotationName + '=TranslatorZip]'),
            $('[' + this.annotationName + '=TranslatorZipHelp]'),
            $('[' + this.annotationName + '=sgnTranslator2]'),
            $('[' + this.annotationName + '=TranslatorDate2]'),
            $('[' + this.annotationName + '=TranslatorLastName2]'),
            $('[' + this.annotationName + '=TranslatorFirstName2]'),
            $('[' + this.annotationName + '=TranslatorAddress2]'),
            $('[' + this.annotationName + '=TranslatorCity2]'),
            $('[' + this.annotationName + '=TranslatorState2]'),
            $('[' + this.annotationName + '=TranslatorZip2]'),
            $('[' + this.annotationName + '=sgnTranslator3]'),
            $('[' + this.annotationName + '=TranslatorDate3]'),
            $('[' + this.annotationName + '=TranslatorLastName3]'),
            $('[' + this.annotationName + '=TranslatorFirstName3]'),
            $('[' + this.annotationName + '=TranslatorAddress3]'),
            $('[' + this.annotationName + '=TranslatorCity3]'),
            $('[' + this.annotationName + '=TranslatorState3]'),
            $('[' + this.annotationName + '=TranslatorZip3]'),
            $('[' + this.annotationName + '=sgnTranslator4]'),
            $('[' + this.annotationName + '=TranslatorDate4]'),
            $('[' + this.annotationName + '=TranslatorLastName4]'),
            $('[' + this.annotationName + '=TranslatorFirstName4]'),
            $('[' + this.annotationName + '=TranslatorAddress4]'),
            $('[' + this.annotationName + '=TranslatorCity4]'),
            $('[' + this.annotationName + '=TranslatorState4]'),
            $('[' + this.annotationName + '=TranslatorZip4]')
        );
    }

    protected validateForm(dialog: JQuery<HTMLElement>) : boolean {
        let errorMessages = super.validateFields();

        if (errorMessages.length > 0) {
            var errorMessage = this._('error.header') + '<br />';
            errorMessages.forEach(element => {
                errorMessage += ' - ' + element + '<br />';
            });

            $('.ui-dialog-titlebar-close').attr('title', '');
            dialog.dialog('option', 'minWidth', 500).text('')
              .dialog('option', 'title', this._('validation'))
              .append(errorMessage).dialog('open');

            return false;
        } else {
            return true;
        }
    }

    public renderSections() {
        $('#print').off('click').click(() => {
            if (this.validateForm($('#dialogPage'))) {
                this.prepareData();

                PDFViewerApplication.print();
            }
        });

        $('#download').off('click').click(() => {
            if (this.validateForm($('#dialogPage'))) {
                this.prepareData();

                PDFViewerApplication.download();
            }
        });

        this.prepareFirstPage();
    }
}

$(document).on('textlayerrendered', (e: any) => {
    var form = new USI9Supplement();
    form.renderSections();
});