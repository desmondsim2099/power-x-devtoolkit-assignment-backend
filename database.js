const sqlite3 = require('sqlite3').verbose();


var connection = new sqlite3.Database('./shopping.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the market database.');
});

module.exports = { connection };

