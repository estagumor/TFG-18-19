@publication
Feature: Enseñar la informacion de la publicacion
    This is a description that i'm not gonna think

    Background: 
        Given Estoy en la pagina principal

    @display
    Scenario: Mostrar publicacion
        Given Clico en el link 'publicationsLink'
        When Clico en el boton 'displayButton'
        Then la url deberia contener el patron '/publication/display'
        Then Deberia ver la cabecera 'Detalles de la publicación'