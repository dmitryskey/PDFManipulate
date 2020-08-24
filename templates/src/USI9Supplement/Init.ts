import { USI9Supplement } from 'USI9Supplement'
// TS doesn't have conditional complilation. Uncomment this line during
// the development in order to have strong type declaration.
// import { PDFViewerApplication } from './../../../pdf.js/web/app'
let PDFViewerApplication: any

PDFViewerApplication.eventBus.on('textlayerrendered', () => {
    var form = new USI9Supplement((document as any).webL10n)
    form.renderSections()
})
