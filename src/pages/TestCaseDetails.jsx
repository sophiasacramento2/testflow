import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ClipboardCheck,
  ListChecks,
  Target,
  CircleCheck,
  AlertCircle
} from 'lucide-react'

import '../styles/TestCaseDetails.css'

function TestCaseDetails({ testCases }) {
  const navigate = useNavigate()
  const { id } = useParams()

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

      </header>

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