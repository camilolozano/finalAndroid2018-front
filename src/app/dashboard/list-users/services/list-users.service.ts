import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../../config/config';
import { User } from './user.model';


// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ListUsersService {

  private urlListUsers: string;
  private urlPutUsers: string;
  private urlUpdateUser: string;

  constructor(
    private http: Http,
    private httpc: HttpClient
  ) {
    const server = Config.server;
    this.urlListUsers = `${server}/users/list-users`;
    this.urlPutUsers = `${server}/users/upd_user`;
    this.urlUpdateUser = `${server}/users/upd_user_info`;
  }

  getListUsers(idUser): Observable<User[]> {
    const url = `${this.urlListUsers}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(url, options)
      .map(this.extractDataTable)
      .catch(this.handleErrorObservable);
  }

  putStateUser(idUser, body): Observable<any> {
    const url = `${this.urlPutUsers}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(url, body, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  putUserInfo(idUser: number, idUserUpdate: number, body: any): Observable<any> {
    const url = `${this.urlUpdateUser}/${idUser}&${idUserUpdate}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(url, body, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }


  private handleErrorObservable(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    // console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  // For any data
  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  // For DataTable
  private extractDataTable(res: Response) {
    const body = res.json();
    return body.data || {};
  }

}
