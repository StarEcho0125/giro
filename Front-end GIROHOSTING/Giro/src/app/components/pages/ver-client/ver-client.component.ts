import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThemePalette } from "@angular/material/core";

import { UserdetailsService } from '../../../services/userdetails.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { CountryService } from '../../../services/country.service';
import { DepartementService } from '../../../services/departement.service';
import { UserFullData } from '../../../models/userFullData.model';
import { GlobalConstant } from "../../../common/global-constants";

@Component({
  selector: 'app-ver-client',
  templateUrl: './ver-client.component.html',
  styleUrls: ['./ver-client.component.scss']
})
export class VerClientComponent implements OnInit {
  form = new FormGroup({
    nomFiscal: new FormControl('', Validators.required),
    nomComercial: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.pattern('^[6789]{1}[0-9]{8}$')]),
    // contrasenya: new FormControl('', [Validators.required, Validators.minLength(12)]),
    // confContrasenya: new FormControl('', Validators.required),
    direccio: new FormControl('', Validators.required),
    poblacio: new FormControl('', Validators.required),
    pais: new FormControl('', Validators.required),
    provincia: new FormControl('', Validators.required),
    codiPostal: new FormControl('', [Validators.required, Validators.pattern('^\\d{5}$')]),
    cifNif: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(11)]),
    // acceptarPolitiques: new FormControl('', Validators.required)
  })

  formContrasenya = new FormGroup({
    contrasenya: new FormControl('', [Validators.required, Validators.minLength(12)]),
    confContrasenya: new FormControl('', Validators.required)
  })

  imgForm = new FormGroup({
    row_id: new FormControl(''),
    imgfile: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  userid: any;  
  role: any;
  public imagePath;
  imgURL: any;
  public message: string;

  fileData: File = null;
  previewUrl: any = GlobalConstant.apiURL + 'logos/default.png';  
  is_default = true;

  dadesUsuari = new UserFullData();

  constructor(
    private countryService: CountryService,
    private departementService: DepartementService,
    private router: Router,
    private route: ActivatedRoute,
    private userdetails: UserdetailsService,
    private auth: AuthenticationService
  ) {
    route.paramMap.subscribe({
      next: params => {
        this.userid = params.get('id');
      }
    });
  }


  user: any;
  user_nom: any;
  user_name_alias: any;
  user_address: any;
  user_zip: any;
  user_town: any;
  user_fk_departement: any;
  user_email: any;
  user_fk_pays: any;
  user_phone: any;
  user_siren: any;
  user_url: any;
  user_pais: any;
  user_provincia: any;


  paisos: any;
  provincies: any;  

  ngOnInit(): void {
    this.userdetails.activeLink = 'USER_PAGE.BUTTON.EDITAR_CLIENTE';

    this.getuserprofile();
    this.obtenirPaisos();
    this.obtenirProvincies();
    this.getrole();
    this.getlogo()    
  }

  getrole() {
    this.auth.getrole().subscribe(
      res => {
        this.role = res;
      }
    );
  }

  getuserprofile() {
    this.userdetails.getprofile(this.userid, 0).subscribe(
      res => {
        this.user = res;
        this.user_nom = this.user.nom;
        this.user_name_alias = this.user.name_alias;
        this.user_address = this.user.address;
        this.user_zip = this.user.zip;
        this.user_town = this.user.town;
        this.user_email = this.user.email;
        this.user_phone = this.user.phone;
        this.user_siren = this.user.siren;
        this.user_url = this.user.url;
        // this.form.patchValue({
        //   provincia: this.user.fk_departement,
        //   pais: this.user.fk_pays,
        // });

        this.provincies.forEach(elem => {
          if(elem.rowid == this.user.fk_departement) {
            this.user_provincia = elem.nom;
          }
        });

        this.paisos.forEach(elem => {
          if(elem.code_iso == this.user.fk_pays) {
            this.user_pais = elem.label;
          }
        });
      }
    )
  }

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

  edit_client() {
    this.router.navigate(['userpage', this.userid, 'edituser', this.userid, 3]);
  }

  // change password module
  btnCanviarContrasenya()
  {
    $("#form-change-password").removeAttr('hidden');

  }

  canivarContrasenya(new_pass)
  {
    
    this.dadesUsuari.rowid = this.userid;
    this.dadesUsuari.password = new_pass;

    this.auth.canviar_Password(this.dadesUsuari).subscribe(
      res => {
        alert("contraseña canviada correctamente");
        this.router.navigate(['/userpage', this.userid]);
      },
      //Control d'errors del servidor
      error => {
        alert("error de cambio");
        this.router.navigate(['/userpage', this.userid]);
          // this.router.navigate(['error']);
      });
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

  btnCancelarCanvioContrasenya()
  {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/userpage', this.userid]);
    });
  }

  onfileChange(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.imgForm.patchValue({
      fileSource: this.fileData
    });
    this.preview();

    if(this.is_default == true && confirm('¿Quieres guardar el logo?')) {
      this.onSubmit()
    }
  }

  clickimg() {
    $('#my_file').click();
  }


  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
      $(".btnimg").attr('src', this.previewUrl);
      this.is_default = false;
    }

  }

  getlogo() {
    this.userdetails.getlogo(this.userid).subscribe(
      res => {
        if (res != null && res != '') {
          this.previewUrl = res;
          this.is_default = false;
        }
      });
  }

  onSubmit() {
    // $("#submit").hide();
    const formData = new FormData();
    formData.append('row_id', this.userid);
    formData.append('file', this.imgForm.get('fileSource').value);


    this.userdetails.logoUpload(formData).subscribe(
      res => {
        alert("Su logotipo se cargó correctamente")
        this.is_default = false;
        this.previewUrl = res;
      }
    )
  }

  submit(id) {
    const formData = new FormData();
    formData.append('row_id', id);
    formData.append('file', this.imgForm.get('fileSource').value);
    this.userdetails.logoUpload(formData).subscribe(
      res => {
        // this.ngOnInit();
      })
  }
}
