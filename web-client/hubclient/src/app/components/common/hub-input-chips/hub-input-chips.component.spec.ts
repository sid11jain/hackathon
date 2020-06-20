import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubInputChipsComponent } from './hub-input-chips.component';

describe('HubInputChipsComponent', () => {
  let component: HubInputChipsComponent;
  let fixture: ComponentFixture<HubInputChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubInputChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubInputChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
