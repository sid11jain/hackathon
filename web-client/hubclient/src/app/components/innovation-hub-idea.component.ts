import { Component, OnInit, Input } from '@angular/core';
import { CampaignField } from 'src/app/models/innovation-hub.model';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { Types } from 'src/app/models/innovation-hub.model';
import { SelectOptionConfig } from '../models/common/common-utility.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'innovation-hub-idea',
  templateUrl: './innovation-hub-idea.component.html'
})
export class InnovationHubIdeaComponent implements OnInit {
  type: Types = Types.TEXT;


  @Input()
  campaignFields: CampaignField[];

  ideaForm: FormGroup;

  multiItems: any[] = [];

  testSelectedValues = ['RAG Staus One',
  'RAG Staus Two'];

  constructor(protected hubService: InnovationsHubService) { }

  ngOnInit(): void {

   console.log('campaing fields', this.campaignFields);
   this.ideaForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      postedOn: new FormControl(new Date()),
      submittedBy: new FormControl(),
      contributors: new FormControl(),
      multipOptionsTest: new FormControl(),
       campaignValues: new FormArray(this.campaignFields.map(field => new FormGroup({[field.name]: new FormControl()})))
    });
   console.log('idea form', this.ideaForm);

  }

  submitIdea(){
    console.log('submitted form', this.ideaForm);
    this.hubService.submitIdea(this.ideaForm.value);
  }

  getIdea(){
    if (this.ideaForm.value.name){
      this.hubService.getIdea(this.ideaForm.value);
    }
  }

}
