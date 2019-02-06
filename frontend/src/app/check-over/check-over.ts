
import {map} from 'rxjs/operators';
import {Component, OnInit, QueryList, ViewChildren, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {UploadService} from "./upload.service";
import {ReportComponent} from "../report/report";
import {Accessibility} from "../accessibility";
import {TranslateService} from "@ngx-translate/core";
import {HttpParams, HttpClient} from '@angular/common/http';
import {saveAs} from "file-saver";
import {CheckOverService} from "./check-over.service";
import {timer} from "rxjs";
import swal from 'sweetalert2';
import {CheckStateService} from "./check.state.service";


declare var $: any;

@Component({
  selector: 'check-over',
  templateUrl: './check-over.html',
  styleUrls: ['./check-over.css']
})

export class CheckOverComponent implements OnInit {

  public hasBaseDropZoneOver: boolean = false;
  public autoStartCheckOver: boolean = true;

  public uploader: FileUploader;
  public checkOverService: CheckOverService;
  private a11y: Accessibility;
  private WEB_API_REPORTS: string = '/reports';
  private LONG_TIME_INFO = 60 * 1000; // 1min
  private taskCounter = 0;
  private infoLongTime;

  @ViewChildren(ReportComponent) reports: QueryList<ReportComponent>;
  @ViewChild('chooseEPUB') input: ElementRef;

  constructor(private uploadService: UploadService,
              private renderer: Renderer2,
              private translate: TranslateService,
              private http: HttpClient,
              private checkoverS: CheckOverService,
              private checkState: CheckStateService) {

    this.checkOverService = this.checkoverS;
    this.a11y = new Accessibility(translate);
    this.uploader = this.uploadService.Uploader;
    this.uploadService.Uploader.onAfterAddingFile = this.onAfterAddingFile;
    this.checkState.onReadyState.subscribe(() => {this.taskCounter--; this.infoLongTime.unsubscribe() });
  }


  private onAfterAddingFile = (fileItem) => {

    $('#checkover-tbody').css('height', '200px');

    this.longTimeInfo();
    this.taskCounter++;

    (fileItem as any).mode = "indeterminate";

    this.a11y.progressInterpolation(fileItem, 40);

    setTimeout(() => {
      this.reports.forEach(reportInstance => {

        if (reportInstance.itemIndex === this.uploader.getIndexOfItem(fileItem))
          reportInstance.setItemOnSuccess(fileItem);
      });

      if (this.autoStartCheckOver)
        this.uploader.uploadAll();
    });
  };

  private longTimeInfo() {

    if(this.taskCounter > 0)
      return;

    this.infoLongTime = timer(this.LONG_TIME_INFO).subscribe(() => {
      this.translate.get('BACC.INFO_LONG_TIME').subscribe((res: string) => {
        if (!$(".swal2-container")[0])
          swal({type: 'info', title: res});
      });
    });
  }

  ngOnInit() {
  };

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public focusOnInput() {
    let onElement = this.renderer.selectRootElement('#input-file-id');
    onElement.click();
  }

  public deleteQueue() {
    this.uploader.clearQueue();
    this.checkOverService.checkoverReady = false;
  }

  public saveReports() {

    let params = new HttpParams();
    this.reports.forEach(reportInstance => {
      params = params.append('ids[]', reportInstance.btnId);
    });

    this.http.get(this.WEB_API_REPORTS, {params, responseType: 'blob'}).pipe(
      map(res => res))
      .subscribe(
        data => saveAs(data, 'bacc_reports_' + this.getTimeStamp() + '.zip'),
        error => {
          swal({type: 'error', title: 'Save reports: An error occurred ' + error});
          console.error('An error occurred ' + error);
        }
      );
  }


  private getTimeStamp() {
    const todayDate = new Date();
    const realMonth = todayDate.getMonth() + 1; // The getMonth() method returns the month (from 0 to 11)
    return todayDate.getFullYear()
      + '-' +
      realMonth
      + '-' +
      todayDate.getDate()
      + '_' +
      todayDate.getHours()
      + ':' +
      todayDate.getMinutes()
      + ':' +
      todayDate.getSeconds();
  }

}



