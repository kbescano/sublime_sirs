import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { HeaderConfig } from '@/payload-types'

export default async function SectionHeader() {
  const payload = await getPayload({ config })
  
  const headerData = (await payload.findGlobal({
    slug: 'header-config',
  })) as HeaderConfig

  return (
    <>
    <div className="max-w-7xl mx-auto px-6 pt-20 pb-8 mb-12 space-y-3 overflow-x-hidden">
      <p className="text-[14px] uppercase tracking-[0.6em] text-zinc-500 font-medium">
        {headerData.topLabel}
      </p>
      <h2 className="text-3xl md:text-4xl font-light tracking-tighter uppercase font-serif text-black dark:text-white">
        {headerData.topDescription}
      </h2>
    </div>
    </>
  )
}