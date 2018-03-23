import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatTableModule, MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { LogOutService } from '../services/log-out.service';
import 'rxjs/add/observable/of';
import { NewOffertService } from '../sokets-services/new-offert/new-offert.service';

@Component({
  selector: 'app-listsolicitations',
  templateUrl: './listsolicitations.component.html',
  styleUrls: ['./listsolicitations.component.css'],
  providers: [LogOutService, NewOffertService]
})
export class ListsolicitationsComponent implements OnInit {

  private idUser: string;
  public companyName: string;
  public alerts: number;
  private idCompany: number;
  public data: any;
  public dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private logOutService: LogOutService,
    public snackBar: MatSnackBar,
    private newOffertService: NewOffertService
  ) { }

  displayedColumns = [
    'no.',
    'search',
    'client',
    'select-offer',
    'cancel-offer'
  ];

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.companyName = userInfo.nameBusiness;
    this.idUser = userInfo.idSystemUser;
    this.idCompany = userInfo.idCompany;

    this.getDescriptionOffers();
    this.getOferts();
  }

  getDescriptionOffers() {
    this.logOutService.getDescriptionOffers(this.idUser, this.idCompany).subscribe( t => {
      this.data = t.data;
      this.dataSource = new MatTableDataSource<any>(this.data);
    }, () => console.log('err'), () => {
      this.dataSource.paginator = this.paginator;
    });
  }

  selectOffer(e: any) {
    const body = {
      document: e.document
    };
    this.logOutService.postApplyOffer(this.idUser, this.idCompany, body).subscribe( t => {
      if (t.success) {
        this.getDescriptionOffers();
        this.snackBar.open(t.msg, 'Successful', {
          duration: 5000,
        });
      } else {
        this.snackBar.open(t.msg, 'Error', {
          duration: 5000,
        });
      }
    });
  }

  cancelOffer(e: any) {
    const body = {
      document: e.document
    };
    this.logOutService.putCancelOffer(this.idUser, this.idCompany, body).subscribe( t => {
      if (t.success) {
        this.getDescriptionOffers();
        this.snackBar.open(t.msg, 'Successful', {
          duration: 5000,
        });
      } else {
        this.snackBar.open(t.msg, 'Error', {
          duration: 5000,
        });
      }
    });
  }

  getOferts() {
    this.newOffertService.getTurnoSocket().subscribe(
      t => {
        const companies = t.payload;
        companies.map((e, i) => {
          if (+this.idCompany === +e.idCompany) {
            this.getDescriptionOffers();
          }
        });
      }
    );
  }
}
