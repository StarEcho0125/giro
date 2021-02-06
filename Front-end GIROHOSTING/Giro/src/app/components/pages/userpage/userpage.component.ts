import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThemePalette } from "@angular/material/core";

import { DepartementService } from '../../../services/departement.service';
import { CountryService } from '../../../services/country.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserdetailsService } from '../../../services/userdetails.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})
export class UserpageComponent implements OnInit {  

  userid: any;
  role: any;
  adminid: any;
  links = [
    {
      title: 'USER_PAGE.BUTTON.EDITAR_CLIENTE',
      icon: 'border_color',
      route: `/userpage/`
    },
    {
      title: 'USER_PAGE.BUTTON.PRESUPUESTOS',
      icon: 'request_page',
      route: '/els-user-pressupostos/'
    },
    {
      title: 'USER_PAGE.BUTTON.CONTRATOS',
      icon: 'sticky_note_2',
      route: '/els-user-contractes/'
    },
    {
      title: 'USER_PAGE.BUTTON.FACTURAS',
      icon: 'note',
      route: '/els-user-facturas/'
    },
  ];  
  background: ThemePalette = 'primary';

  constructor(
    private countryService: CountryService,
    private departementService: DepartementService,
    private router: Router,
    private route: ActivatedRoute,
    public userdetails: UserdetailsService,
    private auth: AuthenticationService) {

    route.paramMap.subscribe({
      next: params => {
        this.userid = params.get('id');
        this.links.map((val, idx) => {
          switch (idx) {
            case 0:
              val.route += this.userid; 
              break;
            default:
              val.route = `/userpage/${this.userid}/${val.route}/${this.userid}`;
              break;
          }
        });
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


  paisos: any;
  provincies: any;  

  onBack() {
    if(this.role == 1) {
      this.router.navigate(['/admin-field']);
    } else if(this.role == 2) {
      this.auth.getadminid().subscribe(
        res => {
          this.router.navigate(['worker', res]);
        }
      );
    }
  }  
  

  ngOnInit(): void {
    $("select#selecIdioma").css('backgroundColor', '#04063c');
    $("nav").css('backgroundColor', '#04063c');
    
    this.getuserprofile();
    this.getrole()    
  }

  getrole() {
    this.auth.getrole().subscribe(
      res => {
        this.role = res;
      }
    );
  }

  getuserprofile() {
    this.userdetails.getprofile(this.userid, 3).subscribe(
      res => {
        this.user = res;
        this.user_nom = this.user.nom;
      }
    )
  }  
}
