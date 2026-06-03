import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiTerminal } from 'react-icons/fi'
import InteractiveTerminal from './InteractiveTerminal'

const isMac =
  typeof navigator !== 'undefined' && /Mac/i.test(navigator.userAgent)

const TerminalOverlay = () => {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mod = isMac ? e.metaKey : e.ctrlKey
      if (mod && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }

      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Floating trigger button — hidden on mobile */}
      <motion.button
        onClick={open}
        className="fixed bottom-6 end-6 z-40 hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-ui-interactive bg-surface/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1 }}
        aria-label="Open terminal"
      >
        <FiTerminal className="text-primary" size={16} />
        <kbd
          className="text-xs text-tertiary font-mono px-1.5 py-0.5 rounded border-ui bg-surface-raised group-hover:text-secondary transition-colors"
          style={{ fontSize: '10px' }}
        >
          {isMac ? '⌘' : 'Ctrl'} K
        </kbd>
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50"
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />

            {/* Terminal container */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="w-full max-w-2xl pointer-events-auto">
                <InteractiveTerminal onClose={close} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default TerminalOverlay
