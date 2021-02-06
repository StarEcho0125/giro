import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client.model';
// import { ClientService } from '../services/client.service';
import { AuthenticationService, TokenPayload } from '../../../services/authentication.service';
import { CountryService } from '../../../services/country.service';
import { DepartementService } from '../../../services/departement.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.scss']
})
export class RegistreComponent implements OnInit {

  //Validació formulari registre
  form = new FormGroup({
    nomFiscal: new FormControl('', Validators.required),
    nomComercial: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.pattern('^[6789]{1}[0-9]{8}$')]),
    contrasenya: new FormControl('', [Validators.required, Validators.minLength(12)]),
    confContrasenya: new FormControl('', Validators.required),
    direccio: new FormControl('', Validators.required),
    poblacio: new FormControl('', Validators.required),
    pais: new FormControl('', Validators.required),
    provincia: new FormControl('', Validators.required),
    codiPostal: new FormControl('', [Validators.required, Validators.pattern('^\\d{5}$')]),
    cifNif: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(11)]),
    acceptarPolitiques: new FormControl('', Validators.required)
  })

  constructor(private auth: AuthenticationService,
    private countryService: CountryService,
    private departementService: DepartementService,
    private router: Router) { }

  // //Client
  client = new Client();

  //Array de paisos
  paisos: any;

  //Array de provincies
  provincies: any;

  ngOnInit(): void {
    $("select#selecIdioma").css('backgroundColor', '#04063c');
    $("nav").css('backgroundColor', 'transparent');

    this.obtenirPaisos();
    this.obtenirProvincies();
  }

  passwdMatch()
  {
    var textContrasenya = $('#inputContrasenya').val();
    var textConfContrasenya = $('#inputConfirmarContrasenya').val();
    if(textContrasenya != textConfContrasenya)
    {
      $('#inputConfirmarContrasenya').addClass('is-invalid');
    }
    else if(textContrasenya == textConfContrasenya)
    {
      $('#inputConfirmarContrasenya').removeClass('is-invalid');
    }
  }
  
  //Fem un post a la API amb les dades del nou client
  enregistrarClient() {
    this.auth.register(this.client, 3).subscribe(
      res => {
        alert("S'ha creat el teu compte correctament. Revisa el teu correu electrònic per comprobar que s'ha creat correctament.");
        this.router.navigate(['/area-clients']);
      },
      //Control d'errors del servidor
      error => {
          alert("No s'ha pogut completar el registre, pot ser que el correu electrònic introduït ja existeixi, revisa-ho i torna-ho a probar.");
          // this.router.navigate(['error']);
      });

    // let id = 3;
    // this.auth.register(this.client, id).subscribe(
    //   res => {
    //     alert("S'ha creat el teu compte correctament. Revisa el teu correu electrònic per comprobar que s'ha creat correctament.");
    //     this.router.navigate(['/area-clients']);
    //   },
    //   //Control d'errors del servidor
    //   error => {
    //       alert("No s'ha pogut completar el registre, pot ser que el correu electrònic introduït ja existeixi, revisa-ho i torna-ho a probar.");
    //       // this.router.navigate(['error']);
    //   });

  }

  //Fem un get a la API per obtenir els paisos
  obtenirPaisos() {
    this.countryService.obtenirPaisos().subscribe(
      res => {
        this.paisos = res;
        
      },
      //Control d'errors del servidor
      error => {
        alert("S'ha produït un error amb el servidor.")
        this.router.navigate(['error']);
      });
  }

  //Fem un get a la API per obtenir les provincies
  obtenirProvincies() {
    this.departementService.obtenirProvincies().subscribe(
      res => {
        this.provincies = res;
      },
      //Control d'errors del servidor
      error => {
        alert("S'ha produït un error amb el servidor.")
        this.router.navigate(['error']);
      });
  }

}
