import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus,
  Search,
  SlidersHorizontal,
  ArrowRight,
  ClipboardCheck
} from 'lucide-react'

import '../styles/TestCases.css'

function TestCases({ testCases }) {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')

  const filteredTests = testCases.filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(search.toLowerCase()) ||
      test.id.toLowerCase().includes(search.toLowerCase()) ||
      test.feature.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === '' || test.status === statusFilter

    const matchesPriority =
      priorityFilter === '' || test.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  function getPriorityClass(priority) {
    if (priority === 'Alta') return 'high'
    if (priority === 'Média') return 'medium'
    return 'low'
  }

  function getStatusClass(status) {
    if (status === 'Passou') return 'passed'
    if (status === 'Falhou') return 'failed'
    return 'not-run'
  }

  return (
    <main className="test-cases-page">

      <header className="test-cases-header">
        <div>
          <span className="page-eyebrow">GERENCIAMENTO</span>

          <h1>Casos de Teste</h1>

          <p>
            Organize, consulte e acompanhe todos os seus casos de teste.
          </p>
        </div>

        <button
          className="new-test-button"
          onClick={() => navigate('/novo-caso')}
        >
          <Plus size={19} />
          Novo Caso
        </button>
      </header>

      <section className="test-toolbar">

        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Buscar por ID, título ou funcionalidade..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="filter-group">

          <SlidersHorizontal size={18} />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="">Todos os status</option>
            <option value="Passou">Passou</option>
            <option value="Falhou">Falhou</option>
            <option value="Não executado">Não executado</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
          >
            <option value="">Todas as prioridades</option>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>

        </div>

      </section>

      <section className="tests-table-container">

        <div className="tests-table-header">
          <div>
            <h2>Todos os casos</h2>

            <p>
              {filteredTests.length} caso(s) encontrado(s)
            </p>
          </div>
        </div>

        {filteredTests.length > 0 ? (

          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Caso de Teste</th>
                  <th>Funcionalidade</th>
                  <th>Prioridade</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>

                {filteredTests.map((test) => (

                  <tr key={test.id}>

                    <td>
                      <span className="test-code">
                        {test.id}
                      </span>
                    </td>

                    <td className="test-name">
                      {test.title}
                    </td>

                    <td>
                      {test.feature}
                    </td>

                    <td>
                      <span
                        className={`priority ${getPriorityClass(test.priority)}`}
                      >
                        {test.priority}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status ${getStatusClass(test.status)}`}
                      >
                        {test.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="details-button"
                        onClick={() => navigate(`/casos/${test.id}`)}
                      >
                        Ver detalhes
                        <ArrowRight size={16} />
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="empty-state">

            <div className="empty-icon">
              <ClipboardCheck size={30} />
            </div>

            <h3>Nenhum caso encontrado</h3>

            <p>
              Não encontramos casos de teste com esses filtros.
            </p>

            <button
              onClick={() => {
                setSearch('')
                setStatusFilter('')
                setPriorityFilter('')
              }}
            >
              Limpar filtros
            </button>

          </div>

        )}

      </section>

    </main>
  )
}

export default TestCases