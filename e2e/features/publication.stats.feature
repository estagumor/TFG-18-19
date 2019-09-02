@publication
Feature: Estadisticas de publicacion

    Background: 
        Given Estoy en la pagina principal
        Given Clico en el link 'publicationsLink'

    @stats
    Scenario: Estadisticas de publicaciones
        When Clico en el boton 'stats' encima de la lista
        Then la url deberia contener el patron '/stats/publication'
        Then Deberia ver dos tablas con alguna informacion