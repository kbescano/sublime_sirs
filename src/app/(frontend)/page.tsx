
import HomeSection from './components/FrontPage'
import SectionHeader from './components/SectionHeader'


export default function HomePage() {
  return (
    /* overflow-x-hidden prevents the horizontal scrollbar 
       w-full ensures it spans the viewport correctly */
    <main className="relative w-full overflow-x-hidden min-h-screen">
      <SectionHeader />
      <HomeSection />
      {/* Future sections like Testimonials or Footer can be added here */}
    </main>
  )
}