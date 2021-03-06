import { OnInit, Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import {
  Filter,
  IDEA_SEARCH_FILTERS,
  COLUMN_NAME_COMMENTS_COUNT,
  COLUMN_NAME_LIKES_COUNT,
  COLUMN_NAME_FAVOURITES_COUNT,
  COLUMN_NAME_FAVOURITES,
  CAMPAIGN_END_DATE_COLUMN,
} from 'src/app/models/innovation-hub.model';
import { HubCampaignCardComponent } from 'src/app/components/common/innovation-hub-card/hub-campaign-card.component';
import {
  OPERATION,
  FILTER_TYPE,
  Collection,
  SearchType,
  ComparisonOperators,
  DATE_FORMAT,
} from 'src/app/models/common/common-utility.model';
import { plainToClass } from 'class-transformer';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { user } from 'src/app/models/sample/sample-campaign';
import { Observable, of } from 'rxjs';
import { element } from 'protractor';
import { CreateCampaignComponent } from 'src/app/components/create-campaign/create-campaign.component';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'landing-view',
  templateUrl: './landing-view.component.html',
  styleUrls: ['./landing-view.component.scss'],
})
export class LandingViewComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    public hubService: InnovationsHubService,
    public datePipe: DatePipe
  ) {}
  bsModalRef: BsModalRef;
  operation: any = OPERATION;
  ideas: any[] = [];
  allFilters: Filter[];
  ideasLoaded = false;
  deckView = false;
  disableFilters = false;
  createCampaign = false; // this needs to be false by default, keeping it true for testing
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

  selectedSearchFilters: any[] = [];

  appendActiveClass = '';

  excludeInactive = false;

  ngOnInit(): void {
    this.setInitialData();

    this.ideaFilterForm = new FormGroup({});

    IDEA_SEARCH_FILTERS.forEach((filter: any) => {
      this.ideaFilterForm.addControl(filter.filterName, new FormControl());
    });
    this.routeToScreen('');
  }

  routeToScreen(tabRequestType: string) {
    this.appendActiveClass = tabRequestType;
    this.searchIdeas();
  }

  isPopularTab() {
    return this.appendActiveClass === 'popular';
  }

  isTrendingTab() {
    return this.appendActiveClass === 'trending';
  }

  isMyFavouritesTab() {
    return this.appendActiveClass === 'myFavourites';
  }

  getPopularStaticFilters() {
    const commentCountFilter = this.createFiltersForLandingPage(
      COLUMN_NAME_COMMENTS_COUNT,
      ComparisonOperators.OP_GTE,
      ['1'],
      'numeric'
    );
    const likesCountFilter = this.createFiltersForLandingPage(
      COLUMN_NAME_LIKES_COUNT,
      ComparisonOperators.OP_GTE,
      ['2'],
      'numeric'
    );
    const favouritesCountFilter = this.createFiltersForLandingPage(
      COLUMN_NAME_FAVOURITES_COUNT,
      ComparisonOperators.OP_GTE,
      ['1'],
      'numeric'
    );

    return [commentCountFilter, likesCountFilter, favouritesCountFilter];
  }

  getTrendingStaticFilters() {
    const commentCountFilter = this.createFiltersForLandingPage(
      COLUMN_NAME_COMMENTS_COUNT,
      ComparisonOperators.OP_GTE,
      ['3'],
      'numeric'
    );
    const likesCountFilter = this.createFiltersForLandingPage(
      COLUMN_NAME_LIKES_COUNT,
      ComparisonOperators.OP_GTE,
      ['2'],
      'numeric'
    );
    return [commentCountFilter, likesCountFilter];
  }

  getMyFavouritesStaticFilters() {
    const favourtiesFilter = this.createFiltersForLandingPage(
      COLUMN_NAME_FAVOURITES,
      ComparisonOperators.OP_IN,
      [this.hubService.currentUser],
      'string'
    );
    return [favourtiesFilter];
  }

  createFiltersForLandingPage(filterName, comparisonOp, values, valueType) {
    const filter = new Filter();
    filter.filterName = filterName;
    filter.comparisonOp = comparisonOp;
    filter.values = values;
    filter.nestedOn = false;
    filter.valueType = valueType;
    return filter;
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

  setCreateCampaignMode() {
    this.createCampaign = !this.createCampaign;
  }
  searchIdeas() {
    this.createCampaign = false; // Setting it false when any tab is clicked.
    let tabStaticFilters: Filter[];
    if (this.isPopularTab()) {
      tabStaticFilters = this.getPopularStaticFilters();
    } else if (this.isTrendingTab()) {
      tabStaticFilters = this.getTrendingStaticFilters();
    } else if (this.isMyFavouritesTab()) {
      tabStaticFilters = this.getMyFavouritesStaticFilters();
    }
    if (this.excludeInactive) {
      tabStaticFilters = tabStaticFilters ? tabStaticFilters : [];
      tabStaticFilters.push(
        this.createFiltersForLandingPage(
          CAMPAIGN_END_DATE_COLUMN,
          ComparisonOperators.OP_GTE,
          [this.datePipe.transform(new Date(), DATE_FORMAT)],
          'date'
        )
      );
    }

    const ideaFilters = this.convertIdeaFormValueToFilters();
    let allFilters = [];
    if (ideaFilters){
      allFilters.push(...ideaFilters);
    }
    if (this.selectedSearchFilters){
      allFilters.push(...this.selectedSearchFilters);
    }
    if (tabStaticFilters){
      allFilters.push(...tabStaticFilters);
    }

    allFilters = this.removeNullFilters(allFilters);
    this.hubService
      .searchIdeas({ filters: allFilters})
      .subscribe((resp: any) => {
        if (resp && resp.data) {
          this.ideas = resp.data as [];
        }
        this.ideasLoaded = true;
      });
  }

  removeNullFilters(filters: any[]){
    if (filters && filters.length > 0){
      const notNullFilters = [];
      filters.forEach((filter: any) => {
        filter = plainToClass(Filter, filter);
        this.fieldToExcludeFromFilters.forEach(field => delete filter[field]);

        if (
          filter.values &&
          Array.isArray(filter.values) &&
          filter.values.length > 0
        ) {
          filter.values = filter.values.filter(Boolean);
        }
        if (filter.values && filter.values.length > 0 && filter.values[0]) {
          notNullFilters.push(filter);
        }
      });
      filters = notNullFilters;
    }
    return filters;
  }

  getUsers(current) {
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
  }

  setInitialData() {
    this.hubService.getCollection(Collection.USERS).subscribe((resp: any) => {
      const usersList = [];
      if (resp && resp.data) {
        this.allUsers = resp.data;
        this.hubService.allUsers = resp.data;
      }
      this.allUsers$ = of(usersList);
    });
    this.hubService.getCollection(Collection.TAGS).subscribe((resp: any) => {
      if (resp && resp.data) {
        this.allTags = resp.data;
        this.hubService.allTags = resp.data;
      }
    });
    this.hubService
      .getCollection(Collection.WORKFLOW)
      .subscribe((resp: any) => {
        if (resp && resp.data) {
          this.allWorkflows = resp.data;
          this.hubService.allWorkflows = resp.data;
        }
      });
    this.hubService
      .getCollection(Collection.FILTERS)
      .subscribe((resp: any) => {
        if (resp && resp.data) {
          const filters: any[] = resp.data;
          this.allFilters = plainToClass(
            Filter, filters);
          this.initializeFilterForm();
        }
      });
  }

  convertIdeaFormValueToFilters() {
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
        nestedOn: filter.nestedOn ? filter.nestedOn : false,
        nestedField: filter.nestedField ? filter.nestedField : '',
        searchType: filter.searchType ? filter.searchType : SearchType.EQUALS,
        comparisonOp: filter.comparisonOp ? filter.comparisonOp : ComparisonOperators.OP_EQ
      });
    });

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
      if (filter.filterName.endsWith('To') && values && values.length > 0 && values[0]){
        const ngDate: any = values[0];
        values[0] = new NgbDate(ngDate.year, ngDate.month, ngDate.day + 1);
      }
      // Converting it to array as array is expected for filter values
      values = [this.hubService.convertNgDateToDate(
        values as []
      )];
      filter.filterName = filter.filterName.endsWith('To')
        ? filter.filterName.slice(0, -2)
        : (filter.filterName.endsWith('From') ? filter.filterName.slice(0, -4) : filter.filterName);
    }

    return values;
  }

  selectedFilters(event: any){
this.selectedSearchFilters = event;
  }

excludeInactiveCampaigns(excludeInactive: boolean){
  this.excludeInactive = !excludeInactive;
}

initializeFilterForm(){
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

}

}
