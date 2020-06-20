import { Component, OnInit, Input } from '@angular/core';
import {
  Idea,
  CampaignField,
  Campaign,
  Workflow,
  DEFAULT_CURRENT_STAGE
} from 'src/app/models/innovation-hub.model';
import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import {
  SelectOptionConfig,
  DATE_FORMAT,
  Types,
  Collection
} from 'src/app/models/common/common-utility.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { formatDate } from '@angular/common';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'innovation-hub-card',
  templateUrl: './innovation-hub-card.component.html',
  styleUrls: ['./innovation-hub-card.component.scss']
})
export class InnovationHubCardComponent implements OnInit {
  constructor(
    protected modalRef: BsModalRef,
    protected hubService: InnovationsHubService
  ) {}

  @Input()
  campaign: Campaign;

  @Input()
  providedIdea: Idea; // Can initialize by default = new Idea();

  @Input()
  editMode = true;

  @Input()
  newIdea = false;

  inputType: any = Types;
  ideaForm: FormGroup;
  campaignForm: FormGroup;
  allCampaigns: Campaign[];
  allTags: any[];
  allUsers: any[];
  allowedWorkflows: any[];

  campaignFields: CampaignField[] = [];
  providedIdeaCampaignValues: any = {};

  userOptionConfig = this.hubService.userOptionConfig;

  tagsOptionConfig = this.hubService.tagsOptionConfig;

  workflowOptionConfig = this.hubService.workflowOptionConfig;

  loadIdea = new BehaviorSubject<Boolean>(false);

  ngOnInit(): void {
    console.log('New idea', this.newIdea);
    console.log('In idea card', this.campaign);
    this.setInitialData();
    // this.setCampaign();
    if (this.providedIdea) {
      this.mapIdeaCampaignValueAsKeyValue(this.providedIdea);
    }
    this.campaignForm = new FormGroup({
      selectedCampaign: new FormControl()
    });
    this.ideaForm = new FormGroup({
      name: new FormControl(
        this.providedIdea ? this.providedIdea.name : undefined
      ),
      campaignName: new FormControl(
        this.providedIdea ? this.providedIdea.campaignName : undefined
      ),
      description: new FormControl(
        this.providedIdea ? this.providedIdea.description : undefined
      ),
      postedOn: new FormControl(
        this.providedIdea ? this.providedIdea.postedOn :  undefined// new Date()
      ),
      tags: new FormControl(
        this.providedIdea ? this.providedIdea.tags : undefined
      ),
      currentStage: new FormControl(
        this.providedIdea
          ? this.providedIdea.currentStage
          : DEFAULT_CURRENT_STAGE
      ),
      submittedBy: new FormControl(
        this.providedIdea
          ? this.providedIdea.submittedBy
          : this.hubService.currentUser
      ),
      contributors: new FormControl(
        this.providedIdea ? this.providedIdea.contributors : undefined
      ),
      campaignValues: new FormArray(
        this.campaignFields.map(
          field =>
            new FormGroup({
              [field.name]: new FormControl(
                field.type === 'text' && this.providedIdeaCampaignValues
                  ? this.providedIdeaCampaignValues[field.name]
                  : undefined
              )
            })
        )
      )
    });
    if (!this.editMode) {
      this.ideaForm.disable();
    }
    console.log('forms ', this.ideaForm.controls.tags);
  }

  getIdea() {
    if (this.ideaForm.value.name) {
      this.hubService.getIdea(this.ideaForm.value);
    }
  }

  mapIdeaCampaignValueAsKeyValue(providedIdea: Idea) {
    if (providedIdea) {
      const keyValue = [];
      this.providedIdea.campaignValues.map(x => {
        this.campaignFields.map(field => {
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

  closeModal() {
    this.modalRef.hide();
  }

  addEntity() {
    console.log('Add', this.ideaForm.value);
    if (this.ideaForm.value.name) {
      this.ideaForm.value.campaignName = this.campaign.name;
      this.hubService.submitIdea(this.ideaForm.value).subscribe((resp: any) => {
        if (resp && resp.error) {
          alert(
            this.ideaForm.value.name + '' + resp.error.errorMessage + ' name'
          );
        } else {
          this.modalRef.hide();
        }
      });
    } else {
      alert('Mandtaory values not provided');
    }
  }

  setCampaign() {
    console.log('idea card campaign', this.campaign);
    if (this.campaign) {
      this.campaignFields = this.campaign.campaignFields;
    } else {
      this.hubService
        .getCollection(Collection.CAMPAIGN)
        .subscribe((resp: any) => {
          if (resp && resp.data) {
            this.allCampaigns = JSON.parse(resp.data);
            console.log('all camp', this.allCampaigns);
          }
        });
    }
  }

  setInitialData() {
    this.hubService.getCollection(Collection.USERS).subscribe((resp: any) => {
      if (resp && resp.data) {
        this.allUsers = resp.data;
        this.allUsers = this.allUsers.filter(user => {
          return user.username !== this.hubService.currentUser;
        });
        console.log('all users', this.allUsers);
      }
    });
    this.hubService.getCollection(Collection.TAGS).subscribe((resp: any) => {
      if (resp && resp.data) {
        this.allTags = resp.data;
        console.log('all tags', this.allTags);
      }
    });
    this.setCampaign();
    if (this.providedIdea && this.providedIdea.currentStage) {
      this.hubService
        .getCollection(Collection.WORKFLOW)
        .subscribe((resp: any) => {
          if (resp && resp.data) {
            const allWorkFlows: any[] = JSON.parse(resp.data);
            console.log('all tags', allWorkFlows);
            this.allowedWorkflows = allWorkFlows.filter(workflow => {
              this.providedIdea.currentStage.nextStage.includes(
                workflow.currentStage
              );
            });
          }
        });
    }
  }
}
