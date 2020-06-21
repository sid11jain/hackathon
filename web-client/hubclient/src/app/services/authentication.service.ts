import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { exception } from 'console';
import { throwError } from 'rxjs';
import { error } from 'protractor';
import { Users } from '../models/common/common-utility.model';

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
            sessionStorage.setItem(Users.USERNAME, username);
            sessionStorage.setItem(Users.TOKEN, userData.token);
            sessionStorage.setItem(Users.ROLES, userData.roles);
            // Roles can be accessed by iterating roles array
            const role = userData.roles[0];
            return userData;
          }
        })
      );
  }

  isUserLoggedIn() {
    const username = sessionStorage.getItem(Users.USERNAME);
    const token = sessionStorage.getItem(Users.TOKEN);
    return !(username === null || token === null);
  }

  logOut() {
    sessionStorage.removeItem(Users.USERNAME);
    sessionStorage.removeItem(Users.TOKEN);
    sessionStorage.removeItem(Users.ROLES);
  }
}
