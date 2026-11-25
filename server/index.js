// API do TestFlow: Express + MySQL
import express from 'express'
import cors from 'cors'

import db from './db.js'

const app = express()

app.use(cors())
app.use(express.json())

const CAMPOS = 'id, title, feature, priority, status, preconditions, steps, expected'

// Listar todos os casos de teste
app.get('/api/casos', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT ${CAMPOS} FROM casos_teste ORDER BY created_at, id`
    )
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: 'Erro ao buscar os casos de teste.' })
  }
})

// Buscar um caso pelo ID
app.get('/api/casos/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT ${CAMPOS} FROM casos_teste WHERE id = ?`,
      [req.params.id]
    )

    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Caso de teste não encontrado.' })
    }

    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: 'Erro ao buscar o caso de teste.' })
  }
})

// Cadastrar um novo caso
app.post('/api/casos', async (req, res) => {
  const { title, feature, priority, status, preconditions, steps, expected } = req.body

  if (!title || !feature || !priority || !steps || !expected) {
    return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios.' })
  }

  try {
    // Gera o próximo código: TC001, TC002, TC003...
    const [[{ ultimo }]] = await db.query(
      "SELECT MAX(CAST(SUBSTRING(id, 3) AS UNSIGNED)) AS ultimo FROM casos_teste WHERE id LIKE 'TC%'"
    )
    const id = `TC${String((ultimo || 0) + 1).padStart(3, '0')}`

    await db.query(
      `INSERT INTO casos_teste (${CAMPOS}) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, feature, priority, status || 'Não executado', preconditions || '', steps, expected]
    )

    res.status(201).json({
      id, title, feature, priority,
      status: status || 'Não executado',
      preconditions: preconditions || '',
      steps, expected
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: 'Erro ao cadastrar o caso de teste.' })
  }
})

// Atualizar o status de um caso (registrar o resultado da execução)
app.patch('/api/casos/:id/status', async (req, res) => {
  const { status } = req.body
  const permitidos = ['Passou', 'Falhou', 'Não executado']

  if (!permitidos.includes(status)) {
    return res.status(400).json({ erro: 'Status inválido.' })
  }

  try {
    const [result] = await db.query(
      'UPDATE casos_teste SET status = ? WHERE id = ?',
      [status, req.params.id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Caso de teste não encontrado.' })
    }

    res.json({ id: req.params.id, status })
  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: 'Erro ao atualizar o status.' })
  }
})

// Excluir um caso
app.delete('/api/casos/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM casos_teste WHERE id = ?',
      [req.params.id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Caso de teste não encontrado.' })
    }

    res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: 'Erro ao excluir o caso de teste.' })
  }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, async () => {
  console.log(`API do TestFlow rodando em http://localhost:${PORT}`)

  try {
    await db.query('SELECT 1')
    console.log('Conectado ao MySQL com sucesso!')
  } catch (error) {
    console.error('Não foi possível conectar ao MySQL:', error.message || error.code)
    console.error('Confira os dados do arquivo server/.env e se o MySQL está ligado.')
  }
})
