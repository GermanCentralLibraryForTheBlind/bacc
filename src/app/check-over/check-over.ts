import {
  Component,
  OnInit,
  QueryList,
  ViewChildren

} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {UploadService} from "./upload.service";
import {ReportComponent} from "../report/report";


@Component({
  selector: 'check-over',
  templateUrl: './check-over.html',
  styleUrls: ['./check-over.css']
})

export class CheckOverComponent implements OnInit {

  public hasBaseDropZoneOver: boolean = false;
  public uploader: FileUploader;

  @ViewChildren(ReportComponent) reports: QueryList<ReportComponent>;

  constructor(private uploadService: UploadService) {

    this.uploader = this.uploadService.Uploader;
    this.uploadService.Uploader.onAfterAddingFile = fileItem => {

      setTimeout(() => {
        this.reports.forEach(reportInstance =>
          reportInstance.setItemOnSuccess(fileItem)
        );
      });
    }
  }

  ngOnInit() {
  };

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}



