import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertsService} from "@jaspero/ng2-alerts";
import {Observable} from "rxjs/Rx";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {CheckOverService} from "./check-over.service";

declare var $: any;

@Injectable()
export class CheckStateService {

  private timeOut = false;
  private POLLING_INTERVAL = 1500; // in milliseconds
  private TIME_OUT = 10 * 60 * 1000; // 10min

  constructor(private http: HttpClient, private checkOverService: CheckOverService, private alert: AlertsService) {
  }

  checkState(pathToStateFile: string): Promise<any> {

    return new Promise<any>((resolve, reject) => {

        let skipIf = (response) => {

          const stateObj = JSON.parse(response.toString());
          if (stateObj.state === 'error') {
            reject(stateObj.msg);
            return true;
          }
          return stateObj.state !== 'ready'
        };

        Observable.timer(this.TIME_OUT).subscribe(() => {
            this.timeOut = true;
            progress.unsubscribe();
            reject('Time Out');
          }
        );

        let infoTime = Observable.timer(1000).subscribe(() => {

          if (!$(".jaspero__dialog")[0])
            this.alert.create('info', 'Ihr Dokument wird geprüft, bitte haben Sie noch etwas Geduld...');

        });

        let progress = Observable.interval(this.POLLING_INTERVAL)
          .switchMap(() => this.http.get(pathToStateFile, {responseType: 'text'}))
          .takeWhile(() => !this.timeOut)
          .skipWhile(skipIf)
          .subscribe((response) => {
              progress.unsubscribe();
              infoTime.unsubscribe();
              this.checkOverService.checkoverReady = true;
              resolve(response);
            },
            error => this.handleError(error));
      }
    );
  }


  handleError(error: any): Promise<any> {
    // console.error(error);
    return Promise.reject(error.message || error);
  }
}



