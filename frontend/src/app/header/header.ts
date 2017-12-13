import {Component, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})

// @ViewChild('reportModal') reportModal: any;

export class HeaderComponent implements OnInit {

  title = 'born accessible content checker';

  constructor() { }

  ngOnInit() { }

}
