define("USI9/PDFForm", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PDFForm = void 0;
    class PDFForm {
        constructor(webL10n) {
            this.nameFormat = /^[A-Za-z ']+$/;
            this.nameInitialFormat = /^[A-Za-z]{1}$/;
            this.stateFormat = /^[A-Z]{2,3}$/;
            this.NAFormat = /^[NnAa/]+$/;
            this.NAString = /^N\/A$/;
            this.zipFormat = /^[0-9]+$/;
            this.postalFormat = /^[A-Za-z0-9]+$/;
            this.zipNumberFormat = /^[0-9]{5}$/;
            this.postalCodeFormat = /^[A-Za-z0-9]{6}$/;
            this.dateFormat = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/;
            this.numberFormat = /^[0-9]{1}$/;
            this.alphaNumericFormat = /^[0-9a-zA-Z]{1}$/;
            this.alphaNumericWithDashesFormat = /^[a-zA-Z0-9]{1}|-{1}$/;
            this.emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.phoneFormat = /^[0-9/NA-]+$/;
            this.phoneNumber = /^[0-9]{3}-{1}[0-9]{3}-{1}[0-9]{4}$/;
            this.uscisNumberFormat = /^[0-9]{7,9}$/;
            this.admissionNumberFormat = /^[0-9]{9}[a-zA-Z]{1}[0-9]{1}$|^[0-9]{11}$/;
            this.usPassportNumberFormat = /^[a-zA-Z0-9]{6,9}$/;
            this.greenCardNumberFormat = /^[A-Za-z]{3}[0-9]{10}$|^[0-9]{7,9}$|^[0-9]{3}-{0,1}[0-9]{3}-{0,1}[0-9]{3}$/;
            this.cardNumberFormat = /^[A-Za-z]{3}[0-9]{10}$/;
            this.passportNumberFormat = /^[a-zA-Z0-9]{6,12}$/;
            this.driverLicenseNumberFormat = /^[a-zA-Z0-9]{8,14}$/;
            this.ssnFormat = /^[0-9]{3}[-]*[0-9]{2}[-]*[0-9]{4}$/;
            this.annotationName = 'annotation-name';
            this.annotationRequired = 'annotation-required';
            this.annotationNext = 'annotation-next';
            this.space = ' ';
            this.blankItem = '&nbsp;';
            this.backSpaceCode = 'Backspace';
            this.parentProp = 'parent';
            this.toolbarButtons = ['print', 'download'];
            this.setCombolistValue = (ctrl, val) => ctrl.parent().children().filter('.combo-content').children()
                .filter(`[value='${val}']`).each((index, value) => value.onclick(null));
            this.setCombolistText = (ctrl, val, txt) => ctrl.parent().children().filter('.combo-content').children()
                .filter(`[value='${val}']`).html(txt);
            this.assignCombolistEventHandler = (ctrl, f) => ctrl.parent().children().filter('.combo-content').click(f);
            this.validateForm = (ctrl, errorMessages) => new Promise((resolve, reject) => {
                ctrl.popover('dispose');
                if (errorMessages.length > 0) {
                    let errorMessage = `${this._('error.header')}<br />`;
                    errorMessages.forEach(e => { errorMessage += ` - ${e}<br />`; });
                    ctrl.popover({
                        html: true,
                        title: this._('validation'),
                        content: errorMessage,
                        trigger: 'click',
                        placement: 'bottom'
                    });
                    $('body').off('mouseup').on('mouseup', e => {
                        if (!ctrl.popover().is(e.target) && ctrl.popover().has(e.target).length === 0 &&
                            ctrl !== $(e.target)) {
                            ctrl.popover('hide');
                        }
                    });
                    reject(ctrl);
                }
                else {
                    resolve(ctrl);
                }
            });
            this.webL10n = webL10n;
            this.na = this._('NA');
            const monthNames = [];
            const monthNamesShort = [];
            const dayNames = [];
            const dayNamesShort = [];
            const dayNamesMin = [];
            $.each(JSON.parse(this._('monthNames', '{}')), (index, value) => {
                monthNamesShort.push(index);
                monthNames.push(value);
            });
            $.each(JSON.parse(this._('dayNames', '{}')), (index, value) => {
                dayNamesMin.push(index);
                $.each(value, (i, v) => {
                    dayNamesShort.push(i);
                    dayNames.push(v);
                });
            });
            $.datepicker.setDefaults({
                closeText: this._('closeText'),
                prevText: this._('prevText'),
                nextText: this._('nextText'),
                currentText: this._('currentText'),
                monthNames: monthNames,
                monthNamesShort: monthNamesShort,
                dayNames: dayNames,
                dayNamesShort: dayNamesShort,
                dayNamesMin: dayNamesMin,
                weekHeader: this._('weekHeader'),
                dateFormat: 'mm/dd/yy',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''
            });
            $('body').append(`
        <div class="modal fade">
          <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">         
              <div class="modal-body" />
              <div class="modal-footer">
                <button id="btnConfirm" type="button" class="btn btn-secondary" data-dismiss="modal">${this._('confirm')}</button>
                <button id="btnCancel" type="button" class="btn btn-secondary" data-dismiss="modal">${this._('cancel')}</button>
              </div>       
            </div>
          </div>
        </div>`);
        }
        _(t, defaultValue = null) {
            return this.webL10n ? this.webL10n.get(t).replace('#', '&#35;') : (defaultValue !== null && defaultValue !== void 0 ? defaultValue : t);
        }
        selectCheckmark(ctrl, arr) {
            for (var a of arr) {
                if (a.attr(this.annotationName) !== ctrl.attr(this.annotationName)) {
                    a.prop('checked', false).parent().children('span').text('');
                }
            }
        }
        renderControl(ctrl, text, onFocus = true, placement = 'bottom') {
            ctrl.parent().children().filter('span').click(() => ctrl.popover('hide'));
            return ctrl.popover({ html: true, content: text, trigger: onFocus ? 'focus' : 'hover', placement: placement });
        }
        renderHelpIcon(ctrl, title, text, maxWidth = '30') {
            const tag = 'i';
            return ctrl.parent().find(tag).length > 0 ? ctrl : ctrl.hide().parent()
                .hover(e => $(e.target).css('cursor', 'pointer'))
                .append(`<${tag} class='fa fa-question-circle helpIcon'
                style='font-size:${Math.ceil(ctrl.parent().height())}px' />`)
                .children(tag).tooltip({ title: title, placement: 'left' })
                .popover({
                html: true,
                title: decodeURIComponent(this._('help')),
                content: decodeURIComponent(text),
                trigger: 'click'
            })
                .on('show.bs.popover', () => $('.popover').css('max-width', `${maxWidth}%`))
                .on('click', e => {
                const ctrl = $(e.target);
                ctrl.tooltip('hide').popover('show');
                $('body').off('mouseup').on('mouseup', ev => {
                    if (!ctrl.popover().is(ev.target) && ctrl.popover().has(ev.target).length === 0 &&
                        ctrl !== $(ev.target)) {
                        ctrl.popover('hide');
                    }
                });
            });
        }
        urlParameter(name) {
            var results = new RegExp(`[?&]${name}=([^&#]*)`).exec(window.location.href);
            return results === null ? null : decodeURI(results[1]) || '';
        }
    }
    exports.PDFForm = PDFForm;
});
define("USI9Supplement/Fields", ["require", "exports", "USI9/PDFForm"], function (require, exports, PDFForm_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.USI9SupplementFields = void 0;
    class USI9SupplementFields extends PDFForm_1.PDFForm {
        constructor() {
            super(...arguments);
            this.paramExistsMsg = this._('parameter.exists');
            this.paramLengthMsg = this._('parameter.length');
            this.paramFormatMsg = this._('parameter.format');
            this.paramMaxValueMsg = this._('parameter.max');
            this.paramMinValueMsg = this._('parameter.min');
            this.dateFormatMsg = this._('date.format');
            this.invalidFieldClass = 'invalid';
        }
        validateDateRange(f, parameter, errorMessages, prefix = '') {
            if (!f) {
                return true;
            }
            const maxDate = f.datepicker('option', 'maxDate');
            const minDate = f.datepicker('option', 'minDate');
            if (maxDate) {
                maxDate.setHours(0, 0, 0, 0);
            }
            if (minDate) {
                minDate.setHours(0, 0, 0, 0);
            }
            if (maxDate && f && f.val() && (new Date(f.val()) > maxDate)) {
                errorMessages.push(this.paramMaxValueMsg
                    .replace('$[prefix]', prefix)
                    .replace('$[parameter]', parameter)
                    .replace('$[value]', maxDate.toDateString()));
            }
            else if (minDate && f && f.val() && (new Date(f.val()) < minDate)) {
                errorMessages.push(this.paramMinValueMsg
                    .replace('$[prefix]', prefix)
                    .replace('$[parameter]', parameter)
                    .replace('$[value]', minDate.toDateString()));
            }
            else {
                return true;
            }
            return false;
        }
        validateTextField(f, parameter, regExs, validateIfEmpty, errorMessages, prefix = '') {
            let errorFlag = true;
            const length = f.prop('maxLength') ? f.prop('maxLength') : 0;
            if (!f || !f.val() || (f.attr(this.annotationRequired) && f.val().trim() === '')) {
                errorMessages.push(this.paramExistsMsg
                    .replace('$[prefix]', prefix)
                    .replace('$[parameter]', parameter));
            }
            else if (f && f.val() && f.val().length > length && length > 0) {
                errorMessages.push(this.paramLengthMsg
                    .replace('$[prefix]', prefix)
                    .replace('$[parameter]', parameter)
                    .replace('$[length]', length.toString()));
            }
            else if (((f && f.val() !== '') || validateIfEmpty) && regExs.length > 0) {
                let validFlag = false;
                for (const i in regExs) {
                    if (f && regExs[i].test(f.val())) {
                        validFlag = true;
                        break;
                    }
                }
                if (!validFlag) {
                    errorMessages.push(this.paramFormatMsg
                        .replace('$[prefix]', prefix)
                        .replace('$[parameter]', parameter));
                }
                errorFlag = !validFlag;
                if (!errorFlag) {
                    errorFlag = !this.validateDateRange(f, parameter, errorMessages, prefix);
                }
            }
            else {
                errorFlag = false;
            }
            if (f) {
                f.toggleClass(this.invalidFieldClass, errorFlag);
            }
            return !errorFlag;
        }
    }
    exports.USI9SupplementFields = USI9SupplementFields;
});
define("USI9Supplement/TranslatorSection", ["require", "exports", "USI9Supplement/Fields"], function (require, exports, Fields_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.USI9SupplementTranslator = void 0;
    class USI9SupplementTranslator extends Fields_1.USI9SupplementFields {
        renderTranslatorSection(lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, sgnTranslator, sgnTranslatorHelp, translatorDate, translatorDateHelp, translatorLastName, translatorLastNameHelp, translatorFirstName, translatorFirstNameHelp, translatorAddress, translatorAddressHelp, translatorCity, translatorCityHelp, translatorState, translatorStateHelp, translatorZip, translatorZipHelp, sgnTranslator2, translatorDate2, translatorLastName2, translatorFirstName2, translatorAddress2, translatorCity2, translatorState2, translatorZip2, sgnTranslator3, translatorDate3, translatorLastName3, translatorFirstName3, translatorAddress3, translatorCity3, translatorState3, translatorZip3, sgnTranslator4, translatorDate4, translatorLastName4, translatorFirstName4, translatorAddress4, translatorCity4, translatorState4, translatorZip4) {
            $('a').prop('target', '_blank');
            this._lastName = this.renderControl(lastName, this._('lastnamehelp.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode);
            this._lastNameHelp = this.renderHelpIcon(lastNameHelp, this._('lastnamehelp.caption'), this._('lastnamehelp.text'));
            this._firstName = this.renderControl(firstName, this._('firstnamehelp.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode);
            this._firstNameHelp = this.renderHelpIcon(firstNameHelp, this._('firstnamehelp.caption'), this._('firstnamehelp.text'));
            this._middleInitial = this.renderControl(middleInitial, this._('middleinitialhelp.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode);
            this._middleInitialHelp = this.renderHelpIcon(middleInitialHelp, this._('middleinitialhelp.caption'), this._('middleinitialhelp.text'));
            this._sgnTranslator = this.renderControl(sgnTranslator, this._('sgntranslator.tooltip'));
            this._sgnTranslatorHelp = this.renderHelpIcon(sgnTranslatorHelp, this._('sgntranslatorhelp.caption'), this._('sgntranslatorhelp.text'));
            this._translatorDate = this.renderControl(translatorDate, this._('translatordate.tooltip'), true, 'left')
                .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled');
            this._translatorDateHelp = this.renderHelpIcon(translatorDateHelp, this._('translatordatehelp.caption'), this._('translatordatehelp.text'));
            this._translatorLastName = this.renderControl(translatorLastName, this._('translatorlastname.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode);
            this._translatorLastNameHelp = this.renderHelpIcon(translatorLastNameHelp, this._('translatorlastnamehelp.caption'), this._('translatorlastnamehelp.text'));
            this._translatorFirstName = this.renderControl(translatorFirstName, this._('translatorfirstname.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode);
            this._translatorFirstNameHelp = this.renderHelpIcon(translatorFirstNameHelp, this._('translatorfirstnamehelp.caption'), this._('translatorfirstnamehelp.text'));
            this._translatorAddress = this.renderControl(translatorAddress, this._('translatoraddress.tooltip'));
            this._translatorAddressHelp = this.renderHelpIcon(translatorAddressHelp, this._('translatoraddresshelp.caption'), this._('translatoraddresshelp.text'));
            this._translatorCity = this.renderControl(translatorCity, this._('translatorcity.tooltip'));
            this._translatorCityHelp = this.renderHelpIcon(translatorCityHelp, this._('translatorcityhelp.caption'), this._('translatorcityhelp.text'));
            this._translatorState = this.renderControl(translatorState, this._('translatorstate.tooltip'), true, 'left');
            this.setCombolistText(this._translatorState, ' ', this.blankItem);
            this._translatorStateHelp = this.renderHelpIcon(translatorStateHelp, this._('translatorstatehelp.caption'), this._('translatorstatehelp.text'));
            this._translatorZip = this.renderControl(translatorZip, this._('translatorzip.tooltip'))
                .on('keypress', e => this.zipFormat.test(e.key) || e.key === this.backSpaceCode);
            this._translatorZipHelp = this.renderHelpIcon(translatorZipHelp, this._('translatorziphelp.caption'), this._('translatorziphelp.text'));
            this._sgnTranslator2 = this.renderControl(sgnTranslator2, this._('sgntranslator.tooltip'));
            this._translatorDate2 = this.renderControl(translatorDate2, this._('translatordate.tooltip'), true, 'left')
                .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled');
            this._translatorLastName2 = this.renderControl(translatorLastName2, this._('translatorlastname.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode);
            this._translatorFirstName2 = this.renderControl(translatorFirstName2, this._('translatorfirstname.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode);
            this._translatorAddress2 = this.renderControl(translatorAddress2, this._('translatoraddress.tooltip'));
            this._translatorCity2 = this.renderControl(translatorCity2, this._('translatorcity.tooltip'));
            this._translatorState2 = this.renderControl(translatorState2, this._('translatorstate.tooltip'), true, 'left');
            this.setCombolistText(this._translatorState2, ' ', this.blankItem);
            this._translatorZip2 = this.renderControl(translatorZip2, this._('translatorzip.tooltip'))
                .on('keypress', e => this.zipFormat.test(e.key) || e.key === this.backSpaceCode);
            this._sgnTranslator3 = this.renderControl(sgnTranslator3, this._('sgntranslator.tooltip'));
            this._translatorDate3 = this.renderControl(translatorDate3, this._('translatordate.tooltip'), true, 'left')
                .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled');
            this._translatorLastName3 = this.renderControl(translatorLastName3, this._('translatorlastname.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode);
            this._translatorFirstName3 = this.renderControl(translatorFirstName3, this._('translatorfirstname.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode);
            this._translatorAddress3 = this.renderControl(translatorAddress3, this._('translatoraddress.tooltip'));
            this._translatorCity3 = this.renderControl(translatorCity3, this._('translatorcity.tooltip'));
            this._translatorState3 = this.renderControl(translatorState3, this._('translatorstate.tooltip'), true, 'left');
            this.setCombolistText(this._translatorState3, ' ', this.blankItem);
            this._translatorZip3 = this.renderControl(translatorZip3, this._('translatorzip.tooltip'))
                .on('keypress', e => this.zipFormat.test(e.key) || e.key === this.backSpaceCode);
            this._sgnTranslator4 = this.renderControl(sgnTranslator4, this._('sgntranslator.tooltip'));
            this._translatorDate4 = this.renderControl(translatorDate4, this._('translatordate.tooltip'), true, 'left')
                .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled');
            this._translatorLastName4 = this.renderControl(translatorLastName4, this._('translatorlastname.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode);
            this._translatorFirstName4 = this.renderControl(translatorFirstName4, this._('translatorfirstname.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode);
            this._translatorAddress4 = this.renderControl(translatorAddress4, this._('translatoraddress.tooltip'));
            this._translatorCity4 = this.renderControl(translatorCity4, this._('translatorcity.tooltip'));
            this._translatorState4 = this.renderControl(translatorState4, this._('translatorstate.tooltip'), true, 'left');
            this.setCombolistText(this._translatorState4, ' ', this.blankItem);
            this._translatorZip4 = this.renderControl(translatorZip4, this._('translatorzip.tooltip'))
                .on('keypress', e => this.zipFormat.test(e.key) || e.key === this.backSpaceCode);
        }
        validateFields() {
            const errorMessages = [];
            if (this._middleInitial.val().trim() === '') {
                this._middleInitial.val(this.na);
            }
            this.validateTextField(this._lastName, this._('name.last'), [this.nameFormat], false, errorMessages);
            this.validateTextField(this._firstName, this._('name.first'), [this.nameFormat], false, errorMessages);
            this.validateTextField(this._middleInitial, this._('name.middleinitial'), [this.nameInitialFormat, this.NAString], false, errorMessages);
            let prefix = this._('translator.prefix') + ' 1: ';
            this.validateTextField(this._translatorDate, this._('date.sgntranslator'), [this.dateFormat], true, errorMessages, prefix);
            this.validateTextField(this._translatorLastName, this._('translator.lastname'), [this.nameFormat], true, errorMessages, prefix);
            this.validateTextField(this._translatorFirstName, this._('translator.firstname'), [this.nameFormat], true, errorMessages, prefix);
            this.validateTextField(this._translatorAddress, this._('translator.address'), [], true, errorMessages, prefix);
            this.validateTextField(this._translatorCity, this._('translator.city'), [], true, errorMessages, prefix);
            this.validateTextField(this._translatorState, this._('translator.state'), [], true, errorMessages, prefix);
            this.validateTextField(this._translatorZip, this._('translator.zip'), [this.zipNumberFormat], true, errorMessages, prefix);
            if (this._translatorDate2.val().trim() !== '' ||
                this._translatorLastName2.val().trim() !== '' ||
                this._translatorFirstName2.val().trim() !== '' ||
                this._translatorAddress2.val().trim() !== '' ||
                this._translatorCity2.val().trim() !== '' ||
                this._translatorState2.val().trim() !== '' ||
                this._translatorZip2.val().trim() !== '') {
                prefix = this._('translator.prefix') + ' 2: ';
                this.validateTextField(this._translatorDate2, this._('date.sgntranslator'), [this.dateFormat], true, errorMessages, prefix);
                this.validateTextField(this._translatorLastName2, this._('translator.lastname'), [this.nameFormat], true, errorMessages, prefix);
                this.validateTextField(this._translatorFirstName2, this._('translator.firstname'), [this.nameFormat], true, errorMessages, prefix);
                this.validateTextField(this._translatorAddress2, this._('translator.address'), [], true, errorMessages, prefix);
                this.validateTextField(this._translatorCity2, this._('translator.city'), [], true, errorMessages, prefix);
                this.validateTextField(this._translatorState2, this._('translator.state'), [], true, errorMessages, prefix);
                this.validateTextField(this._translatorZip2, this._('translator.zip'), [this.zipNumberFormat], true, errorMessages, prefix);
            }
            if (this._translatorDate3.val().trim() !== '' ||
                this._translatorLastName3.val().trim() !== '' ||
                this._translatorFirstName3.val().trim() !== '' ||
                this._translatorAddress3.val().trim() !== '' ||
                this._translatorCity3.val().trim() !== '' ||
                this._translatorState3.val().trim() !== '' ||
                this._translatorZip3.val().trim() !== '') {
                prefix = this._('translator.prefix') + ' 3: ';
                this.validateTextField(this._translatorDate3, this._('date.sgntranslator'), [this.dateFormat], true, errorMessages, prefix);
                this.validateTextField(this._translatorLastName3, this._('translator.lastname'), [this.nameFormat], true, errorMessages, prefix);
                this.validateTextField(this._translatorFirstName3, this._('translator.firstname'), [this.nameFormat], true, errorMessages, prefix);
                this.validateTextField(this._translatorAddress3, this._('translator.address'), [], true, errorMessages, prefix);
                this.validateTextField(this._translatorCity3, this._('translator.city'), [], true, errorMessages, prefix);
                this.validateTextField(this._translatorState3, this._('translator.state'), [], true, errorMessages, prefix);
                this.validateTextField(this._translatorZip3, this._('translator.zip'), [this.zipNumberFormat], true, errorMessages, prefix);
            }
            if (this._translatorDate4.val().trim() !== '' ||
                this._translatorLastName4.val().trim() !== '' ||
                this._translatorFirstName4.val().trim() !== '' ||
                this._translatorAddress4.val().trim() !== '' ||
                this._translatorCity4.val().trim() !== '' ||
                this._translatorState4.val().trim() !== '' ||
                this._translatorZip4.val().trim() !== '') {
                prefix = this._('translator.prefix') + ' 4: ';
                this.validateTextField(this._translatorDate4, this._('date.sgntranslator'), [this.dateFormat], true, errorMessages, prefix);
                this.validateTextField(this._translatorLastName4, this._('translator.lastname'), [this.nameFormat], true, errorMessages, prefix);
                this.validateTextField(this._translatorFirstName4, this._('translator.firstname'), [this.nameFormat], true, errorMessages, prefix);
                this.validateTextField(this._translatorAddress4, this._('translator.address'), [], true, errorMessages, prefix);
                this.validateTextField(this._translatorCity4, this._('translator.city'), [], true, errorMessages, prefix);
                this.validateTextField(this._translatorState4, this._('translator.state'), [], true, errorMessages, prefix);
                this.validateTextField(this._translatorZip4, this._('translator.zip'), [this.zipNumberFormat], true, errorMessages, prefix);
            }
            return errorMessages;
        }
    }
    exports.USI9SupplementTranslator = USI9SupplementTranslator;
});
define("USI9Supplement/USI9Supplement", ["require", "exports", "USI9Supplement/TranslatorSection"], function (require, exports, TranslatorSection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.USI9Supplement = void 0;
    class USI9Supplement extends TranslatorSection_1.USI9SupplementTranslator {
        prepareData() {
            const service = PDFViewerApplication.transformationService;
            service.url = '/?rest_route=/UpdateForm';
            service.session_id = this.urlParameter('session_id');
            service.fields_data.file = PDFViewerApplication.url;
            service.fields_data.operation = 'f';
            $(`[${this.annotationName}]`).each((i, ctrl) => {
                if (!ctrl.disabled && ctrl.value && ctrl.value !== '') {
                    service.fields_data.entries.push({
                        name: ctrl.getAttribute(this.annotationName),
                        value: ctrl.type === 'checkbox' ? (ctrl.checked ? 'On' : 'Off') : ctrl.value,
                        operation: 's'
                    });
                }
            });
        }
        prepareFirstPage() {
            this.renderTranslatorSection($(`[${this.annotationName}=LastName]`), $(`[${this.annotationName}=LastNameHelp]`), $(`[${this.annotationName}=FirstName]`), $(`[${this.annotationName}=FirstNameHelp]`), $(`[${this.annotationName}=MiddleInitial]`), $(`[${this.annotationName}=MiddleInitialHelp]`), $(`[${this.annotationName}=sgnTranslator]`), $(`[${this.annotationName}=sgnTranslatorHelp]`), $(`[${this.annotationName}=TranslatorDate]`), $(`[${this.annotationName}=TranslatorDateHelp]`), $(`[${this.annotationName}=TranslatorLastName]`), $(`[${this.annotationName}=TranslatorLastNameHelp]`), $(`[${this.annotationName}=TranslatorFirstName]`), $(`[${this.annotationName}=TranslatorFirstNameHelp]`), $(`[${this.annotationName}=TranslatorAddress]`), $(`[${this.annotationName}=TranslatorAddressHelp]`), $(`[${this.annotationName}=TranslatorCity]`), $(`[${this.annotationName}=TranslatorCityHelp]`), $(`[${this.annotationName}=TranslatorState]`), $(`[${this.annotationName}=TranslatorStateHelp]`), $(`[${this.annotationName}=TranslatorZip]`), $(`[${this.annotationName}=TranslatorZipHelp]`), $(`[${this.annotationName}=sgnTranslator2]`), $(`[${this.annotationName}=TranslatorDate2]`), $(`[${this.annotationName}=TranslatorLastName2]`), $(`[${this.annotationName}=TranslatorFirstName2]`), $(`[${this.annotationName}=TranslatorAddress2]`), $(`[${this.annotationName}=TranslatorCity2]`), $(`[${this.annotationName}=TranslatorState2]`), $(`[${this.annotationName}=TranslatorZip2]`), $(`[${this.annotationName}=sgnTranslator3]`), $(`[${this.annotationName}=TranslatorDate3]`), $(`[${this.annotationName}=TranslatorLastName3]`), $(`[${this.annotationName}=TranslatorFirstName3]`), $(`[${this.annotationName}=TranslatorAddress3]`), $(`[${this.annotationName}=TranslatorCity3]`), $(`[${this.annotationName}=TranslatorState3]`), $(`[${this.annotationName}=TranslatorZip3]`), $(`[${this.annotationName}=sgnTranslator4]`), $(`[${this.annotationName}=TranslatorDate4]`), $(`[${this.annotationName}=TranslatorLastName4]`), $(`[${this.annotationName}=TranslatorFirstName4]`), $(`[${this.annotationName}=TranslatorAddress4]`), $(`[${this.annotationName}=TranslatorCity4]`), $(`[${this.annotationName}=TranslatorState4]`), $(`[${this.annotationName}=TranslatorZip4]`));
        }
        renderSections() {
            const eventBus = PDFViewerApplication.eventBus;
            this.toolbarButtons.forEach((e) => {
                const eventFuncs = eventBus.get(e);
                eventBus.remove(e);
                eventBus.on(e, () => this.validateForm($(`#${e}`), super.validateFields()).then(() => {
                    this.prepareData();
                    eventFuncs.forEach((f) => f.listener());
                }).catch((ctrl) => ctrl.popover('show')));
            });
            this.prepareFirstPage();
        }
    }
    exports.USI9Supplement = USI9Supplement;
});
define("USI9Supplement/Init", ["require", "exports", "USI9Supplement/USI9Supplement"], function (require, exports, USI9Supplement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const initializationFunction = () => {
        if (PDFViewerApplication.eventBus && document.webL10n) {
            PDFViewerApplication.eventBus.on('textlayerrendered', () => {
                var form = new USI9Supplement_1.USI9Supplement(document.webL10n);
                form.renderSections();
            });
        }
        else {
            setTimeout(initializationFunction, 100);
        }
    };
    setTimeout(initializationFunction, 100);
});
