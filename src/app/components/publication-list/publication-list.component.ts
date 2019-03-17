import { Component, OnInit, Input } from '@angular/core';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css']
})
export class PublicationListComponent implements OnInit {
  public listado: Array<Publication> = []

  @Input() projectId: String

  constructor(
    private _service: PublicationService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this.projectId = this._route.snapshot.paramMap.get('id');
    this._service.filterByProject(this.projectId).subscribe(result => {
      this.listado = result.body['pubs'];
    }, err => {
      console.log(err);
      
    })
  }

}
