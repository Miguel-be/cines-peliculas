1.- Objetivo

Creación de un frontal en React que consuma el API que nosotros mismos creamos en la practica anterior de Node. 

Tanto el API como el frontal están subidos a internet. Este es el enlace de la aplicación de React https://cinereact.herokuapp.com/ objeto de esta practica.

Para entender la practica en su total dimensión vamos a explicar el uso que hemos dado del API de Node y daremos una pequeña explicación de la web: opciones disponibles para usuarios sin identificar y opciones para usuarios identificados con el rol "admin"

Importante. La aplicación va lenta ya que conectamos 3 entornos publicados en hostings gratuitos: la aplicación de React publicada en Heroku, el API de node publicado en Vercel y la base de datos publicada en Mongo Atlas. En concreto, el punto más lento es la base de datos ya que metemos en la colección de peliculas las imagenes en base 64 y la versión gratuita del hosting de Mongo nos pone restricciones de velocidad en función de la transferencia de datos que se realice. En concreto, este proyecto nos ha hecho ver que para próximos proyectos "gratuitos" debemos plantearnos usar un repositorio de imagenes.

2.- Uso del API

Nuestro API se encuentra publicado en la siguiente dirección: https://proyecto-node-olive.vercel.app/ y tiene 3 colecciones de documentos: usuarios, cines y películas.

Usuarios
De esta colección hemos utilizado los siguientes end points:
- Login. Permite identificar a un usuario en el sistema. Devuelve los datos de usuario incluyendo su rol dentro del sistema (en el caso del password lo devuelve en blanco). Esta es la dirección del end point. https://proyecto-node-olive.vercel.app/user/login
- Register. Permite registrar a un usuario en el sistema con un rol. https://proyecto-node-olive.vercel.app/user/register
- Logout. Permite que un usuario deje de estar identificado en el sistema. https://proyecto-node-olive.vercel.app/user/logout

Cines
Esta colección almacena el nombre, ubicación y las películas que se muestran en un cine (array de elementos). De esta colección hemos utilizado los siguientes end points:
- Get. Recogemos todos los cines que hay en el sistema. El resultado se muestra con diferentes experiencias de usuario: como una lista que muestra información del cine, dentro de un select cargado con el nombre de los cines para permitir al usuario la selección de uno de ellos, etc. https://proyecto-node-olive.vercel.app/cinemas
- Post. Introducimos un nuevo cine en el sistema a partir de información que introduce el usuario en el frontal.
https://proyecto-node-olive.vercel.app/cinemas/free
- Put. Mostramos al usuario la información de un cine y le permitimos modificar sus datos incluyendo las peliculas que se muestran en el cine. https://proyecto-node-olive.vercel.app/cinemas/edit-free/:id
- Delete. Borramos un nuevo cine en el sistema a partir de una selección realizada por el usuario en la aplicación de react. https://proyecto-node-olive.vercel.app/cinemas/delete-free/:id

Peliculas
Esta colección almacena información de peliculas en la que se incluye una imagen de la portada en esquema URI salvando la imagen en string base 64. De esta colección hemos utilizado los siguientes end points:
- Get. Recogemos todas las peliculas del sistema. Como en el caso de los cines, el resultado se muestra con diferentes experiencias de usuario: como una lista que muestra información de las peliculas, dentro de un select cargado con el nombre de las peliculas para permitir al usuario la selección de una o varias de ellas, dentro de un select más restrictivo en el que el usuario puede seleccionar sólo una de ellas, etc.https://proyecto-node-olive.vercel.app/movies
- Post. Introducimos una nueva película en el sistema a partir de información que introduce el usuario en el frontal.
https://proyecto-node-olive.vercel.app/cinemas/movies/with-uri-free
- Put. Mostramos al usuario la información de una pelicula y le permitimos modificar sus datos. https://proyecto-node-olive.vercel.app/movies/edit-free/:id
- Delete. Borramos una pelicula del sistema a partir de una selección realizada por el usuario en la aplicación de react. https://proyecto-node-olive.vercel.app/movies/delete-free/:id

2.- Manual de usuario de la aplicación
Al entrar a la web, los usuarios sin identificar tienen en el menú superior la opción de Identificarse y Registrarse en el sistema. En ambos casos, la aplicación les mostrará un formulario para que el usuario meta sus datos. 

Los usuarios sin identificar también pueden seleccionar un cine y la aplicación les mostrará las peliculas que se proyectan en ese cine. Pueden hacer click en una de las peliculas y ver información detallada de la misma. 

Importante: en este punto, recordamos de nuevo que la aplicación va lenta pero funciona. El cuello de botella principalmente es la base de datos de Mongo que maneja una colección con documento que tienen imagenes en base 64.

Los usuarios identificados tienen opciones añadidas a las anteriores. Cuando un usuario se identifica en el sistema, el menú de navegación cambia: se incluyen las opciones Agregar Pelicula, Agregar / Editar Cine y se sustituyen las opciones Inicio de Sesión y Registro por Cerrar Sesión.

Las opciones Agregar Pelicula y Agregar Cine muestran un formulario de datos que permiten al usuario crear una pelicula y un cine respectivamente. En el caso de una pelicula, el usuario puede introducir una portada (sólo imagenes) y en el caso de un cine, el usuario puede seleccionar una o varias peliculas que se vayan a proyectar en el cine.

En el caso de Editar un Cine, el usuario deberá seleccionar el cine que quiere editar usando un desplegable con todos los cines existentes en el sistema. 

Para Editar una Pelicula, el usuario deberá acceder al detalle de una pelicula (como se describía anteriormente). A diferencia de un usuario sin identificar, a los usuarios identificados la aplicación les muestra un botón "Editar Información" que permite editar la pelicula.