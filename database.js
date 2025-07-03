const Database = require('better-sqlite3');
const db = new Database('db/caixa.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS vendas (
    id INTEGER PRIMARY KEY,
    produto TEXT,
    preco REAL,
    quantidade INTEGER,
    data TEXT
  )
`).run();

module.exports = db;
