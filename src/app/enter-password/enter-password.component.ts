import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EnterPasswordService } from './shared/enter-password.service';
import { Form } from '@angular/forms/src/directives/form_interface';
import { FormControl } from '@angular/forms/src/model';
import { ValidatorsForms } from '../utils/validator-forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-enter-password',
  templateUrl: './enter-password.component.html',
  styleUrls: ['./enter-password.component.css'],
  providers: [EnterPasswordService]
})
export class EnterPasswordComponent extends ValidatorsForms implements OnInit {
  private token: string;
  private idUser: number;
  public enterPassForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private enterPasswordService: EnterPasswordService,
    private snackBar: MatSnackBar
  ) {
    super();
    this.enterPassForm = this.fb.group({
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
      this.idUser = params['id'];
    });
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
    const body = JSON.stringify({ newPassword: this.enterPassForm.get('passwords').get('newPassword').value, id_user: this.idUser });
    // console.log(this.enterPassForm.value, body);
    this.enterPasswordService.enterPassword(this.token, body).subscribe(
      data => {
        // console.log(data);
        if (data.hasOwnProperty('success')) {
          this.snackBar.open(data.msg, data.success ? 'Successfull' : 'Error', {
            duration: 5000,
          });
          if (data.success) {
            this.enterPassForm.reset();
            this.router.navigate(['']);
          }
        }
      },
      err => console.log(err),
    );
  }

}
