Feature: Display people data
    As researcher
    I would like to edit my personal data in the site
    So i want to be able to see it

    Scenario: Display person
        Given I am on the main page
        When I click in the person list link
        Then I click in the 'Mostrar' button of a person
        Then I should see my email
