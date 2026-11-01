import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'
import MembersClient from './Members' // Import the client component
import PageHero from '../components/PageHero'

export const dynamic = 'force-dynamic'

export default async function MembersPage() {
  const payload = await getPayload({ config })

  const membersData = await payload.find({
    collection: 'members',
    sort: 'surname',
    limit: 1000,
  })

  return (
    <div>
      <PageHero
        size="md"
        eyebrow="The roster of"
        title="Sublime Sirs"
        intro={<p>{membersData.totalDocs} brothers and counting.</p>}
      />
      <div className="stage-over">
        <MembersClient initialData={membersData.docs} />
      </div>
    </div>
  )
}
