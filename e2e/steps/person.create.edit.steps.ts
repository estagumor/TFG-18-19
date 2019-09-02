import { expect } from 'chai';
import { Given, When, Then, Before } from 'cucumber';
import { PersonCreateEditPage } from '../src/person.create.edit.po';

  let app: PersonCreateEditPage;

  Before(() => {
    app = new PersonCreateEditPage();
  });

  Then('Hago clic en el boton {string} arriba del listado', function (string) {                                                                  
    return app.clickList();                                                                                                         
  });

  Then('Relleno el formulario', function () {                                                                                       
    return app.fillForm();                                                                                                         
  });

  Then('Clico en el boton {string} de la vista de detalle', function (string){
    return app.editButton()
  })

  Then('Clico en el boton {string}', function (string) {
    return app.submit();
  });

  Then('Deberia devolverme a la pagina principal', function () {
    return app.checkInList().then(url => expect(url).to.contains("home"));
  });

  Then('Modifico el apellido a {string}', function (string) {
    return app.setSurname(string);
  });