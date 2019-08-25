@publication
Feature: Enseñar la informacion de la publicacion

    Background: 
        Given Estoy en la pagina principal

    @display
    Scenario: Mostrar publicacion
        Given Hago click en el link 'publicationsLink'
        When Clico en el boton 'displayButton' para la vista de detalle
        Then la url deberia contener el patron '/publication/display'
        Then Deberia ver la cabecera 'Detalles de la publicación'