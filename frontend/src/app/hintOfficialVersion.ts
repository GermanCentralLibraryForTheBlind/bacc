import {Component, ViewChild} from '@angular/core';

declare var $: any;

@Component({
  selector: 'hint-official',
  template:
  `<div class="modal fade" id="officialVersion" tabindex="-1" role="dialog" aria-labelledby="Official Version">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header contact-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Hint Official Version</h4>
          </div>
          <div class="modal-body">
            <section class="contact contact-header teko">
              <h1 style="text-align: center"> The <span class="content-header wow fadeIn " data-wow-delay="0.2s" data-wow-duration="2s">BACC</span> version <br> under this URL is outdated.<br><br> Please use now the official version: <span class="content-header wow fadeIn " data-wow-delay="0.2s" data-wow-duration="2s"><br><br><a style="color: #fcc500;" href="http://bacc.dzb.de">http://bacc.dzb.de</a></span><br> <br> Thank you and have a nice day!</h1>
            </section>
          </div>
          <div class="modal-footer contact-header"></div>
        </div>
      </div>
    </div>
`,
  styleUrls: ['./feedback/feedback.css']
})

export class HintOfficialComponent {
  constructor() {
  }
}
