import { OnInit, Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import {
  Filter,
  IDEA_SEARCH_FILTERS,
  COLUMN_NAME_COMMENTS_COUNT,
  COLUMN_NAME_LIKES_COUNT,
  COLUMN_NAME_FAVOURITES_COUNT
} from 'src/app/models/innovation-hub.model';
import { HubCampaignCardComponent } from 'src/app/components/common/innovation-hub-card/hub-campaign-card.component';
import {
  OPERATION,
  FILTER_TYPE,
  Collection,
  SearchType,
  ComparisonOperators
} from 'src/app/models/common/common-utility.model';
import { plainToClass } from 'class-transformer';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { user } from 'src/app/models/sample/sample-campaign';
import { Observable, of } from 'rxjs';

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
  tagsSearchOptionConfig = this.hubService.tagsSearchOptionConfig;
  workflowSearchOptionConfig = this.hubService.workflowSearchOptionConfig;

  fieldToExcludeFromFilters = ['expanded'];

  appendActiveClass = '';

  constructor(
    private modalService: BsModalService,
    public hubService: InnovationsHubService
  ) {}

  ngOnInit(): void {
    this.setInitialData();

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
    this.routeToScreen('');
  }

  routeToScreen(tabRequestType: string){
    if (tabRequestType === 'popular') {
      const commentCountFilter = this.createFiltersForLandingPage(
        COLUMN_NAME_COMMENTS_COUNT,
        ComparisonOperators.OP_GTE,
        ['1']
      );
      const likesCountFilter = this.createFiltersForLandingPage(
        COLUMN_NAME_LIKES_COUNT,
        ComparisonOperators.OP_GTE,
        ['2']
      );
      const favouritesCountFilter = this.createFiltersForLandingPage(
        COLUMN_NAME_FAVOURITES_COUNT,
        ComparisonOperators.OP_GTE,
        ['1']
      );
      this.appendActiveClass = tabRequestType;
      this.searchIdeasForTabs([commentCountFilter, likesCountFilter, favouritesCountFilter]);
    } else if (tabRequestType === 'trending') {
      const commentCountFilter = this.createFiltersForLandingPage(
        COLUMN_NAME_COMMENTS_COUNT,
        ComparisonOperators.OP_GTE,
        ['3']
      );
      const likesCountFilter = this.createFiltersForLandingPage(
        COLUMN_NAME_LIKES_COUNT,
        ComparisonOperators.OP_GTE,
        ['2']
      );
      this.appendActiveClass = tabRequestType;
      this.searchIdeasForTabs([commentCountFilter, likesCountFilter]);
    } else{
      this.appendActiveClass = tabRequestType;
      this.hubService.getAllIdeas().subscribe((resp: any) => {
        if (resp && resp.data) {
          this.ideas = resp.data as [];
        }
        this.ideasLoaded = true;
        console.log('All IDeas', this.ideas);
      });
    }
  }

   createFiltersForLandingPage(filterName, comparisonOp, values){
    const filter = new Filter();
    filter.filterName = filterName;
    filter.comparisonOp = comparisonOp;
    filter.values = values;
    filter.nestedOn = false;
    filter.valueType = 'numeric';
    return filter;
  }

  searchIdeasForTabs(searchFilters: any[]){
    const filters = {filters: searchFilters};

    this.hubService.searchIdeas(filters).subscribe((resp: any) => {
      if (resp && resp.data) {
        this.ideas = resp.data as [];
      }
      this.ideasLoaded = true;
      console.log('Trendig Ideas', this.ideas);
    });
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
    console.log('original idea filters', IDEA_SEARCH_FILTERS);

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
    IDEA_SEARCH_FILTERS.forEach((orgFilter: any) => {
      // Direct object reference was changing original filters filterName. Shallow cloning here.
      const filter = Object.assign({}, orgFilter);
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
        comparisonOp: filter.comparisonOp ? filter.comparisonOp : ComparisonOperators.OP_EQ
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
      console.log('DAte value before enrich', values);
      values = this.hubService.convertNgDateToDate(
        values as [],
        filter.filterName.endsWith('To')
      );
      filter.filterName = filter.filterName.endsWith('To')
        ? filter.filterName.slice(0, -2)
        : (filter.filterName.endsWith('From') ? filter.filterName.slice(0, -4) : filter.filterName);
    }

    console.log('values', values);
    return values;
  }

  // ngDateInput(event: any, toDate: boolean){
  //   console.log('Ng Date', event);
  //   if (toDate){
  //     this.ideaFilterForm.patchValue({postedOnTo: event});
  //   }else{
  //     this.ideaFilterForm.patchValue({postedOnFrom: event});
  //   }

  //   console.log('idea filter after ', this.ideaFilterForm);
  // }

}
