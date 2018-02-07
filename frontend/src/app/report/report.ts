import {Component, ViewChild, Input, ElementRef, Renderer2} from '@angular/core';
import {Report, ReportService} from "./report.service";
import {SafeUrl, DomSanitizer} from "@angular/platform-browser";
import {CheckOverService} from "../check-over/check-over.service";
import {FileItem} from 'ng2-file-upload';
import {AlertsService} from "@jaspero/ng2-alerts";

import * as jsPDF from 'jspdf';
import {Accessibility} from "../accessibility";
import {TranslateService} from "@ngx-translate/core";

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
  private a11y: Accessibility;

  @Input() itemIndex: number;
  @ViewChild('reportModal') reportModal: any;
  @ViewChild('reportIframe') iframe: ElementRef;

  constructor(private reportService: ReportService,
              private sanitizer: DomSanitizer,
              private checkOverService: CheckOverService,
              private alert: AlertsService,
              private translate: TranslateService) {

    this.btnReportEnabled = false;
    this.btnReportAnimated = false;
    this.btnId = '-1';

    this.a11y = new Accessibility(translate);
  }

  setItemOnSuccess(item: FileItem) {

    console.log('setItemOnSuccess');

    this.a11y.setAriaLiveValue("Starte Prüfung");
    this.a11y.progressInterpolation(item, 90);

    item.onSuccess = (response: any, status: any, headers: any): any =>
      this.afterSuccessfulUpload(response, item);

    item.onComplete = (response: any, status: any, headers: any): any =>
      console.log('completed');
  }

  private afterSuccessfulUpload(response: string, item: FileItem): any {

    console.log('afterSuccessfulUpload');

    const responseData = JSON.parse(response);
    const uploadID = responseData.uploadID;
    this.btnId = uploadID;

    (item as any).progressValue = 50;
    this.a11y.setAriaLiveValue("50%");

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
        this.afterSuccessfulCheck(item, report);
      })
      .catch(err => {

          this.alert.create('error', 'EPUB: ' + responseData.name + ' ' + 'An error occurred ' + err);
          console.error('An error occurred ' + err);
        }
      );
  }

  showReport(): void {

    this.btnReportAnimated = false;
    this.setReportSrc(this.reportService.getReportDataById(this.btnId));
  }

  private afterSuccessfulCheck(item, report) {

    this.btnReportEnabled = true;
    this.btnReportAnimated = true;
    (item as any).progressValue = 100;
    (item as any).accessibility = {'color': report.aLevel.color, 'font-size': '32px'};


    const accessibilityAsWord = this.a11y.getAccessibilityLevelAsWord(report.aLevel.color);

    this.translate.get('BACC.CHECKER_IS_FINISHED',
      {
        fileName: (item as any).file.name,
        accessibilityAsWord: accessibilityAsWord
      })
      .subscribe((res: string) => {
        this.a11y.setAriaLiveValue(res);
        let onElement = document.getElementById(this.btnId);

        setTimeout(() => {
          console.log(onElement);
          onElement.focus();
        }, 500)
      });

    (item as any).accessibilityAriaLabel = accessibilityAsWord;

  }

  private setReportSrc(url: string) {
    console.log('url: ' + url);
    this.reportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onLoad() {
    if (this.reportUrl)
      this.reportModal.showAsLarge();
  }


  saveAsPDF() {

    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.text(20, 20, 'BACC Report');
    pdf.fromHTML(this.iframe.nativeElement.contentDocument.body, 15, 15, {
        'width': 180
      },
      (dispose) => {
        // dispose: object with X, Y of the last line add to the PDF
        //          this allow the insertion of new lines after html
        pdf.save('Test.pdf');
      });
  }
}


