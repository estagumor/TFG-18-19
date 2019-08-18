import { Then, Before } from "cucumber";
import { PublicationSearchFilterPage } from "../src/publication.search.filter.po";

const assert = require("assert");
let app: PublicationSearchFilterPage;

Before(() => {
    app = new PublicationSearchFilterPage();
});

Then('I should see a publication with the name {string}', function (string) {
    return app.getAllNames().then(all => assert(all.length > 0) && assert.equal(app.getName(0), string));
});

Then('I should see publications with the date {string}', function (string) {
    return app.getAllDates().then(all => assert(all.length > 0) && assert.equal(app.getDate(0), string));
});

Then('I should see publications with the author {string}', function (string) {
    return app.getAllAuthors().then(all => assert(all.length > 0) && assert(app.getAuthor(0).search(string) > 0));
});

