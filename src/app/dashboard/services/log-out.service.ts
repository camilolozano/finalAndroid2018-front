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
export class LogOutService {

  private urlLogOut: string;
  private urlCountOffersCompanyCount: string;
  private urlDescriptionOffersCompanyCount: string;
  private urlUpdateStateOffer: string;
  private urlAppyStateOffer: string;

  constructor(
    private http: Http
  ) {
    const server = Config.server;
    this.urlLogOut = `${server}/log-out`;
    this.urlCountOffersCompanyCount = `${server}/offers/offers-company-count`;
    this.urlDescriptionOffersCompanyCount = `${server}/solicitor-offers`;
    this.urlUpdateStateOffer = `${server}/solicitor-offers/cancel`;
    this.urlAppyStateOffer = `${server}/solicitor-offers/apply`;
  }

  getCountOffersCompanyCount(idUser, idCompany): Observable<any> {
    const url = `${this.urlCountOffersCompanyCount}/${idUser}&${idCompany}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  getDescriptionOffers(idUser, idCompany) {
    const url = `${this.urlDescriptionOffersCompanyCount}/${idUser}&${idCompany}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  setlogOut(idUser: string): Observable<any> {
    const url = `${this.urlLogOut}/${idUser}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .put(url, options)
      .map(this.extractData)
      .catch(this.extractData);
  }

  putCancelOffer(idUser, idCompany, body): Observable<any> {
    const url = `${this.urlUpdateStateOffer}/${idUser}&${idCompany}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(url, body, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  postApplyOffer(idUser, idCompany, body): Observable<any> {
    const url = `${this.urlAppyStateOffer}/${idUser}&${idCompany}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(url, body, options)
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
