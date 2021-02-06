import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../../services/authentication.service';
import { UserdetailsService } from '../../../services/userdetails.service';
import { CountryService } from '../../../services/country.service';
import { DepartementService } from '../../../services/departement.service';
import { UserFullData } from '../../../models/userFullData.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  //Validació formulari actualitzar perfil
  form = new FormGroup({
    nomFiscal: new FormControl('', Validators.required),
    nomComercial: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.pattern('^[6789]{1}[0-9]{8}$')]),
    direccio: new FormControl('', Validators.required),
    poblacio: new FormControl('', Validators.required),
    pais: new FormControl('', Validators.required),
    provincia: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    codiPostal: new FormControl('', [Validators.required, Validators.pattern('^\\d{5}$')]),
    cifNif: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(11)])
  })

  formContrasenya = new FormGroup({
    contrasenya: new FormControl('', [Validators.required, Validators.minLength(12)]),
    confContrasenya: new FormControl('', Validators.required)
  })

  buttonEnable: any;

  userEmail: any;

  paisos: any;

  provincies: any;

  details: UserDetails = 
  {
    nom: '',
    name_alias: '',
    email: '',
    phone: null,
    address: '',
    town: '',
    fk_pays: null,
    fk_departement: null,
    zip: null,
    siren: '',
    password: '',
    exp: null,
    iat: null,
    url: ''
  };



  dadesUsuari = new UserFullData();
  usuario = new UserFullData();

  constructor(private auth: AuthenticationService,
    private userData: UserdetailsService,
    private countryService: CountryService,
    private departementService: DepartementService,
    private router: Router) { }

    
   ngOnInit(): void {
    $("select#selecIdioma").css('backgroundColor', '#04063c');
    $("nav").css('backgroundColor', '#04063c');
    
    this.obtenirPaisosProvincies();
    
    this.auth.profile().subscribe(
      res => {

        this.dadesUsuari.id = res.id;
        this.dadesUsuari.rowid = res.idClient;
        this.userEmail = res.email;
        
        this.obtenirDadesUsuariAutenticat();

      },
      error => {
        alert('Error del servidor.');
      }
    );


    this.buttonEnable = document.getElementById("btnEnable");
  }
  obtenirPaisosProvincies()
  {
    this.countryService.obtenirPaisos().subscribe(
      res => {
        this.paisos = res;
      });

    this.departementService.obtenirProvincies().subscribe(
      res => {
        this.provincies = res;
      });
  }
  
  obtenirDadesUsuariAutenticat()
  {
    this.userData.obtenirDadesUsuari(this.dadesUsuari.rowid).subscribe(
     (res:any)  => {

        this.details.nom = res.nom;
        this.details.name_alias = res.name_alias;
        this.details.email = res.email;
        this.details.phone = res.phone;
        this.details.address = res.address;
        this.details.town = res.town;
        this.details.fk_pays = res.fk_pays;
        this.details.fk_departement = res.fk_departement;
        this.details.zip = res.zip;
        this.details.siren = res.siren;
        this.details.url = res.url;
        this.details.password = res.password;

      }
    );
  }

  actualitzarPerfilUsuari()
  {
    this.userData.updateProfile(this.dadesUsuari).subscribe(
      res =>
      {
        (this.dadesUsuari.url);
        alert("S'ha actualitzat el teu perfil correctament.");
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/configuracio-del-compte']);
      }); 
      },
      error =>
      {
        alert("No s'ha pogut actualitzar el teu perfil d'usuari, intenta-ho més tard.");
      });
  }

  onClickMe(usuari)
  {

    this.dadesUsuari.nom = usuari.nom;
    this.dadesUsuari.email = usuari.email;
    this.dadesUsuari.phone = usuari.phone;
    this.dadesUsuari.address = usuari.address;
    this.dadesUsuari.town = usuari.town;
    this.dadesUsuari.zip = usuari.zip;
    this.dadesUsuari.siren = usuari.siren;
    this.dadesUsuari.name_alias = usuari.name_alias;
    this.dadesUsuari.fk_departement = usuari.fk_departement;
    this.dadesUsuari.fk_pays = usuari.fk_pays;
    this.dadesUsuari.url = usuari.url;
    this.dadesUsuari.password = usuari.password;

    $("#NomPersona").removeAttr('disabled');
    $("#NomPersona").removeAttr('style');
    $("#NomPersona").val(this.details.nom);

    $("#siren").removeAttr('disabled');
    $("#siren").removeAttr('style');
    $("#siren").val(this.details.siren);

    $("#NomEmpresa").removeAttr('disabled');
    $("#NomEmpresa").removeAttr('style');
    $("#NomEmpresa").val(this.details.name_alias);

    $("#Web").removeAttr('disabled');
    $("#Web").removeAttr('style');
    $("#web").val(this.dadesUsuari.url);

    $("#adresa").removeAttr('disabled');
    $("#adresa").removeAttr('style');
    $("#adresa").val(this.details.address);

    $("#provincia").removeAttr('disabled');
    $("#provincia").removeAttr('style');
    //$("#provincia").val(this.details.fk_departement);

    $("#poblacio").removeAttr('disabled');
    $("#poblacio").removeAttr('style');
    $("#poblacio").val(this.details.town);
    
    $("#codiPostal").removeAttr('disabled');
    $("#codiPostal").removeAttr('style');
    $("#codiPostal").val(this.details.zip);

    $("#pais").removeAttr('disabled');
    $("#pais").removeAttr('style');
    //$("#pais").val(this.details.fk_pays);
    
    $("#email").removeAttr('disabled');
    $("#email").removeAttr('style');
    $("#email").val(this.details.email);

    $("#phone").removeAttr('disabled');
    $("#phone").removeAttr('style');
    $("#phone").val(this.details.phone);

    $("#btnGuardar").removeAttr('hidden');
    $("#btnCancelar").removeAttr('hidden');
  }

  btnCancelar()
  {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/configuracio-del-compte']);
    });
  }



  ////////////////////////////////////////////////////////////////////////////////////////////



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

  
  canivarContrasenya(rowid, new_pass)
  {
    

    this.usuario.rowid = rowid;
    this.usuario.password = new_pass;

    this.auth.canviar_Password(this.usuario).subscribe(
      res => {
        alert("contraseña canviada correctamente");
        this.router.navigate(['/configuracio-del-compte']);
      },
      //Control d'errors del servidor
      error => {
        alert("contraseña canviada");
        this.router.navigate(['/configuracio-del-compte']);
          // this.router.navigate(['error']);
      });
  }

  btnCanviarContrasenya()
  {
    $("#form-change-password").removeAttr('hidden');

  }

  btnCancelarCanvioContrasenya()
  {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/configuracio-del-compte']);
    });
  }

}
