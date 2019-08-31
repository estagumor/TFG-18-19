# TFG
## Instalación

Esta guía está orientada a sistemas basados en GNU/Linux. Recomendamos ejecutar todas la instrucciones con `sudo`. 

1. **Instalar git, npm y mongodb:**
    1. Ejecutar `apt install git npm mongodb`. Esto instalará los paquetes git, npm y mongodb correspondientes al sistema operativo actual.  
1. **Clonar el repositorio de la aplicación:**
    1. En la carpeta donde se quiera descargar, abrir un terminal y ejecutar `git clone https://github.com/estagumor/TFG-18-19`. Tras ello se creará la carpeta 'TFG-18-19' que contendrá el proyecto.
1. **Instalar las dependencias del proyecto:**
    1. Ahora ejecute `npm install`. Con ello se instalarán las dependencias especificadas en 'package.json'. 
1. **Ejecutar la base de datos:**
    1. Ejecute `service mongodb start`. Con ello se arrancará el motor de bases de datos MongoDB. 
1. **Ejecutar el Back-End:**
    1. Ejecutar `node index.js`. Esto hará que el servidor quede esperando peticiones.
1. **Ejecutar el Front-End:**
    1. Vea la sección *Servidor de desarrollo* más adelante . 

## Servidor de desarrollo

Ejecutar `npm run ng` para poner en marcha la web. Navegue a `http://localhost:4200/`. La aplicación se recargará automáticamente si modifica algún archivo.
## Compilado

Ejecute `postinstall` para compilar el Front-End. El resultado se guardará en la carpeta `dist/`.

## Populado

En el servidor se incluyen datos iniciales a modo de populate. Para cargarlos con el servidor ejecutándose navegue a la dirección `http://localhost:3700/api/populate`. **Atención, esta acción borrará el resto de datos presentes**.

## Ejecutar tests unitarios

Ejecute `npm run test` para ejecutar los tests de [Karma](https://karma-runner.github.io) y los de [Mocha](https://mochajs.org/) simultáneamente.

Además para obtener el code-coverage puede ejecutar `npm run test-coverage`. Los resultados se guardan en formato HTML en la carpeta `coverage`, separados los de Mocha y los de Jasmine.

## Ejecutar los tests end-to-end

Antes de ejecutar estos tests hay que tener en consideración dos puntos:
- Es necesario que el sistema cuente con Firefox ya que se usa para la simulación.
- El servidor debe estar ejecutándose paralelamente para registrar los cambios efectuados, preferiblemente con los datos proporcionados en el populado.

Ejecute `npm run e2e` para usar los tests end-to-end via [Protractor](http://www.protractortest.org/).
