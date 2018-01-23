import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../../config/config';
import { Events } from './allEvents.model';
// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AllEventsService {

  private urlListAllEvents: string;
  private urlDownloadXlsx: string;
  constructor(
    private http: Http,
    private httpc: HttpClient
  ) {
    const server = Config.server;
    this.urlListAllEvents = `${server}/events/all-events`;
    this.urlDownloadXlsx = `${server}/events/download`;
  }

  getListAllEvents(idUser): Observable<Events[]> {
    const url = `${this.urlListAllEvents}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map(this.extractDataTable)
      .catch(this.handleErrorObservable);
  }

  download(idUser, body:string = null): Observable<Events[]> {
    const url = `${this.urlDownloadXlsx}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('responseType', 'blob');
    const options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
    return this.http.post(url, body, options)
      .map(this.downloadFileXLSX)
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

  // For xlsx files
  private downloadFileXLSX(res) {
    const blob = new Blob([res._body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
    return blob;
}

}
