import { motion } from 'framer-motion'
import useStore from '../store/useStore'
import { SECTIONS } from '../utils/constants'
import './Navigation.css'

function Navigation() {
  const currentSection = useStore((state) => state.currentSection)
  const isTransitioning = useStore((state) => state.isTransitioning)
  const setCurrentSection = useStore((state) => state.setCurrentSection)

  const navItems = [
     { id: SECTIONS.HOME, label: 'Home', icon: '🌍' },
    { id: SECTIONS.ABOUT, label: 'About', icon: '👨‍🚀' },
   { id: SECTIONS.PROJECTS, label: 'Projects', icon: '🚀' },
   { id: SECTIONS.CONTACT, label: 'Contact', icon: '📡' },
  ]

  return (
    <motion.nav
      className="navigation"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
    >
      <div className="nav-logo">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          🌌
        </motion.span>
        <span>Hossam Hassan</span>
      </div>

      <ul className="nav-items">
        {navItems.map((item) => (
          <motion.li
            key={item.id}
            className={currentSection === item.id ? 'active' : ''}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => {
                if (!isTransitioning) {
                  setCurrentSection(item.id)
                  // Scroll to top when navigating to a new section
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
              disabled={isTransitioning}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {currentSection === item.id && (
                <motion.div
                  className="nav-underline"
                  layoutId="underline"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </motion.li>
        ))}
      </ul>

      <div className="nav-status">
        <motion.div
          className="status-pulse"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="status-text">{currentSection.toUpperCase()}</span>
      </div>
    </motion.nav>
  )
}

export default Navigation