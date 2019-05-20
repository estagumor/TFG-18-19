import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { isString } from '@ng-bootstrap/ng-bootstrap/util/util';

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

  //Guarda la suma de la financiacion y el numero cada mes
  public avgAm = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  public count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //Identifica los barChart
  public barChartData = [{ data: [], label: "Actives" }]
  public barChartData2 = [{ data: [], label: "Average-amount" }]

  //Deja introducir el año de estudio para el gráfico
  //TODO poner un input para elegir el año
  public año: number = 2018;

  constructor(
    //Declaramos el servicio para utilizarlo mas adelante
    public _service: ProjectService
  ) { }

  ngOnInit() {
    this._service.getProjects().subscribe((projs) => {
      //TODO no me encuentra los proyectos, revisar esto
      this.projects = projs.body['project']
      this.projects.forEach((proj) => {
        /* FINANCIACION MEDIA 
           EL COUNT NOS SIRVE PARA EL NUMERO DE PROYECTOS ACTIVOS CADA MES */
        //Vamos a obtener la fecha, volverla usable y a partir de ahi trabajar
        //es de tipo string, tenemos que convertirla a date para trabajar con ella
        let startDate = new Date(proj.startDate)
        let endDate = new Date(proj.endDate.toString())
        //Milisegundos que tiene un dia
        let one_day = 1000 * 60 * 60 * 24
        //diferencia en milisegundos
        let difference = endDate.getTime() - startDate.getTime()
        //diferencia en dias
        let dias = Math.round(difference / one_day)
        let financXdia = Math.round(proj.amount / dias)

        if (startDate.getFullYear() == this.año) {
          if (endDate.getFullYear() == this.año) { //comprobamos que el año de finalizacion no sea tambien el mismo
            let i;
            for (i = startDate.getMonth(); i == endDate.getMonth(); i++) {
              if (i == startDate.getMonth()) { //primer mes
                this.avgAm[i] += financXdia * startDate.getDate()
              } else if (i == endDate.getMonth()) { //ultimo mes
                this.avgAm[i] += financXdia * endDate.getDate()
              } else {
                this.avgAm[i] += financXdia * 30
              }
              this.count[i] += 1
            }
          } else {
            let i;
            for (i = startDate.getMonth(); i == 11; i++) {
              if (i == startDate.getMonth()) { //primer mes
                this.avgAm[i] += financXdia * startDate.getDate()
              } else {
                this.avgAm[i] += financXdia * 30
              }
              this.count[i] += 1
            }
          }
        } else { //Solo tenemos que comprobar que el año de finalización sea o no el mismo 
          if (endDate.getFullYear() == this.año) { //comprobamos que el año de finalizacion no sea el mismo
            let i;
            for (i = 0; i == endDate.getMonth(); i++) {
              if (i == endDate.getMonth()) { //ultimo mes
                this.avgAm[i] += financXdia * endDate.getDate()
              } else {
                this.avgAm[i] += financXdia * 30
              }
              this.count[i] += 1
            }
          } else {
            let i;
            for (i = 0; i == 11; i++) {
              this.avgAm[i] += financXdia * 30
              this.count[i] += 1
            }
          }
        }
      })
    })
    this.barChartData = [
      { data: [this.avgAm[0] / this.count[0], this.avgAm[1] / this.count[1], this.avgAm[2] / this.count[2], this.avgAm[3] / this.count[3], this.avgAm[4] / this.count[4], this.avgAm[5] / this.count[5], this.avgAm[6] / this.count[6], this.avgAm[7] / this.count[7], this.avgAm[8] / this.count[8], this.avgAm[9] / this.count[9], this.avgAm[10] / this.count[10], this.avgAm[11] / this.count[11]], label: "Financiación media" }
    ]
    this.barChartData2 = [
      { data: [this.count[0], this.count[1], this.count[2], this.count[3], this.count[4], this.count[5], this.count[6], this.count[7], this.count[8], this.count[9], this.count[10], this.count[11]], label: "Número de proyectos" }
    ]
  }

}
