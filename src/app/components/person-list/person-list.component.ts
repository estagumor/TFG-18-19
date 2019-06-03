import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/models/person';
import { MatDialog } from '@angular/material';
import { DisplayComponent } from '../display/display.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  public listado: Array<Person>;
  public listado2: Array<Person>;
  public selectedPerson: Person;

  constructor(
    private _personService: PersonService,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this._personService.getAll().subscribe((lista) => {
      this.listado = lista.body["persons"];
      this.listado2 = this.listado.slice()
    })
  }

  openDialog(person){
    this.selectedPerson = person;
    const dialogRef = this.dialog.open(DisplayComponent, {
      width: '50%',
      data: { objeto: person, fields: {name: 'Nombre', surname: 'Apellidos', email: 'Correo electrónico', telf: "Teléfono", office: "Despacho"}}
    });
  }

  displayPerson(id){
    if(id !== undefined) {
      this._personService.getPerson(id).subscribe((result) => {
        let per = result.body["person"]
        if(per){
          this.selectedPerson = per;
          this._router.navigateByUrl('/person/display/' + id)
        } else {
          this._router.navigateByUrl('/projects');
        }
      });
    } else {
      this._router.navigateByUrl('/projects');
    }
  }

  //Recibe una cadena del cuadro de busqueda, sustituye los caracteres extraños como las tildes por caracteres normales excepto la ñ
  //y filta aquellas personas cuyo nombre o apellidos contengan la cadena
  filter(str){
    let texto = str.value.toLowerCase().normalize('NFD')
    .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
    console.log(texto)
    console.log(this.listado2)
    this.listado2 = this.listado.filter((per) => {
      return per.name.toLowerCase().normalize('NFD')
      .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1").indexOf(texto) != -1 || per.surname.toLowerCase().normalize('NFD')
      .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1").indexOf(texto) != -1
    })
  }

}
