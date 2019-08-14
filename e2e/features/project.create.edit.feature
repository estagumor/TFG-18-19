Feature: Person create and edit
    As a researcher
    I want to insert to the system new projects
    So I want to be able to create and edit projects

    Scenario: Create project
        Given I am on the main page
        When I click in the project list link
        Then I click in the 'Crear proyecto' button on the list page
        Then I fill the project form
        Then I hit the 'Guardar' button
        Then I should get redirected to the list page

    Scenario: Edit project
        Given I am on the main page
        When I click in the project list link
        Then I click in the 'Mostrar' button of a project
        Then I click in the 'Editar' button of the display
        Then I set the title to 'Proyecto'
        Then I hit the 'Guardar' button
        Then I should get redirected to the list page