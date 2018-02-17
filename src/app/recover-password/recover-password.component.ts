import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ValidatorsForms } from '../utils/validator-forms';
import { MatSnackBar } from '@angular/material';
import { RecoverPasswordService } from './services/recover-password.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
  providers: [RecoverPasswordService]
})
export class RecoverPasswordComponent extends ValidatorsForms implements OnInit {

  public updatePassForm: FormGroup;
  private token: string;
  private id_user: number;
  private params: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private recoverPasswordService: RecoverPasswordService
  ) {
    super();
    this.updatePassForm = this.fb.group({
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
    this.route.params.forEach((params: Params) => {
      this.token = params['sso'];
      this.id_user = params['id'];
    });

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
      id_user: this.id_user
    });
    this.recoverPasswordService.setPass(body, this.id_user, this.token).subscribe(
      data => {
        // console.log(data);
        if (data.hasOwnProperty('success')) {
          this.snackBar.open(data.msg, data.success ? 'Successfull' : 'Error', {
            duration: 5000,
          });
          if (data.success) {
            this.router.navigate(['']);
          }
        }
      },
      err => console.log(err),
    );
  }

}
