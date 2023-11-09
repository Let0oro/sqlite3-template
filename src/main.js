//  https://www.sqlitetutorial.net/sqlite-nodejs/connect/
//  https://www.prisma.io/dataguide/sqlite/setting-up-a-local-sqlite-database

// You can download the chinook example database at this page: https://www.sqlitetutorial.net/wp-content/uploads/2018/03/chinook.zip  

const sqlite3 = require("sqlite3").verbose();


let db = new sqlite3.Database("./db/chinook.db", (err) => {
  if (err) {
    return console.error('ERROR ->', err.message);
  }
  console.log("Created and connected to test local database");
});

let query = `SELECT PlaylistId as id,
Name as name
FROM playlists`;

db.all(query, (err, rows) => {
    if (err) {
      throw err;
    }
    // console.log(rows)
    rows.forEach(row => {
    console.log(row.id + "\t" + row.name);
  })
})

// db.serialize(() => {
//   db.each(query, (err, row) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log(row.id + "\t" + row.name);
//   });
// });

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});
