import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { InvestigationProject } from '../../models/investigationProject';
import 'rxjs/add/operator/map';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { InvestigationProjectService } from '../../services/investigation.project.service';

@Component( {
    selector: 'app-investigation-project',
    templateUrl: './investigation-project.component.html',
    styleUrls: ['./investigation-project.component.css'],
    providers: [InvestigationProjectService]
} )
export class InvestigationProjectComponent implements OnInit {
    public investigationProject: InvestigationProject;
    public responseCreate: InvestigationProject;
    public responseFind: InvestigationProject;
    public myControl = new FormControl(); // El formulario
    public selector = new FormControl();
    public options: Array<Object>; // La lista que sale en el input al escribir
    public filteredOptions: Observable<string[]>;
    public investigationProjects: Array<Object>;
    public investigationProjectId: Number;
    public projectId: Number;
    public projectId2: Number;
    constructor(
        private _route: ActivatedRoute, // Para señalar el link del menu que esta activo
        private _router: Router, // Para hacer el menu de navegacion
        private _service: InvestigationProjectService // El servicio que hace las peticiones al backend
    ) {
        this.investigationProject = new InvestigationProject( [], [], [], '', '', [], '', '', '', '', null, null, null, [] );
    }

    ngOnInit() {


       
    }

    onSubmit() {
        this.responseCreate = new InvestigationProject( [], [], [], '', '', [], '', '', '', '', null, null, null, []); // Instancia para guardar el resultado
        this._service.create( this.investigationProject ).subscribe(
            result => {
                this.responseCreate = result.project;
                alert( 'Se ha guardado satisfactoriamente con el id: ' + result['project']['_id'] );
            },
            error => {
                console.log( error );
            }
        );
    }

    find() {
        this._service.getInvestigationProject( this.projectId ).subscribe(( pro: JSON ) => {
            this.responseFind = pro['project'];
        } );
    }

    listar() {
        this._service.getInvestigationProjects().subscribe(( lista ) => {
            this.investigationProjects = lista;
        } );
    }

    borrar( id ) {
        this._service.deleteInvestigationProject( id ).subscribe(( response ) => console.log( response ) );
    }
    
    delete() {
        if(confirm('¿Esta seguro?')){
            this._service.deleteInvestigationProject( this.projectId2 ).subscribe(( response ) => console.log( response ) );
        }
    }

}
