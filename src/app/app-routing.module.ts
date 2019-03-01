import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { InvestigationProjectComponent } from './components/investigation-project/investigation-project.component';
import { ContractComponent } from './components/contract/contract.component';
import { NetComponent } from './components/net/net.component';
import { ScopusComponent } from './components/scopus/scopus.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { PublicationListComponent } from './components/publication-list/publication-list.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'investigationProjects', component: InvestigationProjectComponent },
  { path: 'contracts', component: ContractComponent },
  { path: 'nets', component: NetComponent },
  { path: 'scopus', component: ScopusComponent },
  { path: 'publication', component: PublicationsComponent },
  { path: 'publications', component: PublicationListComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }