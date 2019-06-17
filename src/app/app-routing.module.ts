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
import { PublicationStatsComponent } from './components/publication-stats/publication-stats.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonDisplayComponent } from './components/person-display/person-display.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectStatsComponent } from './components/project-stats/project-stats.component';
import { PublicationDisplayComponent } from './components/publication-display/publication-display.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'project', component: ProjectsComponent},
  { path: 'project/:id?', component: ProjectsComponent },
  { path: 'projects', component:  ProjectListComponent},
  { path: 'project/:id', component: ProjectDisplayComponent},
  { path: 'scopus/publications', component: PublicationAddListComponent },
  { path: 'project/:id/publications', component: PublicationListComponent },
  { path: 'publications', component: PublicationListComponent },
  { path: 'project/display/:id', component: ProjectDisplayComponent},
  { path: 'investigationProjects', component: InvestigationProjectComponent },
  { path: 'contracts', component: ContractComponent },
  { path: 'nets', component: NetComponent },
  { path: 'publication', component: PublicationsComponent },
  { path: 'publication/display/:id', component: PublicationDisplayComponent},
  { path: 'person', component: PersonComponent},
  { path: 'person/:id?', component: PersonComponent},
  { path: 'person/:id', component: PersonDisplayComponent},
  { path: 'person/display/:id', component: PersonDisplayComponent},
  { path: 'persons', component: PersonListComponent},
  { path: 'stats/publication', component: PublicationStatsComponent},
  { path: 'stats/publication/:id', component: PublicationStatsComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'stats/project', component: ProjectStatsComponent},
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }