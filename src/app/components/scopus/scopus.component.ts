import { Component, OnInit } from '@angular/core';
import {ScopusService} from '../../services/scopus.service';

@Component({
  selector: 'app-scopus',
  templateUrl: './scopus.component.html',
  styleUrls: ['./scopus.component.css'],
  providers: [ScopusService]
})
export class ScopusComponent implements OnInit {

  constructor(private _service: ScopusService) { }

  ngOnInit() {
  }

  getAuthor(){
    this._service.getAuthor().subscribe((data) => console.log(data))
  }

}
