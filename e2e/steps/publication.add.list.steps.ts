import { expect } from 'chai';
import { Given, When, Then, Before } from 'cucumber';
import { PublicationAddListPage } from '../src/publication.add.list.po';

  let app: PublicationAddListPage;

  Before(() => {
    app = new PublicationAddListPage();
  });

  Then('Hago clic en el boton {string} arriba de la lista', function (string) {
    return app.importButton();                                                                                                                                                                                                                                                   
  });

  Then('Selecciono el primer proyecto de la lista', function () {
    return app.firstProject();                                                                                                                                                                                                                                                   
  });

  Then('Selecciono la primera publicacion de la lista', function () {                                                                                                                                                                                               
    return app.firstPublication();                                                                                                                                                                                                                                                   
  });

  Then('Clico en el boton {string} arriba de la pagina', function (string) {                                                                                                                                                                                             
    return app.saveButton();                                                                                                                                                                                                                                                   
  });

  Then('Hago clic en el boton naranja {string} arriba de la lista', function (string) {                                                                                                                                                                                          
    return app.selectAllButton();                                                                                                                                                                                                                                                   
  });

  Then('Escribo {string} en el buscador de proyecto', function (string) {
    return app.searchProject(string);
  });

  Then('Escribo {string} en el buscador de publicaciones', function (string) {
    return app.searchPublication(string);
  });