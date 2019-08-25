import { expect } from 'chai';
import { Given, When, Then, Before } from 'cucumber';
import { PublicationCreateEditPage } from '../src/publication.create.edit.po';

  let app: PublicationCreateEditPage;

  Before(() => {
    app = new PublicationCreateEditPage();
  });

  Then('Hago click en el boton {string} del listado de publicaciones', function (string) {                                                                  
    return app.createButton()                                                                                                       
  });

  Then('Relleno el formulario de publicacion', function () {                                                                  
    return app.fillForm()                                                                                             
  });

  Then("Clico en el boton {string} para la vista de detalle", function(string){
    return app.displayButton(string);
  })

  Then("Deberia ser redirigido al listado de publicaciones", function () {                                                                  
    return app.checkPubList().then(text => expect(text).to.contains("publications"))
  });

  Then('Clico en el boton {string} de una publicacion', function (string) {                                                                  
    return app.showButton()                                                                                      
  });

  Then('Modifico el titulo de la publicacion a {string}', function (string) {                                                                  
    return app.setPubTitle(string)                                                                                                       
  });