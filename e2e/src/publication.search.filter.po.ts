import { element, by, browser } from "protractor";

export class PublicationSearchFilterPage {

    public getAllNames() {
        browser.sleep(1000);
        return element.all(by.name('title'));
    }

    public getAllDates() {
        browser.sleep(1000);
        return element.all(by.name('publicationDate'));
    }

    public getAllAuthors() {
        browser.sleep(1000);
        return element.all(by.name('author'));
    }

    public getName(number) {
        let all = this.getAllNames();
        return all[number].getText;
    }

    public getDate(number) {
        let all = this.getAllDates();
        return all[number].getText;
    }

    public getAuthor(number) {
        let all = this.getAllAuthors();
        return all[number].getText;
    }
}