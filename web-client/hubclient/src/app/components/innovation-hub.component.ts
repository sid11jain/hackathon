import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { FirstCampaign } from 'src/app/models/sample/sample-campaign';
import { Campaign, Idea } from 'src/app/models/innovation-hub.model';
import { plainToClass } from 'class-transformer';
import { InnovationsHubService } from '../services/innovations-hub.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-innovation-hub',
  templateUrl: 'innovation-hub.component.html',
  styleUrls: ['innovation-hub.component.scss'],
})
export class InnovationHubComponent implements OnInit {
  campaign: Campaign;
  idea: Idea;
  fields: any[];
  parentForm: FormGroup;
  options: Observable<any[]>;
  constructor(private hubService: InnovationsHubService) {}

  ngOnInit(): void {
    this.parentForm = new FormGroup({
      campaignName: new FormControl(),
      ideaName: new FormControl(),
      radioButton: new FormControl(),
    });
    // this.options = of(['options1', 'options2']);
    // this.getCampaign();
    // console.log('main comp ', this.campaign.campaignFields);
  }

  onRadioChange(flag: boolean) {}

  getCampaign() {
    console.log('campaing name', this.parentForm.value.campaignName);
    if (this.parentForm.value.campaignName) {
      const campaignCriteria = new Campaign();
      campaignCriteria.name = this.parentForm.value.campaignName;
      this.hubService
        .getCampaign(campaignCriteria)
        .subscribe((resp: any) => {
          if (resp && resp.data ) {
            this.campaign = resp.data;
          }
        });
    }

    // console.log('campaign at hub', this.campaign);
    // this.campaign = plainToClass(Campaign, FirstCampaign);
  }

  getIdea(){
    if (this.parentForm.value.ideaName) {
      const ideaCriteria = new Idea();
      ideaCriteria.name = this.parentForm.value.ideaName;
      this.hubService
        .getIdea(ideaCriteria)
        .subscribe((resp: any) => {
          if (resp && resp.data ) {
            this.idea = resp.data;
            this.campaign = this.idea.campaign;
          }
        });
    }

    console.log("Idea at hub", this.idea);
  }

  // submit() {
  //   console.log('test fired');
  //   this.hubService.submitIdea(this.parentForm.value.freeText);
  // }
}
