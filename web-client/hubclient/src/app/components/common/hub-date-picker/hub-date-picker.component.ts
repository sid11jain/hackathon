import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DATE_FORMAT } from 'src/app/models/common/common-utility.model';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';

@Component({
  selector: 'hub-date-picker',
  templateUrl: './hub-date-picker.component.html',
  styleUrls: ['./hub-date-picker.component.scss'],
})
export class HubDatePickerComponent implements OnInit {
  @Input()
  formControlName: FormControl;

  @Input()
  placeHolder = DATE_FORMAT;

  selectedDate: any;

  constructor(private hubService: InnovationsHubService) {}

  ngOnInit(): void {
  }

  ngDateInput(event: any) {
    this.formControlName.setValue(this.hubService.convertNgDateToDate(event));
    this.selectedDate = this.formControlName.value;
  }
}
