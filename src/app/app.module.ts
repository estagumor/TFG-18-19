import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // Para formularios y el autocompletado(reactive)
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material'; // Material design para el autocompletado
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'; // Ni puta idea
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; // Animaciones para el autocompletado
import {DemoMaterialModule} from '../material-module'; // Mas material design para el autocompletado


import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {ProjectsComponent} from './components/projects/projects.component';
import { InvestigationProjectComponent } from './components/investigation-project/investigation-project.component';
import { ContractComponent } from './components/contract/contract.component';
import { NetComponent } from './components/net/net.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    InvestigationProjectComponent,
    ContractComponent,
    NetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DemoMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
