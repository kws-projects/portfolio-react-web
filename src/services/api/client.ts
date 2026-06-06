import { envConfig } from '@/config'
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: envConfig.PORTFOLIO_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})
