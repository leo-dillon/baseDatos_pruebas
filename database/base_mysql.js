import mysql from "mysql2/promise"

const db_mysql = await mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  port: 3306,
  password: "",
  database: "test"
})

export default db_mysql 