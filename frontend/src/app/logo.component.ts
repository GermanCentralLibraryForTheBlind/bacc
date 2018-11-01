import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'logo',
  template: `
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 146.68 171.3">
      <defs>
        <style>.cls-1 {
          fill: #fff;
        }

        .cls-2 {
          fill: #34a4dc;
        }

        .cls-3 {
          fill: #233a75;
        }</style>
      </defs>
      <title>bacc logo</title>
      <circle class="cls-1" cx="72.56" cy="96.68" r="44.35"/>
      <path class="cls-2"
            d="M310.22,172.1a72.13,72.13,0,0,1,28.51,5.68,72.85,72.85,0,0,1,39,39,74.38,74.38,0,0,1,0,57,73.15,73.15,0,0,1-15.68,23.36A74.65,74.65,0,0,1,338.74,313a70.93,70.93,0,0,1-28.51,5.79A71.66,71.66,0,0,1,281.6,313a73,73,0,0,1-23.36-15.78,75.42,75.42,0,0,1-15.68-23.36,70.92,70.92,0,0,1-5.79-28.51V147.48h34.3v36A70.19,70.19,0,0,1,289.39,175,72.68,72.68,0,0,1,310.22,172.1Zm0,112.38a38.21,38.21,0,0,0,15.15-3,39.52,39.52,0,0,0,20.94-20.84,39.65,39.65,0,0,0,0-30.51,39.52,39.52,0,0,0-20.94-20.84,39.43,39.43,0,0,0-30.41,0,39.8,39.8,0,0,0-20.84,20.84,39.68,39.68,0,0,0,0,30.51A39.8,39.8,0,0,0,295,281.43,38,38,0,0,0,310.22,284.48Z"
            transform="translate(-236.78 -147.48)"/>
      <circle class="cls-3" cx="72.56" cy="96.68" r="22.91"/>
      <circle class="cls-1" cx="62.49" cy="90.96" r="6.12"/>
    </svg>`,
  styles: ['svg { height: inherit; width: inherit; } :host { width: 34px; height: 37px; margin-right: 10px; margin-bottom: 4px;}']
})
export class Logo implements OnInit {

  // logo ratio 0.86
  constructor() {
  }

  ngOnInit() {
  }
}
