import { USI9 } from 'USI9'
// TS doesn't have conditional complilation. Uncomment this line during
// the development in order to have strong type declaration.
// import { PDFViewerApplication } from './../../../pdf.js/web/app'
let PDFViewerApplication: any

const pdfViewer = PDFViewerApplication.pdfViewer

const renderedPages = [false, false, false]
let form: USI9 = null

PDFViewerApplication.eventBus.on('textlayerrendered', (e: any) => {
    $('a').attr('target', '_blank')

    renderedPages[e.pageNumber - 1] = true

    if (e.pageNumber === 1 && !renderedPages[1]) {
        pdfViewer.getPageView(1)
        return
    }

    // if refresh is done while page = 2 or 3 load the first page
    if (e.pageNumber >= 2 && !renderedPages[0]) {
        pdfViewer.getPageView(0)
        return
    }

    if (renderedPages[0] && renderedPages[1] && form == null) {
        form = new USI9((document as any).webL10n)
        form.renderSections()
    }
})
