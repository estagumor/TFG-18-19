import { Component, OnInit } from '@angular/core';
import { Publication } from '../../models/publication';
import { Project } from '../../models/project';
import { PublicationService } from '../../services/publication.service';
import { ProjectService } from '../../services/project.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

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
  public StringPersons: String[];
  public persons: Person[] = [];
  public finalAutores: String[] = [];

  constructor(
    private _service: PublicationService,
    private _personService: PersonService,
    private _projectService: ProjectService,
    private _router: Router, // Para hacer el menu de navegacion
  ) {
    this.pub = new Publication('','','','','',null,'','',null,'','',[],'',false,null,null,null)
   }

  ngOnInit() {
    //Rellenamos tanto el conjunto de proyectos como los strings que vamos a usar en el autocompletado
    this._projectService.getProjects().subscribe(response => {
      this.projects = response.body['projects'];
      this.StringProjects = this.projects.map((p) => {
        return p.title
      })
    })
    this._personService.getAll().subscribe(response => {
      this.persons = response.body['persons'];
      this.StringPersons = this.persons.map(p => {
        return p.name + " " + p.surname;
      })
      console.log(this.StringPersons)
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

  getPersons(team: String[]): Person[]{
    let res: Person[];
    res = team.map((str: string) => {
      return this.persons.filter((p: Person) => {
        return str.indexOf(p.name) != -1 || str.indexOf(p.surname) != -1
      })[0]
    })
    return res
  }

  getStringPersons(persona: Person[]): String[]{
    let res: String[];
    res = persona.map((p: Person) => {
      return p.name + " " + p.surname
    })
    return res
  }

  onSubmit(form: NgForm){
    this.pub.project = this.getProjects(this.finalProjects)
    this.pub.authors = this.getPersons(this.finalAutores)
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
