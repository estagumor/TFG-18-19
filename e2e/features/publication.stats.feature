@publication
Feature: Publication stats

    Background: 
        Given I am on the main page
        Given I click in 'publicationsLink' link

    @stats
    Scenario: Stats of publications
        When I click in the 'stats' button
        Then the url should contain the pattern '/stats/publication'
        Then I should see two tables with some data