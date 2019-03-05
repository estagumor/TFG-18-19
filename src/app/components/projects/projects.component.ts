import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import 'rxjs/add/operator/map';
import { NgForm } from '@angular/forms'
import { DisplayComponent } from '../display/display.component';
import { MatDialog } from '@angular/material';
import { Observable } from "rxjs/Rx";

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {

  public showDisplay: boolean = true;
  public selectedPro: Project
  public fields

  //AUTOCOMPLETE
  public researchers: string[] = ['Javier Troya', 'Carlos Muller', 'Jose A. Parejo', 'Manuel Resinas']; // La lista que sale en el input al escribir
  public hireds: string[] = [];
  public finalResearchers: string[] = [];
  public finalWorkers: string[] = [];
  public finalHireds: string[] = [];
  public finalLeaders: string[] = [];
  public search: String[] = [];
  public finalSearch: String[] = [];

  public project: Project;
  public responseFind: Project;
  public responseCreate: Project;
  public contenedor: Project; //Se usa en el buscador
  public projectId: any;
  public projectId2: any;
  public listado: Array<Project>; // La variable donde se guarda la lista y despues sale por consola
  public listado2: Array<Project>;

  //IMPROVES
  public duration: string = "1";

  constructor(
    private _route: ActivatedRoute, // Para señalar el link del menu que esta activo
    private _router: Router, // Para hacer el menu de navegacion
    private _service: ProjectService, // El servicio que hace las peticiones al backend
    public dialog: MatDialog
  ) {
    this.project = new Project([], [], [], '', '', [], '', '', '', '', null, null, null, [], []);
  }

  ngOnInit() {
  }

  boton(b) {
    if (b.localeCompare("all") == 0)
      this.listado2 = this.listado.slice()
    else
      this.listado2 = this.listado.filter((pro) => this.getStatus(pro).localeCompare(b) == 0)
  }

  onSubmit(form: NgForm) {
    this.responseCreate = new Project([], [], [], '', '', [], '', '', '', '', null, null, null, [], []); // Instancia para guardar el resultado
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
    if (this.project.relatedPublications != null)
      this.project.relatedPublications = [];
    if (this.project.relatedTools != null)
      this.project.relatedTools = this.project.relatedTools.toString().split(",");
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

  findByReference(reference: String): Observable<Project> {
    return this._service.findByReference(reference);

  }

  findByTitle(title: String): Observable<Project> {
    return this._service.findByTitle(title);
  }

  actualizarLista() {
    this.listado = [];
    this.listado2 = [];
    if (this.finalSearch.length < 1) {
      // console.log("todos")
      this.listar(true)
    } else {
      this.finalSearch.forEach(element => {
        // console.log("Project.ts - > Este es el elemento que le llega " + element);
        //if (!this.findByReference(element) == undefined) {
          // console.log("Camino referencia")
          this.findByReference(element).subscribe(result => {
            this.listado2 = this.listado2.concat(result['projects']);
            // console.log("Project.ts -> referencia " + this.listado2);
          });
        //} else {
          // console.log("Camino titulo");
          this.findByTitle(element).subscribe(result => {
            this.listado2 = this.listado2.concat(result['projects']);
            // console.log("Project.ts -> titulo " + this.listado2);
          });
        //}
      });
    }
  }
  /*
    try { //Por referencia
      this.listado.push(this.findByReference(element));
      console.log("Primer camino tomado: " + this.findByReference(element));
    } catch (error) { //Por nombre
      this.listado.push(this.findByTitle(element));
      console.log("Segundo camino tomado: " + this.findByTitle(element));
    }
    */


  listar(bool) {
    if (bool == true) {
      this.search = [];
      this._service.getProjects().subscribe((lista) => {
        this.listado = lista;
        this.listado.forEach(element => {
          this.search.push(element.reference);
          this.search.push(element.title);
        });
        this.listado2 = this.listado.slice()
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
    if (time <= 0) {
      return "activo";
    } else if (time <= 3 && time > 0) {
      return "tres";
    } else {
      return "cinco";
    }
  }

  openDialog(pro): void {
    const dialogRef = this.dialog.open(DisplayComponent, {
      width: '50%',
      data: { objeto: pro, fields: Project.getFields() }
    });
  }
}
