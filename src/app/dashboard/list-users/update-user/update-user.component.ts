import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListUsersService } from '../services/list-users.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
  providers: [ListUsersService]
})
export class UpdateUserComponent implements OnInit, OnChanges {

  public updateUserForm: FormGroup;
  public enableForm: Boolean;
  public isChecked: Boolean = true;
  public userTypes: any[];
  public identificationTypes: any[];
  public idUser: number;
  private idUserUpdate: number;

  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private listUsersService: ListUsersService,
    public snackBar: MatSnackBar,
  ) {
    this.enableForm = true;
    this.updateUserForm = this.fb.group({
      emailUsername: [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'),
        Validators.maxLength(150)
      ])],
      firstName: [
        null,
        Validators.compose([Validators.required, Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+'), Validators.maxLength(25)])
      ],
      secondName: [
        null,
        Validators.compose([Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+'), Validators.maxLength(25)])
      ],
      firstLastName: [
        null,
        Validators.compose([Validators.required, Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+'), Validators.maxLength(25)])
      ],
      secondLastName: [
        null,
        Validators.compose([Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+'), Validators.maxLength(25)])
      ],
      IDUserType: [
        null,
        Validators.compose([Validators.required])
      ],
      contactNumber: [
        null,
        Validators.compose([Validators.required])
      ],
      identificationType: [
        null,
        Validators.compose([Validators.required])
      ],
      identificationCard: [
        null, Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9A-Za-z]+'), Validators.required])
      ],
      state: [
        null,
        Validators.compose([Validators.required])
      ]
    });
  }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = +userInfo.idSystemUser;
    this.userTypes = [
      {value: '1', viewValue: 'ADMINISTRATOR'},
      {value: '2', viewValue: 'OPERATOR'}
    ];
    this.identificationTypes = [
      {value: 'ID_NUMBER', viewValue: 'ID_NUMBER'},
      {value: 'PASSPORT', viewValue: 'PASSPORT'}
    ];
    this.getData();
  }

  getData() {
    this.idUserUpdate = this.data['elements'].idSystemUser;
    this.updateUserForm.controls['emailUsername'].setValue(this.data['elements'].emailUsername);
    this.updateUserForm.controls['firstName'].setValue(this.data['elements'].firstName);
    this.updateUserForm.controls['secondName'].setValue(this.data['elements'].secondName);
    this.updateUserForm.controls['firstLastName'].setValue(this.data['elements'].firstLastName);
    this.updateUserForm.controls['secondLastName'].setValue(this.data['elements'].secondLastName);
    this.updateUserForm.controls['IDUserType'].setValue(this.data['elements'].idUserType);
    this.updateUserForm.controls['contactNumber'].setValue(this.data['elements'].contactNumber);
    this.updateUserForm.controls['identificationType'].setValue(this.data['elements'].identificationType);
    this.updateUserForm.controls['identificationCard'].setValue(this.data['elements'].identificationCard);
    this.updateUserForm.controls['state'].setValue(this.data['elements'].state);
  }

  ngOnChanges() {
  }

  onSubmit() {
    const body = this.updateUserForm.value;
    this.listUsersService.putUserInfo(this.idUser, this.idUserUpdate, body).subscribe(
      t=>{
        if(t.success){
          this.snackBar.open(t.msg, 'Successful', {
            duration: 5000,
          });
          this.dialogRef.close();
        }else {
          this.snackBar.open(t.msg, 'Error', {
            duration: 5000,
          });
          this.dialogRef.close();
        }
      }
    )

  }

}
