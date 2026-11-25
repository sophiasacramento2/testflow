// Conexão com o banco de dados MySQL
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

// Lê o arquivo .env desta pasta (server), de onde quer que o servidor seja iniciado
dotenv.config({ path: fileURLToPath(new URL('.env', import.meta.url)), quiet: true })

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'testflow',
  charset: 'utf8mb4'
})

export default db
