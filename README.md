# sqlite3-template

Template for connections sql3 from local database to nodeJS and javascript

## Bibliotecas necesarias: 
* [sqlite3](https://www.npmjs.com/package/sqlite3) -> para establecer la conexión con el servidor y escribir queries en formato SQL

`npm i sqlite3`


## Pasos para conectarse a una base de datos:
1. Importar el módulo sqlite3 con su atributo `.verbose()`:
~~~
const sqlite3 = require('sqlite3').verbose();
~~~
2. Crear el objeto `Database` que nos permitirá establecer la conexión y almacenarlo en la variable `db`.
~~~
let db = new sqlite3.Database(':memory:');
~~~
*El argumento utilizado conectará con la base de datos almacenada en la memoria, para conectar con una ruta en específico (en nuestro caso: '.db/chinook.db') utilizaremos:*
~~~
let db = new sqlite3.Database('./db/chinook.db', (err)
~~~

**El objeto `Database` puede almacenar un callback como segundo argumento, con el que podemos iniciar la aplicación y ver los errores (dado que el argumento de este callback es el error en caso de fallar la conexión).**
~~~
let db = new sqlite3.Database('./db/chinook.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});
~~~

**Por otro lado, la base de datos conectada y almacenada en la variable `db` contará con los atributos necesarios para escribir en nuestra base de datos o leer información, además de ser capaz de cerrar la conexión con esta por medio de `db.close()` que también contará con un argumento de error como el objeto `Database`, por ejemplo:**
~~~
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
~~~

Algunos ejemplos de lo que podemos hacer con la variable `db` son:


~~~
db.all(query, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log('ID \t NAME')
    console.log('-- \t ----')
    rows.forEach(row => {
    console.log(`${row.id} \t ${row.name}`);
  })
})
~~~
Lo que devolverá una simulación en consola de la tabla de valores con las dos columnas ID y NAME encima.

~~~
db.serialize(() => {
  console.log('ID \t NAME')
  console.log('-- \t ----')
  db.each(`SELECT PlaylistId as id,
                  Name as name
           FROM playlists`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(`${row.id} \t ${row.name}`);
  });
});
~~~
Que devolverá el mismo resultado que la función anterior.



*You can download the chinook example database at this [page](https://www.sqlitetutorial.net/wp-content/uploads/2018/03/chinook.zip) and save into db folder*

## Páginas recomendadas:

- [Connecting To SQLite Database Using Node.js](https://www.sqlitetutorial.net/sqlite-nodejs/connect/)
- [Setting up a local SQLite database](https://www.prisma.io/dataguide/sqlite/setting-up-a-local-sqlite-database)



