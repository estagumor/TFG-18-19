import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Project} from '../../models/project';
import {ProjectService} from '../../services/project.service';
import 'rxjs/add/operator/map';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public numero: number;
  public proyecto: Project;
  public respuesta: Project;
  public listado: Array<Project>; // La variable donde se guarda la lista y despues sale por consola
  public myControl = new FormControl(); // El formulario
  public options: string[] = ['Javier Troya', 'Carlos Muller', 'Jose A. Parejo', 'Manuel Resinas']; // La lista que sale en el input al escribir
  public filteredOptions: Observable<string[]>;

  constructor(
    private _route: ActivatedRoute, // Para señalar el link del menu que esta activo
    private _router: Router, // Para hacer el menu de navegacion
    private _service: ProjectService // El servicio que hace las peticiones al backend
  ) {
    this.proyecto = new Project([], [], [], '', '', [], '', '', '', '', null, null, null, [], []);
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.numero = params.projectNumber;
    });

    this.filteredOptions = this.myControl.valueChanges // Para el autocompletado
      .pipe(
      startWith(''),
      map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] { // Para el autocompletado
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    this.respuesta = new Project([], [], [], '', '', [], '', '', '', '', null, null, null, [], []); // Instancia para guardar el resultado
    this._service.createV2(this.proyecto).subscribe( // Subscribe es para recibir la respuesta y actuar segun sea un resultado o un error
      result => {
        this.respuesta = result.data;
        console.log(this.respuesta);
      },
      error => {
        console.log(error);
      }
    );
  }

  find() {
    this._service.getProject(1).subscribe((pro: Project) => console.log(pro));
  }
  
  findByReference(reference) {
      this._service.getProject(reference).subscribe((pro: Project) => console.log(pro));
    }

  listar() {
    this._service.getProjects().subscribe((lista: Array<Project>) => console.log(lista));
  }

}
