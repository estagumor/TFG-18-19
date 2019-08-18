import { Given, When, Then, Before } from "cucumber";
import { ProjectDisplayPage } from  '../src/project.display.po';

const assert = require("assert");
let app: ProjectDisplayPage;

Before(() => {
    app = new ProjectDisplayPage();
});

Given('I click in {string} link', function (string) {
    return app.clickList(string);
});

When('I click in the {string} button', function (string) {
    return app.clickDisplayButton(string);
});

Then('the url should contain the pattern {string}', function (string) {
    return app.returnUrl().then(url => assert(url.search(string) > 0));
  });

Then('I should see the {string} header', function (string) {
    return app.getH1(string);
});
