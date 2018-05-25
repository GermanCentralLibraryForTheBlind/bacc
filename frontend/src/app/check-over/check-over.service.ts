import {Injectable} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class CheckOverService {

  private WEB_API_CHECKOVER: string = '/checkover';
  public checkoverReady: boolean = false;

  constructor(private http: HttpClient, private translate: TranslateService) {}

  runCheck(uploadID: string): Promise<any> {

    this.checkoverReady = false;

    let params = new HttpParams()
      .set('uploadID', uploadID)
      .set('lang', this.translate.getBrowserLang());

    return this.http.get(this.WEB_API_CHECKOVER, {responseType: 'text', params: params})
      .toPromise()
      .then(response => {this.checkoverReady = true; return response;} )
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {

    // console.error(error);
    return Promise.reject(error.message || error);
  }
}
