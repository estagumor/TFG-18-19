import { browser, by, element, until, Key } from 'protractor';

export class PersonCreateEditPage {

  public clickList(){
    return element(by.id('createPerson')).click()
  }

  public fillForm() {
    browser.sleep(1000) //Espera un poco para que le de tiempo a renderizarse
    var nombre = element(by.id("name")).sendKeys("Nombre");
    var apellidos = element(by.id("surname")).sendKeys("Apellidos");
    var email = element(by.id("email")).sendKeys("email@email.com");
    var foto = element(by.id("photo")).sendKeys("https://url.com");
    var telefono = element(by.id("telf")).sendKeys("955955955");
    var rol = element(by.id("job")).sendKeys(Key.ARROW_DOWN);
    return rol
  }

  public submit(){
      return element(by.id("submitForm")).click()
  }

  public checkInList(){
      return browser.getCurrentUrl()
  }

  public editButton(){
      return element(by.id('editButton')).click()
  }

  public setSurname(surname){
      element(by.id("surname")).clear()
      return element(by.id("surname")).sendKeys(surname)
  }

}