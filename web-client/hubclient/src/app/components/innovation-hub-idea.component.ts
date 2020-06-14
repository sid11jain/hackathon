import { Component, OnInit, Input } from '@angular/core';
import {
  CampaignField,
  Campaign,
  Idea,
} from 'src/app/models/innovation-hub.model';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { Types } from 'src/app/models/innovation-hub.model';
import { SelectOptionConfig } from '../models/common/common-utility.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'innovation-hub-idea',
  templateUrl: './innovation-hub-idea.component.html',
})
export class InnovationHubIdeaComponent implements OnInit {
  constructor(protected hubService: InnovationsHubService) {}

  type: Types = Types.TEXT;

  @Input()
  campaign: Campaign;

  @Input()
  providedIdea: Idea = new Idea(); // Can initialize by default = new Idea();

  @Input()
  add = true;

  ideaForm: FormGroup;

  multiItems: any[] = [];

  campaignFields: CampaignField[] = [];
  providedIdeaCampaignValues: any = {};

  testSelectedValues = [
    {
      id: 'RAG Staus Two',
      value: 'RAG Staus Two',
    },
    {
      id: 'RAG Staus Three',
      value: 'RAG Staus Three',
    },
  ];
  ngOnInit(): void {
    console.log('campaign', this.campaign);
    console.log('idea input', this.providedIdea);
    // console.log('idea input', this.providedIdea.campaignValues['Department']);

    this.campaignFields = this.campaign.campaignFields;
    if (this.providedIdea) {
      console.log('befroe conver input', this.providedIdea.campaignValues);

      const cam = Object.assign(this.providedIdea.campaignValues.values());
      this.mapIdeaCampaignValueAsKeyValue(this.providedIdea);
      console.log('after conert input', cam);
    }
    console.log('campaing fields', this.campaignFields);
    this.ideaForm = new FormGroup({
      name: new FormControl(this.providedIdea.name),
      campaignName: new FormControl(this.providedIdea.campaignName),
      description: new FormControl(this.providedIdea.description),
      postedOn: new FormControl(
        this.providedIdea ? this.providedIdea.postedOn : new Date()
      ),
      submittedBy: new FormControl(this.providedIdea.submittedBy),
      contributors: new FormControl(this.providedIdea.contributors),
      campaignValues: new FormArray(
        this.campaignFields.map(
          (field) =>
            new FormGroup({
              [field.name]: new FormControl(
                field.type === 'text'
                  ? this.providedIdeaCampaignValues[field.name]
                  : undefined
              ),
            })
        )
      ),
    });
    console.log('idea form', this.ideaForm);
  }

  submitIdea() {
    console.log('submitted form', this.ideaForm);
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
      console.log('LAst11', this.providedIdeaCampaignValues);
    }
  }
}
