import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateUsersService } from './shared/create-users.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css'],
  providers: [CreateUsersService]
})
export class CreateUsersComponent implements OnInit {

  public createUserForm: FormGroup;
  public enableForm: Boolean;
  public isChecked: Boolean = true;
  public userTypes: any[];
  public identificationTypes: any[];
  private params: any;
  public loadSpiner: Boolean;

  constructor(
    private fb: FormBuilder,
    private createUsersService: CreateUsersService,
    private snackBar: MatSnackBar,
  ) {
    this.enableForm = true;
    this.createUserForm = this.fb.group({
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
      idUserType: [
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
      identificationCard:  [
        null, Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9A-Za-z]+'), Validators.required])
      ],
    });
  }

  ngOnInit() {
    this.loadSpiner = false;
    this.userTypes = [
      { value: '1', viewValue: 'ADMINISTRATOR' },
      { value: '2', viewValue: 'OPERATOR' }
    ];
    this.identificationTypes = [
      { value: 'ID_NUMBER', viewValue: 'ID_NUMBER' },
      { value: 'PASSPORT', viewValue: 'PASSPORT' }
    ];
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // console.log(userInfo);
    if (userInfo !== undefined && userInfo !== null) {
      this.params = {
        idUser: userInfo.idSystemUser,
        idCompany: userInfo.idCompany
      };
    }
  }

  onSubmit() {
    this.loadSpiner = true;
    const body = this.createUserForm.value;
    console.log(body);
    this.createUsersService.createUser(this.params, body).subscribe(
      data => {
        // console.log(data);
        this.snackBar.open(data.msg, data.success ? 'Successfull' : 'Error', {
          duration: 5000,
        });
      },
      err => console.log(err),
      () => {
        this.loadSpiner = false;
        this.createUserForm.reset()
      }
    );
  }

}
