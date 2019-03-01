import { Component, OnInit } from '@angular/core';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  providers: [PublicationService]
})
export class PublicationsComponent implements OnInit {
  public pub: Publication
  constructor(
    private _service: PublicationService
  ) {
    this.pub = new Publication('','','','','',null,'','',null,'','','','',false)
   }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this._service.create(this.pub).subscribe(
      result => {
        form.resetForm()
      }, 
      error=>{
        console.log(error)
      }
    )
  }

}
