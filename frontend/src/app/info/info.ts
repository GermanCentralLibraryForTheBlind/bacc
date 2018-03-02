import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'info',
  templateUrl: './info.html',
  styleUrls: ['./info.css']
})
export class InfoComponent implements OnInit {

  @ViewChild('infoModal', {read: ElementRef}) infoModalEl: ElementRef;
  @ViewChild('infoModal') infoModal: any;

  constructor() {
  }

  ngOnInit() {
  }

  // show() {
  //   this.infoModal.showAsLarge();
  //   // this.setFocusToFocusable();
  // }

  //
  // private setFocusToFocusable() {
  //
  //   var focusableEls = this.infoModalEl.nativeElement.querySelectorAll(
  //     'a[href],' +
  //     'area[href],' +
  //     'input:not([disabled]),' +
  //     'select:not([disabled]),' +
  //     'textarea:not([disabled]),' +
  //     'button:not([disabled]),' +
  //     '[tabindex="0"]'
  //   );
  //
  //   focusableEls = Array.prototype.slice.call(focusableEls);
  //   focusableEls[0].setAttribute("style", "color:red; border: 1px solid blue;");
  //   setTimeout(function() { focusableEls[0].focus();}, 3000);
  // }
}
