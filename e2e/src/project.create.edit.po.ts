import { browser, by, element, until, Key } from 'protractor';

export class ProjectCreateEditPage {

  public clickList(){
    return element(by.id('projectsLink')).click()
  }

  public fillForm() {
    browser.sleep(1000) //Espera un poco para que le de tiempo a renderizarse
    // var autocompletes = element.all(by.className("divAutocomplete"))
    // autocompletes.each((el, index) => {
    //   console.log(el)
    // })
    var title = element(by.id("title")).sendKeys("Titulo");
    var description = element(by.id("description")).sendKeys("Descripcion");
    var reference = element(by.id("reference")).sendKeys("010");
    var scope = element(by.id("scope")).sendKeys(Key.ARROW_DOWN);
    var status = element(by.id("status")).sendKeys(Key.ARROW_DOWN);
    var sponsor = element(by.id("sponsor")).sendKeys("US");
    var amount = element(by.id("amount")).sendKeys("1022.2");
    return amount
  }

  public submit(){
      return element(by.id("submitForm")).click()
  }

  public checkInList(){
      return browser.getCurrentUrl()
  }

  public createButton(){
      return element(by.id('createProject')).click()
  }

  public editButton(){
      return element(by.id('editButton')).click()
  }
  public displayButton(){
      return element.all(by.name('displayButton')).first().click()
  }

  public setTitle(title){
      return element(by.id("title")).sendKeys(title)
  }
  

}