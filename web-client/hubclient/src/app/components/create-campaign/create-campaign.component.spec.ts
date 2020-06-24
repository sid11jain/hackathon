import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCampaignComponent } from './create-campaign.component';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { Campaign, Tags } from 'src/app/models/innovation-hub.model';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';


describe('CreateCampaignComponent', () => {
  let component: CreateCampaignComponent;
  let fixture: ComponentFixture<CreateCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCampaignComponent ],
      imports: [ HttpClientTestingModule ],
    providers: [DatePipe, FormBuilder]
    })
    .compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(CreateCampaignComponent);
    const component = fixture.componentInstance;
    const hubService = fixture.debugElement.injector.get(InnovationsHubService);

    return { fixture, component, hubService };
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const { fixture, component, hubService } = setup();
    const campaign = new Campaign;
    const tag = new Tags('newTag');
    spyOn(hubService, 'addDocuments').and.returnValue(of(campaign));
    spyOn(hubService, 'addUpdateFilters').and.returnValue(of([tag]));
    expect(component).toBeTruthy();
  });
});
