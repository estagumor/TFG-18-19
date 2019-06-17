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
    if(!this.projectId) {
      this._service.list().subscribe(result => {
        //TODO comprobar que esto funciona aqui
        this.listado = result.body['pubs']; 
        console.log(this.listado[0])
      }, err => {
        console.log(err);
      })
    } else {
      this._service.filterByProject(this.projectId).subscribe(result => {
        this.listado = result.body['pubs'];
      }, err => {
        console.log(err);
        
      })
    }
  }

  displayPublication(id) {
    if (id !== undefined) {
      this._service.getPublication(id).subscribe(result => {
        let publication = result.body['pub']
        if(publication) {
          this._router.navigateByUrl('/publication/display/' + id)
          // this._router.navigate(['project/display/' + id])
        }else {
          //TODO Añadir aviso de error.
          //En principio está pensado como una ventana desplegable, usando el display y 
          //cambiandole las clases CSS
          this._router.navigateByUrl('/publications')
        }});
    } else {
      this._router.navigateByUrl('/publications') //Goes to the list of projects
    }
  };  

}
