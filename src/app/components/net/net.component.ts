import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Net } from '../../models/net';
import 'rxjs/add/operator/map';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NetService } from '../../services/net.service';

@Component( {
    selector: 'app-net',
    templateUrl: './net.component.html',
    styleUrls: ['./net.component.css'],
    providers: [NetService]
} )
export class NetComponent implements OnInit {
    public net: Net;
    public responseCreate: Net;
    public responseFind: Net;
    public myControl = new FormControl(); // El formulario
    public selector = new FormControl();
    public options: Array<Object>; // La lista que sale en el input al escribir
    public filteredOptions: Observable<string[]>;
    public nets: Array<Object>;
    public netId: Number;
    public projectId: Number;
    public projectId2: Number;
    constructor(
        private _route: ActivatedRoute, // Para señalar el link del menu que esta activo
        private _router: Router, // Para hacer el menu de navegacion
        private _service: NetService // El servicio que hace las peticiones al backend
    ) {
        this.net = new Net( [], [], [], '', '', [], '', '', '', '', null, null, null, [] );
    }

    ngOnInit() {
    }

    onSubmit() {
        // tslint:disable-next-line:max-line-length
        this.responseCreate = new Net( [], [], [], '', '', [], '', '', '', '', null, null, null, [] ); // Instancia para guardar el resultado
        this._service.create( this.net ).subscribe(
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
        this._service.getNet( this.projectId ).subscribe(( pro: JSON ) => {
            this.responseFind = pro['project'];
        } );
    }

    listar() {
        this._service.getNets().subscribe(( lista ) => {
            this.nets = lista;
        } );
    }

    borrar( id ) {
        this._service.deleteNet( id ).subscribe(( response ) => console.log( response ) );
    }
    delete() {
        if (confirm('¿Esta seguro?')) {
            this._service.deleteNet( this.projectId2 ).subscribe(( response ) => console.log( response ) );
        }
    }

}
