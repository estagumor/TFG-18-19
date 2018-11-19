import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { InvestigationProjectComponent } from './components/investigation-project/investigation-project.component';

// El enrutado del sitio web, por cada ruta se le asigna un componente
// Obligatoriamente hay que poner la ultima, que es como el else de un if
const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'projects/:projectNumber', component: ProjectsComponent},
  {path: 'investigationProject', component: InvestigationProjectComponent},
  {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
