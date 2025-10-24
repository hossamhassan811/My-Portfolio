import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import './Sections.css'

function ProjectsWorld() {
  const [selectedProject, setSelectedProject] = useState(null)

  // Prevent body scroll and hide navbar when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
      // Hide navigation
      const navigation = document.querySelector('.navigation')
      if (navigation) {
        navigation.style.opacity = '0'
        navigation.style.pointerEvents = 'none'
      }
    } else {
      document.body.style.overflow = ''
      // Show navigation
      const navigation = document.querySelector('.navigation')
      if (navigation) {
        navigation.style.opacity = '1'
        navigation.style.pointerEvents = 'auto'
      }
    }
    return () => {
      document.body.style.overflow = ''
      const navigation = document.querySelector('.navigation')
      if (navigation) {
        navigation.style.opacity = '1'
        navigation.style.pointerEvents = 'auto'
      }
    }
  }, [selectedProject])

  const projects = [
    {
      id: 1,
      title: '3D Portfolio Experience',
      category: 'Web Development',
      description: 'Interactive 3D portfolio built with React Three Fiber and GSAP animations',
      tech: ['React', 'Three.js', 'GSAP', 'WebGL'],
      color: '#3498db',
      icon: '🌐'
    },
    {
      id: 2,
      title: 'ShopHub',
      category: 'E-commerce',
      description: '3D product customization tool with real-time rendering',
      tech: ['React', 'Three.js', 'Redux', 'Node.js'],
      color: '#f39c12',
      icon: '🛍️',
      liveDemo: 'https://hossam-ecommerce-webs.netlify.app',
      github: 'https://github.com/hossamhassan811/ecommerce-project'
    },
    {
      id: 3,
      title: 'ToDo list',
      category: 'Task Management',
      description: ' A modern, responsive Todo app with a clean, gradient UI built using Material-UI. Users can add, edit, delete, and filter tasks by status, with data saved in local storage. Smooth animations and hover effects enhance the user experience.',
      tech: ['React 19', 'React Router', 'Material-UI', 'local storage'],
      color: '#f31c12',
      icon: '✅',
      liveDemo: 'https://todo-taskkk.netlify.app/',
      github: 'https://github.com/hossamhassan811/Todo-react'
    },
  ]

  return (
    <motion.div
      className="section-overlay projects-world"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="content-wrapper">
        <motion.div
          className="projects-header"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <h2>Featured Projects</h2>
          <p>Explore my latest work and creative experiments</p>
        </motion.div>

        <motion.div
          className="projects-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => setSelectedProject(project)}
              style={{ '--project-color': project.color }}
            >
              <div className="project-icon">{project.icon}</div>
              <div className="project-category">{project.category}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="project-link">
                View Project →
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close" 
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                ×
              </button>
              <div className="modal-icon">{selectedProject.icon}</div>
              <h2>{selectedProject.title}</h2>
              <p className="modal-category">{selectedProject.category}</p>
              <p className="modal-description">{selectedProject.description}</p>
              <div className="modal-tech">
                {selectedProject.tech.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="modal-actions">
                {selectedProject.liveDemo && (
                  <button
                    className="btn-primary"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(selectedProject.liveDemo, '_blank', 'noopener,noreferrer')
                    }}
                  >
                    Live Demo
                  </button>
                )}
                {selectedProject.github && (
                  <button 
                    className="btn-secondary"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(selectedProject.github, '_blank', 'noopener,noreferrer')
                    }}
                  >
                    GitHub
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ProjectsWorld