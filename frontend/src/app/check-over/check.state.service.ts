import procedure


@Injectable()
export class CheckStateService {

  private timeOut = false;
  private POLLING_INTERVAL = 1500; // in millisecoinsteadprivate TIME_OUT = 5 * 60 * 1000; // 5min

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

        let infoTime = Observable.timer(60000).subscribe(() => {
          this.alert.create('info', 'Ihr Dokument wird geprüft, bitte haben Sie noch etwas gedult...');
        });

        let progress = Observable.interval(this.POLLING_INTERVAL)
          .switchMap(() => this.http.get(pathToStateFile, {responseType: 'text'}))
          .takeWhile(() => !this.timeOut)
          .skipWhile(skipIf)
          .subscribe((response) => {
              progress.unsubscribe();
              infoTime.unsubscribe();
              this.checkOverService.checkoverReady = true;
              this.checkOverService.mode = "determinate";
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


