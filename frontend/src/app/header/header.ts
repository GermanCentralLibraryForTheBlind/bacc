import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})

// @ViewChild('reportModal') reportModal: any;

export class HeaderComponent implements OnInit {

  title = 'born accessible content checker';

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
  }

  switchLanguage() {

    if (event.srcElement.innerHTML.trim() === 'en') {
      event.srcElement.innerHTML = "de";
      this.translate.use('en');
    } else if (event.srcElement.innerHTML.trim() === 'de') {
      event.srcElement.innerHTML = "en";
      this.translate.use('de');
    }
  }
}
