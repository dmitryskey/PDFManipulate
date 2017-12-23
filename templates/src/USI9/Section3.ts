/// <reference path="Section2.ts" />

class USI9Section3 extends USI9Section2 {
    protected renderSection3(
        dialog: JQuery<HTMLElement>,
        lastName: JQuery<HTMLElement>,
        lastNameHelp: JQuery<HTMLElement>,
        firstName: JQuery<HTMLElement>,
        firstNameHelp: JQuery<HTMLElement>,
        middleInitial: JQuery<HTMLElement>,
        middleInitialHelp: JQuery<HTMLElement>,
        rehireDate: JQuery<HTMLElement>,
        rehireDateHelp: JQuery<HTMLElement>,
        docTitleSec3: JQuery<HTMLElement>,
        docTitleSec3Help: JQuery<HTMLElement>,
        docNumberSec3: JQuery<HTMLElement>,
        docNumberSec3Help: JQuery<HTMLElement>,
        expDateSec3: JQuery<HTMLElement>,
        expDateSec3Help: JQuery<HTMLElement>,
        sgnEmployerSec3: JQuery<HTMLElement>,
        sgnEmployerSec3Help: JQuery<HTMLElement>,
        signDateSec3: JQuery<HTMLElement>,
        signDateSec3Help: JQuery<HTMLElement>,
        employerNameSec3: JQuery<HTMLElement>,
        employerNameSec3Help: JQuery<HTMLElement>)
    {
        let citizenships = [this._citizen, this._national, this._lpr, this._alien];
        
        this._citizen.click(() => {
            this.selectCheckmark(this._citizen, citizenships);
            this.processLPR(this._citizen.prop('checked'));
            this.processAlien(this._citizen.prop('checked'));
    
            this.clearListABC();
    
            if (this._citizen.prop('checked')) {
                this.fillListABC('1');
            }
        });
    
        this._national.click(() => {
            this.selectCheckmark(this._national, citizenships);
            this.processLPR(this._national.prop('checked'));
            this.processAlien(this._national.prop('checked'));
    
            this.clearListABC();
    
            if (this._national.prop('checked')) {
                this.fillListABC('2');
            }
        });
    
        this._lpr.click(() => {
            this.selectCheckmark(this._lpr, citizenships);
            this.processAlien(this._lpr.prop('checked'));
            this._lpruscisNum.val('');
            this.filterCombolist(this._lpruscisNumType, {}, null, this, this.processListABC);
    
            this.clearListABC();
        
            if (this._lpr.prop('checked')) {
                this._lpruscisNum.prop('disabled', false);
                this._lpruscisNumType.prop('disabled', false);
                this.filterCombolist(
                    this._lpruscisNumType,
                    { 'A':this._('aliennumber'), 'U':this._('uscisnumber') },
                    null,
                    this,
                    this.processListABC);
    
                    this.fillListABC('3');
                }
        });
    
        this._alien.click(() => {
            this.selectCheckmark(this._alien, citizenships);
            this.processLPR(this._alien.prop('checked'));
            this._alienWorkAuthDate.val('');
            this._alienuscisNum.val('');
            this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
            this._admissionNum.val('');
            this._passportNum.val('');
            this.filterCombolist(this._countryOfIssuance, {}, null, this, this.processListABC);
    
            this.clearListABC();
    
            if (this._alien.prop('checked')) {
                this._alienWorkAuthDate.prop('disabled', false);
                this._alienuscisNum.prop('disabled', false);
                this._alienuscisNumType.prop('disabled', false);
        
                this.filterCombolist(
                    this._alienuscisNumType, 
                    { 'A':this._('aliennumber'), 'U':this._('uscisnumber') },
                    null,
                    this,
                    this.processListABC);
        
                this._admissionNum.prop('disabled', false);
                this._passportNum.prop('disabled', false);
        
                this._countryOfIssuance.prop('disabled', false);
        
                this.filterCombolist(
                    this._countryOfIssuance,
                    JSON.parse(this._('countries')),
                    null,
                    this,
                    this.processListABC);

                    this.fillListABC('4');
                }
        });

        this._alienuscisNum.change(() => {
            if (!this.EmptyOrNA(this._alienuscisNum)) {
                if (this.EmptyOrNA(this._alienuscisNumType)) {
                    this.filterCombolist(
                        this._alienuscisNumType, 
                        { 'A':this._('aliennumber'), 'U':this._('uscisnumber') },
                        null,
                        this,
                        this.processListABC);
                }

                this._admissionNum.val(this.na);
                this._passportNum.val(this.na);
                this.filterCombolist(this._countryOfIssuance, {0:this.na}, '0', this, this.processListABC);
            }
            else {
                this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
                this._admissionNum.val('');
                this._passportNum.val('');
                this.filterCombolist(this._countryOfIssuance, {}, null, this, this.processListABC);
            }
        });

        this._admissionNum.change(() => {
            if (!this.EmptyOrNA(this._admissionNum)) {
                this._alienuscisNum.val(this.na);
                this._alienuscisNumPrefix.val('');
                this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);

                this._passportNum.val(this.na);
                this.filterCombolist(this._countryOfIssuance, {0:this.na}, '0', this, this.processListABC);
            }
            else {
                this._alienuscisNum.val('');
                this._alienuscisNumPrefix.val('');
                this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
                this._passportNum.val('');
                this.filterCombolist(this._countryOfIssuance, {}, null, this, this.processListABC);
            }
        });

