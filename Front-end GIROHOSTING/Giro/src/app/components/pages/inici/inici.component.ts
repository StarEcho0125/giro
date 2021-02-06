import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DadesTrucar } from '../../../models/dadesTrucar.model';
import { CallService } from '../../../services/call.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SEOService } from '../../../services/seo.service';

declare let $:any;

@Component({
  selector: 'app-inici',
  templateUrl: './inici.component.html',
  styleUrls: ['./inici.component.scss']
})
export class IniciComponent implements OnInit {

  constructor(
    public meta: Meta, 
    public title: Title, 
    public translate: TranslateService, 
    private callService: CallService, 
    private router: Router,
    private seoService: SEOService
  ) {
    this.meta.addTags([
      {name: 'description', content: this.translate.instant('SEOINFO.META.META_INICI')}
    ]);
    this.title.setTitle(this.translate.instant('SEOINFO.TITLE.TITLE_INICI'));
    seoService.createLinkForCanonicalURL();
  }

  //Validació formulari
  form = new FormGroup({
    nom: new FormControl('', Validators.required),
    nomEmpresa: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.pattern('^[6789]{1}[0-9]{8}$')]),
    acceptarPolitiques: new FormControl('', Validators.required)
  })

  //DadesContacte
  dadesContacte = new DadesTrucar();

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.title.setTitle(this.translate.instant('SEOINFO.TITLE.TITLE_INICI'));
    });
    
   $("select#selecIdioma").css('backgroundColor', '#04063c');
   $("nav").css('backgroundColor', 'transparent');
   
   //Quan es recarregui la web, si hi ha l'adreça d'un link intern a la URL aquesta es neteja
   window.onload = function()
   {
     var url = window.location.href;
     if(url.includes('#'))
     {
       var aux = url.split('#')[0];
       window.location.href = aux;
     }
   }

  }

  //Fem un post a la api amb les dades del client que vol contactar
  enviarDadesContacte()
  {
    this.callService.enviarCorreuTrucar(this.dadesContacte).subscribe(
      res =>
      {
        alert("Et trucarem en un máxim de 48hs. Grácies per la teva confiança.")
        this.router.navigate(['/contacte']);
      },
      //Control d'errors del servidor
      error =>
      {
        alert("No s'ha pogut enviar la teva sol·licitud de contacte, intenta-ho més tard.");
        this.router.navigate(['error']);
      }
    )
  }

}
