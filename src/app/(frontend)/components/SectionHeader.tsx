import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import PageHero from './PageHero'
import Emblem4D from './Emblem4D'
import HeroPictogram from './HeroPictogram'

export default async function SectionHeader() {
  const payload = await getPayload({ config })

  const headerData = await payload.findGlobal({
    slug: 'header-config',
  })

  return (
    <PageHero
      eyebrow={headerData.topLabel}
      title={headerData.topDescription}
      visual={<Emblem4D />}
      backdrop={<HeroPictogram />}
      intro={
        <p>
          A home for the young men of the A. Mabini Chapter — their story, their activities and the
          brothers who carry it forward.
        </p>
      }
    />
  )
}
