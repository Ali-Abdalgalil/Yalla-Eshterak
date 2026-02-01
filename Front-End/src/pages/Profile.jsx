import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import apiConfig from '../config/api'
import ChangePassword from './ChangePassword'


export default function Profile() {
  const { user, login } = useAuth()
  const token = localStorage.getItem('auth_token')

  const [name, setName] = useState(
    user ? `${user.firstName} ${user.lastName}` : ''
  )

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name.trim()) {
      setError('Name is required')
      return
    }

    const parts = name.trim().split(' ')
    const firstName = parts[0]
    const lastName = parts.slice(1).join(' ') || '-'

    setLoading(true)
    try {
      const { data } = await axios.put(
        `${apiConfig.baseURL}/users/me`,
        { firstName, lastName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      login(token, data)

      setSuccess('Profile updated successfully')
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 px-4 bg-gray-50 dark:bg-stream-black">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          👤 Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-white dark:bg-stream-card p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm"
        >
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

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-stream-dark border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-stream-red focus:border-transparent transition"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-stream-dark border border-gray-300 dark:border-white/10 text-gray-500 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-stream-red text-white font-semibold hover:bg-stream-red-hover disabled:opacity-50 transition"
          >
            {loading ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
        <ChangePassword />
      </div>
    </div>
  )
}