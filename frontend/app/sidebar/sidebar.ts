import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})


export class SidebarComponent implements OnInit {

  public menuItems: Array<MenuItem>;

  constructor() {
    this.menuItems = [];
  }

  ngOnInit() {

    let checkOver = new MenuItem();
    checkOver.title = 'Check Over';
    checkOver.backgroundColor = 'transparent';
    checkOver.icon = 'check_circle';
    checkOver.routerLink = '';
    checkOver.disabled = 'false';

    this.menuItems.push(checkOver);

    let report = new MenuItem();
    report.title = 'CReport';
    report.backgroundColor = 'transparent';
    report.icon = 'playlist_add_check';
    report.routerLink = '';
    report.disabled = 'false';

    this.menuItems.push(report);

    let settings = new MenuItem();
    settings.title = 'Settings';
    settings.backgroundColor = 'transparent';
    settings.icon = 'settings';
    settings.routerLink = '';
    settings.disabled = 'false';
    this.menuItems.push(settings);
  }
}


class MenuItem {

  private _title: string;
  private _routerLink: string;
  private _icon: string;
  private _backgroundColor: string;
  private _disabled: string;

  constructor() {
  }

  get routerLink(): string {
    return this._routerLink;
  }

  set routerLink(value: string) {
    this._routerLink = value;
  }

  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
  }

  get disabled(): string {
    return this._disabled;
  }

  set disabled(value: string) {
    this._disabled = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get backgroundColor(): string {
    return this._backgroundColor;
  }

  set backgroundColor(value: string) {
    this._backgroundColor = value;
  }

}
