import { USI9Section3 } from './Section3'
// TS doesn't have conditional compilation. Uncomment this line during
// the development in order to have strong type declaration.
// In the Release mode this statement should be commented out
// for the sake of generated file size.
// import { PDFViewerApplication } from './../../../pdf.js/web/app'
declare let PDFViewerApplication: any

export class USI9 extends USI9Section3 {
    private prepareData () {
        const service = PDFViewerApplication.transformationService
        service.url = '/?rest_route=/UpdateForm'
        service.session_id = this.urlParameter('session_id')
        service.fields_data.file = PDFViewerApplication.url
        service.fields_data.operation = 'f'

        const readOnlyFieldsToFlat =
        ['LPRUSCISNumber', 'LPRUSCISNumberPrefix', 'AlienUSCISNumberPrefix',
            'AlienWorkAuthorizationDate', 'AlienUSCISNumber',
            'AdmissionNumber', 'ForeignPassportNumber', 'CountryOfIssuance',
            'LastNameSection2', 'FirstNameSection2',
            'MiddleInitialSection2', 'ImmigrationStatus']

        $(`[${this.annotationName}]`).each((i, ctrl: HTMLInputElement) => {
            if ((!ctrl.disabled || readOnlyFieldsToFlat.indexOf(ctrl.getAttribute(this.annotationName)) > -1) && ctrl.value && ctrl.value !== '') {
                service.fields_data.entries.push({
                    name: ctrl.getAttribute(this.annotationName),
                    value: ctrl.type === 'checkbox' ? (ctrl.checked ? 'On' : 'Off') : ctrl.value,
                    operation: 's'
                })
            }
        })
    }

    private prepareFirstPage (tabIndex: number) {
        tabIndex = this.renderSection1(
            tabIndex,
            $(`[${this.annotationName}=LastName]`),
            $(`[${this.annotationName}=LastNameHelp]`),
            $(`[${this.annotationName}=FirstName]`),
            $(`[${this.annotationName}=FirstNameHelp]`),
            $(`[${this.annotationName}=MiddleInitial]`),
            $(`[${this.annotationName}=MiddleInitialHelp]`),
            $(`[${this.annotationName}=OtherNames]`),
            $(`[${this.annotationName}=OtherNamesHelp]`),
            $(`[${this.annotationName}=Address]`),
            $(`[${this.annotationName}=AddressHelp]`),
            $(`[${this.annotationName}=ApartmentNumber]`),
            $(`[${this.annotationName}=ApartmentNumberHelp]`),
            $(`[${this.annotationName}=City]`),
            $(`[${this.annotationName}=CityHelp]`),
            $(`[${this.annotationName}=State]`),
            $(`[${this.annotationName}=StateHelp]`),
            $(`[${this.annotationName}=Zip]`),
            $(`[${this.annotationName}=ZipHelp]`),
            $(`[${this.annotationName}=DateOfBirth]`),
            $(`[${this.annotationName}=DateOfBirthHelp]`),
            $(`[${this.annotationName}=SSN11]`),
            $(`[${this.annotationName}=SSN12]`),
            $(`[${this.annotationName}=SSN13]`),
            $(`[${this.annotationName}=SSN21]`),
            $(`[${this.annotationName}=SSN22]`),
            $(`[${this.annotationName}=SSN31]`),
            $(`[${this.annotationName}=SSN32]`),
            $(`[${this.annotationName}=SSN33]`),
            $(`[${this.annotationName}=SSN34]`),
            $(`[${this.annotationName}=SSNHelp]`),
            $(`[${this.annotationName}=Email]`),
            $(`[${this.annotationName}=EmailHelp]`),
            $(`[${this.annotationName}=Phone]`),
            $(`[${this.annotationName}=PhoneHelp]`),
            $(`[${this.annotationName}=Citizen]`),
            $(`[${this.annotationName}=CitizenHelp]`),
            $(`[${this.annotationName}=NonCitizenNational]`),
            $(`[${this.annotationName}=NonCitizenNationalHelp]`),
            $(`[${this.annotationName}=LawfulPermanentResident]`),
            $(`[${this.annotationName}=LawfulPermanentResidentHelp]`),
            $(`[${this.annotationName}=AlienAuthorizedToWork]`),
            $(`[${this.annotationName}=AlienAuthorizedToWorkHelp]`),
            $(`[${this.annotationName}=USCISNumberHelp]`),
            $(`[${this.annotationName}=LPRUSCISNumberPrefix]`),
            $(`[${this.annotationName}=LPRUSCISNumber]`),
            $(`[${this.annotationName}=LPRUSCISNumberType]`),
            $(`[${this.annotationName}=AlienWorkAuthorizationDate]`),
            $(`[${this.annotationName}=AlienUSCISNumberPrefix]`),
            $(`[${this.annotationName}=AlienUSCISNumber]`),
            $(`[${this.annotationName}=AlienUSCISNumberType]`),
            $(`[${this.annotationName}=AdmissionNumber]`),
            $(`[${this.annotationName}=AdmissionNumberHelp]`),
            $(`[${this.annotationName}=ForeignPassportNumber]`),
            $(`[${this.annotationName}=ForeignPassportNumberHelp]`),
            $(`[${this.annotationName}=CountryOfIssuance]`),
            $(`[${this.annotationName}=CountryOfIssuanceHelp]`),
            $(`[${this.annotationName}=sgnEmployee]`),
            $(`[${this.annotationName}=sgnEmployeeHelp]`),
            $(`[${this.annotationName}=sgnEmployeeDate]`),
            $(`[${this.annotationName}=sgnEmployeeDateHelp]`)
        )

        tabIndex = this.renderTranslatorSection(
            tabIndex,
            $(`[${this.annotationName}=PreparerOrTranslatorNo]`),
            $(`[${this.annotationName}=PreparerOrTranslatorYes]`),
            $(`[${this.annotationName}=PreparerOrTranslatorHelp]`),
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
            $(`[${this.annotationName}=TranslatorZipHelp]`)
        )

        return tabIndex
    }

