import { Component, OnInit } from '@angular/core';
import {InnovationsHubService} from "../../services/innovations-hub.service";
import { FormGroup, FormControl } from '@angular/forms';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-innovation-hub',
  templateUrl: 'innovation-hub.component.html',
  styleUrls: ['innovation-hub.component.scss']
})
export class InnovationHubComponent implements OnInit {

  parentForm: FormGroup ;
  options: Observable<any[]>;
  constructor(private service: InnovationsHubService) { }

  ngOnInit(): void {
    this.parentForm  = new FormGroup({
      freeText: new FormControl(),
      singleSelect: new FormControl(),
      radioButton: new FormControl()
    });
    this.options = of(['options1', 'options2']);

  }

  onRadioChange(flag: boolean){

  }

  submit(){
    console.log("test fired");
    this.service.submitIdea(this.parentForm.value.freeText);
  }

}
