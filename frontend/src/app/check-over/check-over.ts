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
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'check-over',
  templateUrl: './check-over.html',
  styleUrls: ['./check-over.css']
})

export class CheckOverComponent implements OnInit {

  public hasBaseDropZoneOver: boolean = false;
  public autoStartCheckOver: boolean = true;
  public uploader: FileUploader;
  private a11y: Accessibility;

  @ViewChildren(ReportComponent) reports: QueryList<ReportComponent>;
  @ViewChild('chooseEPUB') input: ElementRef;

  constructor(private uploadService: UploadService,
              private renderer: Renderer2,
              private translate: TranslateService) {

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

}



