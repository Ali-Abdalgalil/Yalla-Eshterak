import { Link } from 'react-router-dom'

export default function PlatformCard({ platform }) {
  return (
    <Link
      to={`/platform/${platform.slug}`}
      className="group block bg-white dark:bg-stream-card rounded-lg overflow-hidden border border-gray-200 dark:border-white/10 hover:border-stream-red dark:hover:border-stream-red transition-all duration-300 hover:shadow-xl hover:scale-105"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-stream-dark">
        <img
          src={
            platform.logo
              ? platform.logo
              : `https://via.placeholder.com/300x200/${platform.color.replace(
                  '#',
                  ''
                )}/FFFFFF?text=${encodeURIComponent(platform.name)}`
          }
          alt={platform.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-stream-red transition-colors">
          {platform.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {platform.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-stream-red">
            {platform.price}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-500 group-hover:text-stream-red transition-colors">
          عرض التفاصيل
          </span>
        </div>
      </div>
    </Link>
  )
} 