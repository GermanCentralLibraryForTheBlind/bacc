import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRulesComponent } from './show-rules';

describe('ShowRulesComponent', () => {
  let component: ShowRulesComponent;
  let fixture: ComponentFixture<ShowRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
