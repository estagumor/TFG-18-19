@dashboard
Feature: Administrar el panel de control

    Background: 
        Given Estoy en la pagina principal

    Scenario: Ver el panel de control
        When Hago click en el link 'dashboardLink'
        Then la url deberia contener el patron '/dashboard'
        Then Deberia ver la cabecera 'Panel de administración'