import { Component, OnInit, Inject } from '@angular/core';
import {
  MatSnackBar,
  MatTableModule,
  MatPaginator,
  MatTableDataSource,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { LogOutService } from '../../services/log-out.service';

@Component({
  selector: 'app-element-price',
  templateUrl: './element-price.component.html',
  styleUrls: ['./element-price.component.css'],
  providers: [LogOutService]
})
export class ElementPriceComponent implements OnInit {
  public price: number;
  private idUser: string;
  public companyName: string;
  private idCompany: number;
  public validateSendInput;

  constructor(
    public dialogRef: MatDialogRef<ElementPriceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    private logOutService: LogOutService
  ) {}

  ngOnInit() {
    this.validateSendInput = null;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.companyName = userInfo.nameBusiness;
    this.idUser = userInfo.idSystemUser;
    this.idCompany = userInfo.idCompany;
  }

  activateButtonSend(e: any) {
    if ( e !== null && e !== '' ) {
      this.validateSendInput = '';
    } else {
      this.validateSendInput = null;
    }
  }

  agregar() {
    const body = {
      document: this.data.data.document,
      idclient: this.data.data.idclient,
      flagdocumet: this.data.data.flagdocumet,
      price: this.price
    };
    this.logOutService
      .postApplyOffer(this.idUser, this.idCompany, body)
      .subscribe(
        t => {
          if (t.success) {
            this.snackBar.open(t.msg, 'Successful', {
              duration: 5000
            });
          } else {
            this.snackBar.open(t.msg, 'Error', {
              duration: 5000
            });
          }
        },
        err => console.log(err),
        () => {
          this.dialogRef.close();
        }
      );
  }
}
