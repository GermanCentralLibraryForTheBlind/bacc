import {Component} from '@angular/core';


@Component({
  selector: 'modal',
  template: `
    <div (click)="onContainerClicked($event)" class="modal fade" tabindex="-1" [ngClass]="{'in': visibleAnimate}"
         [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}">
      <div class="modal-dialog" [ngClass]="{'modal-lg': lgModal}">
        <div class="modal-content">
          <div class="modal-header">
            <ng-content select=".app-modal-header"></ng-content>
          </div>
          <div class="modal-body">
            <ng-content select=".app-modal-body"></ng-content>
          </div>
          <div class="modal-footer">
            <ng-content select=".app-modal-footer"></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal {
      background: rgba(0, 0, 0, 0.6);
    }

    .modal-body {
      height: 70vh;
      /*width: 60vw;*/
    }
  `]
})
export class ModalComponent {

  private _visible = false;
  private _visibleAnimate = false;
  private _lgModal = false;

  constructor() {
  }

  public show(): void {
    this._visible = true;
    setTimeout(() => this._visibleAnimate = true, 100);
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
