import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserdetailsService } from '../../../services/userdetails.service';
import { AuthenticationService, TokenPayload } from '../../../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-ver-officer',
  templateUrl: './ver-officer.component.html',
  styleUrls: ['./ver-officer.component.scss']
})
export class VerOfficerComponent implements OnInit {
  id: any;
  role: any = null;
  officername: any;

  displayedColumns: string[] = ['id', 'name'];
  dataSource: MatTableDataSource<Array<Object>>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private userDetailsService: UserdetailsService,
    private route: ActivatedRoute
  ) { 
    route.paramMap.subscribe({
      next: params => {
        this.id = params.get('id');
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

  customers: any;

  ngOnInit(): void {
    this.mycustomer();
    // this.getlogo();
    this.getrole();

    this.userDetailsService.activeOfficerLink = 'ADMIN_FIELD.NAVBAR.OFFICER_PAGE';
  }  

  getlogo() {
    this.auth.getlogo().subscribe(
      res => {
        
        if (res != null) {
          this.previewUrl = res;
        }
        else{this.previewUrl = "http://localhost:8000/logos/default.png";}
      });
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

  onSubmit() {
    // $("#submit").hide();
    const formData = new FormData();
    formData.append('row_id', this.id);
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

  mycustomer() {
    var idx = 1;  
    this.userDetailsService.getmycustomer(this.id).subscribe(
      res => {
        this.customers = res;

        this.customers.forEach(elem => {
          elem.id = idx++;
        });

        this.dataSource = new MatTableDataSource(this.customers);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  getcustomer(id){
    this.router.navigate(['userpage', id]);
  }
}
