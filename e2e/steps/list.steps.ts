import { expect } from 'chai';
import { Given, When, Then, Before } from 'cucumber';
import { AppPage } from '../features/app.po';

  let app: AppPage;

  Before(() => {
    app = new AppPage();
  });

  Given("I am on the projects' page",{timeout: 2 * 5000},
    () => app.navigateTo());

  When('I click in the list button',{timeout: 2 * 5000},
    () => { app.clickList() });

  Then("I should see a list with a few projects' id",
    () => app.getListedtItems()
      .then(elems => expect(elems.length).to.be.greaterThan(0)));
