import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Filter } from 'src/app/models/innovation-hub.model';
import { plainToClass } from 'class-transformer';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hub-filter-panel',
  templateUrl: './hub-filter-panel.component.html',
  styleUrls: ['./hub-filter-panel.component.scss'],
})
export class HubFilterPanelComponent implements OnInit {
  constructor() {}
  @Input()
  filtersForm: FormGroup;

  @Input()
  allFilters: Filter[];

  @Input()
  disableFilters = false;

  @Input()
  fieldToExcludeFromFilters = [];

  @Output()
  selectedFilters = new EventEmitter();



  ngOnInit(): void {}

  setStep(any) {}

  // A very messy and bad logic. Has to move such things to template and better cattering
  onFilterCheck(
    filter?: any,
    filterPosition?: any,
    valuePosition?: any,
    value?: any
  ) {
    const filterFormValue = this.filtersForm.value as any;
    filter as Filter;
    const filterValueSelected =
      filterFormValue.filters[filterPosition].values[valuePosition];
    if (filterValueSelected) {
      filterFormValue.filters[filterPosition].values[valuePosition] =
        filter.values[valuePosition].value;
    } else {
      filterFormValue.filters[filterPosition].values[valuePosition] = null;
    }
    this.filtersForm.patchValue(filterFormValue);
    this.decorateFilterValuesAndEmit();
  }

  decorateFilterValuesAndEmit() {
    // cloning issue, thus went for filter thing.
    const filters = this.filtersForm.value.filters.filter(x => x);
    const enrichedFilters = [];
    // Merging ideaFilters with Campaign filters
    // const ideaFilters = this.convertIdeaFormValueToFilters();
    // ideaFilters.forEach(ideaFilter => filters.push(ideaFilter));
    const removeFilters = new Set();
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
        enrichedFilters.push(filter);
      }
    });

    this.selectedFilters.emit(enrichedFilters);
  }

}
