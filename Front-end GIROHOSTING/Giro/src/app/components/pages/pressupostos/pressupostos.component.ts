import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Subscriber } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser'
import { Time, ɵPLATFORM_BROWSER_ID } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { splitAtColon } from '@angular/compiler/src/util';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TranslateService } from "@ngx-translate/core";

import { ContactService } from "../../../services/contact.service";
import { UserdetailsService } from '../../../services/userdetails.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-pressupostos',
  templateUrl: './pressupostos.component.html',
  styleUrls: ['./pressupostos.component.scss']
})

export class PressupostosComponent implements OnInit {
  paramId: any
  role: any;
  displayedColumns: string[] = ['id', 'name', 'file', 'date_valid', 'date_modified', 'date_uploaded'];
  dataSource: MatTableDataSource<Array<Object>>;
  isLoaging: Boolean = true;
  isDisabled: Boolean = true;
  curFileRowId: any = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authService: AuthenticationService,
    private userDetailsService: UserdetailsService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private translate: TranslateService,
  ) { 
    route.paramMap.subscribe({
      next: params => {
        this.paramId = params.get('id');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  myForm = new FormGroup({
    row_id: new FormControl(''),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  get f(){
    return this.myForm.controls;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Methods': 'DELETE, PUT, GET, POST',
      Authorization: 'my-auth-token'
    })
  };

  openFileDialog(rowid) {
    let file_dialog = document.getElementById('file');  
    this.myForm.get('file').setValue('');
    file_dialog.click();
    this.curFileRowId = rowid;
    this.isDisabled = true;
  }
 
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.isDisabled = false;
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

  onClick(filepath) {
    this.contactService.downloadFile(filepath);
  }

  onClickLastBtn(filepath) {
    this.contactService.downloadSignedFile(filepath);
  }

  isShow:boolean=true;

  submit(e){
    const formData = new FormData();
    formData.append('row_id', e);
    formData.append('file', this.myForm.get('fileSource').value);
    this.userDetailsService.budgetUpdate(formData).subscribe(
      res => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate([`userpage/${this.paramId}/els-user-pressupostos/${this.paramId}`])
      });
      
    });

    // this.ngOnInit();
    
    //this.http.post('http://localhost:8000/index.php/api/budgetUpload', formData, this.httpOptions)
     //  .subscribe(res => {
     //  })
       
  }

  idUsuariAutenticat: any;

  pressupostos: any;

  pressupostos_signads: any;

  ngOnInit(): void 
  {
    $("select#selecIdioma").css('backgroundColor', '#04063c');
    $("nav").css('backgroundColor', '#04063c');

    this.userDetailsService.activeLink = 'USER_PAGE.BUTTON.PRESUPUESTOS';

    this.getrole();
    //Obtenir id de l'usuari autenticat
    this.authService.profile().subscribe(
      res => 
      {
        if(this.paramId == 0) {
          this.idUsuariAutenticat = res.idClient;        
        } else {
          this.idUsuariAutenticat = this.paramId;        
        }
        

        this.obtenirPressupostos();
        // this.obtenirPressupostosSignads();

      });

      // const selectedFileList = (<HTMLInputElement>document.getElementById('file')).files;
      // const file = selectedFileList.item(0);
      // const corte = file.name.split(".",1);
  }

  getrole() {
    this.authService.getrole().subscribe(
      res => {
        this.role = res;
      }
    );
  }

  obtenirPressupostos()
  {
    var idx = 1;
    this.userDetailsService.obtenirPressupostosUsuari(this.idUsuariAutenticat).subscribe(
      res =>
      {
        this.pressupostos = res; 

        this.pressupostos.forEach(elem => {
          elem.id = idx++;
        });

        this.dataSource = new MatTableDataSource(this.pressupostos);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.isLoaging = false;
      },
      error =>
      {
        alert("No s'han pogut obtenir els teus pressupostos, intenta-ho més tard.");
      });      
      
  }

  obtenirPressupostosSignads()
  {
    this.userDetailsService.obtenirPressupostosSignads(this.idUsuariAutenticat).subscribe(
      res =>
      {
        this.pressupostos_signads = res;
        //fk_projet
      });
  }
}