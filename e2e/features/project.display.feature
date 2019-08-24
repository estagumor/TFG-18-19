@project
Feature: Enseñar la informacion del proyecto
    This is a description that i'm not gonna think

    Background: 
        Given Estoy en la pagina principal

    @display
    Scenario: Mostrar proyecto
        Given Clico en el link 'projectsLink'
        When Clico en el boton 'displayButton'
        Then la url deberia contener el patron '/project/display'
        Then Deberia ver la cabecera 'Detalles del proyecto'