import HeroPictogram from './components/HeroPictogram'

// Shown while a page's server data loads (Activities and Members render on each request)
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="min-h-[100svh] bg-cobalt text-white grid place-items-center rounded-b-[32px] md:rounded-b-[56px]"
    >
      <div className="flex flex-col items-center gap-8">
        <div className="h-40 md:h-52">
          <HeroPictogram solid />
        </div>
        <span className="text-[11px] uppercase tracking-[0.4em] text-white/70 animate-pulse">
          Loading
        </span>
      </div>
    </div>
  )
}
