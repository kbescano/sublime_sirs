import { getPayload } from 'payload'
import config from '@/payload.config'
import Activities from '../components/Activities'
import PageHero from '../components/PageHero'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const payload = await getPayload({ config })
  const { docs: activities } = await payload.find({
    collection: 'activities',
    limit: 100,
    sort: '-createdAt',
  })

  return (
    <div>
      <PageHero
        size="md"
        eyebrow="Chapter's events"
        title="Activities"
        intro={<p>Service, ceremony and fellowship — moments from the life of the chapter.</p>}
      />
      <div className="stage-over">
        <Activities activities={activities} />
      </div>
    </div>
  )
}
