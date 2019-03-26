import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

declare var $: any;

@Component({
  selector: 'info',
  templateUrl: './info.html',
  styleUrls: ['./info.css']
})
export class InfoComponent implements OnInit {

  public infoPath: string;
  private focusedElementBeforeOpen: any;

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
  }


  show() {

    if (this.translate.currentLang === 'de')
      this.infoPath = "./assets/Infotext_de.md";
    else
      this.infoPath = "./assets/Infotext_en.md";

    $("#myModalInfo").modal('show');

    // TODO: move to accessibility module
    this.focusedElementBeforeOpen = document.activeElement;
    const that = this;
    $("#myModalInfo").on('hidden.bs.modal', function () {
      if (that.focusedElementBeforeOpen)
        that.focusedElementBeforeOpen.focus();
    })
  }
}
