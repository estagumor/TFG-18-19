import { Then, Before } from "cucumber";
import { PersonListPage } from "../src/person.list.po";

const assert = require("assert");
let app: PersonListPage;

Before(() => {
  app = new PersonListPage();
});

Then('Deberia ver una lista con algunas personas', function () {
    return app.getListedtItems().then(all => assert(all.length > 0));
  });
