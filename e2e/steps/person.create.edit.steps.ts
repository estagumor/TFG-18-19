import { expect } from 'chai';
import { Given, When, Then, Before } from 'cucumber';
import { PersonCreateEditPage } from '../src/person.create.edit.po';

  let app: PersonCreateEditPage;

  Before(() => {
    app = new PersonCreateEditPage();
  });

  Then('I click in the {string} button of the list', function (string) {                                                                  
    return app.clickList();                                                                                                         
  });

  Then('I fill the form', function () {                                                                                       
    return app.fillForm();                                                                                                         
  });

  Then('I hit the {string} button', function (string) {
    return app.submit();
  });

  Then('I should get redirected to the main page', function () {
    return app.checkInList().then(url => expect(url).to.contains("home"));
  });

  Then('I click in the {string} button of the display', function (string) {                                                   
    return app.editButton();                                                                                                         
  });

  Then('I set the surname to {string}', function (string) {
    return app.setSurname(string);
  });