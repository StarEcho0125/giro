import { Component, OnInit, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DadesTrucar } from '../../../models/dadesTrucar.model';
import { CallService } from '../../../services/call.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserdetailsService } from '../../../services/userdetails.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ConfirmationDialogService } from '../../../services/confirmation-dialog.service';
import { ThemePalette } from "@angular/material/core";

@Component({
  selector: 'app-adminfield',
  templateUrl: './adminfield.component.html',
  styleUrls: ['./adminfield.component.scss']
})
export class AdminfieldComponent implements OnInit {  
  constructor(public userDetailsService: UserdetailsService,
    private auth: AuthenticationService,
    public meta: Meta, public title: Title,
    public translate: TranslateService,
    // private confirm: ConfirmationDialogService,
    private router: Router) {
  }

  links = [
    {
      title: 'ADMIN_FIELD.NAVBAR.SUPERADMIN_PAGE',
      icon: 'desktop_windows',
      route: `/admin-field/`
    },
    {
      title: 'Cambiar Contraseña',
      icon: 'cached',
      route: '/admin-field/changepassword/'
    },
    {
      title: 'ADMIN_FIELD.NAVBAR.CREATE_CLIENT',
      icon: 'person_add',
      route: '/admin-field/createuser/3'
    },
    {
      title: 'ADMIN_FIELD.NAVBAR.CREATE_OFFICER',
      icon: 'group_add',
      route: '/admin-field/createworker/'
    },
    {
      title: 'ADMIN_FIELD.NAVBAR.DASHBOARD',
      icon: 'auto_graph',
      route: '/admin-field/dashboard/'
    },
  ];  
  background: ThemePalette = 'primary';
  
  ngOnInit(): void {
    $("select#selecIdioma").css('backgroundColor', '#04063c');
    $("nav").css('backgroundColor', '#04063c');

    this.getuserid();
  }  

  getuserid() {
    this.auth.profile().subscribe(
      res => {
        this.links[1].route += res.idClient + '/1/';
      }
    );
  }
  
}
