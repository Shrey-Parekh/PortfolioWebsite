import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Square, Maximize2, User, Briefcase, Code, MessageSquare, Mail, MapPin, Phone, Linkedin, Github, ExternalLink } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

interface Window {
  id: string
  type: string
  title: string
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}

interface WindowManagerProps {
  windows: Window[]
  onCloseWindow: (id: string) => void
  onMinimizeWindow: (id: string) => void
  onMaximizeWindow: (id: string) => void
  onFocusWindow: (id: string) => void
  onUpdateWindowPosition: (id: string, position: { x: number; y: number }) => void
}

const WindowManager: React.FC<WindowManagerProps> = ({
  windows,
  onCloseWindow,
  onMinimizeWindow,
  onMaximizeWindow,
  onFocusWindow,
  onUpdateWindowPosition
}) => {
  const { isDarkMode } = useTheme()
  const [draggedWindow, setDraggedWindow] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const getWindowContent = (type: string) => {
    switch (type) {
      case 'about':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold" style={{ color: isDarkMode ? '#FFFFFF' : '#1F2937' }}>Shrey</h2>
                <p className="text-lg" style={{ color: isDarkMode ? '#D1D5DB' : '#6B7280' }}>Full Stack Developer</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="leading-relaxed" style={{ color: isDarkMode ? '#D1D5DB' : '#374151' }}>
                Passionate full-stack developer with expertise in modern web technologies. 
                I love creating pixel-perfect user experiences and building scalable applications.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg p-4" style={{ 
                  background: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : '#EFF6FF',
                  border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.2)' : 'none'
                }}>
                  <h3 className="font-semibold mb-2" style={{ color: isDarkMode ? '#93C5FD' : '#1E40AF' }}>Experience</h3>
                  <p className="text-sm" style={{ color: isDarkMode ? '#93C5FD' : '#1E40AF' }}>3+ years in web development</p>
                </div>
                <div className="rounded-lg p-4" style={{ 
                  background: isDarkMode ? 'rgba(34, 197, 94, 0.1)' : '#F0FDF4',
                  border: isDarkMode ? '1px solid rgba(34, 197, 94, 0.2)' : 'none'
                }}>
                  <h3 className="font-semibold mb-2" style={{ color: isDarkMode ? '#86EFAC' : '#166534' }}>Location</h3>
                  <p className="text-sm" style={{ color: isDarkMode ? '#86EFAC' : '#166534' }}>Remote / Available</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'projects':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold" style={{ color: isDarkMode ? '#FFFFFF' : '#1F2937' }}>Featured Projects</h2>
            <div className="grid gap-6">
              <div className="rounded-xl p-6" style={{ 
                background: isDarkMode 
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)' 
                  : 'linear-gradient(135deg, #EFF6FF 0%, #FAF5FF 100%)',
                border: isDarkMode 
                  ? '1px solid rgba(59, 130, 246, 0.2)' 
                  : '1px solid #DBEAFE'
              }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: isDarkMode ? '#FFFFFF' : '#1F2937' }}>E-Commerce Platform</h3>
                    <p style={{ color: isDarkMode ? '#D1D5DB' : '#6B7280' }}>Full-stack e-commerce solution with React, Node.js, and MongoDB</p>
                  </div>
                  <ExternalLink className="w-5 h-5" style={{ color: isDarkMode ? '#9CA3AF' : '#9CA3AF' }} />
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-sm" style={{ 
                    background: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : '#DBEAFE',
                    color: isDarkMode ? '#93C5FD' : '#1E40AF'
                  }}>React</span>
                  <span className="px-3 py-1 rounded-full text-sm" style={{ 
                    background: isDarkMode ? 'rgba(34, 197, 94, 0.2)' : '#DCFCE7',
                    color: isDarkMode ? '#86EFAC' : '#166534'
                  }}>Node.js</span>
                  <span className="px-3 py-1 rounded-full text-sm" style={{ 
                    background: isDarkMode ? 'rgba(251, 191, 36, 0.2)' : '#FEF3C7',
                    color: isDarkMode ? '#FCD34D' : '#92400E'
                  }}>MongoDB</span>
                </div>
              </div>
              
              <div className="rounded-xl p-6" style={{ 
                background: isDarkMode 
                  ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)' 
                  : 'linear-gradient(135deg, #F0FDF4 0%, #F0FDFA 100%)',
                border: isDarkMode 
                  ? '1px solid rgba(34, 197, 94, 0.2)' 
                  : '1px solid #DCFCE7'
              }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: isDarkMode ? '#FFFFFF' : '#1F2937' }}>Task Management App</h3>
                    <p style={{ color: isDarkMode ? '#D1D5DB' : '#6B7280' }}>Collaborative task management with real-time updates</p>
                  </div>
                  <ExternalLink className="w-5 h-5" style={{ color: isDarkMode ? '#9CA3AF' : '#9CA3AF' }} />
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-sm" style={{ 
                    background: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : '#DBEAFE',
                    color: isDarkMode ? '#93C5FD' : '#1E40AF'
                  }}>Vue.js</span>
                  <span className="px-3 py-1 rounded-full text-sm" style={{ 
                    background: isDarkMode ? 'rgba(147, 51, 234, 0.2)' : '#F3E8FF',
                    color: isDarkMode ? '#C4B5FD' : '#7C3AED'
                  }}>Socket.io</span>
                  <span className="px-3 py-1 rounded-full text-sm" style={{ 
                    background: isDarkMode ? 'rgba(239, 68, 68, 0.2)' : '#FEE2E2',
                    color: isDarkMode ? '#FCA5A5' : '#DC2626'
                  }}>PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 'skills':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold" style={{ color: isDarkMode ? '#FFFFFF' : '#1F2937' }}>Skills & Technologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg p-4" style={{ 
                background: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : '#EFF6FF',
                border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.2)' : 'none'
              }}>
                <h3 className="font-semibold mb-3 flex items-center" style={{ color: isDarkMode ? '#93C5FD' : '#1E40AF' }}>
                  <Code className="w-5 h-5 mr-2" />
                  Frontend
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: isDarkMode ? '#93C5FD' : '#1E40AF' }}>React</span>
                    <div className="w-16 h-2 rounded-full" style={{ background: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : '#DBEAFE' }}>
                      <div className="w-4/5 h-full rounded-full" style={{ background: '#3B82F6' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: isDarkMode ? '#93C5FD' : '#1E40AF' }}>Vue.js</span>
                    <div className="w-16 h-2 rounded-full" style={{ background: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : '#DBEAFE' }}>
                      <div className="w-3/4 h-full rounded-full" style={{ background: '#3B82F6' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: isDarkMode ? '#93C5FD' : '#1E40AF' }}>TypeScript</span>
                    <div className="w-16 h-2 rounded-full" style={{ background: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : '#DBEAFE' }}>
                      <div className="w-5/6 h-full rounded-full" style={{ background: '#3B82F6' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-4" style={{ 
                background: isDarkMode ? 'rgba(34, 197, 94, 0.1)' : '#F0FDF4',
                border: isDarkMode ? '1px solid rgba(34, 197, 94, 0.2)' : 'none'
              }}>
                <h3 className="font-semibold mb-3 flex items-center" style={{ color: isDarkMode ? '#86EFAC' : '#166534' }}>
                  <Briefcase className="w-5 h-5 mr-2" />
                  Backend
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: isDarkMode ? '#86EFAC' : '#166534' }}>Node.js</span>
                    <div className="w-16 h-2 rounded-full" style={{ background: isDarkMode ? 'rgba(34, 197, 94, 0.2)' : '#DCFCE7' }}>
                      <div className="w-4/5 h-full rounded-full" style={{ background: '#22C55E' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: isDarkMode ? '#86EFAC' : '#166534' }}>Python</span>
                    <div className="w-16 h-2 rounded-full" style={{ background: isDarkMode ? 'rgba(34, 197, 94, 0.2)' : '#DCFCE7' }}>
                      <div className="w-3/4 h-full rounded-full" style={{ background: '#22C55E' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: isDarkMode ? '#86EFAC' : '#166534' }}>PostgreSQL</span>
                    <div className="w-16 h-2 rounded-full" style={{ background: isDarkMode ? 'rgba(34, 197, 94, 0.2)' : '#DCFCE7' }}>
                      <div className="w-5/6 h-full rounded-full" style={{ background: '#22C55E' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-4" style={{ 
                background: isDarkMode ? 'rgba(147, 51, 234, 0.1)' : '#FAF5FF',
                border: isDarkMode ? '1px solid rgba(147, 51, 234, 0.2)' : 'none'
              }}>
                <h3 className="font-semibold mb-3 flex items-center" style={{ color: isDarkMode ? '#C4B5FD' : '#7C3AED' }}>
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Tools
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: isDarkMode ? '#C4B5FD' : '#7C3AED' }}>Git</span>
                    <div className="w-16 h-2 rounded-full" style={{ background: isDarkMode ? 'rgba(147, 51, 234, 0.2)' : '#F3E8FF' }}>
                      <div className="w-5/6 h-full rounded-full" style={{ background: '#9333EA' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: isDarkMode ? '#C4B5FD' : '#7C3AED' }}>Docker</span>
                    <div className="w-16 h-2 rounded-full" style={{ background: isDarkMode ? 'rgba(147, 51, 234, 0.2)' : '#F3E8FF' }}>
                      <div className="w-3/4 h-full rounded-full" style={{ background: '#9333EA' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: isDarkMode ? '#C4B5FD' : '#7C3AED' }}>AWS</span>
                    <div className="w-16 h-2 rounded-full" style={{ background: isDarkMode ? 'rgba(147, 51, 234, 0.2)' : '#F3E8FF' }}>
                      <div className="w-4/5 h-full rounded-full" style={{ background: '#9333EA' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold" style={{ color: isDarkMode ? '#FFFFFF' : '#1F2937' }}>Get In Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5" style={{ color: '#3B82F6' }} />
                  <span style={{ color: isDarkMode ? '#D1D5DB' : '#374151' }}>shrey@example.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5" style={{ color: '#22C55E' }} />
                  <span style={{ color: isDarkMode ? '#D1D5DB' : '#374151' }}>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5" style={{ color: '#EF4444' }} />
                  <span style={{ color: isDarkMode ? '#D1D5DB' : '#374151' }}>San Francisco, CA</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Linkedin className="w-5 h-5" style={{ color: '#0077B5' }} />
                  <span style={{ color: isDarkMode ? '#D1D5DB' : '#374151' }}>linkedin.com/in/shrey</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5" style={{ color: isDarkMode ? '#D1D5DB' : '#6B7280' }} />
                  <span style={{ color: isDarkMode ? '#D1D5DB' : '#374151' }}>github.com/shrey</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg p-6" style={{ 
              background: isDarkMode ? 'rgba(55, 65, 81, 0.3)' : '#F9FAFB',
              border: isDarkMode ? '1px solid rgba(75, 85, 99, 0.3)' : 'none'
            }}>
              <h3 className="font-semibold mb-3" style={{ color: isDarkMode ? '#FFFFFF' : '#1F2937' }}>Let's work together</h3>
              <p className="text-sm" style={{ color: isDarkMode ? '#D1D5DB' : '#6B7280' }}>
                I'm always interested in new opportunities and exciting projects. 
                Feel free to reach out if you'd like to collaborate!
              </p>
            </div>
          </div>
        )

      default:
        return <div>Window content not found</div>
    }
  }

  const handleMouseDown = (e: React.MouseEvent, windowId: string) => {
    if ((e.target as HTMLElement).classList.contains('window-title-bar')) {
      e.preventDefault()
      setDraggedWindow(windowId)
      setIsDragging(true)
      onFocusWindow(windowId)
      
      const windowElement = e.currentTarget as HTMLElement
      const rect = windowElement.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (draggedWindow && isDragging) {
      e.preventDefault()
      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y
      
      // Constrain to viewport
      const maxX = window.innerWidth - 400 // minimum window width
      const maxY = window.innerHeight - 200 // minimum window height
      
      const constrainedX = Math.max(0, Math.min(newX, maxX))
      const constrainedY = Math.max(32, Math.min(newY, maxY)) // 32px for menu bar
      
      // Use requestAnimationFrame for smooth updates
      requestAnimationFrame(() => {
        onUpdateWindowPosition(draggedWindow, { x: constrainedX, y: constrainedY })
      })
    }
  }

  const handleMouseUp = () => {
    setDraggedWindow(null)
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
      }
    }
  }, [isDragging, draggedWindow, dragOffset])

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {windows.map((window) => (
                  <motion.div
                    key={window.id}
                    initial={{ 
                      opacity: 0, 
                      scale: 0.85, 
                      y: 30,
                      rotateX: -12,
                      rotateY: 2,
                      transformOrigin: 'center center',
                      filter: 'blur(8px)'
                    }}
                    animate={{ 
                      opacity: window.isMinimized ? 0 : 1, 
                      scale: window.isMinimized ? 0.2 : 1,
                      x: window.isMaximized ? 0 : window.position.x,
                      y: window.isMaximized ? 32 : window.position.y,
                      width: window.isMaximized ? '100vw' : window.size.width,
                      height: window.isMaximized ? 'calc(100vh - 32px - 80px)' : window.size.height,
                      rotateX: window.isMinimized ? -12 : 0,
                      rotateY: window.isMinimized ? 2 : 0,
                      filter: window.isMinimized ? 'blur(8px)' : 'blur(0px)',
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.85, 
                      y: 30,
                      rotateX: -12,
                      rotateY: -2,
                      filter: 'blur(8px)',
                      transition: { 
                        duration: 0.2,
                        ease: [0.4, 0, 1, 1]
                      }
                    }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.16, 1, 0.3, 1], // macOS-like spring easing
                      type: 'tween'
                    }}
                    className={`
                      absolute pointer-events-auto
                      ${window.isMaximized ? 'rounded-none' : 'rounded-2xl'}
                      ${isDragging && draggedWindow === window.id ? 'cursor-grabbing' : 'cursor-default'}
                    `}
                    style={{
                      zIndex: window.zIndex,
                      minWidth: window.innerWidth < 640 ? '280px' : '400px',
                      minHeight: window.innerWidth < 640 ? '200px' : '300px',
                      maxWidth: window.innerWidth < 640 ? 'calc(100vw - 32px)' : '90vw',
                      maxHeight: window.innerWidth < 640 ? 'calc(100vh - 120px)' : '90vh',
                      left: window.isMaximized ? '0' : 'auto',
                      right: window.isMaximized ? '0' : 'auto',
                      bottom: window.isMaximized ? '80px' : 'auto',
                    }}
            onMouseDown={(e) => handleMouseDown(e, window.id)}
          >
            <div className="flex-1 flex flex-col overflow-hidden" style={{
              background: isDarkMode 
                ? '#1C1C1E' 
                : '#FFFFFF',
              borderRadius: window.isMaximized ? '0' : '12px',
              border: isDarkMode 
                ? '1px solid rgba(255, 255, 255, 0.1)' 
                : '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: isDarkMode 
                ? '0 8px 32px rgba(0, 0, 0, 0.4)' 
                : '0 8px 32px rgba(0, 0, 0, 0.12)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              {/* Window Title Bar */}
              <div 
                className="window-title-bar flex items-center justify-between px-4 py-2.5 cursor-move select-none"
                style={{
                  background: isDarkMode 
                    ? '#2C2C2E' 
                    : '#F2F2F7',
                  borderBottom: isDarkMode 
                    ? '1px solid rgba(255, 255, 255, 0.1)' 
                    : '1px solid rgba(0, 0, 0, 0.05)',
                  borderRadius: window.isMaximized ? '0' : '12px 12px 0 0'
                }}
              >
                {/* Traffic Light Buttons */}
                <div className="flex items-center space-x-1.5">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onCloseWindow(window.id)}
                    className="w-3 h-3 rounded-full transition-all duration-200"
                    style={{ 
                      background: '#FF5F57',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      border: '0.5px solid rgba(0, 0, 0, 0.1)'
                    }}
                    aria-label="Close window"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onMinimizeWindow(window.id)}
                    className="w-3 h-3 rounded-full transition-all duration-200"
                    style={{ 
                      background: '#FFBD2E',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      border: '0.5px solid rgba(0, 0, 0, 0.1)'
                    }}
                    aria-label="Minimize window"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onMaximizeWindow(window.id)}
                    className="w-3 h-3 rounded-full transition-all duration-200"
                    style={{ 
                      background: '#28CA42',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      border: '0.5px solid rgba(0, 0, 0, 0.1)'
                    }}
                    aria-label="Maximize window"
                  >
                    {window.isMaximized ? (
                      <Maximize2 className="w-2 h-2 text-green-800" />
                    ) : null}
                  </motion.button>
                </div>

                {/* Window Title */}
                <div className="flex-1 text-center">
                  <h1 className="text-sm font-medium truncate" style={{
                    fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    color: isDarkMode ? '#FFFFFF' : '#1F2937'
                  }}>
                    {window.title}
                  </h1>
                </div>

                {/* Spacer for symmetry */}
                <div className="w-16" />
              </div>

              {/* Window Content */}
              <motion.div
                animate={{
                  height: window.isMinimized ? 0 : 'auto',
                  opacity: window.isMinimized ? 0 : 1,
                  scale: window.isMinimized ? 0.8 : 1,
                  y: window.isMinimized ? -20 : 0
                }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.16, 1, 0.3, 1],
                  type: 'tween'
                }}
                className="flex-1 overflow-auto"
              >
                <div className="p-6">
                  {getWindowContent(window.type)}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default WindowManager
