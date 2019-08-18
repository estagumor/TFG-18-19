@person
Feature: Person list

  @list
  Scenario: List persons
    Given I am on the main page
    When I click in 'personsLink' link
    Then I should see a list with a few persons