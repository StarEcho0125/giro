import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthenticationService } from "../../../services/authentication.service";
import { UserdetailsService } from "../../../services/userdetails.service";
import { Worker } from "../../../models/officer.module";
import { param } from 'jquery';

@Component({
  selector: 'app-edit-officer',
  templateUrl: './edit-officer.component.html',
  styleUrls: ['./edit-officer.component.scss']
})
export class EditOfficerComponent implements OnInit {
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
  });

  worker = new Worker();
  userid: any;
  role: any;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private userdetails: UserdetailsService,
  ) {
    route.paramMap.subscribe({
      next: params => {
        this.userid = params.get('id');
        this.role = params.get('role');
      }
    });
  }

  ngOnInit(): void {
    this.getWorkerInfo();
  }

  getWorkerInfo() {
    if(this.role == 1) {
      this.userdetails.activeSuperadminLink = 'ADMIN_FIELD.NAVBAR.SUPERADMIN_PAGE';
    } else if(this.role == 2) {
      this.userdetails.activeOfficerLink = 'ADMIN_FIELD.NAVBAR.EDIT_OFFICER';
    }

    this.auth.get_worker(this.userid).subscribe(
      (res: Worker) => {
        this.worker = res;
      }
    );
  }

  onSubmit() {
    this.auth.edit_worker(this.userid, this.worker).subscribe(
      res => {
        if(res == 'success') {
          alert('Updated successfully.');
        }
      }, 
      error => {
        alert('Error ocurred');
      }
    );
  }

}
