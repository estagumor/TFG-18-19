@project
Feature: Search and filter the projects
    This is a description that i'm not gonna think

    Background: 
        Given I am on the main page
        Given I click in 'projectsLink' link

    @search
    Scenario: Search project by reference
        When I write '002' on the search input
        Then I should see only one project with the title 'AUTOMATED VALIDATION OF COMPENSABLE SLAS'

    @search
    Scenario: Search project by title
        When I write 'AUTOMATED' on the search input
        Then I should see only one project with the title 'AUTOMATED VALIDATION OF COMPENSABLE SLAS'

    @filter
    Scenario: Filter projects from 3 years ago
        When I click on the three years button
        Then I should see two projects with titles 'METAMORPHIC TESTING OF RESTFUL WEB APIS' and 'AUTOMATED VALIDATION OF COMPENSABLE SLAS'