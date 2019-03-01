import { Component, OnInit } from '@angular/core';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { ScopusService } from '../../services/scopus.service';
import { NgControl } from '@angular/forms'

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css'],
  providers: [PublicationService, ScopusService]
})
export class PublicationListComponent implements OnInit {
  public listado: Array<Publication> = []

  constructor(
    private _service: PublicationService,
    private _scopus: ScopusService
  ) { }

  ngOnInit() {
    this._service.list().subscribe((data: Publication[]) => {
      this.listado = data
      console.log(this.listado)
    })
  }

  clicked(obj){
    obj.checked ? obj.parentElement.parentElement.parentElement.className = "selected" : obj.parentElement.parentElement.parentElement.className = ""
  }

  saveFromScoups(){
    this._scopus.getPubs().subscribe((data) => {
      this._service.saveAll(data).subscribe((data) => {
        console.log(data)
      })
    })
  }

}
