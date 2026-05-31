import { envConfig } from '@/config'

export enum AppEnv {
  DEV = 'DEV',
  PROD = 'PROD',
}

const releaseTypeMap: Record<string, string> = {
  [AppEnv.DEV]: 'Develop',
  [AppEnv.PROD]: 'Release',
}

export const getReleaseType = () => releaseTypeMap[envConfig.NODE_ENV]
