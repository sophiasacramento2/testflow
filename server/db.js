// Conexão com o banco de dados MySQL
import mysql from 'mysql2/promise'
import 'dotenv/config'

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'testflow',
  charset: 'utf8mb4'
})

export default db
