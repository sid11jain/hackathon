import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { CampaignField } from 'src/app/models/innovation-hub.model';
import {
  IdValuePair,
  TypeDisplay,
  Collection,
  FILTER_TYPE,
} from 'src/app/models/common/common-utility.model';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss'],
})
export class CreateCampaignComponent implements OnInit {
  createCampaignForm: FormGroup;
  allowedValuesForm: FormGroup;

  addFieldOptionConfig = this.hubService.addFieldOptionConfig;
  typeOptionConfig = this.hubService.typeOptionConfig;
  typeDisplay: any[] = TypeDisplay;

  constructor(
    public hubService: InnovationsHubService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createCampaignForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      campaignFields: this.fb.array([]),
    });
  }

  get campaignFields() {
    return this.createCampaignForm.get('campaignFields') as FormArray;
  }

  addCustomField() {
    this.campaignFields.push(this.newCampaignFieldForm());
  }

  removeField(fieldPosition: any) {
    (this.createCampaignForm.controls.campaignFields as FormArray).removeAt(
      fieldPosition
    );
  }
  createCampaign() {
    if (this.createCampaignForm.value.name) {
      const campaignFields = this.createCampaignForm.value.campaignFields as [];
      campaignFields.forEach((campaignField: any) => {
        if (campaignField.allowedValues) {
          const allowedValuesIdValue = [];
          campaignField.allowedValues.forEach((allowedValue) => {
            console.log('Allowed value', allowedValue);
            if (allowedValue && allowedValue.value) {
              allowedValuesIdValue.push(
                new IdValuePair(allowedValue.value, allowedValue.value)
              );
            }
          });
          campaignField.allowedValues = allowedValuesIdValue;
          console.log('allowed value', campaignField.allowedValues);
        }
      });

      console.log(this.createCampaignForm.value);

      this.hubService
        .addDocuments(Collection.CAMPAIGN, this.createCampaignForm.value)
        .subscribe((x) => {
          const filtersToAdd = this.createFiltersFromCampaignField();
          if (filtersToAdd && filtersToAdd.length > 0) {
            console.log('filters to add', filtersToAdd);
            this.hubService.addUpdateFilters(filtersToAdd).subscribe((x) => {
              window.location.reload(true);
            });
          }
        });
    } else {
      alert('Please fill details properly');
    }
  }

  newCampaignFieldForm() {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      allowedValues: new FormControl('', Validators.required),
    });
  }

  createFiltersFromCampaignField() {
    const newFilters = [];
    if (this.createCampaignForm.value.campaignFields) {
      this.createCampaignForm.value.campaignFields.forEach((field: any) => {
        newFilters.push({
          filterName: field.name,
          valueType: FILTER_TYPE.STRING,
          values: field.allowedValues,
        });
      });
    }
    return newFilters;
  }
}
