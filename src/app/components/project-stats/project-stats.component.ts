import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service'
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-project-stats',
  templateUrl: './project-stats.component.html',
  styleUrls: ['./project-stats.component.css']
})
export class ProjectStatsComponent implements OnInit {
  //Guardamos los proyectos en una variable para no volver
  //a pedirlos a servicio 
  public projects: Array<Project> = []

  //Año actual
  public anyo: number = new Date().getFullYear();

  //Le ponemos las opciones al chart
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  public barChartColors: Color[] = [
    {
      backgroundColor: '#f47c3c',
      // borderColor: '#185d62'
    }
  ]

  //Vamos a ir rellenandolos conforme recorramos los
  //proyectos
  public barChartLabels = [this.anyo.toString() + ' FS', this.anyo.toString() + ' SS',
  (this.anyo - 1).toString() + ' FS', (this.anyo - 1).toString() + ' SS',
  (this.anyo - 2).toString() + ' FS', (this.anyo - 2).toString() + ' SS',
  (this.anyo - 3).toString() + ' FS', (this.anyo - 3).toString() + ' SS',
  (this.anyo - 4).toString() + ' FS', (this.anyo - 4).toString() + ' SS',
  (this.anyo - 5).toString() + ' FS', (this.anyo - 5).toString() + ' SS',
  (this.anyo - 6).toString() + ' FS', (this.anyo - 6).toString() + ' SS',
  (this.anyo - 7).toString() + ' FS', (this.anyo - 7).toString() + ' SS',
  (this.anyo - 8).toString() + ' FS', (this.anyo - 8).toString() + ' SS',
  (this.anyo - 9).toString() + ' FS', (this.anyo - 9).toString() + ' SS']

  public barChartType = 'bar'
  public barChartLegend = true;

  //Guarda la suma de la financiacion y el numero cada mes
  public avgAm = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  public count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //Identifica los barChart
  public barChartData = [{ data: [], label: "Actives" }]
  public barChartData2 = [{ data: [], label: "Average-amount" }]
  public string: string;

  constructor(
    //Declaramos el servicio para utilizarlo mas adelante
    public _service: ProjectService
  ) { }

  daysOfMonth(month) {
    var days = {
      0: 31,
      1: 28,
      2: 31,
      3: 30,
      4: 31,
      5: 30,
      6: 31,
      7: 31,
      8: 30,
      9: 31,
      10: 30,
      11: 31,
    };
    return days[month]
  }

