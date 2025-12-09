import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "user",
  database: "openup",
  port: 3309,
});
