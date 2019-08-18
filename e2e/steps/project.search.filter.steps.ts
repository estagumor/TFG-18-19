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

Then('I should see a project with the title {string}', function (string) {
    return app.getAllTitles().then(all => assert(all.length > 0) && assert.equal(app.getTitle(0), string));
});

Then('I should see a project with the reference {string}', function (string) {
    return app.getAllReferences().then(all => assert(all.length > 0) && assert(app.getScopeReference(0).search(string) > 0));
});

When('I click on the three years button', function () {
    return app.filterClick();
});

Then('I should see projects from 3 years ago to now', function () {
    return app.getAllStartDates().then(all => assert(all.length > 0) &&  assert(new Date().getFullYear() - new Date(app.getStartDate(0)).getFullYear() <= 3));
});

