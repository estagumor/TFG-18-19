import { Then, Before } from "cucumber";
import { ProjectStatsPage } from "../src/project.stats.po";

const assert = require("assert");
let app: ProjectStatsPage;

Before(() => {
    app = new ProjectStatsPage();
});

Then('I should see two tables with some data', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });
