import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Trash2,
  CircleX,
  Clock3,
  ClipboardCheck,
  ListChecks,
  Target,
  CircleCheck,
  AlertCircle
} from 'lucide-react'

import '../styles/TestCaseDetails.css'

function TestCaseDetails({ testCases, updateTestCaseStatus, deleteTestCase }) {
  const navigate = useNavigate()
  const { id } = useParams()

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const test = testCases.find((item) => item.id === id)

  if (!test) {
    return (
      <main className="details-page">
        <div className="details-not-found">
          <AlertCircle size={40} />

          <h2>Caso de teste não encontrado</h2>

          <button onClick={() => navigate('/casos')}>
            Voltar para casos
          </button>
        </div>
      </main>
    )
  }

  // Atualiza o status no banco de dados
  async function handleStatus(status) {
    setSaving(true)
    setError('')

    try {
      await updateTestCaseStatus(test.id, status)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  // Exclui o caso do banco de dados
  async function handleDelete() {
    const confirmed = window.confirm(
      `Deseja realmente excluir o caso ${test.id}?`
    )

    if (!confirmed) return

    try {
      await deleteTestCase(test.id)
      navigate('/casos')
    } catch (err) {
      setError(err.message)
    }
  }

  function getStatusClass(status) {
    if (status === 'Passou') return 'passed'
    if (status === 'Falhou') return 'failed'
    return 'not-run'
  }

  function getPriorityClass(priority) {
    if (priority === 'Alta') return 'high'
    if (priority === 'Média') return 'medium'
    return 'low'
  }

  return (
    <main className="details-page">

      <button
        className="details-back"
        onClick={() => navigate('/casos')}
      >
        <ArrowLeft size={16} />
        Voltar para casos
      </button>

      <header className="details-header">

        <div>
          <span className="page-eyebrow">DETALHES DO CASO</span>

          <div className="details-title-row">
            <h1>{test.title}</h1>

            <span className={`status ${getStatusClass(test.status)}`}>
              {test.status}
            </span>
          </div>

          <p>
            <span className="test-code">{test.id}</span>
            {test.feature}
          </p>
        </div>

        <button
          className="delete-button"
          onClick={handleDelete}
        >
          <Trash2 size={17} />
          Excluir
        </button>

      </header>

      <section className="execution-card">

        <div>
          <h2>Registrar resultado da execução</h2>
          <p>Atualize o status deste caso após executá-lo.</p>
        </div>

        <div className="execution-buttons">

          <button
            className={`execution-button passed ${test.status === 'Passou' ? 'selected' : ''}`}
            onClick={() => handleStatus('Passou')}
            disabled={saving}
          >
            <CircleCheck size={17} />
            Passou
          </button>

          <button
            className={`execution-button failed ${test.status === 'Falhou' ? 'selected' : ''}`}
            onClick={() => handleStatus('Falhou')}
            disabled={saving}
          >
            <CircleX size={17} />
            Falhou
          </button>

          <button
            className={`execution-button not-run ${test.status === 'Não executado' ? 'selected' : ''}`}
            onClick={() => handleStatus('Não executado')}
            disabled={saving}
          >
            <Clock3 size={17} />
            Não executado
          </button>

        </div>

      </section>

      {error && (
        <div className="details-error">
          {error}
        </div>
      )}

      <section className="details-summary">

        <div className="summary-item">
          <span>Identificador</span>
          <strong>{test.id}</strong>
        </div>

        <div className="summary-item">
          <span>Funcionalidade</span>
          <strong>{test.feature}</strong>
        </div>

        <div className="summary-item">
          <span>Prioridade</span>

          <strong>
            <span className={`priority ${getPriorityClass(test.priority)}`}>
              {test.priority}
            </span>
          </strong>
        </div>

        <div className="summary-item">
          <span>Status</span>

          <strong>
            <span className={`status ${getStatusClass(test.status)}`}>
              {test.status}
            </span>
          </strong>
        </div>

      </section>

      <section className="details-content">

        <div className="detail-card">

          <div className="detail-card-header">
            <div className="detail-icon">
              <ClipboardCheck size={20} />
            </div>

            <div>
              <h2>Pré-condições</h2>
              <p>Condições necessárias antes da execução.</p>
            </div>
          </div>

          <div className="detail-card-body">
            <p>
              {test.preconditions ||
                'Nenhuma pré-condição foi informada.'}
            </p>
          </div>

        </div>

        <div className="detail-card">

          <div className="detail-card-header">
            <div className="detail-icon">
              <ListChecks size={20} />
            </div>

            <div>
              <h2>Passos para execução</h2>
              <p>Etapas necessárias para realizar o teste.</p>
            </div>
          </div>

          <div className="detail-card-body steps-content">
            {test.steps}
          </div>

        </div>

        <div className="detail-card">

          <div className="detail-card-header">
            <div className="detail-icon success-detail-icon">
              <Target size={20} />
            </div>

            <div>
              <h2>Resultado esperado</h2>
              <p>Comportamento esperado após a execução.</p>
            </div>
          </div>

          <div className="detail-card-body expected-result">
            <CircleCheck size={19} />

            <p>{test.expected}</p>
          </div>

        </div>

      </section>

    </main>
  )
}

export default TestCaseDetails