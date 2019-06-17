import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/models/publication';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PublicationService } from 'src/app/services/publication.service';
import { MatDialog } from '@angular/material';
 
@Component({
  selector: 'app-publication-display',
  templateUrl: './publication-display.component.html',
  styleUrls: ['./publication-display.component.css']
})
export class PublicationDisplayComponent implements OnInit {
  public publication: Publication;
  public id: string;
  // public publications: Array<Publication> = [];
  // public clicked: boolean = false;
  
  constructor(    
    private activatedRoute: ActivatedRoute,
    private publicationService: PublicationService,
    private route: Router,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      this.id = params['id'];
      this.publicationService.getPublication(this.id).subscribe(pub => {
        if(pub) {
          //TODO who knows? :D
          console.log(pub)
          this.publication = pub.body['pub']
          console.log(this.publication)
        } else {
          this.route.navigate(['/publications'])
        }
      });
    });
  }

  editpublication() {
    this.route.navigate(['publication/' + this.id])
  }

}
