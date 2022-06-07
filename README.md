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

Enlace a la documentación de Postman:

   ```sh
    https://documenter.getpostman.com/view/21013418/Uz5KkEKu
   ```

Esta es una lista de los Endpoints del proyecto que puedes ejecutar en Postman:

USUARIOS:

| Metodo | Endpoint                       | Rol     | Funcion                               |
| ------ | ------------------------------ | ------- | ------------------------------------- |
| POST   | `/users/`                      | user    | Crear nuevo usuario                   |
| POST   | `/users/login`                 | user    | Login                                 |
| PUT    | `/users/logout`                | user    | Logout                                |
| GET    | `/users/getLoggedUser`         | user    | Obtienes usuario loggeado             |
| PUT    | `/users/likes/:_id`            | user    | Dar Like a post                       |
| PUT    | `/users/dislikes/:_id`         | user    | Quitar like a post                    |
| PUT    | `/users/likeComment/:_id`      | user    | Dar like a comentario                 |
| PUT    | `/users/dislikeComment/:id`    | user    | Quitar like a comentario              |
| GET    | `/users/getById/:_id`          | admin   | Recupera un usuario por ID            |
| GET    | `/users/getByName/:_id_`       | admin   | Recupera un Usuario por nombre        |
| PUT    | `/users/follow/:_id`           | user    | Seguir a un usuario                   |
| PUT    | `/users/unfollow/:_id`         | user    | Dejar de seguir a usuario             |
| GET    | `/users/getAll     `           | admin   | Crear pedido                          |

POST:

| Metodo | Endpoint                       | Rol     | Funcion                               |
| ------ | ------------------------------ | ------- | ------------------------------------- |
| POST   | `/posts/`                      | user    | Crear nuevo post                      |
| DELETE | `/posts/delete/:_id            | user    | Borrar pos por ID                     |
| PUT    | `/posts/update/:_id`           | user    | Actualizar post por ID                |
| GET    | `/posts/getAll`                | admin   | Recupera todos los posts              |
| GET    | `/posts/getById/:_id`          | admin   | Recupera post por ID                  |
| GET    | `/posts/getByName/:title`      | admin   | Recupera post por Nombre              |

COMMENTS

| Metodo | Endpoint                       | Rol     | Funcion                               |
| ------ | ------------------------------ | ------- | ------------------------------------- |
| POST   | `/comments/`                   | user    | Crear nuevo comentario                |
| GET    | `/comments/getAll`             | admin   | Recupera todos los comentarios        |
| PUT    | `/comments/update/:_id`        | user    | Actualiza comentario                  |
| DELETE | `/comments/delete/:_id`        | user    | Borra comentario                      |

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

