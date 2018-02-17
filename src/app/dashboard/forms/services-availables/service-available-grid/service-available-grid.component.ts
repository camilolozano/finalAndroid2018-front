import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { gridDataModel } from './services/service.model';
import { MatDialog, MatSnackBar, MatTableModule, MatPaginator, MatTableDataSource } from '@angular/material';
import 'rxjs/add/observable/of';
import { DataFormsService } from '../../service/data-forms.service';
import { UpdateDataSagComponent } from './update-data-sag/update-data-sag.component';
import { DeleteRowSaComponent } from './delete-row-sa/delete-row-sa.component';

@Component({
  selector: 'app-service-available-grid',
  templateUrl: './service-available-grid.component.html',
  styleUrls: ['./service-available-grid.component.css'],
  providers: [DataFormsService]
})
export class ServiceAvailableGridComponent implements OnInit {

  @Input() idServiceAvailable: number;
  @Input() isEditable: boolean;
  public dataSource: any;
  public data: any;
  private idUser: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dataFormsService: DataFormsService,
    public dialog: MatDialog
  ) { }

  displayedColumns = [];

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = +userInfo.idSystemUser;
    if (this.isEditable) {
      this.displayedColumns = [
        'no.',
        'cellularServiceProvider',
        'technologyType',
        'edit',
        'delete'
      ];
    } else {
      this.displayedColumns = [
        'no.',
        'cellularServiceProvider',
        'technologyType'
      ];
    }
    this.getDataGrid();
  }

  getDataGrid() {
    this.dataFormsService.getServicesAvailablesGrid(this.idUser, this.idServiceAvailable).subscribe(
      t => {
        this.data = t;
        this.dataSource = new MatTableDataSource<gridDataModel>(this.data);
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

  openDialog(_element) {
    const dialogRef = this.dialog.open(UpdateDataSagComponent, {
      width: '800px',
      data: {
        elements: _element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataGrid();
    });
  }

  addElement(){
    const dialogRef = this.dialog.open(UpdateDataSagComponent, {
      width: '800px',
      data: {
        elements: {
          idServiceAvailable_c: this.idServiceAvailable
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataGrid();
    });
  }


  deleteElement(_element){
    const dialogRef = this.dialog.open(DeleteRowSaComponent, {
      width: '300px',
      data: {
        elements: _element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
      } else {
        this.getDataGrid();
      }
    });
  }
}
