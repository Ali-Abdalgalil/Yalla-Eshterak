import { useEffect, useState } from 'react'
import axios from 'axios'
import apiConfig from '../config/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    axios
      .get(`${apiConfig.baseURL}/users/all-users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then(({ data }) => {
        const admins = data.filter((u) => u.role === 'admin').length
        const users = data.filter((u) => u.role === 'user').length

        setStats({
          total: data.length,
          admins,
          users,
        })
      })
  }, [])

  if (!stats) return null

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">Total Users: {stats.total}</div>
        <div className="card">Admins: {stats.admins}</div>
        <div className="card">Users: {stats.users}</div>
      </div>
    </div>
  )
}
