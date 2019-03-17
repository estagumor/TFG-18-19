import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Observable } from "rxjs/Rx";
import { Project } from '../../models/project';
import { DisplayComponent } from '../display/display.component';
import { MatDialog } from '@angular/material';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  
  public showDisplay: boolean = true;
  public selectedPro: Project
  public fields
  
  public listado: Array<Project>; // La variable donde se guarda la lista y despues sale por consola
  public listado2: Array<Project>;
  public search: String[] = [];
  public finalSearch: String[] = [];

  public projectId2: any;

  constructor(
    private _route: ActivatedRoute, // Para señalar el link del menu que esta activo
    private _router: Router, // Para hacer el menu de navegacion
    private _service: ProjectService, // El servicio que hace las peticiones al backend
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this._service.getProjects().subscribe((lista) => {
      this.listado = lista.body['projects'];
      
      this.listado.forEach(element => {
        this.search.push(element.reference);
        this.search.push(element.title);
      });
      this.listado2 = this.listado.slice()
    });
  }

  findByReference(reference: String): Observable<HttpResponse<any>> {
    return this._service.findByReference(reference);

  }

  findByTitle(title: String): Observable<HttpResponse<any>>  {
    return this._service.findByTitle(title);
  }

  boton(b) {
    if (b.localeCompare("all") == 0)
      this.listado2 = this.listado.slice()
    else
      this.listado2 = this.listado.filter((pro) => this.getStatus(pro).localeCompare(b) == 0)
  }

  /*
  delete() {
    if (confirm('¿Esta seguro?')) {
      this._service.deleteProject(this.projectId2).subscribe((response) => console.log(response));
      let temp = this.findById(this.projectId2);
      this.listado = this.listado.filter(h => h !== temp);
    }
  }*/

  openDialog(pro): void {
    this.selectedPro = pro;
    const dialogRef = this.dialog.open(DisplayComponent, {
      width: '50%',
      data: { objeto: pro, fields: {title: 'Título', leader: 'Responsables', researchTeam: 'Equipo de investigación', amount: 'Importe'}}
    });
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
        this.findByReference(element).subscribe((result => {
          this.listado2 = this.listado2.concat(result.body['projects']);
          // console.log("Project.ts -> referencia " + this.listado2);
        }));
        //} else {
        // console.log("Camino titulo");
        this.findByTitle(element).subscribe(result => {
          this.listado2 = this.listado2.concat(result.body['projects']);
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
        this.listado = lista.body;
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

  displayProject(id) {
      if (id !== undefined) {
        this._service.getProject(id).subscribe(result => {
          // console.log(project)
          let project = result.body
          if(project) {
            this.selectedPro = project
            this._router.navigate(['project/display/' + id])
          }else {
            //TODO Añadir aviso de error.
            //En principio está pensado como una ventana desplegable, usando el display y 
            //cambiandole las clases CSS
            this._router.navigate(['/projects'])
          }});
      } else {
        this._router.navigate(['/projects']) //Goes to the list of projects
      }
    };  
}
