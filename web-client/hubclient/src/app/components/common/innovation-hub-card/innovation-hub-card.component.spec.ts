import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationHubCardComponent } from './innovation-hub-card.component';

describe('InnovationHubCardComponent', () => {
  let component: InnovationHubCardComponent;
  let fixture: ComponentFixture<InnovationHubCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovationHubCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovationHubCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
