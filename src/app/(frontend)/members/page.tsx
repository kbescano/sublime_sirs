import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'
import MembersClient from './Members' // Import the client component

export const dynamic = 'force-dynamic'

export default async function MembersPage() {
  const payload = await getPayload({ config })

  const membersData = await payload.find({
    collection: 'members',
    sort: 'surname',
    limit: 1000,
  })

  // Pass the data to the client component
  return <MembersClient initialData={membersData.docs} />
}