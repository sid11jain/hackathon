import { Component, OnInit } from '@angular/core';
import {InnovationsHubService} from "../../services/innovations-hub.service";

@Component({
  selector: 'app-innovation-hub',
  templateUrl: './innovation-hub.component.html',
  styleUrls: ['./innovation-hub.component.scss']
})
export class InnovationHubComponent implements OnInit {

  constructor(private service: InnovationsHubService) { }

  ngOnInit(): void {
  }

  test(){
    console.log("test fired");
    this.service.test();
  }

}
