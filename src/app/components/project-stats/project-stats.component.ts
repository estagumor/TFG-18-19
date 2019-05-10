import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-stats',
  templateUrl: './project-stats.component.html',
  styleUrls: ['./project-stats.component.css']
})
export class ProjectStatsComponent implements OnInit {
  //Guardamos los proyectos en una variable para no volver
  //a pedirlos a servicio 
  public projects: Array<Project> = []
  //Le ponemos las opciones al chart
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  //Vamos a ir rellenandolos conforme recorramos los
  //proyectos
  public barChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  public barChartType = 'horizontalBar'
  public barChartLegend = true; 

  //Guarda el numero de proyectos activos en cada mes
  public janAct: 0;
  public febAct: 0;
  public marAct: 0;
  public aprAct: 0;
  public mayAct: 0;
  public junAct: 0;
  public julAct: 0;
  public augAct: 0;
  public sepAct: 0;
  public octAct: 0;
  public novAct: 0;
  public decAct: 0;

  //Guarda la suma de la financiacion y el numero cada mes
  public janAvgAm: [0,0];
  public febAvgAm: [0,0];
  public marAvgAm: [0,0];
  public aprAvgAm: [0,0];
  public mayAvgAm: [0,0];
  public junAvgAm: [0,0];
  public julAvgAm: [0,0];
  public augAvgAm: [0,0];
  public sepAvgAm: [0,0];
  public octAvgAm: [0,0];
  public novAvgAm: [0,0];
  public decAvgAm: [0,0];

  //Identifica los barChart
  public barChartData = [{data: [], label: "Actives"}]
  public barChartData2 = [{data: [], label: "Average-amount"}]

  constructor(
    //Declaramos el servicio para utilizarlo mas adelante
    public _service: ProjectService
  ) { }

  ngOnInit() {
    this._service.getProjects().subscribe((projs) => {
      this.projects = projs.body['project']
      this.projects.forEach((proj) => {
        //Vamos a obtener la fecha, volverla usable y a partir de ahi trabajar
        //es de tipo string, tenemos que convertirla a date para trabajar con ella
        let startDate = new Date(proj.startDate)
        // let endDate = new Date(proj.endDate)

      })
    })
  }

}
