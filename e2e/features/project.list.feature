@project
Feature: Listar proyectos
  Como investigador 
  Quiero poder listar los proyectos
  Para poder ver rapidamente sus características principales

  @list
  Scenario: Listado de proyectos
    Given Estoy en la pagina principal
    When Hago clic en el link de proyectos
    Then Deberia ver una lista con varios proyectos