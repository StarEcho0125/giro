import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { UserdetailsService } from "../../../services/userdetails.service";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-manage-client-password',
  templateUrl: './manage-client-password.component.html',
  styleUrls: ['./manage-client-password.component.scss']
})
export class ManageClientPasswordComponent implements OnInit {
  userid: any;
  role: any;

  password: string;
  confirm_password: string;
  isValid: boolean;

  form = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(12)]),
    confirm_password: new FormControl('', [Validators.required, Validators.minLength(12)]),
  });

  constructor(
    private userdetails: UserdetailsService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
  ) {
    route.paramMap.subscribe({
      next: params => {
        this.userid = params.get('id');
        this.role = params.get('role');
      }
    });
  }

  ngOnInit(): void {
    if(this.role == 1) {
      this.userdetails.activeSuperadminLink = 'Cambiar Contraseña';
    } else if(this.role == 2) {
      this.userdetails.activeOfficerLink = 'Cambiar Contraseña';
    }
  }

  confirm() {
    this.isValid = false;

    if(this.password == this.confirm_password && this.password.length >= 12) {
      this.isValid = true;
    }
  }

  onSubmit() {
    this.auth.changepassword(this.userid, this.role, this.password).subscribe(
      res => {
        if(res == 'success') {
          alert('contraseña canviada correctamente');          
          this.onBack();
        } else {
          alert('error de cambio');
        }
      }
    );
  }

  onBack() {
    this.router.navigate(['admin-field']);
  }

  onCancel() {
    this.form.controls['password'].setValue('');
    this.form.controls['confirm_password'].setValue('');
  }
}
