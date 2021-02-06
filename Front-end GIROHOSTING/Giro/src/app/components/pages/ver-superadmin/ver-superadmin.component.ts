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
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-ver-superadmin',
  templateUrl: './ver-superadmin.component.html',
  styleUrls: ['./ver-superadmin.component.scss']
})
export class VerSuperadminComponent implements OnInit {
  displayedClientColumns: string[] = ['name', 'client'];
  displayedAdminColumns: string[] = ['name', 'admin'];
  dataClientSource: MatTableDataSource<Array<Object>>;
  dataAdminSource: MatTableDataSource<Array<Object>>;

  @ViewChild('paginatorClient') paginatorClient: MatPaginator;
  @ViewChild('paginatorAdmin') paginatorAdmin: MatPaginator;
  @ViewChild('clientTableSort') clientTableSort: MatSort;
  @ViewChild('adminTableSort') adminTableSort: MatSort;

  constructor(
    private userDetailsService: UserdetailsService,
    private auth: AuthenticationService,
    public meta: Meta, public title: Title,
    public translate: TranslateService,
    // private confirm: ConfirmationDialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getuserid();
    this.loadingScreen();
    this.getclient();
    this.getadministrator();
    //this.getlogo()

    this.userDetailsService.activeSuperadminLink = 'ADMIN_FIELD.NAVBAR.SUPERADMIN_PAGE';
  }

  applyClientFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataClientSource.filter = filterValue.trim().toLowerCase();

    if (this.dataClientSource.paginator) {
      this.dataClientSource.paginator.firstPage();
    }
  }  

  onClickPassChange() {
    this.router.navigate(['changepassword', this.userid, 1]);
  }

  applyAdminFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataAdminSource.filter = filterValue.trim().toLowerCase();

    if (this.dataAdminSource.paginator) {
      this.dataAdminSource.paginator.firstPage();
    }
  }  

  //Validació formulari
  form = new FormGroup({
    nom: new FormControl('', Validators.required),
    nomEmpresa: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.pattern('^[6789]{1}[0-9]{8}$')]),
    acceptarPolitiques: new FormControl('', Validators.required)
  })



  dadesContacte = new DadesTrucar();

  users: any;
  workers: any;
  state: number;
  userid: number;

  getlogo() {
    this.userDetailsService.getlogo(this.userid).subscribe(
      res => {
        if (res != null) {
          this.previewUrl = res;
        }
        else{this.previewUrl = "http://localhost:8000/logos/default.png";}
      });
  }

  getuserid() {
    this.auth.profile().subscribe(
      res => {
        this.userid = res.idClient;
      }
    );
  }

  fileData: File = null;
  previewUrl: any = null;

  imgForm = new FormGroup({
    row_id: new FormControl(''),
    imgfile: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  onfileChange(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.imgForm.patchValue({
      fileSource: this.fileData
    });
    this.preview();
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
    }

  }
  rowid: any;

  onSubmit() {
    // $("#submit").hide();
    this.rowid = 166;
    const formData = new FormData();
    formData.append('row_id', this.rowid);
    formData.append('file', this.imgForm.get('fileSource').value);


    this.userDetailsService.logoUpload(formData).subscribe(
      res => {
        alert("Your logo uploaded successfuly")
        this.previewUrl = res;
      }
    )
  }
  clickimg() {
    $('#my_file').click();
  }

  getclient() {
    this.userDetailsService.client().subscribe(
      res => {
        this.users = res;

        this.dataClientSource = new MatTableDataSource(this.users);

        this.dataClientSource.paginator = this.paginatorClient;
        this.dataClientSource.sort = this.clientTableSort;
      },
      error => {
        alert('Can not get users');
      }
    );
  }

  getadministrator() {
    this.userDetailsService.worker().subscribe(
      res => {
        this.workers = res;

        this.dataAdminSource = new MatTableDataSource(this.workers);

        this.dataAdminSource.paginator = this.paginatorAdmin;
        this.dataAdminSource.sort = this.adminTableSort;
      },
      error => {
        alert('Can not get workers');
      }
    );
  }

  loadingScreen() {
    $('.container').addClass('hidden');

    setTimeout(function () {
      $('.container').removeClass('hidden');
    }, 2000);

    setTimeout(function () {
      $('.load').addClass('hidden');
    }, 2000);
  }


  createclient() {
    this.state = 3;
    this.router.navigate(['createuser', this.state]);
  }

  editclient(rowid, role) {
    this.router.navigate(['userpage', rowid, 'edituser', rowid, role])
  }

  editworker(rowid) {
    this.router.navigate(['admin-field', 'editworker', rowid, 1]);
  }

  deleteclient(rowid, role) {

    if(confirm("Seguro que quieres eliminarlo")) {
      this.userDetailsService.delete(rowid, role).subscribe(
        res => {
          this.ngOnInit();
        }
      )
    }
    
  }
  

  createworker() {
    //this.state = 2;
    //this.router.navigate(['createuser', this.state]);

    this.router.navigate(['createworker']);
  }
  getuser(userid) {
    this.router.navigate(['userpage', userid])
  }
  getworker(userid) {
    this.router.navigate(['worker', userid])
  }

}
