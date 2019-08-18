@dashboard
Feature: Manage the dashboard

    Background: 
        Given I am on the main page

    Scenario: See the dashboard
        When I click in 'dashboardLink' link
        Then the url should contain the pattern '/dashboard'
        Then I should see the 'Panel de administración' header