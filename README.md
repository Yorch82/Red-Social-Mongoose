<!-- LOGO -->

<p align="center">
  <img width="400" height="240" src='./assets/redsocial.jpg'>
</p>

<!-- INDICE -->
<details>
  <summary>Indice</summary>
  <ol>
    <li>
      <a href="#introduccion">Introducción</a>
      <ul>
        <li><a href="#hecho-con">Tecnologías</a></li>
      </ul>
    </li>
    <li>
      <a href="#descripción-del-proyecto">Descripción del proyecto</a>
      <ul>
        <li><a href="#instalación">Instalación</a></li>
      </ul>
    </li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#contacto">Contacto</a></li>
    <li><a href="#conocimientos">Conocimientos</a></li>
  </ol>
</details>

<!-- SOBRE EL PROYECTO -->

## Introducción

En el proyecto de backend se combinará los conocimientos adquiridos en las
tecnologías node + express, además de MongoDB/mongoose.
El proyecto consistirá en una red social.


### Tecnologías

Aquí presentamos las herramientas empleadas en este proyecto:

- [Node.js](https://node.org/)
- [Express](https://expressjs.com/es/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Multer](https://github.com/expressjs/multer)
- [Postman](https://www.postman.com/)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [JWT](https://jwt.io/)
- [Heroku](https://www.heroku.com)
- [Jest](https://jestjs.io/)
- [nodemailer-mock](https://github.com/doublesharp/nodemailer-mock#readme)

<!-- DESCRIPCION -->

## Descripción

Una vez analizadas las necesidades del proyecto, se espera
que el alumno desarrolle una API REST que sea capaz de lo siguiente:


- Registro de usuarios usando Bcrypt.
- Login de usuarios + token + middleware.
- Que sea capaz de crear un CRUD.
- Dar/quitar Like a post.
- Backend disponible en producción (Heroku).

### Instalación

1. Para la instalación de la aplicación has de clonarte el siguiente repositorio:

   ```sh
   git clone https://github.com/Yorch82/Red-Social-Mongoose.git
   ```

2. Tambien has de instalar las dependencias del proyecto:
   ```sh
   npm install
   ```
3. Seeders:
    ```sh
   npm run data:destroy -> Vacía la Base de datos
   npm run data:import -> Rellena colecciones con datos de prueba
   ```
4. Testing:
    ```sh
    Cambiar valor variable DB = false en .env    
    npm test:watch
   ```

<!-- EJEMPLOS DE USO -->

## Endpoints

Esta es una lista de los Endpoints del proyecto que puedes ejecutar en Postman:

| Metodo | Endpoint                       | Rol   | Funcion                                   |
| ------ | ------------------------------ | ------- | ------------------------------------- |
| POST   | `/users/createUser`            | user    | Crear nuevo usuario                   |
| POST   | `/users/login`                 | user    | Login                                 |
| DELETE | `/users/logout`                | user    | Logout                                |
| GET    | `/users/UserOrder`             | user    | Pedidos por usuario                   |
| POST   | `/books/addBooks`              | manager | Añadir libros a base datos            |
| GET    | `/books/getBooks`              | user    | Recibe lista de libros                |
| DELETE | `/books/deleteBook/id/:id`     | manager | Borrar libro por id                   |
| GET    | `/books/id/:id`                | user    | Buscar libro por id                   |
| PUT    | `/books/:id`                   | admin   | Actualizar datos de un libro          |
| GET    | `/books/search/title/:title`   | user    | Buscar libros por título              |
| GET    | `/books/search/price/:price`   | user    | Buscar libros pro precio              |
| GET    | `/books/getBooksOrdered`       | user    | Recibe lista libros ordenado          |
| POST   | `/orders/createOrder`          | user    | Crear pedido                          |
| GET    | `/orders/getAll`               | user    | Recibe lista de pedidos               |
| POST   | `/genres/addGenre`             | manager | Añadir género                         |
| GET    | `/genres/getGenreById/:id`     | user    | Busca género por id                   |
| GET    | `/genres/getGenreByName/:name` | user    | Busca género por nombre               |
| GET    | `/genres/getGenre`             | user    | Lista total de géneros con sus libros |
| GET    | `/genres/getAll`               | user    | Lista total de géneros                |
| DELETE | `/genres/deleteGenre/:id`      | manager | Borra un género por su id             |

<!-- ROADMAP -->

## Experiencia

- [x] Implementado testing con Jest teniendo que ahcer mocking a nodemailer para que no falle el test.
- [x] Implementado modelo seeders "casero"
- [x] Hemos perfeccionado la realización de pruebas API con el uso de Postman.

<!-- LICENCIA -->

## Licencia

Este programa es de código abierto y puede ser utilizado por cualquier persona que lo desee.

<!-- CONTACTO -->

## Contacto

Jorge - [gitHub](https://github.com/yorch82)

<!-- CONCOCIMIENTOS -->

## Conocimientos

- [x] Uso de Node.js
- [x] MongoDB
- [x] Mongoose
- [x] Deploy Heroku
- [x] Testing con Jest
- [x] Swagger

