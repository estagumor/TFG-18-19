@publication
Feature: Show the information of a publication
    This is a description that i'm not gonna think

    Background: 
        Given I am on the main page

    @display
    Scenario: Display publication
        Given I click in 'publicationsLink' link
        When I click in the 'displayButton' button
        Then the url should contain the pattern '/publication/display'
        Then I should see the 'Detalles de la publicación' header