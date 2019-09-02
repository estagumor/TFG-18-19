@project
Feature: Enseñar la informacion del proyecto

    Background: 
        Given Estoy en la pagina principal

    @display
    Scenario: Mostrar proyecto
        Given Hago click en el link 'projectsLink'
        When Clico en el boton 'displayButton' para guardar el proeycto
        Then la url deberia contener el patron '/project/display'
        Then Deberia ver la cabecera 'Detalles del proyecto'