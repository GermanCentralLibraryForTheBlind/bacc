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
  public mode:string = "determinate";

  constructor(private http: HttpClient, private translate: TranslateService) {}

  runCheck(uploadID: string): Promise<any> {

    this.checkoverReady = false;
    this.mode = "indeterminate";

    let params = new HttpParams()
      .set('uploadID', uploadID)
      .set('lang', this.translate.currentLang);

    return this.http.get(this.WEB_API_CHECKOVER, {responseType: 'text', params: params})
      .toPromise()
      .then(response => {return response;} )
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {

    // console.error(error);
    return Promise.reject(error.message || error);
  }
}
