import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataFormsService } from '../../../service/data-forms.service';
import { UpdateDataService } from '../../../service/update-data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css'],
  providers: [DataFormsService, UpdateDataService]
})
export class UpdateDataComponent implements OnInit {

  public updateGridForm: FormGroup;
  public antenaType: any[];
  public idUser: number;

  constructor(
    public dialogRef: MatDialogRef<UpdateDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataFormsService: DataFormsService,
    private updateDataService: UpdateDataService,
    public snackBar: MatSnackBar,
  ) {
    if (this.data['elements'].idStructureInformation) {
      // Formulario para crear nuevo
      this.updateGridForm = this.fb.group({
        antenatype: [
          null,
          Validators.compose([Validators.required])
        ],
        height: [
          null,
          Validators.compose([Validators.pattern('[0-9,]+'), Validators.maxLength(30), Validators.required])
        ],
        legLocation: [
          null,
          Validators.compose([Validators.required, Validators.pattern('[0-9,]+'), Validators.maxLength(30), Validators.required])
        ],
        qty: [
          null,
          Validators.compose([Validators.pattern('[0-9,]+'), Validators.maxLength(30), Validators.required])
        ],
        azimuth: [
          null, Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9,]+'), Validators.required])
        ],
        lines: [
          null, Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9,]+'), Validators.required])
        ],
        idStructureInformation: [
          null, Validators.compose([Validators.required])
        ]
      });

    } else {
      // Formulario para actualizar
      this.updateGridForm = this.fb.group({
        antenatype: [
          null,
          Validators.compose([Validators.required])
        ],
        height: [
          null,
          Validators.compose([Validators.pattern('[0-9,]+'), Validators.maxLength(30), Validators.required])
        ],
        legLocation: [
          null,
          Validators.compose([Validators.required, Validators.pattern('[0-9,]+'), Validators.maxLength(30), Validators.required])
        ],
        qty: [
          null,
          Validators.compose([Validators.pattern('[0-9,]+'), Validators.maxLength(30), Validators.required])
        ],
        azimuth: [
          null, Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9,]+'), Validators.required])
        ],
        lines: [
          null, Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9,]+'), Validators.required])
        ],
        idstructureInformationGrid: [
          null, Validators.compose([Validators.required])
        ]
      });
    }
  }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = +userInfo.idSystemUser;
    this.antenaType = [];
    this.getData();
    this.getAntenaType();
  }

  getAntenaType() {
    this.dataFormsService.getAntenaType(this.idUser).subscribe(
      t => {
        if (t.success) {
          this.antenaType = t.data;
        } else {
          console.log('Error conection');
        }
      }
    );
  }

  getData() {
    if (this.data['elements'].idStructureInformation) {
      this.updateGridForm.controls['idStructureInformation'].setValue(+this.data['elements'].idStructureInformation);
    } else {
      this.updateGridForm.controls['antenatype'].setValue(+this.data['elements'].idAntenaType);
      this.updateGridForm.controls['height'].setValue(this.data['elements'].height);
      this.updateGridForm.controls['legLocation'].setValue(this.data['elements'].legLocation);
      this.updateGridForm.controls['qty'].setValue(this.data['elements'].qty);
      this.updateGridForm.controls['azimuth'].setValue(this.data['elements'].azimuth);
      this.updateGridForm.controls['lines'].setValue(this.data['elements'].lines);
      this.updateGridForm.controls['idstructureInformationGrid'].setValue(this.data['elements'].idstructureInformationGrid);
    }
  }

  onSubmit() {
    const body = this.updateGridForm.value;
    if (this.data['elements'].idStructureInformation) {
      this.updateDataService.postStructureInformationGrid(this.idUser, body).subscribe(
        t => {
          if (t.success) {
            this.snackBar.open(t.msg, 'Successful', {
              duration: 5000,
            });
            this.dialogRef.close();
          } else {
            this.snackBar.open(t.msg, 'Error', {
              duration: 5000,
            });
            this.dialogRef.close();
          }
        }
      );
    } else {
      this.updateDataService.putStructureInformationGrid(this.idUser, body).subscribe(
        t => {
          if (t.success) {
            this.snackBar.open(t.msg, 'Successful', {
              duration: 5000,
            });
            this.dialogRef.close();
          } else {
            this.snackBar.open(t.msg, 'Error', {
              duration: 5000,
            });
            this.dialogRef.close();
          }
        }
      );
    }
  }

}
