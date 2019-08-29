import { browser, by, element, until } from 'protractor';

export class ProjectListPage {

  public navigateTo() {
    return browser.get('/');
  }

  public clickList(){
    return element(by.id('projectsLink')).click()
  }

  public getListedtItems() {
    browser.sleep(1000) //Espera un poco para que le de tiempo a renderizarse
    var condition = element.all(by.className("title"))
    return condition;
  }

}