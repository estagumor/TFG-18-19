@project
Feature: Search and filter the projects
    This is a description that i'm not gonna think

    Background: 
        Given I am on the main page
        Given I click in 'projectsLink' link

    @search
    Scenario: Search project by reference
        When I write '002' on the search input
        Then I should see a project with the reference 'EUROPEO - 002'

    @search
    Scenario: Search project by title
        When I write 'AUTOMATED' on the search input
        Then I should see a project with the title 'AUTOMATED VALIDATION OF COMPENSABLE SLAS'

    @filter
    Scenario: Filter projects from 3 years ago
        When I click on the three years button
        Then I should see projects from 3 years ago to now