import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { InvestigationProjectComponent } from './components/investigation-project/investigation-project.component';
import { ContractComponent } from './components/contract/contract.component';
import { NetComponent } from './components/net/net.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { PublicationListComponent } from './components/publication-list/publication-list.component';
import { ProjectDisplayComponent } from './components/project-display/project-display.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'project', component: ProjectsComponent },
  { path: 'projects', component:  ProjectListComponent},
  { path: 'project/:id', component: ProjectDisplayComponent},
  { path: 'investigationProjects', component: InvestigationProjectComponent },
  { path: 'contracts', component: ContractComponent },
  { path: 'nets', component: NetComponent },
  { path: 'publication', component: PublicationsComponent },
  { path: 'publications', component: PublicationListComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }