import { Component, ViewChild, OnInit, ElementRef, forwardRef, Input } from '@angular/core';
import {
    ConnectedPositioningStrategy,
    IgxDropDownComponent,
    IgxInputGroupComponent
} from 'igniteui-angular';
import { Observable } from 'rxjs';
import { ServerDropdownOption } from '../models/server-dropdown';
import { CustomDropdownService } from '../drop-down.service';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, ValidatorFn } from '@angular/forms';

export function customDropdownValidator(isRequired = false): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {

    // use array syntax to dynamically set the key (passed above as errorName) of the returned error object
    if (isRequired && (control.value == null || control.value === '')) {
      return {isRequired: true};
    }

    return null;
  };
}

@Component({
  selector: 'app-ig-dropdown',
  templateUrl: './ig-dropdown.component.html',
  styleUrls: ['./ig-dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropDownComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DropDownComponent),
      multi: true,
    },
  ],
})
export class DropDownComponent implements OnInit {
  @ViewChild(IgxDropDownComponent, { static: true }) public igxDropDown: IgxDropDownComponent;
  @ViewChild('inputGroup', { read: IgxInputGroupComponent, static: true }) public inputGroup: IgxInputGroupComponent;
  @ViewChild('input' , {static: false}) public input: ElementRef;

  @Input() guid: string;
  @Input() width: string;
  @Input() isRequired = false;

  option: Observable<Array<ServerDropdownOption>>;
  options: ServerDropdownOption[];
  value;
  selected;
  status;
  form: FormGroup;
  onChange;
  onTouched;
  validateFn: Function;



constructor(private dropDownService: CustomDropdownService) {}

ngOnInit() {
    console.log('Will Get for GUID Data', this.guid);
    this.option = this.dropDownService.fetchData(this.guid);
    this.option.subscribe(data => this.options = data);
    this.selected = new FormControl(this.value, [], );
    this.status = new FormControl('', [], );

    this.form = new FormGroup({
      selected: this.selected,
    });
    if (this.isRequired) {
      // this.form.get('selectField').setValidators(Validators.required);
      this.form.get('selected').updateValueAndValidity();
      this.form.updateValueAndValidity();
    }

  }
onSelection(event) {
    const option = this.options.find(o => o.value === event.newSelection.value);
    this.input.nativeElement.value = option.name;
    //this.form.controls.status.setValue(option.value);

    console.log(option.value)
  }
writeValue(value) {
    this.value = value;
    this.form.get('selected').setValue(this.value);
  }

validate(c: FormControl) {
    return this.validateFn(c);
  }

registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

onInputChange(value) {
    console.log(value);
    this.onChange(value);
  }


  public openDropDown() {
      if (this.igxDropDown.collapsed) {
          this.igxDropDown.open({
              modal: false,
              positionStrategy: new ConnectedPositioningStrategy({
                  target: this.inputGroup.element.nativeElement
              })
          });
      }
  }
}
