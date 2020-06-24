import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubDatePickerComponent } from './hub-date-picker.component';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

describe('HubDatePickerComponent', () => {
  let component: HubDatePickerComponent;
  let fixture: ComponentFixture<HubDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubDatePickerComponent ],
      imports: [ HttpClientTestingModule, NgbModule, NgbDatepickerModule  ],
      providers: [DatePipe]
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
