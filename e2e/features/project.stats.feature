@project
Feature: Estadisticas de proyecto

    Background: 
        Given Estoy en la pagina principal
        Given Clico en el link 'projectsLink'

    @stats
    Scenario: Estadisticas de proyectos
        When Clico en el boton 'stats'
        Then la url deberia contener el patron '/stats/project'
        Then Deberia ver dos tablas con alguna informacion