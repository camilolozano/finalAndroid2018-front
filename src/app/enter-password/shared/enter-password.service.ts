import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
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
export class EnterPasswordService {

  private urlEnterPassword: string;
  constructor(private http: Http) {
    this.urlEnterPassword = `${Config.server}/recover-pass/reset`;
  }


  enterPassword(token: string, body: string): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${token}`);
    const options = new RequestOptions({ headers: headers });
    // console.log(url);
    return this.http.put(this.urlEnterPassword, body, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  private handleErrorObservable(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    // console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  private extractData(res: Response) {
    // console.log(res);
    const body = res.json();
    return body || {};
  }
}
