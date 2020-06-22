import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubFilterPanelComponent } from './hub-filter-panel.component';

describe('HubFilterPanelComponent', () => {
  let component: HubFilterPanelComponent;
  let fixture: ComponentFixture<HubFilterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubFilterPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
