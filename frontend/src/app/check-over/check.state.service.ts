
import {interval as observableInterval, timer as observableTimer, Observable, Subject} from 'rxjs';

import {skipWhile, takeWhile, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';



import {CheckOverService} from "./check-over.service";

@Injectable()
export class CheckStateService {

  private _timeOut = false;
  private POLLING_INTERVAL = 1500; // in milliseconds
  private TIME_OUT = 10 * 60 * 1000; // 10min
  private _subject = new Subject();
  private _readyState = this._subject.asObservable();

  constructor(private http: HttpClient, private checkOverService: CheckOverService) {
  }

  checkState(pathToStateFile: string): Promise<any> {

    this._timeOut = false;

    return new Promise<any>((resolve, reject) => {

        let skipIf = (response) => {

          const stateObj = JSON.parse(response.toString());
          if (stateObj.state === 'error') {
            reject(stateObj.msg);
            return true;
          }
          return stateObj.state !== 'ready'
        };

        let timeOutTimer = observableTimer(this.TIME_OUT).subscribe(() => {
            this._timeOut = true;
            progress.unsubscribe();
            reject('Cant get an positive result from baccy :-(. So time out error.');
          }
        );

        let progress = observableInterval(this.POLLING_INTERVAL).pipe(
          switchMap(() => this.http.get(pathToStateFile, {responseType: 'text'})),
          takeWhile(() => !this._timeOut),
          skipWhile(skipIf),)
          .subscribe((response) => {
              progress.unsubscribe();
              this._subject.next('todo');
              this.checkOverService.checkoverReady = true;
              timeOutTimer.unsubscribe();
              resolve(response);
            },
            error => this.handleError(error));
      }
    );
  }

  get onReadyState() {
    return this._readyState;
  }

  handleError(error: any): Promise<any> {
    // console.error(error);
    return Promise.reject(error.message || error);
  }
}



