import { OnInit, Component } from '@angular/core';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { InnovationHubComponent } from 'src/app/components/innovation-hub.component';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import {
  Idea,
  Filter,
  IDEA_SEARCH_FILTERS
} from 'src/app/models/innovation-hub.model';
import { InnovationHubIdeaComponent } from 'src/app/components/innovation-hub-idea.component';
import { InnovationHubCardComponent } from 'src/app/components/common/innovation-hub-card/innovation-hub-card.component';
import { HubCampaignCardComponent } from 'src/app/components/common/innovation-hub-card/hub-campaign-card.component';
import {
  OPERATION,
  FILTER_TYPE,
  SelectOptionConfig,
  Collection,
  SearchType
} from 'src/app/models/common/common-utility.model';
import { plainToClass } from 'class-transformer';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { user } from 'src/app/models/sample/sample-campaign';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'landing-view',
  templateUrl: './landing-view.component.html',
  styleUrls: ['./landing-view.component.scss']
})
export class LandingViewComponent implements OnInit {
  bsModalRef: BsModalRef;
  operation: any = OPERATION;
  ideas: any[] = [];
  allFilters: Filter[];
  ideasLoaded = false;
  deckView = false;
  disableFilters = false;
  ideaFilterForm: FormGroup;
  filtersForm: FormGroup;
  filterValueType: any = FILTER_TYPE;
  users: any[];
  tags: any[] = [];

  allUsers$: Observable<any>;

  allUsers: any[] = [];
  allTags: any[] = [];
  allWorkflows: any[] = [];

  userOptionConfig = this.hubService.userOptionConfig;
  tagsOptionConfig = this.hubService.tagsOptionConfig;
  workflowSearchOptionConfig = this.hubService.workflowSearchOptionConfig;

  fieldToExcludeFromFilters = ['expanded'];

  constructor(
    private modalService: BsModalService,
    private hubService: InnovationsHubService
  ) {}

  ngOnInit(): void {
    this.setInitialData();
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
          filter =>
            new FormGroup({
              filterName: new FormControl(filter.filterName),
              valueType: new FormControl(this.filterValueType.STRING),
              values: new FormArray(
                filter.values.map(value => new FormControl())
              )
            })
        )
      )
    });

    this.ideaFilterForm = new FormGroup({});

    IDEA_SEARCH_FILTERS.forEach((filter: any) => {
      this.ideaFilterForm.addControl(filter.filterName, new FormControl());
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
    console.log('idea filters', this.ideaFilterForm.value);
    this.hubService
      .searchIdeas({ filters: this.decorateFilterValues() })
      .subscribe((resp: any) => {
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
    this.filtersForm.patchValue(filterFormValue);
    console.log('patched filters', this.filtersForm.value);
  }

  decorateFilterValues() {
    // cloning issue, thus went for filter thing.
    const filters = this.filtersForm.value.filters.filter(x => x);
    const enrichedFilters = [];
    // Merging ideaFilters with Campaign filters
    const ideaFilters = this.convertIdeaFormValueToFilters();
    ideaFilters.forEach(ideaFilter => filters.push(ideaFilter));
    console.log('DEcorat dilter start', filters);
    const removeFilters = new Set();
    filters.forEach((filter: any) => {
      filter = plainToClass(Filter, filter);
      this.fieldToExcludeFromFilters.forEach(field => delete filter[field]);

      console.log('Enriched filter', filter);
      if (
        filter.values &&
        Array.isArray(filter.values) &&
        filter.values.length > 0
      ) {
        filter.values = filter.values.filter(Boolean);
      }
      if (filter.values && filter.values.length > 0 && filter.values[0]) {
        enrichedFilters.push(filter);
      }
    });

    console.log('Decorated filters', enrichedFilters);

    return enrichedFilters;
  }

  getUsers(current) {
    console.log('users', user);
    const userCopy = user.slice(0);
    if (current) {
      userCopy.unshift(current);
    }
    return userCopy;
  }

  onUserSelect(selectedUser) {
    this.users.push(selectedUser);
  }

  addTags(event: any) {
    if (event.target.value && event.target.value.length > 0) {
      this.tags.push(event.target.value);
    }
    this.ideaFilterForm.value.tags = null;
    this.ideaFilterForm.patchValue(this.ideaFilterForm.value);
    console.log('Tags', this.tags);
  }

  setInitialData() {
    this.hubService.getCollection(Collection.USERS).subscribe((resp: any) => {
      const usersList = [];
      if (resp && resp.data) {
        this.allUsers = resp.data;
      }
      console.log('All users', usersList);
      this.allUsers$ = of(usersList);
      console.log('observable users', this.allUsers$);
    });
    this.hubService.getCollection(Collection.TAGS).subscribe((resp: any) => {
      if (resp && resp.data) {
        this.allTags = resp.data;
        console.log('all tags', this.allTags);
      }
    });
    this.hubService
      .getCollection(Collection.WORKFLOW)
      .subscribe((resp: any) => {
        if (resp && resp.data) {
          this.allWorkflows = resp.data;
          console.log('all tags', this.allWorkflows);
        }
      });
  }

  convertIdeaFormValueToFilters() {
    console.log('idea form values ', this.ideaFilterForm.value);
    const ideaFilters: any[] = [];
    IDEA_SEARCH_FILTERS.forEach((filter: any) => {
      ideaFilters.push({
        values: this.setValue(filter),
        filterName: filter.filterName,
        valueType: filter.valueType
          ? filter.valueType
          : this.filterValueType.STRING,

        // values: Array.isArray(this.ideaFilterForm.value[filter.filterName])
        //   ? this.ideaFilterForm.value[filter.filterName]
        //   : [this.ideaFilterForm.value[filter.filterName]],
        nestedOn: false,
        searchType: filter.searchType ? filter.searchType : SearchType.EQUALS,
        comparisonOp: filter.comparisonOp ? filter.comparisonOp : undefined
      });
    });
    console.log('converted idea', ideaFilters);

    return ideaFilters;
  }

  setValue(filter: any) {
    // const filter = param;
    let values;
    if (!Array.isArray(this.ideaFilterForm.value[filter.filterName])) {
      values = [this.ideaFilterForm.value[filter.filterName]];
    } else {
      values = this.ideaFilterForm.value[filter.filterName];
    }
    if (filter.valueType && filter.valueType === this.filterValueType.DATE) {
      values = this.convertNgDateToDate(
        values as [],
        filter.filterName.endsWith('To')
      );
      filter.filterName = filter.filterName.endsWith('To')
        ? filter.filterName.slice(0, -2)
        : filter.filterName.slice(0, -4);
    }

    console.log('values', values);
    return values;
  }

  convertNgDateToDate(date: any[], toDate: boolean) {
    if (date && date.length > 0 && date[0]) {
      const ngDate = date[0];
      console.log('date : ', date, 'nDate : ', ngDate);
      ngDate.day = toDate ? ngDate.day + 1 : ngDate.day;
      // Issue with ng Month, it was providing +1 .
      return [new Date(ngDate.year, ngDate.month - 1, ngDate.day)];
    }
    return date;
  }
}
