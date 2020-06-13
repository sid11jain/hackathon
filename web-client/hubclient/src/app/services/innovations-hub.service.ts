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
    this.http.post(submitUrl, { data: JSON.stringify(data) }).subscribe(x => console.log(x));

  }

  getIdea(ideaName: any){
    const getIdeaUrl = this.url + 'get-idea';
// Can later be converted to get mappig
    this.http.post(getIdeaUrl, { data : JSON.stringify({name: ideaName})}).subscribe(x => console.log(x));

  }
}
