import { Component, OnInit, Input } from '@angular/core';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { ScopusService } from '../../services/scopus.service';
import { NgControl } from '@angular/forms'
import { DisplayComponent } from '../display/display.component'
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-publication-add-list',
  templateUrl: './publication-add-list.component.html',
  styleUrls: ['./publication-add-list.component.css'],
  providers: [PublicationService, ScopusService]
})
export class PublicationAddListComponent implements OnInit {
  public listado: Array<Publication> = []
  public showDisplay: boolean = true;
  public selectedPub: Publication
  public fields
  public pubsToSave: Array<Publication> = [];
  public projects: Array<Project> = [];
  public prosToSave: Array<Project> = [];

  constructor(
    private _service: PublicationService,
    private _scopus: ScopusService,
    private _projectService: ProjectService,
    public dialog: MatDialog,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    // this._service.list().subscribe((data: Publication[]) => {
    //   this.listado = data['pubs'];
      
    // })
    this._scopus.getPubs().subscribe((data) => {
        this.listado = data;
    })
    this._projectService.getProjects().subscribe((response) => {
      this.projects = response.body['projects']
    })
  }

  clicked(obj,pub) {
    obj.checked = !obj.checked
    obj.checked ? obj.parentElement.parentElement.parentElement.className = "selected" : obj.parentElement.parentElement.parentElement.className = ""
    if(obj.checked){
      this.pubsToSave.push(pub)
    } else {
      this.pubsToSave = this.pubsToSave.filter(p => p!=pub)
    }
  }

  clickedPro(obj,pub) {
    obj.checked = !obj.checked
    obj.checked ? obj.parentElement.parentElement.parentElement.className = "selected" : obj.parentElement.parentElement.parentElement.className = ""
    //Guardamos los scopus ids del proyecto
    let r //Iterador
    let scopusIds = []
    for(r in pub.researchTeam) {
      scopusIds.push(r.scopusId)
    }
    //Si se selecciona, se guarda el y los pubs que tienen sus scopus ids
    if(obj.checked){
      this._scopus.getPubs(0,25,scopusIds).subscribe(res => {
        this.listado.push(res)
      }, err => {
        console.log(err);
      });
      this.prosToSave.push(pub)
    } else { //Si no, se quita el y los pubs que tienen sus scopus ids
      this._scopus.getPubs(0,25,scopusIds).subscribe(res => {
        let re
        for(re in res){
          this.listado = this.listado.filter(p => p!=re)
        }
      }, err => {
        console.log(err);
      });
      this.prosToSave = this.prosToSave.filter(p => p!=pub)
    }
  }

  saveFromScoups() {
    this._service.saveAll(this.pubsToSave, this.prosToSave).subscribe(data => {
      this._router.navigateByUrl('/publications')
      
    },err => {
      console.log(err);
      
    })
  }

}
