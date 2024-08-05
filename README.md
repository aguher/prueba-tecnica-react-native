# Prueba Técnica para OpositaTest

Autor: Agustin Herrera Garcia

## Objetivo

El objetivo de esta prueba es evaluar tus habilidades en React Native y tu capacidad para optimizar y mejorar código existente. Se espera que proporciones sugerencias para mejorar el rendimiento, la estructura y la mantenibilidad del código. Además, es crucial que la aplicación sea compatible con versiones de Android 6 (Marshmallow) o superiores y versiones de iOS. El código proporcionado implementa una aplicación básica de visualización de libros, y tendrás que identificar áreas de mejora y aplicar tus conocimientos para optimizarlo.

## Realizacion de la prueba

1. **Revisión del Código:**

   - En primer lugar, se ha ejecutado la aplicacion, para identificar la funcionalidad.
   - Una vez identificada la funcionalidad, se ha revisado el codigo, y he comprobado, que estaba toda la logica en un unico archivo (App.tsx).
   - Para mejorar la aplicacion, se sugiere un cambio en la estructura de carpetas, donde por un lado tengamos la capa de presentacion y por otro lado, la capa de dominio, donde tendremos la conexion con la API, asi como los casos de uso. De esta manera, se podria aprovechar dicha capa (Dominio) en cualquier otra aplicacion, y en caso de querer refactorizar a otra tecnologia, seria solo modificar la capa de presentacion.
   - Posteriormente se han identificado las partes de la aplicacion en la que podria ser dividida en componentes atomicos, estos componentes nos permitiran hacer mas legible la aplicacion y testeable (por componente)

2. **Mejoras Sugeridas:**
   A continuacion, hacemos una lista de las mejoras implantadas en la aplicacion:

   - Mejora en la estructura de carpetas:
     - src
       - ui (Contiene la capa de presentacion de la aplicacion)
       - core (Contiene la capa de contexto, donde representamos las posibles llamadas a la API y los casos de uso a aplicar)
       - config (Contiene archivos de configuracion, como adaptadores para la API o para el Storage del dispositivo)
   - Se ha añadido contextAPI para manejar los libros recientes y favoritos, ya que hemos insertado StackNavigator para la navegacion entre pantallas.
   - Se han creado una serie de customHooks para agrupar la logica de navegacion y llamadas a la API.
   - Se han añadido configuraciones de ESLINT para mejorar la calidad de los test.
   - Se ha implementado el uso de `reanimated` para animar la lista de libros, al hacer scroll, se hace una animacion con efecto lateral.
   - Se ha implementado una ordenacion alfabetica y su almacenamiento en el storage del dispositivo, para cuando se recargue la aplicacion.
   - Se ha mejorado mediante el uso de componentes atomicos la legibilidad de la aplicacion y rendimiento (como añadir key en los listados para evitar rerendering).
   - Al usar typescript, hemos añadido toda clase de interfaces, tanto para la conexion a la API como para los Props de los componentes, de esta manera, nos evitamos testing, ya que fallaria en el IDE.
   - Se ha añadido un StackNavigator, en lugar de renderizar todas las capas en el mismo lugar.
   - Se ha integrado en las llamadas React-Query, nos permite cachear las llamadas (mas rapidez) y nos ahorramos mucha logica en las llamadas (Estados de carga, error, etc)
   - Se ha añadido husky para mejorar los commits a git, de este modo, si fallan los test, no se subira al repositorio.

3. **Compatibilidad con Android e iOS:**

   - Puesto que no dispongo de Mac, no he podido realizar las pruebas especificas en iOS.
   - Para la compatibilidad en Android, se pedia que fuese compatible a partir de Android Marshmallow, para ello he utilizado AndroidStudio, y me he creado un dispositivo virtual con dicha version, y con numero de API 23

4. **Pruebas y Validación:**

   - Se han realizado unos tests de verificacion, situados en la carpeta **tests** donde se han fijado una serie de test para comprobar que el refactor, no afecte a la aplicacion principal
   - Pasos para ejecutar las pruebas.
     -- Nos dirigimos a la carpeta raiz y ejecutamos
     `npm run test`

5. **Nuevas funcionabilidades (opcional)**

- Ordenación Alfabética: Se ha añadido una logica de ordenacion de los elementos de la lista principal, asi como, usando el Storage del dispositivo, dicha ordenacion queda almacenada en el, de manera que si volvemos a cargar la aplicacion, la ordenacion se mantendra como se habia realizado previamente. Para ello hemos usado la libreria de `react-native-async-storage`.

6. **Instrucciones de instalacion y ejecucion:**

   ##### Requisitos Previos

   Antes de comenzar, asegúrate de tener instalados los siguientes programas:

   - **Node.js**: [Descargar e instalar Node.js](https://nodejs.org/)
   - **npm** (Node Package Manager): Viene con Node.js
   - **Java Development Kit (JDK)**: [Descargar e instalar JDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
   - **Android Studio**: Necesario para desarrollar y emular aplicaciones Android. [Instrucciones de instalación](https://developer.android.com/studio)

   ##### Configuración del Entorno de Desarrollo

   - Clona este repositorio (https://github.com/aguher/prueba-tecnica-react-native)
   - cd prueba-tecnica-react-native
   - Instala las dependencias: `yarn` o `npm install`

   ##### Ejecución en Android

   Inicia un emulador de Android desde Android Studio o conecta un dispositivo Android físico a tu computadora.
   Ejecuta el siguiente comando en la raíz del proyecto: `npx react-native start`
   Asegúrate de que el servidor Metro esté corriendo. Este se inicia automáticamente con los comandos anteriores.
