import { expect } from 'chai';
import { Given, When, Then, Before } from 'cucumber';
import { ProjectListPage } from '../src/project.list.po';

  let app: ProjectListPage;

  Before(() => {
    app = new ProjectListPage();
  });

  Given("I am on the main page",{timeout: 2 * 5000},
    () => app.navigateTo());

  When('I click in the projects list link',{timeout: 2 * 7000},
    () => { app.clickList() });

  Then("I should see a list with a few projects",
    () => app.getListedtItems()
      .then(elems => expect(elems.length).to.be.greaterThan(0)));
