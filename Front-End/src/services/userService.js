import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { updateProfile, changePassword } from '../services/userService'

export default function Profile() {
  const { user, login } = useAuth()

  const [name, setName] = useState(user?.name || '')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleUpdateProfile = async () => {
    setLoading(true)
    setError('')
    setMessage('')

    const parts = name.trim().split(' ')
    const firstName = parts[0]
    const lastName = parts.slice(1).join(' ') || '-'

    try {
      const updatedUser = await updateProfile({ firstName, lastName })

      // تحديث auth context
      login(localStorage.getItem('auth_token'), updatedUser)

      setMessage('Profile updated successfully')
    } catch (e) {
      setError(e.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    setLoading(true)
    setError('')
    setMessage('')

    try {
      await changePassword({ oldPassword, newPassword })
      setMessage('Password changed successfully')
      setOldPassword('')
      setNewPassword('')
    } catch (e) {
      setError(e.message || 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-6">👤 Profile</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 text-red-500 rounded">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-4 p-3 bg-green-500/20 text-green-500 rounded">
          {message}
        </div>
      )}

      {/* Profile Info */}
      <div className="bg-white dark:bg-stream-card p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Info</h2>

        <label className="block mb-2 text-sm">Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4 dark:bg-stream-dark"
        />

        <button
          onClick={handleUpdateProfile}
          disabled={loading}
          className="px-6 py-2 bg-stream-red text-white rounded hover:opacity-90"
        >
          Save Changes
        </button>
      </div>

      {/* Change Password */}
      <div className="bg-white dark:bg-stream-card p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🔐 Change Password</h2>

        <input
          type="password"
          placeholder="Old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-3 dark:bg-stream-dark"
        />

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4 dark:bg-stream-dark"
        />

        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="px-6 py-2 bg-stream-red text-white rounded hover:opacity-90"
        >
          Change Password
        </button>
      </div>
    </div>
  )
}