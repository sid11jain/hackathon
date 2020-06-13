import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { FirstCampaign } from 'src/app/models/sample/sample-campaign';
import { Campaign } from 'src/app/models/innovation-hub.model';
import { plainToClass } from 'class-transformer';
import { InnovationsHubService } from '../services/innovations-hub.service';

@Component({
  selector: 'app-innovation-hub',
  templateUrl: 'innovation-hub.component.html',
  styleUrls: ['innovation-hub.component.scss']
})
export class InnovationHubComponent implements OnInit {

  campaign: Campaign;
  fields: any[];
  parentForm: FormGroup ;
  options: Observable<any[]>;
  constructor(private service: InnovationsHubService) { }

  ngOnInit(): void {
    this.fields = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.parentForm  = new FormGroup({
      freeText: new FormControl(),
      singleSelect: new FormControl(),
      radioButton: new FormControl()
    });
    this.options = of(['options1', 'options2']);
    this.getCampaign();
    console.log('main comp ', this.campaign.campaignFields);
  }

  onRadioChange(flag: boolean){


  }

getCampaign(){
  this.campaign = plainToClass(Campaign, FirstCampaign);
}

  submit(){
    console.log('test fired');
    this.service.submitIdea(this.parentForm.value.freeText);
  }

}
