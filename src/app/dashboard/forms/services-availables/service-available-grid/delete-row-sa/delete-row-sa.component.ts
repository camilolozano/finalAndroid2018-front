import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateDataService } from '../../../service/update-data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-delete-row-sa',
  templateUrl: './delete-row-sa.component.html',
  styleUrls: ['./delete-row-sa.component.css'],
  providers: [UpdateDataService]
})
export class DeleteRowSaComponent implements OnInit {
  private idUser: number;

  constructor(
    public dialogRef: MatDialogRef<DeleteRowSaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private updateDataService: UpdateDataService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = userInfo.idSystemUser;
  }

  delete() {
    console.log(this.data.elements);
    const body = {
      idServiceAvailableGrid: this.data.elements['idServiceAvailableGrid'],
      idServicesAvailable: this.data.elements['idServicesAvailable']
    }
    this.updateDataService.postDeleteServiceAvailableRow(this.idUser, body).subscribe(
      t => {
        this.dialogRef.close({ msg: t.msg, flag: 'DEL' });
        this.snackBar.open(t.msg, 'Success', {
          duration: 5000,
        });
      }
    );
  }

  cancel() {
    this.dialogRef.close({ msg: '', flag: 'CANCEL' });
  }

}
