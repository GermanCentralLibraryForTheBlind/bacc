import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class AppComponent {

  constructor(router: Router, private translate: TranslateService) {

    // bacc localisation
    translate.addLangs(["en", "de"]);
    translate.setDefaultLang('en');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de/) ? browserLang : 'en');


    router.navigate(['/co']); // bootstrap default route ...
  }
}
