@publication
Feature: Publication create and edit
    Como investigador
    Quiero poder crear publicaciones manualmente
    Para añadirlas a la web y poder editarlas

    @create
    Scenario: Crear publicacion
        Given Estoy en la pagina principal
        When Hago click en el link 'publicationsLink'
        Then Hago click en el boton 'Crear publicación' del listado de publicaciones
        Then Relleno el formulario de publicacion
        Then Clico en el boton 'Guardar'
        Then Deberia ser redirigido al listado de publicaciones

    @edit
    Scenario: Editar publicacion
        Given Estoy en la pagina principal
        When Hago click en el link 'publicationsLink'
        Then Clico en el boton 'Mostrar' de una publicacion
        Then Clico en el boton 'Editar' de la vista de detalle
        Then Modifico el titulo de la publicacion a 'Comprehensive list'
        Then Clico en el boton 'Guardar'
        Then Deberia ser redirigido al listado de publicaciones