@publication
Feature: Publication list
  As a researcher 
  I want to see the publications of the group
  So i want to be able to list them

  @list
  Scenario: List publications
    Given I am on the main page
    When I click in the publications list link
    Then I should see a list with a few publications