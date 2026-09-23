import {
  FlaskConical,
  Target,
  Lightbulb
} from 'lucide-react'

import '../styles/About.css'

function About() {
  return (
    <main className="about-page">

      <header className="about-header">
        <span className="page-eyebrow">
          SOBRE O PROJETO
        </span>

        <h1>Sobre o TestFlow</h1>

        <p>
          Uma solução web para organização e acompanhamento
          de casos de teste de software.
        </p>
      </header>

      <section className="about-hero">

        <div className="about-hero-icon">
          <FlaskConical size={30} />
        </div>

        <div>
          <h2>TestFlow</h2>

          <p>
            O TestFlow foi desenvolvido para auxiliar profissionais
            de QA e equipes de desenvolvimento na criação, organização
            e acompanhamento de casos de teste.
          </p>
        </div>

      </section>

      <section className="about-grid">

        <article className="about-info-card">

          <div className="about-card-icon problem-icon">
            <Target size={22} />
          </div>

          <h2>O problema</h2>

          <p>
            Muitas equipes registram seus casos de teste utilizando
            planilhas, documentos e mensagens. Isso pode deixar as
            informações descentralizadas e dificultar o acompanhamento
            dos testes executados, aprovados, reprovados ou pendentes.
          </p>

        </article>

        <article className="about-info-card">

          <div className="about-card-icon solution-icon">
            <Lightbulb size={22} />
          </div>

          <h2>A solução</h2>

          <p>
            O TestFlow centraliza os casos de teste em um único
            ambiente, permitindo cadastrar testes, definir prioridades,
            registrar resultados e acompanhar o status das execuções.
          </p>

        </article>

      </section>

    </main>
  )
}

export default About