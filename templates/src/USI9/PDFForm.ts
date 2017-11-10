class PDFForm {
    protected nameFormat = /^[A-Za-z ']+$/;
    protected nameInitialFormat = /^[A-Za-z]{1}$/;
    protected stateFormat = /^[A-Z]{2,3}$/;
    protected NAFormat = /^[NA/]+$/;
    protected NAString = /^N\/A$/;
    protected DSFormat = /^[DS/]+$/;
    protected zipFormat = /^\d+$/;
    protected postalFormat = /^[A-Za-z0-9]+$/;
    protected zipNumberFormat = /^\d{5}$/;
    protected postalCodeFormat = /^[A-Za-z0-9]{6}$/;
    protected dateFormat = /^\d{2}[/]{1}\d{2}[/]{1}\d{4}$/;
    protected numberFormat = /^\d{1}$/;
    protected emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    protected phoneFormat = /^[\d/NA-]+$/;
    protected phoneNumber = /^\d{3}\-{1}\d{3}\-{1}\d{4}$/;
    protected uscisNumberFormat = /^\d{7,9}$/;
    protected admissionNumberFormat = /^\d{11}$/;
    protected usPassportNumberFormat = /^[a-zA-Z0-9]{6,9}$/;
    protected cardNumberFormat = /^[A-Za-z]{3}[0-9]{10}$/;
    protected passportNumberFormat = /^[a-zA-Z0-9]{6,12}$/;
    protected driverLicenseNumberFormat = /^[a-zA-Z0-9]{8,14}$/;
    protected ssnFormat = /^\d{3}[-]*\d{2}[-]*\d{4}$/;

    protected annotationName = 'annotation-name';
    protected annotationRequired = 'annotation-required';
    protected na = this._('NA');
    protected blankItem = '&nbsp;';

    constructor() {
        let self = this;

        $(document).tooltip({
            show: { delay: 200 }
        });

        let monthNames:string[] = [];
        let monthNamesShort:string[] = [];
        let dayNames:string[] = [];
        let dayNamesShort:string[] = [];
        let dayNamesMin:string[] = [];

        $.each(JSON.parse(this._('monthNames')), (index, value) => {
            monthNamesShort.push(index);
            monthNames.push(value);
        })

        $.each(JSON.parse(this._('dayNames')), (index, value) => {
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
            yearSuffix: '' }
        )
    }

    protected _(t: string): string {
        return (document as any).webL10n.get(t);
    }

    protected selectCheckmark(ctrl: JQuery<HTMLElement>, arr: Array<JQuery<HTMLElement>>) {
        for (var c in arr) {
            if (arr[c].attr(this.annotationName) !== ctrl.attr(this.annotationName)) {
                arr[c].prop('checked', false);
                arr[c].parent().children('span').text('');
            }
        }
    }

    protected setCombolistValue(ctrl: JQuery<HTMLElement>, val: string) {
        var options = ctrl.parent().children().filter('.combo-content');
        options.children().filter('[value="' + val + '"]').each((index, value) => {
            value.onclick(null);
        });
    }

    protected filterCombolist(
        ctrl: JQuery<HTMLElement>,
        items: { [index: string]: string; },
        defaultValue: string,
        fields: USI9Section2,
        callback: (ddl: string, code: string, parent: USI9Section2) => any) {
        if (!ctrl) {
            return;
        }

        var options = ctrl.parent().children().filter('.combo-content');

        for (let index in items) {
            options.children().filter('[value="' + index + '"]').html(items[index]);
        }

        options.children().show();
        options.children().each((code: number, item: HTMLElement) => {
            var val = item.getAttribute('value');
            if (items && !(val in items)) {
                options.children().filter('[value="' + val + '"]').hide();
            }
        });

        if (callback) {
            options.children().click(e => {
                let inputText = (e.target.parentNode.parentNode as HTMLElement).getElementsByTagName('input')[0];
                if (e.target.innerHTML === this.blankItem) {
                    inputText.value = '';
                }

                callback(
                    inputText.getAttribute(this.annotationName),
                    e.target.getAttribute('value'),
                    fields
                );
            });
        }

        if (defaultValue) {
            this.setCombolistValue(ctrl, defaultValue);
        }
        else {
            ctrl.val('');
        }
    }

    protected assignCombolistEventHandler(ctrl: JQuery<HTMLElement>, f: JQuery.EventHandler<HTMLElement>) {
        ctrl.parent().children().filter('.combo-content').click(f);
    }

    protected hideTooltip() {
        $('.ui-tooltip').hide();
    }

    protected renderHelpIcon(ctrl: JQuery<HTMLElement>, title: string, dialog: JQuery<HTMLElement>, text: string, minWidth = 50) {
        let self = this;

        let tag = 'div';

        ctrl.hide().parent().children(tag).remove();

        return ctrl.parent().append('<' + tag + '>�</' + tag + '>')
        .children(tag).prop('title', title)
        .css({'color': ctrl.css('color'),
        'font-size': ctrl.css('font-size')})
        .toggleClass('icon').parent().click(() => {
            self.hideTooltip();

            $('.ui-dialog-titlebar-close').attr('title', '');

            dialog.text('').append(decodeURIComponent(text))
                .dialog('option', 'title', self._('help'))
                .dialog('option', 'minWidth', minWidth).dialog('open');
        });
    }
}