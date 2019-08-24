import { Then, Before } from "cucumber";
import { ProjectStatsPage } from "../src/project.stats.po";

const assert = require("assert");
let app: ProjectStatsPage;

Before(() => {
    app = new ProjectStatsPage();
});

Then('Deberia ver dos tablas con alguna informacion', function () {
    return app.getAllCharts().then(charts => assert(charts.length = 2));
  });
