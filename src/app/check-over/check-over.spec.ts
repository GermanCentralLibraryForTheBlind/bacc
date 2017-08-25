import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CheckOverComponent} from './check-over';

describe('UploadComponent', () => {
  let component: CheckOverComponent;
  let fixture: ComponentFixture<CheckOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckOverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
