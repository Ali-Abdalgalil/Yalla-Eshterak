import { useEffect, useState } from 'react'
import { getAllUsers, deleteUser } from './../services/adminService'
import Footer from '../components/Footer'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await getAllUsers()
      setUsers(data)
    } catch {
      setError('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      await deleteUser(id)
      setUsers((prev) => prev.filter((u) => u._id !== id))
    } catch {
      alert('Delete failed')
    }
  }

  if (loading) {
    return <div className="pt-24 text-center">Loading users...</div>
  }

  return (
    <div className="min-h-screen pt-24 px-4 bg-gray-50 dark:bg-stream-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          👑 Admin – Users
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-500 rounded">
            {error}
          </div>
        )}

        <div className="overflow-x-auto bg-white dark:bg-stream-card rounded-xl border border-gray-200 dark:border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-stream-dark text-gray-700 dark:text-gray-300">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Joined</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-t border-gray-200 dark:border-white/10"
                >
                  <td className="p-3">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        u.role === 'admin'
                          ? 'bg-purple-500/20 text-purple-500'
                          : 'bg-blue-500/20 text-blue-500'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center">
                    {u.role !== 'admin' && (
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="text-red-600 hover:underline"
                      >
                        🗑️ Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  )
}
