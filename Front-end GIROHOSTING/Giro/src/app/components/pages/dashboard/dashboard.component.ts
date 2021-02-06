import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { UserdetailsService } from "../../../services/userdetails.service";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: any;
  displayedColumns: string[] = ['id', 'name'];
  dataSource: MatTableDataSource<Array<Object>>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userdetails: UserdetailsService,
    private auth: AuthenticationService,
    private router: Router,
    private roter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userdetails.activeSuperadminLink = 'ADMIN_FIELD.NAVBAR.DASHBOARD';
    this.getclient()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClick(rowid) {
    this.router.navigate(['admin-field/statistics', rowid]);
    // location.href = '/admin-field/statistics/' + rowid;
  }

  getclient() {
    var cnt = 1;
    this.userdetails.client().subscribe(      
      res => {
        this.users = res;

        this.users.forEach((val, idx) => {
          this.users[idx].id = cnt++;
        });

        this.dataSource = new MatTableDataSource(this.users);

        this.dataSource.paginator = this.paginator;
      },
      error => {
        alert('Can not get users');
      }
    );
  }

  // When the user clicks on the button, scroll to the top of the document
  topFunction() 
  {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  loadingScreen()
  {
    $('.container').addClass('hidden');

    setTimeout(function() {
      $('.container').removeClass('hidden');
    }, 2000);

    setTimeout(function() {
      $('.load').addClass('hidden');
    }, 2000);
  }

}
