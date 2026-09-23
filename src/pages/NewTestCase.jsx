import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Save,
  FileText,
  ListChecks,
  Activity
} from 'lucide-react'

import '../styles/NewTestCase.css'

function NewTestCase({ addTestCase }) {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    feature: '',
    priority: '',
    preconditions: '',
    steps: '',
    expected: '',
    status: 'Não executado'
  })

  function handleChange(event) {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newTestCase = {
      id: `TC${String(Date.now()).slice(-4)}`,
      ...form
    }

    addTestCase(newTestCase)
    navigate('/casos')
  }

  return (
    <main className="new-test-page">

      <header className="new-test-header">

        <div>
          <button
            className="back-link"
            type="button"
            onClick={() => navigate('/casos')}
          >
            <ArrowLeft size={16} />
            Voltar para casos
          </button>

          <span className="page-eyebrow">NOVO REGISTRO</span>

          <h1>Novo Caso de Teste</h1>

          <p>
            Documente as condições, etapas e resultado esperado do teste.
          </p>
        </div>

      </header>

      <form className="modern-test-form" onSubmit={handleSubmit}>

        <section className="form-section">

          <div className="form-section-header">

            <div className="form-section-icon">
              <FileText size={20} />
            </div>

            <div>
              <h2>Informações básicas</h2>
              <p>Identifique o caso de teste e sua prioridade.</p>
            </div>

          </div>

          <div className="form-content">

            <div className="form-group full-field">
              <label htmlFor="title">
                Título do caso
                <span>*</span>
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="Ex.: Login com credenciais inválidas"
                required
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="feature">
                  Funcionalidade
                  <span>*</span>
                </label>

                <input
                  id="feature"
                  name="feature"
                  type="text"
                  value={form.feature}
                  onChange={handleChange}
                  placeholder="Ex.: Autenticação"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="priority">
                  Prioridade
                  <span>*</span>
                </label>

                <select
                  id="priority"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione uma prioridade</option>
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </div>

            </div>

          </div>

        </section>

        <section className="form-section">

          <div className="form-section-header">

            <div className="form-section-icon">
              <ListChecks size={20} />
            </div>

            <div>
              <h2>Execução do teste</h2>
              <p>Descreva como o teste deve ser realizado.</p>
            </div>

          </div>

          <div className="form-content">

            <div className="form-group full-field">
              <label htmlFor="preconditions">
                Pré-condições
              </label>

              <textarea
                id="preconditions"
                name="preconditions"
                value={form.preconditions}
                onChange={handleChange}
                rows="3"
                placeholder="Ex.: O usuário deve possuir uma conta cadastrada."
              />
            </div>

            <div className="form-group full-field">
              <label htmlFor="steps">
                Passos para execução
                <span>*</span>
              </label>

              <textarea
                id="steps"
                name="steps"
                value={form.steps}
                onChange={handleChange}
                rows="6"
                placeholder={'1. Acessar a página\n2. Preencher os dados\n3. Clicar no botão'}
                required
              />

              <small>
                Escreva cada etapa em uma nova linha para facilitar a leitura.
              </small>
            </div>

            <div className="form-group full-field">
              <label htmlFor="expected">
                Resultado esperado
                <span>*</span>
              </label>

              <textarea
                id="expected"
                name="expected"
                value={form.expected}
                onChange={handleChange}
                rows="3"
                placeholder="Descreva o comportamento esperado do sistema."
                required
              />
            </div>

          </div>

        </section>

        <section className="form-section">

          <div className="form-section-header">

            <div className="form-section-icon">
              <Activity size={20} />
            </div>

            <div>
              <h2>Status da execução</h2>
              <p>Informe a situação atual deste caso.</p>
            </div>

          </div>

          <div className="form-content">

            <div className="form-group status-select">
              <label htmlFor="status">Status</label>

              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Não executado">Não executado</option>
                <option value="Passou">Passou</option>
                <option value="Falhou">Falhou</option>
              </select>
            </div>

          </div>

        </section>

        <div className="form-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate('/casos')}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="save-button"
          >
            <Save size={18} />
            Salvar Caso
          </button>

        </div>

      </form>

    </main>
  )
}

export default NewTestCase