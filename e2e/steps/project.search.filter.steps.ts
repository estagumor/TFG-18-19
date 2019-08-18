import { When, Then, Before } from "cucumber";
import { ProjectSearchFilterPage } from "../src/project.search.filter.po";

const assert = require("assert");
let app: ProjectSearchFilterPage;

Before(() => {
    app = new ProjectSearchFilterPage();
});

When('I write {string} on the search input', function (string) {
    return app.writeInput(string);
});

Then('I should see only one project with the title {string}', function (string) {
    return app.getAllTitles().then(all => assert.equal(all.length, 1) && assert.equal(app.getTitle(0), string));
});

When('I click on the three years button', function () {
    return app.filterClick();
});

Then('I should see two projects with titles {string} and {string}', function (string, string2) {
    return app.getAllTitles().then(all => assert.equal(all.length, 2) && assert.equal(app.getTitle(0), string) && assert.equal(app.getTitle(1), string2));
});

