import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataFormsService } from '../../../service/data-forms.service';
import { UpdateDataService } from '../../../service/update-data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-data-sag',
  templateUrl: './update-data-sag.component.html',
  styleUrls: ['./update-data-sag.component.css'],
  providers: [DataFormsService, UpdateDataService]
})
export class UpdateDataSagComponent implements OnInit {
  public updateGridForm: FormGroup;
  public antenaType: any[];
  public idUser: number;
  public other: boolean;

  public cellularServiceProviderType: any[];
  public technologyTypes: any[];
  public servicep: number;

  constructor(
    public dialogRef: MatDialogRef<UpdateDataSagComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataFormsService: DataFormsService,
    private updateDataService: UpdateDataService,
    public snackBar: MatSnackBar,
  ) {
    if (this.data['elements'].idServiceAvailable_c) {
      // Formulario para crear nuevo
      this.updateGridForm = this.fb.group({
        cellularServiceProvider: [
          null,
          Validators.compose([Validators.required])
        ],
        technologyType: [
          null, Validators.compose([Validators.required])
        ],
        idServiceAvailable_c: [
          null, Validators.compose([Validators.required])
        ],
        other: [
          null
        ]
      });

    } else {
      // Formulario para actualizar
      this.servicep = +this.data['elements'].idCellularServiceProvider;
      this.updateGridForm = this.fb.group({
        cellularServiceProvider: [
          null,
          Validators.compose([Validators.required])
        ],
        technologyType: [
          null, Validators.compose([Validators.required])
        ],
        idServiceAvailableGrid: [
          null, Validators.compose([Validators.required])
        ],
        other: [
          null
        ]
      });
    }
  }

  ngOnInit() {
    this.other = (+this.data['elements'].idCellularServiceProvider === 11) ? true : false;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = +userInfo.idSystemUser;
    this.cellularServiceProviderType = [];
    this.technologyTypes = [];
    this.getData();
    this.getCellularServiceProviderType();
    this.getTechnologyType();
  }

  getCellularServiceProviderType() {
    this.dataFormsService.getCellularServiceProviderType(this.idUser).subscribe(
      t => {
        if (t.success) {
          this.cellularServiceProviderType = t.data;
        } else {
          console.log('Error conection');
        }
      }
    )
  }

  getTechnologyType() {
    this.dataFormsService.getTechnologyType(this.idUser).subscribe(
      t => {
        if (t.success) {
          this.technologyTypes = t.data;
        } else {
          console.log('Error conection');
        }
      }
    )
  }

  getData() {
    if (this.data['elements'].idServiceAvailable_c) {
      this.updateGridForm.controls['idServiceAvailable_c'].setValue(+this.data['elements'].idServiceAvailable_c);
    } else {
      this.updateGridForm.controls['idServiceAvailableGrid'].setValue(+this.data['elements'].idServiceAvailableGrid);
      this.updateGridForm.controls['cellularServiceProvider'].setValue(+this.data['elements'].idCellularServiceProvider);
      this.updateGridForm.controls['technologyType'].setValue(+this.data['elements'].idTechnologyType);
      if (+this.data['elements'].idCellularServiceProvider === 11) {
        this.updateGridForm.controls['other'].setValue(this.data['elements'].descriptionc);
      }
    }
  }

  otherPro(data) {
    if (+data.value === 11) {
      this.other = true;
    } else {
      this.other = false;
      this.updateGridForm.controls['other'].setValue(null);
    }
  }


  onSubmit() {
    const body = this.updateGridForm.value;
    if (this.data['elements'].idServiceAvailable_c) {
      this.updateDataService.postServiceAvailableGrid(this.idUser, body).subscribe(
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
      this.updateDataService.putServiceAvailableGrid(this.idUser, body).subscribe(
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
