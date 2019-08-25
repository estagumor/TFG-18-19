@person
Feature: Crear y editar perfiles
    Como investigador
    Quiero poder crear y editar nuevos perfiles
    Para añadir nuevo personal

    @create
    Scenario: Crear perfil
        Given Estoy en la pagina principal
        When Hago clic en el link de personal
        Then Hago clic en el boton 'Crear perfil' arriba del listado
        Then Relleno el formulario
        Then Clico en el boton 'Guardar'
        Then Deberia devolverme a la pagina principal

    @edit
    Scenario: Editar perfil
        Given Estoy en la pagina principal
        When Hago clic en el link de personal
        Then Hago clic en el boton 'Mostrar' de una persona
        Then Clico en el boton 'Editar' de la vista de detalle
        Then Modifico el apellido a 'Jimenez'
        Then Clico en el boton 'Guardar'
        Then Deberia devolverme a la pagina principal