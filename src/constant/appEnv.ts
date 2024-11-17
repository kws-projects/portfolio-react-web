import { envConfig } from 'config'

export enum AppEnv {
  DEV = 'DEV',
  PROD = 'PROD',
}

export const getReleaseType = () =>
  ({
    [AppEnv.DEV]: 'Develop',
    [AppEnv.PROD]: 'Release',
  })[envConfig.NODE_ENV]
