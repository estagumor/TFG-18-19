import { expect } from 'chai';
import { Given, When, Then, Before } from 'cucumber';
import { PersonDisplayPage } from '../src/person.display.po';

  let app: PersonDisplayPage;

  Before(() => {
    app = new PersonDisplayPage();
  });

  When('Hago clic en el link de personal', function () {                                                                       
    return app.clickList();                                                                                                         
  });

  Then('Hago clic en el boton {string} de una persona', function (string) {
    return app.clickShowButton();
  });

  Then('Deberia ver mis datos', function () {
    return app.getDetailInfo().then(string => expect(string).to.be.equal('Detalles del perfil'.toUpperCase()))
  });