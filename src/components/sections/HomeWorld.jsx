import { motion } from 'framer-motion'
import { memo } from 'react'
import useStore from '../../store/useStore'
import './Sections.css'

const HomeWorld = memo(function HomeWorld() {
  const setCurrentSection = useStore((state) => state.setCurrentSection)

  const downloadResume = () => {
    const link = document.createElement('a')
    link.href = '/my resume/Hossam_Hassan_CV.pdf'
    link.download = 'Hossam Hassan CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.div
      className="section-overlay home-world"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="scroll-hint"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
         <div className="scroll-arrow">↑</div>
        <span>Navigate to explore</span>
      </motion.div>

      <div className="content-wrapper-home">
        <motion.div
          className="hero-content"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
          >
            Welcome to My
            <br />
            <span className="gradient-text">Portfolio</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Creative Developer & 3D Experience Designer
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              className="cta-button primary"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(52, 152, 219, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadResume}
            >
              Download Resume
            </motion.button>
            <motion.button
              className="cta-button secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSection('projects')}
            >
              View Work
            </motion.button>
          </motion.div>
        </motion.div>

        <div className="floating-elements">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="float-orb"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              style={{
                left: `${Math.min(20 + i * 12, 80)}%`,
                bottom: `${10 + i * 8}%`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
})

HomeWorld.displayName = 'HomeWorld'

export default HomeWorld