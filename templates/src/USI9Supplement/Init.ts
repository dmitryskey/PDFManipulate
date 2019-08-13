import { USI9Supplement } from './USI9Supplement';

// Global PDF.JS object references.
declare var PDFViewerApplication: any;
let eventBus = PDFViewerApplication.eventBus;

eventBus.on('textlayerrendered', () => {
    var form = new USI9Supplement(PDFViewerApplication, (document as any).webL10n);
    form.renderSections();
});
