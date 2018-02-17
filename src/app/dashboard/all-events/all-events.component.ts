import { Component, OnInit, ViewChild } from '@angular/core';
import { AllEventsService } from './services/all-events.service';
import { DataSource } from '@angular/cdk/collections';
import { Events } from './services/allEvents.model';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatSnackBar, MatTableModule, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
declare var saveAs: any;
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css'],
  providers: [AllEventsService]
})
export class AllEventsComponent implements OnInit {

  private idUser: string;
  public position: string;
  public dataSource: any;
  public data: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private allEventsService: AllEventsService
  ) { }

  // dataSource = new DataTableInfo(this.allEventsService);


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
    this.getAllEvents();
    this.position = 'before';
  }

  getAllEvents() {
    this.allEventsService.getListAllEvents(this.idUser).subscribe(
      t => {
        this.data = t;
        this.dataSource = new MatTableDataSource<Events>(this.data);
      },
      (err) => console.log(err),
      () => {
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialog(idEvent: number) {
    this.router.navigate(['home/detail-all-events', idEvent]);
  }

  download() {
    this.allEventsService.download(this.idUser).subscribe(
      res => {
        saveAs(res, 'allevents.xlsx');
      },
      err => console.log(err)
    );
  }

}
