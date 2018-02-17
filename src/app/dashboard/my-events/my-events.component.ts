import { Component, OnInit, ViewChild } from '@angular/core';
import { MyEventsService } from './services/my-events.service';
import { DataSource } from '@angular/cdk/collections';
import { Events } from './services/myEvents.model';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatSnackBar, MatTableModule, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
declare var saveAs: any;

import 'rxjs/add/observable/of';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css'],
  providers: [MyEventsService]
})
export class MyEventsComponent implements OnInit {

  private idUser: string;
  public position: string;
  public dataSource: any;
  public data: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private myEventsService: MyEventsService,
    private router: Router
  ) { }

  displayedColumns = [
    'no.',
    'idevent',
    'surveyor',
    'identifier',
    'site_name',
    'directionToSite',
    'date_create',
    'action'
  ];


  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = userInfo.idSystemUser;
    this.getMyEvents();
    this.position = 'before';
  }

  getMyEvents() {
    this.myEventsService.getListMyEvents(this.idUser).subscribe(
      t => {
        this.data = t;
        this.dataSource = new MatTableDataSource<Events>(this.data);
      },
      (err) => console.log(err),
      () => {
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  goMoreInfo(data: number) {
    this.router.navigate(['home/forms-data', data]);
  }

  download() {
    const body = {
      filters: {
        id_user: this.idUser
      }
    };
    this.myEventsService.download(this.idUser, JSON.stringify(body)).subscribe(
      res => {
        saveAs(res, 'myevents.xlsx');
      },
      err => console.log(err)
    );
  }

}
