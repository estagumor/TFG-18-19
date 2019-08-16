@person
Feature: Person create and edit
    As a researcher
    I want to create other people profiles
    So I want to be able to create and edit profiles

    @create
    Scenario: Create person
        Given I am on the main page
        When I click in the person list link
        Then I click in the 'Crear perfil' button of the list
        Then I fill the form
        Then I hit the 'Guardar' button
        Then I should get redirected to the main page

    @edit
    Scenario: Edit person
        Given I am on the main page
        When I click in the person list link
        Then I click in the 'Mostrar' button of a person
        Then I click in the 'Editar' button of the display
        Then I set the surname to 'Jimenez'
        Then I hit the 'Guardar' button
        Then I should get redirected to the main page