import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { PersonService } from '../../services/person.service';
import 'rxjs/add/operator/map';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { ChangeDetectorRef } from '@angular/core';
import { } from '@angular/core/src/render'
import { Person } from '../../models/person';

@Component({
  selector: 'app-projects',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css'],
  providers: [ProjectService, PersonService]
})
export class ProjectCreateComponent implements OnInit {

  //AUTOCOMPLETE
  public researchers: String[] = [];
  public hireds: String[] = [];
  public finalResearchers: String[] = [];
  public ctrlResearchers = new FormControl();
  public finalWorkers: String[] = [];
  public finalHireds: String[] = [];
  public finalLeaders: String[] = [];
  public people: Person[] = [];

  //EDIT
  public edit: boolean = false;

  public project: Project;
  public responseFind: Project;
  public responseCreate: Project;
  public contenedor: Project; //Se usa en el buscador
  public projectId: any;

  //IMPROVES
  public duration: string = "1";

  //VALIDATION
  public errors = [];

  //EVITAR ERRORES EN LA CONSOLA DEL NAVEGADOR
  public bool: boolean = false;
  

  constructor(
    private ref: ChangeDetectorRef,
    private _route: ActivatedRoute, // Para señalar el link del menu que esta activo
    private _router: Router, // Para hacer el menu de navegacion
    private _service: ProjectService, // El servicio que hace las peticiones al backend
    private _personService: PersonService,
  ) {
  }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      if (params['id?'] !== undefined) { //ESTAMOS EN EL EDIT
        this._service.getProject(params['id?']).subscribe(project => {
          this.project = project.body['project']
          this.bool = true;
          this.edit = true;
          this.finalResearchers = this.getPeopleAsString(this.project.researchTeam)
          this.finalWorkers = this.getPeopleAsString(this.project.workTeam)
          this.finalHireds = this.getPeopleAsString(this.project.hiredStaff)
          this.finalLeaders = this.getPeopleAsString(this.project.leader)
        });
      } else { //estamos en el create
        this.bool = true;
        this.project = new Project([], [], [], '', '', [], '', 'NONE', 'NONE', '', null, null, null, []);
      }
    });
    this._personService.getAll().subscribe(response => {
      this.people = response.body['persons']
      this.people.map((p) => {
        if(p.job == 'RESEARCHER') {
          this.researchers.push(p.name + " " + p.surname)
        } else { //HIRED
          this.hireds.push(p.name + " " + p.surname)
        }
      })
    });
  }

  getPeople(team: String[]): Person[]{
    let res: Person[];
    res = team.map((str: string) => {
      return this.people.filter((p: Person) => {
        return str.indexOf(p.name) != -1 && str.indexOf(p.surname) != -1
      })[0]
    })
    return res
  }

  getPeopleAsString(team: Person[]): String[]{
    let res: String[];
    res = team.map((p: Person) => {
      return p.name + " " + p.surname
    })
    return res
  }

  onSubmit(form: NgForm) {
    this.responseCreate = new Project([], [], [], '', '', [], '', '', '', '', null, null, null, []); // Instancia para guardar el resultado
    this.validateAutocomplete()

    if (this.errors.length > 1) { //HAY ERRORES
      console.log(this.errors)
      //TODO arreglar para que no salte siempre false
      return false;
    }

    this.project.researchTeam = this.getPeople(this.finalResearchers);
    this.project.workTeam = this.getPeople(this.finalWorkers);
    this.project.hiredStaff = this.getPeople(this.finalHireds);
    this.project.leader = this.getPeople(this.finalLeaders);
    // console.log("research Team " + this.finalResearchers);
    // console.log("work Team " + this.finalWorkers);
    // console.log("hired Staff " + this.finalHireds);
    // console.log("leaders " + this.finalLeaders);
    /*
    console.log(this.project.startDate);
    this.project.endDate = new Date();
    this.project.startDate = new Date(this.project.startDate);
    this.project.endDate.setDate(this.project.startDate.getDate() + parseInt(this.duration));
    */
    // if (this.project.relatedPublications != null)
    //   this.project.relatedPublications = [];
    if (this.project.relatedTools != null)
      this.project.relatedTools = [];
    // console.log(this.project);
    if (this.edit) { //estamos editando
      this._service.updateProject(this.project).subscribe(result => {
        this.responseCreate = result.body;
        form.reset()
        this._router.navigate(['/projects'])
      },
        error => {
          console.log(error);
        });
    } else { //estamos creando
      this._service.createV2(this.project).subscribe( // Subscribe es para recibir la respuesta y actuar segun sea un resultado o un error
        result => {
          this.responseCreate = result.body;
          form.reset()
          this._router.navigate(['/projects'])
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  validateLeader() {
    if (this.finalLeaders.length < 1) {
      return true;
    } else {
      const found = this.finalResearchers.some(r => this.finalLeaders.indexOf(r) >= 0);
      return found;
    }
  }

  validateAutocomplete() {
    if (this.finalResearchers.length < 1) {
      this.errors['badResearchers'] = "Los investigadores no pueden ser vacíos"
      // form.form.controls['researchTeam'].setErrors({'badResearchers': "Los investigadores no pueden ser vacíos"})
    } else {
      this.errors['badResearchers'] = null
    }
    if (this.finalWorkers.length < 1) {
      this.errors['badWorkers'] = "Los trabajadores no pueden ser vacíos"
      //form.errors.controls['workTeam'].setErrors({'badWorkers':"Los trabajadores no pueden ser vacíos"})
    } else {
      this.errors['badWorkers'] = null
    }
    if (this.finalResearchers.some(r => this.finalWorkers.includes(r))) {
      this.errors['workersNotResearchers'] = "Los trabajadores no pueden ser parte de los investigadores"
      //form.errors.controls['workTeam'].setErrors({'workersNotResearchers':"Los trabajadores no pueden ser parte de los investigadores"})
    } else {
      this.errors['workersNotResearchers'] = null
    }
  }

  addDuration(obj, select, start) {
    let fecha = start.value
    let newFecha = new Date((parseInt(fecha["year"]) + parseInt(select.value)) + "/" + fecha["month"] + "/" + (fecha["day"] - 1))
    obj._writeModelValue({ year: newFecha.getFullYear(), month: newFecha.getMonth() + 1, day: newFecha.getDate() })
    // Next line is marked as error in VS Code but it doesn't trigger a real error
    this.project.endDate = { year: newFecha.getFullYear(), month: newFecha.getMonth() + 1, day: newFecha.getDate() }
    this.ref.detectChanges();
  }
}
