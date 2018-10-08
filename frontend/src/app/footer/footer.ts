import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent implements OnInit {

  public path: string;
  private focusedElementBeforeOpen: any;

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
  }

  show(event) {

    const target = event.target || event.srcElement;
    const text = target.innerHTML.trim();

    this.translate.get('BACC.DATA_PROTECTION').subscribe((res: string) => {

      if (text !== res)
        this.path = "./assets/impressum.md";
      else
        this.path = "./assets/data-protection.md";

      $("#myFooterModal").modal('show');

      // TODO: move to accessibility module
      this.focusedElementBeforeOpen = document.activeElement;
      const that = this;
      $("#myFooterModal").on('hidden.bs.modal', function () {
        if (that.focusedElementBeforeOpen)
          that.focusedElementBeforeOpen.focus();
      })
    })
  }
}
