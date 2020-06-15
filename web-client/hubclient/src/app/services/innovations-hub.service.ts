import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ExportExcelService } from './export-excel.service';

@Injectable({
  providedIn: 'root'
})
export class InnovationsHubService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient, private ees: ExportExcelService) {

  }

  submitIdea(data: any) {
    const submitUrl = this.url + 'submit-idea';
    console.log('submitted data', data);
    this.http.post(submitUrl, { data: JSON.stringify(data) }).subscribe(x => console.log(x));

  }

  getCampaign(campaginCriteria: any){
    console.log('searched campaogn', campaginCriteria);

    const getCampaignUrl = this.url + 'get-campaign';

    return this.http.post(getCampaignUrl, campaginCriteria);
  }

  getIdea(ideaCriteria: any){
    const getIdeaUrl = this.url + 'get-idea';
  // Can later be converted to get mappig
    return this.http.post(getIdeaUrl,  ideaCriteria);

  }

  exportToExcel(name: any) {
    const dataForExcel = [];

    const ideaData = [
      {
        _id: '5ee7391dc63d44077e4badf6',
        name: 'AjayIdea',
        description: 'desc',
        PostedOn: '14-06-20',
        campaignName: 'AjayCampaign',
        submittedBy: 'Ajay',
        contributors: 'AJ',
        Technology: 'java, python',
        RAGStatus: 'Green, Red'
      }
    ];
    const ideaModel = {
      name: 'AjayIdea',
      campaignName: 'AjayCampaign',
      description: 'desc'
    };
    // Code for rest service - start
    // const getExportUrl = this.url + 'export-campaign-ideas';
    // const cName = 'AjayCampaign';

    // this.http.get(getExportUrl + '?campaignName=' + cName).subscribe((resp: any) => {

    //  resp.data.forEach((row: any) => {
    //     dataForExcel.push(Object.values(row));
    //  });

    //   const reportData = {
    //     title: 'List of ideas for campaign',
    //     data: dataForExcel,
    //     headers: Object.keys(resp.data[0])
    //   };
    // console.log(resp.data);
    //   this.ees.exportExcel(reportData);
    // });
    // Code for rest service - end

    // Code for static data - start
    ideaData.forEach((row: any) => {
      dataForExcel.push(Object.values(row));
    });
    const reportData = {
      title: 'List of ideas for campaign',
      data: dataForExcel,
      headers: Object.keys(ideaData[0])
    };

    this.ees.exportExcel(reportData);
    // Code for static data - end
  }
  getCollection(collectionName: string){
      return this.http.post(this.url+ 'get-collection', collectionName);
  }
}
