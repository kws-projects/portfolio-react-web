import { envConfig } from '@/config'
import { getReleaseType } from '@/constant/appEnv'
import { IoIosGitBranch } from 'react-icons/io'

const Version = () => {
  return (
    <a
      className="group flex items-center gap-x-1.5 text-xs px-3 py-1.5 bg-surface-raised border border-border/6 rounded-lg cursor-pointer select-none hover:border-accent/30 transition-all duration-200"
      href={envConfig.GITHUB_RELEASE_URL}
      target="_blank"
      rel="noreferrer"
    >
      <IoIosGitBranch className="fill-tertiary group-hover:fill-accent transition-colors duration-200" />
      <span className="text-tertiary group-hover:text-accent transition-colors duration-200">
        {getReleaseType()}
      </span>
      <span className="text-tertiary group-hover:text-accent transition-colors duration-200">
        {`v${envConfig.VERSION_NO}`}
      </span>
    </a>
  )
}

export default Version
