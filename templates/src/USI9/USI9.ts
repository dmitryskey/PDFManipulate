/// <reference path="Section3.ts" />

class USI9 extends USI9Section3 {
    constructor() {
        super();

        $('body').append('<div id="dialogPage"></div>');

        let self = this;

        $('#dialogPage').dialog({
            title: self._('help'),
            minHeight: 50,
            minWidth: 50,
            autoOpen: false
        });        
    }

    public renderSections() {
        document.addEventListener('pagerendered', (e: any) => {
            if (e.detail.pageNumber === 1) {
                this.renderSection1(
                    $('#dialogPage'),
                    $('[name=LastName]'),
                    $('[name=LastNameHelp]'),
                    $('[name=FirstName]'),
                    $('[name=FirstNameHelp]'),
                    $('[name=MiddleInitial]'),
                    $('[name=MiddleInitialHelp]'),
                    $('[name=OtherNames]'),
                    $('[name=OtherNamesHelp]'),
                    $('[name=Address]'),
                    $('[name=AddressHelp]'),
                    $('[name=ApartmentNumber]'),
                    $('[name=ApartmentNumberHelp]'),
                    $('[name=City]'),
                    $('[name=CityHelp]'),
                    $('[name=State]'),
                    $('[name=StateHelp]'),
                    $('[name=Zip]'),
                    $('[name=ZipHelp]'),
                    $('[name=DateOfBirth]'),
                    $('[name=DateOfBirthHelp]'),
                    $('[name=SSN11]'),
                    $('[name=SSN12]'),
                    $('[name=SSN13]'),
                    $('[name=SSN21]'),
                    $('[name=SSN22]'),
                    $('[name=SSN31]'),
                    $('[name=SSN32]'),
                    $('[name=SSN33]'),
                    $('[name=SSN34]'),
                    $('[name=SSNHelp]'),
                    $('[name=Email]'),
                    $('[name=EmailHelp]'),
                    $('[name=Phone]'),
                    $('[name=PhoneHelp]'),
                    $('[name=Citizen]'),
                    $('[name=CitizenHelp]'),
                    $('[name=NonCitizenNational]'),
                    $('[name=NonCitizenNationalHelp]'),
                    $('[name=LawfulPermanentResident]'),
                    $('[name=LawfulPermanentResidentHelp]'),
                    $('[name=AlienAuthorizedToWork]'),
                    $('[name=AlienAuthorizedToWorkHelp]'),
                    $('[name=USCISNumberHelp]'),
                    $('[name=LPRUSCISNumberPrefix]'),
                    $('[name=LPRUSCISNumber]'),
                    $('[name=LPRUSCISNumberType]'),
                    $('[name=AlienWorkAuthorizationDate]'),
                    $('[name=AlienUSCISNumberPrefix]'),
                    $('[name=AlienUSCISNumber]'),
                    $('[name=AlienUSCISNumberType]'),
                    $('[name=AdmissionNumber]'),
                    $('[name=AdmissionNumberHelp]'),
                    $('[name=ForeignPassportNumber]'),
                    $('[name=ForeignPassportNumberHelp]'),
                    $('[name=CountryOfIssuance]'),
                    $('[name=CountryOfIssuanceHelp]'),
                    $('[name=sgnEmployee]'),
                    $('[name=sgnEmployeeHelp]'),
                    $('[name=sgnEmployeeDate]'),
                    $('[name=sgnEmployeeDateHelp]')
                );
        
                this.renderTranslatorSection(
                    $('#dialogPage'),
                    $('[name=PreparerOrTranslatorNo]'),
                    $('[name=PreparerOrTranslatorYes]'),
                    $('[name=PreparerOrTranslatorHelp]'),
                    $('[name=sgnTranslator]'),
                    $('[name=sgnTranslatorHelp]'),
                    $('[name=TranslatorDate]'),
                    $('[name=TranslatorDateHelp]'),
                    $('[name=TranslatorLastName]'),
                    $('[name=TranslatorLastNameHelp]'),
                    $('[name=TranslatorFirstName]'),
                    $('[name=TranslatorFirstNameHelp]'),
                    $('[name=TranslatorAddress]'),
                    $('[name=TranslatorAddressHelp]'),
                    $('[name=TranslatorCity]'),
                    $('[name=TranslatorCityHelp]'),
                    $('[name=TranslatorState]'),
                    $('[name=TranslatorStateHelp]'),
                    $('[name=TranslatorZip]'),
                    $('[name=TranslatorZipHelp]')
                );
            }
        
            if (e.detail.pageNumber === 2) {
                this.renderSection2(
                    $('#dialogPage'),
                    $('[name=EmployeeInfoSection2Help]'),
                    $('[name=LastNameSection2]'),
                    $('[name=LastNameSection2Help]'),
                    $('[name=FirstNameSection2]'),
                    $('[name=FirstNameSection2Help]'),
                    $('[name=MiddleInitialSection2]'),
                    $('[name=MiddleInitialSection2Help]'),
                    $('[name=ImmigrationStatus]'),
                    $('[name=ImmigrationStatusHelp]'),
                    $('[name=ListADocTitle]'),
                    $('[name=ListADocTitleHelp]'),
                    $('[name=ListAIssuingAuthority]'),
                    $('[name=ListAIssuingAuthorityHelp]'),
                    $('[name=ListADocNumber]'),
                    $('[name=ListADocNumberHelp]'),
                    $('[name=ListAExpDate]'),
                    $('[name=ListAExpDateHelp]'),
                    $('[name=ListADocTitle2]'),
                    $('[name=ListADocTitle2Help]'),
                    $('[name=ListAIssuingAuthority2]'),
                    $('[name=ListAIssuingAuthority2Help]'),
                    $('[name=ListADocNumber2]'),
                    $('[name=ListADocNumber2Help]'),
                    $('[name=ListAExpDate2]'),
                    $('[name=ListAExpDate2Help]'),
                    $('[name=ListADocTitle3]'),
                    $('[name=ListADocTitle3Help]'),
                    $('[name=ListAIssuingAuthority3]'),
                    $('[name=ListAIssuingAuthority3Help]'),
                    $('[name=ListADocNumber3]'),
                    $('[name=ListADocNumber3Help]'),
                    $('[name=ListAExpDate3]'),
                    $('[name=ListAExpDate3Help]'),
                    $('[name=ListBDocTitle]'),
                    $('[name=ListBDocTitleHelp]'),
                    $('[name=ListBIssuingAuthority]'),
                    $('[name=ListBIssuingAuthorityHelp]'),
                    $('[name=ListBDocNumber]'),
                    $('[name=ListBDocNumberHelp]'),
                    $('[name=ListBExpDate]'),
                    $('[name=ListBExpDateHelp]'),
                    $('[name=ListCDocTitle]'),
                    $('[name=ListCDocTitleHelp]'),
                    $('[name=ListCIssuingAuthority]'),
                    $('[name=ListCIssuingAuthorityHelp]'),
                    $('[name=ListCDocNumber]'),
                    $('[name=ListCDocNumberHelp]'),
                    $('[name=ListCExpDate]'),
                    $('[name=ListCExpDateHelp]'),
                    $('[name=AdditionalInfo]'),
                    $('[name=AdditionalInfoHelp]')
                );
            }
        });
    }
}

var form = new USI9();
form.renderSections();