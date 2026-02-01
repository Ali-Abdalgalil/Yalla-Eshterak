import axios from 'axios'
import apiConfig from '../config/api'
const api = axios.create({
  baseURL: apiConfig.baseURL,
  headers: { 'Content-Type': 'application/json' },
})
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
export const createSelection = async (platformName, platformPlan) => {
  const { data } = await api.post('/user-selections', {
    platformName,
    platformPlan,
  })
  return data
}