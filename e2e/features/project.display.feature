@project
Feature: Show the information of a project
    This is a description that i'm not gonna think

    Background: 
        Given I am on the main page

    @display
    Scenario: Display project
        Given I click in 'projectsLink' link
        When I click in 'displayButton' button of a project
        Then I should see the 'Detalles del proyecto' header