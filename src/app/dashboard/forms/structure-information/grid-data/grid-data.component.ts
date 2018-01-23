import { Component, OnInit, Input, Inject, OnChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { gridDataModel } from './services/gridDataModel.model';
import 'rxjs/add/observable/of';
import { DataFormsService } from '../../service/data-forms.service';
import { UpdateDataComponent } from './update-data/update-data.component';
import { MatDialog, MatSnackBar, MatTableModule, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-grid-data',
  templateUrl: './grid-data.component.html',
  styleUrls: ['./grid-data.component.css'],
  providers: [DataFormsService]
})
export class GridDataComponent implements OnInit, OnChanges {

  @Input() idStructureInformation: number;
  @Input() isEditable: boolean;
  public dataSource: any;
  public data: any;
  private idUser: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dataFormsService: DataFormsService,
    public dialog: MatDialog
  ) { }
  displayedColumns: any[];

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = userInfo.idSystemUser;
    this.getDataGrid();
  }

  getDataGrid() {
    this.dataFormsService.getStructureInformationGrid(+this.idUser, this.idStructureInformation).subscribe(
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

  ngOnChanges() {
    if (this.isEditable) {
      this.displayedColumns = [
        'no.',
        'idAntenaType',
        'height',
        'legLocation',
        'qty',
        'azimuth',
        'lines',
        'edit'
      ];
    } else {
      this.displayedColumns = [
        'no.',
        'idAntenaType',
        'height',
        'legLocation',
        'qty',
        'azimuth',
        'lines'
      ];
    }
    this.getDataGrid();
  }

  openDialog(_element) {
    const dialogRef = this.dialog.open(UpdateDataComponent, {
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
    const dialogRef = this.dialog.open(UpdateDataComponent, {
      width: '800px',
      data: {
        elements: {
          idStructureInformation: this.idStructureInformation
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataGrid();
    });
  }

}
