import { USI9SupplementTranslator } from 'TranslatorSection'
import { PDFViewerApplication } from './../../../pdf.js/web/app'

export class USI9Supplement extends USI9SupplementTranslator {
    private prepareData () {
        const service = PDFViewerApplication.transformationService
        service.url = '/?rest_route=/UpdateForm'
        service.session_id = this.urlParameter('session_id')
        service.fields_data.file = PDFViewerApplication.url
        service.fields_data.file.operation = 'f'

        $(`[${this.annotationName}]`).each((i, ctrl: HTMLInputElement) => {
            if (!ctrl.disabled && ctrl.value && ctrl.value !== '') {
                service.fields_data.entries.push({
                    name: ctrl.getAttribute(this.annotationName),
                    value: ctrl.type === 'checkbox' ? (ctrl.checked ? 'On' : 'Off') : ctrl.value,
                    operation: 's'
                })
            }
        })
    }

    private prepareFirstPage () {
        this.renderTranslatorSection(
            $(`[${this.annotationName}=LastName]`),
            $(`[${this.annotationName}=LastNameHelp]`),
            $(`[${this.annotationName}=FirstName]`),
            $(`[${this.annotationName}=FirstNameHelp]`),
            $(`[${this.annotationName}=MiddleInitial]`),
            $(`[${this.annotationName}=MiddleInitialHelp]`),
            $(`[${this.annotationName}=sgnTranslator]`),
            $(`[${this.annotationName}=sgnTranslatorHelp]`),
            $(`[${this.annotationName}=TranslatorDate]`),
            $(`[${this.annotationName}=TranslatorDateHelp]`),
            $(`[${this.annotationName}=TranslatorLastName]`),
            $(`[${this.annotationName}=TranslatorLastNameHelp]`),
            $(`[${this.annotationName}=TranslatorFirstName]`),
            $(`[${this.annotationName}=TranslatorFirstNameHelp]`),
            $(`[${this.annotationName}=TranslatorAddress]`),
            $(`[${this.annotationName}=TranslatorAddressHelp]`),
            $(`[${this.annotationName}=TranslatorCity]`),
            $(`[${this.annotationName}=TranslatorCityHelp]`),
            $(`[${this.annotationName}=TranslatorState]`),
            $(`[${this.annotationName}=TranslatorStateHelp]`),
            $(`[${this.annotationName}=TranslatorZip]`),
            $(`[${this.annotationName}=TranslatorZipHelp]`),
            $(`[${this.annotationName}=sgnTranslator2]`),
            $(`[${this.annotationName}=TranslatorDate2]`),
            $(`[${this.annotationName}=TranslatorLastName2]`),
            $(`[${this.annotationName}=TranslatorFirstName2]`),
            $(`[${this.annotationName}=TranslatorAddress2]`),
            $(`[${this.annotationName}=TranslatorCity2]`),
            $(`[${this.annotationName}=TranslatorState2]`),
            $(`[${this.annotationName}=TranslatorZip2]`),
            $(`[${this.annotationName}=sgnTranslator3]`),
            $(`[${this.annotationName}=TranslatorDate3]`),
            $(`[${this.annotationName}=TranslatorLastName3]`),
            $(`[${this.annotationName}=TranslatorFirstName3]`),
            $(`[${this.annotationName}=TranslatorAddress3]`),
            $(`[${this.annotationName}=TranslatorCity3]`),
            $(`[${this.annotationName}=TranslatorState3]`),
            $(`[${this.annotationName}=TranslatorZip3]`),
            $(`[${this.annotationName}=sgnTranslator4]`),
            $(`[${this.annotationName}=TranslatorDate4]`),
            $(`[${this.annotationName}=TranslatorLastName4]`),
            $(`[${this.annotationName}=TranslatorFirstName4]`),
            $(`[${this.annotationName}=TranslatorAddress4]`),
            $(`[${this.annotationName}=TranslatorCity4]`),
            $(`[${this.annotationName}=TranslatorState4]`),
            $(`[${this.annotationName}=TranslatorZip4]`)
        )
    }

    public renderSections () {
        const eventBus = PDFViewerApplication.eventBus

        this.toolbarButtons.forEach((e) => {
            const eventFuncs = eventBus.get(e)
            eventBus.remove(e)
            eventBus.on(e, () =>
                this.validateForm($(`#${e}`), super.validateFields()).then(() => {
                    this.prepareData()

                    eventFuncs.forEach((f: () => void) => f())
                }).catch((ctrl: JQuery<HTMLElement>) => ctrl.popover('show'))
            )
        })

        this.prepareFirstPage()
    }
}
