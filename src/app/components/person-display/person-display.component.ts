import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-display',
  templateUrl: './person-display.component.html',
  styleUrls: ['./person-display.component.css']
})
export class PersonDisplayComponent implements OnInit {
  public person: Person;
  public id: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private personService: PersonService,
    private route: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      this.id = params['id'];
      this.personService.getPerson(this.id).subscribe(person => {
        if(person) {
          this.person = person.body['person']
        }else {
          //TODO Añadir aviso de error.
          //En principio está pensado como una ventana desplegable, usando el display y 
          //cambiandole las clases CSS
          this.route.navigate(['/persons'])
        }
      });
    });
  }

  editPerson() {
    this.route.navigate(['person/' + this.id])
  }

  deletePerson() {
    this.personService.deletePerson(this.id).subscribe(s => {
      this.route.navigate(['persons'])
    });
  }

}
