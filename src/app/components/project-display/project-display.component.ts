import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { Publication } from '../../models/publication';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { PublicationService } from '../../services/publication.service';
import { MatDialog } from '@angular/material';
import { DisplayComponent } from '../display/display.component';

@Component({
  selector: 'app-project-display',
  templateUrl: './project-display.component.html',
  styleUrls: ['./project-display.component.css']
})
export class ProjectDisplayComponent implements OnInit {
  public project: Project;
  public id: string;
  public publications: Array<Publication> = [];
  public clicked: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private publicationService: PublicationService,
    private route: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      this.id = params['id'];
      this.projectService.getProject(this.id).subscribe(project => {
        if(project) {
          this.project = project.body['project']
          this.publicationService.filterByProject(this.id).subscribe(publication => {
            this.publications = publication.body['pubs'];
          }, err => {
            console.log(err);
          });
        }else {
          //TODO Añadir aviso de error.
          //En principio está pensado como una ventana desplegable, usando el display y 
          //cambiandole las clases CSS
          this.route.navigate(['/projects'])
        }
      });
    });
  }

  editProject() {
    this.route.navigate(['/project/' + this.id])
  }

  deleteProject() {
    this.projectService.deleteProject(this.id).subscribe(s => {
      this.route.navigate(['/projects'])
    });
  }

  showPublications(){
    if(this.clicked){
      this.clicked = false;
    } else {
      this.clicked = true;
    }
  }

  openDialog(publication): void {
    const dialogRef = this.dialog.open(DisplayComponent, {
      width: '50%',
      data: { objeto: publication, fields: {articleTitle: 'Título', firstAuthor: 'Autores', sourceTitle: 'Publicado en', sourceVolume: 'Volumen', publicationDate: 'Fecha de publicación'}}
    });
  }

}
