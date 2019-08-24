@person
Feature: Listado de personas

  @list
  Scenario: Listado de personas
    Given Estoy en la pagina principal
    When Clico en el link 'personsLink'
    Then Deberia ver una lista con algunas personas