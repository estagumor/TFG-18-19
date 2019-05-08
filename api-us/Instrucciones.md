# API para redireccionar Scopus

Esta API se levantará en el puerto 3080 y escucha en dos rutas:

* /

Que mostrará el mensaje "Se encuentra en la API para obtener información desde Scopus." 

* /scopus

El cual espera por POST los siguientes parámetros:

- authors: Un array con los ID de Scopus de los autores que se buscan
- date: La fecha a partir de la cual se buscarán las publicaciones
- start: Indica a partir de que número de publicación se quiere obtener, para el indexado
- count: Indica el número de publicaciones que se quiere obtener

## Instrucciones

1. Traer la imagen de docker desde docker hub con el comando `docker pull dobloq/apius_web`

2. Levantar el contenedor con el comando `docker run -d apius_web`

