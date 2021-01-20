import { USI9Supplement } from 'USI9Supplement'
// TS doesn't have conditional compilation. Uncomment this line during
// the development in order to have strong type declaration.
// In the Release mode this statement should be commented out
// for the sake of generated file size.
// import { PDFViewerApplication } from './../../../pdf.js/web/app'
declare let PDFViewerApplication: any

const initializationFunction = () => {
    if (PDFViewerApplication.eventBus && (document as any).webL10n) {
        PDFViewerApplication.eventBus.on('textlayerrendered', () => {
            var form = new USI9Supplement((document as any).webL10n)
            form.renderSections()
        })
    } else {
        setTimeout(initializationFunction, 100)
    }
}

setTimeout(initializationFunction, 100)
