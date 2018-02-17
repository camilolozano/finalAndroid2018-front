import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Config } from '../../../../config/config';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateDataService } from '../../service/update-data.service';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.css'],
  providers: [UpdateDataService]
})
export class CreateFileComponent implements OnInit {

  public pictureForm: FormGroup;
  public URL_UPLOAD: string;
  public idUser: number;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private updaDataService: UpdateDataService,
    public snackBar: MatSnackBar,
  ) {
    this.pictureForm = this.fb.group({
      idEvent: [
        null,
        Validators.compose([Validators.required])
      ],
      description: [
        null,
        Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9A-Za-z ]+'), Validators.required])
      ],
      UUID: [
        null,
        Validators.compose([Validators.required])
      ]
    })
  }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = +userInfo.idSystemUser;
    const server = Config.server;
    this.URL_UPLOAD = `${server}/update-events/picture-file-upload/${this.idUser}`;
  }

  onUpload(event: any) {
    let res: any;
    res = JSON.parse(event.xhr.response);
    const data = res.nuevaImagen;
    if (res.success) {
      this.pictureForm.controls['UUID'].setValue(res.uuid);
      this.pictureForm.controls['idEvent'].setValue(this.data.idEvent);
    } else {
    }
  }

  onSubmit() {
    const body = this.pictureForm.value;
    this.updaDataService.postPictureFileSave(this.idUser, body).subscribe(
      t => {
        this.dialogRef.close({msg: 'upload'});
        this.snackBar.open(t.msg, 'Success', {
          duration: 5000,
        });
      }
    )


  }


}
