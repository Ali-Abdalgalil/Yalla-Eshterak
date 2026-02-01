import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiConfig from '../config/api'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    try {
      const { data } = await axios.post(
        `${apiConfig.baseURL}/users/forgot-password`,
        { email }
      )

      setSuccess(
        data.message ||
          'If this email exists, a reset link has been sent'
      )
      setEmail('')
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Something went wrong, please try again'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-stream-black px-4 py-16">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 text-center">
          <Link to="/" className="text-3xl font-bold text-stream-red">
            يلا اشترك
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-stream-card rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-2xl">

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            🔐 Forgot Password
          </h1>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
            Enter your email and we’ll send you a reset link
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Alerts */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-500 text-sm">
                {success}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>

              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 pl-10 rounded-xl bg-gray-50 dark:bg-stream-dark border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-stream-red focus:border-transparent transition"
                  placeholder="you@example.com"
                />

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  📧
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !email}
              className="w-full py-3 rounded-xl bg-stream-red text-white font-semibold hover:bg-stream-red-hover disabled:opacity-50 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Remembered your password?{' '}
            <Link
              to="/login"
              className="text-stream-red hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
