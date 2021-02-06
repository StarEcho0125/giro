import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthenticationService } from "../../../services/authentication.service";
import { UserdetailsService } from "../../../services/userdetails.service";
import { Worker } from "../../../models/officer.module";

@Component({
  selector: 'app-create-officer',
  templateUrl: './create-officer.component.html',
  styleUrls: ['./create-officer.component.scss']
})
export class CreateOfficerComponent implements OnInit {
  form = new FormGroup({
    lastname: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    login: new FormControl('', Validators.required),
    zip: new FormControl('', [Validators.required, Validators.pattern('^\\d{5}$')]),
    town: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    office_phone: new FormControl('', [Validators.required, Validators.pattern('^[6789]{1}[0-9]{8}$')]),
    personal_mobile: new FormControl('', [Validators.required, Validators.pattern('^[6789]{1}[0-9]{8}$')]),
    contrasenya: new FormControl('', [Validators.required, Validators.minLength(12)]),
    confContrasenya: new FormControl('', Validators.required),
    acceptarPolitiques: new FormControl('', Validators.required)
  });

  worker = new Worker();


  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private userdetails: UserdetailsService,
  ) { }

  ngOnInit(): void {
    this.userdetails.activeSuperadminLink = 'ADMIN_FIELD.NAVBAR.CREATE_OFFICER';
  }

  passwdMatch()
  {
    let password = this.form.controls['contrasenya'].value;
    let confPassword = this.form.controls['confContrasenya'].value;

    if(password != confPassword) {
      this.form.controls['confContrasenya'].setErrors({})
    }
  }

  onSubmit() {
    this.auth.create_worker(this.worker).subscribe(
      res => {
        if(res == 'success') {
          alert('Created officer successfully.');
          this.router.navigate(['admin-field']);
        }
      },
      error => {
        alert('Error occured!');
      }
    );
  }
}
