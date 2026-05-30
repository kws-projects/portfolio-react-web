import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import useNavbarToggle from '@/hooks/useNavbarToggle'
import { MenuItem } from '@/types/menu'
import { menuMap } from './menuMap'

type NavMenuItemProps = {
  item: MenuItem
  depth: number
  currentPath: string
  onNavigate: () => void
  isLastItem?: boolean
  isFirstItem?: boolean
}

const NavMenuItem = ({
  item,
  depth,
  currentPath,
  onNavigate,
  isLastItem = false,
  isFirstItem = false,
}: NavMenuItemProps) => {
  const isActive = item.path === currentPath

  const depthStyles: Record<number, { link: string; submenu: string }> = {
    0: {
      link: `block pt-5 px-5 pb-3.5 w-full border-b border-transparent hover:bg-gray-100 bg-gray-50 md:group-hover/nav-2-lv:border-b-gray-800 md:bg-transparent md:hover:border-b-gray-800 md:hover:bg-transparent transition ease-in-out ${isActive ? 'md:border-b-gray-800' : ''}`,
      submenu:
        'hidden relative left-0 group-hover/nav-2-lv:block w-full bg-gray-50 border border-gray-200 md:absolute md:w-44 md:rounded-b-lg',
    },
    1: {
      link: `block pt-4 pr-5 pl-10 pb-3.5 hover:bg-gray-100 ${isLastItem ? 'md:rounded-b-lg' : ''} md:pl-5`,
      submenu:
        'hidden relative top-0 left-0 group-hover/nav-3-lv:block w-full bg-gray-50 border border-gray-200 md:absolute md:left-44 md:w-44 md:rounded-b-lg md:rounded-tr-lg',
    },
    2: {
      link: `block pt-4 pr-5 pl-16 pb-3.5 hover:bg-gray-100 ${isFirstItem ? 'md:rounded-tr-lg' : ''} ${isLastItem ? 'md:rounded-b-lg' : ''} md:pl-5`,
      submenu: '',
    },
  }

  const styles = depthStyles[depth] ?? depthStyles[2]
  const groupClass =
    depth === 0
      ? 'group/nav-2-lv relative float-left w-full md:w-fit'
      : depth === 1
        ? 'group/nav-3-lv relative'
        : 'relative w-full'

  const content = item.path ? (
    <Link to={item.path} className={styles.link} onClick={onNavigate}>
      {item.title}
    </Link>
  ) : (
    <div className={`${styles.link} cursor-pointer`}>{item.title}</div>
  )

  return (
    <li key={item.id} className={groupClass}>
      {content}
      {item.subItems && (
        <ul className={styles.submenu}>
          {item.subItems.map((subItem, i, arr) => (
            <NavMenuItem
              key={subItem.id}
              item={subItem}
              depth={depth + 1}
              currentPath={currentPath}
              onNavigate={onNavigate}
              isFirstItem={i === 0}
              isLastItem={i === arr.length - 1}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

const Navbar = () => {
  const { t } = useTranslation()
  const currentPath = useLocation().pathname
  const { isExpanded, toggle } = useNavbarToggle()

  return (
    <nav className="flex items-center justify-between w-full h-14 max-w-screen-lg mx-0 border-b border-gray-200 text-sm md:mx-14 lg:mx-28 select-none">
      <Link
        to="/"
        className="text-lg ml-8 pt-1 text-gray-800 font-jost md:ml-4"
      >
        {t('website_name')}
      </Link>

      <div className="flex pt-1 md:hidden" onClick={toggle}>
        {isExpanded ? (
          <div className="py-4 px-7 cursor-pointer">
            <AiOutlineClose />
          </div>
        ) : (
          <div className="py-4 px-7 cursor-pointer">
            <AiOutlineMenu />
          </div>
        )}
      </div>

      <div
        className={`${isExpanded ? 'flex-col' : 'hidden'} absolute top-14 w-full md:relative md:top-0 md:flex md:w-fit`}
      >
        <ul className="w-full md:w-fit">
          {menuMap.map(item => (
            <NavMenuItem
              key={item.id}
              item={item}
              depth={0}
              currentPath={currentPath}
              onNavigate={toggle}
            />
          ))}
        </ul>
        <div
          className="flex md:hidden w-full md:w-0 h-screen md:h-0 backdrop-blur bg-black/20"
          onClick={toggle}
        ></div>
      </div>
    </nav>
  )
}

export default Navbar
