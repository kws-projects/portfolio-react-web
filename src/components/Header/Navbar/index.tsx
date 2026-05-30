import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import useNavbarToggle from '@/hooks/useNavbarToggle'
import ThemeToggle from '@/components/ThemeToggle'
import LanguageSwitcher from '@/components/LanguageSwitcher'
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
  const { t } = useTranslation()
  const isActive = item.path === currentPath
  const label = item.titleKey ? t(item.titleKey) : item.title

  const depthStyles: Record<number, { link: string; submenu: string }> = {
    0: {
      link: `block pt-5 px-5 pb-3.5 w-full border-b-2 border-transparent bg-bg md:bg-transparent hover:text-primary transition-colors duration-200 ${isActive ? 'text-primary md:border-b-accent' : 'text-secondary'}`,
      submenu:
        'hidden relative start-0 group-hover/nav-2-lv:block w-full bg-surface border-ui md:absolute md:w-48 md:rounded-xl md:mt-1 md:shadow-card',
    },
    1: {
      link: `block pt-4 pe-5 ps-10 pb-3.5 text-secondary hover:text-primary hover:bg-surface-raised/50 transition-colors duration-200 ${isLastItem ? 'md:rounded-b-xl' : ''} ${isFirstItem ? 'md:rounded-t-xl' : ''} md:ps-5`,
      submenu:
        'hidden relative top-0 start-0 group-hover/nav-3-lv:block w-full bg-surface border-ui md:absolute md:start-48 md:w-48 md:rounded-xl md:shadow-card',
    },
    2: {
      link: `block pt-4 pe-5 ps-16 pb-3.5 text-secondary hover:text-primary hover:bg-surface-raised/50 transition-colors duration-200 ${isFirstItem ? 'md:rounded-t-xl' : ''} ${isLastItem ? 'md:rounded-b-xl' : ''} md:ps-5`,
      submenu: '',
    },
  }

  const styles = depthStyles[depth] ?? depthStyles[2]
  const groupClass =
    depth === 0
      ? 'group/nav-2-lv relative float-start w-full md:w-fit'
      : depth === 1
        ? 'group/nav-3-lv relative'
        : 'relative w-full'

  const content = item.path ? (
    <Link to={item.path} className={styles.link} onClick={onNavigate}>
      {label}
    </Link>
  ) : (
    <div className={`${styles.link} cursor-pointer`}>{label}</div>
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
    <nav className="flex items-center justify-between w-full h-14 max-w-screen-lg mx-0 text-sm md:mx-14 lg:mx-28 select-none">
      <Link
        to="/"
        className="text-lg ms-8 pt-1 font-logo text-primary md:ms-4 hover:text-accent transition-colors duration-200"
      >
        {t('website_name')}
      </Link>

      <div className="flex items-center h-full">
        <div
          className={`${isExpanded ? 'flex-col' : 'hidden'} absolute top-14 end-0 w-full md:relative md:top-0 md:flex md:w-fit md:items-center`}
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

          <div className="flex items-center gap-1 md:hidden px-5 py-3 bg-bg border-b border-divider">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <div
            className="flex md:hidden w-full h-screen backdrop-blur-sm bg-black/40"
            onClick={toggle}
          />
        </div>

        <div className="hidden md:flex items-center flex-shrink-0 h-full pt-1 ms-1">
          <div className="w-px h-4 bg-border/15 mx-1.5" />
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <div className="flex md:hidden" onClick={toggle}>
          <div className="py-4 px-5 cursor-pointer text-primary">
            {isExpanded ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
