import {Component, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CheckOverComponent} from './check-over/check-over';

@Component({
  selector: 'app-root',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class AppComponent {


  @ViewChild(CheckOverComponent) checkOver: CheckOverComponent;

  constructor(private translate: TranslateService) {

    // bacc localisation
    translate.addLangs(["en", "de"]);
    translate.setDefaultLang('en');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de/) ? browserLang : 'en');
  }

  // direkt link for screenreader user
  skipLink() {
    this.checkOver.focusOnInput();
  }
}
