import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {TranslateService} from "@ngx-translate/core";

declare var $: any;

@Component({
  selector: 'show-rules',
  templateUrl: './show-rules.html',
  styleUrls: ['./show-rules.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ShowRulesComponent implements OnInit {

  private WEB_API_ALL_RULES = '/allRules';
  public rulesAsHTML: SafeHtml;
  private focusedElementBeforeOpen: any;

  constructor(private http: Http, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  show() {
    this.http.get(this.WEB_API_ALL_RULES).subscribe(res => {
      this.rulesAsHTML = this.sanitizer.bypassSecurityTrustResourceUrl(res.text());
      $("#showRules").modal('show');

      // TODO: move to accessibility module
      this.focusedElementBeforeOpen = document.activeElement;
      const that = this;
      $("#showRules").on('hidden.bs.modal', function () {
        if (that.focusedElementBeforeOpen)
          that.focusedElementBeforeOpen.focus();
      })
    });
  }
}
