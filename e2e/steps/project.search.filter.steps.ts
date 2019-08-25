import { When, Then, Before } from "cucumber";
import { ProjectSearchFilterPage } from "../src/project.search.filter.po";

const assert = require("assert");
let app: ProjectSearchFilterPage;

Before(() => {
    app = new ProjectSearchFilterPage();
});

When('Escribo {string} en el campo de busqueda', function (string) {
    return app.writeInput(string);
});

Then('Deberia ver un proyecto con titulo {string}', function (string) {
    return app.getAllTitles().then(all => assert(all.length > 0) && assert.equal(app.getTitle(0), string));
});

Then('Deberia ver un proyecto con referencia {string}', function (string) {
    return app.getAllReferences().then(all => assert(all.length > 0) && assert(app.getScopeReference(0).search(string) > 0));
});

When('Clico en el boton de tres años', function () {
    return app.filterClick();
});

Then('Deberia ver los proyectos de hace tres años', function () {
    return app.getAllStartDates().then(all => assert(all.length > 0) &&  assert(new Date().getFullYear() - new Date(app.getStartDate(0)).getFullYear() <= 3));
});

