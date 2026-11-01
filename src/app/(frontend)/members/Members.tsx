'use client'

import { useState, useMemo } from 'react'
import { MagnifyingGlassIcon, PlusIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { Member } from '@/payload-types'

const formatDate = (date?: string | null) =>
  date
    ? new Date(date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
    : '—'

export default function MembersClient({ initialData }: { initialData: Member[] }) {
  const [search, setSearch] = useState('')

  // Member['id'] stays compatible with both string and number IDs
  const [expandedId, setExpandedId] = useState<Member['id'] | null>(null)

  const filteredMembers = useMemo(() => {
    if (!search) return initialData
    const query = search.toLowerCase()
    return initialData.filter(
      (member) =>
        `${member.firstName} ${member.surname}`.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.batchName?.toLowerCase().includes(query),
    )
  }, [initialData, search])

  return (
    <section className="bg-paper text-ink py-16 md:py-28">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Search + count */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 md:mb-14">
          <div className="relative w-full md:w-[420px]">
            <MagnifyingGlassIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
            <input
              type="text"
              placeholder="Search by name, email or batch"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full bg-white border border-ink/10 py-4 pl-12 pr-5 text-sm placeholder:text-ink/35 focus:outline-none focus:border-cobalt focus:ring-4 focus:ring-cobalt/10 transition-all"
            />
          </div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-ink/40">
            Showing {filteredMembers.length} of {initialData.length}
          </span>
        </div>

        <div className="bg-white rounded-[28px] md:rounded-[40px] p-2 md:p-4">
          {/* DESKTOP HEADER */}
          <div className="hidden md:grid grid-cols-12 px-6 py-4 text-[10px] uppercase tracking-[0.3em] text-ink/40">
            <div className="col-span-6">Member</div>
            <div className="col-span-3">Batch</div>
            <div className="col-span-2 text-right">Initiated</div>
            <div className="col-span-1" />
          </div>

          {filteredMembers.length === 0 && (
            <p className="py-20 text-center text-sm uppercase tracking-[0.3em] text-ink/40">
              No members match &ldquo;{search}&rdquo;
            </p>
          )}

          <ul>
            {filteredMembers.map((member) => {
              const isExpanded = expandedId === member.id
              return (
                <li key={member.id} className="border-t border-ink/5 first:border-t-0 md:first:border-t">
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedId(isExpanded ? null : member.id)}
                    className={`w-full text-left rounded-[20px] md:rounded-[24px] px-4 md:px-6 py-5 md:py-6 transition-colors group ${
                      isExpanded ? 'bg-cobalt text-white' : 'hover:bg-paper'
                    }`}
                  >
                    <div className="grid grid-cols-[1fr_auto] md:grid-cols-12 items-center gap-4">
                      <div className="md:col-span-6 flex items-center gap-4 min-w-0">
                        <span
                          className={`grid place-items-center w-11 h-11 shrink-0 rounded-full font-display text-lg uppercase ${
                            isExpanded ? 'bg-white text-cobalt' : 'bg-paper text-ink'
                          }`}
                        >
                          {member.firstName.charAt(0)}
                          {member.surname.charAt(0)}
                        </span>
                        <div className="min-w-0">
                          {/* leading-tight + pt keep accents (Ñ, É) inside truncate's clipped box */}
                          <p className="font-display uppercase text-xl md:text-2xl leading-tight pt-[0.1em] tracking-tight truncate">
                            {member.firstName} {member.surname}
                          </p>
                          <p
                            className={`text-xs mt-1.5 truncate ${
                              isExpanded ? 'text-white/70' : 'text-ink/45'
                            }`}
                          >
                            {member.address || 'Location not set'}
                            <span className="md:hidden"> · {member.batchName || '—'}</span>
                          </p>
                        </div>
                      </div>

                      <div className="hidden md:block md:col-span-3 text-sm">{member.batchName || '—'}</div>
                      <div className="hidden md:block md:col-span-2 text-right text-sm">
                        {formatDate(member.initiationDate)}
                      </div>
                      <div className="md:col-span-1 flex justify-end">
                        <span
                          className={`grid place-items-center w-9 h-9 rounded-full border transition-all duration-300 ${
                            isExpanded
                              ? 'rotate-45 border-white/40'
                              : 'border-ink/10 group-hover:border-cobalt group-hover:text-cobalt'
                          }`}
                        >
                          <PlusIcon className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Info */}
                  {isExpanded && (
                    <div className="grid sm:grid-cols-3 gap-3 px-2 md:px-6 py-4 md:py-6">
                      <a
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-3 rounded-2xl bg-paper px-5 py-4 hover:bg-cobalt/5 transition-colors"
                      >
                        <PhoneIcon className="w-4 h-4 text-cobalt shrink-0" />
                        <span className="min-w-0">
                          <span className="block text-[10px] uppercase tracking-[0.25em] text-ink/40">Mobile</span>
                          <span className="block text-sm font-medium truncate">{member.phone}</span>
                        </span>
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-3 rounded-2xl bg-paper px-5 py-4 hover:bg-cobalt/5 transition-colors"
                      >
                        <EnvelopeIcon className="w-4 h-4 text-cobalt shrink-0" />
                        <span className="min-w-0">
                          <span className="block text-[10px] uppercase tracking-[0.25em] text-ink/40">Email</span>
                          <span className="block text-sm font-medium truncate lowercase">{member.email}</span>
                        </span>
                      </a>
                      <div className="flex items-center gap-3 rounded-2xl bg-paper px-5 py-4 md:hidden">
                        <span className="min-w-0">
                          <span className="block text-[10px] uppercase tracking-[0.25em] text-ink/40">Initiated</span>
                          <span className="block text-sm font-medium">{formatDate(member.initiationDate)}</span>
                        </span>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
