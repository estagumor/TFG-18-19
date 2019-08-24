# Búsqueda por nombre, fecha o autores
@publication
Feature: Buscar y filtrar publicaciones
    This is a description that i'm not gonna think

    Background: 
        Given Estoy en la pagina principal
        Given Clico en el link 'publicationsLink'

    @search
    Scenario: Buscar publicacion por nombre
        When Escribo 'Automated' en el buscador
        Then Deberia ver una publicacion con nombre 'Automated Validation of Compensable SLAs'

    @search
    Scenario: Buscar publicacion por fecha
        When Escribo '2018' en el buscador
        Then Deberia ver publicaciones con fecha de '(2018)'

    @search
    Scenario: Buscar publicacion por autor
        When Escribo 'Manuel' en el buscador
        Then Deberia ver publicaciones con autor 'Manuel Resinas'