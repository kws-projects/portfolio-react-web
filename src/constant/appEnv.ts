import { env } from '@/config/env'

export const getReleaseType = () => (env.isProduction ? 'Release' : 'Develop')
