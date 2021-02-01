export class PDFForm {
    protected nameFormat = /^[A-Za-z ']+$/;
    protected nameInitialFormat = /^[A-Za-z]{1}$/;
    protected stateFormat = /^[A-Z]{2,3}$/;
    protected NAFormat = /^[NnAa/]+$/;
    protected NAString = /^N\/A$/;
    protected zipFormat = /^[0-9]+$/;
    protected postalFormat = /^[A-Za-z0-9]+$/;
    protected zipNumberFormat = /^[0-9]{5}$/;
    protected postalCodeFormat = /^[A-Za-z0-9]{6}$/;
    protected dateFormat = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/;
    protected numberFormat = /^[0-9]{1}$/;
    protected alphaNumericFormat = /^[0-9a-zA-Z]{1}$/;
    protected alphaNumericWithDashesFormat = /^[a-zA-Z0-9]{1}|-{1}$/;
    protected emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    protected phoneFormat = /^[0-9/NA-]+$/;
    protected phoneNumber = /^[0-9]{3}-{1}[0-9]{3}-{1}[0-9]{4}$/;
    protected uscisNumberFormat = /^[0-9]{7,9}$/;
    protected admissionNumberFormat = /^[0-9]{9}[a-zA-Z]{1}[0-9]{1}$|^[0-9]{11}$/;
    protected usPassportNumberFormat = /^[a-zA-Z0-9]{6,9}$/;
    protected greenCardNumberFormat = /^[A-Za-z]{3}[0-9]{10}$|^[0-9]{7,9}$|^[0-9]{3}-{0,1}[0-9]{3}-{0,1}[0-9]{3}$/;
    protected cardNumberFormat = /^[A-Za-z]{3}[0-9]{10}$/;
    protected passportNumberFormat = /^[a-zA-Z0-9]{6,12}$/;
    protected driverLicenseNumberFormat = /^[a-zA-Z0-9]{8,14}$/;
    protected ssnFormat = /^[0-9]{3}[-]*[0-9]{2}[-]*[0-9]{4}$/;

    protected annotationName = 'annotation-name';
    protected annotationRequired = 'annotation-required';
    protected annotationNext = 'annotation-next';
    protected na: string;
    protected space = ' ';
    protected blankItem = '&nbsp;';
    protected backSpaceCode = 'Backspace';

    protected parentProp = 'parent';
    protected toolbarButtons = ['print', 'download'];

    private webL10n: any;

    protected _ (t: string, defaultValue : string = null): string {
        return this.webL10n ? (this.webL10n.get(t) as string).replace('#', '&#35;') : (defaultValue ?? t)
    }

    constructor (webL10n: any) {
        this.webL10n = webL10n

        this.na = this._('NA')

        const monthNames:string[] = []
        const monthNamesShort:string[] = []
        const dayNames:string[] = []
        const dayNamesShort:string[] = []
        const dayNamesMin:string[] = []

        $.each(JSON.parse(this._('monthNames', '{}')), (index, value) => {
            monthNamesShort.push(index as string)
            monthNames.push(value)
        })

        $.each(JSON.parse(this._('dayNames', '{}')), (index, value) => {
            dayNamesMin.push(index as string)
            $.each(value, (i, v) => {
                dayNamesShort.push(i as string)
                dayNames.push(v)
            })
        })

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
        })

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
        </div>`)
    }

    protected selectCheckmark (ctrl: JQuery<HTMLElement>, arr: Array<JQuery<HTMLElement>>) {
        for (var a of arr) {
            if (a.attr(this.annotationName) !== ctrl.attr(this.annotationName)) {
                a.prop('checked', false).parent().children('span').text('')
            }
        }
    }

    protected setCombolistValue = (ctrl: JQuery<HTMLElement>, val: string) =>
        ctrl.parent().children().filter('.combo-content').children()
            .filter(`[value='${val}']`).each((index, value) => value.onclick(null))

    protected setCombolistText = (ctrl: JQuery<HTMLElement>, val: string, txt: string) =>
        ctrl.parent().children().filter('.combo-content').children()
            .filter(`[value='${val}']`).html(txt)

    protected assignCombolistEventHandler = (ctrl: JQuery<HTMLElement>, f: JQuery.EventHandler<HTMLElement>) =>
        ctrl.parent().children().filter('.combo-content').click(f)

    protected renderControl (
        ctrl: JQuery<HTMLElement>,
        text: string, onFocus: boolean = true,
        placement: Bootstrap.Placement = 'bottom')
         : JQuery<HTMLElement> {
        ctrl.parent().children().filter('span').click(() => ctrl.popover('hide'))
        return ctrl.popover({ html: true, content: text, trigger: onFocus ? 'focus' : 'hover', placement: placement })
    }

    protected renderHelpIcon (ctrl: JQuery<HTMLElement>, title: string, text: string, maxWidth: string = '30')
        : JQuery<HTMLElement> {
        const tag = 'i'
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
                const ctrl = $(e.target)
                ctrl.tooltip('hide').popover('show')
                $('body').off('mouseup').on('mouseup', ev => {
                    if (!ctrl.popover().is(ev.target) && ctrl.popover().has(ev.target).length === 0 &&
                        ctrl !== $(ev.target)) {
                        ctrl.popover('hide')
                    }
                })
            })
    }

    protected urlParameter (name: string) : string {
        var results = new RegExp(`[?&]${name}=([^&#]*)`).exec(window.location.href)
        return results === null ? null : decodeURI(results[1]) || ''
    }

    protected validateForm = (
        ctrl: JQuery<HTMLElement>,
        errorMessages : string[]) : Promise<JQuery<HTMLElement>> =>
        new Promise((resolve, reject) => {
            ctrl.popover('dispose')
            if (errorMessages.length > 0) {
                let errorMessage = `${this._('error.header')}<br />`
                errorMessages.forEach(e => { errorMessage += ` - ${e}<br />` })

                ctrl.popover({
                    html: true,
                    title: this._('validation'),
                    content: errorMessage,
                    trigger: 'click',
                    placement: 'bottom'
                })

                $('body').off('mouseup').on('mouseup', e => {
                    if (!ctrl.popover().is(e.target) && ctrl.popover().has(e.target).length === 0 &&
                        ctrl !== $(e.target)) {
                        ctrl.popover('hide')
                    }
                })

                reject(ctrl)
            } else {
                resolve(ctrl)
            }
        })
}
