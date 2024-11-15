const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./consultas.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Criar a tabela de usuários
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  )`);

  // Criar a tabela de consultas
  db.run(`
CREATE TABLE IF NOT EXISTS preferences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  charger_type TEXT NOT NULL,
  preferred_time TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
  `);
});


const savePreferences = (userId, chargerType, preferredTime, callback) => {
    db.run(
      `INSERT INTO preferences (user_id, chargerType, preferredTime) VALUES (?, ?, ?)`,
      [userId, chargerType, preferredTime],
      function (err) {
        callback(err, { id: this.lastID });
      }
    );
  };
  
  const getPreferences = (userId, callback) => {
    db.get(
      `SELECT * FROM preferences WHERE userId = ? ORDER BY id DESC LIMIT 1`,
      [userId],
      (err, row) => {
        callback(err, row);
      }
    );
  };
  
  module.exports = {
    savePreferences,
    getPreferences,
  };

module.exports = db;