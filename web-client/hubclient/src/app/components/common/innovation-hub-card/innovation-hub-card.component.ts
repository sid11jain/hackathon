import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  Idea,
  CampaignField,
  Campaign,
  Workflow,
  DEFAULT_CURRENT_STAGE,
  COLUMN_NAME_IDEA_TAG,
  COLUMN_NAME_IDEA_DESCRIPTION,
  COLUMN_NAME_IDEA_CONTRIBUTORS,
  COLUMN_NAME_BUSINESS_CASE,
  COLUMN_NAME_CURRENT_STAGE,
  Tags,
} from 'src/app/models/innovation-hub.model';
import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import {
  SelectOptionConfig,
  DATE_FORMAT,
  Types,
  Collection,
  Roles,
} from 'src/app/models/common/common-utility.model';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { formatDate } from '@angular/common';
import { plainToClass } from 'class-transformer';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'innovation-hub-card',
  templateUrl: './innovation-hub-card.component.html',
  styleUrls: ['./innovation-hub-card.component.scss'],
})
export class InnovationHubCardComponent implements OnInit {
  constructor(
    protected modalRef: BsModalRef,
    protected modalService: BsModalService,
    protected hubService: InnovationsHubService,
    protected router: Router
  ) {}

  @Input()
  campaign: Campaign;

  @Input()
  providedIdea: Idea; // Can initialize by default = new Idea();

  @Input()
  editMode = true;

  @Input()
  newIdea = false;

  //  @Input() fromEditIconClick = false;

  inputType: any = Types;
  ideaForm: FormGroup;
  campaignForm: FormGroup;
  allCampaigns: Campaign[];
  allTags: any[];
  allUsers: any[];
  allowedWorkflows: any[] = [];
  allWorkflows: any[];

  campaignFields: CampaignField[] = [];
  providedIdeaCampaignValues: any = {};

  userOptionConfig = this.hubService.userOptionConfig;
  tagsOptionConfig = this.hubService.tagsOptionConfig;
  workflowOptionConfig = this.hubService.workflowOptionConfig;

  campaignEndingIn: number;

  loadIdea = new BehaviorSubject<Boolean>(false);

  // modalSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    console.log('New idea', this.newIdea);
    console.log('In idea card', this.campaign);
    console.log('In idea card', this.providedIdea);

    this.setInitialData();
    // this.setCampaign();
    if (this.providedIdea) {
      this.mapIdeaCampaignValueAsKeyValue(this.providedIdea);
    }
    this.campaignForm = new FormGroup({
      selectedCampaign: new FormControl(),
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
        this.providedIdea ? this.providedIdea.postedOn : undefined // new Date()
      ),
      tags: new FormControl(
        this.providedIdea ? this.providedIdea.tags : undefined
      ),
      currentStage: new FormControl({
        value: this.providedIdea
          ? this.providedIdea.currentStage
          : DEFAULT_CURRENT_STAGE,
        disabled: !this.currentStageEditable(),
      }),
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
          (field) =>
            new FormGroup({
              [field.name]: new FormControl({
                value:
                  field.type === 'text' && this.providedIdeaCampaignValues
                    ? this.providedIdeaCampaignValues[field.name]
                    : undefined,
                disabled: !this.newIdea,
              }),
            })
        )
      ),
    });
    if (!this.editMode) {
      this.ideaForm.disable();
    }
    console.log('forms ', this.ideaForm.value);
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

  closeModal() {
    this.hideModal();
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
          this.hideModal();
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
    this.allTags = this.hubService.allTags;
    // Skipping the filtering of current user from list - its causing issue at dropdown when current user is contributor.
    this.allUsers = this.hubService.allUsers;
    // this.allUsers = this.hubService.allUsers.filter((user) => {
    //   return user.username !== this.hubService.currentUser;
    // });

    if (this.providedIdea && this.providedIdea.currentStage) {
      const selectedCurrentStage: any = this.hubService.resolveWorkflow(this.providedIdea.currentStage);
      this.allowedWorkflows.push(selectedCurrentStage);
      this.hubService.allWorkflows.filter((workflow) => {
           if (selectedCurrentStage.nextStage.includes(
          workflow.currentStage
        )){
          this.allowedWorkflows.push(workflow);
        }
      });

    } else{
      // Defaulting to initiated state for ideas not having any stage.
      this.allowedWorkflows = [this.hubService.resolveWorkflow(DEFAULT_CURRENT_STAGE)];
    }

    this.setCampaign();

  }

  updateEntity() {
    if (this.ideaForm.value.name) {
      const addedTags = [];
      if (this.ideaForm.value.tags) {
        const selectedTags = this.ideaForm.value.tags as [];
        console.log('All tags : ', this.allTags);
        console.log('Selected tags: ', selectedTags);
        selectedTags.filter((tag: any) => {
          if (
            this.allTags.filter((existingTag) => existingTag.name === tag)
              .length === 0
          ) {
            addedTags.push(new Tags(tag));
            return true;
          }
        });
        // addedTags = plainToClass(Tags, addedTags as []);
        if (addedTags.length > 0) {
          this.hubService
            .addDocuments(Collection.TAGS, addedTags)
            .subscribe((x) => x);
        }
      }

      this.hubService
        .updateCollectionDocument(
          this.ideaForm.value,
          [
            COLUMN_NAME_IDEA_TAG,
            COLUMN_NAME_IDEA_DESCRIPTION,
            COLUMN_NAME_IDEA_CONTRIBUTORS,
            COLUMN_NAME_CURRENT_STAGE,
          ],
          Collection.IDEA
        )
        .subscribe((x) => {
          this.hideModal();
        });
    }
  }

  currentStageEditable() {
    // Enabling form only when creating idea or if user is admin.
    // The enabling at idea creation id handled by disabling it at UI.
    return this.newIdea || this.hubService.currentUserRoles === Roles.ADMIN;
  }

  // resolveWorkflow(currentStage: any) {
  //   if (this.allWorkflows && this.allWorkflows.length > 0) {
  //     return this.allWorkflows.filter(
  //       (workflow) => workflow.currentStage === currentStage
  //     );
  //   }
  // }

  onModalHide() {}

  hideModal() {
    this.modalRef.hide();
    // Modal onHide subscription is not working properly. Going with this basic approach for now.
    window.location.reload(true);
  }
}
