Feature: Project list
  As a researcher 
  I want to see the projects of the group
  So i want to be able to list them

  Scenario: List projects
    Given I am on the main page
    When I click in the projects list link
    Then I should see a list with a few projects