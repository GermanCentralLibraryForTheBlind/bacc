import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {URLSearchParams, RequestOptions, Headers} from '@angular/http';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class CheckOverService {

  private WEB_API_CHECKOVER: string = '/checkover';

  constructor(private http: Http, private translate: TranslateService) {
  }

  runCheck(uploadID: string): Promise<any> {

    let contentHeaders = new Headers();
    contentHeaders.append('Content-Type', 'application/json');

    let myParams = new URLSearchParams();
    myParams.append('uploadID', uploadID);
    myParams.append('lang', this.translate.getBrowserLang());

    let options = new RequestOptions({headers: contentHeaders, params: myParams});

    return this.http.get(this.WEB_API_CHECKOVER, options)
      // .timeout(120000)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {

    // console.error(error);
    return Promise.reject(error._body || error);
  }

}
