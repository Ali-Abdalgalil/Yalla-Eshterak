import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchPlatforms } from '../data/platforms'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (query.trim()) {
      const results = searchPlatforms(query)
      setSuggestions(results)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (platform) => {
    setQuery('')
    setShowSuggestions(false)
    navigate(`/platform/${platform.slug}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (suggestions.length > 0) {
      handleSelect(suggestions[0])
    }
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim() && setShowSuggestions(true)}
            placeholder="Search platforms..."
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg bg-white/10 dark:bg-stream-dark border border-white/20 dark:border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stream-red focus:border-transparent transition"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-stream-card rounded-lg shadow-xl border border-gray-200 dark:border-white/10 max-h-96 overflow-y-auto">
          {suggestions.map((platform) => (
            <button
              key={platform.id}
              onClick={() => handleSelect(platform)}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-stream-hover transition flex items-center gap-3 group"
            >
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white group-hover:text-stream-red dark:group-hover:text-stream-red transition">
                  {platform.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {platform.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {showSuggestions && query.trim() && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-stream-card rounded-lg shadow-xl border border-gray-200 dark:border-white/10 p-4">
          <p className="text-gray-600 dark:text-gray-400 text-center">No platforms found</p>
        </div>
      )}
    </div>
  )
}
