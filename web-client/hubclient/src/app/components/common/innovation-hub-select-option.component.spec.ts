import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationHubSelectOptionComponent } from './innovation-hub-select-option.component';

describe('InnovationHubSelectOptionComponent', () => {
  let component: InnovationHubSelectOptionComponent;
  let fixture: ComponentFixture<InnovationHubSelectOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovationHubSelectOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovationHubSelectOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
