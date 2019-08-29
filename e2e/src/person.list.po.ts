import { browser, by, element, until } from 'protractor';

export class PersonListPage {

  public navigateTo() {
    return browser.get('/');
  }

  public getListedtItems() {
    browser.sleep(1000) //Espera un poco para que le de tiempo a renderizarse
    var condition = element.all(by.className("title"))
    return condition;
  }

}