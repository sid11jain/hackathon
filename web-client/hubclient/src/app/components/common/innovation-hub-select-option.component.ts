import { Component, OnInit, Input, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { CampaignField, Idea } from 'src/app/models/innovation-hub.model';
import { SelectOptionConfig } from 'src/app/models/common/common-utility.model';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlContainer, FormControl, FormGroup } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'innovation-hub-select-option',
  templateUrl: './innovation-hub-select-option.component.html',
  providers: [  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InnovationHubSelectOptionComponent),
    multi: true,
  }
  // , {
  //   provide: NG_VALIDATORS,
  //   useExisting: forwardRef(() => InnovationHubSelectOptionComponent),
  //   multi: true,
  // }
]
})
export class InnovationHubSelectOptionComponent implements ControlValueAccessor  {
  constructor(private controlContainer: ControlContainer) { }

  @ViewChild('selectOptionContainer', { static: true })
  selectOptionContainer: ElementRef;

  public callingForm: FormControl;
  public callingFormGroup: FormGroup;

  @Input()
  campaignField: CampaignField;

  @Input()
  defaultValueLabel = 'Please Select';

  @Input()
  selectedValues: any = [];

  @Input()
  multipleOptions: false;

  config: SelectOptionConfig;
  singleOptionConfig: SelectOptionConfig = {multipleOptions : false, searchable : false, clearable : false};
  multiOptionConfig: SelectOptionConfig = {multipleOptions : true, searchable : true, clearable : true};

 @Input()
 disabled = false;
// @Input()
// optionList: any[];

// @Input()
// selectedOptionList: any[];

// @Input()
// config: any;

// @Input()
// defaultValueLabel: any = 'Please Select';

// @Input()
// multipleOptions = false;

// @Input()
// searchable = false;

// @Input()
// clearable = false;

// @Input()
// maxSelectedOptions = 20;





events: any[] = [];

 ngOnInit() {
  console.log('selector field', this.campaignField);
  console.log('config field', this.config);
  this.callingFormGroup = (this.controlContainer.control as FormGroup);
  this.callingForm = this.callingFormGroup.get(this.campaignField.name) as FormControl;
  if (this.selectedValues){
    this.callingForm.patchValue(this.selectedValues);
  }
  if (this.multipleOptions){
    this.config = this.multiOptionConfig;
  }else{
    this.config = this.singleOptionConfig;

  }
  }


  writeValue(value: any[]|any): void {
    this.selectedValues = value;
  }
  onModelChange: any = (_: any) => {};
  onModelTouched: any = () => {};
  registerOnChange(fn: any): void {
    // this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    // this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }



getValues() {}
public selectAll() {
  // this.selectedValues = this.campaignField.allowedValues.map(allowedValue => allowedValue.value);
  this.selectedValues = this.campaignField.allowedValues;
  this.callingForm.patchValue(this.selectedValues);
}

public clearAll() {
  this.selectedValues = [];
  this.callingForm.patchValue(this.selectedValues);
}

// onClose(){
//   this.selectedValues = this.campaignField.allowedValues;
// }

}
