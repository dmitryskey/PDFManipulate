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
        employerSignDateSec3: JQuery<HTMLElement>,
        employerSignDateSec3Help: JQuery<HTMLElement>,
        employerNameSec3: JQuery<HTMLElement>,
        employerNameSec3Help: JQuery<HTMLElement>)
    {
        this._newlastName = lastName
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('newlastname.tooltip')})
        .keypress(e => this.nameFormat.test(String.fromCharCode(e.which)));

        this._newlastNameHelp = this.renderHelpIcon(
            lastNameHelp,
            this._('newlastnamehelp.caption'),
            dialog,
            this._('newlastnamehelp.text')
        );

        this._newfirstName = firstName
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('newfirstname.tooltip')})
        .keypress(e => this.nameFormat.test(String.fromCharCode(e.which)));

        this._newfirstNameHelp = this.renderHelpIcon(
            firstNameHelp,
            this._('newfirstnamehelp.caption'),
            dialog,
            this._('newfirstnamehelp.text')
        );

        this._newmiddleInitial = middleInitial
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('newmiddleinitial.tooltip')})
        .keypress(e =>
            this.nameFormat.test(String.fromCharCode(e.which)) ||
            this.NAFormat.test(String.fromCharCode(e.which)));

        this._newmiddleInitialHelp = this.renderHelpIcon(
            middleInitialHelp,
            this._('newmiddleinitialhelp.caption'),
            dialog,
            this._('newmiddleinitialhelp.text')
        );

        this._rehireDate = rehireDate
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('rehiredate.tooltip')})
        .datepicker();

        this._rehireDateHelp = this.renderHelpIcon(
            rehireDateHelp,
            this._('rehiredatehelp.caption'),
            dialog,
            this._('rehiredatehelp.text'),
            500
        );

        this._docTitleSec3 = docTitleSec3
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('doctitlesec3.tooltip')});

        this._docTitleSec3Help = this.renderHelpIcon(
            docTitleSec3Help,
            this._('doctitlesec3help.caption'),
            dialog,
            this._('doctitlesec3help.text'),
            500
        );

        this._docNumberSec3 = docNumberSec3
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('docnumbersec3.tooltip')});

        this._docNumberSec3Help = this.renderHelpIcon(
            docNumberSec3Help,
            this._('docnumbersec3help.caption'),
            dialog,
            this._('docnumbersec3help.text'),
            500
        );

        this._expDateSec3 = expDateSec3
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('expdatesec3.tooltip')})
        .datepicker({minDate:new Date()});

        this._expDateSec3Help = this.renderHelpIcon(
            expDateSec3Help,
            this._('expdatesec3help.caption'),
            dialog,
            this._('expdatesec3help.text'),
            500
        );

        this._sgnEmployerSec3 = sgnEmployerSec3
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('sgnemployersec3.tooltip')});

        this._sgnEmployerSec3Help = this.renderHelpIcon(
            sgnEmployerSec3Help,
            this._('sgnemployersec3help.caption'),
            dialog,
            this._('sgnemployersec3help.text'),
            500
        );

        this._employerSignDateSec3 = employerSignDateSec3
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employersigndatesec3.tooltip')})
        .datepicker({minDate: new Date()});

        this._employerSignDateSec3Help = this.renderHelpIcon(
            employerSignDateSec3Help,
            this._('employersigndatesec3help.caption'),
            dialog,
            this._('employersigndatesec3help.text'),
            500
        );

        this._employerNameSec3 = employerNameSec3
        .focus(e => this.hideTooltip()).prop('title', '')
        .tooltip({content: this._('employernamesec3.tooltip')})
        .datepicker({minDate: new Date()});

        this._employerNameSec3Help = this.renderHelpIcon(
            employerNameSec3Help,
            this._('employernamesec3help.caption'),
            dialog,
            this._('employernamesec3help.text'),
            500
        );
    }
}