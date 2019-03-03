import { Component, OnInit } from '@angular/core';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { ScopusService } from '../../services/scopus.service';
import { NgControl } from '@angular/forms'
import { DisplayComponent } from '../display/display.component'

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css'],
  providers: [PublicationService, ScopusService]
})
export class PublicationListComponent implements OnInit {
  public listado: Array<Publication> = []
  public showDisplay: boolean = true;
  public selectedPub: Publication
  public fields

  constructor(
    private _service: PublicationService,
    private _scopus: ScopusService
  ) { }

  ngOnInit() {
    this._service.list().subscribe((data: Publication[]) => {
      this.listado = data
    })
  }

  clicked(obj){
    obj.checked ? obj.parentElement.parentElement.parentElement.className = "selected" : obj.parentElement.parentElement.parentElement.className = ""
  }

  selected(pub, comp: DisplayComponent) {
    let tempPub = pub
      this.fields = Publication.getFields()
      if (this.selectedPub)
        if (this.selectedPub.articleTitle != tempPub.articleTitle) {
          this.showDisplay = true;
          comp.objeto = null
          comp.fields = []
          comp.properties = []
        } else if (this.selectedPub.articleTitle == tempPub.articleTitle && !this.showDisplay){
          this.showDisplay = true;
          comp.objeto = null
          comp.fields = []
          comp.properties = []
        } else
          this.showDisplay = false
      this.selectedPub = tempPub;

  }

  saveFromScoups() {
    this._scopus.getPubs().subscribe((data) => {
      this._service.saveAll(data).subscribe((data) => {
      })
    })
  }

}
