@publication
Feature: Listado de publicaciones
  Como investigador 
  Quiero poder listar las publicaciones
  Para poder ver rapidamente sus características principales

  @list
  Scenario: Listar publicaciones
    Given Estoy en la pagina principal
    When Hago click en el link 'publicationsLink'
    Then Deberia ver una lista con varias publicaciones