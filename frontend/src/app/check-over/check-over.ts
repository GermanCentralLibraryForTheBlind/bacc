import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ElementRef,
  Renderer2, ViewChild

} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {UploadService} from "./upload.service";
import {ReportComponent} from "../report/report";
import {Accessibility} from "../accessibility";


@Component({
  selector: 'check-over',
  templateUrl: './check-over.html',
  styleUrls: ['./check-over.css']
})

export class CheckOverComponent implements OnInit {

  public hasBaseDropZoneOver: boolean = false;
  public autoStartCheckOver: boolean = true;
  public uploader: FileUploader;
  private renderer: Renderer2;

  @ViewChildren(ReportComponent) reports: QueryList<ReportComponent>;
  @ViewChild('chooseEPUB') input: ElementRef;

  constructor(private uploadService: UploadService,
              private r: Renderer2,
              private access: Accessibility) {

    this.renderer = r;
    this.uploader = this.uploadService.Uploader;
    this.uploadService.Uploader.onAfterAddingFile = fileItem => {

      const timer = setInterval(() => {
          if ((fileItem as any).progressValue > 40)
            clearInterval(timer);
          else {
            (fileItem as any).progressValue += 10;
            this.access.setAriaLiveValue((fileItem as any).progressValue);
          }
        },
        500);

      setTimeout(() => {
        this.reports.forEach(reportInstance => {

          if (reportInstance.itemIndex === this.uploader.getIndexOfItem(fileItem))
            reportInstance.setItemOnSuccess(fileItem);
        });

        if (this.autoStartCheckOver)
          this.uploader.uploadAll();
      });
    }
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


}



