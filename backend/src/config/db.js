const mysql = require("mysql2/promise");

let pool;

const initDb = async () => {
  if (pool) return pool;

  pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "dms",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // Validate connectivity on startup.
  const conn = await pool.getConnection();
  conn.release();

  return pool;
};

const getPool = () => {
  if (!pool) {
    throw new Error("Database not initialized. Call initDb() first.");
  }
  return pool;
};

module.exports = { initDb, getPool };
