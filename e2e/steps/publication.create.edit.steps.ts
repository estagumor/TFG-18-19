import { expect } from 'chai';
import { Given, When, Then, Before } from 'cucumber';
import { PublicationCreateEditPage } from '../src/publication.create.edit.po';

  let app: PublicationCreateEditPage;

  Before(() => {
    app = new PublicationCreateEditPage();
  });

  When('I click in the publications list link', function() {
    return app.clickList()
  })

  Then('I click in the {string} button of the publication list', function (string) {                                                                  
    return app.createButton()                                                                                                       
  });

  Then('I fill the publication form', function () {                                                                  
    return app.fillForm()                                                                                             
  });

  Then("I should get redirected to the publication's list", function () {                                                                  
    return app.checkPubList().then(text => expect(text).to.contains("publications"))
  });

  Then('I click in the {string} button of a publication', function (string) {                                                                  
    return app.showButton()                                                                                      
  });

  Then('I set the publication title to {string}', function (string) {                                                                  
    return app.setPubTitle(string)                                                                                                       
  });