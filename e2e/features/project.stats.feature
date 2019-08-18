@project
Feature: Project stats

    Background: 
        Given I am on the main page
        Given I click in 'projectsLink' link

    @stats
    Scenario: Stats of projects
        When I click in the 'stats' button
        Then the url should contain the pattern '/stats/project'
        Then I should see two tables with some data