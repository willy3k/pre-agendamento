import ActivitiesSection from './components/ActivitiesSection'
import BenefitsSection from './components/BenefitsSection'
import BookingForm from './components/BookingForm'
import FaqSection from './components/FaqSection'
import HeroSection from './components/HeroSection'
import ProcessSection from './components/ProcessSection'
import SiteFooter from './components/SiteFooter'
import SiteHeader from './components/SiteHeader'

function App() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <BenefitsSection />
        <ActivitiesSection />
        <ProcessSection />
        <BookingForm />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  )
}

export default App
