import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  MapPin, 
  Phone, 
  Github, 
  Linkedin, 
  Twitter,
  Download,
  Send,
  Check,
  AlertCircle,
  Copy,
  X
} from 'lucide-react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/username', color: 'hover:text-gray-900 dark:hover:text-gray-100' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/username', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/username', color: 'hover:text-blue-400' }
  ]

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@example.com', copyValue: 'hello@example.com' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', copyValue: '+15551234567' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA', copyValue: 'San Francisco, CA' }
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call - replace with actual Supabase integration
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send the data to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = async (value: string, field: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const downloadResume = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Shrey_Resume.pdf'
    link.click()
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-macos-gray-900 dark:text-macos-gray-100 mb-4">
          Get In Touch
        </h2>
        <p className="text-lg text-macos-gray-600 dark:text-macos-gray-400 max-w-2xl mx-auto">
          Have a project in mind or just want to chat? I'd love to hear from you. 
          Send me a message and I'll respond as soon as possible.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="macos-card p-8">
            <h3 className="text-xl font-semibold text-macos-gray-900 dark:text-macos-gray-100 mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-macos-gray-700 dark:text-macos-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`macos-input w-full ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-macos-gray-700 dark:text-macos-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`macos-input w-full ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-macos-gray-700 dark:text-macos-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`macos-input w-full ${errors.subject ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.subject}</span>
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-macos-gray-700 dark:text-macos-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`macos-input w-full resize-none ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Tell me about your project or just say hello..."
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message ? (
                    <p className="text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.message}</span>
                    </p>
                  ) : (
                    <p className="text-sm text-macos-gray-500 dark:text-macos-gray-400">
                      {formData.message.length} characters
                    </p>
                  )}
                  <p className="text-sm text-macos-gray-500 dark:text-macos-gray-400">
                    Minimum 10 characters
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
                  ${isSubmitting || submitStatus === 'success'
                    ? 'bg-macos-gray-300 dark:bg-macos-gray-600 text-macos-gray-500 cursor-not-allowed'
                    : 'macos-button hover:shadow-lg'
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    Thanks for your message! I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <p className="text-red-800 dark:text-red-200 text-sm">
                    Something went wrong. Please try again or contact me directly.
                  </p>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>

        {/* Contact Info & Social Links */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-8"
        >
          {/* Contact Information */}
          <div className="macos-card p-6">
            <h3 className="text-lg font-semibold text-macos-gray-900 dark:text-macos-gray-100 mb-4">
              Contact Information
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon
                return (
                  <div key={info.label} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-macos-blue/10 dark:bg-macos-blue/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-macos-blue" />
                      </div>
                      <div>
                        <p className="text-sm text-macos-gray-500 dark:text-macos-gray-400">
                          {info.label}
                        </p>
                        <p className="font-medium text-macos-gray-900 dark:text-macos-gray-100">
                          {info.value}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => copyToClipboard(info.copyValue, info.label)}
                      className="p-2 hover:bg-macos-gray-100 dark:hover:bg-macos-gray-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      {copiedField === info.label ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-macos-gray-400" />
                      )}
                    </motion.button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Social Links */}
          <div className="macos-card p-6">
            <h3 className="text-lg font-semibold text-macos-gray-900 dark:text-macos-gray-100 mb-4">
              Follow Me
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      w-12 h-12 bg-macos-gray-100 dark:bg-macos-gray-800 rounded-lg flex items-center justify-center
                      text-macos-gray-600 dark:text-macos-gray-400 transition-all duration-200
                      hover:shadow-md ${social.color}
                    `}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Download Resume */}
          <div className="macos-card p-6">
            <h3 className="text-lg font-semibold text-macos-gray-900 dark:text-macos-gray-100 mb-4">
              Resume
            </h3>
            <p className="text-macos-gray-600 dark:text-macos-gray-400 mb-4">
              Download my latest resume to learn more about my experience and skills.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={downloadResume}
              className="flex items-center space-x-2 bg-macos-gray-100 dark:bg-macos-gray-800 text-macos-gray-900 dark:text-macos-gray-100 px-4 py-2 rounded-lg hover:bg-macos-gray-200 dark:hover:bg-macos-gray-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </motion.button>
          </div>

          {/* Availability Status */}
          <div className="macos-card p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <h3 className="text-lg font-semibold text-macos-gray-900 dark:text-macos-gray-100">
                Available for Work
              </h3>
            </div>
            <p className="text-macos-gray-600 dark:text-macos-gray-400 text-sm">
              I'm currently open to new opportunities and freelance projects. 
              Let's discuss how I can help bring your ideas to life.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
