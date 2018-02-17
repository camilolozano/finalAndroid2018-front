import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateDataService } from '../../../service/update-data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-delete-row',
  templateUrl: './delete-row.component.html',
  styleUrls: ['./delete-row.component.css'],
  providers: [UpdateDataService]
})
export class DeleteRowComponent implements OnInit {

  private idUser: number;

  constructor(
    public dialogRef: MatDialogRef<DeleteRowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private updateDataService: UpdateDataService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = userInfo.idSystemUser;
  }

  delete() {
    const body = {
      idstructureInformation: this.data.elements['idstructureInformation'],
      idstructureInformationGrid: this.data.elements['idstructureInformationGrid']
    }
    this.updateDataService.postDeleteStructureInformationRow(this.idUser, body).subscribe(
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
