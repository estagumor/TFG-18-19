@project
Feature: Crear y editar proyectos
    Como investigador
    Quiero poder editar y crear nuevos proyectos
    Para añadirlos a la pagina

    @create
    Scenario: Crear proyecto
        Given Estoy en la pagina principal
        When Clico en el link 'projectsLink'
        Then Hago clic en el boton 'Crear proyecto' arriba del listado de proyecto
        Then Relleno el formulario de proyecto
        Then Clico en el boton 'Guardar'
        Then Deberia ser redirigido al listado

    @edit
    Scenario: Editar proyecto
        Given Estoy en la pagina principal
        When Clico en el link 'projectsLink'
        Then Hago clic en el boton 'Mostrar' de un proyecto
        Then Clico en el boton 'Editar' de la vista de detalle
        Then Modifico el titulo a 'Proyecto'
        Then Clico en el boton 'Guardar'
        Then Deberia ser redirigido al listado