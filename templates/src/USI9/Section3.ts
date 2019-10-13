import { USI9Section2 } from 'Section2'

export class USI9Section3 extends USI9Section2 {
    protected renderSection3 (
        tabIndex: number,
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
        employerNameSec3Help: JQuery<HTMLElement>) {
        const spaceSymbol = this.space
        const citizenships = [this._citizen, this._national, this._lpr, this._alien]

        this._citizen.click(() => {
            this.selectCheckmark(this._citizen, citizenships)
            this.processLPR(this._citizen.prop('checked'))
            this.processAlien(this._citizen.prop('checked'))

            this.clearListABC()

            if (this._citizen.prop('checked')) {
                this.fillListABC('1')
            }
        })

        this._national.click(() => {
            this.selectCheckmark(this._national, citizenships)
            this.processLPR(this._national.prop('checked'))
            this.processAlien(this._national.prop('checked'))

            this.clearListABC()

            if (this._national.prop('checked')) {
                this.fillListABC('2')
            }
        })

        this._lpr.click(() => {
            this.selectCheckmark(this._lpr, citizenships)
            this.processAlien(this._lpr.prop('checked'))
            this._lpruscisNum.val('')
            this.filterCombolist(this._lpruscisNumType, {}, null, this, this.processListABC)

            this.clearListABC()

            if (this._lpr.prop('checked')) {
                this._lpruscisNum.prop('disabled', false)
                this._lpruscisNumType.prop('disabled', false)
                this.filterCombolist(
                    this._lpruscisNumType,
                    { A: this._('aliennumber'), U: this._('uscisnumber') },
                    null,
                    this,
                    this.processListABC)
                this.fillListABC('3')
            }
        })

        this._alien.click(() => {
            this.selectCheckmark(this._alien, citizenships)
            this.processLPR(this._alien.prop('checked'))
            this._alienWorkAuthDate.val('')
            this._alienuscisNum.val('')
            this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC)
            this._admissionNum.val('')
            this._passportNum.val('')
            this.filterCombolist(this._countryOfIssuance, {}, null, this, this.processListABC)

            this.clearListABC()

            if (this._alien.prop('checked')) {
                this._alienWorkAuthDate.prop('disabled', false)
                this._alienuscisNum.prop('disabled', false)
                this._alienuscisNumType.prop('disabled', false)
                this.filterCombolist(
                    this._alienuscisNumType,
                    { A: this._('aliennumber'), U: this._('uscisnumber') },
                    null,
                    this,
                    this.processListABC)

                this._admissionNum.prop('disabled', false)
                this._passportNum.prop('disabled', false)
                this._countryOfIssuance.prop('disabled', false)

                this.filterCombolist(
                    this._countryOfIssuance,
                    JSON.parse(this._('countries')),
                    null,
                    this,
                    this.processListABC)

                this.fillListABC('4')
            }
        })

