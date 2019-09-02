import { expect } from 'chai';
import { Given, When, Then, Before } from 'cucumber';
import { ProjectListPage } from '../src/project.list.po';

  let app: ProjectListPage;

  Before(() => {
    app = new ProjectListPage();
  });

  Given("Estoy en la pagina principal",{timeout: 2 * 5000},
    () => app.navigateTo());

  When('Hago clic en el link de proyectos',{timeout: 2 * 7000},
    () => { app.clickList() });

  Then("Deberia ver una lista con varios proyectos",
    () => app.getListedtItems()
      .then(elems => expect(elems.length).to.be.greaterThan(0)));
