import { expect } from 'chai';
import { Given, When, Then, Before } from 'cucumber';
import { PersonDisplayPage } from '../src/person.display.po';

  let app: PersonDisplayPage;

  Before(() => {
    app = new PersonDisplayPage();
  });

  When('I click in the person list link', function () {                                                                       
    return app.clickList();                                                                                                         
  });

  Then('I click in the {string} button of a person', function (string) {
    return app.clickShowButton();
  });

  Then('I should see my email', function () {
    // return app.getDetailInfo().then(encabezados => {
    //     expect(encabezados[1].getText()).to.be.equal('Email')
    // }, reason => console.log(reason));
    return app.getDetailInfo().then(string => expect(string).to.be.equal('Detalles del perfil'.toUpperCase()))
  });