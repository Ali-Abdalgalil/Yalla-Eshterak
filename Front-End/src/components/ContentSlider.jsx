import { useRef } from 'react'

export default function ContentSlider({ title, items }) {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    if (!scrollRef.current) return
    const width = scrollRef.current.offsetWidth
    scrollRef.current.scrollBy({ left: dir * width * 0.8, behavior: 'smooth' })
  }

  if (!items?.length) return null

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4 px-4 lg:px-12">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            className="w-10 h-10 rounded-full bg-stream-card/80 hover:bg-stream-hover flex items-center justify-center text-white transition"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-10 h-10 rounded-full bg-stream-card/80 hover:bg-stream-hover flex items-center justify-center text-white transition"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-4 lg:px-12 pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="content-card flex-shrink-0 w-[180px] sm:w-[200px] rounded-lg overflow-hidden bg-stream-card group cursor-pointer"
          >
            <div className="aspect-video relative">
              <img
                src={item.thumb}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="absolute top-2 right-2 px-2 py-0.5 text-xs bg-black/70 rounded capitalize">
                {item.type}
              </span>
            </div>
            <p className="p-2 text-sm font-medium text-white truncate">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
