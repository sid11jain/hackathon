import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  invalidLogin = false;

  constructor(private router: Router, private loginService: AuthenticationService, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  login() {
    (this.loginService.authenticate(this.username, this.password)).subscribe(
      data => {
        if (data.token) {
          sessionStorage.setItem('token', data.token);
        }
        this.router.navigate(['']);
        this.invalidLogin = false;
      },
      error => {
        this.invalidLogin = true;
      }
    );
  }

}
