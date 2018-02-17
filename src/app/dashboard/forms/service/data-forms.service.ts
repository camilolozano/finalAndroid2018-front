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
export class DataFormsService {

  private urlAsiteLocationInformation: string;
  private urlCompound: string;
  private urlOsurveyInformation: string;
  private urlServicesAvailables: string;
  private urlStructureInformation: string;
  private urlPictureLog: string;

  // grid data
  private urlStructureInformationGrid: string;
  private urlServicesAvailablesGrid: string;

  // TagSelects
  private urlLocationType: string;
  private urlAcPowerAvailable: string;
  private urlFencetype: string;
  private urlAccesstype: string;
  private urlBuildingType: string;
  private urlType: string;

  private urlLegType: string;
  private urlAnttenaTypeOpt: string;
  private urlGeneralConditionType: string;
  private urlImage: string;
  private urlPublicPrivateWifi: string;
  private urlCellularServiceProvider: string;
  private urlTechnologyType: string;

  private urlAntenaType: string;

  constructor(
    private http: Http
  ) {
    const server = Config.server;
    const serverImage = Config.serverImage;
    this.urlAsiteLocationInformation = `${server}/events/asite-location`;
    this.urlCompound = `${server}/events/compound`;
    this.urlOsurveyInformation = `${server}/events/osurvey-information`;
    this.urlServicesAvailables = `${server}/events/services-availables`;
    this.urlStructureInformation = `${server}/events/structure-information`;
    this.urlPictureLog = `${server}/events/picture-log`;

    this.urlStructureInformationGrid = `${server}/events/structure-grid`;
    this.urlServicesAvailablesGrid = `${server}/events/service-available-grid`;

    this.urlLocationType = `${server}/tags/location-type`;
    this.urlAcPowerAvailable = `${server}/tags/ac-power-available`;
    this.urlFencetype = `${server}/tags/fence-type`;
    this.urlAccesstype = `${server}/tags/access`;
    this.urlBuildingType = `${server}/tags/building-type`;
    this.urlType = `${server}/tags/type`;
    this.urlLegType = `${server}/tags/leg-type`;
    this.urlAnttenaTypeOpt = `${server}/tags/anttena-type`;
    this.urlGeneralConditionType = `${server}/tags/general-condition-type`;
    this.urlPublicPrivateWifi = `${server}/tags/public-private-wifi`;
    this.urlAntenaType = `${server}/tags/antena-type`;

    this.urlImage = `${serverImage}`;
    this.urlCellularServiceProvider = `${server}/tags/cellular-service-type`;
    this.urlTechnologyType = `${server}/tags/technology-type`;
  }

  getAsiteLocationInformationData(idUser: number, idEvent: number): Observable<any>{
    const url = `${this.urlAsiteLocationInformation}/${idUser}&${idEvent}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getCompoundData(idUser: number, idEvent: number): Observable<any>{
    const url = `${this.urlCompound}/${idUser}&${idEvent}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getOsurveyInformationData(idUser: number, idEvent: number): Observable<any>{
    const url = `${this.urlOsurveyInformation}/${idUser}&${idEvent}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getServicesAvailables(idUser: number, idEvent: number): Observable<any>{
    const url = `${this.urlServicesAvailables}/${idUser}&${idEvent}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getStructureInformation(idUser: number, idEvent: number): Observable<any>{
    const url = `${this.urlStructureInformation}/${idUser}&${idEvent}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getPictureLog(idUser: number, idEvent: number): Observable<any>{
    const url = `${this.urlPictureLog}/${idUser}&${idEvent}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  // grids data
  getStructureInformationGrid(idUser: number, idEvent: number): Observable<any>{
    const url = `${this.urlStructureInformationGrid}/${+idUser}&${idEvent}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractDataTable)
      .catch(this.extractData);
  }

  getServicesAvailablesGrid(idUser: number, idEvent: number): Observable<any>{
    const url = `${this.urlServicesAvailablesGrid}/${idUser}&${idEvent}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractDataTable)
      .catch(this.extractData);
  }

  // tagSelects
  getLocationType(idUser: number): Observable<any>{
    const url = `${this.urlLocationType}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getAcPowerAvailable(idUser: number): Observable<any>{
    const url = `${this.urlAcPowerAvailable}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getFencetype(idUser: number): Observable<any>{
    const url = `${this.urlFencetype}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getAccesstype(idUser: number): Observable<any>{
    const url = `${this.urlAccesstype}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getBuildingType(idUser: number): Observable<any>{
    const url = `${this.urlBuildingType}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getType(idUser: number): Observable<any>{
    const url = `${this.urlType}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getLegType(idUser: number): Observable<any>{
    const url = `${this.urlLegType}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getGeneralConditionType(idUser: number): Observable<any>{
    const url = `${this.urlGeneralConditionType}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getAnttenaTypeOpt(idUser: number): Observable<any>{
    const url = `${this.urlAnttenaTypeOpt}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getPublicPrivateWifi(idUser: number):Observable<any>{
    const url = `${this.urlPublicPrivateWifi}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getAntenaType(idUser: number):Observable<any>{
    const url = `${this.urlAntenaType}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getCellularServiceProviderType(idUser: number):Observable<any>{
    const url = `${this.urlCellularServiceProvider}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getTechnologyType(idUser: number):Observable<any>{
    const url = `${this.urlTechnologyType}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }


  getImagePath(): string {
    return this.urlImage;
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
