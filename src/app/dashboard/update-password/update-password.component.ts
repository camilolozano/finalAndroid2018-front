import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdatePasswordService } from './shared/update-password.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ValidatorsForms } from '../../utils/validator-forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
  providers: [UpdatePasswordService]
})
export class UpdatePasswordComponent extends ValidatorsForms implements OnInit {
  public updatePassForm: FormGroup;
  private params: any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private updatePasswordService: UpdatePasswordService
  ) {
    super();
    this.updatePassForm = this.fb.group({
      'oldPassword': [null, Validators.required],
      'passwords': this.fb.group({
        'newPassword': [null, Validators.compose([Validators.required,
        this.hasNumbers,
        this.hasLetters,
        Validators.minLength(5)])],
        'repeatPassword': [null, Validators.required]
      }, { validator: this.areEqual })
    });
  }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // console.log(userInfo);
    if (userInfo !== undefined && userInfo !== null) {
      this.params = {
        idUser: userInfo.idSystemUser,
        idCompany: userInfo.idCompany
      };
    }
  }

  getErrorMessage(control: any) {
    // console.log(control instanceof FormControl);
    return control.hasError('required') ? 'You must enter a password' :
      control.hasError('minlength') ? 'Min length is five characters (alphanumeric)' :
        control.hasError('hasNumbers') ? 'The password must include numbers' :
          control.hasError('hasLetters') ? 'The password must include letters' : '';
            // control.hasError('areEqual') ? 'The passwords not match' : '';
  }

  submit() {
    const body = JSON.stringify({
      newPassword: this.updatePassForm.get('passwords').get('newPassword').value,
      currentPassword: this.updatePassForm.get('oldPassword').value
    });
    this.updatePasswordService.updatePassword(this.params, body).subscribe(
      data => {
        // console.log(data);
        if (data.hasOwnProperty('success')) {
          this.snackBar.open(data.msg, data.success ? 'Successfull' : 'Error', {
            duration: 5000,
          });
          if (data.success) {
            this.router.navigate(['home']);
            // this.updatePassForm.reset();
          }
        }
      },
      err => console.log(err),
    );
  }
}
