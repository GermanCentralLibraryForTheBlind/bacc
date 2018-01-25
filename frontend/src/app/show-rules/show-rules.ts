import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'show-rules',
  templateUrl: './show-rules.html',
  styleUrls: ['./show-rules.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ShowRulesComponent implements OnInit {

  private WEB_API_ALL_RULES = '/allRules';
  public rulesAsHTML: SafeHtml;

  @ViewChild('rulesModal') rulesModal: any;

  constructor(private http: Http, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  show() {
      this.http.get(this.WEB_API_ALL_RULES).subscribe(res =>   {
      this.rulesAsHTML = this.sanitizer.bypassSecurityTrustResourceUrl(res.text());
      // console.log(this.rulesAsHTML);
      this.rulesModal.showAsLarge();
    });
  }
}
