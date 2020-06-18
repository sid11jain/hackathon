import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(username, password) {
    return this.httpClient
      .post<any>('http://localhost:8080/authenticate', { username, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('token', userData.token);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    const username = sessionStorage.getItem('username');
    return !(username === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
  }
}
