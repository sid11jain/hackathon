import { OnInit, Component } from '@angular/core';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { InnovationHubComponent } from 'src/app/components/innovation-hub.component';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { Idea, Collection, Filter } from 'src/app/models/innovation-hub.model';
import { InnovationHubIdeaComponent } from 'src/app/components/innovation-hub-idea.component';
import { InnovationHubCardComponent } from 'src/app/components/common/innovation-hub-card/innovation-hub-card.component';
import { HubCampaignCardComponent } from 'src/app/components/common/innovation-hub-card/hub-campaign-card.component';
import {
  OPERATION,
  FILTER_TYPE,
} from 'src/app/models/common/common-utility.model';
import { plainToClass } from 'class-transformer';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'landing-view',
  templateUrl: './landing-view.component.html',
  styleUrls: ['./landing-view.component.scss'],
})
export class LandingViewComponent implements OnInit {
  bsModalRef: BsModalRef;
  operation: any = OPERATION;
  ideas: any[] = [];
  allFilters: Filter[];
  ideasLoaded = false;
  deckView = false;
  disableFilters = false;

  filtersForm: FormGroup;
  filterValueType: any = FILTER_TYPE;

  constructor(
    private modalService: BsModalService,
    private hubService: InnovationsHubService
  ) {}

  ngOnInit(): void {
    this.hubService.getAllIdeas().subscribe((resp: any) => {
      if (resp && resp.data) {
        this.ideas = resp.data as [];
      }
      this.ideasLoaded = true;
      console.log('All IDeas', this.ideas);
    });

    this.allFilters = plainToClass(
      Filter,
      this.hubService.createFilterIdValue()
    );
    this.filtersForm = new FormGroup({
      filters: new FormArray(
        this.allFilters.map(
          (filter) =>
            new FormGroup({
              filterName: new FormControl(filter.filterName),
              valueType: new FormControl(this.filterValueType.STRING),
              // [filter.filterName]: new FormGroup({
              values: new FormArray(
                filter.values.map((value) => new FormControl())
              ),
              // }),
            })
        )
      ),
    });

    console.log('filter form ', this.filtersForm);
  }

  openCampaignComponent(operationInput: OPERATION) {
    const initialState = { operation: operationInput };
    this.modalService.show(
      HubCampaignCardComponent,
      Object.assign({}, { initialState })
    );
  }

  switchView() {
    this.deckView = !this.deckView;
  }

  searchIdeas() {
    console.log('filters', this.filtersForm.value);

    this.hubService.searchIdeas({ filters: this.decorateFilterValues() }).subscribe((resp: any) => {
      if (resp && resp.data) {
        this.ideas = resp.data as [];
      }
      this.ideasLoaded = true;
      console.log('All IDeas', this.ideas);
    });
  }
  setStep(any) {}

  // A very messy and bad logic. Has to move such things to template and better cattering
  onFilterCheck(
    filter?: any,
    filterPosition?: any,
    valuePosition?: any,
    value?: any
  ) {
    console.log('values ', this.filtersForm);
    const filterFormValue = this.filtersForm.value as any;
    filter as Filter;
    console.log('check ', filter.values[valuePosition]);
    const filterValueSelected =
      filterFormValue.filters[filterPosition].values[valuePosition];
    if (filterValueSelected) {
      filterFormValue.filters[filterPosition].values[valuePosition] =
        filter.values[valuePosition].value;
    } else {
      filterFormValue.filters[filterPosition].values[valuePosition] = null;
    }
    // filterFormValue.filters[filterPosition][filter.filterName].values[valuePosition] = filter.values[valuePosition].value;
    this.filtersForm.patchValue(filterFormValue);
    console.log('patched filters', this.filtersForm.value);
    // this.filtersForm.value.filters[0][formName].patchValues(value);
  }

  decorateFilterValues() {
    let filters: any[] = this.filtersForm.value.filters;
    console.log('DEcorat dilter start', filters);
    const removeFilters = new Set();
    filters.forEach((filter: any) => {
      filter.values = filter.values.filter(Boolean);
      if (filter.values.length === 0) {
        removeFilters.add(filter.filterName);
      }
    });
    console.log('remove filters', removeFilters);
    filters = filters.filter((filter: any) => {
      return !removeFilters.has(filter.filterName);
    });
    console.log('Decorated filters', filters);

    return filters;
  }
}

// console.log('value', value);
// return (value !== null && value !== undefined);
