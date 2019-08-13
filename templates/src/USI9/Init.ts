import { USI9 } from './USI9';

// Global PDF.JS object references.
declare let PDFViewerApplication: any;

let eventBus = PDFViewerApplication.eventBus;
let pdfViewer = PDFViewerApplication.pdfViewer;

let renderedPages = [false, false, false];
let form: USI9 = null;

eventBus.on('textlayerrendered', (e: any) => {
    renderedPages[e.pageNumber - 1] = true;

    if (e.pageNumber == 1 && !renderedPages[1]) {
        pdfViewer.getPageView(1);
        return;
    }

    // if refresh is done while page = 2 or 3 load the first page
    if (e.pageNumber >= 2 && !renderedPages[0]) {
        pdfViewer.getPageView(0);
        return;
    }

    if (renderedPages[0] && renderedPages[1] && form == null) {
        form = new USI9(PDFViewerApplication, (document as any).webL10n);
        form.renderSections();
    }
});