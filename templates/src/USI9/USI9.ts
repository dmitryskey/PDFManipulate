/// <reference path="Section3.ts" />

// Global PDF.JS object references.
declare var PDFViewerApplication: any;

let renderedPages = [false, false, false];

class USI9 extends USI9Section3 {
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

        let readOnlyFieldsToFlat =
        ['LPRUSCISNumberPrefix', 'AlienUSCISNumberPrefix',
         'LastNameSection2', 'FirstNameSection2',
         'MiddleInitialSection2', 'ImmigrationStatus'];

        $('[' + this.annotationName + ']').each((index, ctrl: HTMLInputElement) => {
            let op = !ctrl.disabled ||
                readOnlyFieldsToFlat.indexOf(ctrl.getAttribute(this.annotationName)) > -1;

            PDFViewerApplication.fieldsData.entries.push({
                'name': ctrl.getAttribute(this.annotationName),
                'value': op ? (ctrl.type === 'checkbox' ? ( ctrl.checked ? 'Yes' : 'No') : ctrl.value) : '',
                'operation': op ? 's': 'd'});
        });
    }

    private prepareFirstPage() {
        this.renderSection1(
            $('#dialogPage'),
            $('[' + this.annotationName + '=LastName]'),
            $('[' + this.annotationName + '=LastNameHelp]'),
            $('[' + this.annotationName + '=FirstName]'),
            $('[' + this.annotationName + '=FirstNameHelp]'),
            $('[' + this.annotationName + '=MiddleInitial]'),
            $('[' + this.annotationName + '=MiddleInitialHelp]'),
            $('[' + this.annotationName + '=OtherNames]'),
            $('[' + this.annotationName + '=OtherNamesHelp]'),
            $('[' + this.annotationName + '=Address]'),
            $('[' + this.annotationName + '=AddressHelp]'),
            $('[' + this.annotationName + '=ApartmentNumber]'),
            $('[' + this.annotationName + '=ApartmentNumberHelp]'),
            $('[' + this.annotationName + '=City]'),
            $('[' + this.annotationName + '=CityHelp]'),
            $('[' + this.annotationName + '=State]'),
            $('[' + this.annotationName + '=StateHelp]'),
            $('[' + this.annotationName + '=Zip]'),
            $('[' + this.annotationName + '=ZipHelp]'),
            $('[' + this.annotationName + '=DateOfBirth]'),
            $('[' + this.annotationName + '=DateOfBirthHelp]'),
            $('[' + this.annotationName + '=SSN11]'),
            $('[' + this.annotationName + '=SSN12]'),
            $('[' + this.annotationName + '=SSN13]'),
            $('[' + this.annotationName + '=SSN21]'),
            $('[' + this.annotationName + '=SSN22]'),
            $('[' + this.annotationName + '=SSN31]'),
            $('[' + this.annotationName + '=SSN32]'),
            $('[' + this.annotationName + '=SSN33]'),
            $('[' + this.annotationName + '=SSN34]'),
            $('[' + this.annotationName + '=SSNHelp]'),
            $('[' + this.annotationName + '=Email]'),
            $('[' + this.annotationName + '=EmailHelp]'),
            $('[' + this.annotationName + '=Phone]'),
            $('[' + this.annotationName + '=PhoneHelp]'),
            $('[' + this.annotationName + '=Citizen]'),
            $('[' + this.annotationName + '=CitizenHelp]'),
            $('[' + this.annotationName + '=NonCitizenNational]'),
            $('[' + this.annotationName + '=NonCitizenNationalHelp]'),
            $('[' + this.annotationName + '=LawfulPermanentResident]'),
            $('[' + this.annotationName + '=LawfulPermanentResidentHelp]'),
            $('[' + this.annotationName + '=AlienAuthorizedToWork]'),
            $('[' + this.annotationName + '=AlienAuthorizedToWorkHelp]'),
            $('[' + this.annotationName + '=USCISNumberHelp]'),
            $('[' + this.annotationName + '=LPRUSCISNumberPrefix]'),
            $('[' + this.annotationName + '=LPRUSCISNumber]'),
            $('[' + this.annotationName + '=LPRUSCISNumberType]'),
            $('[' + this.annotationName + '=AlienWorkAuthorizationDate]'),
            $('[' + this.annotationName + '=AlienUSCISNumberPrefix]'),
            $('[' + this.annotationName + '=AlienUSCISNumber]'),
            $('[' + this.annotationName + '=AlienUSCISNumberType]'),
            $('[' + this.annotationName + '=AdmissionNumber]'),
            $('[' + this.annotationName + '=AdmissionNumberHelp]'),
            $('[' + this.annotationName + '=ForeignPassportNumber]'),
            $('[' + this.annotationName + '=ForeignPassportNumberHelp]'),
            $('[' + this.annotationName + '=CountryOfIssuance]'),
            $('[' + this.annotationName + '=CountryOfIssuanceHelp]'),
            $('[' + this.annotationName + '=sgnEmployee]'),
            $('[' + this.annotationName + '=sgnEmployeeHelp]'),
            $('[' + this.annotationName + '=sgnEmployeeDate]'),
            $('[' + this.annotationName + '=sgnEmployeeDateHelp]')
        );

        this.renderTranslatorSection(
            $('#dialogPage'),
            $('[' + this.annotationName + '=PreparerOrTranslatorNo]'),
            $('[' + this.annotationName + '=PreparerOrTranslatorYes]'),
            $('[' + this.annotationName + '=PreparerOrTranslatorHelp]'),
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
            $('[' + this.annotationName + '=TranslatorZipHelp]')
        );
    }

    private prepareSecondPage() {
        this.renderSection2(
            $('#dialogPage'),
            $('[' + this.annotationName + '=EmployeeInfoSection2Help]'),
            $('[' + this.annotationName + '=LastNameSection2]'),
            $('[' + this.annotationName + '=LastNameSection2Help]'),
            $('[' + this.annotationName + '=FirstNameSection2]'),
            $('[' + this.annotationName + '=FirstNameSection2Help]'),
            $('[' + this.annotationName + '=MiddleInitialSection2]'),
            $('[' + this.annotationName + '=MiddleInitialSection2Help]'),
            $('[' + this.annotationName + '=ImmigrationStatus]'),
            $('[' + this.annotationName + '=ImmigrationStatusHelp]'),
            $('[' + this.annotationName + '=ListADocTitle]'),
            $('[' + this.annotationName + '=ListADocTitleHelp]'),
            $('[' + this.annotationName + '=ListAIssuingAuthority]'),
            $('[' + this.annotationName + '=ListAIssuingAuthorityHelp]'),
            $('[' + this.annotationName + '=ListADocNumber]'),
            $('[' + this.annotationName + '=ListADocNumberHelp]'),
            $('[' + this.annotationName + '=ListAExpDate]'),
            $('[' + this.annotationName + '=ListAExpDateHelp]'),
            $('[' + this.annotationName + '=ListADocTitle2]'),
            $('[' + this.annotationName + '=ListADocTitle2Help]'),
            $('[' + this.annotationName + '=ListAIssuingAuthority2]'),
            $('[' + this.annotationName + '=ListAIssuingAuthority2Help]'),
            $('[' + this.annotationName + '=ListADocNumber2]'),
            $('[' + this.annotationName + '=ListADocNumber2Help]'),
            $('[' + this.annotationName + '=ListAExpDate2]'),
            $('[' + this.annotationName + '=ListAExpDate2Help]'),
            $('[' + this.annotationName + '=ListADocTitle3]'),
            $('[' + this.annotationName + '=ListADocTitle3Help]'),
            $('[' + this.annotationName + '=ListAIssuingAuthority3]'),
            $('[' + this.annotationName + '=ListAIssuingAuthority3Help]'),
            $('[' + this.annotationName + '=ListADocNumber3]'),
            $('[' + this.annotationName + '=ListADocNumber3Help]'),
            $('[' + this.annotationName + '=ListAExpDate3]'),
            $('[' + this.annotationName + '=ListAExpDate3Help]'),
            $('[' + this.annotationName + '=ListBDocTitle]'),
            $('[' + this.annotationName + '=ListBDocTitleHelp]'),
            $('[' + this.annotationName + '=ListBIssuingAuthority]'),
            $('[' + this.annotationName + '=ListBIssuingAuthorityHelp]'),
            $('[' + this.annotationName + '=ListBDocNumber]'),
            $('[' + this.annotationName + '=ListBDocNumberHelp]'),
            $('[' + this.annotationName + '=ListBExpDate]'),
            $('[' + this.annotationName + '=ListBExpDateHelp]'),
            $('[' + this.annotationName + '=ListCDocTitle]'),
            $('[' + this.annotationName + '=ListCDocTitleHelp]'),
            $('[' + this.annotationName + '=ListCIssuingAuthority]'),
            $('[' + this.annotationName + '=ListCIssuingAuthorityHelp]'),
            $('[' + this.annotationName + '=ListCDocNumber]'),
            $('[' + this.annotationName + '=ListCDocNumberHelp]'),
            $('[' + this.annotationName + '=ListCExpDate]'),
            $('[' + this.annotationName + '=ListCExpDateHelp]'),
            $('[' + this.annotationName + '=AdditionalInfo]'),
            $('[' + this.annotationName + '=AdditionalInfoHelp]'),
            $('[' + this.annotationName + '=HireDate]'),
            $('[' + this.annotationName + '=HireDateHelp]'),
            $('[' + this.annotationName + '=sgnEmployer]'),
            $('[' + this.annotationName + '=sgnEmployerHelp]'),
            $('[' + this.annotationName + '=EmployerSignDate]'),
            $('[' + this.annotationName + '=EmployerSignDateHelp]'),
            $('[' + this.annotationName + '=EmployerTitle]'),
            $('[' + this.annotationName + '=EmployerTitleHelp]'),
            $('[' + this.annotationName + '=EmployerLastName]'),
            $('[' + this.annotationName + '=EmployerLastNameHelp]'),
            $('[' + this.annotationName + '=EmployerFirstName]'),
            $('[' + this.annotationName + '=EmployerFirstNameHelp]'),
            $('[' + this.annotationName + '=EmployerName]'),
            $('[' + this.annotationName + '=EmployerNameHelp]'),
            $('[' + this.annotationName + '=EmployerAddress]'),
            $('[' + this.annotationName + '=EmployerAddressHelp]'),
            $('[' + this.annotationName + '=EmployerCity]'),
            $('[' + this.annotationName + '=EmployerCityHelp]'),
            $('[' + this.annotationName + '=EmployerState]'),
            $('[' + this.annotationName + '=EmployerStateHelp]'),
            $('[' + this.annotationName + '=EmployerZip]'),
            $('[' + this.annotationName + '=EmployerZipHelp]')
        );

        this.renderSection3(
            $('#dialogPage'),
            $('[' + this.annotationName + '=NewLastName]'),
            $('[' + this.annotationName + '=NewLastNameHelp]'),
            $('[' + this.annotationName + '=NewFirstName]'),
            $('[' + this.annotationName + '=NewFirstNameHelp]'),
            $('[' + this.annotationName + '=NewMiddleInitial]'),
            $('[' + this.annotationName + '=NewMiddleInitialHelp]'),
            $('[' + this.annotationName + '=RehireDate]'),
            $('[' + this.annotationName + '=RehireDateHelp]'),
            $('[' + this.annotationName + '=DocTitleSec3]'),
            $('[' + this.annotationName + '=DocTitleSec3Help]'),
            $('[' + this.annotationName + '=DocNumberSec3]'),
            $('[' + this.annotationName + '=DocNumberSec3Help]'),
            $('[' + this.annotationName + '=ExpDateSec3]'),
            $('[' + this.annotationName + '=ExpDateSec3Help]'),
            $('[' + this.annotationName + '=sgnEmployerSec3]'),
            $('[' + this.annotationName + '=sgnEmployerSec3Help]'),
            $('[' + this.annotationName + '=SignDateSec3]'),
            $('[' + this.annotationName + '=SignDateSec3Help]'),
            $('[' + this.annotationName + '=EmployerNameSec3]'),
            $('[' + this.annotationName + '=EmployerNameSec3Help]')
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
        this.prepareSecondPage();
    }
}

$(document).on('textlayerrendered', (e: any) => {
    renderedPages[e.detail.pageNumber - 1] = true;

    if (e.detail.pageNumber == 1 && !renderedPages[1]) {
        PDFViewerApplication.eventBus.dispatch('nextpage');
        return;
    }

    // if refresh is done while page = 2 or 3 go to the first page
    if (e.detail.pageNumber >= 2 && !renderedPages[0]) {
        PDFViewerApplication.eventBus.dispatch('firstpage');
        return;
    }

    if (renderedPages[0] && renderedPages[1]) {
        var form = new USI9();
        form.renderSections();
    }
});