  ngOnInit() {
    this._service.getNewsProjects().subscribe((projs) => {
      //Guardamos los proyectos y rellenamos los años
      this.projects = projs.body['projects']
      this.projects.forEach((proj) => {
        /* FINANCIACION MEDIA 
           EL COUNT NOS SIRVE PARA EL NUMERO DE PROYECTOS ACTIVOS CADA MES */
        //Vamos a obtener la fecha, volverla usable y a partir de ahi trabajar
        //es de tipo string, tenemos que convertirla a date para trabajar con ella
        let startDate;
        let endDate;
        if (proj.startDate != undefined) {
          if (proj.startDate instanceof Date) {
            startDate = proj.startDate
          } else if (typeof(proj.startDate) == "string") {
            startDate = new Date(proj.startDate.toString())
          } else {
            startDate = new Date(proj.startDate["month"], proj.startDate["day"], proj.startDate["year"])
          }
          if (proj.endDate != undefined) {
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
          for (let a = 0; a < 10; a++) { //Recorremos los 10 años
            let anyoActual = this.anyo - a
            if (startDate.getFullYear() > anyoActual) {
              break;
            } else if (startDate.getFullYear() == anyoActual) {
              if (endDate.getFullYear() == anyoActual) { //comprobamos que el anyo de finalizacion no sea tambien el mismo
                if (startDate.getMonth() <= 5) {
                  if (endDate.getMonth() <= 5) { //Empieza y termina en el primer semestre 
                    let mesesEnteros = 0
                    if(endDate.getMonth() - startDate.getMonth() != 1) {
                      mesesEnteros = (endDate.getMonth() - startDate.getMonth()) - 1
                    }
                    this.avgAm[a + a] += (financXdia * mesesEnteros * 30) + financXdia * endDate.getDate() + financXdia * (this.daysOfMonth(startDate.getMonth()) - startDate.getDate())
                    this.count[a + a] += 1
                  } else { //Empieza en el primer semestre y termina en el segundo COMPROBADO
                    if(5 - startDate.getMonth() == 0) {
                      this.avgAm[a + a] += financXdia * (this.daysOfMonth(startDate.getMonth()) - startDate.getDate())
                    } else {
                      this.avgAm[a + a] += (financXdia * (5 - startDate.getMonth()) * 30) + financXdia * (this.daysOfMonth(startDate.getMonth()) - startDate.getDate())
                    }
                    this.count[a + a] += 1
                    if(endDate.getMonth()-6 == 0) {
                      this.avgAm[a + a + 1] += financXdia * endDate.getDate()
                    } else {
                      this.avgAm[a + a + 1] += (financXdia * (endDate.getMonth() - 6) * 30) + financXdia * endDate.getDate()
                    }
                    this.count[a + a + 1] += 1
                  }
                }
              } else { //El año de finalización es mayor al año actual 
                if (startDate.getMonth() <= 5) { //Primer y segundo semestre COMPROBADO
                  if(5 - startDate.getMonth() == 0) {
                    this.avgAm[a + a] += financXdia * (this.daysOfMonth(startDate.getMonth()) - startDate.getDate())
                  } else {
                    this.avgAm[a + a] += (financXdia * (5 - startDate.getMonth()) * 30) + financXdia * (this.daysOfMonth(startDate.getMonth()) - startDate.getDate())
                  }
                  this.count[a + a] += 1
                  this.avgAm[a + a + 1] += (financXdia * 6 * 30)
                  this.count[a + a + 1] += 1
                } else { //Solo segundo semestre COMPROBADO
                  if(startDate.getMonth()-6 == 0) {
                    this.avgAm[a + a + 1] = financXdia * (this.daysOfMonth(startDate.getMonth()) - startDate.getDate())
                  } else {
                    this.avgAm[a + a + 1] += (financXdia * (startDate.getMonth() - 6) * 30) + financXdia * (this.daysOfMonth(startDate.getMonth()) - startDate.getDate())
                  }
                  this.count[a + a + 1] += 1
                }
              }
            } else if (startDate.getFullYear() < anyoActual) { //Solo tenemos que comprobar que el anyo de finalización sea o no el mismo 
              if (endDate.getFullYear() == anyoActual) { //comprobamos que el anyo de finalizacion no sea el mismo
                if (endDate.getMonth() <= 5) { //Primer semestre COMPROBADO
                  if(5 - endDate.getMonth() == 0) {
                    this.avgAm[a + a] += financXdia * endDate.getDate()
                  } else {
                    this.avgAm[a + a] += (financXdia * endDate.getMonth() * 30) + financXdia * endDate.getDate()
                  }
                  this.count[a + a] += 1
                } else { //Primer y segundo semestre COMPROBADO
                  this.avgAm[a + a] += (financXdia * 6 * 30)
                  this.count[a + a] += 1
                  if(endDate.getMonth()-6 == 0) {
                    this.avgAm[a + a + 1] += financXdia * endDate.getDate()
                  } else {
                    this.avgAm[a + a + 1] += (financXdia * (endDate.getMonth() - 6) * 30) + financXdia * endDate.getDate()
                  }
                  
                  this.count[a + a + 1] += 1
                }
              } else if (endDate.getFullYear() > anyoActual) { //Dura todo el año COMPROBADO
                this.avgAm[a + a] += (financXdia * 6 * 30)
                this.count[a + a] += 1
                this.avgAm[a + a + 1] += (financXdia * 6 * 30)
                this.count[a + a + 1] += 1
              }
            }
          } //Si no tiene fecha de inicio pasamos de el
        }
      })
      console.log(this.avgAm);
      console.log(this.count);
      this.barChartData = [
        {
          data: [this.avgAm[0] / this.count[0], this.avgAm[1] / this.count[1], this.avgAm[2] / this.count[2],
          this.avgAm[3] / this.count[3], this.avgAm[4] / this.count[4], this.avgAm[5] / this.count[5],
          this.avgAm[6] / this.count[6], this.avgAm[7] / this.count[7], this.avgAm[8] / this.count[8],
          this.avgAm[9] / this.count[9], this.avgAm[10] / this.count[10], this.avgAm[11] / this.count[11],
          this.avgAm[12] / this.count[12], this.avgAm[13] / this.count[13], this.avgAm[14] / this.count[14],
          this.avgAm[15] / this.count[15], this.avgAm[16] / this.count[16], this.avgAm[17] / this.count[17],
          this.avgAm[18] / this.count[18], this.avgAm[19] / this.count[19]], label: "Financiación media"
        }
      ]
      this.barChartData2 = [
        {
          data: [this.count[0], this.count[1], this.count[2], this.count[3], this.count[4], this.count[5],
          this.count[6], this.count[7], this.count[8], this.count[9], this.count[10], this.count[11],
          this.count[12], this.count[13], this.count[14], this.count[15], this.count[16], this.count[17],
          this.count[18], this.count[19]], label: "Número de proyectos"
        }
      ]
    })
  }
}
