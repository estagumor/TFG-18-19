import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild, Component, OnInit,Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-acomplete',
  templateUrl: './acomplete.component.html',
  styleUrls: ['./acomplete.component.css']
})
export class AcompleteComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  basicCtrl = new FormControl();
  filteredList: Observable<string[]>;
  @Input() finalList: string[] = [];
  @Input() allList: string[] = [];

  @ViewChild('basicInput') basicInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredList = this.basicCtrl.valueChanges.pipe(
      startWith(null),
      map((element: string | null) => element ? this._filter(element) : this.allList.slice()));
  }

  add(event: MatChipInputEvent): void {
    // Add element only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our element
      if(this._filter(value).length > 0){
        if ((value || '').trim()) {
          this.finalList.push(value.trim());
        }
  
        // Reset the input value
        if (input) {
          input.value = '';
        }
  
        this.basicCtrl.setValue(null);
      }
    }
  }

  remove(element: string): void {
    const index = this.finalList.indexOf(element);

    if (index >= 0) {
      this.finalList.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.finalList.push(event.option.viewValue);
    this.basicInput.nativeElement.value = '';
    this.basicCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    if(value){
      const filterValue = value.toLowerCase();
      return this.allList.filter(option => option.toLowerCase().includes(filterValue)).filter(option => !this.finalList.includes(option));
    }
  }

  ngOnInit() {
    this.filteredList = this.basicCtrl.valueChanges // Para el autocompletado
    .pipe(
    startWith(''),
    map(value => this._filter(value))
    ); 
  }
}