        this._alienuscisNum.change(() => {
            if (!this.EmptyOrNA(this._alienuscisNum)) {
                if (this.EmptyOrNA(this._alienuscisNumType)) {
                    this.filterCombolist(
                        this._alienuscisNumType,
                        { A: this._('aliennumber'), U: this._('uscisnumber') },
                        null,
                        this,
                        this.processListABC)
                }

                this._admissionNum.val(this.na)
                this._passportNum.val(this.na)
                this.filterCombolist(this._countryOfIssuance, { 0: this.na }, '0', this, this.processListABC)
            } else {
                this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC)
                this._admissionNum.val('')
                this._passportNum.val('')
                this.filterCombolist(this._countryOfIssuance, {}, null, this, this.processListABC)
            }
        })

        this._admissionNum.change(() => {
            if (!this.EmptyOrNA(this._admissionNum)) {
                this._alienuscisNum.val(this.na)
                this._alienuscisNumPrefix.val('')
                this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC)

                this._passportNum.val(this.na)
                this.filterCombolist(this._countryOfIssuance, { 0: this.na }, '0', this, this.processListABC)
            } else {
                this._alienuscisNum.val('')
                this._alienuscisNumPrefix.val('')
                this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC)
                this._passportNum.val('')
                this.filterCombolist(this._countryOfIssuance, {}, null, this, this.processListABC)
            }
        })

        this._passportNum.change(() => {
            if (!this.EmptyOrNA(this._passportNum)) {
                this._alienuscisNum.val(this.na)
                this._alienuscisNumPrefix.val('')
                this.filterCombolist(this._alienuscisNumType, { 0: this.na }, this.na, this, this.processListABC)

                this._admissionNum.val(this.na)

                if (this.EmptyOrNA(this._countryOfIssuance)) {
                    this.filterCombolist(
                        this._countryOfIssuance,
                        JSON.parse(this._('countries')),
                        null,
                        this,
                        this.processListABC)
                }
            } else {
                this._alienuscisNum.val('')
                this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC)
                this._admissionNum.val('')
            }
        })

        this.processLPR(false)
        this.processAlien(false)

        this._newlastName = this.renderControl(lastName, this._('newlastname.tooltip'))
            .keypress(e => this.nameFormat.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode)
            .attr('tabindex', tabIndex++)

        this._newlastNameHelp = this.renderHelpIcon(
            lastNameHelp,
            this._('newlastnamehelp.caption'),
            this._('newlastnamehelp.text')
        )

        this._newfirstName = this.renderControl(firstName, this._('newfirstname.tooltip'))
            .keypress(e => this.nameFormat.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode)
            .attr('tabindex', tabIndex++)

        this._newfirstNameHelp = this.renderHelpIcon(
            firstNameHelp,
            this._('newfirstnamehelp.caption'),
            this._('newfirstnamehelp.text')
        )

        this._newmiddleInitial = this.renderControl(middleInitial, this._('newmiddleinitial.tooltip'))
            .keypress(e => this.nameFormat.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode)
            .attr('tabindex', tabIndex++)

        this._newmiddleInitialHelp = this.renderHelpIcon(
            middleInitialHelp,
            this._('newmiddleinitialhelp.caption'),
            this._('newmiddleinitialhelp.text')
        )

        this._rehireDate = this.renderControl(rehireDate, this._('rehiredate.tooltip'), true, 'left')
            .datepicker().attr('autocomplete', 'disabled').unbind('keypress')
            .keypress(e => /[\d/]/g.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode)
            .attr('tabindex', tabIndex++)

        this._rehireDateHelp = this.renderHelpIcon(
            rehireDateHelp,
            this._('rehiredatehelp.caption'),
            this._('rehiredatehelp.text')
        )

        this._docTitleSec3 = this.renderControl(docTitleSec3, this._('doctitlesec3.tooltip'), true, 'right')
            .attr('tabindex', tabIndex++)

        this.filterCombolist(this._docTitleSec3, {
            spaceSymbol: this.blankItem,
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
            12: this._('I94refugeestampreceipt') + spaceSymbol + this._('reclassofadmission'),
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
        }, null, this, this.processListABC)

        this._docTitleSec3Help = this.renderHelpIcon(
            docTitleSec3Help,
            this._('doctitlesec3help.caption'),
            this._('doctitlesec3help.text')
        )

        this._docNumberSec3 = this.renderControl(docNumberSec3, this._('docnumbersec3.tooltip'))
            .attr('tabindex', tabIndex++)

        this._docNumberSec3Help = this.renderHelpIcon(
            docNumberSec3Help,
            this._('docnumbersec3help.caption'),
            this._('docnumbersec3help.text')
        )

        this._expDateSec3 = this.renderControl(expDateSec3, this._('expdatesec3.tooltip'), true, 'left')
            .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled').unbind('keypress')
            .keypress(e => /[\d/]/g.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode)
            .attr('tabindex', tabIndex++)

        this._expDateSec3Help = this.renderHelpIcon(
            expDateSec3Help,
            this._('expdatesec3help.caption'),
            this._('expdatesec3help.text')
        )

        this._sgnEmployerSec3 = this.renderControl(sgnEmployerSec3, this._('sgnemployersec3.tooltip'))
            .attr('tabindex', tabIndex++)

        this._sgnEmployerSec3Help = this.renderHelpIcon(
            sgnEmployerSec3Help,
            this._('sgnemployersec3help.caption'),
            this._('sgnemployersec3help.text')
        )

        this._signDateSec3 = this.renderControl(signDateSec3, this._('employersigndatesec3.tooltip'), true, 'left')
            .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled')
            .attr(this.annotationRequired, 'true')
        // work around for the Chrome auto-fill bug
            .attr('readonly', 'true')
            .focus(() => this._signDateSec3.removeAttr('readonly'))
            .blur(() => this._signDateSec3.attr('readonly', 'true'))
            .attr('tabindex', tabIndex++)

        this._signDateSec3Help = this.renderHelpIcon(
            signDateSec3Help,
            this._('employersigndatesec3help.caption'),
            this._('employersigndatesec3help.text')
        )

        this._employerNameSec3 = this.renderControl(employerNameSec3, this._('employernamesec3.tooltip'))
            .attr(this.annotationRequired, 'true')
            .attr('tabindex', tabIndex++)

        this._employerNameSec3Help = this.renderHelpIcon(
            employerNameSec3Help,
            this._('employernamesec3help.caption'),
            this._('employernamesec3help.text')
        )

        return tabIndex
    }

    protected validateFields (confirmFlag: boolean): string[] {
        const errorMessages = super.validateFields(confirmFlag)

        const section3Fields = [this._newlastName, this._newfirstName, this._newmiddleInitial, this._rehireDate,
            this._docTitleSec3, this._docNumberSec3, this._expDateSec3, this._sgnEmployerSec3,
            this._signDateSec3, this._employerNameSec3]

        section3Fields.forEach(f => f && f.toggleClass(this.invalidFieldClass, false))

        if (section3Fields.filter(e => e && e.val() && e.val() !== '').length > 0) {
            [this._newlastName, this._newfirstName, this._newmiddleInitial, this._rehireDate,
                this._docTitleSec3, this._docNumberSec3, this._expDateSec3].filter(f => f.val() === '' || (f.val() as string).toUpperCase() === this.na)
                .forEach(f => f && f.val(this.na))

            this.validateTextField(this._newlastName, this._('name.last') + this.space + this._('section3.suffix'), [this.nameFormat, this.NAString], false, errorMessages)
            this.validateTextField(this._newfirstName, this._('name.first') + this.space + this._('section3.suffix'), [this.nameFormat, this.NAString], false, errorMessages)
            this.validateTextField(this._newmiddleInitial, this._('name.middleinitial') + this.space + this._('section3.suffix'), [this.nameInitialFormat, this.NAString], false, errorMessages)
            this.validateTextField(this._rehireDate, this._('section3.rehire'), [this.dateFormat, this.NAString], true, errorMessages)

            let fieldValidationExpression = /^[a-zA-Z0-9]+$/
            switch (this._docTitleSec3.val()) {
            // 1 - U.S. Passport
            // 2 - U.S. Passport Card
            case '1': case '2':
                fieldValidationExpression = this.usPassportNumberFormat
                break
            // 3 - Perm. Resident Card (Form I-551)
            // 4 - Alien Reg. Receipt Card (Form I-551)
            case '3': case '4':
                fieldValidationExpression = this.greenCardNumberFormat
                break
                // 5 - Foreign Passport with Temp. I-551 Stamp
                // 6 - Foreign Passport with Temp. I-551 MRIV
                // 8 - Foreign Passport with Form I-94, endorsement
                // 9 - FSM Passport with Form I-94
                // 10 - RMI Passport with Form I-94
            case '5': case '6': case '8': case '9': case '10':
                fieldValidationExpression = this.passportNumberFormat
                break
            // 7 - Receipt replacement EAD (Form I-766)
            case '7':
                fieldValidationExpression = this.cardNumberFormat
                break
                // 11 - Receipt Form I-94/I-94A w/I-551 stamp, photo
                // 12 - Receipt Form I-94/I-94A w/refugee stamp (or RE class of admission)
            case '11': case '12':
                fieldValidationExpression = this.admissionNumberFormat
                break
                // 13 - (Unrestricted) Social Security Card
            case '13':
                fieldValidationExpression = this.ssnFormat
                break
                // 14 - Form FS-545
                // 15 - Form DS-1350
                // 16 - Form FS-240
                // 17 - U.S. Birth Certificate
                // 18 - Native American tribal document
                // 19 - Form I-197
                // 20 - Form I-179
                // 21 - Employment Auth. document (DHS)
                // 22 - Receipt replacement Perm. Res. Card (Form I-551)
                // 23 - Receipt replacement EAD (Form I-766)
                // 24 - Receipt Replacement Foreign Passport with Form I-94, endorsement
                // 25 - Receipt Replacement FSM Passport with Form I-94
                // 26 - Receipt Replacement RMI Passport with Form I-94
                // 27 - Receipt Replacement Unrestricted SS Card
                // 28 - Receipt Replacement Birth Certificate
                // 29 - Receipt Replacement Native American Tribal Doc.
                // 30 - Receipt Replacement Employment Auth. Doc. (DHS)
            case '14': case '15': case '16': case '17': case '18': case '19': case '20': case '21': case '22':
            case '23': case '24': case '25': case '26': case '27': case '28': case '29': case '30':
                break
            }

            this.validateTextField(this._docNumberSec3, this._('section3.docnumber') + this.space + this._('section3.suffix'), [fieldValidationExpression, this.NAString], false, errorMessages)

            this.validateTextField(this._expDateSec3, this._('section3.expdate') + this.space + this._('section3.suffix'), [this.dateFormat, this.NAString], false, errorMessages)
            this.validateTextField(this._signDateSec3, this._('section3.today') + this.space + this._('section3.suffix'), [this.dateFormat], true, errorMessages)
            this.validateTextField(this._employerNameSec3, this._('section3.employer') + this.space + this._('section3.suffix'), [this.nameFormat], true, errorMessages)
        }

        return errorMessages
    }

    private processLPR (flag: boolean) {
        var na = flag ? this.na : ''
        this._lpruscisNumPrefix.val('')
        this._lpruscisNum.prop('disabled', true).val(na)
        this._lpruscisNumType.prop('disabled', true)

        this.filterCombolist(this._lpruscisNumType, {}, null, this, this.processListABC)
    }

    private processAlien (flag: boolean) {
        var na = flag ? this.na : ''
        this._alienWorkAuthDate.prop('disabled', true).val(na)
        this._alienuscisNumPrefix.val('')
        this._alienuscisNum.prop('disabled', true).val(na)
        this._alienuscisNumType.prop('disabled', true)
        this._admissionNum.prop('disabled', true).val(na)
        this._passportNum.prop('disabled', true).val(na)
        this._countryOfIssuance.prop('disabled', true)

        this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC)
        this.filterCombolist(this._countryOfIssuance, flag ? { 0: na } : {}, flag ? '0' : null, this, this.processListABC)
    }
}
