import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InnovationsHubService {

  private url = 'http://localhost:8080/test';

  constructor(private http: HttpClient) {

  }

  test(){
    this.http.get(this.url).subscribe(x => console.log(x));

  }
}
