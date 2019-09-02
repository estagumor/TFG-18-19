import { browser, by, element, until } from 'protractor';

export class PersonDisplayPage {

  public navigateTo() {
    return browser.get('/');
  }

  public clickList(){
    return element(by.id('personsLink')).click()
  }

  public clickShowButton() {
    browser.sleep(1000) //Espera un poco para que le de tiempo a renderizarse
    return element.all(by.name("displayButton")).first().click()
  }

  public getDetailInfo(){
    // browser.sleep(4000)
    return element(by.tagName("h1")).getText()
  }

}