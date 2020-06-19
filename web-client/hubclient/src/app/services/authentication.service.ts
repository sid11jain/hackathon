import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { exception } from 'console';
import { throwError } from 'rxjs';
import { error } from 'protractor';

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
          if (userData.loginSuccessful) {
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('token', userData.token);
            sessionStorage.setItem('roles', userData.roles);
            // Roles can be accessed by iterating roles array
            const role = userData.roles[0];
            return userData;
          }
          // Add error handler here to show message on UI for bad credentials
        })
        // or catch error here, i'm not sure :|
      );
  }

  isUserLoggedIn() {
    const username = sessionStorage.getItem('username');
    const token = sessionStorage.getItem('token');
    return !(username === null || token === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('roles');
  }
}
