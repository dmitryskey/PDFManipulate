class PDFForm {
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
    protected numberWithDashesFormat = /^[0-9]{1}|\-{1}$/;
    protected emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    protected phoneFormat = /^[0-9/NA-]+$/;
    protected phoneNumber = /^[0-9]{3}\-{1}[0-9]{3}\-{1}[0-9]{4}$/;
    protected uscisNumberFormat = /^[0-9]{7,9}$/;
    protected admissionNumberFormat = /^[0-9]{9}[a-zA-Z]{1}[0-9]{1}$|^[0-9]{11}$/;
    protected usPassportNumberFormat = /^[a-zA-Z0-9]{6,9}$/;
    protected greenCardNumberFormat = /^[A-Za-z]{3}[0-9]{10}$|[0-9]{7,9}|[0-9]{3}\-{0,1}[0-9]{3}\-{0,1}[0-9]{3}$/;
    protected cardNumberFormat = /^[A-Za-z]{3}[0-9]{10}$/;
    protected passportNumberFormat = /^[a-zA-Z0-9]{6,12}$/;
    protected driverLicenseNumberFormat = /^[a-zA-Z0-9]{8,14}$/;
    protected ssnFormat = /^[0-9]{3}[-]*[0-9]{2}[-]*[0-9]{4}$/;

    protected annotationName = 'annotation-name';
    protected annotationRequired = 'annotation-required';
    protected annotationNext = 'annotation-next';
    protected na = this._('NA');
    protected space = ' ';
    protected blankItem = '&nbsp;';
    protected backSpaceCode = 'Backspace';

    protected parentProp = 'parent';
    public static toolbarButtons = ['print', 'download'];

    protected _(t: string): string {
        return ((document as any).webL10n.get(t) as string).replace('#', '&#35;');
    }

    constructor() {
        let monthNames:string[] = [];
        let monthNamesShort:string[] = [];
        let dayNames:string[] = [];
        let dayNamesShort:string[] = [];
        let dayNamesMin:string[] = [];

        $.each(JSON.parse(this._('monthNames')), (index, value) => {
            monthNamesShort.push(index as string);
            monthNames.push(value);
        })

        $.each(JSON.parse(this._('dayNames')), (index, value) => {
            dayNamesMin.push(index as string);
            $.each(value, (i, v) => {
                dayNamesShort.push(i as string);
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

        $('body').mouseup(e =>  {
            let popover = $('.popover');
        
            if (!popover.is(e.target) && popover.has(e.target).length === 0 && popover.prop(this.parentProp) &&
                popover.prop(this.parentProp) !== e.target) {
                $(popover.prop(this.parentProp)).popover('hide').removeProp(this.parentProp);
            }
        });        
    }

    protected selectCheckmark(ctrl: JQuery<HTMLElement>, arr: Array<JQuery<HTMLElement>>) {
        for (var a of arr) {
            if (a.attr(this.annotationName) !== ctrl.attr(this.annotationName)) {
                a.prop('checked', false);
                a.parent().children('span').text('');
            }
        }
    }

    protected setCombolistValue(ctrl: JQuery<HTMLElement>, val: string) {
        var options = ctrl.parent().children().filter('.combo-content');
        options.children().filter(`[value='${val}']`).each((index, value) => {
            value.onclick(null);
        });
    }

    protected setCombolistText(ctrl: JQuery<HTMLElement>, val: string, txt: string) {
        var options = ctrl.parent().children().filter('.combo-content');
        options.children().filter(`[value='${val}']`).html(txt);
    }

    protected assignCombolistEventHandler(ctrl: JQuery<HTMLElement>, f: JQuery.EventHandler<HTMLElement>) {
        ctrl.parent().children().filter('.combo-content').click(f);
    }

    protected renderControl(ctrl: JQuery<HTMLElement>, text: string, onFocus: boolean = true) : JQuery<HTMLElement> {
        return ctrl.popover({ html: true, content: text, trigger: onFocus ? 'focus' : 'hover' });
    }

    protected renderHelpIcon(ctrl: JQuery<HTMLElement>, title: string, text: string, maxWidth: string = '30')
        : JQuery<HTMLElement> {
        const tag = 'img';
        return ctrl.parent().find(tag).length > 0 ? ctrl : ctrl.hide().parent()
            .append(`<${tag} src='${PDFForm.helpIconUrl}' class='icon' />`).children(tag)
            .tooltip({ title: title, placement: 'left' })
            .popover({
                html: true,
                title: decodeURIComponent(this._('help')),
                content: decodeURIComponent(text),
                trigger: 'click'
            })
            .click((e) => {
                $(e.target).tooltip('hide');
                $('.popover').css('max-width', `${maxWidth}%`).prop(this.parentProp, e.target);
            });
    }

    protected urlParameter(name: string) {
        var results = new RegExp(`[\?&]${name}=([^&#]*)`).exec(window.location.href);
        if (results === null) {
           return null;
        }
        else {
           return decodeURI(results[1]) || 0;
        }
    }

    protected validateForm(ctrl: JQuery<HTMLElement>, errorMessages: string[]) : boolean {
        if (errorMessages.length > 0) {
            let errorMessage = `${this._('error.header')}<br />`;
            errorMessages.forEach(e => {
                errorMessage += ` - ${e}<br />`;
            });

            ctrl.popover({
                html: true,
                title: this._('validation'),
                content: errorMessage,
                trigger: 'click',
                placement: 'bottom'
            }).popover('show');
            
            $('.popover').prop(this.parentProp, ctrl);

            return false;
        } else {
            ctrl.popover('hide');
            return true;
        }
    }

    private static helpIconUrl: string = URL.createObjectURL(new Blob([
    `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <!-- Created with Inkscape (http://www.inkscape.org/) -->
    
    <svg
       xmlns:dc="http://purl.org/dc/elements/1.1/"
       xmlns:cc="http://creativecommons.org/ns#"
       xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
       xmlns:svg="http://www.w3.org/2000/svg"
       xmlns="http://www.w3.org/2000/svg"
       xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
       xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
       width="64px"
       height="64px"
       id="svg4310"
       version="1.1"
       inkscape:version="0.48.5 r10040"
       sodipodi:docname="New document 12">
      <defs
         id="defs4312" />
      <sodipodi:namedview
         id="base"
         pagecolor="#ffffff"
         bordercolor="#666666"
         borderopacity="1.0"
         inkscape:pageopacity="0.0"
         inkscape:pageshadow="2"
         inkscape:zoom="8.109375"
         inkscape:cx="32"
         inkscape:cy="32"
         inkscape:current-layer="layer1"
         showgrid="true"
         inkscape:document-units="px"
         inkscape:grid-bbox="true"
         inkscape:window-width="1366"
         inkscape:window-height="706"
         inkscape:window-x="-8"
         inkscape:window-y="-8"
         inkscape:window-maximized="1" />
      <metadata
         id="metadata4315">
        <rdf:RDF>
          <cc:Work
             rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type
               rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title></dc:title>
          </cc:Work>
        </rdf:RDF>
      </metadata>
      <g
         id="layer1"
         inkscape:label="Layer 1"
         inkscape:groupmode="layer">
        <path
           style="fill:#ffffff;fill-opacity:1"
           d="m 15.762549,38.922 c -1.06334,-0.882165 -1.32499,-1.498527 -1.34729,-3.173687 -0.037,-2.776797 1.52601,-5.152147 5.67899,-8.630675 5.33259,-4.466575 6.47416,-8.564501 3.27186,-11.745039 -1.18764,-1.179564 -1.76451,-1.372444 -4.14809,-1.386933 -3.41515,-0.02075 -4.87489,0.960552 -6.75278,4.539549 -1.6751,3.192528 -3.0518803,4.181224 -5.2319903,3.757233 -5.75464,-1.119178 -2.91387,-10.115689 4.4180303,-13.9915496 1.669,-0.8822891 3.09519,-1.1704971 6.45082,-1.3036071 7.53077,-0.29873 12.28335,2.0120271 14.86673,7.2283727 1.14469,2.311347 1.3024,3.11896 1.16013,5.941025 -0.21059,4.177607 -1.49939,6.168229 -6.95257,10.738659 -2.83149,2.373136 -4.27783,3.97627 -4.98858,5.529385 -1.69628,3.706674 -3.92388,4.57246 -6.42526,2.497267 l 0,0 z"
           id="path4333"
           inkscape:connector-curvature="0" />
        <path
           style="fill:#ffffff;fill-opacity:1"
           d="m 14.509119,51.233541 c -2.05979,-2.285886 -2.15553,-4.889987 -0.25783,-7.012744 2.73307,-3.057201 7.61599,-1.593986 8.37255,2.508922 0.87511,4.745715 -4.97233,7.991152 -8.11472,4.503822 z"
           id="path4337"
           inkscape:connector-curvature="0" />
        <path
           sodipodi:type="arc"
           style="fill:#0000ff;fill-opacity:1"
           id="path4339"
           sodipodi:cx="34.978806"
           sodipodi:cy="36.861271"
           sodipodi:rx="24.123314"
           sodipodi:ry="25.932562"
           d="m 59.102119,36.861271 a 24.123314,25.932562 0 1 1 -48.246627,0 24.123314,25.932562 0 1 1 48.246627,0 z"
           transform="matrix(1.2376996,0,0,1.145033,-10.225819,-11.080207)" />
        <path
           style="fill:#ffffff;fill-opacity:1"
           d="m 29.191588,39.791319 c -1.06334,-0.882165 -1.32499,-1.498527 -1.34729,-3.173687 -0.037,-2.776797 1.52601,-5.152147 5.678992,-8.630675 5.33259,-4.466575 6.47416,-8.564501 3.27186,-11.745039 -1.18764,-1.179564 -1.76451,-1.372444 -4.14809,-1.386933 -3.415152,-0.02075 -4.874892,0.960552 -6.752782,4.539549 -1.6751,3.192528 -3.05188,4.181224 -5.23199,3.757233 -5.754639,-1.119178 -2.913869,-10.115689 4.41803,-13.9915503 1.669,-0.882289 3.09519,-1.170497 6.45082,-1.303607 7.530772,-0.29873 12.283352,2.012027 14.866732,7.2283733 1.14469,2.311347 1.3024,3.11896 1.16013,5.941025 -0.21059,4.177607 -1.49939,6.168229 -6.95257,10.738659 -2.83149,2.373136 -4.27783,3.97627 -4.98858,5.529385 -1.69628,3.706674 -3.923882,4.57246 -6.425262,2.497267 l 0,0 z"
           id="path4333-2"
           inkscape:connector-curvature="0" />
        <path
           style="fill:#ffffff;fill-opacity:1"
           d="m 27.938158,52.10286 c -2.05979,-2.285886 -2.15553,-4.889987 -0.25783,-7.012744 2.73307,-3.057201 7.615992,-1.593986 8.372552,2.508922 0.87511,4.745715 -4.972332,7.991152 -8.114722,4.503822 z"
           id="path4337-7"
           inkscape:connector-curvature="0" />
      </g>
    </svg>`], { type: 'image/svg+xml' }));
}