import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExportExcelService } from './export-excel.service';
import {
  CAMPAIGN_VALUES,
  CampaignField,
  Idea,
} from '../models/innovation-hub.model';
import { plainToClass } from 'class-transformer';
import {
  IdValuePair,
  SelectOptionConfig,
  Collection,

  Users,
  Roles,
  DATE_FORMAT,
} from '../models/common/common-utility.model';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class InnovationsHubService {
_allTags: any[];
_allUsers: any[];
_allWorkflows: any[];

  public userOptionConfig: SelectOptionConfig = {
    multipleOptions: true,
    searchable: true,
    clearable: true,
    bindLabel: 'fullName',
    bindValue: 'username',
  };

  public tagsOptionConfig: SelectOptionConfig = {
    multipleOptions: true,
    searchable: true,
    clearable: true,
    bindLabel: 'name',
    bindValue: 'name',
    addTags: true,
    addTagText: 'Add Tags'
  };

  public tagsSearchOptionConfig: SelectOptionConfig = {
    multipleOptions: true,
    searchable: true,
    clearable: true,
    bindLabel: 'name',
    bindValue: 'name',
    addTags: false,
  };

  public workflowOptionConfig: SelectOptionConfig = {
    multipleOptions: false,
    searchable: true,
    clearable: true,
    bindLabel: 'description',
    bindValue: 'currentStage',
  };

  public workflowSearchOptionConfig: SelectOptionConfig = {
    multipleOptions: true,
    searchable: true,
    clearable: true,
    bindLabel: 'description',
    bindValue: 'currentStage',
  };

  public addFieldOptionConfig: SelectOptionConfig = {
    multipleOptions: true,
    searchable: true,
    clearable: true,
    // bindValue: 'id',
    addTags: true,
    addTagText: 'Add Allowed Values'
  };

  public typeOptionConfig: SelectOptionConfig = {
    multipleOptions: false,
    searchable: true,
    clearable: true,
    bindValue: 'id',
    bindLabel: 'value'
  };

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  fieldToExcludeForExcelExport = [Collection.CAMPAIGN, '_id'];

  private url = 'http://localhost:8080/';
  getExportUrl = this.url + 'export-campaign-ideas';

  constructor(private http: HttpClient, private ees: ExportExcelService, private datepipe: DatePipe) {
    this.getCollection(Collection.TAGS).subscribe((resp: any) => {
      if (resp && resp.data) {
        this._allTags = resp.data;
        // console.log('all tags', this.allTags);
      }
    });

    this.getCollection(Collection.WORKFLOW)
      .subscribe((resp: any) => {
        if (resp && resp.data) {
          this._allWorkflows = resp.data;
        }
      });

    this.getCollection(Collection.USERS).subscribe((resp: any) => {
        if (resp && resp.data) {
          this._allUsers = resp.data;
         // console.log('all users', this.allUsers);
        }
      });
  }

  get currentUser() {
    return sessionStorage.getItem(Users.USERNAME);
  }

  get currentUserRoles(){
    return sessionStorage.getItem(Users.ROLES);
  }

  get isCurrentUserAdmin(){
    return sessionStorage.getItem(Users.ROLES) === Roles.ADMIN;
  }

  get allTags(){
    return this._allTags;
  }

  get allUsers(){
    return this._allUsers;
  }

  get allWorkflows(){
    return this._allWorkflows;
  }

  submitIdea(data: any) {
    const submitUrl = this.url + 'submit-idea';
    console.log('submitted data', data);
     // return of(null);
    return this.http.post(submitUrl, { data: JSON.stringify(data) });
  }

  getCampaign(campaginCriteria: any) {
    console.log('searched campaogn', campaginCriteria);

    const getCampaignUrl = this.url + 'get-campaign';

    return this.http.post(getCampaignUrl, campaginCriteria);
  }

  getIdea(ideaCriteria: any) {
    const getIdeaUrl = this.url + 'get-idea';
    // Can later be converted to get mappig
    return this.http.get(getIdeaUrl, ideaCriteria);
  }

  getAllIdeas(campaignName?: string) {
    const getAllIdeaUrl = campaignName
      ? this.getExportUrl + '?campaignName=' + campaignName
      : this.getExportUrl + '?campaignName=' + '';
    return this.http.get(getAllIdeaUrl);
  }

  exportToExcel(cName: any) {
    const dataForExcel = [];
    this.http
      .get(this.getExportUrl + '?campaignName=' + cName)
      .subscribe((res: any) => {
        const resp = res.data;

        let header: any;
        resp.forEach((row: any) => {
          row = this.flatCampaignValuesOnIdea(row);
          if (!header) {
            header = row;
          }
          dataForExcel.push(Object.values(row));
        });

        const reportData = {
          title: 'List of ideas for campaign',
          data: dataForExcel,
          headers: Object.keys(header),
        };
        this.ees.exportExcel(reportData);
      });
  }

  /* REmove it at UI and do same at backend*/
  flatCampaignValuesOnIdea(idea: any) {
    if (idea && idea.campaignValues) {
      const campaignValues = idea.campaignValues;
      idea = Object.assign({}, idea, ...campaignValues);
      delete idea[CAMPAIGN_VALUES];
      // Removing the campaign object and id also.
      this.fieldToExcludeForExcelExport.forEach((field) => delete idea[field]);
      Object.entries(idea).forEach(([field, fieldValue]: [any, any]) => {
        if (fieldValue && fieldValue.id && fieldValue.value) {
          idea[field] = fieldValue.value;
        } else if (Array.isArray(fieldValue)) {
          // For now only iterating one level, later this can be recursive with concating the values.
          console.log('Array field', field, ': value : ', fieldValue);
          const fieldValueOnly = [];
          fieldValue.forEach((attribute) => {
            console.log('Array value', attribute);
            if (attribute && attribute.id && attribute.value) {
              fieldValueOnly.push(attribute.value);
            }
          });
          console.log('Array value only', fieldValueOnly);
          if (fieldValueOnly && fieldValueOnly.length > 0) {
            idea[field] = fieldValueOnly;
          }
        }
      });

      return idea;
    }
  }

  searchIdeas(filters: any) {
    console.log('Searched param', filters);
    // return of(null);
    return this.http.post(this.url + 'search-ideas', { data: filters });
  }

  getCollection(collectionName: any) {
    console.log('Get all for ', collectionName);
    return this.http.post(this.url + 'get-collection', collectionName);
  }

  getFilteredCollection(collectionName: any, filters: any) {
    console.log('Get all for ', collectionName, filters);
    return this.http.post(this.url + 'get-filtered-collection', {data: {collectionName, filters}});
  }

  mapIdeaCampaignValueAsKeyValue(
    providedIdea: Idea,
    campaignFields: CampaignField[]
  ) {
    let providedIdeaCampaignValues = [];
    // console.log('mapCampInput', providedIdea, campaignFields);
    if (providedIdea) {
      const keyValue = [];
      providedIdea.campaignValues.map((ideaCampaignValue) => {
        campaignFields.map((field) => {
          if (ideaCampaignValue[field.name]) {
            keyValue.push({ [field.name]: ideaCampaignValue[field.name] });
          }
        });
      });
      providedIdeaCampaignValues = Object.assign({}, ...keyValue);
      // console.log('LAst11', providedIdeaCampaignValues);
    }
    return providedIdeaCampaignValues;
  }

  // This shall also take collection name
  updateCollectionDocument(data: any, attributeNames: string[], collectionName: string) {
    console.log(' idea to update', data);
    // Subscribing it here .. so that caller need not bother about same

   // return of(null);
    return this.http.post(this.url + 'update-document-attribute', {
      data: { data, attributeNames, collectionName },
    });
  }

  addDocuments(collectionName: string, documents: any) {
    const addDocumentUrl = this.url + 'add-document';
    console.log('Added collection', collectionName);
    console.log('Added documents : ', documents);
    // return of(null);
    return this.http.post(addDocumentUrl, {
      data: { collection: collectionName, documents },
    });
  }

  addUpdateFilters(filters: any) {
    const addUpdateFiltersUrl = this.url + 'add-update-filters';
    return this.http.post(addUpdateFiltersUrl, {
      data: filters,
    });
  }

  resolveWorkflow(currentStage: any) {
    if (currentStage && this._allWorkflows && this._allWorkflows.length > 0) {
      return this._allWorkflows.filter(
        (workflow) => workflow.currentStage === currentStage
      )[0];
    }
  }

  createFilter() {
    const filters = [
      {
        filterName: 'name',
        valueType: 'string',
        values: ['Idea'],
      },
      {
        filterName: 'Technology',
        valueType: 'string',
        values: ['Java', 'Python', 'Angular'],
      },
      {
        filterName: 'Department',
        valueType: 'string',
        values: ['IT'],
      },
      {
        filterName: 'Business Case',
        valueType: 'string',
        values: ['Platform for innovations'],
      },
      {
        filterName: 'Theme',
        valueType: 'string',
        values: ['Dark'],
      },
    ];
    return filters;
  }


  convertNgDateToDate(date: any) {
    if (date && (!Array.isArray(date) || date.length > 0 && date[0])) {
      const ngDate = Array.isArray(date) ? date[0] : date;
      console.log('date : ', date, 'nDate : ', ngDate);
      // ngDate.day = toDate ? ngDate.day + 1 : ngDate.day;
      console.log('nDate : ', ngDate);
      // Issue with ng Month, it was providing +1
      const convertedDate =  [new Date(ngDate.year, ngDate.month - 1, ngDate.day)];
      return this.datepipe.transform(convertedDate, DATE_FORMAT);

    }
    return null; // returning null because of filter array conversion issue at idea search param.
    // return date;
  }


  createFilterIdValue() {
    const filters = [
      {
        filterName: 'Technology',
        valueType: 'string',
        values: [
          {
            id: 'Java',
            value: 'Java',
          },
          {
            id: 'Python',
            value: 'Python',
          },
          {
            id: 'Angular',
            value: 'Angular',
          },
          {
            id: 'Mongo-DB',
            value: 'Mongo-DB',
          },
          {
            id: 'AWS',
            value: 'AWS',
          },
          {
            id: 'Docker',
            value: 'Docker',
          },
          {
            id: 'Spring',
            value: 'Spring',
          },
        ],
      },
      {
        filterName: 'Department',
        valueType: 'string',
        values: [
          {
            id: 'Finance',
            value: 'Finance',
          },
          {
            id: 'HR',
            value: 'HR',
          },
          {
            id: 'Admin',
            value: 'Admin',
          },
          {
            id: 'IT',
            value: 'IT',
          },
        ],
      },
      {
        filterName: 'Workouts',
        valueType: 'string',
        values: [
          {
            id: 'Home Workouts',
            value: 'Home Workouts',
          },
          {
            id: 'Outdoor Activity',
            value: 'Outdoor Activity',
          },
          {
            id: 'Gym Workouts',
            value: 'Gym Workouts',
          },
          {
            id: 'Aerobics',
            value: 'Aerobics',
          },
          {
            id: 'Yoga',
            value: 'Yoga',
          },
        ],
      },
      {
        filterName: 'Theme',
        valueType: 'string',
        values: [
          {
            id: 'Dark',
            value: 'Dark',
          },
          {
            id: 'Light',
            value: 'Light',
          },
          {
            id: 'Bright',
            value: 'Bright',
          },
        ],
      },
    ];

    return filters;
  }
}
