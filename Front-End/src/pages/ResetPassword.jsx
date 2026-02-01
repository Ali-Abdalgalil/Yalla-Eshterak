import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import apiConfig from '../config/api'

export default function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await axios.post(
        `${apiConfig.baseURL}/users/reset-password/${token}`,
        { password }
      )

      setSuccess('Password reset successfully 🎉')

      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Invalid or expired reset link'
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
          <span className="text-3xl font-bold text-stream-red">
            يلا اشترك
          </span>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-stream-card rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-2xl">

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            🔐 Reset Password
          </h1>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
            Enter your new password below
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

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-stream-dark border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-stream-red transition"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-stream-dark border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-stream-red transition"
                placeholder="••••••••"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-stream-red text-white font-semibold hover:bg-stream-red-hover disabled:opacity-50 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Updating...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
