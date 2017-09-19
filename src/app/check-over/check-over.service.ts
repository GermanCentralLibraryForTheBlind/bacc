import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {URLSearchParams, RequestOptions, Headers} from '@angular/http';


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class CheckOverService {

  private webApiCheckover : string = '/checkover';

  constructor(private http: Http) {
  }

  runCheck(uploadID: string): Promise<any> {

    let contentHeaders = new Headers();
    contentHeaders.append('Content-Type', 'application/json');
    let myParams = new URLSearchParams();
    myParams.append('uploadID', uploadID);
    let options = new RequestOptions({headers: contentHeaders, params: myParams});

    return this.http.get(this.webApiCheckover, options)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {

    // console.error(error);
    return Promise.reject(error._body || error);
  }

}
