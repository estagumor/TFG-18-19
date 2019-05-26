import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private pubService: PublicationService
  ) { }

  ngOnInit() {
  }

  enviarCongresos(input){
    // TODO Quitar esto
    console.log(input.files[0]);
    var reader = new FileReader()
    reader.readAsDataURL(input.files[0])
    reader.addEventListener("load", ()=>{
      this.pubService.sendExcel("congreso", reader.result, input.files[0].name).subscribe((response) => {
      // TODO Quitar esto
      console.log(response);
    })
    })
    
  }

}
