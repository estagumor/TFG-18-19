import { browser, by, element, until, Key } from 'protractor';

export class PublicationCreateEditPage {

    public clickList(){
      return element(by.id('publicationsLink')).click()
    }

    public createButton(){
        return element(by.id("createPublication")).click()
    }

    public fillForm(){
        element(by.id("articleTitle")).sendKeys("Titulo")
        element(by.id("sourceType")).sendKeys(Key.ARROW_DOWN)
        element(by.id("documentType")).sendKeys(Key.ARROW_DOWN)
        element(by.id("sourceTitle")).sendKeys("Revista")
        element(by.id("affiliation")).sendKeys("US")
        element(by.xpath('//*[@id="mat-chip-list-input-0"]')).sendKeys("a")
        element(by.xpath('//*[@id="mat-chip-list-input-0"]')).sendKeys(Key.ARROW_DOWN)
        return element(by.xpath('//*[@id="mat-chip-list-input-0"]')).sendKeys(Key.ENTER)

    }

    public checkPubList(){
        return browser.getCurrentUrl()
    }

    public showButton(){
        return element.all(by.name("displayButton")).first().click()
    }

    public setPubTitle(string){
        element(by.id("articleTitle")).clear()
        return element(by.id("articleTitle")).sendKeys(string)
    }
}