import { element,by, browser } from 'protractor';

export class ProjectDisplayPage {

    public clickList(string){
        return element(by.id(string)).click();
    }

    public clickDisplayButton(string){
        browser.sleep(1000);
        return element.all(by.name(string)).first().click();
    }

    public getH1(string) {
        browser.sleep(1000);
        return element(by.id(string)).getText;
    }

    public returnUrl(){
        browser.sleep(1000);
        return browser.getCurrentUrl();
    }
}

