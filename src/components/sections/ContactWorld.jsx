import { motion } from 'framer-motion'
import { useState } from 'react'
import './Sections.css'

function ContactWorld() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Message sent! 🚀')
      setFormData({ name: '', email: '', message: '' })
    }, 2000)
  }

  const contactMethods = [
    { icon: '📧', label: 'Email', value: 'hossamhassan112003@gmail.com', link: 'mailto:hossamhassan112003@gmail.com' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/Hossam Hassan', link: 'https://www.linkedin.com/in/hossam-hassan-132055244/' },
    { icon: '🐙', label: 'GitHub', value: 'github.com/Hossam Hassan', link: 'https://github.com/hossamhassan811' },
   
  ]

  return (
    <motion.div
      className="section-overlay contact-world"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="content-wrapper">
        <motion.div
          className="contact-header"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Let's Connect</h2>
          <p>Ready to start your next project? Let's make it happen together</p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3>Get in Touch</h3>
            <p className="contact-description">
              I'm always interested in hearing about new projects and opportunities.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.link}
                  className="contact-method"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.05 }}
                >
                  <span className="method-icon">{method.icon}</span>
                  <div className="method-info">
                    <span className="method-label">{method.label}</span>
                    <span className="method-value">{method.value}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              className="availability"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="status-indicator">
                <motion.div
                  className="status-dot"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span>Available for freelance</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Your name"
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="your.email@example.com"
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                placeholder="Tell me about your project..."
                rows="5"
              />
            </motion.div>

            <motion.button
              type="submit"
              className="submit-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(155, 89, 182, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  ⏳
                </motion.span>
              ) : (
                <>Send Message 🚀</>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.div>
  )
}

export default ContactWorld