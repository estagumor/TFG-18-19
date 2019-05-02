import { Component, OnInit } from '@angular/core';
import { Publication } from '../../models/publication';
import { Project } from '../../models/project';
import { PublicationService } from '../../services/publication.service';
import { ProjectService } from '../../services/project.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  providers: [PublicationService]
})
export class PublicationsComponent implements OnInit {
  public pub: Publication
  public StringProjects: String[];
  public finalProjects: String[] = [];
  public projects: Project[] = [];

  constructor(
    private _service: PublicationService,
    private _projectService: ProjectService,
    private _router: Router, // Para hacer el menu de navegacion
  ) {
    this.pub = new Publication('','','','','',null,'','',null,'','',[],'',false,null,null)
   }

  ngOnInit() {
    //Rellenamos tanto el conjunto de proyectos como los strings que vamos a usar en el autocompletado
    this._projectService.getProjects().subscribe(response => {
      this.projects = response.body['projects'];
      this.StringProjects = this.projects.map((p) => {
        return p.title
      })
    })
  }

  getProjects(team: String[]): Project[]{
    let res: Project[];
    res = team.map((str: string) => {
      return this.projects.filter((p: Project) => {
        return str.indexOf(p.title) != -1
      })[0]
    })
    return res
  }

  getStringProjects(team: Project[]): String[]{
    let res: String[];
    res = team.map((p: Project) => {
      return p.title
    })
    return res
  }

  onSubmit(form: NgForm){
    this.pub.project = this.getProjects(this.finalProjects)
    this._service.create(this.pub).subscribe(
      result => {
        form.resetForm()
        this._router.navigate(['/publications'])
      }, 
      error=>{
        console.log(error)
      }
    )
  }

}
