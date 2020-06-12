import { Component, OnInit, Input } from '@angular/core';
import { CampaignField } from 'src/app/models/innovation-hub.model';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'innovation-hub-idea',
  templateUrl: './innovation-hub-idea.component.html'
})
export class InnovationHubIdeaComponent implements OnInit {

  @Input()
  campaignFields: CampaignField[];

  ideaForm: FormGroup;

  constructor(protected hubService: InnovationsHubService) { }

  ngOnInit(): void {
    console.log('campaing fields', this.campaignFields);
    this.ideaForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      postedOn: new FormControl(new Date()),
      submittedBy: new FormControl(),
      contributors: new FormControl(),
      campaignValues: new FormArray(this.campaignFields.map(field => new FormGroup({[field.name]: new FormControl()})))
    });
  }

  submitIdea(){
    console.log('submitted form', this.ideaForm);
    this.hubService.submitIdea(this.ideaForm.value);
  }

}
