import { Then, Before, When } from "cucumber";
import { ProjectStatsPage } from "../src/project.stats.po";

const assert = require("assert");
let app: ProjectStatsPage;

Before(() => {
    app = new ProjectStatsPage();
});

When('Clico en el boton {string} encima de la lista', function(string) {
    return app.statsButton()
})

Then('Deberia ver dos tablas con alguna informacion', function () {
    return app.getAllCharts().then(charts => assert(charts.length = 2));
  });
