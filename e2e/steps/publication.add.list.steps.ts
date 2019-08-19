import { expect } from 'chai';
import { Given, When, Then, Before } from 'cucumber';
import { PublicationAddListPage } from '../src/publication.add.list.po';

  let app: PublicationAddListPage;

  Before(() => {
    app = new PublicationAddListPage();
  });

  Then('I click in the {string} at the top of list', function (string) {
    return app.importButton();                                                                                                                                                                                                                                                   
  });

  Then('I select the first project from the list', function () {
    return app.firstProject();                                                                                                                                                                                                                                                   
  });

  Then('I select the first publication from the list', function () {                                                                                                                                                                                               
    return app.firstPublication();                                                                                                                                                                                                                                                   
  });

  Then('I hit the {string} button at the top', function (string) {                                                                                                                                                                                             
    return app.saveButton();                                                                                                                                                                                                                                                   
  });

  Then('I hit the {string} orange button at the top', function (string) {                                                                                                                                                                                          
    return app.selectAllButton();                                                                                                                                                                                                                                                   
  });

  Then('I write {string} in the project searcher', function (string) {
    return app.searchProject(string);
  });

  Then('I write {string} in the publication searcher', function (string) {
    return app.searchPublication(string);
  });