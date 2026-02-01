import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login } from '../services/authService'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login: authLogin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (!password) {
      setError('Password is required')
      return
    }

    setLoading(true)
    try {
      const { token, user } = await login(email, password)

      authLogin(token, user)

      if (user.role === 'admin') {
        navigate('/admin/users', { replace: true })
      } else {
        navigate(from, { replace: true })
      }
    } catch (e) {
      setError(e.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-stream-black px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link to="/" className="text-2xl font-bold text-stream-red">
            يلا اشترك
          </Link>
        </div>

        <div className="bg-white dark:bg-stream-card rounded-xl p-8 border border-gray-200 dark:border-white/10 shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            تسجيل الدخول
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-stream-dark border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-stream-red focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-10 rounded-lg bg-gray-50 dark:bg-stream-dark border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-stream-red focus:border-transparent transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-stream-red text-white font-semibold hover:bg-stream-red-hover disabled:opacity-50 transition"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-stream-red hover:underline font-medium">
              Sign up
            </Link>
          </p>
          <p className="text-center text-sm mt-3">
  <Link to="/forgot-password" className="text-stream-red hover:underline">
    Forgot password?
  </Link>
</p>

        </div>
      </div>
    </div>
  )
}
