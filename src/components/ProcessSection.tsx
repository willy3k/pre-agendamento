import { steps } from '../data/landingPage'

function ProcessSection() {
  return (
    <section className="band" id="como-funciona">
      <div className="section-shell">
        <h2>Como funciona</h2>
        <div className="steps-grid">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <p className="step-number">{step.number}</p>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