    private prepareSecondPage (tabIndex: number) {
        tabIndex = this.renderSection2(
            tabIndex,
            $(`[${this.annotationName}=EmployeeInfoSection2Help]`),
            $(`[${this.annotationName}=LastNameSection2]`),
            $(`[${this.annotationName}=LastNameSection2Help]`),
            $(`[${this.annotationName}=FirstNameSection2]`),
            $(`[${this.annotationName}=FirstNameSection2Help]`),
            $(`[${this.annotationName}=MiddleInitialSection2]`),
            $(`[${this.annotationName}=MiddleInitialSection2Help]`),
            $(`[${this.annotationName}=ImmigrationStatus]`),
            $(`[${this.annotationName}=ImmigrationStatusHelp]`),
            $(`[${this.annotationName}=ListADocTitle]`),
            $(`[${this.annotationName}=ListADocTitleHelp]`),
            $(`[${this.annotationName}=ListAIssuingAuthority]`),
            $(`[${this.annotationName}=ListAIssuingAuthorityHelp]`),
            $(`[${this.annotationName}=ListADocNumber]`),
            $(`[${this.annotationName}=ListADocNumberHelp]`),
            $(`[${this.annotationName}=ListAExpDate]`),
            $(`[${this.annotationName}=ListAExpDateHelp]`),
            $(`[${this.annotationName}=ListADocTitle2]`),
            $(`[${this.annotationName}=ListADocTitle2Help]`),
            $(`[${this.annotationName}=ListAIssuingAuthority2]`),
            $(`[${this.annotationName}=ListAIssuingAuthority2Help]`),
            $(`[${this.annotationName}=ListADocNumber2]`),
            $(`[${this.annotationName}=ListADocNumber2Help]`),
            $(`[${this.annotationName}=ListAExpDate2]`),
            $(`[${this.annotationName}=ListAExpDate2Help]`),
            $(`[${this.annotationName}=ListADocTitle3]`),
            $(`[${this.annotationName}=ListADocTitle3Help]`),
            $(`[${this.annotationName}=ListAIssuingAuthority3]`),
            $(`[${this.annotationName}=ListAIssuingAuthority3Help]`),
            $(`[${this.annotationName}=ListADocNumber3]`),
            $(`[${this.annotationName}=ListADocNumber3Help]`),
            $(`[${this.annotationName}=ListAExpDate3]`),
            $(`[${this.annotationName}=ListAExpDate3Help]`),
            $(`[${this.annotationName}=ListBDocTitle]`),
            $(`[${this.annotationName}=ListBDocTitleHelp]`),
            $(`[${this.annotationName}=ListBIssuingAuthority]`),
            $(`[${this.annotationName}=ListBIssuingAuthorityHelp]`),
            $(`[${this.annotationName}=ListBDocNumber]`),
            $(`[${this.annotationName}=ListBDocNumberHelp]`),
            $(`[${this.annotationName}=ListBExpDate]`),
            $(`[${this.annotationName}=ListBExpDateHelp]`),
            $(`[${this.annotationName}=ListCDocTitle]`),
            $(`[${this.annotationName}=ListCDocTitleHelp]`),
            $(`[${this.annotationName}=ListCIssuingAuthority]`),
            $(`[${this.annotationName}=ListCIssuingAuthorityHelp]`),
            $(`[${this.annotationName}=ListCDocNumber]`),
            $(`[${this.annotationName}=ListCDocNumberHelp]`),
            $(`[${this.annotationName}=ListCExpDate]`),
            $(`[${this.annotationName}=ListCExpDateHelp]`),
            $(`[${this.annotationName}=AdditionalInfo]`),
            $(`[${this.annotationName}=AdditionalInfoHelp]`),
            $(`[${this.annotationName}=HireDate]`),
            $(`[${this.annotationName}=HireDateHelp]`),
            $(`[${this.annotationName}=sgnEmployer]`),
            $(`[${this.annotationName}=sgnEmployerHelp]`),
            $(`[${this.annotationName}=EmployerSignDate]`),
            $(`[${this.annotationName}=EmployerSignDateHelp]`),
            $(`[${this.annotationName}=EmployerTitle]`),
            $(`[${this.annotationName}=EmployerTitleHelp]`),
            $(`[${this.annotationName}=EmployerLastName]`),
            $(`[${this.annotationName}=EmployerLastNameHelp]`),
            $(`[${this.annotationName}=EmployerFirstName]`),
            $(`[${this.annotationName}=EmployerFirstNameHelp]`),
            $(`[${this.annotationName}=EmployerName]`),
            $(`[${this.annotationName}=EmployerNameHelp]`),
            $(`[${this.annotationName}=EmployerAddress]`),
            $(`[${this.annotationName}=EmployerAddressHelp]`),
            $(`[${this.annotationName}=EmployerCity]`),
            $(`[${this.annotationName}=EmployerCityHelp]`),
            $(`[${this.annotationName}=EmployerState]`),
            $(`[${this.annotationName}=EmployerStateHelp]`),
            $(`[${this.annotationName}=EmployerZip]`),
            $(`[${this.annotationName}=EmployerZipHelp]`)
        )

        tabIndex = this.renderSection3(
            tabIndex,
            $(`[${this.annotationName}=NewLastName]`),
            $(`[${this.annotationName}=NewLastNameHelp]`),
            $(`[${this.annotationName}=NewFirstName]`),
            $(`[${this.annotationName}=NewFirstNameHelp]`),
            $(`[${this.annotationName}=NewMiddleInitial]`),
            $(`[${this.annotationName}=NewMiddleInitialHelp]`),
            $(`[${this.annotationName}=RehireDate]`),
            $(`[${this.annotationName}=RehireDateHelp]`),
            $(`[${this.annotationName}=DocTitleSec3]`),
            $(`[${this.annotationName}=DocTitleSec3Help]`),
            $(`[${this.annotationName}=DocNumberSec3]`),
            $(`[${this.annotationName}=DocNumberSec3Help]`),
            $(`[${this.annotationName}=ExpDateSec3]`),
            $(`[${this.annotationName}=ExpDateSec3Help]`),
            $(`[${this.annotationName}=sgnEmployerSec3]`),
            $(`[${this.annotationName}=sgnEmployerSec3Help]`),
            $(`[${this.annotationName}=SignDateSec3]`),
            $(`[${this.annotationName}=SignDateSec3Help]`),
            $(`[${this.annotationName}=EmployerNameSec3]`),
            $(`[${this.annotationName}=EmployerNameSec3Help]`)
        )

        return tabIndex
    }

    public renderSections () {
        this.prepareSecondPage(this.prepareFirstPage(100))

        const eventBus = PDFViewerApplication.eventBus

        this.toolbarButtons.forEach(e => {
            const eventFuncs = eventBus.get(e)
            eventBus.remove(e)
            eventBus.on(e, () =>
                this.validateDocuments((confirmFlag) =>
                    this.validateUSI9($(`#${e}`), confirmFlag).then(() => {
                        this.prepareData()

                        eventFuncs.forEach((f: { listener: () => void }) => f.listener())
                    }).catch((ctrl: JQuery<HTMLElement>) => ctrl.popover('show'))
                )
            )
        })
    }

    private validateUSI9 = (ctrl: JQuery<HTMLElement>, confirmFlag: boolean) : Promise<JQuery<HTMLElement>> =>
        this.validateForm(ctrl, this.validateFields(confirmFlag))
}
