import { createContext, useContext, useEffect, useState } from 'react'
import { getProfile } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')

    if (!token) {
      setLoading(false)
      return
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem('auth_user')
      }
    }

    getProfile()
      .then((freshUser) => {
        setUser(freshUser)
        localStorage.setItem('auth_user', JSON.stringify(freshUser))
      })
      .catch(() => {
        logout()
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
  const savedUser = localStorage.getItem('auth_user')
  if (savedUser) {
    setUser(JSON.parse(savedUser))
  }
}, [])


const login = (token, userData) => {
  localStorage.setItem('auth_token', token)
  localStorage.setItem('auth_user', JSON.stringify(userData))
  setUser(userData)
}



  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return ctx
}