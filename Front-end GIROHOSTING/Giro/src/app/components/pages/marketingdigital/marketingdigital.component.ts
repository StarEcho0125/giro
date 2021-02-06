import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DadesContacte } from '../../../models/dadesContacte.model';
import { ContactService } from '../../../services/contact.service';
import { DadesTrucar } from '../../../models/dadesTrucar.model';
import { CallService } from '../../../services/call.service';
import { NavigationStart, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SEOService } from '../../../services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-marketingdigital',
  templateUrl: './marketingdigital.component.html',
  styleUrls: ['./marketingdigital.component.scss']
})
export class MarketingdigitalComponent implements OnInit {

  constructor(
    public meta: Meta, 
    public title: Title, 
    public translate: TranslateService,
    private contactService: ContactService, 
    private router: Router,
    private callService: CallService,
    private seoService: SEOService
  ) {
    this.meta.addTags([
      {name: 'description', content: this.translate.instant('SEOINFO.META.META_MARKETING')}
    ]);
    this.title.setTitle(this.translate.instant('SEOINFO.TITLE.TITLE_PAGINA_MARKETING'));
    seoService.createLinkForCanonicalURL();
  }

  ngOnInit(): void {
    $("select#selecIdioma").css('backgroundColor', '#04063c');
    $("nav").css('backgroundColor', 'transparent');

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.title.setTitle(this.translate.instant('SEOINFO.TITLE.TITLE_PAGINA_MARKETING'));
    });
  }

  handleOtherServices(flag) {
    switch (flag) {
      case 1:
        $("#creamos_service_container").show();
        $("#dolibarr_service_container").hide();
        $("#digital_service_container").hide();
        $("#ciber_service_container").hide();
        break;
      case 2:
        $("#creamos_service_container").hide();
        $("#dolibarr_service_container").show();
        $("#digital_service_container").hide();
        $("#ciber_service_container").hide();
        break;
      case 3:
        $("#creamos_service_container").hide();
        $("#dolibarr_service_container").hide();
        $("#digital_service_container").show();
        $("#ciber_service_container").hide();
        break;
      case 4:
        $("#creamos_service_container").hide();
        $("#dolibarr_service_container").hide();
        $("#digital_service_container").hide();
        $("#ciber_service_container").show();
        break;
    }
  }

}
