import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateDataService } from '../../service/update-data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-delete-file',
  templateUrl: './delete-file.component.html',
  styleUrls: ['./delete-file.component.css'],
  providers: [UpdateDataService]
})
export class DeleteFileComponent implements OnInit {
  private idUser: number;

  constructor(
    public dialogRef: MatDialogRef<DeleteFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private updateDataService: UpdateDataService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = +userInfo.idSystemUser;
  }

  delete() {
    const body = this.data;
    this.updateDataService.putStateImages(this.idUser, body).subscribe(
      t => {
        this.dialogRef.close({ msg: t.msg, flag: 'DEL' });
        this.snackBar.open(t.msg, 'Success', {
          duration: 5000,
        });
      }
    )
  }

  cancel() {
    this.dialogRef.close({ msg: '', flag: 'CANCEL' });
  }

}
