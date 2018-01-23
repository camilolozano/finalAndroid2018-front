import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../config/config';

// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  private urlSessionActive: string;

  constructor(
    private http: Http,
    private router: Router
  ) {
    const server = Config.server;
    this.urlSessionActive = `${server}/users`;
  }

  async canActivate() {
    const ban = await this.validateSession();
    return ban;
  }

  async canActivateChild() {
    const ban = await this.validateSession();
    return ban;
  }

  public async validateSession() {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    let ban = false;
    if (user != null) {
      ban = await this.sessionAuthorizated(+user.idSystemUser).catch(e => ban = e);
      if (!ban) {
        this.router.navigate(['']);
      }
    }
    return ban;
  }

  private async sessionAuthorizated(id_user: number): Promise<any> {
    const url = `${this.urlSessionActive}/${id_user}`;
    const options = new RequestOptions({ withCredentials: true });
    return this.http.get(url, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = !!(res.status === 200);
    return body || false;
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(false);
  }
}
