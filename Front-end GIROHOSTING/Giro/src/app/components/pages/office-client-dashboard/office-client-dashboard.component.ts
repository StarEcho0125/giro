import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import { UserdetailsService } from '../../../services/userdetails.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-office-client-dashboard',
  templateUrl: './office-client-dashboard.component.html',
  styleUrls: ['./office-client-dashboard.component.scss']
})
export class OfficeClientDashboardComponent implements OnInit {
  id: any;
  customers: any;

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

  ngOnInit(): void {
    this.mycustomer();

    this.userDetailsService.activeOfficerLink = 'Estadísticas por cliente';
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  getstatistics(userid) {
    this.router.navigate(['worker', this.id, 'client-statistics', userid]);
  }
}
