import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExportExcelService } from './export-excel.service';
import { CAMPAIGN_VALUES, Collection, CampaignField, Idea } from '../models/innovation-hub.model';
import { plainToClass } from 'class-transformer';
import { IdValuePair } from '../models/common/common-utility.model';

@Injectable({
  providedIn: 'root',
})
export class InnovationsHubService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  fieldToExcludeForExcelExport = [Collection.CAMPAIGN, '_id'];

  private url = 'http://localhost:8080/';
  getExportUrl = this.url + 'export-campaign-ideas';


  constructor(private http: HttpClient, private ees: ExportExcelService) {}

  submitIdea(data: any) {
    const submitUrl = this.url + 'submit-idea';
    console.log('submitted data', data);
    this.http
      .post(submitUrl, { data: JSON.stringify(data) })
      .subscribe((x) => console.log(x));
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

  getAllIdeas(campaignName?: string){
    const getAllIdeaUrl = campaignName ? this.getExportUrl + '?campaignName=' + campaignName : this.getExportUrl + '?campaignName=' + '';
    return this.http
    .get(getAllIdeaUrl);
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

searchIdeas(filters: any){
  return this.http.post(this.url + 'search-ideas', {data: filters});

}

  getCollection(collectionName: string) {
    this.http.post(this.url + 'search-ideas', {data: {filters: this.createFilter()}} ).subscribe(x => console.log(x));

    return this.http.post(this.url + 'get-collection', collectionName);
  }

  mapIdeaCampaignValueAsKeyValue(providedIdea: Idea, campaignFields: CampaignField[]) {
    let providedIdeaCampaignValues = [];
    console.log('mapCampInput', providedIdea, campaignFields);
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
      console.log('LAst11', providedIdeaCampaignValues);
    }
    return providedIdeaCampaignValues;
  }

  updateCollectionDocument(data: any, attributeName: string) {
    return this.http.post(this.url + 'update-document-attribute', {data: {data: data, attributeName: attributeName}});
  }

createFilter(){
  const filters = [
    {
      filterName: 'name',
      valueType: 'string',
      values: ['Idea']
    },
    {
      filterName: 'Technology',
      valueType: 'string',
      values: ['Java', 'Python', 'Angular']
    },
    {
      filterName: 'Department',
      valueType: 'string',
      values: ['IT']
    } ,
    {
      filterName: 'Business Case',
      valueType: 'string',
      values: ['Platform for innovations']
    },
    {
      filterName: 'Theme',
      valueType: 'string',
      values: ['Dark']
    }
  ];
  return filters;
}

createFilterIdValue(){
  const filters = [
       {
      filterName: 'Technology',
      valueType: 'string',
      values: [
        {
          id: 'Java',
          value: 'Java'
        },
        {
          id: 'Python',
          value: 'Python'
        },
        {
          id: 'Angular',
          value: 'Angular'
        },
        {
          id: 'Mongo-DB',
          value: 'Mongo-DB'
        },
        {
          id: 'AWS',
          value: 'AWS'
        },
        {
          id: 'Docker',
          value: 'Docker'
        },
        {
          id: 'Spring',
          value: 'Spring'
        }
      ]
    },
    {
      filterName: 'Department',
      valueType: 'string',
      values: [
        {
          id: 'Finance',
          value: 'Finance'
        },
        {
          id: 'HR',
          value: 'HR'
        },
        {
          id: 'Admin',
          value: 'Admin'
        },
        {
          id: 'IT',
          value: 'IT'
        }
      ]
    } ,
    {
      filterName: 'Workouts',
      valueType: 'string',
      values: [
        {
          id: 'Home Workouts',
          value: 'Home Workouts'
        },
        {
          id: 'Outdoor Activity',
          value: 'Outdoor Activity'
        },
        {
          id: 'Gym Workouts',
          value: 'Gym Workouts'
        },
        {
          id: 'Aerobics',
          value: 'Aerobics'
        },
        {
          id: 'Yoga',
          value: 'Yoga'
        }
      ]
    },
    {
      filterName: 'Theme',
      valueType: 'string',
      values: [
        {
          id: 'Dark',
          value: 'Dark'
        },
        {
          id: 'Light',
          value: 'Light'
        },
        {
          id: 'Bright',
          value: 'Bright'
        }
      ]
    }
  ];
  return filters;
}


}
