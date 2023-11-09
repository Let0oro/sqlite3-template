const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./db/chinook.db", (err) => {
  if (err) {
    return console.error('ERROR ->', err.message);
  }
  console.log(">>> Created and connected to test local database");
});

let query = `SELECT PlaylistId as id,
Name as name
FROM playlists`;

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

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(">>> Close the database connection.");
});
