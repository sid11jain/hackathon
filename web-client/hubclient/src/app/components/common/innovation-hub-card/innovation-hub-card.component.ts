import { Component, OnInit, Input } from '@angular/core';
import { Idea, CampaignField, Campaign, Collection } from 'src/app/models/innovation-hub.model';
import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { SelectOptionConfig } from 'src/app/models/common/common-utility.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'innovation-hub-card',
  templateUrl: './innovation-hub-card.component.html',
  styleUrls: ['./innovation-hub-card.component.scss']
})
export class InnovationHubCardComponent implements OnInit {
  constructor(protected modalRef: BsModalRef, protected hubService: InnovationsHubService) {}


  @Input()
  campaign: Campaign;

  @Input()
  providedIdea: Idea ; // Can initialize by default = new Idea();

  @Input()
  add = true;

  ideaForm: FormGroup;
  campaignForm: FormGroup;
  allCampaigns: Campaign[];



  campaignFields: CampaignField[] = [];
  providedIdeaCampaignValues: any = {};

  loadIdea = new BehaviorSubject<Boolean>(false);

  ngOnInit(): void {
    console.log('In idea card', this.campaign);
    this.setCampaign();
    if (this.providedIdea) {
            this.mapIdeaCampaignValueAsKeyValue(this.providedIdea);
    }
    this.campaignForm = new FormGroup({
      selectedCampaign: new FormControl()
    });
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
      )
    });
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
  exportToExcel() {
    if (this.campaign.name) {
      this.hubService.exportToExcel(this.campaign.name);
    }
  }

  closeModal(){
    this.modalRef.hide();
  }

  addEntity(){
    console.log('Add', this.ideaForm.value);
    if (this.ideaForm.value.name){
      this.ideaForm.value.campaignName = this.campaign.name;
      this.hubService.submitIdea(this.ideaForm.value);
      this.modalRef.hide();
     }else{
      alert('Mandtaory values not provided');
     }

  }

  setCampaign(){
    console.log('idea card campaign', this.campaign);
    if (this.campaign){
      this.campaignFields = this.campaign.campaignFields;
      } else{
        this.hubService.getCollection(Collection.CAMPAIGN).subscribe((resp: any) => {
          if (resp && resp.data){
            this.allCampaigns =  JSON.parse(resp.data);
            console.log('all camp', this.allCampaigns);
          }
        });
      }
 }

}
