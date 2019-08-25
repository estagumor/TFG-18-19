@person
Feature: Listado de personas

  @list
  Scenario: Listado de personas
    Given Estoy en la pagina principal
    When Hago click en el link 'personsLink'
    Then Deberia ver una lista con algunas personas