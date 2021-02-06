import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserdetailsService } from "../../../services/userdetails.service";
import { AuthenticationService } from "../../../services/authentication.service";
import { Worker } from "../../../models/officer.module";
import { GlobalConstant } from "../../../common/global-constants";
import { param } from 'jquery';

@Component({
  selector: 'app-ver-officer-info',
  templateUrl: './ver-officer-info.component.html',
  styleUrls: ['./ver-officer-info.component.scss']
})
export class VerOfficerInfoComponent implements OnInit {
  imgForm = new FormGroup({
    row_id: new FormControl(''),
    imgfile: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  fileData: File = null;
  previewUrl: any = GlobalConstant.apiURL + 'logos/default.png';  
  is_default = true;

  userid: any;
  officer_id: any;
  worker = new Worker();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userdetails: UserdetailsService,
    private auth: AuthenticationService
  ) {
    route.paramMap.subscribe({
      next: params => {
        this.officer_id = params.get('officer_id');
        this.userid = params.get('user_id');
      }
    })
  }

  ngOnInit(): void {
    this.userdetails.activeOfficerLink = 'ADMIN_FIELD.NAVBAR.EDIT_OFFICER';

    this.getlogo();    
    this.getworkerinfo();
  }

  getworkerinfo() {
    this.auth.get_worker(this.officer_id).subscribe(
      res => {
        this.worker.email = res['email'];
        this.worker.lastname = res['lastname'];
        this.worker.firstname = res['firstname'];
        this.worker.office_phone = res['office_phone'];
        this.worker.personal_mobile = res['personal_mobile'];
        this.worker.login = res['login'];
        this.worker.zip = res['zip'];
        this.worker.town = res['town'];
        this.worker.address = res['address']
      }
    );
  }

  edit_client() {
    this.router.navigate(['worker', this.officer_id, 'edit-officer-info', this.officer_id, 2]);
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
}
