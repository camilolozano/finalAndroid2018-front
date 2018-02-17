import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public isLogin: boolean;
  private loginData: any;
  public loginForm: FormGroup;
  public loginRecover: FormGroup;
  public loadEmail: boolean;

  constructor(
    private loginServices: LoginService,
    private fb: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadEmail = true;
    this.isLogin = true;
    this.loginForm = this.fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')])],
      'password': [null, Validators.compose([Validators.required])]
    });

    this.loginRecover = this.fb.group({
      'emailRecover': [null, Validators.compose([Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')])],
    });

  }

  login() {
    this.isLogin = true;
    this.loginServices.setLogin(this.loginForm.value).subscribe(
      d => {
        if (d.success) {
          localStorage.setItem('userInfo', JSON.stringify(d.userInfo));
          this.router.navigate(['home']);
        } else {
          this.snackBar.open(d.msg, '', {
            duration: 5000,
          });
        }
      }, (err) => {
        this.snackBar.open('You have not entered information', '', {
          duration: 5000,
        });
      }
    );
  }

  recoverPassword() {
    const email = this.loginRecover.value['emailRecover'];
    this.loadEmail = false;
    this.loginServices.setRecoverPassWord(email).subscribe(
      d => {
        if (d.success) {
          this.snackBar.open(d.msg, '', {
            duration: 5000,
          });
        } else {
          this.snackBar.open(d.msg, '', {
            duration: 5000,
          });
          this.loadEmail = true;
        }
      }, (err) => {
        this.loadEmail = true;
        this.snackBar.open('You have not entered information', '', {
          duration: 5000,
        });
      }
    );

  }

  loginFlat() {
    this.isLogin = true;
  }

  recoverFlat() {
    this.isLogin = false;
  }


}
