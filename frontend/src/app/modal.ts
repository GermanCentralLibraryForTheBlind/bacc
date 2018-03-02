import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

declare var $:any;

@Component({
  selector: 'modal',
  template: `
    <!--<div (click)="onContainerClicked($event)" class="modal fade" tabindex="-1" [ngClass]="{'in': visibleAnimate}"-->
         <!--[ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}">-->

      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" [ngClass]="{'custom-modal': lgModal}">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <ng-content select=".app-modal-header"></ng-content>
            </div>
            <div class="modal-body" [ngClass]="{'custom-modal': lgModal}">
              <ng-content select=".app-modal-body"></ng-content>
            </div>
            <div class="modal-footer">
              <ng-content select=".app-modal-footer"></ng-content>
            </div>
          </div>
        </div>
      </div>
    <!--</div>-->
  `,
  styles: [`
    .modal {
      background: rgba(0, 0, 0, 0.6);
    }

    .custom-modal {
      width: 85vw;
      height: 76vh;
    }
  `]
})
export class ModalComponent {

  private _visible = false;
  private _visibleAnimate = false;
  private _lgModal = false;

  @ViewChild('myModal', {read: ElementRef}) modal: ElementRef;

  constructor() {}

  public show(): void {
    this._visible = true;
    setTimeout(() => this._visibleAnimate = true, 100);
    $('#myModal').modal('show');
  }

  public showAsLarge(): void {
    this._lgModal = true;
    this.show();
  }

  public hide(): void {
    this._visibleAnimate = false;
    setTimeout(() => this._visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

  get visible(): boolean {
    return this._visible;
  }

  get visibleAnimate(): boolean {
    return this._visibleAnimate;
  }

  get lgModal(): boolean {
    return this._lgModal;
  }
}
