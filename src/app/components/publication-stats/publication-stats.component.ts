import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/models/publication';
import { PublicationService } from 'src/app/services/publication.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-publication-stats',
  templateUrl: './publication-stats.component.html',
  styleUrls: ['./publication-stats.component.css']
})
export class PublicationStatsComponent implements OnInit {
  public projectId: string

  public publications: Array<Publication> = []
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      labels: { fontColor: '#000000'}
    },
    // scales: {
    //   xAxes: [{
    //     ticks: { fontColor: '#1b7665' },
    //     gridLines: { color: '#b7a99e' }
    //   }],
    //   yAxes: [{
    //     ticks: { fontColor: '#1b7665' },
    //     gridLines: { color: '#b7a99e' }
    //   }]
    // }
  };

  public barChartColors: Color[] = [
    {
      backgroundColor: '#f47c3c',
      // borderColor: '#185d62'
    }
  ]

  public barChartLabels = ['Q1','Q2','Q3','Q4']
  public barChartLabels2 = ['A++','A+','A','A-', 'B', 'B-', 'C']
  public barChartType = 'bar'
  public barChartLegend = true;

  public Q1: Array<Publication> = [];
  public Q2: Array<Publication> = [];
  public Q3: Array<Publication> = [];
  public Q4: Array<Publication> = [];

  public cat1: Array<Publication> = [];
  public cat2: Array<Publication> = [];
  public cat3: Array<Publication> = [];
  public cat4: Array<Publication> = [];
  public cat5: Array<Publication> = [];
  public cat6: Array<Publication> = [];
  public cat7: Array<Publication> = [];

  public barChartData = [{data: [], label: "Revistas"}];
  public barChartData2 = [{data: [], label: "Congresos"}];

  constructor(
    private activatedRoute: ActivatedRoute,
    public _service: PublicationService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      this.projectId = params['id']
      if(this.projectId == undefined){
        this._service.list().subscribe((pubs) => {
          this.publications = pubs.body['pubs']
          this.publications.forEach((pub) => {
            if(pub.sourceType=="Journal"){
              switch(pub.quartil){
                case "Q1":
                  this.Q1.push(pub)
                  break;
                case "Q2":
                  this.Q2.push(pub)
                  break;
                case "Q3":
                  this.Q3.push(pub)
                  break;
                case "Q4":
                  this.Q4.push(pub)
                  break;
                default:
                  break;
              }
            } else if (pub.sourceType.indexOf("Conference") != -1){
              switch(pub.congress){
                case "A++":
                  this.cat1.push(pub)
                  break;
                case "A+":
                  this.cat2.push(pub)
                  break;
                case "A":
                  this.cat3.push(pub)
                  break;
                case "A-":
                  this.cat4.push(pub)
                  break;
                case "B":
                  this.cat5.push(pub)
                  break;
                case "B-":
                  this.cat6.push(pub)
                  break;
                case "C":
                  this.cat7.push(pub)
                  break;
                default:
                  break;
            }
          }})
          this.barChartData = [
            {data: [this.Q1.length,this.Q2.length,this.Q3.length,this.Q4.length], label: "Journals"}
          ]
          this.barChartData2 = [
            {data: [this.cat1.length,this.cat2.length,this.cat3.length,this.cat4.length,this.cat5.length,this.cat6.length,this.cat7.length], label: "Congress"}
          ]
        })
      } else {
        this._service.filterByProject(this.projectId).subscribe((pubs) => {
          this.publications = pubs.body['pubs']
          this.publications.forEach((pub) => {
            if(pub.sourceType=="Journal"){
              switch(pub.quartil){
                case "Q1":
                  this.Q1.push(pub)
                  break;
                case "Q2":
                  this.Q2.push(pub)
                  break;
                case "Q3":
                  this.Q3.push(pub)
                  break;
                case "Q4":
                  this.Q4.push(pub)
                  break;
                default:
                  break;
              }
            } else if (pub.sourceType.indexOf("Conference") != -1){
              switch(pub.congress){
                case "A++":
                  this.cat1.push(pub)
                  break;
                case "A+":
                  this.cat2.push(pub)
                  break;
                case "A":
                  this.cat3.push(pub)
                  break;
                case "A-":
                  this.cat4.push(pub)
                  break;
                case "B":
                  this.cat5.push(pub)
                  break;
                case "B-":
                  this.cat6.push(pub)
                  break;
                case "C":
                  this.cat7.push(pub)
                  break;
                default:
                  break;
            }
          }})
          this.barChartData = [
            {data: [this.Q1.length,this.Q2.length,this.Q3.length,this.Q4.length], label: "Revistas"}
          ]
          this.barChartData2 = [
            {data: [this.cat1.length,this.cat2.length,this.cat3.length,this.cat4.length,this.cat5.length,this.cat6.length,this.cat7.length], label: "Congresos"}
          ]
        })
      }
    })
  }
}

