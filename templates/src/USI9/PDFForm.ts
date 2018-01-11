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
    protected annotationNext = 'annotation-next';
    protected na = this._('NA');
    protected space = ' ';
    protected blankItem = '&nbsp;';
    protected backSpaceCode = 'Backspace';

    protected _(t: string): string {
        return (document as any).webL10n.get(t);
    }

    constructor() {
        let self = this;

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

    protected setCombolistText(ctrl: JQuery<HTMLElement>, val: string, txt: string) {
        var options = ctrl.parent().children().filter('.combo-content');
        options.children().filter('[value="' + val + '"]').html(txt);
    }

    protected assignCombolistEventHandler(ctrl: JQuery<HTMLElement>, f: JQuery.EventHandler<HTMLElement>) {
        ctrl.parent().children().filter('.combo-content').click(f);
    }

    protected renderControl(ctrl: JQuery<HTMLElement>, text: string) : JQuery<HTMLElement> {
        if (navigator.platform.indexOf('iPad') != -1 || navigator.platform.indexOf('iPhone') != -1) {
            return ctrl;
        } else {
            return ctrl.focus(e => $(e.target).tooltip('close')).prop('title', '')
            .tooltip({ content: text, show: { delay: 1000 } });
        }
    }

    protected renderHelpIcon(
        ctrl: JQuery<HTMLElement>,
        title: string,
        dialog: JQuery<HTMLElement>,
        text: string,
        minWidth = 50) : JQuery<HTMLElement> {
        let self = this;

        let tag = 'div';

        ctrl.hide().parent().children(tag).remove();

        return ctrl.parent().append('<' + tag + '>�</' + tag + '>')
        .children(tag).prop('title', title)
        .css({'color': ctrl.css('color'),
        'font-size': ctrl.css('font-size')})
        .toggleClass('icon').parent().click(e => {
            $('.ui-dialog-titlebar-close').attr('title', '');

            dialog.text('').append(decodeURIComponent(text))
                .dialog('option', 'title', self._('help'))
                .dialog('option', 'minWidth', minWidth).dialog('open');
        });
    }

    protected urlParameter(name: string) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results === null) {
           return null;
        }
        else {
           return decodeURI(results[1]) || 0;
        }
    }

    protected addDialog() {
        $('body').append('<div id="dialogPage"></div>');

        $('#dialogPage').dialog({
            minHeight: 50,
            minWidth: 50,
            autoOpen: false,
            buttons: [{
                  text: 'OK',
                  click: function() {
                    $(this).dialog('close');
                  }
                }]
        });
    }
}