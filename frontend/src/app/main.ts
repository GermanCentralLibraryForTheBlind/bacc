import {Component, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CheckOverComponent} from './check-over/check-over';
import {environment} from '../environments/environment';
import swal from 'sweetalert2';

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

    this.noSupportForIE();

    if (environment.envName === 'test')
      this.showLinkToOfficialBACC();
  }

  noSupportForIE() {

    if (navigator.userAgent.indexOf("Trident") !== -1) {

      this.translate.get('BACC.NO_SUPPORT_FOR_IE').subscribe((res: string) => {

          swal({
            title: 'Internet Explorer',
            text: res,
            imageUrl: './assets/logo.png',
            imageWidth: 42,
            imageHeight: 45,
            imageAlt: 'BACC Logo',
            animation: false,
            onClose: () => { window.history.go(-1); }})

      });
    }
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
