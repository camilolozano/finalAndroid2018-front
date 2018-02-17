import { Component, OnInit, ViewChild } from '@angular/core';
import { AllEventsService } from '../all-events/services/all-events.service';
import { DataSource } from '@angular/cdk/collections';
import { Events } from '../all-events/services/allEvents.model';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatSnackBar, MatTableModule, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
declare var saveAs: any;
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-edit-all-events',
  templateUrl: './edit-all-events.component.html',
  styleUrls: ['./edit-all-events.component.css'],
  providers: [AllEventsService]
})
export class EditAllEventsComponent implements OnInit {

  private idUser: string;
  public position: string;
  public dataSource: any;
  public data: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private allEventsService: AllEventsService
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
    this.router.navigate(['home/forms-data', idEvent]);
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

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class DataTableInfo extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */

  private events: Events[];
  private idUser: string;

  constructor(
    private allEventsService: AllEventsService
  ) {
    super();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = userInfo.idSystemUser;
  }

  connect(): Observable<Events[]> {
    return this.allEventsService.getListAllEvents(this.idUser);
  }

  disconnect() { }
}
