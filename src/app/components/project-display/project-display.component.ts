import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-display',
  templateUrl: './project-display.component.html',
  styleUrls: ['./project-display.component.css']
})
export class ProjectDisplayComponent implements OnInit {
  public project: Project;
  public id: string;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private route: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      if(params['id'] !== undefined) {
        this.id = params['id'];
        this.projectService.getProject(this.id).subscribe(project => {
          if(project) {
            this.project = project.body['project']
          }else {
            //TODO Añadir aviso de error.
            //En principio está pensado como una ventana desplegable, usando el display y 
            //cambiandole las clases CSS
            this.route.navigate(['/projects'])
          }});
      } else {
        this.route.navigate(['/projects']) //Goes to the list of projects
      }
    });
  }

  addPublications() {
    this.route.navigate(['project/' + this.id + '/publication'])
  }

  editProject() {
    this.route.navigate(['project/' + this.id])
  }

  deleteProject() {
    this.projectService.deleteProject(this.id).subscribe(s => {
      this.route.navigate(['projects'])
    });
  }
}
