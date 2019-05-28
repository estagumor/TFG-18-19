import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service'

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
    responsive: true,
    scales: {
      xAxes: [{
        display: true,
        ticks: {
          beginAtZero: true
        }
      }]
    }
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

  //Deja introducir el anyo de estudio para el gráfico
  public sOptions = []
  //TODO poner un input para elegir el anyo
  public anyo: Date;

  constructor(
    //Declaramos el servicio para utilizarlo mas adelante
    public _service: ProjectService
  ) { }

  ngOnInit() {
    this._service.getProjects().subscribe((projs) => {
      //Guardamos los proyectos y rellenamos los años
      this.projects = projs.body['projects']
    })
  }

  actualiza() {
    console.log(this.anyo)
    this.projects.forEach((proj) => {
      /* FINANCIACION MEDIA 
         EL COUNT NOS SIRVE PARA EL NUMERO DE PROYECTOS ACTIVOS CADA MES */
      //Vamos a obtener la fecha, volverla usable y a partir de ahi trabajar
      //es de tipo string, tenemos que convertirla a date para trabajar con ella
      let startDate;
      let endDate;
      if(proj.startDate != undefined) {
        startDate = new Date(proj.startDate)

        if(proj.endDate != undefined) {
          endDate = new Date(proj.endDate.toString())
        } else {
          endDate = new Date()
        }

        //Milisegundos que tiene un dia
        let one_day = 1000 * 60 * 60 * 24
        //diferencia en milisegundos
        let difference = endDate.getTime() - startDate.getTime()
        //diferencia en dias
        let dias = Math.round(difference / one_day)
        let financXdia = Math.round(proj.amount / dias)
        if (startDate.getFullYear() == this.anyo['year']) {
          if (endDate.getFullYear() == this.anyo['year']) { //comprobamos que el anyo de finalizacion no sea tambien el mismo
            let i;
            for (i = startDate.getMonth(); i <= endDate.getMonth(); i++) {
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
            for (i = startDate.getMonth(); i <= 11; i++) {
              if (i == startDate.getMonth()) { //primer mes
                this.avgAm[i] += financXdia * startDate.getDate()
              } else {
                this.avgAm[i] += financXdia * 30
              }
              this.count[i] += 1
            }
          }
        } else if (startDate.getFullYear() < this.anyo['year']) { //Solo tenemos que comprobar que el anyo de finalización sea o no el mismo 
          if (endDate.getFullYear() == this.anyo['year']) { //comprobamos que el anyo de finalizacion no sea el mismo
            let i;
            for (i = 0; i <= endDate.getMonth(); i++) {
              if (i == endDate.getMonth()) { //ultimo mes
                this.avgAm[i] += financXdia * endDate.getDate()
              } else {
                this.avgAm[i] += financXdia * 30
              }
              this.count[i] += 1
            }
          } else if (endDate.getFullYear() > this.anyo['year']) {
            let i;
            for (i = 0; i <= 11; i++) {
              this.avgAm[i] += financXdia * 30
              this.count[i] += 1
            }
          }
        }
      } //Si no tiene fecha de inicio pasamos de el
    })
    this.barChartData = [
      { data: [this.avgAm[0] / this.count[0], this.avgAm[1] / this.count[1], this.avgAm[2] / this.count[2], this.avgAm[3] / this.count[3], this.avgAm[4] / this.count[4], this.avgAm[5] / this.count[5], this.avgAm[6] / this.count[6], this.avgAm[7] / this.count[7], this.avgAm[8] / this.count[8], this.avgAm[9] / this.count[9], this.avgAm[10] / this.count[10], this.avgAm[11] / this.count[11]], label: "Financiación media" }
    ]
    this.barChartData2 = [
      { data: [this.count[0], this.count[1], this.count[2], this.count[3], this.count[4], this.count[5], this.count[6], this.count[7], this.count[8], this.count[9], this.count[10], this.count[11]], label: "Número de proyectos" }
    ]
  }
}
