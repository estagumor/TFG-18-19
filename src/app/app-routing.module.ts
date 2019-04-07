import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/project-create/projects.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { InvestigationProjectComponent } from './components/investigation-project/investigation-project.component';
import { ContractComponent } from './components/contract/contract.component';
import { NetComponent } from './components/net/net.component';
import { PublicationsComponent } from './components/publication-create/publications.component';
import { PublicationAddListComponent } from './components/publication-add-list/publication-add-list.component';
import { ProjectDisplayComponent } from './components/project-display/project-display.component';
import { PublicationListComponent } from './components/publication-list/publication-list.component'
import { PersonComponent } from './components/person-create/person.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'project', component: ProjectsComponent},
  { path: 'project/:id?', component: ProjectsComponent },
  { path: 'projects', component:  ProjectListComponent},
  { path: 'project/:id', component: ProjectDisplayComponent},
  { path: 'project/:id/publication', component: PublicationAddListComponent },
  { path: 'project/:id/publications', component: PublicationListComponent },
  { path: 'project/display/:id', component: ProjectDisplayComponent},
  { path: 'investigationProjects', component: InvestigationProjectComponent },
  { path: 'contracts', component: ContractComponent },
  { path: 'nets', component: NetComponent },
  { path: 'publication', component: PublicationsComponent },
  { path: 'person', component: PersonComponent},
  { path: 'person/:id?', component: PersonComponent},
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }