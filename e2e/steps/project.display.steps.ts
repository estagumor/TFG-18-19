import { Given, When, Then, Before } from "cucumber";
import { ProjectDisplayPage } from  '../src/project.display.po';


let app: ProjectDisplayPage;

Before(() => {
    app = new ProjectDisplayPage();
});

Given('I click in {string} link', function (string) {
    return app.clickList(string);
});

When('I click in {string} button of a project', function (string) {
    return app.clickDisplayButton(string);
});

Then('I should see the {string} header', function (string) {
    return app.getH1(string);
});
