import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';


@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {

  createCampaignForm: FormGroup;
  allowedValuesForm: FormGroup;
  // valueTypeFormControl: FormControl;
  // campaignName: FormControl;
  // description: FormControl;
  // campaignFields: FormArray;

  constructor( public hubService: InnovationsHubService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createCampaignForm = this.fb.group({
      campaignName: [''],
      description: [''],
      campaignFields: this.fb.array([
        this.allowedValuesForm = this.fb.group({
          allowedValues:  this.fb.array([
          ]),
          valueType: this.fb.control('')
        })
      ])
    });
  }

  get campaignFields() {
    return this.createCampaignForm.get('campaignFields') as FormArray;
  }

  addCustomField() {
    this.campaignFields.push(this.fb.control(''));
  }

  removeField() {

  }
  createCampaign() {
    console.log(this.createCampaignForm.value);
  }

}
