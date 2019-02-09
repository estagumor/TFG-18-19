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
  public researchers: string[] = ['Javier Troya', 'Carlos Muller', 'Jose A. Parejo', 'Manuel Resinas']; // La lista que sale en el input al escribir
  public finalResearchers: string[] = ['Ejemplo'];
  public researchVisible = true;
  public researchSelectable = true;
  public researchRemovable = true;
  public researchAddOnBlur = true;
  public researchSeparatorKeysCodes: number[] = [ENTER,COMMA];
  //public filteredOptions: Observable<string[]>;

  @ViewChild('researcherInput') researcherInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') MatAutocomplete: MatAutocomplete;

  constructor(
    private _route: ActivatedRoute, // Para señalar el link del menu que esta activo
    private _router: Router, // Para hacer el menu de navegacion
    private _service: ProjectService // El servicio que hace las peticiones al backend
  ) {
    this.project = new Project([], [], [], '', '', [], '', '', '', '', null, null, null, [], []);
  }

  researchAdd(event: MatChipInputEvent): void {
    if(!this.MatAutocomplete.isOpen) {
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
    console.log(this.finalResearchers);
  }

  researchRemove(researcher: string): void {
    const index = this.finalResearchers.indexOf(researcher);

    if (index >=0) {
      this.finalResearchers.splice(index, 1);
    }
  }

  researchSelected(event: MatAutocompleteSelectedEvent): void {
    this.finalResearchers.push(event.option.viewValue);
    this.researcherInput.nativeElement.value = '';
    this.researchControl.setValue(null);
  }

  ngOnInit() {

    /* this.filteredOptions = this.myControl.valueChanges // Para el autocompletado
      .pipe(
      startWith(''),
      map(value => this._filter(value))
      ); */
  }

  /*  private _filter(value: string): string[] { // Para el autocompletado
     const filterValue = value.toLowerCase();
 
     return this.options.filter(option => option.toLowerCase().includes(filterValue));
   } */

  onSubmit() {
    this.responseCreate = new Project([], [], [], '', '', [], '', '', '', '', null, null, null, [], []); // Instancia para guardar el resultado
    this.project.researchTeam = this.finalResearchers;
    this.project.workTeam = this.project.workTeam.toString().split(",");
    this.project.hiredStaff = this.project.hiredStaff.toString().split(",");
    this.project.leader = this.project.leader.toString().split(",");
    this.project.relatedPublications = this.project.relatedPublications.toString().split(",");
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

  listar() {
    this._service.getProjects().subscribe((lista) => {
      this.listado = lista;
    });
  }

  delete() {
    if (confirm('¿Esta seguro?')) {
      this._service.deleteProject(this.projectId2).subscribe((response) => console.log(response));
      let temp = this.findById(this.projectId2);
      this.listado = this.listado.filter(h => h !== temp);
    }
  }

}
