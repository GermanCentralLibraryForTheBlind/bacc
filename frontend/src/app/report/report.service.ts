import {Injectable} from '@angular/core';


export class Report {

  private _name: string;
  private _uploadID: string;
  private _url: string;

  constructor(name: string, uploadID: string, url: string) {
    this._name = name;
    this._uploadID = uploadID;
    this._url = url;
  }

  get name(): string {
    return this._name;
  }

  get uploadID(): string {
    return this._uploadID;
  }

  get url(): string {
    return this._url;
  }
}

@Injectable()
export class ReportService {

  private reports: Array<Report>;

  constructor() {
    this.reports = [];
  };

  public add(report: Report) {
    this.reports.push(report);
  }

  public getReportDataById(id: string): string {

    if (this.reports.length > 0)
      return this.reports.find(i => i.uploadID === id).url;
    else
      return 'empty';
  }
}
