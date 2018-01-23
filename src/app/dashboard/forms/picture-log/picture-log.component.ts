import { Component, OnChanges, Input } from '@angular/core';
import { DataFormsService } from '../service/data-forms.service';
import { MatDialog } from '@angular/material';
import { UploadFileComponent } from './upload-file/upload-file.component';

@Component({
  selector: 'app-picture-log',
  templateUrl: './picture-log.component.html',
  styleUrls: ['./picture-log.component.scss'],
  providers: [ DataFormsService ]
})
export class PictureLogComponent implements OnChanges {
  private idUser: number;
  private pathImage: string;
  public data: any;
  public image: string;
  public photoSelected: any;
  @Input() idEvent: number;
  @Input() isEditable: boolean;

  constructor(
    private dataFormsService: DataFormsService,
    public dialog: MatDialog
  ) { }

  ngOnChanges() {
    // console.log(this.idEvent);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo !== undefined && userInfo !== null) {
      this.idUser = +userInfo.idSystemUser;
      this.pathImage = this.dataFormsService.getImagePath();
      this.getData();
    }
  }

  selectImage(d: any) {
    this.photoSelected = d;
    this.image = `${this.pathImage}/${this.photoSelected.uuid.toUpperCase()}.jpeg`;
  }


  getData() {
    this.dataFormsService.getPictureLog(this.idUser, +this.idEvent).subscribe(
      t => {
        this.data = t.data;
      }
    );
  }

  getEditImage() {
    const dialogRef = this.dialog.open(UploadFileComponent, {
      width: '300px',
      data: {
        elements: '1'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.dataSource = new DataTableInfo(this.dataFormsService, this.idStructureInformation);
    });


    console.log(this.photoSelected.uuid.toUpperCase());
  }

}
