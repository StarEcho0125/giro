import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { SEOService } from '../../../services/seo.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DadesContacte } from '../../../models/dadesContacte.model';
import { ContactService } from '../../../services/contact.service';
import { DadesTrucar } from '../../../models/dadesTrucar.model';
import { CallService } from '../../../services/call.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare let $: any;

@Component({
  selector: 'app-creemlatevaweb',
  templateUrl: './creemlatevaweb.component.html',
  styleUrls: ['./creemlatevaweb.component.scss']
})
export class CreemlatevawebComponent implements OnInit {
  //Validació formulari
  form = new FormGroup({
    nom: new FormControl('', Validators.required),
    nomEmpresa: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.pattern('^[6789]{1}[0-9]{8}$')]),
    departament: new FormControl('', Validators.required),
    informacio: new FormControl('', Validators.required),
    acceptarPolitiques: new FormControl('', Validators.required)
  })

  //Validació formulari
  form2 = new FormGroup({
    nom: new FormControl('', Validators.required),
    nomEmpresa: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.pattern('^[6789]{1}[0-9]{8}$')]),
    acceptarPolitiques: new FormControl('', Validators.required)
  })

  //Botó
  buttonTop: any;

  //DadesContacte
  dadesContacte = new DadesContacte();

  //Dades trucar
  dadesTrucar = new DadesTrucar();

  constructor(
    public meta: Meta,
    public title: Title,
    public translate: TranslateService,
    private seoService: SEOService,
    private contactService: ContactService,
    private router: Router,
    private callService: CallService,
    ) {
      this.meta.addTags([
        {name: 'description', content: this.translate.instant('SEOINFO.META.META_CREEM_WEB')}
      ]);
      this.title.setTitle(this.translate.instant('SEOINFO.TITLE.TITLE_PAGINA_CREEM_WEB'));
      seoService.createLinkForCanonicalURL();
    }

  ngOnInit(): void {
    //Filtre per defecte WEB imatges
    this.filtrarImatges('Web');

    //Filtre per defecte WEB
    this.filtrarweb('Alquiler');

    $("nav:not(.is-sticky) select#selecIdioma").css('backgroundColor', '#11aad4');
    $("nav").css('backgroundColor', 'transparent');
    
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.title.setTitle(this.translate.instant('SEOINFO.TITLE.TITLE_PAGINA_CREEM_WEB'));
    });
  }

  //Funció que filtra els elements per tipus (paràmetre)
  filtrarImatges(tipus)
  { 
    //Agafem els elements corresponents
    var blocImatge = document.getElementsByClassName("content") as HTMLCollectionOf<HTMLElement>;

    //Recorrem tots els blocs de imatges
    for (var i = 0; i < blocImatge.length; i++)
    {
      var h4 = blocImatge[i].getElementsByTagName("h4")[0]; //primera etiqueta <h4> trobada
      var textValue = h4.textContent || h4.innerText;

      if (tipus == textValue) 
      {
          blocImatge[i].style.display = "";
      } 
      else 
      {
          blocImatge[i].style.display = "none";
      }
    }
  }

  filtrarweb(tipus)
  { 
    //Agafem els elements corresponents
    var blocImatge = document.getElementsByClassName("content2") as HTMLCollectionOf<HTMLElement>;

    //Recorrem tots els blocs de imatges
    for (var i = 0; i < blocImatge.length; i++)
    {
      var h4 = blocImatge[i].getElementsByTagName("h4")[0]; //primera etiqueta <h4> trobada
      var textValue = h4.textContent || h4.innerText;

      if (tipus == textValue) 
      {
          blocImatge[i].style.display = "";
      } 
      else 
      {
          blocImatge[i].style.display = "none";
      }
    }
  }

  //Fem un post a la api amb les dades del client que vol contactar
  enviarDadesContacte()
  {
    this.contactService.enviarCorreuContacte(this.dadesContacte).subscribe(
      res =>
      {
        alert("Hem rebut la teva sol·licitud de contacte.")
        this.tancarPopup();
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

  //Fem un post a la api amb les dades del client que vol contactar
  enviarDadesTrucar()
  {
    this.callService.enviarCorreuTrucar(this.dadesTrucar).subscribe(
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

  //Funció per tancar Pop-up
  tancarPopup()
  {
    $('#tancarPopup').click();
  }

  handleOtherService(flag) {
    if(flag == 1) {
      $("#service1_container").show();
      $("#service2_container").hide();
    } else if(flag == 2) {
      $("#service1_container").hide();
      $("#service2_container").show();
    }
  }
}
