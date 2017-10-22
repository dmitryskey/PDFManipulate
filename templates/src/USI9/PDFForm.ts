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
    protected admissionNumberFormat = /^\d{1}$/;
    protected usPassportNumber = /^[a-zA-Z0-9]{6,9}$/;
    protected cardNumber = /^[A-Za-z]{3}[0-9]{10}$/;
    protected passportNumber = /^[a-zA-Z0-9]{6,12}$/;
    protected i94Number = /^\d{11}$/;

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
            if (arr[c] !== ctrl) {
                arr[c].prop('checked', false);
                arr[c].parent().children('span').text('');
            }
        }
    }

    protected filterCombolist(
        ctrl: JQuery<HTMLElement>,
        items: { [index: string]: string; },
        defaultValue: string,
        fields: USI9Fields,
        callback: any) {
        if (!ctrl) {
            return;
        }

        var options = ctrl.parent().children().filter('.combo-content');
        for (let index in items) {
            options.children().filter('[value="' + index + '"]').text(items[index]);
        }

        options.children().show();
        options.children().each((code: number, item: HTMLElement) => {
            var val = item.getAttribute('value');
            if (!(val in items)) {
                options.children().filter('[value="' + val + '"]').hide();
            }
        });

        options.children().click(e => {
            callback(
                (e.target.parentNode.parentNode as any).getElementsByTagName('input')[0].getAttribute('name'),
                e.target.getAttribute('value'),
                fields
            );
        });

        options.children().filter('[value="' + (defaultValue ? defaultValue : '') + '"]').click();

        if (defaultValue === null) {
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