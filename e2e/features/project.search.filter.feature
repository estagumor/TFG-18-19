@project
Feature: Buscar y filtrar los proyectos

    Background: 
        Given Estoy en la pagina principal
        Given Hago click en el link 'projectsLink'

    @search
    Scenario: Buscar proyecto por referencia
        When Escribo '002' en el campo de busqueda
        Then Deberia ver un proyecto con referencia 'EUROPEO - 002'

    @search
    Scenario: Buscar proyecto por titulo
        When Escribo 'AUTOMATED' en el campo de busqueda
        Then Deberia ver un proyecto con titulo 'AUTOMATED VALIDATION OF COMPENSABLE SLAS'

    @filter
    Scenario: Filtrar los proyectos de hace tres años
        When Clico en el boton de tres años
        Then Deberia ver los proyectos de hace tres años