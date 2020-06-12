import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationHubComponent } from './innovation-hub.component';

describe('InnovationHubComponent', () => {
  let component: InnovationHubComponent;
  let fixture: ComponentFixture<InnovationHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovationHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovationHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
