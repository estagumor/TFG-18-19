import { expect } from 'chai';
import { Given, When, Then, Before } from 'cucumber';
import { ProjectCreateEditPage } from '../src/project.create.edit.po';

  let app: ProjectCreateEditPage;

  Before(() => {
    app = new ProjectCreateEditPage();
  });

  When('I click in the project list link', function () {                                                   
    return app.clickList();                                                                                                         
  });

  Then('I click in the {string} button on the list page', function (string) {                                                 
    return app.createButton();                                                                                                         
  });

  Then('I fill the project form', function () {                                                                               
    return app.fillForm();                                                                                                         
  }); 

  Then('I should get redirected to the list page', function () {
    return app.checkInList().then(url => expect(url).to.contains("project"));
  });

  Then('I click in the {string} button of a project', function (string) {
    return app.displayButton();
  });

  Then('I set the title to {string}', function (string) {
    return app.setTitle(string);
  });

  