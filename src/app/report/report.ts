import {Component, ViewChild, Input} from '@angular/core';
import {Report, ReportService} from "./report.service";
import {SafeUrl, DomSanitizer} from "@angular/platform-browser";
import {CheckOverService} from "../check-over/check-over.service";
import {FileItem} from 'ng2-file-upload';
import {AlertsService} from "@jaspero/ng2-alerts";


@Component({
  selector: 'report',
  templateUrl: './report.html',
  styleUrls: ['./report.css']
})
export class ReportComponent {

  public reportUrl: SafeUrl;

  public btnReportEnabled: boolean;
  public btnReportAnimated: boolean;
  public btnId: string;

  @Input() itemIndex: number;
  @ViewChild('reportModal') reportModal: any;


  constructor(private reportService: ReportService,
              private sanitizer: DomSanitizer,
              private checkOverService: CheckOverService,
              private alert: AlertsService) {

    this.btnReportEnabled = false;
    this.btnReportAnimated = false;
    this.btnId = "-1";
  }

  setItemOnSuccess(item: FileItem) {

    item.onSuccess = (response: any, status: any, headers: any): any =>
      this.onSuccessItem(response, item);
  }

  private onSuccessItem(response: string, item: FileItem): any {

    const responseData = JSON.parse(response);
    const uploadID = responseData.uploadID;
    this.btnId = uploadID;
    (item as any).progressValue = 50;

    this.checkOverService.runCheck(uploadID)
      .then(response => {

        const report = JSON.parse(response._body);
        this.reportService.add(
          new Report(
            responseData.name,
            uploadID,
            report.path
          ));

        // console.log('btnID: ' + this.btnId);
        this.btnReportEnabled = true;
        this.btnReportAnimated = true;
        (item as any).progressValue = 100;
        (item as any).accessibility = {'color': report.iLevel.color, 'font-size':'32px'};
      })
      .catch(err => {

          this.alert.create('error', 'EPUB: ' + responseData.name + ' ' + 'An error occurred ' + err);
          console.error('An error occurred ' + err)
        }

      );
  }

  showReport(): void {

    this.btnReportAnimated = false;
    this.updateSrc(this.reportService.getReportDataById(this.btnId));
    this.reportModal.showAsLarge();
  }

  private updateSrc(url: string) {
    console.log('url: ' + url);
    this.reportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}


