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
  public listado: Array<Project>;
  public myControl = new FormControl();
  public options: string[] = ['Javier Troya', 'Carlos Muller', 'Jose A. Parejo', 'Manuel Resinas'];
  public filteredOptions: Observable<string[]>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _service: ProjectService
  ) {
    this.proyecto = new Project('', '', '', '', '', '', '');
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.numero = params.projectNumber;
    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    this.respuesta = new Project('', '', '', '', '', '', '');
    //    this._service.createProject(this.proyecto).subscribe(
    //        result => {
    //          this.respuesta = result.data;
    //        },
    //        error => {
    //          console.log(error);
    //        }
    //      );
    this._service.createV2(this.proyecto).subscribe(
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

  listar() {
    this._service.getProjects().subscribe((lista: Array<Project>) => console.log(lista));
  }

}
