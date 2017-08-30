class PDFForm {
    protected nameFormat = /^[A-Za-z ']+$/;
    protected NAFormat = /^[NA/]+$/;
    protected zipFormat = /^[\d-]+$/;
    protected zipNumber = /^(\d{5})(-\d{4}){0,1}$/;
    protected dateFormat = /^\d{2}[/]{1}\d{2}[/]{1}\d{4}$/;
    protected numberFormat = /^\d{1}$/;
    protected phoneFormat = /^[\d/NA-]+$/;
    protected phoneNumber = /^[(]{0,1}\d{3}[ )-]{0,1}\d{3}[ -]{0,1}\d{4}$/;

    constructor() {
        $(document).tooltip({
            show: {
                delay: 200
            },
            open: function open(event: Event, ui: any) {
                return setTimeout(function () {
                    return $(ui.tooltip).hide('fadeOut');
                }, 5000);
            },
            position: {
                my: 'center bottom',
                at: 'center top' }
        });
    
        $.datepicker.regional.es = {
            closeText: 'Cerrar',
            prevText: '&#x3C;Ant',
            nextText: 'Sig&#x3E;',
            currentText: 'Hoy',
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            weekHeader: 'Sm',
            dateFormat: 'mm/dd/yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: '' };
        
        $.datepicker.setDefaults($.datepicker.regional.es);
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
        callback: any) {
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
                e.target.getAttribute('value'));
        });

        options.children().filter('[value="' + (defaultValue ? defaultValue : '') + '"]').click();

        if (defaultValue === null) {
            ctrl.val('');
        }
    }

    protected assignCombolistEventHandler(ctrl: JQuery<HTMLElement>, f: JQuery.EventHandler<HTMLElement>) {
        ctrl.parent().children().filter('.combo-content').click(f);
    }

    protected renderHelpIcon(ctrl: JQuery<HTMLElement>, title: string, dialog: JQuery<HTMLElement>, text: string, minWidth = 50) {
        return ctrl.prop('title', title).attr('icon', 'true').
            val(String.fromCharCode(0xFFFD)).
            toggleClass('noHighlight').parent().click(() => {
                ctrl.blur();
                (dialog.text('').append(text) as any).
                    dialog('option', 'minWidth', minWidth).dialog('open');              
            });
    }
}