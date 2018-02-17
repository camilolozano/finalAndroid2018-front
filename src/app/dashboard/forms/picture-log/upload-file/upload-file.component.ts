import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { UpdateDataService } from '../../service/update-data.service';
import { Config } from '../../../../config/config';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
  providers: [UpdateDataService]
})
export class UploadFileComponent implements OnInit {

  private idUser: number;
  public URL_UPLOAD: string;

  constructor(
    private updateDataService: UpdateDataService,
    public dialogRef: MatDialogRef<UploadFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = +userInfo.idSystemUser;
    const server = Config.server;
    this.URL_UPLOAD = `${server}/update-events/picture-update/${this.idUser}&${this.data.id}`;
  }

  onUpload(event: any) {
    let res: any;
    res = JSON.parse(event.xhr.response);
    const data = res.nuevaImagen;
    if (res.success) {
      this.dialogRef.close({msg: res.msg, flag: 1, img: res.img});
      this.snackBar.open(res.msg, 'Success', {
        duration: 5000,
      });
    } else {
      this.dialogRef.close({msg: res.msg, flag: 1});
    }
  }
}
