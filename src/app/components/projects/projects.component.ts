import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import 'rxjs/add/operator/map';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { ChangeDetectorRef } from '@angular/core';
import { } from '@angular/core/src/render'

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {

  //AUTOCOMPLETE
  public researchers: string[] = ['Javier Troya', 'Carlos Muller', 'Jose A. Parejo', 'Manuel Resinas']; // La lista que sale en el input al escribir
  public hireds: string[] = [];
  public finalResearchers: string[] = [];
  public ctrlResearchers = new FormControl();
  public finalWorkers: string[] = [];
  public finalHireds: string[] = [];
  public finalLeaders: string[] = [];

  public project: Project;
  public responseFind: Project;
  public responseCreate: Project;
  public contenedor: Project; //Se usa en el buscador
  public projectId: any;

  //IMPROVES
  public duration: string = "1";

  //VALIDATION
  public errors = [];

  constructor(
    private ref: ChangeDetectorRef,
    private _route: ActivatedRoute, // Para señalar el link del menu que esta activo
    private _router: Router, // Para hacer el menu de navegacion
    private _service: ProjectService, // El servicio que hace las peticiones al backend
  ) {
    this.project = new Project([], [], [], '', '', [], '', '', '', '', null, null, null, []);
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.responseCreate = new Project([], [], [], '', '', [], '', '', '', '', null, null, null, []); // Instancia para guardar el resultado
    this.validateAutocomplete()

    if(this.errors.length > 1) { //HAY ERRORES
      console.log(this.errors)
      //TODO arreglar para que no salte siempre false
      return false;
    }

    this.project.researchTeam = this.finalResearchers;
    this.project.workTeam = this.finalWorkers;
    this.project.hiredStaff = this.finalHireds;
    this.project.leader = this.finalLeaders;
    console.log("research Team " + this.finalResearchers);
    console.log("work Team " + this.finalWorkers);
    console.log("hired Staff " + this.finalHireds);
    console.log("leaders " + this.finalLeaders);
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
      console.log(this.project);
    this._service.createV2(this.project).subscribe( // Subscribe es para recibir la respuesta y actuar segun sea un resultado o un error
      result => {
        this.responseCreate = result;
        console.log(this.responseCreate);
        form.reset()
      },
      error => {
        console.log(error);
      }
    );
  }

  find() {
    this._service.getProject(this.projectId).subscribe(result => {
      this.responseFind = result['project'];
    });
  }

  findById(id: number): Project {
    let pro;
    this._service.getProject(id).subscribe(result => {
      this.responseFind = result['project'];
    });
    return pro;
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
    if(this.finalResearchers.length < 1){
      this.errors['badResearchers'] = "Los investigadores no pueden ser vacíos"
      // form.form.controls['researchTeam'].setErrors({'badResearchers': "Los investigadores no pueden ser vacíos"})
    } else {
      this.errors['badResearchers'] = null
    }
    if(this.finalWorkers.length < 1){
      this.errors['badWorkers'] = "Los trabajadores no pueden ser vacíos"
      //form.errors.controls['workTeam'].setErrors({'badWorkers':"Los trabajadores no pueden ser vacíos"})
    } else {
      this.errors['badWorkers'] = null
    }
    if(this.finalResearchers.some(r=> this.finalWorkers.includes(r))) {
      this.errors['workersNotResearchers'] = "Los trabajadores no pueden ser parte de los investigadores"
      //form.errors.controls['workTeam'].setErrors({'workersNotResearchers':"Los trabajadores no pueden ser parte de los investigadores"})
    } else {
      this.errors['workersNotResearchers'] = null
    }
  }

  addDuration(obj, select, start){
    let fecha = start.value
    let newFecha = new Date((parseInt(fecha["year"])+parseInt(select.value))+"/"+fecha["month"]+"/"+(fecha["day"]-1))
    obj._writeModelValue({year: newFecha.getFullYear(), month: newFecha.getMonth()+1, day: newFecha.getDate()})
    // Next line is marked as error in VS Code but it doesn't trigger a real error
    this.project.endDate = {year: newFecha.getFullYear(), month: newFecha.getMonth()+1, day: newFecha.getDate()}
    this.ref.detectChanges();
  }
}
