import { element, by, browser, protractor } from "protractor";

export class ProjectSearchFilterPage {
    public writeInput(string) {
        browser.sleep(1000);
        var input = element(by.name('filterInput')).sendKeys(string);
        return input;
    }

    public getAllTitles() {
        browser.sleep(1000);
        return element.all(by.className('title'));
    }

    public getAllStartDates() {
        browser.sleep(1000);
        return element.all(by.name('startDate'));
    }

    public getAllReferences() {
        browser.sleep(1000);
        return element.all(by.name('scope-reference'));
    }

    public getTitle(number) {
        let all = this.getAllTitles();
        return all[number].getText;
    }

    public getStartDate(number) {
        let all = this.getAllStartDates();
        return all[number].getText;
    }

    public getScopeReference(number) {
        let all = this.getAllReferences();
        return all[number].getText;
    }

    public filterClick() {
        browser.sleep(1000);
        return element(by.id('tresAnyosFilter')).click();
    }
}