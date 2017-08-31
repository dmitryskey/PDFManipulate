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
        listADocNumber3: JQuery<HTMLElement>,
        listADocExpDate3: JQuery<HTMLElement>,
        listBDoc: JQuery<HTMLElement>,
        listBIssuingAuthority: JQuery<HTMLElement>,
        listBDocNumber: JQuery<HTMLElement>,
        listBDocExpDate: JQuery<HTMLElement>,
        listCDoc: JQuery<HTMLElement>,
        listCIssuingAuthority: JQuery<HTMLElement>,
        listCDocNumber: JQuery<HTMLElement>,
        listCDocExpDate: JQuery<HTMLElement>) {

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
        .prop('title', '').tooltip({content: () => this._('listadoc.tooltip')});

        this._listADocHelp = this.renderHelpIcon(
            listADocHelp,
            this._('listadochelp.caption'),
            dialog,
            this._('listadochelp.text'),
            500
        );

        this._listAIssuingAuthority = listAIssuingAuthority
        .prop('title', '').tooltip({content: () => this._('listaissuingauthority.tooltip')});

        this._listAIssuingAuthorityHelp = this.renderHelpIcon(
            listAIssuingAuthorityHelp,
            this._('listaissuingauthorityhelp.caption'),
            dialog,
            this._('listaissuingauthorityhelp.text'),
            500
        );

        this._listADocNumber = listADocNumber
        .prop('title', '').tooltip({content: () => this._('listadocnumber.tooltip')});

        this._listADocNumberHelp = this.renderHelpIcon(
            listADocNumberHelp,
            this._('listadocnumberhelp.caption'),
            dialog,
            this._('listadocnumberhelp.text'),
            500
        );

        this._listADocExpDate = listADocExpDate
        .prop('title', '').tooltip({content: () => this._('listaexpdate.tooltip')})
        .datepicker();

        this._listADocExpDateHelp = this.renderHelpIcon(
            listADocExpDateHelp,
            this._('listaexpdatehelp.caption'),
            dialog,
            this._('listaexpdatehelp.text'),
            500
        );

        this._listADoc2 = listADoc2
        .prop('title', '').tooltip({content: () => this._('listadoc2.tooltip')});

        this._listADoc2Help = this.renderHelpIcon(
            listADoc2Help,
            this._('listadoc2help.caption'),
            dialog,
            this._('listadoc2help.text'),
            500
        );

        this._listAIssuingAuthority2 = listAIssuingAuthority2
        .prop('title', '').tooltip({content: () => this._('listaissuingauthority2.tooltip')});
        
        this._listAIssuingAuthority2Help = this.renderHelpIcon(
            listAIssuingAuthority2Help,
            this._('listaissuingauthority2help.caption'),
            dialog,
            this._('listaissuingauthority2help.text'),
            500
        );

        this._listADocNumber2 = listADocNumber2
        .prop('title', '').tooltip({content: () => this._('listadocnumber2.tooltip')});
        
        this._listADocNumber2Help = this.renderHelpIcon(
            listADocNumber2Help,
            this._('listadocnumber2help.caption'),
            dialog,
            this._('listadocnumber2help.text'),
            500
        );

        this._listADocExpDate2 = listADocExpDate2
        .prop('title', '').tooltip({content: () => this._('listaexpdate2.tooltip')})
        .datepicker();
        
        this._listADocExpDate2Help = this.renderHelpIcon(
            listADocExpDate2Help,
            this._('listaexpdate2help.caption'),
            dialog,
            this._('listaexpdate2help.text'),
            500
        );

        this._listADoc3 = listADoc3
        .prop('title', '').tooltip({content: () => this._('listadoc3.tooltip')});

        this._listADoc3Help = this.renderHelpIcon(
            listADoc3Help,
            this._('listadoc3help.caption'),
            dialog,
            this._('listadoc3help.text'),
            500
        );
        
        this._listAIssuingAuthority3 = listAIssuingAuthority3;
        this._listADocNumber3 = listADocNumber3;
        this._listADocExpDate3 = listADocExpDate3
        .datepicker();

        this._listBDoc = listBDoc;
        this.filterCombolist(this._listBDoc, this.getListBContent(null), null, this, this.processListABC);
        this._listBIssuingAuthority = listBIssuingAuthority;
        this._listBDocNumber = listBDocNumber;
        this._listBDocExpDate = listBDocExpDate
        .datepicker();

        this._listCDoc = listCDoc;
        this.filterCombolist(this._listCDoc, this.getListCContent(null), null, this, this.processListABC);
        this._listCIssuingAuthority = listCIssuingAuthority;
        this._listCDocNumber = listCDocNumber;
        this._listCDocExpDate = listCDocExpDate
        .datepicker();
    }
}