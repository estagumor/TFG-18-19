import { browser, by, element, until, Key } from 'protractor';

export class ProjectCreateEditPage {

  public clickList(string){
    return element(by.id(string)).click()
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
    element(by.xpath('//*[@id="mat-chip-list-input-0"]')).sendKeys("a")
    element(by.xpath('//*[@id="mat-chip-list-input-0"]')).sendKeys(Key.ARROW_DOWN)
    element(by.xpath('//*[@id="mat-chip-list-input-0"]')).sendKeys(Key.ENTER)
    element(by.xpath('//*[@id="mat-chip-list-input-1"]')).sendKeys("r")
    element(by.xpath('//*[@id="mat-chip-list-input-1"]')).sendKeys(Key.ARROW_DOWN)
    element(by.xpath('//*[@id="mat-chip-list-input-1"]')).sendKeys(Key.ENTER)
    element(by.xpath('//*[@id="mat-chip-list-input-3"]')).sendKeys("a")
    element(by.xpath('//*[@id="mat-chip-list-input-3"]')).sendKeys(Key.ARROW_DOWN)
    element(by.xpath('//*[@id="mat-chip-list-input-3"]')).sendKeys(Key.ENTER)

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
      element(by.id("title")).clear()
      return element(by.id("title")).sendKeys(title)
  }
  

}