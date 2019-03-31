import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/models/person';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [PersonService]
})
export class PersonComponent implements OnInit {
  public person: Person;
  public edit: boolean = false;
  public errors = [];
  public bool: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _service: PersonService,
  ) { }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      if (params['id?'] != undefined) {
        this._service.getPerson(params['id?']).subscribe(response => {
          this.person = response.body['person'];
          this.bool = true;
          this.edit = true;
        })
      } else {
        this.bool = true;
        this.person = new Person("","","","","",true,"","","","","",true);
      }
    })
  }

  onSubmit(form: NgForm) {
    // if (this.errors.length > 1) { //HAY ERRORES
    //   console.log(this.errors)
    //   return false;
    // }
    if(this.edit){
      this._service.updatePerson(this.person).subscribe( editResponse => {
        form.reset();
        this._router.navigate(['/']); //TODO: Poner ruta a donde redirigir
      }, error => {
        console.log(error);
      })
    } else {
      this._service.create(this.person).subscribe(
        createResult => {
          form.reset();
          this._router.navigate(['/']); //TODO: Poner ruta a donde redirigir
        }, 
        error => {
          console.log(error);
        }
      )
    }
  }

}
