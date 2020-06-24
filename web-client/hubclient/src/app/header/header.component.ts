import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Collection } from 'src/app/models/common/common-utility.model';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public loginService: AuthenticationService, public hubService: InnovationsHubService) { }

  ngOnInit(): void {
  }

}
