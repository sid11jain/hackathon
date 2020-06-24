import { Component, OnInit, Input } from '@angular/core';
import {
  CampaignField,
  Campaign,
  Idea,
} from 'src/app/models/innovation-hub.model';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'innovation-hub-idea',
  templateUrl: './innovation-hub-idea.component.html',
})
export class InnovationHubIdeaComponent implements OnInit{
  constructor(protected hubService: InnovationsHubService) {}


  @Input()
  campaign: Campaign;

  @Input()
  providedIdea: Idea ; // Can initialize by default = new Idea();

  @Input()
  add = true;

  ideaForm: FormGroup;


  campaignFields: CampaignField[] = [];
  providedIdeaCampaignValues: any = {};

  ngOnInit(): void {
    this.campaignFields = this.campaign.campaignFields;
    if (this.providedIdea) {
            this.mapIdeaCampaignValueAsKeyValue(this.providedIdea);
    }
    this.ideaForm = new FormGroup({
      name: new FormControl(this.providedIdea ? this.providedIdea.name : undefined ),
      campaignName: new FormControl(this.providedIdea ? this.providedIdea.campaignName : undefined),
      description: new FormControl(this.providedIdea ? this.providedIdea.description : undefined),
      postedOn: new FormControl(
        this.providedIdea ? this.providedIdea.postedOn : new Date()
      ),
      submittedBy: new FormControl(this.providedIdea ? this.providedIdea.submittedBy : undefined),
      contributors: new FormControl(this.providedIdea ? this.providedIdea.contributors : undefined),
      campaignValues: new FormArray(
        this.campaignFields.map(
          (field) =>
            new FormGroup({
              [field.name]: new FormControl(
                field.type === 'text' && this.providedIdeaCampaignValues
                  ? this.providedIdeaCampaignValues[field.name]
                  : undefined
              ),
            })
        )
      ),
    });
  }

  submitIdea() {
    this.ideaForm.value.campaignName = this.campaign.name;
    this.hubService.submitIdea(this.ideaForm.value);
  }

  getIdea() {
    if (this.ideaForm.value.name) {
      this.hubService.getIdea(this.ideaForm.value);
    }
  }

  mapIdeaCampaignValueAsKeyValue(providedIdea: Idea) {
    if (providedIdea) {
      const keyValue = [];
      this.providedIdea.campaignValues.map((x) => {
        this.campaignFields.map((field) => {
          if (x[field.name]) {
            keyValue.push({ [field.name]: x[field.name] });
          }
        });
      });
      this.providedIdeaCampaignValues = Object.assign({}, ...keyValue);
    }
  }
  exportToExcel() {
    if (this.campaign.name) {
      this.hubService.exportToExcel(this.campaign.name);
    }
  }

}
