import { Component, ElementRef,ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';

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
  
  //IMPROVES
  public duration: string = "1";

  constructor(
    private _route: ActivatedRoute, // Para señalar el link del menu que esta activo
    private _router: Router, // Para hacer el menu de navegacion
    private _service: ProjectService // El servicio que hace las peticiones al backend
  ) {
    this.project = new Project([], [], [], '', '', [], '', '', '', '', null, null, null, [], []);
  }
 
  ngOnInit() {
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $("#fecha").css("height", $("#endDate").css("height"));
      $('.btn-filter').on('click', function () {
        var $target = $(this).data('target');
        if ($target != 'all') {
          $('.table tr').css('display', 'none');
          $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
        } else {
          $('.table tr').css('display', 'none').fadeIn('slow');
        }
      });
    });
    $(window).on("load", function () {
      $("#fecha").css("height", "27px");
    });
  }

  onSubmit() {
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

  findByReference(reference: String): Project {
    let pro;
    this._service.findByReference(reference).subscribe(result =>  {
      this.contenedor = result['project']; 
    });
    return pro;
  }

  findByTitle(title: String): Project {
    let pro;
    this._service.findByTitle(title).subscribe(result =>  {
      this.contenedor = result['project']; 
    });
    return pro;
  }

  actualizarLista() {
    this.listado = [];
    this.finalSearch.forEach(element => {
      if(!this.findByReference(element) == undefined) {
        console.log("titulo " + this.findByTitle(element));
      } else {
        console.log("referencia " + this.findByReference(element));
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
    });
  }

  listar(bool) {
    if(bool == true) {
      this._service.getProjects().subscribe((lista) => {
        this.listado = lista;
        this.listado.forEach(element => {
          this.search.push(element.reference);
          this.search.push(element.title);
        });
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
