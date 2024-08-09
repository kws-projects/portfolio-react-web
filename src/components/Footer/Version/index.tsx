import { IoIosGitBranch } from 'react-icons/io'

const Version = () => {
  const getReleaseLabel = () => {
    switch (process.env.REACT_APP_ENV) {
      case 'PROD':
        return 'Release'
      default:
        return 'Develop'
    }
  }

  return (
    <a
      className="group/version flex items-center gap-x-1 text-xs px-3 py-1 bg-gray-200 group-hover/version:bg-gray-400 rounded-md cursor-pointer"
      href="https://github.com/kws-projects/portfolio-react-web/releases"
      target="_blank"
      rel="noreferrer"
    >
      <IoIosGitBranch className="fill-gray-500 group-hover/version:fill-gray-800" />
      <span className="text-gray-500 group-hover/version:text-gray-800">
        {getReleaseLabel()}
      </span>
      <span className="text-gray-500 group-hover/version:text-gray-800">
        {`v${process.env.REACT_APP_BUILD_VERSION_NO}`}
      </span>
    </a>
  )
}

export default Version
