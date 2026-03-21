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
    <div className="max-w-7xl mx-auto px-6 pt-10 pb-8 space-y-3 overflow-x-hidden">
      <p className="text-[14px] uppercase tracking-[0.6em] text-zinc-500 font-medium">
        {headerData.topLabel}
      </p>
      <h2 className="text-2xl md:text-3xl uppercase font-bold font-serif text-black">
        {headerData.topDescription}
      </h2>
    </div>
    </>
  )
}