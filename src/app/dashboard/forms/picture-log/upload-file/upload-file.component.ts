import { Component, OnInit, ViewChild } from '@angular/core';
import { UpdateDataService } from '../../service/update-data.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
  providers: [UpdateDataService]
})
export class UploadFileComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  private idUser: number;

  constructor(
    private updateDataService: UpdateDataService
  ) { }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = +userInfo.idSystemUser;
  }

  upload() {
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append("image", fileBrowser.files[0]);
      this.updateDataService.putPicture(this.idUser, formData).subscribe(
        t => {
          console.log(t);
        }
      )

    }
  }
}
