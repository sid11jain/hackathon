import { Component, OnInit, Input } from '@angular/core';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { Campaign, Filter, END_DATE_COLUMN } from 'src/app/models/innovation-hub.model';
import { SelectOptionConfig, OPERATION, Collection, ComparisonOperators, FILTER_TYPE } from 'src/app/models/common/common-utility.model';
import { InnovationHubCardComponent } from './innovation-hub-card.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-hub-campaign-card',
  templateUrl: './hub-campaign-card.component.html',
  styleUrls: ['./hub-campaign-card.component.scss'],
})
export class HubCampaignCardComponent implements OnInit {
  constructor(
    protected modalRef: BsModalRef,
    protected hubService: InnovationsHubService,
    protected spinner: NgxSpinnerService,
    protected modalService: BsModalService
  ) {}

  @Input()
  campaign: Campaign;
  @Input()
  operation: OPERATION;

  configForCampaignSearch: SelectOptionConfig = {
    searchable: true,
    multipleOptions: false,
    clearable: false,
    bindLabel: 'name', // , bindValue: 'name'
  };

  campaignForm: FormGroup;
  allCampaigns: Campaign[];
  allowedOperations: any = OPERATION;

  ngOnInit(): void {
    this.setCampaign();

    this.campaignForm = new FormGroup({
      selectedCampaign: new FormControl(),
    });
  }

  setCampaign() {
    if (!this.campaign) {
      this.hubService
        .getFilteredCollection(Collection.CAMPAIGN, [this.createActiveCampaignFilter()])
        .subscribe((resp: any) => {
          if (resp && resp.data) {
            this.allCampaigns = resp.data;
          }
        });
    }
  }

  closeModal() {
    this.modalRef.hide();
  }

  addIdea() {
    if (this.campaignForm.value.selectedCampaign) {
      this.campaign = this.campaignForm.value.selectedCampaign;
      this.spinner.show();
      this.modalRef.hide();
      const config: ModalOptions = { backdrop: 'static', keyboard: true };
      const initialState = { campaign: this.campaign, newIdea: 'true' };
      this.modalService.show(
        InnovationHubCardComponent,
        Object.assign({}, config, { initialState })
      );
      setTimeout(() => {
        this.spinner.hide();
      }, 500);

    }
  }

  exportIdeas(){
    if (this.campaignForm.value.selectedCampaign) {
      this.hubService.exportToExcel(this.campaignForm.value.selectedCampaign.name);
      this.modalRef.hide();
    }
  }

  onHideModal() {
    // const initialState = { campaign: this.campaign };
    // const newModalRef = this.modalService.show(
    //   InnovationHubCardComponent,
    //  Object.assign({}, {initialState}));
    // newModalRef.campaign = this.campaign;
  }

  createActiveCampaignFilter(){
    const filter = new Filter();
    filter.filterName = END_DATE_COLUMN;
    filter.comparisonOp = ComparisonOperators.OP_GTE;
    filter.values =  [new Date()];
    filter.nestedOn = false;
    filter.valueType = FILTER_TYPE.DATE;
    return filter;
  }
}
