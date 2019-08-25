@publication
Feature: Importar publicaciones desde Scopus
    Como investigador
    Quiero poder importar publicaciones desde Scopus
    Para poder relacionarlas con los proyectos que elija

    @import
    Scenario: Importar una publicacion
        Given Estoy en la pagina principal
        When Hago click en el link 'publicationsLink'
        Then Hago clic en el boton 'Importar' arriba de la lista
        Then Selecciono el primer proyecto de la lista
        Then Selecciono la primera publicacion de la lista
        Then Clico en el boton 'Guardar' arriba de la pagina
        Then Deberia ser redirigido al listado de publicaciones

    @import
    Scenario: Importar todas las publicaciones
        Given Estoy en la pagina principal
        When Hago click en el link 'publicationsLink'
        Then Hago clic en el boton 'Importar' arriba de la lista
        Then Selecciono el primer proyecto de la lista
        Then Hago clic en el boton naranja 'Seleccionar todas las publicaciones' arriba de la lista
        Then Clico en el boton 'Guardar' arriba de la pagina
        Then Deberia ser redirigido al listado de publicaciones

    @import
    Scenario: Buscar e importar un proyecto y publicacion especifico
        Given Estoy en la pagina principal
        When Hago click en el link 'publicationsLink'
        Then Hago clic en el boton 'Importar' arriba de la lista
        Then Escribo 'Automated' en el buscador de proyecto
        Then Selecciono el primer proyecto de la lista
        Then Escribo 'Visual' en el buscador de publicaciones
        Then Selecciono la primera publicacion de la lista
        Then Clico en el boton 'Guardar' arriba de la pagina
        Then Deberia ser redirigido al listado de publicaciones
