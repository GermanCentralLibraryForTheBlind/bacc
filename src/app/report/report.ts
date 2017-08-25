import {Component, ViewChild} from '@angular/core';
import {Report, ReportService} from "./report.service";
import {SafeUrl, DomSanitizer} from "@angular/platform-browser";
import {UploadService} from "../check-over/upload.service";
import {CheckOverService} from "../check-over/check-over.service";


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

  @ViewChild('reportModal') reportModal: any;

  constructor(private reportService: ReportService,
              private sanitizer: DomSanitizer,
              private uploadService: UploadService,
              private checkOverService: CheckOverService) {

    this.btnReportEnabled = false;
    this.btnReportAnimated = false;
    this.btnId = "-1";


    this.uploadService.Uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {

      const uploadedMetaData = JSON.parse(response);
      const uploadID = uploadedMetaData.uploadID;
      this.btnId = uploadID;

      this.checkOverService.runCheck(uploadID)
        .then(response => {

          this.reportService.add(
            new Report(
              uploadedMetaData.name,
              uploadID,
              response._body
            ));
          this.btnReportEnabled = true;
          this.btnReportAnimated = true;
        })
        .catch(err =>
          console.error('An error occurred ' + err)
        );
    };
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


