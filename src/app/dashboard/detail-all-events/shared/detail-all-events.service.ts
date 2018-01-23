import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../../config/config';

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
export class DetailAllEventsService {
  private urlOsurveyInformation: string;
  private urlAsiteLocationInformation: string;
  private urlStructureInformation: string;
  private urlCompound: string;
  private urlServicesAvailables: string;
  constructor(
    private http: Http
  ) {
    const server = Config.server;
    this.urlOsurveyInformation = `${server}/events/osurvey-information`;
    this.urlAsiteLocationInformation = `${server}/events/asite-location`;
    this.urlStructureInformation = `${server}/events/structure-information`;
    this.urlCompound = `${server}/events/compound`;
    this.urlServicesAvailables = `${server}/events/services-availables`;
    // this.urlPictureLog = `${server}/events/picture-log`;
  }

  getOsurveyInformationData(params: any): Observable<any> {
    const url = `${this.urlOsurveyInformation}/${params.idUser}&${params.idEvent}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getAsiteLocationInformationData(params: any): Observable<any> {
    const url = `${this.urlAsiteLocationInformation}/${params.idUser}&${params.idEvent}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getStructureInformation(params: any): Observable<any> {
    const url = `${this.urlStructureInformation}/${params.idUser}&${params.idEvent}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getCompoundData(params: any): Observable<any> {
    const url = `${this.urlCompound}/${params.idUser}&${params.idEvent}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getServicesAvailables(params: any): Observable<any>{
    const url = `${this.urlServicesAvailables}/${params.idUser}&${params.idEvent}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
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

  // For DataTable
  private extractDataTable(res: Response) {
    const body = res.json();
    return body.data || {};
  }
}
