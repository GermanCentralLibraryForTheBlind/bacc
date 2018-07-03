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

  switchLanguage(event) {

    const target = event.target || event.srcElement;
    const text = target.innerHTML.trim();

    if (text === 'en') {
      target.innerHTML = "de";
      this.translate.use('en');
    } else if (text === 'de') {
      target.innerHTML = "en";
      this.translate.use('de');
    }
  }
}
