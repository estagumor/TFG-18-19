@publication
Feature: Publication create and edit
    As a researcher
    I want to create manually publications
    So I want to be able to add new publications and edit them

    @create
    Scenario: Create publication
        Given I am on the main page
        When I click in the publications list link
        Then I click in the 'Crear publicación' button of the publication list
        Then I fill the publication form
        Then I hit the 'Guardar' button
        Then I should get redirected to the publication's list

    @edit
    Scenario: Edit publication
        Given I am on the main page
        When I click in the publications list link
        Then I click in the 'Mostrar' button of a publication
        Then I click in the 'Editar' button of the display
        Then I set the publication title to 'Comprehensive list'
        Then I hit the 'Guardar' button
        Then I should get redirected to the publication's list