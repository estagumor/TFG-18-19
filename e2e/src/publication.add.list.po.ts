import { browser, by, element, until, Key } from 'protractor';

export class PublicationAddListPage {

    public importButton(){
        return element(by.id("importPublications")).click()
    }

    public firstProject(){
        return element.all(by.tagName("td")).first().click()
    }
    
    public firstPublication(){
        //Al seleccionar una proyecto primero aparecen mas td antes
        return element.all(by.tagName("td")).first().click()
    }

    public saveButton(){
        return element(by.className("btn-primary")).click()
    }

    public selectAllButton(){
        return element(by.className("btn-warning")).click()
    }

    public searchProject(string){
        return element.all(by.className("form-control ng-untouched ng-pristine ng-valid")).get(0).sendKeys(string)
    }

    public searchPublication(string){
        //Al usar el buscador de proyecto antes deja de ser untouched asi que este pasa a ser el primero y unico
        return element.all(by.className("form-control ng-untouched ng-pristine ng-valid")).get(0).sendKeys(string)
    }
}