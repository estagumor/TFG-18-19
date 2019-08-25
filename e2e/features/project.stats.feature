@project
Feature: Estadisticas de proyecto

    Background: 
        Given Estoy en la pagina principal
        Given Hago click en el link 'projectsLink'

    @stats
    Scenario: Estadisticas de proyectos
        When Clico en el boton 'stats' encima de la lista
        Then la url deberia contener el patron '/stats/project'
        Then Deberia ver dos tablas con alguna informacion