import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../../config/config';
import * as io from 'socket.io-client';

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
export class ChatService {

  private urlSendMsg: string;
  private socket: any;
  private urlTalk: string;

  constructor(
    private http: Http
  ) {
    const server = Config.server;
    this.socket = io(server);
    this.urlSendMsg = `${server}/chat-web`;
    this.urlTalk = `${server}/chat-web/talk`;
  }

  postUrlSendMsg(idUser: number, body: any) {
    const url = `${this.urlSendMsg}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .post(url, body, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getTalk(idUser: number, idDoc: number, idApp: number, idCompany: number) {
    const url = `${this.urlTalk}/${idUser}&${idDoc}&${idApp}&${idCompany}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getSyncMessages(): Observable<any> {
    const observable = new Observable(observer => {
      this.socket.on('send-msg-web', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
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
