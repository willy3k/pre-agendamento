import { faqs } from '../data/landingPage'

function FaqSection() {
  return (
    <section className="band faq-section">
      <div className="faq-container">
        <h2>Dúvidas frequentes</h2>
        {faqs.map((faq) => (
          <article className="faq-item" key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FaqSection
