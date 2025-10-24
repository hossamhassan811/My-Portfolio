import { motion } from 'framer-motion'
import './Sections.css'

function AboutWorld() {
  const skills = [
    { name: 'React & Next.js', level: 90, icon: '⚛️', color: '#61DAFB' },
    { name: 'WebGL & Three.js', level: 50, icon: '🎨', color: '#049EF4' },
    { name: 'GSAP Animations', level: 50, icon: '✨', color: '#88CE02' },
    { name: 'UI/UX Design', level: 85, icon: '🎯', color: '#FF6B6B' },
    { name: 'Node.js & APIs', level: 60, icon: '🔧', color: '#68A063' },
    { name: 'TypeScript', level: 80, icon: '📘', color: '#3178C6' },
  ]

  const stats = [
    { number: '10+', label: 'Projects Completed', icon: '🚀' },
    { number: '3+', label: 'Years Experience', icon: '⏱️' },
    { number: '100%', label: 'Client Satisfaction', icon: '⭐' },
    { number: '9+', label: 'Happy Clients', icon: '🤝' }
  ]

  return (
    <motion.div
      className="section-overlay about-world"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="content-wrapper">
        <div className="about-content">
          {/* Header */}
          <div className="about-header">
            <h2>About Me</h2>
            <p className="about-subtitle">Crafting Digital Experiences with Passion</p>
            <div className="header-line" />
          </div>

          {/* Main Grid Layout */}
          <div className="about-main-grid">
            {/* Left Column - Photo & Info */}
            <div className="about-left-column">
              <div className="about-photo-container">
                <div className="about-photo">
                  <img src="/my photo/me.jpg" alt="Hossam Hassan" loading="lazy" />
                  <div className="photo-overlay">
                    <span className="photo-badge">Front-End Developer</span>
                  </div>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="quick-info">
                <div className="info-card">
                  <span className="info-icon">📍</span>
                  <div>
                    <p className="info-label">Location</p>
                    <p className="info-value">Egypt</p>
                  </div>
                </div>
                <div className="info-card">
                  <span className="info-icon">💼</span>
                  <div>
                    <p className="info-label">Experience</p>
                    <p className="info-value">3+ Years</p>
                  </div>
                </div>
                <div className="info-card">
                  <span className="info-icon">🎓</span>
                  <div>
                    <p className="info-label">Specialization</p>
                    <p className="info-value">React & Next.js</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Text & Skills */}
            <div className="about-right-column">
              {/* Bio Section */}
              <div className="about-bio">
                <h3>Hello! I'm Hossam Hassan 👋</h3>
                <p>
                  A passionate <strong>Front-End Developer</strong> specializing in <strong>React</strong> and <strong>Next.js</strong>.
                  I create responsive, user-focused web applications that bring design ideas to life through clean and efficient code.
                </p>
                <p>
                  I love turning UI/UX designs into seamless digital experiences and collaborating with teams to build products that truly engage users.
                </p>
                <p>
                  Beyond the web, I also work with <strong>Unity</strong>, developing interactive applications that balance performance and functionality — 
                  all while maintaining clear, maintainable code and a focus on user experience.
                </p>
                <div className="cta-badge">
                  <span>✨</span> Let's build something amazing together!
                </div>
              </div>

              {/* Skills Section */}
              <div className="skills-section">
                <h3>
                  <span className="section-icon">🛠️</span>
                  Skills & Expertise
                </h3>
                <div className="skills-grid">
                  {skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="skill-item"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="skill-header">
                        <span className="skill-icon">{skill.icon}</span>
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div
                          className="skill-progress"
                          style={{ 
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`,
                            boxShadow: `0 0 10px ${skill.color}40`,
                            animationDelay: `${index * 0.05}s`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section - Full Width */}
          <div className="about-stats-section">
            <div className="about-stats">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="stat"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="stat-icon">{stat.icon}</span>
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutWorld