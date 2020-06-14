import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InnovationsHubService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {

  }

  submitIdea(data: any){
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

  getCollection(collectionName: string){
      return this.http.post(this.url+ 'get-collection', collectionName);
  }
}
