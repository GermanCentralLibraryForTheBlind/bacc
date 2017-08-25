import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {UploadService} from "./upload.service";


@Component({
  selector: 'check-over',
  templateUrl: './check-over.html',
  styleUrls: ['./check-over.css']
})

export class CheckOverComponent implements OnInit {

  public hasBaseDropZoneOver: boolean = false;
  public uploader: FileUploader;


  constructor(private uploadService: UploadService) {

    this.uploader = this.uploadService.Uploader;
  }

  ngOnInit() { }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}


// this.uploader.onCompleteItem = (item:any, response:string, status:any, headers:any) => {
//
//   console.log("Upload completed:" + response);
// };


