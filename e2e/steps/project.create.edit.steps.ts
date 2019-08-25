import { expect } from 'chai';
import { Given, When, Then, Before } from 'cucumber';
import { ProjectCreateEditPage } from '../src/project.create.edit.po';

  let app: ProjectCreateEditPage;

  Before(() => {
    app = new ProjectCreateEditPage();
  });

  When('Clico en el link {string}', function (string) {                                                   
    return app.clickList(string);                                                                                                         
  });

  Then('Hago clic en el boton {string} arriba del listado de proyecto', function (string) {                                                 
    return app.createButton();                                                                                                         
  });

  Then('Relleno el formulario de proyecto', function () {                                                                               
    return app.fillForm();                                                                                                         
  }); 

  Then('Deberia ser redirigido al listado', function () {
    return app.checkInList().then(url => expect(url).to.contains("project"));
  });

  Then('Hago clic en el boton {string} de un proyecto', function (string) {
    return app.displayButton();
  });

  Then('Modifico el titulo a {string}', function (string) {
    return app.setTitle(string);
  });

  