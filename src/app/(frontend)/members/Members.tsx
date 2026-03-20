'use client'

import { useState, useMemo } from 'react'
import { MagnifyingGlassIcon, ChevronDownIcon, ChevronUpIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { Member } from '@/payload-types'

export default function MembersClient({ initialData }: { initialData: Member[] }) {
  const [search, setSearch] = useState('')
  
  // FIXED: Using Member['id'] ensures compatibility with both string and number IDs
  const [expandedId, setExpandedId] = useState<Member['id'] | null>(null)

  const filteredMembers = useMemo(() => {
    if (!search) return initialData
    return initialData.filter(member => 
      `${member.firstName} ${member.surname}`.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase()) ||
      member.batchName?.toLowerCase().includes(search.toLowerCase())
    )
  }, [initialData, search])

  return (
    <div className="min-h-screen bg-white text-black p-4 mt-20 md:p-8 lg:p-16">
      <div className="max-w-5xl mx-auto">
        
        {/* Minimalist Header synced with Activities/Services */}
        <header className="mb-12 group">
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-[0.5em] text-zinc-400 font-bold ml-0.5 transition-colors group-hover:text-zinc-600">
              The Roster of
            </span>
            <h2 className="text-3xl font-light tracking-tighter uppercase font-serif text-zinc-900 leading-none">
              Sublime Sirs
            </h2>
          </div>
          <div className="w-8 h-[1px] bg-zinc-100 mt-6 transition-all duration-500 group-hover:w-16 bg-zinc-200"></div>
        </header>
         
        {/* Search Bar */}
        <div className="relative w-full lg:w-80 mb-12">
          <MagnifyingGlassIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-300" />
          <input 
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-b border-zinc-100 py-3 pl-8 text-[10px] tracking-[0.2em] uppercase focus:outline-none focus:border-black transition-all"
          />
        </div>

        <div className="space-y-1">
          {/* DESKTOP HEADER */}
          <div className="hidden md:grid grid-cols-12 pb-6 border-b border-zinc-50 uppercase text-[8px] tracking-[0.4em] text-zinc-400 font-black px-4">
            <div className="col-span-6">Member Identity</div>
            <div className="col-span-3 text-center">Batch</div>
            <div className="col-span-3 text-right">Initiation Date</div>
          </div>

          {filteredMembers.map((member) => (
            <div key={member.id} className="border-b border-zinc-50 last:border-0">
              <div 
                onClick={() => setExpandedId(expandedId === member.id ? null : member.id)}
                className="py-8 px-4 cursor-pointer hover:bg-zinc-50/50 transition-colors group"
              >
                <div className="flex items-start md:grid md:grid-cols-12 md:items-center gap-4">
                  
                  <div className="flex-shrink-0 mt-1 md:mt-0 md:col-span-1">
                     {expandedId === member.id ? 
                        <ChevronUpIcon className="w-3 h-3 text-black" /> : 
                        <ChevronDownIcon className="w-3 h-3 text-zinc-200 group-hover:text-zinc-400" />
                     }
                  </div>

                  <div className="flex-grow md:col-span-5">
                    <p className="text-[13px] md:text-[14px] font-bold uppercase tracking-tight text-zinc-900">
                        {member.firstName} {member.surname}
                    </p>
                    <p className="text-[9px] md:text-[10px] text-zinc-400 font-medium tracking-widest uppercase mt-0.5">
                        {member.address || 'Location Not Set'}
                    </p>

                    {/* MOBILE 2ND ROW */}
                    <div className="flex md:hidden items-center justify-between mt-4 pt-4 border-t border-zinc-50">
                      <div className="flex flex-col">
                        <span className="text-[7px] uppercase tracking-[0.4em] text-zinc-300 font-bold mb-1">Batch</span>
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500">{member.batchName || '—'}</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[7px] uppercase tracking-[0.4em] text-zinc-300 font-bold mb-1">Initiated</span>
                        <span className="text-[10px] font-medium text-zinc-900">
                           {member.initiationDate ? 
                              new Date(member.initiationDate).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }) : 
                              '—'
                           }
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* DESKTOP COLUMNS */}
                  <div className="hidden md:block md:col-span-3 text-center text-[11px] uppercase tracking-widest text-zinc-500">
                    {member.batchName || '—'}
                  </div>
                  <div className="hidden md:block md:col-span-3 text-right text-[11px] font-medium text-zinc-900">
                    {member.initiationDate ? 
                        new Date(member.initiationDate).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }) : 
                        '—'
                    }
                  </div>
                </div>
              </div>

              {/* Expanded Info */}
              {expandedId === member.id && (
                <div className="bg-zinc-50/30 px-6 py-10 md:ml-12 border-l border-zinc-200 animate-in slide-in-from-left-2 duration-300">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h4 className="text-[8px] uppercase tracking-[0.5em] text-zinc-400 font-bold flex items-center gap-2">
                          <MapPinIcon className="w-3 h-3" /> Digital Contact
                        </h4>
                        <div className="space-y-4 text-[12px] text-zinc-600">
                          <div>
                            <span className="block text-[7px] text-zinc-300 uppercase tracking-widest mb-1">Mobile</span>
                            <p className="text-zinc-900 font-medium tracking-wide">{member.phone}</p>
                          </div>
                          <div>
                            <span className="block text-[7px] text-zinc-300 uppercase tracking-widest mb-1">Email</span>
                            <p className="text-zinc-900 font-medium tracking-wide lowercase">{member.email}</p>
                          </div>
                        </div>
                      </div>
                   </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}