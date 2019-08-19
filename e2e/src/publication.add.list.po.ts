import { browser, by, element, until, Key } from 'protractor';

export class PublicationAddListPage {

    public importButton(){
        return element(by.id("importPublications")).click()
    }

    public firstProject(){
        return element(by.xpath('/html/body/app-root/div/app-publication-add-list/fieldset/div[1]/section/div[2]/div/div/div/table/tbody/tr[1]/td[1]')).click()
    }
    
    public firstPublication(){
        return element(by.xpath('/html/body/app-root/div/app-publication-add-list/fieldset/div[1]/section/div[1]/div/div/div/table/tbody/tr[1]/td[1]/label')).click()
    }

    public saveButton(){
        return element(by.className("btn-primary")).click()
    }

    public selectAllButton(){
        return element(by.className("btn-warning")).click()
    }

    public searchProject(string){
        return element(by.xpath('/html/body/app-root/div/app-publication-add-list/fieldset/input[1]')).sendKeys(string)
    }

    public searchPublication(string){
        return element(by.xpath('/html/body/app-root/div/app-publication-add-list/fieldset/input[2]')).sendKeys(string)
    }
}