@project
Feature: Search and filter the projects
    This is a description that i'm not gonna think

    Background: 
        Given I am on the main page
        Given I click in 'projectsLink' link

    @search
    Scenario: Search project by reference
        When I write 'EUROPEO - 002' on the search input
        Then I should see only one project with the title 'AUTOMATED VALIDATION OF COMPENSABLE SLAS'

    @search
    Scenario: Search project by title
        When I write 'AUTOMATED VALIDATION OF COMPENSABLE SLAS' on the search input
        Then I should see only one project with the same title

        