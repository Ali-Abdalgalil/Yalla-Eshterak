import { useState } from 'react'
import axios from 'axios'
import apiConfig from '../config/api'

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const getStrength = () => {
    if (newPassword.length < 6) return 'Weak'
    if (newPassword.length < 10) return 'Medium'
    return 'Strong'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!oldPassword || !newPassword) {
      setError('All fields are required')
      return
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const { data } = await axios.put(
        `${apiConfig.baseURL}/users/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )

      setSuccess(data.message || 'Password updated successfully')
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError(err.response?.data?.message || 'Change password failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-12 bg-white dark:bg-stream-card p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        🔐 Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Alerts */}
        {error && (
          <div className="p-3 rounded-lg bg-red-500/20 text-red-500 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 rounded-lg bg-green-500/20 text-green-500 text-sm">
            {success}
          </div>
        )}

        {/* Current Password */}
        <div>
          <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showOld ? 'text' : 'password'}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-xl bg-gray-50 dark:bg-stream-dark border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-stream-red transition"
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showOld ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-xl bg-gray-50 dark:bg-stream-dark border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-stream-red transition"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showNew ? '🙈' : '👁️'}
            </button>
          </div>

          {/* Strength Indicator */}
          {newPassword && (
            <div className="mt-2 text-sm">
              Strength:{' '}
              <span
                className={`font-semibold ${
                  getStrength() === 'Weak'
                    ? 'text-red-500'
                    : getStrength() === 'Medium'
                    ? 'text-yellow-500'
                    : 'text-green-500'
                }`}
              >
                {getStrength()}
              </span>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-xl bg-gray-50 dark:bg-stream-dark border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-stream-red transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirm ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-stream-red text-white font-semibold hover:bg-stream-red-hover disabled:opacity-50 transition"
        >
          {loading ? 'Updating…' : 'Update Password'}
        </button>
      </form>
    </div>
  )
}