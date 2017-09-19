/// <reference path="TranslatorSection.ts" />

class USI9Section2 extends USI9Translator {
    protected renderSection2(
        dialog: JQuery<HTMLElement>,
        employeeInfoHelp: JQuery<HTMLElement>,
        lastName: JQuery<HTMLElement>,
        lastNameHelp: JQuery<HTMLElement>,
        firstName: JQuery<HTMLElement>,
        firstNameHelp: JQuery<HTMLElement>,
        middleInitial: JQuery<HTMLElement>,
        middleInitialHelp: JQuery<HTMLElement>,
        immigrationStatus: JQuery<HTMLElement>,
        immigrationStatusHelp: JQuery<HTMLElement>,
        listADoc: JQuery<HTMLElement>,
        listADocHelp: JQuery<HTMLElement>,
        listAIssuingAuthority: JQuery<HTMLElement>,
        listAIssuingAuthorityHelp: JQuery<HTMLElement>,
        listADocNumber: JQuery<HTMLElement>,
        listADocNumberHelp: JQuery<HTMLElement>,
        listADocExpDate: JQuery<HTMLElement>,
        listADocExpDateHelp: JQuery<HTMLElement>,
        listADoc2: JQuery<HTMLElement>,
        listADoc2Help: JQuery<HTMLElement>,
        listAIssuingAuthority2: JQuery<HTMLElement>,
        listAIssuingAuthority2Help: JQuery<HTMLElement>,
        listADocNumber2: JQuery<HTMLElement>,
        listADocNumber2Help: JQuery<HTMLElement>,
        listADocExpDate2: JQuery<HTMLElement>,
        listADocExpDate2Help: JQuery<HTMLElement>,
        listADoc3: JQuery<HTMLElement>,
        listADoc3Help: JQuery<HTMLElement>,
        listAIssuingAuthority3: JQuery<HTMLElement>,
        listAIssuingAuthority3Help: JQuery<HTMLElement>,
        listADocNumber3: JQuery<HTMLElement>,
        listADocNumber3Help: JQuery<HTMLElement>,
        listADocExpDate3: JQuery<HTMLElement>,
        listADocExpDate3Help: JQuery<HTMLElement>,
        listBDoc: JQuery<HTMLElement>,
        listBDocHelp: JQuery<HTMLElement>,
        listBIssuingAuthority: JQuery<HTMLElement>,
        listBIssuingAuthorityHelp: JQuery<HTMLElement>,
        listBDocNumber: JQuery<HTMLElement>,
        listBDocNumberHelp: JQuery<HTMLElement>,
        listBDocExpDate: JQuery<HTMLElement>,
        listBDocExpDateHelp: JQuery<HTMLElement>,
        listCDoc: JQuery<HTMLElement>,
        listCDocHelp: JQuery<HTMLElement>,
        listCIssuingAuthority: JQuery<HTMLElement>,
        listCIssuingAuthorityHelp: JQuery<HTMLElement>,
        listCDocNumber: JQuery<HTMLElement>,
        listCDocNumberHelp: JQuery<HTMLElement>,
        listCDocExpDate: JQuery<HTMLElement>,
        listCDocExpDateHelp: JQuery<HTMLElement>,
        additionalInfo: JQuery<HTMLElement>,
        additionalInfoHelp: JQuery<HTMLElement>,
        hireDate: JQuery<HTMLElement>,
        hireDateHelp: JQuery<HTMLElement>,
        sgnEmployer: JQuery<HTMLElement>,
        sgnEmployerHelp: JQuery<HTMLElement>,
        employerSignDate: JQuery<HTMLElement>,
        employerSignDateHelp: JQuery<HTMLElement>,
        employerTitle: JQuery<HTMLElement>,
        employerTitleHelp: JQuery<HTMLElement>,
        employerLastName: JQuery<HTMLElement>,
        employerLastNameHelp: JQuery<HTMLElement>,
        employerFirstName: JQuery<HTMLElement>,
        employerFirstNameHelp: JQuery<HTMLElement>,
        employerName: JQuery<HTMLElement>,
        employerNameHelp: JQuery<HTMLElement>,
        employerAddress: JQuery<HTMLElement>,
        employerAddressHelp: JQuery<HTMLElement>,
        employerCity: JQuery<HTMLElement>,
        employerCityHelp: JQuery<HTMLElement>,
        employerState: JQuery<HTMLElement>,
        employerStateHelp: JQuery<HTMLElement>,
        employerZip: JQuery<HTMLElement>,
        employerZipHelp: JQuery<HTMLElement>) {

        $('a').prop('target', '_blank');

        this._employeeInfoHelp = this.renderHelpIcon(
            employeeInfoHelp,
            this._('employeeinfosection2help.caption'),
            dialog,
            this._('employeeinfosection2help.text')
        );            
    
        this._lastNameSection2 = lastName;
    
        this._lastNameSection2Help = this.renderHelpIcon(
            lastNameHelp,
            this._('lastnamesection2help.caption'),
            dialog,
            this._('lastnamesection2help.text')
        );
    
        this._firstNameSection2 = firstName;
    
        this._firstNameSection2Help = this.renderHelpIcon(
            firstNameHelp,
            this._('firstnamesection2help.caption'),
            dialog,
            this._('firstnamesection2help.text')
        );
            
        this._middleInitialSection2 = middleInitial;
    
        this._middleInitialSection2Help = this.renderHelpIcon(
            middleInitialHelp,
            this._('middleinitialsection2help.caption'), 
            dialog,
            this._('middleinitialsection2help.text')
        );
        
        this._immigrationStatus = immigrationStatus;
    
        this._immigrationStatusHelp = this.renderHelpIcon(
            immigrationStatusHelp,
            this._('immigrationstatushelp.caption'),
            dialog,
            this._('immigrationstatushelp.text')
        );

        this.renderListABC(
            dialog,
            listADoc,
            listADocHelp,
            listAIssuingAuthority,
            listAIssuingAuthorityHelp,
            listADocNumber,
            listADocNumberHelp,
            listADocExpDate,
            listADocExpDateHelp,
            listADoc2,
            listADoc2Help,
            listAIssuingAuthority2,
            listAIssuingAuthority2Help,
            listADocNumber2,
            listADocNumber2Help,
            listADocExpDate2,
            listADocExpDate2Help,
            listADoc3,
            listADoc3Help,
            listAIssuingAuthority3,
            listAIssuingAuthority3Help,
            listADocNumber3,
            listADocNumber3Help,
            listADocExpDate3,
            listADocExpDate3Help,
            listBDoc,
            listBDocHelp,
            listBIssuingAuthority,
            listBIssuingAuthorityHelp,
            listBDocNumber,
            listBDocNumberHelp,
            listBDocExpDate,
            listBDocExpDateHelp,
            listCDoc,
            listCDocHelp,
            listCIssuingAuthority,
            listCIssuingAuthorityHelp,
            listCDocNumber,
            listCDocNumberHelp,
            listCDocExpDate,
            listCDocExpDateHelp
        );
        
        this._additionalInfo = additionalInfo
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('additionalinfo.tooltip')})

        this._additionalInfoHelp = this.renderHelpIcon(
            additionalInfoHelp,
            this._('additionalinfohelp.caption'),
            dialog,
            this._('additionalinfohelp.text'),
            500
        );

        this._hireDate = hireDate
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('hiredate.tooltip')})
        .datepicker({minDate: new Date()});

        this._hireDateHelp = this.renderHelpIcon(
            hireDateHelp,
            this._('hiredatehelp.caption'),
            dialog,
            this._('hiredatehelp.text')
        );

        this.renderEmployerData(
            dialog,
            sgnEmployer,
            sgnEmployerHelp,
            employerSignDate,
            employerSignDateHelp,
            employerTitle,
            employerTitleHelp,
            employerLastName,
            employerLastNameHelp,
            employerFirstName,
            employerFirstNameHelp,
            employerName,
            employerNameHelp,
            employerAddress,
            employerAddressHelp,
            employerCity,
            employerCityHelp,
            employerState,
            employerStateHelp,
            employerZip,
            employerZipHelp
        );
    }

    private renderListABC(
        dialog: JQuery<HTMLElement>,
        listADoc: JQuery<HTMLElement>,
        listADocHelp: JQuery<HTMLElement>,
        listAIssuingAuthority: JQuery<HTMLElement>,
        listAIssuingAuthorityHelp: JQuery<HTMLElement>,
        listADocNumber: JQuery<HTMLElement>,
        listADocNumberHelp: JQuery<HTMLElement>,
        listADocExpDate: JQuery<HTMLElement>,
        listADocExpDateHelp: JQuery<HTMLElement>,
        listADoc2: JQuery<HTMLElement>,
        listADoc2Help: JQuery<HTMLElement>,
        listAIssuingAuthority2: JQuery<HTMLElement>,
        listAIssuingAuthority2Help: JQuery<HTMLElement>,
        listADocNumber2: JQuery<HTMLElement>,
        listADocNumber2Help: JQuery<HTMLElement>,
        listADocExpDate2: JQuery<HTMLElement>,
        listADocExpDate2Help: JQuery<HTMLElement>,
        listADoc3: JQuery<HTMLElement>,
        listADoc3Help: JQuery<HTMLElement>,
        listAIssuingAuthority3: JQuery<HTMLElement>,
        listAIssuingAuthority3Help: JQuery<HTMLElement>,
        listADocNumber3: JQuery<HTMLElement>,
        listADocNumber3Help: JQuery<HTMLElement>,
        listADocExpDate3: JQuery<HTMLElement>,
        listADocExpDate3Help: JQuery<HTMLElement>,
        listBDoc: JQuery<HTMLElement>,
        listBDocHelp: JQuery<HTMLElement>,
        listBIssuingAuthority: JQuery<HTMLElement>,
        listBIssuingAuthorityHelp: JQuery<HTMLElement>,
        listBDocNumber: JQuery<HTMLElement>,
        listBDocNumberHelp: JQuery<HTMLElement>,
        listBDocExpDate: JQuery<HTMLElement>,
        listBDocExpDateHelp: JQuery<HTMLElement>,
        listCDoc: JQuery<HTMLElement>,
        listCDocHelp: JQuery<HTMLElement>,
        listCIssuingAuthority: JQuery<HTMLElement>,
        listCIssuingAuthorityHelp: JQuery<HTMLElement>,
        listCDocNumber: JQuery<HTMLElement>,
        listCDocNumberHelp: JQuery<HTMLElement>,
        listCDocExpDate: JQuery<HTMLElement>,
        listCDocExpDateHelp: JQuery<HTMLElement>){

        this._listADoc = listADoc
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listadoc.tooltip')});
    
        this._listADocHelp = this.renderHelpIcon(
            listADocHelp,
            this._('listadochelp.caption'),
            dialog,
            this._('listadochelp.text'),
            500
        );
    
        this._listAIssuingAuthority = listAIssuingAuthority
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listaissuingauthority.tooltip')});
    
        this._listAIssuingAuthorityHelp = this.renderHelpIcon(
            listAIssuingAuthorityHelp,
            this._('listaissuingauthorityhelp.caption'),
            dialog,
            this._('listaissuingauthorityhelp.text'),
            500
        );
    
        this._listADocNumber = listADocNumber
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listadocnumber.tooltip')});
    
        this._listADocNumberHelp = this.renderHelpIcon(
            listADocNumberHelp,
            this._('listadocnumberhelp.caption'),
            dialog,
            this._('listadocnumberhelp.text'),
            500
        );
    
        this._listADocExpDate = listADocExpDate
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listaexpdate.tooltip')})
        .datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        });
    
        this._listADocExpDateHelp = this.renderHelpIcon(
            listADocExpDateHelp,
            this._('listaexpdatehelp.caption'),
            dialog,
            this._('listaexpdatehelp.text'),
            500
        );
    
        this._listADoc2 = listADoc2
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listadoc2.tooltip')});
    
        this._listADoc2Help = this.renderHelpIcon(
            listADoc2Help,
            this._('listadoc2help.caption'),
            dialog,
            this._('listadoc2help.text'),
            500
        );
    
        this._listAIssuingAuthority2 = listAIssuingAuthority2
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listaissuingauthority2.tooltip')});
        
        this._listAIssuingAuthority2Help = this.renderHelpIcon(
            listAIssuingAuthority2Help,
            this._('listaissuingauthority2help.caption'),
            dialog,
            this._('listaissuingauthority2help.text'),
            500
        );
    
        this._listADocNumber2 = listADocNumber2
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listadocnumber2.tooltip')});
        
        this._listADocNumber2Help = this.renderHelpIcon(
            listADocNumber2Help,
            this._('listadocnumber2help.caption'),
            dialog,
            this._('listadocnumber2help.text'),
            500
        );
    
        this._listADocExpDate2 = listADocExpDate2
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listaexpdate2.tooltip')})
        .datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        });
        
        this._listADocExpDate2Help = this.renderHelpIcon(
            listADocExpDate2Help,
            this._('listaexpdate2help.caption'),
            dialog,
            this._('listaexpdate2help.text'),
            500
        );
    
        this._listADoc3 = listADoc3
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listadoc3.tooltip')});
    
        this._listADoc3Help = this.renderHelpIcon(
            listADoc3Help,
            this._('listadoc3help.caption'),
            dialog,
            this._('listadoc3help.text'),
            500
        );
        
        this._listAIssuingAuthority3 = listAIssuingAuthority3
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listaissuingauthority3.tooltip')});
        
        this._listAIssuingAuthority3Help = this.renderHelpIcon(
            listAIssuingAuthority3Help,
            this._('listaissuingauthority3help.caption'),
            dialog,
            this._('listaissuingauthority3help.text'),
            500
        );
    
        this._listADocNumber3 = listADocNumber3
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listadocnumber3.tooltip')});
        
        this._listADocNumber3Help = this.renderHelpIcon(
            listADocNumber3Help,
            this._('listadocnumber3help.caption'),
            dialog,
            this._('listadocnumber3help.text'),
            500
        );
    
        this._listADocExpDate3 = listADocExpDate3
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listaexpdate3.tooltip')})
        .datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        });
        
        this._listADocExpDate3Help = this.renderHelpIcon(
            listADocExpDate3Help,
            this._('listaexpdate3help.caption'),
            dialog,
            this._('listaexpdate3help.text'),
            500
        );
    
        this._listBDoc = listBDoc
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listbdoc.tooltip')});
    
        this._listBDocHelp = this.renderHelpIcon(
            listBDocHelp,
            this._('listbdochelp.caption'),
            dialog,
            this._('listbdochelp.text'),
            600
        );
    
        this.filterCombolist(this._listBDoc, this.getListBContent(null), null, this, this.processListABC);
    
        this._listBIssuingAuthority = listBIssuingAuthority
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listbissuingauthority.tooltip')});
        
        this._listBIssuingAuthorityHelp = this.renderHelpIcon(
            listBIssuingAuthorityHelp,
            this._('listbissuingauthorityhelp.caption'),
            dialog,
            this._('listbissuingauthorityhelp.text'),
            500
        );
    
        this._listBDocNumber = listBDocNumber
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listbdocnumber.tooltip')});
    
        this._listBDocNumberHelp = this.renderHelpIcon(
            listBDocNumberHelp,
            this._('listbdocnumberhelp.caption'),
            dialog,
            this._('listbdocnumberhelp.text'),
        );
    
        this._listBDocExpDate = listBDocExpDate
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listbexpdate.tooltip')})
        .datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        });
        
        this._listBDocExpDateHelp = this.renderHelpIcon(
            listBDocExpDateHelp,
            this._('listbexpdatehelp.caption'),
            dialog,
            this._('listbexpdatehelp.text'),
            500
        );
    
        this._listCDoc = listCDoc
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listcdoc.tooltip')});
    
        this._listCDocHelp = this.renderHelpIcon(
            listCDocHelp,
            this._('listcdochelp.caption'),
            dialog,
            this._('listcdochelp.text'),
            600
        );
    
        this.filterCombolist(this._listCDoc, this.getListCContent(null), null, this, this.processListABC);
    
        this._listCIssuingAuthority = listCIssuingAuthority
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listcissuingauthority.tooltip')});
        
        this._listCIssuingAuthorityHelp = this.renderHelpIcon(
            listCIssuingAuthorityHelp,
            this._('listcissuingauthorityhelp.caption'),
            dialog,
            this._('listcissuingauthorityhelp.text'),
            500
        );
    
        this._listCDocNumber = listCDocNumber
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listcdocnumber.tooltip')});
    
        this._listCDocNumberHelp = this.renderHelpIcon(
            listCDocNumberHelp,
            this._('listcdocnumberhelp.caption'),
            dialog,
            this._('listcdocnumberhelp.text'),
        );
    
        this._listCDocExpDate = listCDocExpDate
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('listcexpdate.tooltip')})
        .datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        });
        
        this._listCDocExpDateHelp = this.renderHelpIcon(
            listCDocExpDateHelp,
            this._('listcexpdatehelp.caption'),
            dialog,
            this._('listcexpdatehelp.text'),
            500
        );
    }

    private renderEmployerData(
        dialog: JQuery<HTMLElement>,
        sgnEmployer: JQuery<HTMLElement>,
        sgnEmployerHelp: JQuery<HTMLElement>,
        employerSignDate: JQuery<HTMLElement>,
        employerSignDateHelp: JQuery<HTMLElement>,
        employerTitle: JQuery<HTMLElement>,
        employerTitleHelp: JQuery<HTMLElement>,
        employerLastName: JQuery<HTMLElement>,
        employerLastNameHelp: JQuery<HTMLElement>,
        employerFirstName: JQuery<HTMLElement>,
        employerFirstNameHelp: JQuery<HTMLElement>,
        employerName: JQuery<HTMLElement>,
        employerNameHelp: JQuery<HTMLElement>,
        employerAddress: JQuery<HTMLElement>,
        employerAddressHelp: JQuery<HTMLElement>,
        employerCity: JQuery<HTMLElement>,
        employerCityHelp: JQuery<HTMLElement>,
        employerState: JQuery<HTMLElement>,
        employerStateHelp: JQuery<HTMLElement>,
        employerZip: JQuery<HTMLElement>,
        employerZipHelp: JQuery<HTMLElement>){
            
        this._sgnEmployer = sgnEmployer
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('sgnemployer.tooltip')});

        this._sgnEmployerHelp = this.renderHelpIcon(
            sgnEmployerHelp,
            this._('sgnemployerhelp.caption'),
            dialog,
            this._('sgnemployerhelp.text'),
            500
        );

        this._employerSignDate = employerSignDate
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employersigndate.tooltip')})
        .datepicker({minDate: new Date()});

        this._employerSignDateHelp = this.renderHelpIcon(
            employerSignDateHelp,
            this._('employersigndatehelp.caption'),
            dialog,
            this._('employersigndatehelp.text'),
            500
        );

        this._employerTitle = employerTitle
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employertitle.tooltip')});

        this._employerTitleHelp = this.renderHelpIcon(
            employerTitleHelp,
            this._('employertitlehelp.caption'),
            dialog,
            this._('employertitlehelp.text'),
            500
        );

        this._employerLastName = employerLastName
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employerlastname.tooltip')});

        this._employerLastNameHelp = this.renderHelpIcon(
            employerLastNameHelp,
            this._('employerlastnamehelp.caption'),
            dialog,
            this._('employerlastnamehelp.text'),
            500
        );

        this._employerFirstName = employerFirstName
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employerfirstname.tooltip')});

        this._employerFirstNameHelp = this.renderHelpIcon(
            employerFirstNameHelp,
            this._('employerfirstnamehelp.caption'),
            dialog,
            this._('employerfirstnamehelp.text'),
            500
        );

        this._employerName = employerName
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employername.tooltip')});

        this._employerNameHelp = this.renderHelpIcon(
            employerNameHelp,
            this._('employernamehelp.caption'),
            dialog,
            this._('employernamehelp.text'),
            500
        );

        this._employerAddress = employerAddress
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employeraddress.tooltip')});

        this._employerAddressHelp = this.renderHelpIcon(
            employerAddressHelp,
            this._('employeraddresshelp.caption'),
            dialog,
            this._('employeraddresshelp.text'),
            500
        );

        this._employerCity = employerCity
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employercity.tooltip')});

        this._employerCityHelp = this.renderHelpIcon(
            employerCityHelp,
            this._('employercityhelp.caption'),
            dialog,
            this._('employercityhelp.text'),
            500
        );

        this._employerState = employerState
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employerstate.tooltip')});

        this._employerStateHelp = this.renderHelpIcon(
            employerStateHelp,
            this._('employerstatehelp.caption'),
            dialog,
            this._('employerstatehelp.text'),
            500
        );

        this._employerZip = employerZip
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employerzip.tooltip')})
        .prop('maxLength', 5)
        .keypress(e => this.zipFormat.test(String.fromCharCode(e.which)));

        this._employerZipHelp = this.renderHelpIcon(
            employerZipHelp,
            this._('employerziphelp.caption'),
            dialog,
            this._('employerziphelp.text')
        );
    }
}