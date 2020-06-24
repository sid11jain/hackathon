import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationHubComponent } from './innovation-hub.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';

describe('InnovationHubComponent', () => {
  let component: InnovationHubComponent;
  let fixture: ComponentFixture<InnovationHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovationHubComponent ],
      imports: [ HttpClientTestingModule,  RouterTestingModule],
      providers: [DatePipe]
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
