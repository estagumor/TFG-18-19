@publication
Feature: Import publications from Scopus
    As a researcher
    I want to import publications from Scopus
    So I can relate them to the projects I select

    @import
    Scenario: Import one publication
        Given I am on the main page
        When I click in the publications list link
        Then I click in the 'Importar' at the top of list
        Then I select the first project from the list
        Then I select the first publication from the list
        Then I hit the 'Guardar' button at the top
        Then I should get redirected to the publication's list

    @import
    Scenario: Import all publications
        Given I am on the main page
        When I click in the publications list link
        Then I click in the 'Importar' at the top of list
        Then I select the first project from the list
        Then I hit the 'Seleccionar todas las publicaciones' orange button at the top
        Then I hit the 'Guardar' button at the top
        Then I should get redirected to the publication's list

    @import
    Scenario: Search and import an specific project and publication
        Given I am on the main page
        When I click in the publications list link
        Then I click in the 'Importar' at the top of list
        Then I write 'Automated' in the project searcher
        Then I select the first project from the list
        Then I write 'Visual' in the publication searcher
        Then I select the first publication from the list
        Then I hit the 'Guardar' button at the top
        Then I should get redirected to the publication's list
