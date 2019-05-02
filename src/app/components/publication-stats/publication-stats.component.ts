import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/models/publication';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-publication-stats',
  templateUrl: './publication-stats.component.html',
  styleUrls: ['./publication-stats.component.css']
})
export class PublicationStatsComponent implements OnInit {
  public publications: Array<Publication> = []
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Q1','Q2','Q3','Q4']
  public barChartType = 'bar'
  public barChartLegend = true;

  public Q1: Array<Publication> = [];
  public Q2: Array<Publication> = [];
  public Q3: Array<Publication> = [];
  public Q4: Array<Publication> = [];

  public barChartData = [];

  constructor(
    public _service: PublicationService
  ) { }

  ngOnInit() {
    this._service.list().subscribe((pubs) => {
      console.log(pubs)
      this.publications = pubs.body['pubs']
      this.publications.forEach((pub) => {
        console.log(pub.quartil)
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
      })
      this.barChartData = [
        {data: [this.Q1.length,this.Q2.length,this.Q3.length,this.Q4.length], label: "Journals"}
      ]
    })
  }
}

