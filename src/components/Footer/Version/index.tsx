import { IoIosGitBranch } from 'react-icons/io'
import { envConfig } from '../../../config'
import { getReleaseType } from '../../../constant/appEnv'

const Version = () => {
  return (
    <a
      className="group/version flex items-center gap-x-1 text-xs px-3 py-1 bg-gray-200 group-hover/version:bg-gray-400 rounded-md cursor-pointer"
      href={envConfig.GITHUB_RELEASE_URL}
      target="_blank"
      rel="noreferrer"
    >
      <IoIosGitBranch className="fill-gray-500 group-hover/version:fill-gray-800" />
      <span className="text-gray-500 group-hover/version:text-gray-800">
        {getReleaseType()}
      </span>
      <span className="text-gray-500 group-hover/version:text-gray-800">
        {`v${envConfig.VERSION_NO}`}
      </span>
    </a>
  )
}

export default Version
