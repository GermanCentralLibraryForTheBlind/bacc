import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'info',
  templateUrl: './info.html',
  styleUrls: ['./info.css']
})
export class InfoComponent implements OnInit {

  @ViewChild('infoModal') infoModal: any;

  constructor() {
  }

  ngOnInit() {
  }

  show() {
    this.infoModal.showAsLarge();
  }
}
