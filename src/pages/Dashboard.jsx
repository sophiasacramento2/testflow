import {
  ClipboardList,
  CircleCheck,
  CircleX,
  Clock3,
  Plus,
  ArrowRight,
  Activity
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'

import StatusCard from '../components/StatusCard'

function Dashboard({ testCases }) {
  const navigate = useNavigate()

  const passed = testCases.filter(
    test => test.status === 'Passou'
  ).length

  const failed = testCases.filter(
    test => test.status === 'Falhou'
  ).length

  const pending = testCases.filter(
    test => test.status === 'Não executado'
  ).length

  const executed = passed + failed

  const progress =
    testCases.length > 0
      ? Math.round((executed / testCases.length) * 100)
      : 0

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
    <main className="dashboard">

      <header className="dashboard-header">
        <div>
          <span className="page-eyebrow">VISÃO GERAL</span>

          <h1>Dashboard</h1>

          <p>
            Acompanhe a execução e o desempenho dos seus casos de teste.
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

      <section className="status-cards">

        <StatusCard
          icon={<ClipboardList size={22} />}
          color="total"
          label="Total"
          value={testCases.length}
          description="Casos cadastrados"
        />

        <StatusCard
          icon={<CircleCheck size={22} />}
          color="success"
          label="Sucesso"
          value={passed}
          description="Testes que passaram"
        />

        <StatusCard
          icon={<CircleX size={22} />}
          color="failure"
          label="Atenção"
          value={failed}
          description="Testes que falharam"
        />

        <StatusCard
          icon={<Clock3 size={22} />}
          color="pending"
          label="Pendentes"
          value={pending}
          description="Aguardando execução"
        />

      </section>

      <section className="progress-card">

        <div className="progress-header">
          <div>
            <div className="progress-title">
              <Activity size={20} />
              <h2>Progresso de execução</h2>
            </div>

            <p>
              {executed} de {testCases.length} casos já foram executados.
            </p>
          </div>

          <strong>{progress}%</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-value"
            style={{ width: `${progress}%` }}
          />
        </div>

      </section>

      <section className="recent-tests">

        <div className="section-header">
          <div>
            <h2>Casos de Teste Recentes</h2>
            <p>Últimos casos cadastrados no TestFlow.</p>
          </div>

          <button onClick={() => navigate('/casos')}>
            Ver todos
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="table-wrapper">
          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Caso de Teste</th>
                <th>Prioridade</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {testCases.slice(-5).reverse().map((test) => (
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
                      className="table-action"
                      onClick={() => navigate(`/casos/${test.id}`)}
                      title="Ver detalhes"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>

      </section>

    </main>
  )
}

export default Dashboard