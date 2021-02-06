import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserdetailsService } from '../../../services/userdetails.service';
import { ContactService } from "../../../services/contact.service";
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Subscriber } from 'rxjs';
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-contractes',
  templateUrl: './contractes.component.html',
  styleUrls: ['./contractes.component.scss']
})
export class ContractesComponent implements OnInit {
  paramId: any;
  role: any;
  displayedColumns: string[] = ['id', 'name', 'file', 'date_modified', 'date_valid', 'date_uploaded'];
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
    private route: ActivatedRoute, 
    private router: Router, 
    private contractService: ContactService,
    private transloate: TranslateService,
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
    fileSource: new FormControl('', [Validators.required]),    
  });
  get f(){
    return this.myForm.controls;
  }

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

  submit(e){
    const formData = new FormData();
    formData.append('row_id', e);
    formData.append('file', this.myForm.get('fileSource').value);
    this.userDetailsService.contractUpdate(formData).subscribe(res => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate([`userpage/${this.paramId}/els-user-contractes/${this.paramId}`])
      });
    })
    
    // this.http.post('http://localhost:8001/index.php/api/budgetUpload', formData)
    //   .subscribe(res => {
    //     alert('Uploaded Successfully.');
    //   })
  }

  onClick(file_path) {
    this.contractService.downloadFile(file_path);
  }

  onClickLastBtn(filepath) {
    this.contractService.downloadSignedFile(filepath);
  }

  idUsuariAutenticat: any;

  contractes: any;

  ngOnInit(): void 
  {
    $("select#selecIdioma").css('backgroundColor', '#04063c');
    $("nav").css('backgroundColor', '#04063c');
    
    this.userDetailsService.activeLink = 'USER_PAGE.BUTTON.CONTRATOS';

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

        this.obtenirContractes();
        
      });  

  }

  getrole() {
    this.authService.getrole().subscribe(
      res => {
        this.role = res;
      }
    );
  }

  obtenirContractes()
  {
    var idx = 1;
    this.userDetailsService.obtenirContratosUsuari(this.idUsuariAutenticat).subscribe(
      res =>
      {
        this.contractes = res;

        this.contractes.forEach(elem => {
          elem.id = idx++;
        });

        this.dataSource = new MatTableDataSource(this.contractes);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.isLoaging = false;
      },
      error =>
      {
        alert("No s'han pogut obtenir els teus contractes, intenta-ho més tard.");
      });
  }


}
