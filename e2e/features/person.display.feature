@person
Feature: Mostrar informacion de un perfil
    Como investigador
    Quiero poder ver la informacion de mi perfil
    Para poder editarla

    @display
    Scenario: Mostrar perfil
        Given Estoy en la pagina principal
        When Hago clic en el link de personal
        Then Hago clic en el boton 'Mostrar' de una persona
        Then Deberia ver mis datos
