import { Given, When, Then, Before } from "cucumber";
import { ProjectDisplayPage } from  '../src/project.display.po';

const assert = require("assert");
let app: ProjectDisplayPage;

Before(() => {
    app = new ProjectDisplayPage();
});

Given('Hago click en el link {string}', function (string) {
    return app.clickList(string);
});

When('Clico en el boton {string} para guardar el proeycto', function (string) {
    return app.clickDisplayButton(string);
});

Then('la url deberia contener el patron {string}', function (string) {
    return app.returnUrl().then(url => assert(url.search(string) > 0));
  });

Then('Deberia ver la cabecera {string}', function (string) {
    return app.getH1(string);
});
