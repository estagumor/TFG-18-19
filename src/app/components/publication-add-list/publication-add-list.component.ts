import { Component, OnInit, Input } from '@angular/core';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { ScopusService } from '../../services/scopus.service';
import { NgControl } from '@angular/forms'
import { DisplayComponent } from '../display/display.component'
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-publication-add-list',
  templateUrl: './publication-add-list.component.html',
  styleUrls: ['./publication-add-list.component.css'],
  providers: [PublicationService, ScopusService]
})
export class PublicationAddListComponent implements OnInit {
  public listado: Array<Publication> = []
  public showDisplay: boolean = true;
  public selectedPub: Publication
  public fields
  public pubsToSave: Array<Publication> = [];
  @Input() projectId: String

  constructor(
    private _service: PublicationService,
    private _scopus: ScopusService,
    public dialog: MatDialog,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    // this._service.list().subscribe((data: Publication[]) => {
    //   this.listado = data['pubs'];
      
    // })
    this.projectId = this._route.snapshot.paramMap.get('id');
    this._scopus.getPubs().subscribe((data) => {
      this._service.filterNewPublications(data).subscribe((nuevos) => {
        this.listado = nuevos['pubs'];
        console.log(this.listado);
        
      })
    })
  }

  openDialog(pub): void {
    const dialogRef = this.dialog.open(DisplayComponent, {
      width: '50%',
      data: { objeto: pub, fields: Publication.getFields()}
    });
    // console.log(pub._id)
  }

  clicked(obj,pub) {
    obj.checked ? obj.parentElement.parentElement.parentElement.className = "selected" : obj.parentElement.parentElement.parentElement.className = ""
    if(obj.checked){
      this.pubsToSave.push(pub)
    } else {
      this.pubsToSave = this.pubsToSave.filter(p => p!=pub)
    }
  }

  saveFromScoups() {
    this._service.saveAll(this.pubsToSave, this.projectId).subscribe(data => {
      this._router.navigateByUrl('/project'+"/"+this.projectId+"/"+'publications')
      
    },err => {
      console.log(err);
      
    })
  }

}
