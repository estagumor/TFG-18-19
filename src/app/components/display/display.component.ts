import { Component, OnInit, Input, OnChanges, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit{
  @Input() objeto: any;
  @Input() fields: [];
  public properties: String[] = [];
  constructor(
    public dialogRef: MatDialogRef<DisplayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: []
  ) { }

  ngOnInit() {
    this.objeto = this.data["objeto"]
    this.fields = this.data["fields"]
    if(this.fields){
      for (let key in this.fields) {
        if (this.fields.hasOwnProperty(key)) {
          let element = this.fields[key];
          this.properties.push(key,element)
        }
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
