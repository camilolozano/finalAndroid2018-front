import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../../config/config';
import * as io from 'socket.io-client';

// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/interval';

@Injectable()
export class NewOffertService {

  private socket: any;
  public server: any;

  constructor() {
    const server = Config.server;
    this.server = server;
    this.socket = io(server);
  }

  getTurnoSocket(): Observable<any> {
    const observable = new Observable(observer => {
      this.socket.on('notification-order-web', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
