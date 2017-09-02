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
        additionalInfoHelp: JQuery<HTMLElement>) {

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
        .datepicker();

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
        .datepicker();
        
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
        .datepicker();
        
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
        .datepicker();
        
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
        .datepicker();
        
        this._listCDocExpDateHelp = this.renderHelpIcon(
            listCDocExpDateHelp,
            this._('listcexpdatehelp.caption'),
            dialog,
            this._('listcexpdatehelp.text'),
            500
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
    }
}