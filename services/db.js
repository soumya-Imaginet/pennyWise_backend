const mysql = require("mysql2/promise");
const config = require("../config");

async function query(sql, params) {
  const pool = await mysql.createConnection(config.db);

  const [results] = await pool.execute(sql, params);
  pool.end();
  return results;
}

module.exports = {
  query,
};
