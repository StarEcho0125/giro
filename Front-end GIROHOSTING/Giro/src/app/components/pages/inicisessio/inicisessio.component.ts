import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { UserdetailsService } from '../../../services/userdetails.service';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-inicisessio',
  templateUrl: './inicisessio.component.html',
  styleUrls: ['./inicisessio.component.scss']
})
export class InicisessioComponent implements OnInit {

  credentials: TokenPayload = {
    id: null,
    email: '',
    password: ''

  }
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private userdetail: UserdetailsService) { }

  ngOnInit(): void {
    $("select#selecIdioma").css('backgroundColor', '#04063c');
    $("nav").css('backgroundColor', 'transparent');
  }
  
  userid: any;
  userrole: any;
  users: any;
  enviarCredencials()
  {
    this.auth.login(this.credentials).subscribe(
      res => {
        // alert("Login correcte.");
        // this.router.navigate(['/']);
        this.userid=res.userid;

        this.getrole();
      },
      //Control d'errors del servidor
      error => {
          alert("No s'ha pogut iniciar sessió, revisa que l'email o la contrasenya siguin vàlids.");
          // this.router.navigate(['error']);
      });
  }

  getrole(){
    this.userdetail.getrole(this.userid).subscribe(
      res=>{
        this.userrole=res;
        this.auth.role = res;
        if(this.userrole==1){
          this.router.navigate(['/admin-field']);
        }
        if(this.userrole==2){
          this.auth.getadminid().subscribe(
            res1 => {
              this.router.navigate(['/worker', res1]);
            }
          );
        }
        if(this.userrole==3 || this.userrole == 0){
          this.router.navigate(['/']);
        }
      }
    )
  }

}
