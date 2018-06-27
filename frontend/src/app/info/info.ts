import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'info',
  templateUrl: './info.html',
  styleUrls: ['./info.css']
})
export class InfoComponent implements OnInit {

  infoPath: string;

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {

    let browserLang = this.translate.currentLang;
    this.infoPath = "./assets/Infotext_en.md";

    if(browserLang === 'de')
      this.infoPath = "./assets/Infotext_de.md";
  }
}
