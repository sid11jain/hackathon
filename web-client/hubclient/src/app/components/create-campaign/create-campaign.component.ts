import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { CampaignField } from 'src/app/models/innovation-hub.model';
import { IdValuePair, TypeDisplay } from 'src/app/models/common/common-utility.model';


@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {

  createCampaignForm: FormGroup;
  allowedValuesForm: FormGroup;

  addFieldOptionConfig = this.hubService.addFieldOptionConfig;
  typeDisplay: any[] =  TypeDisplay;
  // valueTypeFormControl: FormControl;
  // campaignName: FormControl;
  // description: FormControl;
  // campaignFields: FormArray;

  constructor( public hubService: InnovationsHubService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createCampaignForm = this.fb.group({
      campaignName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      campaignFields: this.fb.array([
        // this.allowedValuesForm = this.fb.group({
        //   allowedValues:  this.fb.array([
        //   ]),
        //   valueType: this.fb.control('')
        // })
      ])
    });
  }

  get campaignFields() {
    return this.createCampaignForm.get('campaignFields') as FormArray;
  }

  addCustomField() {
    this.campaignFields.push(this.newCampaignFieldForm());
  }

  removeField() {

  }
  createCampaign() {
    // if (this.createCampaignForm.valid){
    const campaignFields = this.createCampaignForm.value.campaignFields as [];
    campaignFields.forEach((campaignField: any) => {
if (campaignField.allowedValues){
  const allowedValuesIdValue = [];
  campaignField.allowedValues.map(allowedValue => {
       allowedValuesIdValue.push(new IdValuePair(allowedValue, allowedValue));
    });
  campaignField.allowedValues = allowedValuesIdValue;
  console.log('allowed value', campaignField.allowedValues);
}
    });
  // } else {
  //  alert('Please fill details properly');
  // }
    console.log(this.createCampaignForm.value);
  }

  newCampaignFieldForm(){
    return new FormGroup({
      name: new FormControl(Validators.required),
      type: new FormControl(Validators.required),
      allowedValues: new FormControl(Validators.required)
    });
  }

}
