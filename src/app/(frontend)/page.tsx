import { getPayload } from 'payload'
import config from '@/payload.config'
import HomeSection from './components/FrontPage'
import SectionHeader from './components/SectionHeader'
import ScrubText from './components/ScrubText'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const { docs: services } = await payload.find({
    collection: 'home-page',
    limit: 100,
  })

  return (
    <div className="relative w-full overflow-x-clip">
      <SectionHeader />
      <div className="stage-over">
        <section className="pt-24 md:pt-36 pb-4">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-cobalt mb-8">Who we are</p>
            <ScrubText
              className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] max-w-6xl"
              text="We're the *A. Mabini Chapter* {seal} of the Order of DeMolay — young men growing in *character,* *leadership* and *brotherhood* since April 1984. Every meeting, every service and every friendship is part of a story we're proud to carry forward."
            />
          </div>
        </section>
        <HomeSection services={services} />
      </div>
    </div>
  )
}
