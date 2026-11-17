import { benefits } from '../data/landingPage'

function BenefitsSection() {
  return (
    <section className="band" aria-labelledby="beneficios-titulo">
      <div className="section-shell">
        <h2 id="beneficios-titulo">Por que se pré-cadastrar</h2>
        <div className="benefit-grid">
          {benefits.map((benefit) => (
            <article className="benefit-card" key={benefit.title}>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
