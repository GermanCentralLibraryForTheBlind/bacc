import {Component, OnInit, QueryList, ViewChildren, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {UploadService} from "./upload.service";
import {ReportComponent} from "../report/report";
import {Accessibility} from "../accessibility";
import {TranslateService} from "@ngx-translate/core";
import {HttpParams, HttpClient} from '@angular/common/http';
import {saveAs} from "file-saver";
import {AlertsService} from "@jaspero/ng2-alerts";
import {CheckOverService} from "./check-over.service";


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

  @ViewChildren(ReportComponent) reports: QueryList<ReportComponent>;
  @ViewChild('chooseEPUB') input: ElementRef;

  constructor(private uploadService: UploadService,
              private renderer: Renderer2,
              private translate: TranslateService,
              private http: HttpClient,
              private alert: AlertsService,
              private checkoverS : CheckOverService) {

    this.checkOverService = this.checkoverS;
    this.a11y = new Accessibility(translate);
    this.uploader = this.uploadService.Uploader;
    this.uploadService.Uploader.onAfterAddingFile = this.onAfterAddingFile;

  }

  private onAfterAddingFile = (fileItem) => {

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

  ngOnInit() {
  };

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public focusOnInput() {
    let onElement = this.renderer.selectRootElement('#input-file-id');
    onElement.click();
  }

  public saveReports() {

    let params = new HttpParams();
    this.reports.forEach(reportInstance => {
      params = params.append('ids[]', reportInstance.btnId);
    });

    this.http.get(this.WEB_API_REPORTS, {params, responseType: 'blob'})
      .map(res => res)
      .subscribe(
        data => saveAs(data, 'bacc_reports_' + this.getTimeStamp() + '.zip'),
        error => {
          this.alert.create('error', 'Save reports: An error occurred ' + error);
          console.error('An error occurred ' + error);}
      );
  }


  private getTimeStamp() {
    const todayDate = new Date();
    return todayDate.getFullYear()
      + '-' +
      todayDate.getMonth()
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



