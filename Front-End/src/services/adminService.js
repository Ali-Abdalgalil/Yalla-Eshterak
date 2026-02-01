import axios from 'axios'
import apiConfig from '../config/api.js'

const api = axios.create({
  baseURL: apiConfig.baseURL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getAllUsers = async () => {
  const { data } = await api.get('/admin/users')
  return data
}

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/admin/users/${id}`)
  return data
}
