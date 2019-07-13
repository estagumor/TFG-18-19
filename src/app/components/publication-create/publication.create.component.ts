import { Component, OnInit } from '@angular/core';
import { Publication } from '../../models/publication';
import { Project } from '../../models/project';
import { PublicationService } from '../../services/publication.service';
import { ProjectService } from '../../services/project.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publication.create.component.html',
  styleUrls: ['./publication.create.component.css'],
  providers: [PublicationService]
})
export class PublicationCreateComponent implements OnInit {
  public pub: Publication
  public StringProjects: String[];
  public finalProjects: String[] = [];
  public projects: Project[] = [];
  public StringPersons: String[] = [];
  public persons: Person[] = [];
  public finalAutores: String[] = [];
  public congressTitles: string[] = [];
  public filteredCongress: string[] = [];

  public edit: boolean = false;

  constructor(
    private _service: PublicationService,
    private _personService: PersonService,
    private _projectService: ProjectService,
    private _route: ActivatedRoute,
    private _router: Router, // Para hacer el menu de navegacion
  ) {
    this.pub = new Publication('', '', '', '', '', null, '', '', null, '', '', [], '', false, null, null, null)
  }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      if (params['id?'] !== undefined) { //ESTAMOS EN EL EDIT
        this._service.getPublication(params['id?']).subscribe(publi => {
          this.pub = publi.body['pub']
          this.edit = true
        });
      }
    });
    this._projectService.getProjects().subscribe(response => {
      this.projects = response.body['projects'];
      this.StringProjects = this.projects.map((p) => {
        return p.title
      })
    })
    this._personService.getAll().subscribe(response => {
      this.persons = response.body['persons'];
      this.persons.map((p) => {
        if (p.job == 'RESEARCHER') {
          this.StringPersons.push(p.name + " " + p.surname)
        }
      })
    })
    this._service.getCongressTitles().subscribe((response) => {
      this.congressTitles = response.body['congressTitles']
    })
  }

  getProjects(team: String[]): Project[] {
    let res: Project[];
    res = team.map((str: string) => {
      return this.projects.filter((p: Project) => {
        return str.indexOf(p.title) != -1
      })[0]
    })
    return res
  }

  getStringProjects(team: Project[]): String[] {
    let res: String[];
    res = team.map((p: Project) => {
      return p.title
    })
    return res
  }

  getPersons(team: String[]): Person[] {
    let res: Person[];
    res = team.map((str: string) => {
      return this.persons.filter((p: Person) => {
        return str.indexOf(p.name) != -1 || str.indexOf(p.surname) != -1
      })[0]
    })
    return res
  }

  getStringPersons(persona: Person[]): String[] {
    let res: String[];
    res = persona.map((p: Person) => {
      return p.name + " " + p.surname
    })
    return res
  }

  onSubmit(form: NgForm) {
    this.pub.project = this.getProjects(this.finalProjects)
    this.pub.authors = this.getPersons(this.finalAutores)
    if (this.pub.sourceType.indexOf('Conference') != -1) {
      this.pub.sourceTitle = this.filteredCongress[0]
    }
    if (this.edit == true) {
      this._service.updatePublication(this.pub).subscribe(result => {
        form.resetForm()
        this._router.navigate(['/publications'])
      },
        error => {
          console.log(error)
        })
    } else {
      this._service.create(this.pub).subscribe(
        result => {
          form.resetForm()
          this._router.navigate(['/publications'])
        },
        error => {
          console.log(error)
        })
    }
  }

}
