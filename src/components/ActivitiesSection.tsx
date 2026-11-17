import { activities } from '../data/landingPage'

function ActivitiesSection() {
  return (
    <section className="section-shell activities-section">
      <h2>O que você vai encontrar</h2>
      <ul className="activity-list">
        {activities.map((activity) => (
          <li key={activity}>{activity}</li>
        ))}
      </ul>
    </section>
  )
}

export default ActivitiesSection
