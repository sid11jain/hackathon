import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationHubSelectOptionComponent } from './innovation-hub-select-option.component';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR, FormGroup, FormControl, FormGroupDirective, ControlContainer } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';

describe('InnovationHubSelectOptionComponent', () => {
  let component: InnovationHubSelectOptionComponent;
  let fixture: ComponentFixture<InnovationHubSelectOptionComponent>;

  const mockFormGroup: FormGroup = new FormGroup({
    field: new FormControl('')
  });

  const mockControlContainer: FormGroupDirective = new FormGroupDirective([], []);
  mockControlContainer.form = mockFormGroup;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovationHubSelectOptionComponent ],
      imports: [ FormsModule, ReactiveFormsModule ],
      providers: [
        { provide: ControlContainer, useValue: mockControlContainer }
      ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(InnovationHubSelectOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setup() {
    const fixture = TestBed.createComponent(InnovationHubSelectOptionComponent);
    const component: any = fixture.componentInstance;
    component.setInput({fieldFormControlName: 'field', selectedOptions: undefined});
    return { fixture, component };
  }

  it('should create', () => {
    const { fixture, component } = setup();
    expect(component).toBeTruthy();
  });

});
