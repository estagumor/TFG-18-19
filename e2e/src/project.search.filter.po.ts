import { element, by, browser, protractor } from "protractor";

export class ProjectSearchFilterPage {
    public writeInput(string) {
        browser.sleep(1000);
        var input = element(by.id('filterInput')).sendKeys(string);
        return input;
    }

    public getAllTitles() {
        browser.sleep(1000);
        return element.all(by.className('title'));
    }

    public getTitle(number) {
        let all = this.getAllTitles();
        return all[number].getText;
    }

    public filterClick() {
        browser.sleep(1000);
        return element(by.id('tresAnyosFilter')).click();
    }
}