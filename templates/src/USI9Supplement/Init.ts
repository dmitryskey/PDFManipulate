import { USI9Supplement } from 'USI9Supplement'
import { PDFViewerApplication } from './../../../pdf.js/web/app'

PDFViewerApplication.eventBus.on('textlayerrendered', () => {
    var form = new USI9Supplement((document as any).webL10n)
    form.renderSections()
})
