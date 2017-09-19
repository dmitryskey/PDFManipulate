class PDFForm {
    protected nameFormat = /^[A-Za-z ']+$/;
    protected NAFormat = /^[NA/]+$/;
    protected DSFormat = /^[DS/]+$/;
    protected zipFormat = /^[\d-]+$/;
    protected zipNumber = /^(\d{5})(-\d{4}){0,1}$/;
    protected dateFormat = /^\d{2}[/]{1}\d{2}[/]{1}\d{4}$/;
    protected numberFormat = /^\d{1}$/;
    protected phoneFormat = /^[\d/NA-]+$/;
    protected phoneNumber = /^[(]{0,1}\d{3}[ )-]{0,1}\d{3}[ -]{0,1}\d{4}$/;
    protected usPassportNumber = /^[a-zA-Z0-9]{6,9}$/;
    protected cardNumber = /^[A-Za-z]{3}[0-9]{10}$/;
    protected passportNumber = /^[a-zA-Z0-9]{6,12}$/;
    protected i94Number = /^\d{11}$/;

    constructor() {
        let self = this;

        $(document).tooltip({
            show: {
                delay: 200
            }
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

    protected _(t: string) {
        return (document as any).webL10n.get(t);
    }

    protected selectCheckmark(ctrl: JQuery<HTMLElement>, arr: Array<JQuery<HTMLElement>>) {
        for (var c in arr) {
            if (arr[c] !== ctrl) {
                arr[c].prop('checked', false);
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
        return ctrl.prop('title', title).attr('icon', 'true').
            val(String.fromCharCode(0xFFFD)).
            toggleClass('noHighlight').parent().click(() => {
                ctrl.blur();

                self.hideTooltip();

                $('.ui-dialog-titlebar-close').attr('title', '');

                dialog.text('').append(decodeURIComponent(text)).
                    dialog('option', 'minWidth', minWidth).dialog('open');              
            });
    }
}