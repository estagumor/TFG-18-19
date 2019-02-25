import { Component, ElementRef,ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import 'rxjs/add/operator/map';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public project: Project;
  public responseFind: Project;
  public responseCreate: Project;
  public projectId: any;
  public projectId2: any;
  public listado: Array<Project>; // La variable donde se guarda la lista y despues sale por consola
  public researchControl = new FormControl(); // El formulario
  public workerControl = new FormControl();
  public hiredControl = new FormControl();
  public leaderControl = new FormControl();
  public researchers: string[] = ['Javier Troya', 'Carlos Muller', 'Jose A. Parejo', 'Manuel Resinas']; // La lista que sale en el input al escribir
  public hireds: string[] = [];
  public finalResearchers: string[] = [];
  public finalWorkers: string[] = [];
  public finalHireds: string[] = [];
  public finalLeaders: string[] = [];
  public researchVisible = true;
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  public separatorKeysCodes: number[] = [ENTER,COMMA];
  public researchersfilteredOptions: Observable<string[]>;
  public workersfilteredOptions: Observable<string[]>;
  public hiredsfilteredOptions: Observable<string[]>;
  public leadersfilteredOptions: Observable<string[]>;
  public duration: string = "1";

  @ViewChild('researcherInput') researcherInput: ElementRef<HTMLInputElement>;
  @ViewChild('workerInput') workerInput: ElementRef<HTMLInputElement>;
  @ViewChild('hiredInput') hiredInput: ElementRef<HTMLInputElement>;
  @ViewChild('leaderInput') leaderInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoautoResearchers') MatAutocompleteR: MatAutocomplete;
  @ViewChild('autoWorkers') MatAutocompleteW: MatAutocomplete;
  @ViewChild('autoHireds') MatAutocompleteH: MatAutocomplete;
  @ViewChild('autoLeaders') MatAutocompleteL: MatAutocomplete;
  constructor(
    private _route: ActivatedRoute, // Para señalar el link del menu que esta activo
    private _router: Router, // Para hacer el menu de navegacion
    private _service: ProjectService // El servicio que hace las peticiones al backend
  ) {
    this.project = new Project([], [], [], '', '', [], '', '', '', '', null, null, null, [], []);
  }

  researchAdd(event: MatChipInputEvent): void {
    if(!this.MatAutocompleteR.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.finalResearchers.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.researchControl.setValue(null);
    }
  }

  workerAdd(event: MatChipInputEvent): void {
    if(!this.MatAutocompleteW.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.finalWorkers.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.workerControl.setValue(null);
    }
  }

  hiredAdd(event: MatChipInputEvent): void {
    if(!this.MatAutocompleteH.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.finalHireds.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.hiredControl.setValue(null);
    }
  }

  leaderAdd(event: MatChipInputEvent): void {
    if(!this.MatAutocompleteL.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.finalLeaders.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.leaderControl.setValue(null);
    }
  }

  researchRemove(researcher: string): void {
    const index = this.finalResearchers.indexOf(researcher);

    if (index >=0) {
      this.finalResearchers.splice(index, 1);
    }
  }

  workerRemove(worker: string): void {
    const index = this.finalWorkers.indexOf(worker);

    if (index >=0) {
      this.finalWorkers.splice(index, 1);
    }
  }

  hiredRemove(hired: string): void {
    const index = this.finalHireds.indexOf(hired);

    if (index >=0) {
      this.finalHireds.splice(index, 1);
    }
  }

  leaderRemove(leader: string): void {
    const index = this.finalLeaders.indexOf(leader);

    if (index >=0) {
      this.finalLeaders.splice(index, 1);
    }
  }

  researchSelected(event: MatAutocompleteSelectedEvent): void {
    this.finalResearchers.push(event.option.viewValue);
    this.researcherInput.nativeElement.value = '';
    this.researchControl.setValue(null);
  }

  workerSelected(event: MatAutocompleteSelectedEvent): void {
    this.finalWorkers.push(event.option.viewValue);
    this.workerInput.nativeElement.value = '';
    this.workerControl.setValue(null);
  }

  hiredSelected(event: MatAutocompleteSelectedEvent): void {
    this.finalHireds.push(event.option.viewValue);
    this.hiredInput.nativeElement.value = '';
    this.hiredControl.setValue(null);
  }

  leaderSelected(event: MatAutocompleteSelectedEvent): void {
    this.finalLeaders.push(event.option.viewValue);
    this.leaderInput.nativeElement.value = '';
    this.leaderControl.setValue(null);
  }

  ngOnInit() {
    this.researchersfilteredOptions = this.researchControl.valueChanges // Para el autocompletado
      .pipe(
      startWith(''),
      map(value => this._filterResearchers(value))
      ); 
    this.workersfilteredOptions = this.workerControl.valueChanges // Para el autocompletado
      .pipe(
      startWith(''),
      map(value => this._filterWorkers(value))
      ); 
    this.hiredsfilteredOptions = this.hiredControl.valueChanges // Para el autocompletado
      .pipe(
      startWith(''),
      map(value => this._filterHireds(value))
      ); 
    this.leadersfilteredOptions = this.leaderControl.valueChanges // Para el autocompletado
      .pipe(
      startWith(''),
      map(value => this._filterLeaders(value))
      ); 
  }

  private _filterResearchers(value: string): string[] { // Para el autocompletado
      if(value){
        const filterValue = value.toLowerCase();
        return this.researchers.filter(option => option.toLowerCase().includes(filterValue)).filter(option => !this.finalResearchers.includes(option));
      }
   } 

   private _filterWorkers(value: string): string[] { // Para el autocompletado
    if(value){
      const filterValue = value.toLowerCase();
      return this.researchers.filter(option => option.toLowerCase().includes(filterValue)).filter(option => !this.finalWorkers.includes(option));
    }
  } 

   private _filterHireds(value: string): string[] { // Para el autocompletado
    if(value){
      const filterValue = value.toLowerCase();
      return this.hireds.filter(option => option.toLowerCase().includes(filterValue)).filter(option => !this.finalHireds.includes(option));
    }
  }

  private _filterLeaders(value: string): string[] { // Para el autocompletado
      if(value){
        const filterValue = value.toLowerCase();
        return this.researchers.filter(option => option.toLowerCase().includes(filterValue)).filter(option => !this.finalLeaders.includes(option));
      }
 } 

  onSubmit() {
    this.responseCreate = new Project([], [], [], '', '', [], '', '', '', '', null, null, null, [], []); // Instancia para guardar el resultado
    this.project.researchTeam = this.finalResearchers;
    this.project.workTeam = this.finalWorkers;
    this.project.hiredStaff = this.finalHireds;
    this.project.leader = this.finalLeaders;
    /*
    console.log(this.project.startDate);
    this.project.endDate = new Date();
    this.project.startDate = new Date(this.project.startDate);
    this.project.endDate.setDate(this.project.startDate.getDate() + parseInt(this.duration));
    */
    if(this.project.relatedPublications!=null)
      this.project.relatedPublications = this.project.relatedPublications.toString().split(",");
    if(this.project.relatedTools!=null)
      this.project.relatedTools = this.project.relatedTools.toString().split(",");
    this._service.createV2(this.project).subscribe( // Subscribe es para recibir la respuesta y actuar segun sea un resultado o un error
      result => {
        this.responseCreate = result;
        console.log(this.responseCreate);
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

  findByReference(reference) {
    this._service.getProject(reference).subscribe(result => console.log(result));
  }

  listar(bool) {
    if(bool == true) {
      this._service.getProjects().subscribe((lista) => {
        this.listado = lista;
      });
    } else {
      this.listado = undefined;
    }
  }

  delete() {
    if (confirm('¿Esta seguro?')) {
      this._service.deleteProject(this.projectId2).subscribe((response) => console.log(response));
      let temp = this.findById(this.projectId2);
      this.listado = this.listado.filter(h => h !== temp);
    }
  }

  getStatus(project) {
    const eD = new Date(project.endDate);
    const now = new Date();
    var time = now.getFullYear() - eD.getFullYear();
    if(time <= 0) {
      return "activo";
    } else if(time <= 3 && time > 0) {
      return "tres";
    } else {
      return "cinco";
    }
  }
}
