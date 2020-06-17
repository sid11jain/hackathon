import { Injectable } from '@angular/core';
// import { InnovationsHubService } from './innovations-hub.service';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs/operators';


// export class User {
//   constructor(private status: string) { }
// }

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // constructor(private httpClient: HttpClient) { }

  constructor() { }

  authenticate(username, password) {
    // const headers = new HttpHeaders({ Authorization: 'Basic' + btoa(username + ':' + password) });
    // return this.httpClient.get<User>('http://localhost:8080/validateLogin', { headers }).pipe(
    //   map(
    //     userData => {
    //       sessionStorage.setItem('username', username);
    //       return userData;
    //     }
    //   )
    // );

    if (username === 'admin' && password === 'admin') {
        sessionStorage.setItem('username', username);
        return true;
    } else {
        return false;
    }
  }

  isUserLoggedIn() {
    const username = sessionStorage.getItem('username');
    return !(username === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
  }
}
