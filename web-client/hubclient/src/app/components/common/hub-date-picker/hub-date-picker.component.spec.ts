import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubDatePickerComponent } from './hub-date-picker.component';

describe('HubDatePickerComponent', () => {
  let component: HubDatePickerComponent;
  let fixture: ComponentFixture<HubDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
