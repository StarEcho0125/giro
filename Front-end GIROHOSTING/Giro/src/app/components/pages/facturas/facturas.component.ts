import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserdetailsService } from '../../../services/userdetails.service';
import { ContactService } from "../../../services/contact.service";
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { TranslateService } from "@ngx-translate/core";
import { Subscriber } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {
  paramId: any;
  displayedColumns: string[] = ['id', 'name', 'file', 'date_modified', 'date_valid'];
  dataSource: MatTableDataSource<Array<Object>>;
  isLoaging: Boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authService: AuthenticationService, 
    private userDetailsService: UserdetailsService,
    private http: HttpClient, 
    private route: ActivatedRoute, 
    private contractService: ContactService,
    private translate: TranslateService,
  ) {
    route.paramMap.subscribe({
      next: params => {
        this.paramId = params.get('id');
      }
    });
  }
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  get f(){
    return this.myForm.controls;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
     
  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

  onClick(file_path) {
    this.contractService.downloadFile(file_path);
  }
     
  submit(){
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource').value);
    this.userDetailsService.budgetUpdate(formData).subscribe(res => {
      alert('Uploaded Successfully.');
    })
    
    // this.http.post('http://localhost:8001/index.php/api/budgetUpload', formData)
    //   .subscribe(res => {
    //     alert('Uploaded Successfully.');
    //   })
  }

  idUsuariAutenticat: any;

  facturas: any;

  ngOnInit(): void 
  {
    $("select#selecIdioma").css('backgroundColor', '#04063c');
    $("nav").css('backgroundColor', '#04063c');
    
    this.userDetailsService.activeLink = 'USER_PAGE.BUTTON.FACTURAS';    

    //Obtenir id de l'usuari autenticat
    this.authService.profile().subscribe(
      res => 
      {
        if(this.paramId == 0) {
          this.idUsuariAutenticat = res.idClient;
        } else {
          this.idUsuariAutenticat = this.paramId;
        }

        this.obtenirFacturas();
        
      });  
  }

  obtenirFacturas()
  {
    var idx = 1;

    this.userDetailsService.obtenirFacturasUsuari(this.idUsuariAutenticat).subscribe(
      res =>
      {
        this.facturas = res;

        this.facturas.forEach(elem => {
          elem.id = idx++;
        });

        this.dataSource = new MatTableDataSource(this.facturas);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.isLoaging = false;
      },
      error =>
      {
        alert("No s'han pogut obtenir els teus facturas, intenta-ho més tard.");
      });
      
  }
}
