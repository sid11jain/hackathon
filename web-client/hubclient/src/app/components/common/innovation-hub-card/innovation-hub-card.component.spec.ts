import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationHubCardComponent } from './innovation-hub-card.component';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { DatePipe } from '@angular/common';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';

describe('InnovationHubCardComponent', () => {
  let component: InnovationHubCardComponent;
  let fixture: ComponentFixture<InnovationHubCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovationHubCardComponent ],
      imports: [ HttpClientTestingModule,  RouterTestingModule, ModalModule.forRoot() ],
      providers: [DatePipe, BsModalRef, BsModalService ]
    })
    .compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(InnovationHubCardComponent);
    const component = fixture.componentInstance;
    const hubService = fixture.debugElement.injector.get(InnovationsHubService);

    return { fixture, component, hubService};
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovationHubCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const { fixture, component, hubService } = setup();
    expect(component).toBeTruthy();
  });
});
