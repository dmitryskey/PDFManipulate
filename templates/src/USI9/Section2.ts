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
        listAIssuingAuthority: JQuery<HTMLElement>,
        listADocNumber: JQuery<HTMLElement>,
        listADocExpDate: JQuery<HTMLElement>,
        listADoc2: JQuery<HTMLElement>,
        listAIssuingAuthority2: JQuery<HTMLElement>,
        listADocNumber2: JQuery<HTMLElement>,
        listADocExpDate2: JQuery<HTMLElement>,
        listADoc3: JQuery<HTMLElement>,
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

        this._listADoc = listADoc;
        this._listAIssuingAuthority = listAIssuingAuthority;
        this._listADocNumber = listADocNumber;
        this._listADocExpDate = listADocExpDate;
        this._listADocExpDate.datepicker();

        this._listADoc2 = listADoc2;
        this._listAIssuingAuthority2 = listAIssuingAuthority2;
        this._listADocNumber2 = listADocNumber2;
        this._listADocExpDate2 = listADocExpDate2;
        this._listADocExpDate2.datepicker();

        this._listADoc3 = listADoc3;
        this._listAIssuingAuthority3 = listAIssuingAuthority3;
        this._listADocNumber3 = listADocNumber3;
        this._listADocExpDate3 = listADocExpDate3;
        this._listADocExpDate3.datepicker();

        this._listBDoc = listBDoc;
        this.filterCombolist(this._listBDoc, this.getListBContent(null), null, this.processListABC);
        this._listBDocNumber = listBDocNumber;
        this._listBDocExpDate = listBDocExpDate;
        this._listBDocExpDate.datepicker();

        this._listCDoc = listCDoc;
        this.filterCombolist(this._listCDoc, this.getListCContent(null), null, this.processListABC);
        this._listCDocNumber = listCDocNumber;
        this._listCDocExpDate = listCDocExpDate;
        this._listCDocExpDate.datepicker();
    }
}