define("PDFForm", ["require", "exports"], function (require, exports) {
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
define("Section1", ["require", "exports", "Fields"], function (require, exports, Fields_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.USI9Section1 = void 0;
    class USI9Section1 extends Fields_1.USI9Fields {
        renderNameAndAddress(tabIndex, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, otherNames, otherNamesHelp, address, addressHelp, apptNumber, apptNumberHelp, city, cityHelp, state, stateHelp, zip, zipHelp) {
            this._lastName = this.renderControl(lastName, this._('lastnamehelp.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._lastNameHelp = this.renderHelpIcon(lastNameHelp, this._('lastnamehelp.caption'), this._('lastnamehelp.text'));
            this._firstName = this.renderControl(firstName, this._('firstnamehelp.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._firstNameHelp = this.renderHelpIcon(firstNameHelp, this._('firstnamehelp.caption'), this._('firstnamehelp.text'));
            this._middleInitial = this.renderControl(middleInitial, this._('middleinitialhelp.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._middleInitialHelp = this.renderHelpIcon(middleInitialHelp, this._('middleinitialhelp.caption'), this._('middleinitialhelp.text'));
            this._otherNames = this.renderControl(otherNames, this._('othernameshelp.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._otherNamesHelp = this.renderHelpIcon(otherNamesHelp, this._('othernameshelp.caption'), this._('othernameshelp.text'));
            this._address = this.renderControl(address, this._('addresshelp.tooltip'))
                .attr('tabindex', tabIndex++);
            this._addressHelp = this.renderHelpIcon(addressHelp, this._('addresshelp.caption'), this._('addresshelp.text'));
            this._apptNumber = this.renderControl(apptNumber, this._('apartmentnumberhelp.tooltip'))
                .attr('tabindex', tabIndex++);
            this._apptNumberHelp = this.renderHelpIcon(apptNumberHelp, this._('apartmentnumberhelp.caption'), this._('apartmentnumberhelp.text'));
            this._city = this.renderControl(city, this._('cityhelp.tooltip'))
                .attr('tabindex', tabIndex++);
            this._cityHelp = this.renderHelpIcon(cityHelp, this._('cityhelp.caption'), this._('cityhelp.text'));
            this._state = this.renderControl(state, this._('statehelp.tooltip'), true, 'left')
                .on('focus', e => {
                $(e.target).tooltip('hide');
                const nonUSCountries = ['CAN', 'MEX'];
                const zipCode = nonUSCountries.indexOf(e.currentTarget.value) < 0;
                this._zip.off('keypress').on('keypress', e => {
                    return ((nonUSCountries.indexOf(this._state.val()) < 0
                        ? this.zipFormat : this.postalFormat).test(e.key) || e.key === this.backSpaceCode);
                });
                this._zip.prop('maxLength', zipCode ? 5 : 6);
            })
                .attr(this.annotationRequired, 'true')
                .attr('tabindex', tabIndex++);
            this.setCombolistText(this._state, this.space, this.blankItem);
            this._stateHelp = this.renderHelpIcon(stateHelp, this._('statehelp.caption'), this._('statehelp.text'));
            this._zip = this.renderControl(zip, this._('ziphelp.tooltip'))
                .on('keypress', e => this.zipFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._zipHelp = this.renderHelpIcon(zipHelp, this._('ziphelp.caption'), this._('ziphelp.text'));
            return tabIndex;
        }
        renderSSNFields(ssn, tabIndex) {
            this._ssn = ssn;
            for (let i = 0; i < ssn.length - 1; i++) {
                this.renderControl(this._ssn[i], this._('ssnhelp.tooltip'))
                    .attr(this.annotationNext, (this._ssn[i + 1]).attr(this.annotationName))
                    .on('keypress', e => {
                    if (this.numberFormat.test(e.key)) {
                        $(`[${this.annotationName}='${$(e.target).attr(this.annotationNext)}']`).focus();
                        return true;
                    }
                    else {
                        return e.key === this.backSpaceCode;
                    }
                })
                    .on('keyup', e => {
                    if (e.key === this.backSpaceCode) {
                        $(`[${this.annotationNext}='${$(e.target).attr(this.annotationName)}']`).focus();
                        $(e.target).val('');
                    }
                })
                    .attr('tabindex', tabIndex++);
            }
            this.renderControl(this._ssn[ssn.length - 1], this._('ssnhelp.tooltip'))
                .on('keypress', e => this.numberFormat.test(e.key) || e.key === this.backSpaceCode)
                .on('keyup', e => {
                if (e.key === this.backSpaceCode) {
                    $(`[${this.annotationNext}='${$(e.target).attr(this.annotationName)}']`).focus();
                    $(e.target).val('');
                }
            })
                .attr('tabindex', tabIndex++);
            return tabIndex;
        }
        renderPersonalData(tabIndex, dob, dobHelp, ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34, ssnHelp, email, emailHelp, phone, phoneHelp) {
            const maxDOB = new Date();
            maxDOB.setFullYear(maxDOB.getFullYear() - 14);
            this._dob = this.renderControl(dob, this._('dobhelp.tooltip'), true, 'left')
                .datepicker({
                changeMonth: true,
                changeYear: true,
                yearRange: `1908:${maxDOB.getFullYear()}`,
                maxDate: maxDOB
            }).attr('autocomplete', 'disabled')
                .attr('tabindex', tabIndex++);
            this._dobHelp = this.renderHelpIcon(dobHelp, this._('dobhelp.caption'), this._('dobhelp.text'));
            tabIndex = this.renderSSNFields([ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34], tabIndex);
            this._ssnHelp = this.renderHelpIcon(ssnHelp, this._('ssnhelp.caption'), this._('ssnhelp.text'));
            this._email = this.renderControl(email, this._('emailhelp.tooltip'))
                .attr('tabindex', tabIndex++);
            this._emailHelp = this.renderHelpIcon(emailHelp, this._('emailhelp.caption'), this._('emailhelp.text'));
            this._phone = this.renderControl(phone, this._('phonehelp.tooltip'))
                .on('keypress', e => this.phoneFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._phoneHelp = this.renderHelpIcon(phoneHelp, this._('phonehelp.caption'), this._('phonehelp.text'));
            return tabIndex;
        }
        renderCitizenship(tabIndex, citizen, citizenHelp, national, nationalHelp, lpr, lprHelp, alien, alienHelp, uscisNumberHelp, lpruscisNumPrefix, lpruscisNum, lpruscisNumType, alienWorkAuthDate, alienuscisNumPrefix, alienuscisNum, alienuscisNumType, admissionNum, admissionNumHelp, passportNum, passportNumHelp, countryOfIssuance, countryOfIssuanceHelp, sgnEmployee, sgnEmployeeHelp, sgnEmployeeDate, sgnEmployeeDateHelp) {
            this._citizen = this.renderControl(citizen, this._('citizenhelp.tooltip'), false, 'right')
                .attr('tabindex', tabIndex++);
            this._citizenHelp = this.renderHelpIcon(citizenHelp, this._('citizenhelp.caption'), this._('citizenhelp.text'));
            this._national = this.renderControl(national, this._('nationalhelp.tooltip'), false, 'right')
                .attr('tabindex', tabIndex++);
            this._nationalHelp = this.renderHelpIcon(nationalHelp, this._('nationalhelp.caption'), this._('nationalhelp.text'));
            this._lpr = this.renderControl(lpr, this._('lprhelp.tooltip'), false, 'right')
                .attr('tabindex', tabIndex++);
            this._lprHelp = this.renderHelpIcon(lprHelp, this._('lprhelp.caption'), this._('lprhelp.text'));
            this._alien = this.renderControl(alien, this._('alienhelp.tooltip'), false, 'right')
                .attr('tabindex', tabIndex++);
            this._alienHelp = this.renderHelpIcon(alienHelp, this._('alienhelp.caption'), this._('alienhelp.text'));
            this._uscisNumberHelp = this.renderHelpIcon(uscisNumberHelp, this._('uscisnumberhelp.caption'), this._('uscisnumberhelp.text'));
            this._lpruscisNumPrefix = lpruscisNumPrefix;
            this._lpruscisNum = this.renderControl(lpruscisNum, this._('uscisnumber.tooltip'))
                .on('keypress', e => this.numberFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._lpruscisNumType = this.renderControl(lpruscisNumType, this._('uscisnumbertype.tooltip'), true, 'left')
                .attr('tabindex', tabIndex++);
            this.assignCombolistEventHandler(this._lpruscisNumType, e => this._lpruscisNumPrefix.val(e.target.getAttribute('value') === 'A' ? 'A' : ''));
            this._alienWorkAuthDate = this.renderControl(alienWorkAuthDate, this._('alienworkauthdate.tooltip'), true, 'right')
                .datepicker({ changeMonth: true, changeYear: true, minDate: new Date() }).attr('autocomplete', 'disabled')
                .off('keypress').on('keypress', e => /[\d/]/g.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._alienuscisNumPrefix = alienuscisNumPrefix;
            this._alienuscisNum = this.renderControl(alienuscisNum, this._('uscisnumber.tooltip'), true, 'right')
                .on('keypress', e => this.numberFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._alienuscisNumType = this.renderControl(alienuscisNumType, this._('uscisnumbertype.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
            this.assignCombolistEventHandler(this._alienuscisNumType, e => this._alienuscisNumPrefix.val(e.target.getAttribute('value') === 'A' ? 'A' : ''));
            this._admissionNum = this.renderControl(admissionNum, this._('admissionnumber.tooltip'), true, 'right')
                .on('keypress', e => this.alphaNumericFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._admissionNumHelp = this.renderHelpIcon(admissionNumHelp, this._('admissionnumberhelp.caption'), this._('admissionnumberhelp.text'));
            this._passportNum = this.renderControl(passportNum, this._('passportnumber.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
            this._passportNumHelp = this.renderHelpIcon(passportNumHelp, this._('passportnumberhelp.caption'), this._('passportnumberhelp.text'));
            this._countryOfIssuance = this.renderControl(countryOfIssuance, this._('coi.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
            this._countryOfIssuanceHelp = this.renderHelpIcon(countryOfIssuanceHelp, this._('coihelp.caption'), this._('coihelp.text'));
            this._sgnEmployee = this.renderControl(sgnEmployee, this._('sgnemployee.tooltip'))
                .attr('tabindex', tabIndex++);
            this._sgnEmployeeHelp = this.renderHelpIcon(sgnEmployeeHelp, this._('sgnemployeehelp.caption'), this._('sgnemployeehelp.text'));
            this._sgnEmployeeDate = this.renderControl(sgnEmployeeDate, this._('employeedate.tooltip'), true, 'right')
                .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled')
                .attr('tabindex', tabIndex++);
            this._sgnEmployeeDateHelp = this.renderHelpIcon(sgnEmployeeDateHelp, this._('employeedatehelp.caption'), this._('employeedatehelp.text'));
            return tabIndex;
        }
        renderSection1(tabIndex, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, otherNames, otherNamesHelp, address, addressHelp, apptNumber, apptNumberHelp, city, cityHelp, state, stateHelp, zip, zipHelp, dob, dobHelp, ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34, ssnHelp, email, emailHelp, phone, phoneHelp, citizen, citizenHelp, national, nationalHelp, lpr, lprHelp, alien, alienHelp, uscisNumberHelp, lpruscisNumPrefix, lpruscisNum, lpruscisNumType, alienWorkAuthDate, alienuscisNumPrefix, alienuscisNum, alienuscisNumType, admissionNum, admissionNumHelp, passportNum, passportNumHelp, countryOfIssuance, countryOfIssuanceHelp, sgnEmployee, sgnEmployeeHelp, sgnEmployeeDate, sgnEmployeeDateHelp) {
            $('a').prop('target', '_blank');
            tabIndex = this.renderNameAndAddress(tabIndex, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, otherNames, otherNamesHelp, address, addressHelp, apptNumber, apptNumberHelp, city, cityHelp, state, stateHelp, zip, zipHelp);
            tabIndex = this.renderPersonalData(tabIndex, dob, dobHelp, ssn11, ssn12, ssn13, ssn21, ssn22, ssn31, ssn32, ssn33, ssn34, ssnHelp, email, emailHelp, phone, phoneHelp);
            tabIndex = this.renderCitizenship(tabIndex, citizen, citizenHelp, national, nationalHelp, lpr, lprHelp, alien, alienHelp, uscisNumberHelp, lpruscisNumPrefix, lpruscisNum, lpruscisNumType, alienWorkAuthDate, alienuscisNumPrefix, alienuscisNum, alienuscisNumType, admissionNum, admissionNumHelp, passportNum, passportNumHelp, countryOfIssuance, countryOfIssuanceHelp, sgnEmployee, sgnEmployeeHelp, sgnEmployeeDate, sgnEmployeeDateHelp);
            return tabIndex;
        }
        validateFields(confirmFlag) {
            const errorMessages = [];
            [this._middleInitial, this._otherNames, this._apptNumber, this._email, this._phone]
                .filter(f => f.val().trim() === '' || f.val().toUpperCase() === this.na)
                .forEach(f => f.val(this.na));
            this.validateTextField(this._lastName, this._('name.last'), [this.nameFormat], false, errorMessages);
            this.validateTextField(this._firstName, this._('name.first'), [this.nameFormat], false, errorMessages);
            this.validateTextField(this._middleInitial, this._('name.middleinitial'), [this.nameInitialFormat, this.NAString], false, errorMessages);
            this.validateTextField(this._otherNames, this._('name.othernames'), [this.nameFormat, this.NAString], false, errorMessages);
            this.validateTextField(this._address, this._('address.address'), [], false, errorMessages);
            this.validateTextField(this._apptNumber, this._('address.apartment'), [], false, errorMessages);
            this.validateTextField(this._city, this._('address.city'), [], false, errorMessages);
            this.validateTextField(this._state, this._('address.state'), [this.stateFormat], false, errorMessages);
            this.validateTextField(this._zip, this._('address.zip'), [['CAN', 'MEX'].indexOf(this._state.val()) < 0 ? this.zipNumberFormat : this.postalCodeFormat], false, errorMessages);
            this.validateTextField(this._dob, this._('date.dob'), [this.dateFormat], true, errorMessages);
            const areaCode = Math.round(100 * this._ssn[0].val() +
                10 * this._ssn[1].val() +
                1 * this._ssn[2].val());
            this._ssn.forEach(field => field.toggleClass(this.invalidFieldClass, false));
            if (this._ssn.filter(element => element.val() !== '').length > 0) {
                if (this._ssn.filter(element => element.val() === '').length > 0) {
                    errorMessages.push(this._('ssn.allfields'));
                    this._ssn.forEach(field => field.toggleClass(this.invalidFieldClass, true));
                }
                else if (this._ssn.filter(element => !this.numberFormat.test(element.val())).length > 0) {
                    errorMessages.push(this._('ssn.allnumeric'));
                    this._ssn.filter(element => !this.numberFormat.test(element.val())).forEach(field => field.toggleClass(this.invalidFieldClass, true));
                }
                else if (areaCode === 0 || areaCode === 666 || areaCode > 899) {
                    errorMessages.push(this._('ssn.areanumber'));
                    [this._ssn[0], this._ssn[1], this._ssn[2]].forEach(field => field.toggleClass(this.invalidFieldClass, true));
                }
                else if (Math.round(10 * this._ssn[3].val() + 1 * this._ssn[4].val()) === 0) {
                    errorMessages.push(this._('ssn.groupnumber'));
                    [this._ssn[3], this._ssn[4]].forEach(field => field.toggleClass(this.invalidFieldClass, true));
                }
                else if (Math.round(1000 * this._ssn[5].val() +
                    100 * this._ssn[6].val() +
                    10 * this._ssn[7].val() +
                    1 * this._ssn[8].val()) === 0) {
                    errorMessages.push(this._('ssn.serialnumber'));
                    [this._ssn[5], this._ssn[6], this._ssn[7], this._ssn[8]].forEach(field => field.toggleClass(this.invalidFieldClass, true));
                }
            }
            this.validateTextField(this._email, this._('email.address'), [this.NAString, this.emailFormat], false, errorMessages);
            this.validateTextField(this._phone, this._('employee.phone'), [this.NAString, this.phoneNumber], false, errorMessages);
            const citizenship = [this._citizen, this._national, this._lpr, this._alien];
            const statusSelected = citizenship.filter(status => status.prop('checked')).length > 0;
            if (!statusSelected) {
                errorMessages.push(this._('citizenship.status'));
            }
            citizenship.forEach(status => status.toggleClass(this.invalidFieldClass, !statusSelected));
            if (this._lpr.prop('checked')) {
                this._lpruscisNum.attr(this.annotationRequired, 'true');
                this.validateTextField(this._lpruscisNum, this._('citizenship.uscis'), [this.uscisNumberFormat], true, errorMessages);
            }
            else {
                this._lpruscisNum.removeAttr(this.annotationRequired);
            }
            if (this._alien.prop('checked')) {
                this._alienWorkAuthDate.attr(this.annotationRequired, 'true');
                this.validateTextField(this._alienWorkAuthDate, this._('citizenship.alienworkauthdate'), [this.NAString, this.dateFormat], true, errorMessages);
                [this._alienuscisNum, this._admissionNum, this._passportNum, this._countryOfIssuance].forEach(field => field.toggleClass(this.invalidFieldClass, false));
                this.validateTextField(this._alienuscisNum, this._('citizenship.uscis'), [this.NAString, this.uscisNumberFormat], false, errorMessages);
                this.validateTextField(this._admissionNum, this._('citizenship.admission'), [this.NAString, this.admissionNumberFormat], false, errorMessages);
                this.validateTextField(this._passportNum, this._('citizenship.passport'), [this.NAString, this.passportNumberFormat], false, errorMessages);
                if (this.EmptyOrNA(this._alienuscisNum) && this.EmptyOrNA(this._admissionNum) &&
                    this.EmptyOrNA(this._passportNum) && this.EmptyOrNA(this._countryOfIssuance)) {
                    [this._alienuscisNum, this._admissionNum, this._passportNum, this._countryOfIssuance].forEach(field => field.toggleClass(this.invalidFieldClass, true));
                    errorMessages.push(this.paramExistsMsg.replace('$[prefix]', '')
                        .replace('$[parameter]', this._('citizenship.alienadmissionpassport')));
                }
                else if (this.EmptyOrNA(this._alienuscisNum) && this.EmptyOrNA(this._admissionNum) &&
                    (this.EmptyOrNA(this._passportNum) || this.EmptyOrNA(this._countryOfIssuance))) {
                    [this._passportNum, this._countryOfIssuance].forEach(field => field.toggleClass(this.invalidFieldClass, true));
                    errorMessages.push(this.paramExistsMsg.replace('$[prefix]', '')
                        .replace('$[parameter]', this._('citizenship.passportcountry')));
                }
            }
            else {
                this._alienWorkAuthDate.removeAttr(this.annotationRequired);
            }
            this.validateTextField(this._sgnEmployeeDate, this._('date.sgnemployee'), [this.dateFormat], true, errorMessages);
            return errorMessages;
        }
        EmptyOrNA(field) {
            return [null, '', this.na].indexOf(field.val()) >= 0;
        }
    }
    exports.USI9Section1 = USI9Section1;
});
define("TranslatorSection", ["require", "exports", "Section1"], function (require, exports, Section1_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.USI9Translator = void 0;
    class USI9Translator extends Section1_1.USI9Section1 {
        renderTranslatorSection(tabIndex, translatorNo, translatorYes, translatorHelp, sgnTranslator, sgnTranslatorHelp, translatorDate, translatorDateHelp, translatorLastName, translatorLastNameHelp, translatorFirstName, translatorFirstNameHelp, translatorAddress, translatorAddressHelp, translatorCity, translatorCityHelp, translatorState, translatorStateHelp, translatorZip, translatorZipHelp) {
            var translator = [translatorNo, translatorYes];
            this._translatorNo = this.renderControl(translatorNo, this._('translator.tooltip'), false)
                .on('click', () => {
                this.selectCheckmark(this._translatorNo, translator);
                this._sgnTranslator.val('').prop('disabled', true);
                this._translatorDate.val('').prop('disabled', true);
                this._translatorLastName.val('').prop('disabled', true);
                this._translatorFirstName.val('').prop('disabled', true);
                this._translatorAddress.val('').prop('disabled', true);
                this._translatorCity.val('').prop('disabled', true);
                this._translatorState.val('').prop('disabled', true);
                this._translatorZip.val('').prop('disabled', true);
            })
                .attr('tabindex', tabIndex++);
            this._translatorYes = this.renderControl(translatorYes, this._('translator.tooltip'), false)
                .on('click', () => {
                this.selectCheckmark(this._translatorYes, translator);
                this._sgnTranslator.prop('disabled', false);
                this._translatorDate.prop('disabled', false);
                this._translatorLastName.prop('disabled', false);
                this._translatorFirstName.prop('disabled', false);
                this._translatorAddress.prop('disabled', false);
                this._translatorCity.prop('disabled', false);
                this._translatorState.prop('disabled', false);
                this._translatorZip.prop('disabled', false);
            })
                .attr('tabindex', tabIndex++);
            this._translatorHelp = this.renderHelpIcon(translatorHelp, this._('translatorhelp.caption'), this._('translatorhelp.text'));
            this._sgnTranslator = this.renderControl(sgnTranslator, this._('sgntranslator.tooltip'))
                .attr('tabindex', tabIndex++);
            this._sgnTranslatorHelp = this.renderHelpIcon(sgnTranslatorHelp, this._('sgntranslatorhelp.caption'), this._('sgntranslatorhelp.text'));
            this._translatorDate = this.renderControl(translatorDate, this._('translatordate.tooltip'), true, 'left')
                .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled')
                .attr('tabindex', tabIndex++);
            this._translatorDateHelp = this.renderHelpIcon(translatorDateHelp, this._('translatordatehelp.caption'), this._('translatordatehelp.text'));
            this._translatorLastName = this.renderControl(translatorLastName, this._('translatorlastname.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._translatorLastNameHelp = this.renderHelpIcon(translatorLastNameHelp, this._('translatorlastnamehelp.caption'), this._('translatorlastnamehelp.text'));
            this._translatorFirstName = this.renderControl(translatorFirstName, this._('translatorfirstname.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._translatorFirstNameHelp = this.renderHelpIcon(translatorFirstNameHelp, this._('translatorfirstnamehelp.caption'), this._('translatorfirstnamehelp.text'));
            this._translatorAddress = this.renderControl(translatorAddress, this._('translatoraddress.tooltip'))
                .attr('tabindex', tabIndex++);
            this._translatorAddressHelp = this.renderHelpIcon(translatorAddressHelp, this._('translatoraddresshelp.caption'), this._('translatoraddresshelp.text'));
            this._translatorCity = this.renderControl(translatorCity, this._('translatorcity.tooltip'))
                .attr('tabindex', tabIndex++);
            this._translatorCityHelp = this.renderHelpIcon(translatorCityHelp, this._('translatorcityhelp.caption'), this._('translatorcityhelp.text'));
            this._translatorState = this.renderControl(translatorState, this._('translatorstate.tooltip'), true, 'left')
                .attr('tabindex', tabIndex++);
            this.setCombolistText(this._translatorState, ' ', this.blankItem);
            this._translatorStateHelp = this.renderHelpIcon(translatorStateHelp, this._('translatorstatehelp.caption'), this._('translatorstatehelp.text'));
            this._translatorZip = this.renderControl(translatorZip, this._('translatorzip.tooltip'))
                .on('keypress', e => this.zipFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._translatorZipHelp = this.renderHelpIcon(translatorZipHelp, this._('translatorziphelp.caption'), this._('translatorziphelp.text'));
            return tabIndex;
        }
        validateFields(confirmFlag) {
            const errorMessages = super.validateFields(confirmFlag);
            const translator = [this._translatorNo, this._translatorYes];
            const statusSelected = translator.filter(status => status.prop('checked')).length > 0;
            if (!statusSelected) {
                errorMessages.push(this._('translator.status'));
            }
            translator.forEach(status => status.toggleClass(this.invalidFieldClass, !statusSelected));
            if (this._translatorYes.prop('checked')) {
                this._translatorDate.attr(this.annotationRequired, 'true');
                this.validateTextField(this._translatorDate, this._('date.sgntranslator'), [this.dateFormat], true, errorMessages);
                this._translatorLastName.attr(this.annotationRequired, 'true');
                this.validateTextField(this._translatorLastName, this._('translator.lastname'), [this.nameFormat], true, errorMessages);
                this._translatorFirstName.attr(this.annotationRequired, 'true');
                this.validateTextField(this._translatorFirstName, this._('translator.firstname'), [this.nameFormat], true, errorMessages);
                this._translatorAddress.attr(this.annotationRequired, 'true');
                this.validateTextField(this._translatorAddress, this._('translator.address'), [], true, errorMessages);
                this._translatorCity.attr(this.annotationRequired, 'true');
                this.validateTextField(this._translatorCity, this._('translator.city'), [], true, errorMessages);
                this._translatorState.attr(this.annotationRequired, 'true');
                this.validateTextField(this._translatorState, this._('translator.state'), [], true, errorMessages);
                this._translatorZip.attr(this.annotationRequired, 'true');
                this.validateTextField(this._translatorZip, this._('translator.zip'), [this.zipNumberFormat], true, errorMessages);
            }
            else {
                this._translatorDate.removeAttr(this.annotationRequired);
                this._translatorLastName.removeAttr(this.annotationRequired);
                this._translatorFirstName.removeAttr(this.annotationRequired);
                this._translatorAddress.removeAttr(this.annotationRequired);
                this._translatorCity.removeAttr(this.annotationRequired);
                this._translatorState.removeAttr(this.annotationRequired);
                this._translatorZip.removeAttr(this.annotationRequired);
            }
            return errorMessages;
        }
    }
    exports.USI9Translator = USI9Translator;
});
define("Section2", ["require", "exports", "TranslatorSection"], function (require, exports, TranslatorSection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.USI9Section2 = void 0;
    class USI9Section2 extends TranslatorSection_1.USI9Translator {
        constructor() {
            super(...arguments);
            this.validationExpressionProp = 'validationexpression';
            this.validationMessageProp = 'validationmessage';
            this.freeTextProp = 'freeText';
            this.requiredProp = 'required';
            this.validateDocuments = (fn) => {
                $('#btnConfirm').off('click').click(() => fn(true));
                $('#btnCancel').off('click').click(() => fn(false));
                const listBval = this._listBDoc.val().trim();
                if (this._listCDoc.prop('ssncard') && listBval !== this.na && listBval !== '') {
                    $('.modal-body').text(this._('section2.ssncardnotvalid'));
                    $('.modal').modal('show');
                }
                else if (this._listCDoc.prop('i551') && listBval !== this.na && listBval !== '') {
                    $('.modal-body').text(this._('section2.expiredformI551confirmation'));
                    $('.modal').modal('show');
                }
                else {
                    fn(false);
                }
            };
        }
        renderSection2(tabIndex, employeeInfoHelp, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, immigrationStatus, immigrationStatusHelp, listADoc, listADocHelp, listAIssuingAuthority, listAIssuingAuthorityHelp, listADocNumber, listADocNumberHelp, listADocExpDate, listADocExpDateHelp, listADoc2, listADoc2Help, listAIssuingAuthority2, listAIssuingAuthority2Help, listADocNumber2, listADocNumber2Help, listADocExpDate2, listADocExpDate2Help, listADoc3, listADoc3Help, listAIssuingAuthority3, listAIssuingAuthority3Help, listADocNumber3, listADocNumber3Help, listADocExpDate3, listADocExpDate3Help, listBDoc, listBDocHelp, listBIssuingAuthority, listBIssuingAuthorityHelp, listBDocNumber, listBDocNumberHelp, listBDocExpDate, listBDocExpDateHelp, listCDoc, listCDocHelp, listCIssuingAuthority, listCIssuingAuthorityHelp, listCDocNumber, listCDocNumberHelp, listCDocExpDate, listCDocExpDateHelp, additionalInfo, additionalInfoHelp, hireDate, hireDateHelp, sgnEmployer, sgnEmployerHelp, employerSignDate, employerSignDateHelp, employerTitle, employerTitleHelp, employerLastName, employerLastNameHelp, employerFirstName, employerFirstNameHelp, employerName, employerNameHelp, employerAddress, employerAddressHelp, employerCity, employerCityHelp, employerState, employerStateHelp, employerZip, employerZipHelp) {
            $('a').prop('target', '_blank');
            this._dob.change((e) => this.filterCombolist(this._listBDoc, this.getListBContent(e.target.value), this.na, this, this.processListABC));
            this._employeeInfoHelp = this.renderHelpIcon(employeeInfoHelp, this._('employeeinfosection2help.caption'), this._('employeeinfosection2help.text'));
            this._lastNameSection2 = lastName;
            this._lastNameSection2Help = this.renderHelpIcon(lastNameHelp, this._('lastnamesection2help.caption'), this._('lastnamesection2help.text'));
            this._firstNameSection2 = firstName;
            this._firstNameSection2Help = this.renderHelpIcon(firstNameHelp, this._('firstnamesection2help.caption'), this._('firstnamesection2help.text'));
            this._middleInitialSection2 = middleInitial;
            this._middleInitialSection2Help = this.renderHelpIcon(middleInitialHelp, this._('middleinitialsection2help.caption'), this._('middleinitialsection2help.text'));
            this._immigrationStatus = immigrationStatus;
            this._immigrationStatusHelp = this.renderHelpIcon(immigrationStatusHelp, this._('immigrationstatushelp.caption'), this._('immigrationstatushelp.text'));
            tabIndex = this.renderListABC(tabIndex, listADoc, listADocHelp, listAIssuingAuthority, listAIssuingAuthorityHelp, listADocNumber, listADocNumberHelp, listADocExpDate, listADocExpDateHelp, listADoc2, listADoc2Help, listAIssuingAuthority2, listAIssuingAuthority2Help, listADocNumber2, listADocNumber2Help, listADocExpDate2, listADocExpDate2Help, listADoc3, listADoc3Help, listAIssuingAuthority3, listAIssuingAuthority3Help, listADocNumber3, listADocNumber3Help, listADocExpDate3, listADocExpDate3Help, listBDoc, listBDocHelp, listBIssuingAuthority, listBIssuingAuthorityHelp, listBDocNumber, listBDocNumberHelp, listBDocExpDate, listBDocExpDateHelp, listCDoc, listCDocHelp, listCIssuingAuthority, listCIssuingAuthorityHelp, listCDocNumber, listCDocNumberHelp, listCDocExpDate, listCDocExpDateHelp);
            this._additionalInfo = this.renderControl(additionalInfo, this._('additionalinfo.tooltip'))
                .attr('tabindex', tabIndex++);
            this._additionalInfoHelp = this.renderHelpIcon(additionalInfoHelp, this._('additionalinfohelp.caption'), this._('additionalinfohelp.text'));
            if (!this._citizen.prop('checked') && !this._national.prop('checked') &&
                !this._lpr.prop('checked') && this._alien.prop('checked')) {
                this.clearListABC();
            }
            this._hireDate = this.renderControl(hireDate, this._('hiredate.tooltip'), true, 'right')
                .datepicker().attr('autocomplete', 'disabled')
                .attr('tabindex', tabIndex++);
            this._hireDateHelp = this.renderHelpIcon(hireDateHelp, this._('hiredatehelp.caption'), this._('hiredatehelp.text'));
            tabIndex = this.renderEmployerData(tabIndex, sgnEmployer, sgnEmployerHelp, employerSignDate, employerSignDateHelp, employerTitle, employerTitleHelp, employerLastName, employerLastNameHelp, employerFirstName, employerFirstNameHelp, employerName, employerNameHelp, employerAddress, employerAddressHelp, employerCity, employerCityHelp, employerState, employerStateHelp, employerZip, employerZipHelp);
            return tabIndex;
        }
        validateFields(confirmFlag) {
            const errorMessages = super.validateFields(confirmFlag);
            const section2Fields = [
                this._listADoc,
                this._listAIssuingAuthority,
                this._listADocNumber,
                this._listADocExpDate,
                this._listADoc2,
                this._listAIssuingAuthority2,
                this._listADocNumber2,
                this._listADocExpDate2,
                this._listADoc3,
                this._listAIssuingAuthority3,
                this._listADocNumber3,
                this._listADocExpDate3,
                this._listBDoc,
                this._listBIssuingAuthority,
                this._listBDocNumber,
                this._listBDocExpDate,
                this._listCDoc,
                this._listCIssuingAuthority,
                this._listCDocNumber,
                this._listCDocExpDate,
                this._additionalInfo
            ];
            if (section2Fields.filter(f => f && f.val() && f.val().trim() !== '').length === 0) {
                return errorMessages;
            }
            section2Fields.filter(f => (f.val().trim() === '' && !f.prop(this.requiredProp)) ||
                f.val().toUpperCase() === this.na)
                .forEach(f => f.val(this.na));
            section2Fields.forEach(f => f.toggleClass(this.invalidFieldClass, false));
            this._lastNameSection2.val(this._lastName.val());
            this._firstNameSection2.val(this._firstName.val());
            this._middleInitialSection2.val(this._middleInitial.val());
            this._immigrationStatus.val(this._citizen.prop('checked') ? 1
                : (this._national.prop('checked') ? 2 : (this._lpr.prop('checked') ? 3
                    : (this._alien.prop('checked') ? 4 : ''))));
            if ((this._listADoc.val().trim() !== this.na &&
                (this._listBDoc.val().trim() !== this.na ||
                    this._listCDoc.val().trim() !== this.na)) ||
                (this._listADoc.val().trim() === this.na &&
                    (this._listBDoc.val().trim() === this.na ||
                        this._listCDoc.val().trim() === this.na))) {
                errorMessages.push(this._('section2.listabc'));
            }
            else if (this._listADoc.val().trim() !== this.na) {
                if (this._listAIssuingAuthority.val().trim() === '') {
                    errorMessages.push(this._('section2.listafirstissuingauthority'));
                    this._listAIssuingAuthority.toggleClass(this.invalidFieldClass, true);
                }
                if (this._listADocNumber.val().trim() === '') {
                    errorMessages.push(this._('section2.listafirstdocnumber'));
                    this._listADocNumber.toggleClass(this.invalidFieldClass, true);
                }
                else if (this._listADocNumber.prop(this.validationExpressionProp) &&
                    !this._listADocNumber.prop(this.validationExpressionProp)
                        .test(this._listADocNumber.val()) &&
                    this._listADocNumber.prop(this.validationMessageProp)) {
                    errorMessages.push(this._listADocNumber.prop(this.validationMessageProp));
                    this._listADocNumber.toggleClass(this.invalidFieldClass, true);
                }
                if (this._listAIssuingAuthority2.val().trim() === '') {
                    errorMessages.push(this._('section2.listasecondissuingauthority'));
                    this._listAIssuingAuthority2.toggleClass(this.invalidFieldClass, true);
                }
                if (this._listADocNumber2.val().trim() === '') {
                    errorMessages.push(this._('section2.listaseconddocnumber'));
                    this._listADocNumber2.toggleClass(this.invalidFieldClass, true);
                }
                if (this._listAIssuingAuthority3.val().trim() === '') {
                    errorMessages.push(this._('section2.listathirdissuingauthority'));
                    this._listAIssuingAuthority3.toggleClass(this.invalidFieldClass, true);
                }
                if (this._listADocNumber3.val().trim() === '') {
                    errorMessages.push(this._('section2.listathirddocnumber'));
                    this._listADocNumber3.toggleClass(this.invalidFieldClass, true);
                }
                if (!this.validateDateRange(this._listADocExpDate, '', []) ||
                    (!this._listADocExpDate.prop(this.freeTextProp) &&
                        !this.validateTextField(this._listADocExpDate, '', [this.dateFormat, this.NAString], true, [])) ||
                    (this._listADocExpDate.prop(this.freeTextProp) && this._listADocExpDate.val() === '')) {
                    errorMessages.push(this._('section2.listafirstexpdate'));
                    this._listADocExpDate.toggleClass(this.invalidFieldClass, true);
                }
                if (!this.validateDateRange(this._listADocExpDate2, '', []) ||
                    (!this._listADocExpDate2.prop(this.freeTextProp) &&
                        !this.validateTextField(this._listADocExpDate2, '', [this.dateFormat, this.NAString], true, [])) ||
                    (this._listADocExpDate2.prop(this.freeTextProp) && this._listADocExpDate2.val() === '')) {
                    errorMessages.push(this._('section2.listasecondexpdate'));
                    this._listADocExpDate2.toggleClass(this.invalidFieldClass, true);
                }
                if (!this.validateDateRange(this._listADocExpDate3, '', []) ||
                    (!this._listADocExpDate3.prop(this.freeTextProp) &&
                        !this.validateTextField(this._listADocExpDate3, '', [this.dateFormat, this.NAString], true, [])) ||
                    (this._listADocExpDate3.prop(this.freeTextProp) && this._listADocExpDate3.val() === '')) {
                    errorMessages.push(this._('section2.listathirdexpdate'));
                    this._listADocExpDate3.toggleClass(this.invalidFieldClass, true);
                }
            }
            else {
                if (this._listBDoc.val().trim() !== this.na) {
                    if (this._listBIssuingAuthority.val().trim() === '') {
                        errorMessages.push(this._('section2.listbissuingauthority'));
                        this._listBIssuingAuthority.toggleClass(this.invalidFieldClass, true);
                    }
                    if (this._listBDocNumber.val().trim() === '') {
                        errorMessages.push(this._('section2.listbdocnumber'));
                        this._listBDocNumber.toggleClass(this.invalidFieldClass, true);
                    }
                    else if (this._listBDocNumber.prop(this.validationExpressionProp) &&
                        !this._listBDocNumber.prop(this.validationExpressionProp)
                            .test(this._listBDocNumber.val()) &&
                        this._listBDocNumber.prop(this.validationMessageProp)) {
                        errorMessages.push(this._listBDocNumber.prop(this.validationMessageProp));
                        this._listBDocNumber.toggleClass(this.invalidFieldClass, true);
                    }
                    if (!this.validateDateRange(this._listBDocExpDate, '', []) ||
                        !this.validateTextField(this._listBDocExpDate, '', [this.dateFormat, this.NAString], true, [])) {
                        errorMessages.push(this._('section2.listbexpdate'));
                        this._listBDocExpDate.toggleClass(this.invalidFieldClass, true);
                    }
                }
                if (this._listCDoc.val().trim() !== this.na) {
                    if (this._listCIssuingAuthority.val().trim() === '') {
                        errorMessages.push(this._('section2.listcissuingauthority'));
                        this._listCIssuingAuthority.toggleClass(this.invalidFieldClass, true);
                    }
                    if (this._listCDoc.prop('ssncard') && !confirmFlag) {
                        errorMessages.push(this._('section2.ssncardnotvalidformat'));
                        this._listCDoc.toggleClass(this.invalidFieldClass, true);
                    }
                    else if (this._listCDoc.prop('i551') && !confirmFlag) {
                        errorMessages.push(this._('section2.expiredformI551notvalid'));
                        this._listCDoc.toggleClass(this.invalidFieldClass, true);
                    }
                    else if (this._listCDocNumber.prop(this.validationExpressionProp) &&
                        !this._listCDocNumber.prop(this.validationExpressionProp)
                            .test(this._listCDocNumber.val()) &&
                        this._listCDocNumber.prop(this.validationMessageProp)) {
                        errorMessages.push(this._listCDocNumber.prop(this.validationMessageProp));
                        this._listCDocNumber.toggleClass(this.invalidFieldClass, true);
                    }
                    if (!this.validateDateRange(this._listCDocExpDate, '', []) ||
                        !this.validateTextField(this._listCDocExpDate, '', [this.dateFormat, this.NAString], true, [])) {
                        errorMessages.push(this._('section2.listcexpdate'));
                        this._listCDocExpDate.toggleClass(this.invalidFieldClass, true);
                    }
                }
            }
            [this._hireDate, this._employerSignDate, this._employerLastName, this._employerFirstName,
                this._employerTitle, this._employerName, this._employerAddress, this._employerCity,
                this._employerState, this._employerZip].forEach(f => f.attr(this.annotationRequired, 'true'));
            this.validateTextField(this._hireDate, this._('section2.hiredate'), [this.dateFormat], true, errorMessages);
            this.validateTextField(this._employerSignDate, this._('section2.sgnemployer'), [this.dateFormat], true, errorMessages);
            this.validateTextField(this._employerTitle, this._('section2.title'), [this.nameFormat], true, errorMessages);
            this.validateTextField(this._employerLastName, this._('section2.lastname'), [this.nameFormat], true, errorMessages);
            this.validateTextField(this._employerFirstName, this._('section2.firstname'), [this.nameFormat], true, errorMessages);
            this.validateTextField(this._employerName, this._('section2.name'), [], true, errorMessages);
            this.validateTextField(this._employerAddress, this._('section2.address'), [], true, errorMessages);
            this.validateTextField(this._employerCity, this._('section2.city'), [], true, errorMessages);
            this.validateTextField(this._employerState, this._('section2.state'), [], true, errorMessages);
            this.validateTextField(this._employerZip, this._('section2.zip'), [this.zipNumberFormat], true, errorMessages);
            return errorMessages;
        }
        renderEmployerData(tabIndex, sgnEmployer, sgnEmployerHelp, employerSignDate, employerSignDateHelp, employerTitle, employerTitleHelp, employerLastName, employerLastNameHelp, employerFirstName, employerFirstNameHelp, employerName, employerNameHelp, employerAddress, employerAddressHelp, employerCity, employerCityHelp, employerState, employerStateHelp, employerZip, employerZipHelp) {
            this._sgnEmployer = this.renderControl(sgnEmployer, this._('sgnemployer.tooltip'))
                .attr('tabindex', tabIndex++);
            this._sgnEmployerHelp = this.renderHelpIcon(sgnEmployerHelp, this._('sgnemployerhelp.caption'), this._('sgnemployerhelp.text'));
            this._employerSignDate = this.renderControl(employerSignDate, this._('employersigndate.tooltip'), true, 'right')
                .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled').attr('tabindex', tabIndex++);
            this._employerSignDateHelp = this.renderHelpIcon(employerSignDateHelp, this._('employersigndatehelp.caption'), this._('employersigndatehelp.text'));
            this._employerTitle = this.renderControl(employerTitle, this._('employertitle.tooltip'))
                .attr('tabindex', tabIndex++);
            this._employerTitleHelp = this.renderHelpIcon(employerTitleHelp, this._('employertitlehelp.caption'), this._('employertitlehelp.text'));
            this._employerLastName = this.renderControl(employerLastName, this._('employerlastname.tooltip'))
                .attr('tabindex', tabIndex++);
            this._employerLastNameHelp = this.renderHelpIcon(employerLastNameHelp, this._('employerlastnamehelp.caption'), this._('employerlastnamehelp.text'));
            this._employerFirstName = this.renderControl(employerFirstName, this._('employerfirstname.tooltip'))
                .attr('tabindex', tabIndex++);
            this._employerFirstNameHelp = this.renderHelpIcon(employerFirstNameHelp, this._('employerfirstnamehelp.caption'), this._('employerfirstnamehelp.text'));
            this._employerName = this.renderControl(employerName, this._('employername.tooltip'))
                .attr('tabindex', tabIndex++);
            this._employerNameHelp = this.renderHelpIcon(employerNameHelp, this._('employernamehelp.caption'), this._('employernamehelp.text'));
            this._employerAddress = this.renderControl(employerAddress, this._('employeraddress.tooltip'))
                .attr('tabindex', tabIndex++);
            this._employerAddressHelp = this.renderHelpIcon(employerAddressHelp, this._('employeraddresshelp.caption'), this._('employeraddresshelp.text'));
            this._employerCity = this.renderControl(employerCity, this._('employercity.tooltip'))
                .attr('tabindex', tabIndex++);
            this._employerCityHelp = this.renderHelpIcon(employerCityHelp, this._('employercityhelp.caption'), this._('employercityhelp.text'));
            this._employerState = this.renderControl(employerState, this._('employerstate.tooltip'), true, 'left')
                .attr('tabindex', tabIndex++);
            this.setCombolistText(this._employerState, this.space, this.blankItem);
            this._employerStateHelp = this.renderHelpIcon(employerStateHelp, this._('employerstatehelp.caption'), this._('employerstatehelp.text'));
            this._employerZip = this.renderControl(employerZip, this._('employerzip.tooltip'))
                .keypress(e => this.zipFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._employerZipHelp = this.renderHelpIcon(employerZipHelp, this._('employerziphelp.caption'), this._('employerziphelp.text'));
            return tabIndex;
        }
        renderListABC(tabIndex, listADoc, listADocHelp, listAIssuingAuthority, listAIssuingAuthorityHelp, listADocNumber, listADocNumberHelp, listADocExpDate, listADocExpDateHelp, listADoc2, listADoc2Help, listAIssuingAuthority2, listAIssuingAuthority2Help, listADocNumber2, listADocNumber2Help, listADocExpDate2, listADocExpDate2Help, listADoc3, listADoc3Help, listAIssuingAuthority3, listAIssuingAuthority3Help, listADocNumber3, listADocNumber3Help, listADocExpDate3, listADocExpDate3Help, listBDoc, listBDocHelp, listBIssuingAuthority, listBIssuingAuthorityHelp, listBDocNumber, listBDocNumberHelp, listBDocExpDate, listBDocExpDateHelp, listCDoc, listCDocHelp, listCIssuingAuthority, listCIssuingAuthorityHelp, listCDocNumber, listCDocNumberHelp, listCDocExpDate, listCDocExpDateHelp) {
            const maxWidth = '70';
            this._listADoc = this.renderControl(listADoc, this._('listadoc.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
            this._listADocHelp = this.renderHelpIcon(listADocHelp, this._('listadochelp.caption'), this._('listadochelp.text'), maxWidth);
            this._listAIssuingAuthority = this.renderControl(listAIssuingAuthority, this._('listaissuingauthority.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
            this._listAIssuingAuthorityHelp = this.renderHelpIcon(listAIssuingAuthorityHelp, this._('listaissuingauthorityhelp.caption'), this._('listaissuingauthorityhelp.text'));
            this._listADocNumber = this.renderControl(listADocNumber, this._('listadocnumber.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
            this._listADocNumberHelp = this.renderHelpIcon(listADocNumberHelp, this._('listadocnumberhelp.caption'), this._('listadocnumberhelp.text'));
            this._listADocExpDate = this.renderControl(listADocExpDate, this._('listaexpdate.tooltip'), true, 'right')
                .datepicker({ changeMonth: true, changeYear: true, minDate: new Date() }).attr('autocomplete', 'disabled')
                .attr('tabindex', tabIndex++);
            this._listADocExpDateHelp = this.renderHelpIcon(listADocExpDateHelp, this._('listaexpdatehelp.caption'), this._('listaexpdatehelp.text'));
            this._listADoc2 = this.renderControl(listADoc2, this._('listadoc2.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
            this._listADoc2Help = this.renderHelpIcon(listADoc2Help, this._('listadoc2help.caption'), this._('listadoc2help.text'));
            this._listAIssuingAuthority2 = this.renderControl(listAIssuingAuthority2, this._('listaissuingauthority2.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
            this._listAIssuingAuthority2Help = this.renderHelpIcon(listAIssuingAuthority2Help, this._('listaissuingauthority2help.caption'), this._('listaissuingauthority2help.text'));
            this._listADocNumber2 = this.renderControl(listADocNumber2, this._('listadocnumber2.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
            this._listADocNumber2Help = this.renderHelpIcon(listADocNumber2Help, this._('listadocnumber2help.caption'), this._('listadocnumber2help.text'));
            this._listADocExpDate2 = this.renderControl(listADocExpDate2, this._('listaexpdate2.tooltip'), true, 'right')
                .datepicker({ changeMonth: true, changeYear: true, minDate: new Date() }).attr('autocomplete', 'disabled')
                .attr('tabindex', tabIndex++);
            this._listADocExpDate2Help = this.renderHelpIcon(listADocExpDate2Help, this._('listaexpdate2help.caption'), this._('listaexpdate2help.text'));
            this._listADoc3 = this.renderControl(listADoc3, this._('listadoc3.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
            this._listADoc3Help = this.renderHelpIcon(listADoc3Help, this._('listadoc3help.caption'), this._('listadoc3help.text'));
            this._listAIssuingAuthority3 = this.renderControl(listAIssuingAuthority3, this._('listaissuingauthority3.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
            this._listAIssuingAuthority3Help = this.renderHelpIcon(listAIssuingAuthority3Help, this._('listaissuingauthority3help.caption'), this._('listaissuingauthority3help.text'));
            this._listADocNumber3 = this.renderControl(listADocNumber3, this._('listadocnumber3.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
            this._listADocNumber3Help = this.renderHelpIcon(listADocNumber3Help, this._('listadocnumber3help.caption'), this._('listadocnumber3help.text'));
            this._listADocExpDate3 = this.renderControl(listADocExpDate3, this._('listaexpdate3.tooltip'), true, 'right')
                .datepicker({ changeMonth: true, changeYear: true, minDate: new Date() })
                .attr('autocomplete', 'disabled').attr('tabindex', tabIndex++);
            this._listADocExpDate3Help = this.renderHelpIcon(listADocExpDate3Help, this._('listaexpdate3help.caption'), this._('listaexpdate3help.text'));
            this._listBDoc = this.renderControl(listBDoc, this._('listbdoc.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
            this._listBDocHelp = this.renderHelpIcon(listBDocHelp, this._('listbdochelp.caption'), this._('listbdochelp.text'), maxWidth);
            this.filterCombolist(this._listBDoc, this.getListBContent(null), null, this, this.processListABC);
            this._listBIssuingAuthority = this.renderControl(listBIssuingAuthority, this._('listbissuingauthority.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
            this._listBIssuingAuthorityHelp = this.renderHelpIcon(listBIssuingAuthorityHelp, this._('listbissuingauthorityhelp.caption'), this._('listbissuingauthorityhelp.text'));
            this._listBDocNumber = this.renderControl(listBDocNumber, this._('listbdocnumber.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
            this._listBDocNumberHelp = this.renderHelpIcon(listBDocNumberHelp, this._('listbdocnumberhelp.caption'), this._('listbdocnumberhelp.text'));
            this._listBDocExpDate = this.renderControl(listBDocExpDate, this._('listbexpdate.tooltip'), true, 'right')
                .datepicker({ changeMonth: true, changeYear: true, minDate: new Date() }).attr('autocomplete', 'disabled')
                .attr('tabindex', tabIndex++);
            this._listBDocExpDateHelp = this.renderHelpIcon(listBDocExpDateHelp, this._('listbexpdatehelp.caption'), this._('listbexpdatehelp.text'));
            this._listCDoc = this.renderControl(listCDoc, this._('listcdoc.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
            this._listCDocHelp = this.renderHelpIcon(listCDocHelp, this._('listcdochelp.caption'), this._('listcdochelp.text'), maxWidth);
            this.filterCombolist(this._listCDoc, this.getListCContent(null), null, this, this.processListABC);
            this._listCIssuingAuthority = this.renderControl(listCIssuingAuthority, this._('listcissuingauthority.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
            this._listCIssuingAuthorityHelp = this.renderHelpIcon(listCIssuingAuthorityHelp, this._('listcissuingauthorityhelp.caption'), this._('listcissuingauthorityhelp.text'));
            this._listCDocNumber = this.renderControl(listCDocNumber, this._('listcdocnumber.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
            this._listCDocNumberHelp = this.renderHelpIcon(listCDocNumberHelp, this._('listcdocnumberhelp.caption'), this._('listcdocnumberhelp.text'));
            this._listCDocExpDate = this.renderControl(listCDocExpDate, this._('listcexpdate.tooltip'), true, 'right')
                .datepicker({ changeMonth: true, changeYear: true, minDate: new Date() }).attr('autocomplete', 'disabled')
                .attr('tabindex', tabIndex++);
            this._listCDocExpDateHelp = this.renderHelpIcon(listCDocExpDateHelp, this._('listcexpdatehelp.caption'), this._('listcexpdatehelp.text'));
            return tabIndex;
        }
        processListABC(ddl, code, self) {
            switch (ddl) {
                case 'ListADocTitle':
                    self.listADocTitle(code);
                    break;
                case 'ListADocTitle2':
                    self.listADocTitle2(code);
                    break;
                case 'ListADocTitle3':
                    self.listADocTitle3(code);
                    break;
                case 'ListBDocTitle':
                    self.listBDocTitle(code);
                    break;
                case 'ListCDocTitle':
                    self.listCDocTitle(code);
                    break;
            }
        }
        getListAContent(citizenship) {
            const usCitizenOrNational = { spaceSymbol: this.blankItem, 0: this.na, 1: this._('uspassport'), 2: this._('uspassportcard') };
            const lpr = {
                spaceSymbol: this.blankItem,
                0: this.na,
                3: this._('permanentresidentcard'),
                4: this._('alienresidentcard'),
                5: this._('foreignpassport'),
                10: this._('I551I94receipt'),
                12: this._('I551receipt')
            };
            const alien = {
                spaceSymbol: this.blankItem,
                0: this.na,
                6: this._('eadI766'),
                7: this._('foreinpassportnonimmigrant'),
                8: this._('FSMpassport'),
                9: this._('RMIpassport'),
                11: this._('I94refugeestampreceipt'),
                13: this._('I766receipt'),
                14: this._('foreinpassportnonimmigrantreceipt'),
                15: this._('FSMpassportreceipt'),
                16: this._('RMIpassportreceipt'),
                17: this._('expiredeadI766')
            };
            switch (citizenship) {
                case '0':
                case null:
                    return {};
                case '1':
                case '2':
                    return usCitizenOrNational;
                case '3':
                    return lpr;
                case '4':
                    return alien;
            }
        }
        getListBContent(dob) {
            let isMinorUnderAge18 = false;
            const ms = Date.parse(dob);
            if (!isNaN(ms)) {
                var ageDifMs = Date.now() - ms;
                var ageDate = new Date(ageDifMs);
                isMinorUnderAge18 = Math.abs(ageDate.getUTCFullYear() - 1970) < 18;
            }
            let listB = {
                spaceSymbol: this.blankItem,
                0: this._('NA'),
                1: this._('driverlicence'),
                2: this._('idcard'),
                3: this._('govermentid'),
                4: this._('schoolid'),
                5: this._('votercard'),
                6: this._('militaryid'),
                7: this._('draftrecord'),
                8: this._('militarydependedid'),
                9: this._('marinercard'),
                10: this._('indiantribalid'),
                11: this._('canadiandriverlicense'),
                20: this._('specialplacement'),
                21: this._('driverlicencereceipt'),
                22: this._('idcardreceipt'),
                23: this._('govermentidreceipt'),
                24: this._('schoolidreceipt'),
                25: this._('votercardreceipt'),
                26: this._('militaryidreceipt'),
                27: this._('militarydependedidreceipt'),
                28: this._('draftrecordreceipt'),
                29: this._('marinercardreceipt'),
                30: this._('canadiandriverlicensereceipt'),
                31: this._('indiantribalidreceipt')
            };
            if (isMinorUnderAge18 || dob === null) {
                listB = $.extend(listB, {
                    12: this._('schoolrecord'),
                    13: this._('reportcard'),
                    14: this._('clinicrecord'),
                    15: this._('doctorrecord'),
                    16: this._('hospitalrecord'),
                    17: this._('datecarerecord'),
                    18: this._('nurseryschoolrecord'),
                    19: this._('individualunderage18'),
                    32: this._('schoolrecordreceipt'),
                    33: this._('reportcardreceipt'),
                    34: this._('clinicrecordreceipt'),
                    35: this._('doctorrecordreceipt'),
                    36: this._('hospitalrecordreceipt'),
                    37: this._('datecarerecordreceipt'),
                    38: this._('nurseryschoolrecordreceipt')
                });
            }
            $.each(listB, (i, v) => { listB[i] = decodeURIComponent(v); });
            return listB;
        }
        getListCContent(citizenship) {
            let listC = {
                spaceSymbol: this.blankItem,
                0: this._('NA'),
                1: this._('ssncard'),
                10: this._('ssnCardReceipt')
            };
            if (['1', '2', '0', null].indexOf(citizenship) >= 0) {
                listC = $.extend(listC, {
                    2: this._('formFS545'),
                    3: this._('formDS1350'),
                    4: this._('formFS240'),
                    5: this._('birthCertificate'),
                    6: this._('tribalDocument'),
                    7: this._('formI197'),
                    8: this._('formI179'),
                    11: this._('birthCertificateReceipt'),
                    12: this._('tribalDocumentReceipt')
                });
            }
            if (['3', '4', '0', null].indexOf(citizenship) >= 0) {
                listC = $.extend(listC, {
                    9: this._('eadListC'),
                    13: this._('eadListCReceipt'),
                    14: this._('expiredFormI551')
                });
            }
            $.each(listC, (i, v) => { listC[i] = decodeURIComponent(v); });
            return listC;
        }
        listADocTitle(code) {
            const USDS = 'USDS';
            const USCIS = 'USCIS';
            const DOJINS = 'DOJINS';
            const DHS = 'DHS';
            const CBP = 'CBP';
            const FSM = 'FSM';
            const RMI = 'RMI';
            let numberMaxLength = 15;
            let fieldFormat = /^[a-zA-Z0-9]+$/;
            let fieldValidationExpression = null;
            let fieldValidationMessage = null;
            let issuingAuthList;
            let issuingAuth = null;
            this._listADocNumber.prop(this.requiredProp, true)
                .removeAttr('readOnly').val('');
            this._listADocNumber2.prop(this.requiredProp, false);
            this._listADocExpDate2.prop(this.requiredProp, false);
            this._listADocExpDate
                .removeAttr('readOnly')
                .datepicker('option', 'minDate', new Date())
                .datepicker('option', 'maxDate', null)
                .datepicker('option', 'showOn', 'focus')
                .attr('autocomplete', 'disabled').val('')
                .prop(this.requiredProp, true).prop(this.freeTextProp, false);
            const tenYearsFromNow = new Date();
            tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);
            if (['1', '2'].indexOf(code) >= 0) {
                issuingAuthList = { USDS: this._(USDS) };
                issuingAuth = USDS;
                numberMaxLength = 9;
                fieldValidationExpression = this.usPassportNumberFormat;
                fieldValidationMessage = this._('section2.uspassportformat');
                this._listADocExpDate.datepicker('option', 'maxDate', tenYearsFromNow);
            }
            else if (code === '3') {
                issuingAuthList = { USCIS: this._(USCIS), DOJINS: this._(DOJINS) };
                issuingAuth = USCIS;
                numberMaxLength = 13;
                fieldFormat = this.alphaNumericWithDashesFormat;
                fieldValidationExpression = this.greenCardNumberFormat;
                fieldValidationMessage = this._('section2.greencardformat');
                this._listADocExpDate.datepicker('option', 'maxDate', tenYearsFromNow);
            }
            else if (code === '4') {
                issuingAuthList = { DOJINS: this._(DOJINS) };
                issuingAuth = DOJINS;
                numberMaxLength = 13;
                fieldValidationExpression = this.cardNumberFormat;
                fieldValidationMessage = this._('section2.cardformat');
                this._listADocExpDate.datepicker('option', 'maxDate', tenYearsFromNow);
            }
            else if (code === '5') {
                issuingAuthList = JSON.parse(this._('countries'));
                issuingAuth = null;
                numberMaxLength = 12;
                fieldValidationExpression = this.passportNumberFormat;
                fieldValidationMessage = this._('section2.passportformat');
                this.filterCombolist(this._listADoc2, { 1: this._('temporaryI551stamp'), 2: this._('mrivstamp') }, '1', this, this.processListABC);
                this.filterCombolist(this._listAIssuingAuthority2, { USCIS: this._(USCIS), DOJINS: this._(DOJINS) }, USCIS, this, this.processListABC);
                this._listADocNumber2.attr('readOnly', 'true').val(this.na);
                this._listADocExpDate2
                    .removeAttr('readOnly')
                    .datepicker('option', 'minDate', new Date())
                    .datepicker('option', 'maxDate', null)
                    .datepicker('option', 'showOn', 'focus')
                    .attr('autocomplete', 'disabled').val('')
                    .off('keypress')
                    .prop(this.requiredProp, true).prop(this.freeTextProp, true);
            }
            else if (code === '10') {
                issuingAuthList = { DHS: this._(DHS) };
                issuingAuth = DHS;
                numberMaxLength = 11;
                fieldFormat = this.numberFormat;
                fieldValidationExpression = this.admissionNumberFormat;
                fieldValidationMessage = this._('section2.admissionnumber');
                this._listADocExpDate
                    .off('keypress')
                    .prop(this.freeTextProp, true);
            }
            else if (code === '12') {
                issuingAuthList = { USCIS: this._(USCIS) };
                issuingAuth = USCIS;
                numberMaxLength = 13;
                fieldValidationExpression = this.cardNumberFormat;
                fieldValidationMessage = this._('section2.cardformat');
                this._listADocExpDate
                    .off('keypress')
                    .prop(this.freeTextProp, true);
            }
            else if (code === '6') {
                issuingAuthList = { USCIS: this._(USCIS) };
                issuingAuth = USCIS;
                numberMaxLength = 13;
                fieldValidationExpression = this.cardNumberFormat;
                fieldValidationMessage = this._('section2.cardformat');
                this._listADocExpDate.prop(this.freeTextProp, true);
            }
            else if (code === '17') {
                issuingAuthList = { USCIS: this._(USCIS) };
                issuingAuth = USCIS;
                numberMaxLength = 13;
                fieldValidationExpression = this.cardNumberFormat;
                fieldValidationMessage = this._('section2.cardformat');
                this._listADocExpDate
                    .removeAttr('readOnly')
                    .datepicker('option', 'minDate', null)
                    .datepicker('option', 'maxDate', new Date())
                    .datepicker('option', 'showOn', 'focus')
                    .attr('autocomplete', 'disabled').val('');
                this.filterCombolist(this._listADoc2, { 5: this._('formI797C'), 6: this._('formI20') }, '5', this, this.processListABC);
                this.filterCombolist(this._listAIssuingAuthority2, { USCIS: this._(USCIS) }, USCIS, this, this.processListABC);
                this._listADocNumber2.removeAttr('readOnly').val('').prop(this.requiredProp, true);
                this._listADocExpDate2
                    .removeAttr('readOnly')
                    .datepicker('option', 'minDate', new Date())
                    .datepicker('option', 'maxDate', null)
                    .datepicker('option', 'showOn', 'focus')
                    .attr('autocomplete', 'disabled').val('')
                    .prop(this.requiredProp, true);
            }
            else if (['7', '14'].indexOf(code) >= 0) {
                issuingAuthList = JSON.parse(this._('countries'));
                issuingAuth = null;
                numberMaxLength = 12;
                fieldValidationExpression = this.passportNumberFormat;
                fieldValidationMessage = this._('section2.passportformat');
                this.filterCombolist(this._listADoc2, { 3: this._('formI94'), 4: this._('formI94receipt') }, '3', this, this.processListABC);
                this.filterCombolist(this._listAIssuingAuthority2, { USCIS: this._(USCIS), CBP: this._(CBP) }, USCIS, this, this.processListABC);
                this._listADocNumber2.removeAttr('readOnly').val('').prop(this.requiredProp, true);
                this._listADocExpDate2
                    .removeAttr('readOnly')
                    .datepicker('option', 'minDate', new Date())
                    .datepicker('option', 'maxDate', null)
                    .datepicker('option', 'showOn', 'focus')
                    .attr('autocomplete', 'disabled').val('')
                    .off('keypress')
                    .prop(this.requiredProp, true).prop(this.freeTextProp, true);
                this.filterCombolist(this._listADoc3, { 0: this.na, 1: this._('formI20'), 2: this._('formDS2019') }, '0', this, this.processListABC);
                this.filterCombolist(this._listAIssuingAuthority3, { 0: this.na }, '0', this, this.processListABC);
                this._listADocNumber3.attr('readOnly', 'true').val(this.na);
                this._listADocExpDate3.attr('readOnly', 'true')
                    .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
            }
            else if (code === '8') {
                issuingAuthList = { FSM: this._(FSM) };
                issuingAuth = FSM;
                numberMaxLength = 12;
                fieldValidationExpression = this.passportNumberFormat;
                fieldValidationMessage = this._('section2.passportformat');
                this.filterCombolist(this._listADoc2, { 3: this._('formI94'), 4: this._('formI94receipt') }, '3', this, this.processListABC);
                this.filterCombolist(this._listAIssuingAuthority2, { USCIS: this._(USCIS), CBP: this._(CBP) }, USCIS, this, this.processListABC);
                this._listADocNumber2.removeAttr('readOnly').val('').prop(this.requiredProp, true);
                this._listADocExpDate2
                    .datepicker('option', 'minDate', new Date())
                    .datepicker('option', 'maxDate', null)
                    .datepicker('option', 'showOn', 'focus')
                    .attr('autocomplete', 'disabled').val('')
                    .off('keypress')
                    .prop(this.requiredProp, true).prop(this.freeTextProp, true);
            }
            else if (code === '9') {
                issuingAuthList = { RMI: this._(RMI) };
                issuingAuth = RMI;
                numberMaxLength = 12;
                fieldValidationExpression = this.passportNumberFormat;
                fieldValidationMessage = this._('section2.passportformat');
                this.filterCombolist(this._listADoc2, { 3: this._('formI94'), 4: this._('formI94receipt') }, '3', this, this.processListABC);
                this.filterCombolist(this._listAIssuingAuthority2, { USCIS: this._(USCIS), CBP: this._(CBP) }, USCIS, this, this.processListABC);
                this._listADocNumber2.removeAttr('readOnly').val('').prop(this.requiredProp, true);
                this._listADocExpDate2
                    .datepicker('option', 'minDate', new Date())
                    .datepicker('option', 'maxDate', null)
                    .datepicker('option', 'showOn', 'focus')
                    .attr('autocomplete', 'disabled').val('')
                    .off('keypress')
                    .prop(this.requiredProp, true).prop(this.freeTextProp, true);
            }
            else if (code === '11') {
                issuingAuthList = { DHS: this._(DHS) };
                issuingAuth = DHS;
                numberMaxLength = 11;
                numberMaxLength = 11;
                fieldFormat = this.numberFormat;
                fieldValidationExpression = this.admissionNumberFormat;
                fieldValidationMessage = this._('section2.admissionnumber');
                this._listADocExpDate.prop(this.freeTextProp, true);
            }
            else if (code === '13') {
                issuingAuthList = { USCIS: this._(USCIS) };
                issuingAuth = USCIS;
                numberMaxLength = 13;
                fieldValidationExpression = this.cardNumberFormat;
                fieldValidationMessage = this._('section2.cardformat');
                this._listADocExpDate.prop(this.freeTextProp, true);
            }
            else if (code === '15') {
                issuingAuthList = { FSM: this._('FSM') };
                issuingAuth = 'FSM';
                numberMaxLength = 12;
                fieldValidationExpression = this.passportNumberFormat;
                fieldValidationMessage = this._('section2.passportformat');
            }
            else if (code === '16') {
                issuingAuthList = { RMI: this._(RMI) };
                issuingAuth = RMI;
                numberMaxLength = 12;
                fieldValidationExpression = this.passportNumberFormat;
                fieldValidationMessage = this._('section2.passportformat');
            }
            this._listADocNumber
                .prop('maxLength', numberMaxLength)
                .on('keypress', e => fieldFormat.test(e.key) || e.key === this.backSpaceCode);
            this._listADocExpDate.off('keypress');
            if (!this._listADocExpDate.prop(this.freeTextProp)) {
                this._listADocExpDate
                    .on('keypress', e => /[\d/]/g.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode);
            }
            this._listADocNumber.prop(this.validationExpressionProp, fieldValidationExpression);
            this._listADocNumber.prop(this.validationMessageProp, fieldValidationMessage);
            this.filterCombolist(this._listAIssuingAuthority.prop(this.requiredProp, true), $.extend({ spaceSymbol: this.blankItem }, issuingAuthList), issuingAuth, this, this.processListABC);
            if (['1', '2', '3', '4', '6', '10', '11', '12'].indexOf(code) >= 0) {
                this.filterCombolist(this._listADoc2, { 0: this.na }, '0', this, this.processListABC);
                this.filterCombolist(this._listAIssuingAuthority2, { 0: this.na }, '0', this, this.processListABC);
                this._listADocNumber2.attr('readOnly', 'true').val(this.na);
                this._listADocExpDate2.attr('readOnly', 'true')
                    .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
            }
            if (['1', '2', '3', '4', '5', '6', '8', '9', '10', '11', '12', '15', '16', '17'].indexOf(code) >= 0) {
                this.filterCombolist(this._listADoc3, { 0: this.na }, '0', this, this.processListABC);
                this.filterCombolist(this._listAIssuingAuthority3, { 0: this.na }, '0', this, this.processListABC);
                this._listADocNumber3.attr('readOnly', 'true').val(this.na);
                this._listADocExpDate3
                    .attr('readOnly', 'true')
                    .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
            }
            if (code !== '0' && code.trim() !== '') {
                this.clearListB();
                this.clearListC();
            }
            if (code === '0') {
                this.clearListA();
            }
        }
        listADocTitle2(code) {
            const USDS = 'USDS';
            const USCIS = 'USCIS';
            const DOJINS = 'DOJINS';
            const ICE = 'ICE';
            const numberMaxLength = 11;
            let fieldFormat = /^[a-zA-Z0-9]+$/;
            this._listADocNumber2.removeAttr('readOnly').val('');
            this._listADocExpDate2.removeAttr('readOnly').val('');
            if (code === '1') {
                this.filterCombolist(this._listAIssuingAuthority2, { spaceSymbol: this.blankItem, USCIS: this._(USCIS), DOJINS: this._(DOJINS) }, USCIS, this, this.processListABC);
            }
            else if (code === '2') {
                this.filterCombolist(this._listAIssuingAuthority2, { spaceSymbol: this.blankItem, USDS: this._(USDS) }, USDS, this, this.processListABC);
            }
            else if (code === '3') {
                fieldFormat = /^\d+$/;
            }
            else if (code === '5') {
                this.filterCombolist(this._listAIssuingAuthority2, { USCIS: this._(USCIS) }, USCIS, this, this.processListABC);
            }
            else if (code === '6') {
                this.filterCombolist(this._listAIssuingAuthority2, { spaceSymbol: this.blankItem, ICE: this._(ICE), DOJINS: this._(DOJINS) }, ICE, this, this.processListABC);
            }
            this._listADocNumber2
                .prop('maxLength', numberMaxLength)
                .prop(this.requiredProp, true)
                .on('keypress', e => fieldFormat.test(e.key) || e.key === this.backSpaceCode);
        }
        listADocTitle3(code) {
            const ICE = 'ICE';
            const DOJINS = 'DOJINS';
            const USDS = 'USDS';
            this._listADocNumber3.prop(this.requiredProp, true);
            this._listADocExpDate3.prop(this.requiredProp, true);
            if (code === '0') {
                this.filterCombolist(this._listAIssuingAuthority3, { 0: this.na }, '0', this, this.processListABC);
                this._listADocNumber3.attr('readOnly', 'true').val(this.na);
                this._listADocExpDate3.attr('readOnly', 'true')
                    .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
            }
            else if (code === '1') {
                this.filterCombolist(this._listAIssuingAuthority3, { spaceSymbol: this.blankItem, ICE: this._(ICE), DOJINS: this._(DOJINS) }, ICE, this, this.processListABC);
                this._listADocNumber3.removeAttr('readOnly').val('');
                this._listADocExpDate3.removeAttr('readOnly').val('')
                    .datepicker('option', 'showOn', 'focus').attr('autocomplete', 'disabled')
                    .prop(this.requiredProp, true).prop(this.freeTextProp, false);
            }
            else if (code === '2') {
                this.filterCombolist(this._listAIssuingAuthority3, { spaceSymbol: this.blankItem, USDS: this._(USDS) }, USDS, this, this.processListABC);
                this._listADocNumber3.removeAttr('readOnly').val('');
                this._listADocExpDate3.removeAttr('readOnly').val('')
                    .datepicker('option', 'showOn', 'focus').attr('autocomplete', 'disabled')
                    .prop(this.requiredProp, true).prop(this.freeTextProp, false);
            }
        }
        listBDocTitle(code) {
            const USCG = 'USCG';
            let numberMaxLength = 15;
            const fieldFormat = /^[a-zA-Z0-9]+$/;
            let fieldValidationExpression = null;
            let fieldValidationMessage = null;
            let issuingAuthList;
            let issuingAuth = null;
            this._listBDocNumber.prop('maxLength', '100').off('keypress');
            this._listBIssuingAuthority.prop(this.requiredProp, true);
            this._listBDocNumber.prop(this.requiredProp, true);
            this._listBDocExpDate.prop(this.requiredProp, true);
            if (['19', '20'].indexOf(code) < 0) {
                this._listBDocNumber.removeAttr('readOnly').val('');
                this._listBDocExpDate
                    .removeAttr('readOnly')
                    .datepicker('option', 'showOn', 'focus').attr('autocomplete', 'disabled').val('')
                    .off('keypress')
                    .on('keypress', (e) => /[\d/]/g.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode);
            }
            if (['1', '2', '21', '22'].indexOf(code) >= 0) {
                issuingAuthList = JSON.parse(this._('usstates'));
                issuingAuth = 'AL';
                numberMaxLength = 14;
                this._listBDocNumber
                    .prop('maxLength', numberMaxLength)
                    .off('keypress')
                    .on('keypress', e => fieldFormat.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode);
                fieldValidationExpression = this.driverLicenseNumberFormat;
                fieldValidationMessage = this._('section2.listbnumberformat');
            }
            else if (['3', '4', '5', '6', '7', '8', '10', '12', '13', '14', '15', '16', '17', '18',
                '23', '24', '25', '26', '27', '28', '31', '32', '33', '34', '35', '36', '37', '38'].indexOf(code) >= 0) {
                issuingAuthList = {};
                issuingAuth = null;
                this._listBIssuingAuthority.removeAttr('readOnly');
            }
            else if (['9', '29'].indexOf(code) >= 0) {
                issuingAuthList = { USCG: this._(USCG) };
                issuingAuth = USCG;
                this._listBIssuingAuthority.attr('readOnly', 'true');
            }
            else if (['11', '30'].indexOf(code) >= 0) {
                issuingAuthList = JSON.parse(this._('canada'));
                issuingAuth = null;
                this._listBIssuingAuthority.attr('readOnly', 'true');
            }
            else if (['19'].indexOf(code) >= 0) {
                issuingAuthList = { 0: this.na };
                issuingAuth = '0';
                this._listBDocNumber.attr('readOnly', 'true').val(this.na);
                this._listBDocExpDate
                    .attr('readOnly', 'true')
                    .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
            }
            this.filterCombolist(this._listBIssuingAuthority, $.extend({ spaceSymbol: this.blankItem }, issuingAuthList), issuingAuth, this, this.processListABC);
            this._listBDocNumber.prop(this.validationExpressionProp, fieldValidationExpression);
            this._listBDocNumber.prop(this.validationMessageProp, fieldValidationMessage);
            if (code !== '0' && code.trim() !== '') {
                this.clearListA();
            }
            if (code === '0') {
                this.clearListB();
            }
        }
        listCDocTitle(code) {
            const SSA = 'SSA';
            const USDHHS = 'USDHHS';
            const SSD = 'SSD';
            const DHEW = 'DHEW';
            const USDS = 'USDS';
            const USCIS = 'USCIS';
            const DOJINS = 'DOJINS';
            let numberMaxLength = 15;
            let fieldFormat = /^[a-zA-Z0-9]+$/;
            let fieldValidationExpression = null;
            let fieldValidationMessage = null;
            let issuingAuthList;
            let issuingAuth;
            this._listCIssuingAuthority.prop(this.requiredProp, true);
            this._listCDocNumber.prop(this.requiredProp, true);
            this._listCDocExpDate.prop(this.requiredProp, true);
            this._listCIssuingAuthority.attr('readOnly', 'true');
            this._listCDocExpDate
                .removeAttr('readOnly')
                .datepicker('option', 'minDate', new Date())
                .datepicker('option', 'maxDate', null)
                .datepicker('option', 'showOn', 'focus')
                .attr('autocomplete', 'disabled')
                .off('keypress')
                .on('keypress', (e) => /[\d/]/g.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode)
                .val('');
            this._listCDoc.prop('ssncard', false).prop('i551', false);
            if (code === '1') {
                issuingAuthList = { SSA: this._(SSA), USDHHS: this._(USDHHS), SSD: this._(SSD), DHEW: this._(DHEW) };
                issuingAuth = SSA;
                numberMaxLength = 11;
                fieldFormat = /^[\d-]+$/;
                fieldValidationExpression = this.ssnFormat;
                fieldValidationMessage = this._('section2.ssnformat');
                this._listCDocExpDate
                    .attr('readOnly', 'true')
                    .datepicker('option', 'showOn', 'off')
                    .attr('autocomplete', 'disabled').val(this.na);
                this._listCDoc.prop('ssncard', true);
            }
            else if (['2', '3', '4'].indexOf(code) >= 0) {
                issuingAuthList = { USDS: this._(USDS) };
                issuingAuth = USDS;
            }
            else if (['5', '6', '11', '12'].indexOf(code) >= 0) {
                issuingAuthList = {};
                issuingAuth = null;
                this._listCIssuingAuthority.removeAttr('readOnly');
            }
            else if (['7', '8'].indexOf(code) >= 0) {
                issuingAuthList = { DOJINS: this._(DOJINS) };
                issuingAuth = DOJINS;
            }
            else if (['9', '13'].indexOf(code) >= 0) {
                const name = decodeURIComponent(code === '9' ? this._('listC7') : this._('listC7Receipt'));
                issuingAuthList = { 0: name };
                issuingAuth = '0';
                this._listCIssuingAuthority
                    .removeAttr('readOnly')
                    .on('keypress', e => {
                    const val = this._listCIssuingAuthority.val();
                    if (val.length >= name.length) {
                        return val.substr(0, name.length) === name;
                    }
                    return true;
                })
                    .on('keyup', () => {
                    const val = this._listCIssuingAuthority.val();
                    if (val.length <= name.length || (val.length === name.length + 1 && val.substr(0, name.length) !== name)) {
                        this._listCIssuingAuthority.val(name);
                    }
                });
            }
            else if (code === '10') {
                issuingAuthList = { SSA: this._(SSA) };
                issuingAuth = SSA;
            }
            else if (code === '14') {
                issuingAuthList = { USCIS: this._(USCIS), DOJINS: this._(DOJINS) };
                issuingAuth = USCIS;
                numberMaxLength = 13;
                fieldValidationExpression = this.cardNumberFormat;
                fieldValidationMessage = this._('section2.cardformat');
                this._listCDoc.prop('i551', true);
                this._listCDocExpDate
                    .removeAttr('readOnly')
                    .datepicker('option', 'minDate', null)
                    .datepicker('option', 'maxDate', new Date())
                    .datepicker('option', 'showOn', 'focus')
                    .attr('autocomplete', 'disabled').val('');
            }
            this._listCDocNumber
                .prop('maxLength', numberMaxLength)
                .removeAttr('readOnly').val('')
                .on('keypress', e => fieldFormat.test(e.key) || e.key === this.backSpaceCode);
            this.filterCombolist(this._listCIssuingAuthority, $.extend({ spaceSymbol: this.blankItem }, issuingAuthList), issuingAuth, this, this.processListABC);
            this._listCDocNumber
                .prop(this.validationExpressionProp, fieldValidationExpression)
                .prop(this.validationMessageProp, fieldValidationMessage);
            if (code !== '0' && code.trim() !== '') {
                this.clearListA();
            }
            if (code === '0') {
                this.clearListC();
            }
        }
        fillListABC(status) {
            this.filterCombolist(this._listADoc, this.getListAContent(status), null, this, this.processListABC);
            this.filterCombolist(this._listBDoc, this.getListBContent(this._dob.val()), null, this, this.processListABC);
            this.filterCombolist(this._listCDoc, this.getListCContent(status), null, this, this.processListABC);
        }
        clearListABC() {
            this._lastNameSection2.val('');
            this._firstNameSection2.val('');
            this._middleInitialSection2.val('');
            this._immigrationStatus.val('');
            this.filterCombolist(this._listADoc, {}, null, this, null);
            this.filterCombolist(this._listAIssuingAuthority, {}, null, this, null);
            this._listADocNumber.val('');
            this._listADocExpDate.val('');
            this.filterCombolist(this._listADoc2, {}, null, this, null);
            this.filterCombolist(this._listAIssuingAuthority2, {}, null, this, null);
            this._listADocNumber2.val('');
            this._listADocExpDate2.val('');
            this.filterCombolist(this._listADoc3, {}, null, this, null);
            this.filterCombolist(this._listAIssuingAuthority3, {}, null, this, null);
            this._listADocNumber3.val('');
            this._listADocExpDate3.val('');
            this.filterCombolist(this._listBDoc, {}, null, this, null);
            this.filterCombolist(this._listBIssuingAuthority, {}, null, this, null);
            this._listBDocNumber.val('');
            this._listBDocExpDate.val('');
            this.filterCombolist(this._listCDoc, {}, null, this, null);
            this.filterCombolist(this._listCIssuingAuthority, {}, null, this, null);
            this._listCDocNumber.val('');
            this._listCDocExpDate.val('');
        }
        clearListA() {
            this.setCombolistValue(this._listADoc, '0');
            this.filterCombolist(this._listAIssuingAuthority, { 0: this.na }, '0', this, this.processListABC);
            this._listADocNumber.attr('readOnly', 'true').val(this.na);
            this._listADocExpDate.attr('readOnly', 'true')
                .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
            this.filterCombolist(this._listADoc2, { 0: this.na }, '0', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority2, { 0: this.na }, '0', this, this.processListABC);
            this._listADocNumber2.attr('readOnly', 'true').val(this.na);
            this._listADocExpDate2.attr('readOnly', 'true')
                .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
            this.filterCombolist(this._listADoc3, { 0: this.na }, '0', this, this.processListABC);
            this.filterCombolist(this._listAIssuingAuthority3, { 0: this.na }, '0', this, this.processListABC);
            this._listADocNumber3.attr('readOnly', 'true').val(this.na);
            this._listADocExpDate3.attr('readOnly', 'true')
                .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
        }
        clearListB() {
            this.setCombolistValue(this._listBDoc, '0');
            this.filterCombolist(this._listBIssuingAuthority, { 0: this.na }, '0', this, null);
            this._listBDocNumber.attr('readOnly', 'true').val(this.na);
            this._listBDocExpDate
                .attr('readOnly', 'true')
                .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
        }
        clearListC() {
            this.setCombolistValue(this._listCDoc, '0');
            this.filterCombolist(this._listCIssuingAuthority, { 0: this.na }, '0', this, null);
            this._listCDocNumber.attr('readOnly', 'true').val(this.na);
            this._listCDocExpDate
                .attr('readOnly', 'true')
                .datepicker('option', 'showOn', 'off').attr('autocomplete', 'disabled').val(this.na);
        }
    }
    exports.USI9Section2 = USI9Section2;
});
define("Fields", ["require", "exports", "PDFForm"], function (require, exports, PDFForm_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.USI9Fields = void 0;
    class USI9Fields extends PDFForm_1.PDFForm {
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
        validateTextField(f, parameter, regExp, validateIfEmpty, errorMessages, prefix = '') {
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
            else if (((f && f.val() !== '') || validateIfEmpty) && regExp.length > 0) {
                let validFlag = false;
                for (const r of regExp) {
                    if (f && r.test(f.val())) {
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
        filterCombolist(ctrl, items, defaultValue, fields, callback) {
            if (!ctrl) {
                return;
            }
            var options = ctrl.parent().children().filter('.combo-content');
            for (const index in items) {
                options.children().filter(`[value='${index}']`).html(items[index]);
            }
            options.children().show();
            options.children().each((code, item) => {
                var val = item.getAttribute('value');
                if (items && !(val in items)) {
                    options.children().filter(`[value='${val}']`).hide();
                }
            });
            if (callback) {
                options.children().click(e => {
                    const inputText = e.target.parentNode.parentNode.getElementsByTagName('input')[0];
                    if (e.target.innerHTML === this.blankItem) {
                        inputText.value = '';
                    }
                    callback(inputText.getAttribute(this.annotationName), e.target.getAttribute('value'), fields);
                });
            }
            if (defaultValue) {
                this.setCombolistValue(ctrl, defaultValue);
            }
            else {
                ctrl.val('');
            }
        }
    }
    exports.USI9Fields = USI9Fields;
});
define("Section3", ["require", "exports", "Section2"], function (require, exports, Section2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.USI9Section3 = void 0;
    class USI9Section3 extends Section2_1.USI9Section2 {
        renderSection3(tabIndex, lastName, lastNameHelp, firstName, firstNameHelp, middleInitial, middleInitialHelp, rehireDate, rehireDateHelp, docTitleSec3, docTitleSec3Help, docNumberSec3, docNumberSec3Help, expDateSec3, expDateSec3Help, sgnEmployerSec3, sgnEmployerSec3Help, signDateSec3, signDateSec3Help, employerNameSec3, employerNameSec3Help) {
            const spaceSymbol = this.space;
            const citizenships = [this._citizen, this._national, this._lpr, this._alien];
            this._citizen.on('click', () => {
                this.selectCheckmark(this._citizen, citizenships);
                this.processLPR(this._citizen.prop('checked'));
                this.processAlien(this._citizen.prop('checked'));
                this.clearListABC();
                if (this._citizen.prop('checked')) {
                    this.fillListABC('1');
                }
            });
            this._national.on('click', () => {
                this.selectCheckmark(this._national, citizenships);
                this.processLPR(this._national.prop('checked'));
                this.processAlien(this._national.prop('checked'));
                this.clearListABC();
                if (this._national.prop('checked')) {
                    this.fillListABC('2');
                }
            });
            this._lpr.on('click', () => {
                this.selectCheckmark(this._lpr, citizenships);
                this.processAlien(this._lpr.prop('checked'));
                this._lpruscisNum.val('');
                this.filterCombolist(this._lpruscisNumType, {}, null, this, this.processListABC);
                this.clearListABC();
                if (this._lpr.prop('checked')) {
                    this._lpruscisNum.prop('disabled', false);
                    this._lpruscisNumType.prop('disabled', false);
                    this.filterCombolist(this._lpruscisNumType, { A: this._('aliennumber'), U: this._('uscisnumber') }, null, this, this.processListABC);
                    this.fillListABC('3');
                }
            });
            this._alien.on('click', () => {
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
                    this.filterCombolist(this._alienuscisNumType, { A: this._('aliennumber'), U: this._('uscisnumber') }, null, this, this.processListABC);
                    this._admissionNum.prop('disabled', false);
                    this._passportNum.prop('disabled', false);
                    this._countryOfIssuance.prop('disabled', false);
                    this.filterCombolist(this._countryOfIssuance, JSON.parse(this._('countries')), null, this, this.processListABC);
                    this.fillListABC('4');
                }
            });
            this._alienuscisNum.on('change', () => {
                if (!this.EmptyOrNA(this._alienuscisNum)) {
                    if (this.EmptyOrNA(this._alienuscisNumType)) {
                        this.filterCombolist(this._alienuscisNumType, { A: this._('aliennumber'), U: this._('uscisnumber') }, null, this, this.processListABC);
                    }
                    this._admissionNum.val(this.na);
                    this._passportNum.val(this.na);
                    this.filterCombolist(this._countryOfIssuance, { 0: this.na }, '0', this, this.processListABC);
                }
                else {
                    this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
                    this._admissionNum.val('');
                    this._passportNum.val('');
                    this.filterCombolist(this._countryOfIssuance, {}, null, this, this.processListABC);
                }
            });
            this._admissionNum.on('change', () => {
                if (!this.EmptyOrNA(this._admissionNum)) {
                    this._alienuscisNum.val(this.na);
                    this._alienuscisNumPrefix.val('');
                    this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
                    this._passportNum.val(this.na);
                    this.filterCombolist(this._countryOfIssuance, { 0: this.na }, '0', this, this.processListABC);
                }
                else {
                    this._alienuscisNum.val('');
                    this._alienuscisNumPrefix.val('');
                    this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
                    this._passportNum.val('');
                    this.filterCombolist(this._countryOfIssuance, {}, null, this, this.processListABC);
                }
            });
            this._passportNum.on('change', () => {
                if (!this.EmptyOrNA(this._passportNum)) {
                    this._alienuscisNum.val(this.na);
                    this._alienuscisNumPrefix.val('');
                    this.filterCombolist(this._alienuscisNumType, { 0: this.na }, this.na, this, this.processListABC);
                    this._admissionNum.val(this.na);
                    if (this.EmptyOrNA(this._countryOfIssuance)) {
                        this.filterCombolist(this._countryOfIssuance, JSON.parse(this._('countries')), null, this, this.processListABC);
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
                .on('keypress', e => this.nameFormat.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._newlastNameHelp = this.renderHelpIcon(lastNameHelp, this._('newlastnamehelp.caption'), this._('newlastnamehelp.text'));
            this._newfirstName = this.renderControl(firstName, this._('newfirstname.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._newfirstNameHelp = this.renderHelpIcon(firstNameHelp, this._('newfirstnamehelp.caption'), this._('newfirstnamehelp.text'));
            this._newmiddleInitial = this.renderControl(middleInitial, this._('newmiddleinitial.tooltip'))
                .on('keypress', e => this.nameFormat.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._newmiddleInitialHelp = this.renderHelpIcon(middleInitialHelp, this._('newmiddleinitialhelp.caption'), this._('newmiddleinitialhelp.text'));
            this._rehireDate = this.renderControl(rehireDate, this._('rehiredate.tooltip'), true, 'left')
                .datepicker().attr('autocomplete', 'disabled').off('keypress')
                .on('keypress', e => /[\d/]/g.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._rehireDateHelp = this.renderHelpIcon(rehireDateHelp, this._('rehiredatehelp.caption'), this._('rehiredatehelp.text'));
            this._docTitleSec3 = this.renderControl(docTitleSec3, this._('doctitlesec3.tooltip'), true, 'right')
                .attr('tabindex', tabIndex++);
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
            }, null, this, this.processListABC);
            this._docTitleSec3Help = this.renderHelpIcon(docTitleSec3Help, this._('doctitlesec3help.caption'), this._('doctitlesec3help.text'));
            this._docNumberSec3 = this.renderControl(docNumberSec3, this._('docnumbersec3.tooltip'))
                .attr('tabindex', tabIndex++);
            this._docNumberSec3Help = this.renderHelpIcon(docNumberSec3Help, this._('docnumbersec3help.caption'), this._('docnumbersec3help.text'));
            this._expDateSec3 = this.renderControl(expDateSec3, this._('expdatesec3.tooltip'), true, 'left')
                .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled').off('keypress')
                .on('keypress', e => /[\d/]/g.test(e.key) || this.NAFormat.test(e.key) || e.key === this.backSpaceCode)
                .attr('tabindex', tabIndex++);
            this._expDateSec3Help = this.renderHelpIcon(expDateSec3Help, this._('expdatesec3help.caption'), this._('expdatesec3help.text'));
            this._sgnEmployerSec3 = this.renderControl(sgnEmployerSec3, this._('sgnemployersec3.tooltip'))
                .attr('tabindex', tabIndex++);
            this._sgnEmployerSec3Help = this.renderHelpIcon(sgnEmployerSec3Help, this._('sgnemployersec3help.caption'), this._('sgnemployersec3help.text'));
            this._signDateSec3 = this.renderControl(signDateSec3, this._('employersigndatesec3.tooltip'), true, 'left')
                .datepicker({ minDate: new Date() }).attr('autocomplete', 'disabled')
                .attr(this.annotationRequired, 'true')
                .attr('readonly', 'true')
                .on('focus', () => this._signDateSec3.removeAttr('readonly'))
                .on('blur', () => this._signDateSec3.attr('readonly', 'true'))
                .attr('tabindex', tabIndex++);
            this._signDateSec3Help = this.renderHelpIcon(signDateSec3Help, this._('employersigndatesec3help.caption'), this._('employersigndatesec3help.text'));
            this._employerNameSec3 = this.renderControl(employerNameSec3, this._('employernamesec3.tooltip'))
                .attr(this.annotationRequired, 'true')
                .attr('tabindex', tabIndex++);
            this._employerNameSec3Help = this.renderHelpIcon(employerNameSec3Help, this._('employernamesec3help.caption'), this._('employernamesec3help.text'));
            return tabIndex;
        }
        validateFields(confirmFlag) {
            const errorMessages = super.validateFields(confirmFlag);
            const section3Fields = [this._newlastName, this._newfirstName, this._newmiddleInitial, this._rehireDate,
                this._docTitleSec3, this._docNumberSec3, this._expDateSec3, this._sgnEmployerSec3,
                this._signDateSec3, this._employerNameSec3];
            section3Fields.forEach(f => f && f.toggleClass(this.invalidFieldClass, false));
            if (section3Fields.filter(e => e && e.val() && e.val() !== '').length > 0) {
                [this._newlastName, this._newfirstName, this._newmiddleInitial, this._rehireDate,
                    this._docTitleSec3, this._docNumberSec3, this._expDateSec3].filter(f => f.val() === '' || f.val().toUpperCase() === this.na)
                    .forEach(f => f && f.val(this.na));
                this.validateTextField(this._newlastName, this._('name.last') + this.space + this._('section3.suffix'), [this.nameFormat, this.NAString], false, errorMessages);
                this.validateTextField(this._newfirstName, this._('name.first') + this.space + this._('section3.suffix'), [this.nameFormat, this.NAString], false, errorMessages);
                this.validateTextField(this._newmiddleInitial, this._('name.middleinitial') + this.space + this._('section3.suffix'), [this.nameInitialFormat, this.NAString], false, errorMessages);
                this.validateTextField(this._rehireDate, this._('section3.rehire'), [this.dateFormat, this.NAString], true, errorMessages);
                let fieldValidationExpression = /^[a-zA-Z0-9]+$/;
                switch (this._docTitleSec3.val()) {
                    case '1':
                    case '2':
                        fieldValidationExpression = this.usPassportNumberFormat;
                        break;
                    case '3':
                    case '4':
                        fieldValidationExpression = this.greenCardNumberFormat;
                        break;
                    case '5':
                    case '6':
                    case '8':
                    case '9':
                    case '10':
                        fieldValidationExpression = this.passportNumberFormat;
                        break;
                    case '7':
                        fieldValidationExpression = this.cardNumberFormat;
                        break;
                    case '11':
                    case '12':
                        fieldValidationExpression = this.admissionNumberFormat;
                        break;
                    case '13':
                        fieldValidationExpression = this.ssnFormat;
                        break;
                    case '14':
                    case '15':
                    case '16':
                    case '17':
                    case '18':
                    case '19':
                    case '20':
                    case '21':
                    case '22':
                    case '23':
                    case '24':
                    case '25':
                    case '26':
                    case '27':
                    case '28':
                    case '29':
                    case '30':
                        break;
                }
                this.validateTextField(this._docNumberSec3, this._('section3.docnumber') + this.space + this._('section3.suffix'), [fieldValidationExpression, this.NAString], false, errorMessages);
                this.validateTextField(this._expDateSec3, this._('section3.expdate') + this.space + this._('section3.suffix'), [this.dateFormat, this.NAString], false, errorMessages);
                this.validateTextField(this._signDateSec3, this._('section3.today') + this.space + this._('section3.suffix'), [this.dateFormat], true, errorMessages);
                this.validateTextField(this._employerNameSec3, this._('section3.employer') + this.space + this._('section3.suffix'), [this.nameFormat], true, errorMessages);
            }
            return errorMessages;
        }
        processLPR(flag) {
            var na = flag ? this.na : '';
            this._lpruscisNumPrefix.val('');
            this._lpruscisNum.prop('disabled', true).val(na);
            this._lpruscisNumType.prop('disabled', true);
            this.filterCombolist(this._lpruscisNumType, {}, null, this, this.processListABC);
        }
        processAlien(flag) {
            var na = flag ? this.na : '';
            this._alienWorkAuthDate.prop('disabled', true).val(na);
            this._alienuscisNumPrefix.val('');
            this._alienuscisNum.prop('disabled', true).val(na);
            this._alienuscisNumType.prop('disabled', true);
            this._admissionNum.prop('disabled', true).val(na);
            this._passportNum.prop('disabled', true).val(na);
            this._countryOfIssuance.prop('disabled', true);
            this.filterCombolist(this._alienuscisNumType, {}, null, this, this.processListABC);
            this.filterCombolist(this._countryOfIssuance, flag ? { 0: na } : {}, flag ? '0' : null, this, this.processListABC);
        }
    }
    exports.USI9Section3 = USI9Section3;
});
define("USI9", ["require", "exports", "Section3"], function (require, exports, Section3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.USI9 = void 0;
    class USI9 extends Section3_1.USI9Section3 {
        constructor() {
            super(...arguments);
            this.validateUSI9 = (ctrl, confirmFlag) => this.validateForm(ctrl, this.validateFields(confirmFlag));
        }
        prepareData() {
            const service = PDFViewerApplication.transformationService;
            service.url = '/?rest_route=/UpdateForm';
            service.session_id = this.urlParameter('session_id');
            service.fields_data.file = PDFViewerApplication.url;
            service.fields_data.operation = 'f';
            const readOnlyFieldsToFlat = ['LPRUSCISNumber', 'LPRUSCISNumberPrefix', 'AlienUSCISNumberPrefix',
                'AlienWorkAuthorizationDate', 'AlienUSCISNumber',
                'AdmissionNumber', 'ForeignPassportNumber', 'CountryOfIssuance',
                'LastNameSection2', 'FirstNameSection2',
                'MiddleInitialSection2', 'ImmigrationStatus'];
            $(`[${this.annotationName}]`).each((i, ctrl) => {
                if ((!ctrl.disabled || readOnlyFieldsToFlat.indexOf(ctrl.getAttribute(this.annotationName)) > -1) && ctrl.value && ctrl.value !== '') {
                    service.fields_data.entries.push({
                        name: ctrl.getAttribute(this.annotationName),
                        value: ctrl.type === 'checkbox' ? (ctrl.checked ? 'On' : 'Off') : ctrl.value,
                        operation: 's'
                    });
                }
            });
        }
        prepareFirstPage(tabIndex) {
            tabIndex = this.renderSection1(tabIndex, $(`[${this.annotationName}=LastName]`), $(`[${this.annotationName}=LastNameHelp]`), $(`[${this.annotationName}=FirstName]`), $(`[${this.annotationName}=FirstNameHelp]`), $(`[${this.annotationName}=MiddleInitial]`), $(`[${this.annotationName}=MiddleInitialHelp]`), $(`[${this.annotationName}=OtherNames]`), $(`[${this.annotationName}=OtherNamesHelp]`), $(`[${this.annotationName}=Address]`), $(`[${this.annotationName}=AddressHelp]`), $(`[${this.annotationName}=ApartmentNumber]`), $(`[${this.annotationName}=ApartmentNumberHelp]`), $(`[${this.annotationName}=City]`), $(`[${this.annotationName}=CityHelp]`), $(`[${this.annotationName}=State]`), $(`[${this.annotationName}=StateHelp]`), $(`[${this.annotationName}=Zip]`), $(`[${this.annotationName}=ZipHelp]`), $(`[${this.annotationName}=DateOfBirth]`), $(`[${this.annotationName}=DateOfBirthHelp]`), $(`[${this.annotationName}=SSN11]`), $(`[${this.annotationName}=SSN12]`), $(`[${this.annotationName}=SSN13]`), $(`[${this.annotationName}=SSN21]`), $(`[${this.annotationName}=SSN22]`), $(`[${this.annotationName}=SSN31]`), $(`[${this.annotationName}=SSN32]`), $(`[${this.annotationName}=SSN33]`), $(`[${this.annotationName}=SSN34]`), $(`[${this.annotationName}=SSNHelp]`), $(`[${this.annotationName}=Email]`), $(`[${this.annotationName}=EmailHelp]`), $(`[${this.annotationName}=Phone]`), $(`[${this.annotationName}=PhoneHelp]`), $(`[${this.annotationName}=Citizen]`), $(`[${this.annotationName}=CitizenHelp]`), $(`[${this.annotationName}=NonCitizenNational]`), $(`[${this.annotationName}=NonCitizenNationalHelp]`), $(`[${this.annotationName}=LawfulPermanentResident]`), $(`[${this.annotationName}=LawfulPermanentResidentHelp]`), $(`[${this.annotationName}=AlienAuthorizedToWork]`), $(`[${this.annotationName}=AlienAuthorizedToWorkHelp]`), $(`[${this.annotationName}=USCISNumberHelp]`), $(`[${this.annotationName}=LPRUSCISNumberPrefix]`), $(`[${this.annotationName}=LPRUSCISNumber]`), $(`[${this.annotationName}=LPRUSCISNumberType]`), $(`[${this.annotationName}=AlienWorkAuthorizationDate]`), $(`[${this.annotationName}=AlienUSCISNumberPrefix]`), $(`[${this.annotationName}=AlienUSCISNumber]`), $(`[${this.annotationName}=AlienUSCISNumberType]`), $(`[${this.annotationName}=AdmissionNumber]`), $(`[${this.annotationName}=AdmissionNumberHelp]`), $(`[${this.annotationName}=ForeignPassportNumber]`), $(`[${this.annotationName}=ForeignPassportNumberHelp]`), $(`[${this.annotationName}=CountryOfIssuance]`), $(`[${this.annotationName}=CountryOfIssuanceHelp]`), $(`[${this.annotationName}=sgnEmployee]`), $(`[${this.annotationName}=sgnEmployeeHelp]`), $(`[${this.annotationName}=sgnEmployeeDate]`), $(`[${this.annotationName}=sgnEmployeeDateHelp]`));
            tabIndex = this.renderTranslatorSection(tabIndex, $(`[${this.annotationName}=PreparerOrTranslatorNo]`), $(`[${this.annotationName}=PreparerOrTranslatorYes]`), $(`[${this.annotationName}=PreparerOrTranslatorHelp]`), $(`[${this.annotationName}=sgnTranslator]`), $(`[${this.annotationName}=sgnTranslatorHelp]`), $(`[${this.annotationName}=TranslatorDate]`), $(`[${this.annotationName}=TranslatorDateHelp]`), $(`[${this.annotationName}=TranslatorLastName]`), $(`[${this.annotationName}=TranslatorLastNameHelp]`), $(`[${this.annotationName}=TranslatorFirstName]`), $(`[${this.annotationName}=TranslatorFirstNameHelp]`), $(`[${this.annotationName}=TranslatorAddress]`), $(`[${this.annotationName}=TranslatorAddressHelp]`), $(`[${this.annotationName}=TranslatorCity]`), $(`[${this.annotationName}=TranslatorCityHelp]`), $(`[${this.annotationName}=TranslatorState]`), $(`[${this.annotationName}=TranslatorStateHelp]`), $(`[${this.annotationName}=TranslatorZip]`), $(`[${this.annotationName}=TranslatorZipHelp]`));
            return tabIndex;
        }
        prepareSecondPage(tabIndex) {
            tabIndex = this.renderSection2(tabIndex, $(`[${this.annotationName}=EmployeeInfoSection2Help]`), $(`[${this.annotationName}=LastNameSection2]`), $(`[${this.annotationName}=LastNameSection2Help]`), $(`[${this.annotationName}=FirstNameSection2]`), $(`[${this.annotationName}=FirstNameSection2Help]`), $(`[${this.annotationName}=MiddleInitialSection2]`), $(`[${this.annotationName}=MiddleInitialSection2Help]`), $(`[${this.annotationName}=ImmigrationStatus]`), $(`[${this.annotationName}=ImmigrationStatusHelp]`), $(`[${this.annotationName}=ListADocTitle]`), $(`[${this.annotationName}=ListADocTitleHelp]`), $(`[${this.annotationName}=ListAIssuingAuthority]`), $(`[${this.annotationName}=ListAIssuingAuthorityHelp]`), $(`[${this.annotationName}=ListADocNumber]`), $(`[${this.annotationName}=ListADocNumberHelp]`), $(`[${this.annotationName}=ListAExpDate]`), $(`[${this.annotationName}=ListAExpDateHelp]`), $(`[${this.annotationName}=ListADocTitle2]`), $(`[${this.annotationName}=ListADocTitle2Help]`), $(`[${this.annotationName}=ListAIssuingAuthority2]`), $(`[${this.annotationName}=ListAIssuingAuthority2Help]`), $(`[${this.annotationName}=ListADocNumber2]`), $(`[${this.annotationName}=ListADocNumber2Help]`), $(`[${this.annotationName}=ListAExpDate2]`), $(`[${this.annotationName}=ListAExpDate2Help]`), $(`[${this.annotationName}=ListADocTitle3]`), $(`[${this.annotationName}=ListADocTitle3Help]`), $(`[${this.annotationName}=ListAIssuingAuthority3]`), $(`[${this.annotationName}=ListAIssuingAuthority3Help]`), $(`[${this.annotationName}=ListADocNumber3]`), $(`[${this.annotationName}=ListADocNumber3Help]`), $(`[${this.annotationName}=ListAExpDate3]`), $(`[${this.annotationName}=ListAExpDate3Help]`), $(`[${this.annotationName}=ListBDocTitle]`), $(`[${this.annotationName}=ListBDocTitleHelp]`), $(`[${this.annotationName}=ListBIssuingAuthority]`), $(`[${this.annotationName}=ListBIssuingAuthorityHelp]`), $(`[${this.annotationName}=ListBDocNumber]`), $(`[${this.annotationName}=ListBDocNumberHelp]`), $(`[${this.annotationName}=ListBExpDate]`), $(`[${this.annotationName}=ListBExpDateHelp]`), $(`[${this.annotationName}=ListCDocTitle]`), $(`[${this.annotationName}=ListCDocTitleHelp]`), $(`[${this.annotationName}=ListCIssuingAuthority]`), $(`[${this.annotationName}=ListCIssuingAuthorityHelp]`), $(`[${this.annotationName}=ListCDocNumber]`), $(`[${this.annotationName}=ListCDocNumberHelp]`), $(`[${this.annotationName}=ListCExpDate]`), $(`[${this.annotationName}=ListCExpDateHelp]`), $(`[${this.annotationName}=AdditionalInfo]`), $(`[${this.annotationName}=AdditionalInfoHelp]`), $(`[${this.annotationName}=HireDate]`), $(`[${this.annotationName}=HireDateHelp]`), $(`[${this.annotationName}=sgnEmployer]`), $(`[${this.annotationName}=sgnEmployerHelp]`), $(`[${this.annotationName}=EmployerSignDate]`), $(`[${this.annotationName}=EmployerSignDateHelp]`), $(`[${this.annotationName}=EmployerTitle]`), $(`[${this.annotationName}=EmployerTitleHelp]`), $(`[${this.annotationName}=EmployerLastName]`), $(`[${this.annotationName}=EmployerLastNameHelp]`), $(`[${this.annotationName}=EmployerFirstName]`), $(`[${this.annotationName}=EmployerFirstNameHelp]`), $(`[${this.annotationName}=EmployerName]`), $(`[${this.annotationName}=EmployerNameHelp]`), $(`[${this.annotationName}=EmployerAddress]`), $(`[${this.annotationName}=EmployerAddressHelp]`), $(`[${this.annotationName}=EmployerCity]`), $(`[${this.annotationName}=EmployerCityHelp]`), $(`[${this.annotationName}=EmployerState]`), $(`[${this.annotationName}=EmployerStateHelp]`), $(`[${this.annotationName}=EmployerZip]`), $(`[${this.annotationName}=EmployerZipHelp]`));
            tabIndex = this.renderSection3(tabIndex, $(`[${this.annotationName}=NewLastName]`), $(`[${this.annotationName}=NewLastNameHelp]`), $(`[${this.annotationName}=NewFirstName]`), $(`[${this.annotationName}=NewFirstNameHelp]`), $(`[${this.annotationName}=NewMiddleInitial]`), $(`[${this.annotationName}=NewMiddleInitialHelp]`), $(`[${this.annotationName}=RehireDate]`), $(`[${this.annotationName}=RehireDateHelp]`), $(`[${this.annotationName}=DocTitleSec3]`), $(`[${this.annotationName}=DocTitleSec3Help]`), $(`[${this.annotationName}=DocNumberSec3]`), $(`[${this.annotationName}=DocNumberSec3Help]`), $(`[${this.annotationName}=ExpDateSec3]`), $(`[${this.annotationName}=ExpDateSec3Help]`), $(`[${this.annotationName}=sgnEmployerSec3]`), $(`[${this.annotationName}=sgnEmployerSec3Help]`), $(`[${this.annotationName}=SignDateSec3]`), $(`[${this.annotationName}=SignDateSec3Help]`), $(`[${this.annotationName}=EmployerNameSec3]`), $(`[${this.annotationName}=EmployerNameSec3Help]`));
            return tabIndex;
        }
        renderSections() {
            this.prepareSecondPage(this.prepareFirstPage(100));
            const eventBus = PDFViewerApplication.eventBus;
            this.toolbarButtons.forEach(e => {
                const eventFuncs = eventBus.get(e);
                eventBus.remove(e);
                eventBus.on(e, () => this.validateDocuments((confirmFlag) => this.validateUSI9($(`#${e}`), confirmFlag).then(() => {
                    this.prepareData();
                    eventFuncs.forEach((f) => f.listener());
                }).catch((ctrl) => ctrl.popover('show'))));
            });
        }
    }
    exports.USI9 = USI9;
});
define("Init", ["require", "exports", "USI9"], function (require, exports, USI9_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const renderedPages = [false, false, false];
    let form = null;
    const initializationFunction = () => {
        if (PDFViewerApplication.eventBus && PDFViewerApplication.pdfViewer &&
            PDFViewerApplication.pdfViewer.getPageView && document.webL10n) {
            PDFViewerApplication.eventBus.on('textlayerrendered', (e) => {
                const pdfViewer = PDFViewerApplication.pdfViewer;
                $('a').attr('target', '_blank');
                renderedPages[e.pageNumber - 1] = true;
                if (e.pageNumber === 1 && !renderedPages[1]) {
                    pdfViewer.getPageView(1);
                    return;
                }
                if (e.pageNumber >= 2 && !renderedPages[0]) {
                    pdfViewer.getPageView(0);
                    return;
                }
                if (renderedPages[0] && renderedPages[1] && form == null) {
                    form = new USI9_1.USI9(document.webL10n);
                    form.renderSections();
                }
            });
        }
        else {
            setTimeout(initializationFunction, 100);
        }
    };
    setTimeout(initializationFunction, 100);
});
