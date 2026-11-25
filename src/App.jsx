import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoaderCircle, DatabaseZap } from 'lucide-react'

import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import TestCases from './pages/TestCases'
import NewTestCase from './pages/NewTestCase'
import TestCaseDetails from './pages/TestCaseDetails'
import About from './pages/About'

import {
  listarCasos,
  criarCaso,
  atualizarStatus,
  excluirCaso
} from './services/api'

import './styles/Dashboard.css'

function App() {
  const [testCases, setTestCases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Busca os casos de teste no banco de dados (MySQL)
  function fetchTestCases() {
    return listarCasos()
      .then((data) => {
        setTestCases(data)
        setError('')
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  // Carrega os dados assim que o site é aberto
  useEffect(() => {
    fetchTestCases()
  }, [])

  // Botão "Tentar novamente"
  function loadTestCases() {
    setLoading(true)
    fetchTestCases()
  }

  async function addTestCase(newTestCase) {
    const saved = await criarCaso(newTestCase)
    setTestCases([...testCases, saved])
  }

  async function updateTestCaseStatus(id, status) {
    await atualizarStatus(id, status)

    setTestCases(
      testCases.map((test) =>
        test.id === id ? { ...test, status } : test
      )
    )
  }

  async function deleteTestCase(id) {
    await excluirCaso(id)
    setTestCases(testCases.filter((test) => test.id !== id))
  }

  // Renderização condicional: carregando, erro ou o conteúdo das páginas
  function renderContent() {
    if (loading) {
      return (
        <main className="app-feedback">
          <LoaderCircle size={36} className="spin" />
          <h2>Carregando casos de teste...</h2>
        </main>
      )
    }

    if (error) {
      return (
        <main className="app-feedback">
          <DatabaseZap size={40} />
          <h2>Não foi possível conectar ao banco de dados</h2>
          <p>{error}</p>
          <p>Verifique se o servidor (pasta <code>server</code>) e o MySQL estão rodando.</p>

          <button onClick={loadTestCases}>
            Tentar novamente
          </button>
        </main>
      )
    }

    return (
      <Routes>

        <Route
          path="/"
          element={<Dashboard testCases={testCases} />}
        />

        <Route
          path="/casos"
          element={<TestCases testCases={testCases} />}
        />

        <Route
          path="/novo-caso"
          element={<NewTestCase addTestCase={addTestCase} />}
        />

        <Route
          path="/casos/:id"
          element={
            <TestCaseDetails
              testCases={testCases}
              updateTestCaseStatus={updateTestCaseStatus}
              deleteTestCase={deleteTestCase}
            />
          }
        />

        <Route
          path="/sobre"
          element={<About />}
        />

      </Routes>
    )
  }

  return (
    <BrowserRouter>
      <div className="app">

        <Sidebar />

        {renderContent()}

      </div>
    </BrowserRouter>
  )
}

export default App
