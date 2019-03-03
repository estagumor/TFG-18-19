import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnChanges{
  @Input() objeto: any;
  @Input() visible: boolean;
  @Input() fields: [];
  public properties: String[] = [];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.fields){
      for (let key in this.fields) {
        if (this.fields.hasOwnProperty(key)) {
          let element = this.fields[key];
          this.properties.push(key,element)
        }
      }
    }
    
    if(!this.visible){
      this.objeto = null
      this.fields = []
      this.properties = []
    }
      

  }

}
