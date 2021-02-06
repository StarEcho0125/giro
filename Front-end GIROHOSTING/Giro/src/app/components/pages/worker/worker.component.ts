import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserdetailsService } from '../../../services/userdetails.service';
import { AuthenticationService, TokenPayload } from '../../../services/authentication.service';
import { ThemePalette } from "@angular/material/core";

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {
  id: any;
  userid: any;
  role: any = null;
  officername: any;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    public userDetailsService: UserdetailsService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe({
      next: params => {
        this.id = params.get('id');
      }
    });
  }

  links = [
    {
      title: 'ADMIN_FIELD.NAVBAR.OFFICER_PAGE',
      icon: 'desktop_windows',
      route: `/worker/`
    },
    {
      title: 'ADMIN_FIELD.NAVBAR.EDIT_OFFICER',
      icon: 'edit',
      route: ''
    },
    {
      title: 'Cambiar Contraseña',
      icon: 'cached',
      route: ''
    },
    {
      title: 'Estadísticas por cliente',
      icon: 'auto_graph',
      route: ''
    },
    {
      title: 'Estadísticas Globales',
      icon: 'bar_chart',
      route: ''
    },
  ];  
  background: ThemePalette = 'primary';

  ngOnInit(): void {
    $("select#selecIdioma").css('backgroundColor', '#04063c');
    $("nav").css('backgroundColor', '#04063c');
    
    this.getrole();
    this.getofficerinfo();
    this.getuserid();
    this.links[0].route += this.id + '/';
    
    this.links[2].route = `/worker/${this.id}/changepassword/${this.id}/2`;
    this.links[3].route = `/worker/${this.id}/office-client-dashboard/${this.id}`;
    this.links[4].route = `/worker/${this.id}/office-global-dashboard/${this.id}`;
  }  

  getuserid() {
    this.auth.getadminuserid(this.id).subscribe(
      res => {
        this.userid = res;
        this.links[1].route = `/worker/${this.id}/ver-officer-info/${this.id}/${this.userid}`;
      }
    );
  }

  getofficerinfo() {
    this.userDetailsService.getprofile(this.id, 2).subscribe(
      res => {
        this.officername = res['name_alias'];
      }
    );
  }

  getrole() {
    this.auth.getrole().subscribe(
      res => {
        if(res != null) {
          this.role = res;
        }
      }
    );
  }

  GoBack()
  {
    this.router.navigate(['/admin-field']);
  }
}
