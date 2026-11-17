import { useState, type FormEvent } from 'react'
import { objectives, visitTimes } from '../data/landingPage'
import { supabase } from '../lib/supabase'

type FormStatus = {
  kind: 'success' | 'error'
  message: string
}

function BookingForm() {
  const [objective, setObjective] = useState(objectives[0])
  const [visitTime, setVisitTime] = useState(visitTimes[0])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<FormStatus | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus(null)

    if (!supabase) {
      setStatus({
        kind: 'error',
        message:
          'O envio ainda não está configurado. Confira as variáveis do Supabase no arquivo .env.local.',
      })
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from('pre_bookings').insert({
        full_name: String(formData.get('name')).trim(),
        phone: String(formData.get('phone')).trim(),
        email: String(formData.get('email')).trim() || null,
        objective,
        visit_time: visitTime,
        consent: formData.get('consent') === 'on',
      })

      if (error) {
        console.error('Não foi possível salvar o pré-agendamento.', error)
        setStatus({
          kind: 'error',
          message:
            'Não foi possível enviar seu pré-agendamento. Tente novamente ou entre em contato com a academia.',
        })
        return
      }

      form.reset()
      setObjective(objectives[0])
      setVisitTime(visitTimes[0])
      setStatus({
        kind: 'success',
        message: 'Pré-agendamento enviado! Em breve, nossa equipe entrará em contato.',
      })
    } catch (error) {
      console.error('Erro de conexão ao enviar o pré-agendamento.', error)
      setStatus({
        kind: 'error',
        message:
          'Ocorreu um erro de conexão ao enviar. Verifique sua internet e tente novamente.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="form-section" id="formulario">
      <div className="form-container">
        <h2>Faça seu pré-agendamento</h2>
        <form aria-busy={isSubmitting} onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="full-name">Nome completo</label>
            <input autoComplete="name" id="full-name" name="name" required />
          </div>

          <div className="field">
            <label htmlFor="phone">WhatsApp</label>
            <input
              autoComplete="tel"
              id="phone"
              name="phone"
              placeholder="(00) 00000-0000"
              type="tel"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="email">E-mail (opcional)</label>
            <input
              autoComplete="email"
              id="email"
              name="email"
              type="email"
            />
          </div>

          <fieldset className="choice-group">
            <legend>Qual é o seu objetivo?</legend>
            <div className="choice-list">
              {objectives.map((item) => (
                <button
                  aria-pressed={objective === item}
                  className={`choice-chip${objective === item ? ' is-selected' : ''}`}
                  key={item}
                  onClick={() => setObjective(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="choice-group">
            <legend>Melhor período para a visita</legend>
            <div className="choice-list">
              {visitTimes.map((item) => (
                <button
                  aria-pressed={visitTime === item}
                  className={`choice-chip${visitTime === item ? ' is-selected' : ''}`}
                  key={item}
                  onClick={() => setVisitTime(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="consent">
            <input name="consent" required type="checkbox" />
            <span>
              Concordo em receber contato da [NOME DA ACADEMIA] por WhatsApp ou
              e-mail sobre a inauguração e autorizo o uso dos meus dados para
              esse fim, conforme a [LINK DA POLÍTICA DE PRIVACIDADE].
            </span>
          </label>

          <button
            className="button button-primary submit-button"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Enviando...' : 'Quero meu pré-agendamento'}
          </button>

          {status && (
            <p
              className={`form-notice form-notice-${status.kind}`}
              role={status.kind === 'error' ? 'alert' : 'status'}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default BookingForm
