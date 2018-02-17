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
export class UpdateDataService {

  private urlPutOsurveyInformation: string;
  private urlAsiteLocationformation: string;
  private urlStructureformation: string;
  private urlCompount: string;
  private urlServicesAvailable: string;
  private urlStructureInformationGrid: string;
  private urlStructureInformationGridAdd: string;
  private urlServiceAvailableGrid: string;
  private urlServiceAvailableGridAdd: string;
  private urlpicture: string;
  private urlPutStatepicture: string;
  private urlPictureFileSave: string;
  private urlDeleteStructureInformationRow: string;
  private urlDeleteServiceAvailableRow: string;

  constructor(
    private http: Http,
  ) {
    const server = Config.server;
    this.urlPutOsurveyInformation = `${server}/update-events/osurvey-information`;
    this.urlAsiteLocationformation = `${server}/update-events/asite-location-information`;
    this.urlStructureformation = `${server}/update-events/structure-information`;
    this.urlCompount = `${server}/update-events/compound`;
    this.urlServicesAvailable = `${server}/update-events/services-available`;
    this.urlStructureInformationGrid = `${server}/update-events/structure-information-grid`;
    this.urlStructureInformationGridAdd = `${server}/update-events/structure-information-grid-add`;
    this.urlServiceAvailableGrid = `${server}/update-events/service-available-grid`;
    this.urlServiceAvailableGridAdd = `${server}/update-events/service-available-grid-add`;
    this.urlpicture = `${server}/update-events/picture-update`;
    this.urlPutStatepicture = `${server}/update-events/picture-update-state`;
    this.urlPictureFileSave = `${server}/update-events/picture-file-save`;
    this.urlDeleteStructureInformationRow = `${server}/update-events/delete-structureinfo-row`;
    this.urlDeleteServiceAvailableRow = `${server}/update-events/delete-serviceavailable-row`;
  }

  putOsurveyInformation(idUser, idEvent, body): Observable<any> {
    const url = `${this.urlPutOsurveyInformation}/${idUser}&${idEvent}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(url, body, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  putAsiteLocationformation(idUser, idEvent, body): Observable<any> {
    const url = `${this.urlAsiteLocationformation}/${idUser}&${idEvent}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(url, body, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  putStructureformation(idUser, idEvent, body): Observable<any> {
    const url = `${this.urlStructureformation}/${idUser}&${idEvent}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(url, body, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  putCompount(idUser, idEvent, body): Observable<any> {
    const url = `${this.urlCompount}/${idUser}&${idEvent}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(url, body, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  putServicesAvailable(idUser, idEvent, body): Observable<any> {
    const url = `${this.urlServicesAvailable}/${idUser}&${idEvent}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(url, body, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  putStructureInformationGrid(idUser, body): Observable<any> {
    const url = `${this.urlStructureInformationGrid}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(url, body, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  postStructureInformationGrid(idUser, body): Observable<any> {
    const url = `${this.urlStructureInformationGridAdd}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(url, body, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  putServiceAvailableGrid(idUser, body): Observable<any> {
    const url = `${this.urlServiceAvailableGrid}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(url, body, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  postServiceAvailableGrid(idUser, body): Observable<any> {
    const url = `${this.urlServiceAvailableGridAdd}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(url, body, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  putPicture(idUser, body): Observable<any> {
    const url = `${this.urlpicture}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(url, body, options)
      .map(this.extractData)
  }

  putStateImages(idUser: number, body:any): Observable<any> {
    const url = `${this.urlPutStatepicture}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(url, body, options)
      .map(this.extractData)
  }

  postPictureFileSave(idUser: number, body:any): Observable<any> {
    const url = `${this.urlPictureFileSave}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(url, body, options)
      .map(this.extractData)
  }

  postDeleteStructureInformationRow(idUser:number, body:any): Observable<any> {
    const url = `${this.urlDeleteStructureInformationRow}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(url, body, options)
      .map(this.extractData)
  }

  postDeleteServiceAvailableRow(idUser:number, body:any): Observable<any> {
    const url = `${this.urlDeleteServiceAvailableRow}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(url, body, options)
      .map(this.extractData)
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
