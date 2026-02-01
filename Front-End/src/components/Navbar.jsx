import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SearchBar from './SearchBar'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)

  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setMenu(false)
    navigate('/login')
  }

  // ✅ الاسم والـ avatar مبنيين على user.name
  const fullName = user?.name || ''
  const avatarLetter = user?.name?.[0]?.toUpperCase() || 'U'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark dark:bg-gradient-to-b dark:from-black/90 dark:to-transparent backdrop-blur-sm px-4 py-3 lg:px-8 border-b border-gray-200 dark:border-white/10">
      <div className="flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-2xl font-bold text-stream-red">يلا اشترك</span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <SearchBar />
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/"
            className="text-sm text-gray-700 dark:text-gray-300 hover:text-stream-red dark:hover:text-white transition"
          >
            الرئيسية
          </Link>

          <ThemeToggle />

          {isAuthenticated ? (
            <div className="relative">
              {/* Profile Button */}
              <button
                onClick={() => setMenu(!menu)}
                className="flex items-center gap-2 text-sm text-gray-900 dark:text-white"
              >
                <span className="w-8 h-8 rounded-full bg-stream-red flex items-center justify-center text-sm font-semibold text-white">
                  {avatarLetter}
                </span>
                <span className="hidden lg:inline">{fullName}</span>
              </button>

              {/* Dropdown */}
              {menu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setMenu(false)}
                  />

                  <div className="absolute right-0 top-full mt-2 w-52 py-2 bg-white dark:bg-stream-card rounded-lg shadow-xl z-20 border border-gray-200 dark:border-white/10">
                    <button
                      onClick={() => {
                        navigate('/profile')
                        setMenu(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-stream-hover transition"
                    >
                      👤 Profile
                    </button>

                    {user?.role === 'admin' && (
                      <button
                        onClick={() => {
                          navigate('/admin/users')
                          setMenu(false)
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-stream-hover transition"
                      >
                        🛡️ Users
                      </button>
                    )}

                    <hr className="my-1 border-gray-200 dark:border-white/10" />

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-stream-hover transition"
                    >
                      🚪 Log out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-stream-red dark:hover:text-white transition"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded bg-stream-red text-white text-sm font-medium hover:bg-stream-red-hover transition"
              >
                إنشاء حساب
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 text-gray-900 dark:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {open && (
        <div className="md:hidden mt-4 pb-4">
          <SearchBar />
        </div>
      )}

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-gray-200 dark:border-white/10 pt-4">
          <Link to="/" onClick={() => setOpen(false)}>الرئيسية</Link>

          {isAuthenticated ? (
            <>
              <button onClick={() => { navigate('/profile'); setOpen(false) }}>
                👤 Profile
              </button>

              {user?.role === 'admin' && (
                <button onClick={() => { navigate('/admin/users'); setOpen(false) }}>
                  🛡️ Users
                </button>
              )}

              <button
                onClick={() => { handleLogout(); setOpen(false) }}
                className="text-red-600"
              >
                تسجيل الخروج
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>تسجيل دخول</Link>
              <Link to="/register" onClick={() => setOpen(false)}>إنشاء حساب</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
