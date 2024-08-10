import axios from 'axios'
import { envConfig } from '../../config'

export const apiClient = axios.create({
  baseURL: envConfig.PORTFOLIO_API_BASE_URL,
})
