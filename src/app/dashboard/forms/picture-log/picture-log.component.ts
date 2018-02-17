import { Component, OnChanges, Input, OnInit } from '@angular/core';
import { DataFormsService } from '../service/data-forms.service';
import { MatDialog } from '@angular/material';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { DeleteFileComponent } from './delete-file/delete-file.component';
import { CreateFileComponent } from './create-file/create-file.component';

@Component({
  selector: 'app-picture-log',
  templateUrl: './picture-log.component.html',
  styleUrls: ['./picture-log.component.scss'],
  providers: [DataFormsService]
})
export class PictureLogComponent implements  OnInit, OnChanges {
  private idUser: number;
  private pathImage: string;
  public data: any;
  public image: string;
  public photoSelected: any;
  public deleteImage: Boolean = false;
  public selectImg: number;
  public nameImage: string;
  public stateLoadImage: Boolean;
  @Input() idEvent: number;
  @Input() isEditable: boolean;

  constructor(
    private dataFormsService: DataFormsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(){
    this.stateLoadImage = true;
  }

  ngOnChanges() {
    // console.log(this.idEvent);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo !== undefined && userInfo !== null) {
      this.idUser = +userInfo.idSystemUser;
      this.pathImage = this.dataFormsService.getImagePath();
      this.getData();
    }
  }

  selectImage(d: any, i: number) {
    this.stateLoadImage = false;
    this.photoSelected = null;
    setTimeout(() => {
      this.stateLoadImage = true;
      this.nameImage = d.description;
      this.photoSelected = d;
      this.image = `${this.pathImage}/${this.photoSelected.uuid.toUpperCase()}.jpeg`;
      this.selectImg = i;
      if (i >= 9) {
        this.deleteImage = true;
      } else {
        this.deleteImage = false;
      }
    }, 1000);
  }

  getData() {
    this.dataFormsService.getPictureLog(this.idUser, +this.idEvent).subscribe(
      t => {
        this.data = t.data;
      }
    );
  }

  getActionImage(flag: number) {
    if (+flag === 1) {
      // update image

      const dialogRe = this.dialog.open(UploadFileComponent, {
        width: '300px',
        data: {
          elements: this.photoSelected.uuid.toUpperCase(),
          id: this.photoSelected.idpicturesLogo,
        }
      });

      dialogRe.afterClosed().subscribe(async result => {
        if (result === undefined) {
        } else {
          await this.getData();
          this.image = `${this.pathImage}/${result.img.toUpperCase()}.jpeg`;
        }
      });

    } else if (+flag === 2) {
      // delete image
      const dialogRe = this.dialog.open(DeleteFileComponent, {
        width: '300px',
        data: {
          elements: this.photoSelected.uuid.toUpperCase(),
          id: this.photoSelected.idpicturesLogo,
        }
      });

      dialogRe.afterClosed().subscribe(async result => {
        if (result.msg !== "") {
          await this.getData();
          this.photoSelected = undefined;
        }
      });

    } else if (+flag === 3) {
      // Create image
      const dialogRe = this.dialog.open(CreateFileComponent, {
        width: '300px',
        data: {
          idEvent: this.idEvent
        }
      });

      dialogRe.afterClosed().subscribe(async result => {
        if (result === undefined) {
        } else {
          await this.getData();
        }
      });

    }

  }


}
