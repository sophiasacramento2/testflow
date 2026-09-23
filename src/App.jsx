import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import TestCases from './pages/TestCases'
import NewTestCase from './pages/NewTestCase'
import TestCaseDetails from './pages/TestCaseDetails'
import About from './pages/About'

import './styles/Dashboard.css'

function App() {
  const [testCases, setTestCases] = useState([
    {
      id: 'TC001',
      title: 'Login com dados válidos',
      feature: 'Autenticação',
      priority: 'Alta',
      status: 'Passou',
      preconditions: 'Usuário deve estar cadastrado no sistema.',
      steps:
        '1. Acessar a página de login\n2. Informar e-mail\n3. Informar senha\n4. Clicar em Entrar',
      expected:
        'O usuário deve ser direcionado para a página inicial.'
    },
    {
      id: 'TC002',
      title: 'Recuperação de senha',
      feature: 'Autenticação',
      priority: 'Média',
      status: 'Falhou',
      preconditions: 'Usuário deve possuir uma conta cadastrada.',
      steps:
        '1. Acessar o login\n2. Clicar em Esqueci minha senha\n3. Informar o e-mail',
      expected:
        'O sistema deve enviar as instruções de recuperação.'
    },
    {
      id: 'TC003',
      title: 'Cadastro de usuário',
      feature: 'Usuários',
      priority: 'Alta',
      status: 'Não executado',
      preconditions: 'Usuário não deve possuir cadastro.',
      steps:
        '1. Acessar cadastro\n2. Preencher os campos\n3. Clicar em Cadastrar',
      expected:
        'O novo usuário deve ser cadastrado.'
    }
  ])

  function addTestCase(newTestCase) {
    setTestCases([...testCases, newTestCase])
  }

  return (
    <BrowserRouter>
      <div className="app">

        <Sidebar />

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
            element={<TestCaseDetails testCases={testCases} />}
          />

          <Route
            path="/sobre"
            element={<About />}
          />

        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App