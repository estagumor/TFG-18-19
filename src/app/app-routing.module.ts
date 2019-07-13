import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectCreateComponent } from './components/project-create/project-create.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { PublicationCreateComponent } from './components/publication-create/publication.create.component';
import { PublicationAddListComponent } from './components/publication-add-list/publication-add-list.component';
import { ProjectDisplayComponent } from './components/project-display/project-display.component';
import { PublicationListComponent } from './components/publication-list/publication-list.component'
import { PersonCreateComponent } from './components/person-create/person-create.component';
import { PublicationStatsComponent } from './components/publication-stats/publication-stats.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonDisplayComponent } from './components/person-display/person-display.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectStatsComponent } from './components/project-stats/project-stats.component';
import { PublicationDisplayComponent } from './components/publication-display/publication-display.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'project', component: ProjectCreateComponent},
  { path: 'project/:id?', component: ProjectCreateComponent },
  { path: 'projects', component:  ProjectListComponent},
  { path: 'project/:id', component: ProjectDisplayComponent},
  { path: 'scopus/publications', component: PublicationAddListComponent },
  { path: 'project/:id/publications', component: PublicationListComponent },
  { path: 'publications', component: PublicationListComponent },
  { path: 'project/display/:id', component: ProjectDisplayComponent},
  { path: 'publication', component: PublicationCreateComponent },
  { path: 'publication/:id?', component: PublicationCreateComponent },
  { path: 'person', component: PersonCreateComponent},
  { path: 'person/:id?', component: PersonCreateComponent},
  { path: 'publication/display/:id', component: PublicationDisplayComponent},
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