        this._passportNum.change(() => {
            if (!this.EmptyOrNA(this._passportNum)) {
                this._alienuscisNum.val(this.na);
                this._alienuscisNumPrefix.val('');
                this.filterCombolist(this._alienuscisNumType, {0:this.na}, this.na, this, this.processListABC);

                this._admissionNum.val(this.na);

                if (this.EmptyOrNA(this._countryOfIssuance)) {
                    this.filterCombolist(
                        this._countryOfIssuance,
                        JSON.parse(this._('countries')),
                        null,
                        this,
                        this.processListABC);
                }
            }
            else {
                this._alienuscisNum.val('');
                this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
                this._admissionNum.val('');
            }
        });

        this.processLPR(false);
        this.processAlien(false);

        this._newlastName = this.renderControl(lastName, this._('newlastname.tooltip'))
        .keypress(e => 
            this.nameFormat.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode);

        this._newlastNameHelp = this.renderHelpIcon(
            lastNameHelp,
            this._('newlastnamehelp.caption'),
            dialog,
            this._('newlastnamehelp.text')
        );

        this._newfirstName = this.renderControl(firstName, this._('newfirstname.tooltip'))
        .keypress(e => 
            this.nameFormat.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode);

        this._newfirstNameHelp = this.renderHelpIcon(
            firstNameHelp,
            this._('newfirstnamehelp.caption'),
            dialog,
            this._('newfirstnamehelp.text')
        );

        this._newmiddleInitial = this.renderControl(middleInitial, this._('newmiddleinitial.tooltip'))
        .keypress(e =>
            this.nameFormat.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode);

        this._newmiddleInitialHelp = this.renderHelpIcon(
            middleInitialHelp,
            this._('newmiddleinitialhelp.caption'),
            dialog,
            this._('newmiddleinitialhelp.text')
        );

        this._rehireDate = this.renderControl(rehireDate, this._('rehiredate.tooltip') )
        .datepicker().attr('autocomplete', 'false')
        .unbind('keypress')
        .keypress(e =>
            /[\d/]/g.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode);

        this._rehireDateHelp = this.renderHelpIcon(
            rehireDateHelp,
            this._('rehiredatehelp.caption'),
            dialog,
            this._('rehiredatehelp.text'),
            500
        );

        this._docTitleSec3 = this.renderControl(docTitleSec3, this._('doctitlesec3.tooltip'));

        this.filterCombolist(this._docTitleSec3, {
            ' ': this.blankItem,
            0: this.na,
            1: this._('uspassport'),
            2: this._('uspassportcard'),
            3: this._('permanentresidentcard'),
            4: this._('alienresidentcard'),
            5: this._('foreignpassportwithtempI551stamp'),
            6: this._('foreignpassportwithtempI551mriv'),
            7: this._('I766receipt'),
            8: this._('foreignpassportwithI94'),
            9: this._('FSMpassport'),
            10: this._('RMIpassport'),
            11: this._('I551I94receipt'),
            12: this._('I94refugeestampreceipt') + ' ' + this._('reclassofadmission'),
            13: this._('ssncard'),
            14: this._('formFS545'),
            15: this._('formDS1350'),
            16: this._('formFS240'),
            17: this._('birthCertificate'),
            18: this._('tribalDocument'),
            19: this._('formI197'),
            20: this._('formI179'),
            21: this._('eadAuthDocument'),
            22: this._('I551receipt'),
            23: this._('I766receipt'),
            24: this._('foreignpassportwithI94Receipt'),
            25: this._('FSMpassportreceipt'),
            26: this._('RMIpassportreceipt'),
            27: this._('ssnCardReceipt'),
            28: this._('birthCertificateReceipt'),
            29: this._('tribalDocumentReceipt'),
            30: this._('eadListCReceipt')
        }, null, this, this.processListABC);

        this._docTitleSec3Help = this.renderHelpIcon(
            docTitleSec3Help,
            this._('doctitlesec3help.caption'),
            dialog,
            this._('doctitlesec3help.text'),
            500
        );

        this._docNumberSec3 = this.renderControl(docNumberSec3, this._('docnumbersec3.tooltip'));

        this._docNumberSec3Help = this.renderHelpIcon(
            docNumberSec3Help,
            this._('docnumbersec3help.caption'),
            dialog,
            this._('docnumbersec3help.text'),
            500
        );

