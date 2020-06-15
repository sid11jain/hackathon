import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CampaignField, Idea } from 'src/app/models/innovation-hub.model';
import {
  SelectOptionConfig,
  IdValuePair,
} from 'src/app/models/common/common-utility.model';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ControlContainer,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'innovation-hub-select-option',
  templateUrl: './innovation-hub-select-option.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InnovationHubSelectOptionComponent),
      multi: true,
    },
    // , {
    //   provide: NG_VALIDATORS,
    //   useExisting: forwardRef(() => InnovationHubSelectOptionComponent),
    //   multi: true,
    // }
  ],
})
export class InnovationHubSelectOptionComponent
  implements ControlValueAccessor {
  constructor(private controlContainer: ControlContainer) {}

  @ViewChild('selectOptionContainer', { static: true })
  selectOptionContainer: ElementRef;

  public callingForm: FormControl;
  public callingFormGroup: FormGroup;

  @Input()
  optionList: IdValuePair[];

  @Input()
  defaultValueLabel = 'Please Select';

  @Input()
  fieldFormControlName: string;

  @Input()
  selectedOptions: any = [];

  @Input()
  multipleOptions: false;

  @Input()
  config: SelectOptionConfig;

  @Input()
  disabled = false;

  defaultBindLabel = 'value';
  events: any[] = [];
  
  singleOptionConfig: SelectOptionConfig = {
    multipleOptions: false,
    searchable: false,
    clearable: false
  };
  multiOptionConfig: SelectOptionConfig = {
    multipleOptions: true,
    searchable: true,
    clearable: true,
  };

  ngOnInit() {
    console.log('selector field', this.fieldFormControlName);
    console.log('field list', this.optionList);
    console.log('selected options', this.selectedOptions);
    this.callingFormGroup = this.controlContainer.control as FormGroup;
    this.callingForm = this.callingFormGroup.get(
      this.fieldFormControlName
    ) as FormControl;
    if (this.multipleOptions && this.selectedOptions && this.selectedOptions.length > 0){
      this.callingForm.patchValue(this.selectedOptions);
      }else if (this.selectedOptions) {
        this.callingForm.patchValue(this.selectedOptions);
      }

    if (!this.config){
    if (this.multipleOptions) {
      this.config = this.multiOptionConfig;
    } else {
      this.config = this.singleOptionConfig;
    }
  }
  }

  writeValue(value: any[] | any): void {
 }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  getValues() {}
  public selectAll() {
    // this.selectedValues = this.campaignField.allowedValues.map(allowedValue => allowedValue.value);
    this.selectedOptions = this.optionList;
    this.callingForm.patchValue(this.selectedOptions);
  }

  public clearAll() {
    this.selectedOptions = [];
    this.callingForm.patchValue(this.selectedOptions);
  }

//   onSubmit() {
//     // console.log('event', event);
//     const selectedValues = [];
//     this.callingForm
//       // .get(this.fieldFormControlName)
//       .value.map((selectedId) =>
//         selectedValues.push(
//           this.optionList.filter((option) => option.id === selectedId)
//         )
//       );
//     console.log('beore pathing', this.callingForm);
//     this.callingForm.patchValue(selectedValues);
//     console.log('after pathing', this.callingForm);
//   }

//   compareIds(id1: IdValuePair, id2: IdValuePair){
// return id1 && id2 && id1.id === id2.id;
//   }
}
