import axios from 'axios'
import apiConfig from '../config/api'

const api = axios.create({
  baseURL: apiConfig.baseURL,
  headers: { 'Content-Type': 'application/json' },
})

/* 🔐 Attach token automatically */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/* 🔑 LOGIN */
export async function login(email, password) {
  try {
    const { data } = await api.post('/api/users/login', { email, password })
    return data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Invalid email or password'
    )
  }
}

/* 📝 REGISTER */
export async function register(firstName, lastName, email, password) {
  try {
    const { data } = await api.post('/users/signup', {
      firstName,
      lastName,
      email,
      password,
    })
    return data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Registration failed'
    )
  }
}

/* 👤 GET PROFILE */
export async function getProfile() {
  try {
    const { data } = await api.get('/api/users/me')
    return data
  } catch (error) {
    throw error
  }
}