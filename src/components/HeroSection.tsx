function HeroSection() {
  return (
    <section className="hero section-shell" id="inicio">
      <p className="eyebrow">INAUGURAÇÃO EM [DATA DE ABERTURA]</p>
      <h1>
        Sua nova academia abre em [CIDADE]. Garanta seu lugar antes de todo
        mundo.
      </h1>
      <p className="hero-copy">
        Faça seu pré-agendamento e conheça o espaço, os professores e as
        condições exclusivas de pré-inauguração.
      </p>
      <div className="hero-actions">
        <a className="button button-primary" href="#formulario">
          Fazer pré-agendamento
        </a>
        <a className="button button-outline" href="#como-funciona">
          Como funciona
        </a>
      </div>
    </section>
  )
}

export default HeroSection
