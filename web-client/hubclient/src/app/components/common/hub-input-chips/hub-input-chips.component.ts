import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, FormGroup } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hub-input-chips',
  templateUrl: './hub-input-chips.component.html',
  styleUrls: ['./hub-input-chips.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HubInputChipsComponent),
      multi: true,
    },
  ],
})
export class HubInputChipsComponent implements OnInit {
  constructor() {}

  @Input()
  selectedChips: any[] = [];

  @Input()
  fieldFormControlName: string;

  @Input()
  inputChips: any[] = [];

  @Input()
  additionAllowed = false;

  public callingForm: FormControl;
  public callingFormGroup: FormGroup;

  localFormGroup: FormGroup;

  providedInputChips: any[] = [];

  // userSelectsString = '';
  // name = 'Angular';
  // userSelects = [];
   suggestions: any [];

  show = false;

  ngOnInit(): void {
// to remove
this.suggestions = this.inputChips;

this.providedInputChips = this.inputChips;
this.localFormGroup = new FormGroup({
      textInput: new FormControl(),
    });
  }

  suggest() {
    this.show = true;
  }

  isSelected(suggested: any) {
    return this.selectedChips.findIndex((chip) => {
      if (chip && chip.id) {
        return chip.id === suggested.id;
      } else {
        return chip !== suggested;
      }
    }) > -1
      ? true
      : false;
  }

  selectSuggestion(suggested) {
    this.selectedChips.find((chip) => {
      if (chip && chip.id) {
        return chip.id === suggested.id;
      } else {
        return chip !== suggested;
      }
    })
      ? (this.selectedChips = this.selectedChips.filter((chip) => {
          if (chip && chip.id) {
            return chip.id !== suggested.id;
          } else {
            return chip !== suggested;
          }
        }))
      : this.selectedChips.push(suggested);
    this.show = false;
  }

  removeSelectedChips(chipToRemove: any) {
    this.selectedChips = this.selectedChips.filter((chip) => {
      if (chip && chipToRemove.id) {
        return chip.id !== chipToRemove.id;
      } else {
        return chip !== chipToRemove;
      }
    });
  }

  addChipsIfNot(event: any) {
    if (this.additionAllowed) {
    }
    {
      if (event.target.value && event.target.value.length > 0) {
        this.selectedChips.push(
          event.target.value.value
            ? event.target.value.value
            : event.target.value
        );
        this.providedInputChips.push(
          event.target.value.value
            ? event.target.value.value
            : event.target.value
        );
        this.clearTextBox();
        console.log('Tags', this.selectedChips);
      }
    }
  }

  clearTextBox() {
    this.localFormGroup.value.textInput = null;
    this.localFormGroup.patchValue(this.localFormGroup.value);
    // this.show = false;
  }
}