        this._expDateSec3 = this.renderControl(expDateSec3, this._('expdatesec3.tooltip'))
        .datepicker({ minDate: new Date() }).attr('autocomplete', 'false')
        .unbind('keypress')
        .keypress(e =>
            /[\d/]/g.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode);

        this._expDateSec3Help = this.renderHelpIcon(
            expDateSec3Help,
            this._('expdatesec3help.caption'),
            dialog,
            this._('expdatesec3help.text'),
            500
        );

        this._sgnEmployerSec3 = this.renderControl(sgnEmployerSec3, this._('sgnemployersec3.tooltip'));

        this._sgnEmployerSec3Help = this.renderHelpIcon(
            sgnEmployerSec3Help,
            this._('sgnemployersec3help.caption'),
            dialog,
            this._('sgnemployersec3help.text'),
            500
        );

        this._signDateSec3 = this.renderControl(signDateSec3, this._('employersigndatesec3.tooltip'))
        .datepicker({ minDate: new Date() }).attr('autocomplete', 'off')
        .attr(this.annotationRequired, 'true')
        // work around for the Chrome auto-fill bug
        .attr('readonly', 'true')
        .focus(() => this._signDateSec3.removeAttr('readonly'))
        .blur(() => this._signDateSec3.attr('readonly', 'true'));

        this._signDateSec3Help = this.renderHelpIcon(
            signDateSec3Help,
            this._('employersigndatesec3help.caption'),
            dialog,
            this._('employersigndatesec3help.text'),
            500
        );

        this._employerNameSec3 = this.renderControl(employerNameSec3, this._('employernamesec3.tooltip'))
        .attr(this.annotationRequired, 'true');

        this._employerNameSec3Help = this.renderHelpIcon(
            employerNameSec3Help,
            this._('employernamesec3help.caption'),
            dialog,
            this._('employernamesec3help.text'),
            500
        );
    }

    protected validateFields(): string[] {
        let errorMessages = super.validateFields();

        let section3Fields = [this._newlastName, this._newfirstName, this._newmiddleInitial, this._rehireDate,
            this._docTitleSec3, this._docNumberSec3, this._expDateSec3, this._sgnEmployerSec3,
            this._signDateSec3, this._employerNameSec3];

        section3Fields.forEach(f => f.toggleClass(this.invalidFieldClass, false));

        if (section3Fields.filter(e => e.val() !== '').length > 0) {
            [this._newlastName, this._newfirstName, this._newmiddleInitial, this._rehireDate,
             this._docTitleSec3, this._docNumberSec3, this._expDateSec3].filter(f => f.val() === '')
            .forEach(f => f.val(this.na));

            this.validateTextField(this._newlastName, this._('name.last') + ' ' + this._('section3.suffix'), [this.nameFormat, this.NAString], false, errorMessages);
            this.validateTextField(this._newfirstName, this._('name.first') + ' ' + this._('section3.suffix'), [this.nameFormat, this.NAString], false, errorMessages);
            this.validateTextField(this._newmiddleInitial, this._('name.middleinitial') + ' ' + this._('section3.suffix'), [this.nameInitialFormat, this.NAString], false, errorMessages);
            this.validateTextField(this._rehireDate, this._('section3.rehire'), [this.dateFormat, this.NAString], true, errorMessages);            
            this.validateTextField(this._docNumberSec3, this._('section3.docnumber') + ' ' + this._('section3.suffix'), [this.nameFormat, this.NAString], false, errorMessages);
            this.validateTextField(this._expDateSec3, this._('section3.expdate') + ' ' + this._('section3.suffix'), [this.dateFormat, this.NAString], false, errorMessages);
            this.validateTextField(this._signDateSec3, this._('section3.today') + ' ' + this._('section3.suffix'), [this.dateFormat], true, errorMessages);
            this.validateTextField(this._employerNameSec3, this._('section3.employer') + ' ' + this._('section3.suffix'), [this.nameFormat], true, errorMessages);
        }

        return errorMessages;
    }

    private processLPR(flag: boolean) {
        var na = flag ? this.na : '';
        this._lpruscisNumPrefix.val('');
        this._lpruscisNum.prop('disabled', true).val(na);
        this._lpruscisNumType.prop('disabled', true);

        this.filterCombolist(this._lpruscisNumType, {}, null, this, this.processListABC);
    }

    private processAlien(flag: boolean) {
        var na = flag ? this.na : '';
        this._alienWorkAuthDate.prop('disabled', true).val(na);
        this._alienuscisNumPrefix.val('');
        this._alienuscisNum.prop('disabled', true).val(na);
        this._alienuscisNumType.prop('disabled', true);
        this._admissionNum.prop('disabled', true).val(na);
        this._passportNum.prop('disabled', true).val(na);
        this._countryOfIssuance.prop('disabled', true);

        this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
        this.filterCombolist(this._countryOfIssuance, flag ? {0:na} : {}, flag ? '0' : null, this, this.processListABC);
    }
}