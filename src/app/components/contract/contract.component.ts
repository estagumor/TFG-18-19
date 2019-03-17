import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Contract } from '../../models/contract';
import 'rxjs/add/operator/map';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ContractService } from '../../services/contract.service';

@Component( {
    selector: 'app-contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.css'],
    providers: [ContractService]
} )
export class ContractComponent implements OnInit {
    public contract: Contract;
    public responseCreate: Contract;
    public responseFind: Contract;
    public myControl = new FormControl(); // El formulario
    public selector = new FormControl();
    public options: Array<Object>; // La lista que sale en el input al escribir
    public filteredOptions: Observable<string[]>;
    public contracts: Array<Object>;
    public contractId: Number;
    public contractId2: Number;
    constructor(
        private _route: ActivatedRoute, // Para señalar el link del menu que esta activo
        private _router: Router, // Para hacer el menu de navegacion
        private _service: ContractService // El servicio que hace las peticiones al backend
    ) {
        this.contract = new Contract( [], [], [], '', '', [], '', '', '', '', null, null, null, [] );
    }

    ngOnInit() {
    }

    onSubmit() {
        // tslint:disable-next-line:max-line-length
        this.responseCreate = new Contract( [], [], [], '', '', [], '', '', '', '', null, null, null, [] ); // Instancia para guardar el resultado
        this._service.create( this.contract).subscribe(
            result => {
                this.responseCreate = result.contract;
                alert( 'Se ha guardado satisfactoriamente con el id: ' + result['project']['_id'] );
            },
            error => {
                console.log( error );
            }
        );
    }

    find() {
        this._service.getContract( this.contractId ).subscribe(( pro: JSON ) => {
            this.responseFind = pro['contract'];
        } );
    }

    listar() {
        this._service.getContracts().subscribe(( lista ) => {
            this.contracts = lista;
        } );
    }

    borrar( id ) {
        this._service.deleteContract( id ).subscribe(( response ) => console.log( response ) );
    }
    delete() {
        if (confirm('¿Esta seguro?')) {
            this._service.deleteContract( this.contractId2 ).subscribe(( response ) => console.log( response ) );
        }
    }
}
