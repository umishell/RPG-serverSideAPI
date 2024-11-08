const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "rpg",
});                                                                                                                                                         

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL conectado com sucesso!");
    connection.release();
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
};

exports.query = async (_query, values) => {
  try {
    const [rows, fields] = await pool.execute(_query, values);
    return rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};


exports.testConnection = testConnection;
