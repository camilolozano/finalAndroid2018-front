import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  MatSnackBar,
  MatTableModule,
  MatPaginator,
  MatTableDataSource,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { LogOutService } from '../services/log-out.service';
import 'rxjs/add/observable/of';
import { NewOffertService } from '../sokets-services/new-offert/new-offert.service';
import { ChatComponent } from '../chat/chat.component';
import { ElementPriceComponent } from './element-price/element-price.component';

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
    private newOffertService: NewOffertService,
    public dialog: MatDialog
  ) { }

  displayedColumns = [
    'no.',
    'typeShop',
    'search',
    'client',
    'select-offer',
    'cancel-offer',
    'chat-offer'
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
      console.log(t.data);
      this.dataSource = new MatTableDataSource<any>(this.data);
    }, () => console.log('err'), () => {
      this.dataSource.paginator = this.paginator;
    });
  }

  addPrice(e: any) {
    const body = {
      document: e.master,
      idclient: e.idclient,
      flagdocumet: e.document
    };
    const dialogRef = this.dialog.open(ElementPriceComponent, {
      width: '350px',
      data: { data: body }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDescriptionOffers();
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

  openChat(e: any): void {
    const dialogRef = this.dialog.open(ChatComponent, {
      width: '600px',
      height:  '400px',
      data: { data: e }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
