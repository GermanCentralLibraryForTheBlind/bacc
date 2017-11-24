import {Component, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'show-rules',
  templateUrl: './show-rules.html',
  styleUrls: ['./show-rules.css']
})
export class ShowRulesComponent implements OnInit {

  private webApiAllRules : string = '/allRules';
  public rulesAsHTML : SafeHtml;

  @ViewChild('rulesModal') rulesModal: any;

  constructor(private http: Http, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  show() {
      this.http.get(this.webApiAllRules).subscribe(res =>   {
      this.rulesAsHTML = this.sanitizer.bypassSecurityTrustUrl(res.text());
      // console.log(this.rulesAsHTML);
      this.rulesModal.showAsLarge();
    });
  }
}
