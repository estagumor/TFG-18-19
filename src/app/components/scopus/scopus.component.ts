import { Component, OnInit } from '@angular/core';
import {ScopusService} from '../../services/scopus.service';
import { Publication } from 'src/app/models/publication';

@Component({
  selector: 'app-scopus',
  templateUrl: './scopus.component.html',
  styleUrls: ['./scopus.component.css'],
  providers: [ScopusService]
})
export class ScopusComponent implements OnInit {
  public res: Array<Publication>; 
  constructor(private _service: ScopusService) { }

  ngOnInit() {
  }

  getAuthor(){
    this._service.getAuthor().subscribe((data) => {
      this.res = data;
      console.log(data)
    })
  }

  getPubs(){
    console.log(this._service.getPubs())
  }

}
