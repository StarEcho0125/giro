import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent implements OnInit {
    location: any;
    routerSubscription: any;

    constructor(
        private router: Router,
        public translate: TranslateService
    ) {
        translate.addLangs(['CAT', 'ESP']);
        translate.setDefaultLang('CAT');
        const browserLang = translate.getBrowserCultureLang();
        translate.use(browserLang.match(/CAT|ESP/) ? browserLang : 'CAT');
    }

    ngOnInit(){
        this.recallJsFuntions();
        this.cookieconsent();
    }

    recallJsFuntions() {
        this.router.events
        .subscribe((event) => {
            if ( event instanceof NavigationStart ) {
                $('.preloader').fadeIn('slow');
            }
        });
        this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
        .subscribe(event => {
            $.getScript('../assets/js/custom.js');
            $('.preloader').fadeOut('slow');
            this.location = this.router.url;
            if (!(event instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }

    cookieconsent() {
        let cc = window as any;
    cc.onbeforeunload = () => {
        localStorage.clear();
    };

    cc.cookieconsent.initialise({

      "palette": {
        "popup": {
          "background": "#252e39"
        },
        "button": {
          "background": "transparent",
          "text": "#14a7d0",
          "border": "#14a7d0"
        }

      },
      "type": "opt-in",

      content: {
        message: "Esta web usa cookies de terceros con finalidades de publicidad basada en sus hábitos de navegación y para finalidades analíticos. Más info. apretar en configurar.",
        deny: "Rechazar",
        allow: "Aceptar",
        link: "Política de cookies",
        href: "/politica-cookies"
      }
    });
    }
}
