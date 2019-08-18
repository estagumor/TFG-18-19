# Búsqueda por nombre, fecha o autores
@publication
Feature: Search and filter the publications
    This is a description that i'm not gonna think

    Background: 
        Given I am on the main page
        Given I click in 'publicationsLink' link

    @search
    Scenario: Search publication by name
        When I write 'Automated' on the search input
        Then I should see a publication with the name 'Automated Validation of Compensable SLAs'

    @search
    Scenario: Search publication by date
        When I write '2018' on the search input
        Then I should see publications with the date '(2018)'

    @search
    Scenario: Search publication by author
        When I write 'Manuel' on the search input
        Then I should see publications with the author 'Manuel Resinas'