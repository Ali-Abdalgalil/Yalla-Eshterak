export default function ContentGrid({ items }) {
  if (!items?.length) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4 lg:px-12">
      {items.map((item) => (
        <div
          key={item.id}
          className="content-card rounded-lg overflow-hidden bg-stream-card group cursor-pointer"
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
  )
}
