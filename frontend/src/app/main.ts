import {Component, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CheckOverComponent} from './check-over/check-over';
import {environment} from '../environments/environment';

declare var $: any;

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

    if (environment.envName === 'test')
      this.showLinkToOfficialBACC();
  }

  // direkt link for screenreader user
  skipLink() {
    this.checkOver.focusOnInput();
  }


  showLinkToOfficialBACC() {
    setTimeout(function () {
      $('#officialVersion').modal('show');
    }, 1000);
  }
}
