# Búsqueda por nombre, fecha o autores
@publication
Feature: Buscar y filtrar publicaciones
    Como investigador
    Quiero poder buscar y filtrar publicaciones
    Para encontrar informacion rapidamente sobre mis publicaciones

    Background: 
        Given Estoy en la pagina principal
        Given Hago click en el link 'publicationsLink'

    @search
    Scenario: Buscar publicacion por nombre
        When Escribo 'Automated' en el campo de busqueda
        Then Deberia ver una publicacion con nombre 'Automated Validation of Compensable SLAs'

    @search
    Scenario: Buscar publicacion por fecha
        When Escribo '2018' en el campo de busqueda
        Then Deberia ver publicaciones con el año '(2018)'

    @search
    Scenario: Buscar publicacion por autor
        When Escribo 'Manuel' en el campo de busqueda
        Then Deberia ver publicaciones con el autor 'Manuel Resinas'