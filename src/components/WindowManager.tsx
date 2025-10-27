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
  sourcePosition?: { x: number; y: number }
  isOpening?: boolean
  isClosing?: boolean
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
          <div className="space-y-8 max-w-4xl">
            {/* Header Section */}
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-2">
                <h2 
                  className="text-3xl font-light tracking-tight sf-pro-display" 
                  style={{ 
                    color: isDarkMode ? '#FFFFFF' : '#1F2937',
                    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 300,
                    letterSpacing: '-0.02em'
                  }}
                >
                  Shrey Parekh
                </h2>
                <p 
                  className="text-xl sf-pro-text" 
                  style={{ 
                    color: isDarkMode ? '#A1A1AA' : '#6B7280',
                    fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 400
                  }}
                >
                  Full Stack Developer & AI Enthusiast
                </p>
              </div>
            </div>

            {/* Bio Section */}
            <div className="space-y-6">
              <p 
                className="text-lg leading-relaxed sf-pro-text" 
                style={{ 
                  color: isDarkMode ? '#D4D4D8' : '#374151',
                  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                  lineHeight: '1.7',
                  fontWeight: 400
                }}
              >
                Passionate full-stack developer with expertise in modern web technologies, AI/ML development, and systems programming. 
                I specialize in creating pixel-perfect user experiences and building scalable, intelligent applications that solve real-world problems.
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div 
                  className="rounded-2xl p-6 transition-all duration-300 hover:scale-105" 
                  style={{ 
                    background: isDarkMode 
                      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)' 
                      : 'linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%)',
                    border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid #DBEAFE',
                    boxShadow: isDarkMode 
                      ? '0 4px 20px rgba(59, 130, 246, 0.1)' 
                      : '0 4px 20px rgba(59, 130, 246, 0.05)'
                  }}
                >
                  <h3 
                    className="font-semibold mb-3 sf-pro-text" 
                    style={{ 
                      color: isDarkMode ? '#93C5FD' : '#1E40AF',
                      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '16px',
                      fontWeight: 600
                    }}
                  >
                    Experience
                  </h3>
                  <p 
                    className="text-sm sf-pro-text" 
                    style={{ 
                      color: isDarkMode ? '#BFDBFE' : '#1E40AF',
                      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontWeight: 500
                    }}
                  >
                    5+ years in development
                  </p>
                </div>
                
                <div 
                  className="rounded-2xl p-6 transition-all duration-300 hover:scale-105" 
                  style={{ 
                    background: isDarkMode 
                      ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)' 
                      : 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)',
                    border: isDarkMode ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid #DCFCE7',
                    boxShadow: isDarkMode 
                      ? '0 4px 20px rgba(34, 197, 94, 0.1)' 
                      : '0 4px 20px rgba(34, 197, 94, 0.05)'
                  }}
                >
                  <h3 
                    className="font-semibold mb-3 sf-pro-text" 
                    style={{ 
                      color: isDarkMode ? '#86EFAC' : '#166534',
                      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '16px',
                      fontWeight: 600
                    }}
                  >
                    Availability
                  </h3>
                  <p 
                    className="text-sm sf-pro-text" 
                    style={{ 
                      color: isDarkMode ? '#BBF7D0' : '#166534',
                      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontWeight: 500
                    }}
                  >
                    Open to opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'projects':
        return (
          <div className="space-y-8 max-w-5xl">
            {/* Header */}
            <div className="space-y-2">
              <h2 
                className="text-3xl font-light tracking-tight sf-pro-display" 
                style={{ 
                  color: isDarkMode ? '#FFFFFF' : '#1F2937',
                  fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 300,
                  letterSpacing: '-0.02em'
                }}
              >
                Featured Projects
              </h2>
              <p 
                className="text-lg sf-pro-text" 
                style={{ 
                  color: isDarkMode ? '#A1A1AA' : '#6B7280',
                  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                A showcase of my recent work and technical expertise
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-8">
              <div 
                className="rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] cursor-pointer group" 
                style={{ 
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(147, 51, 234, 0.08) 100%)' 
                    : 'linear-gradient(135deg, #EFF6FF 0%, #FAF5FF 100%)',
                  border: isDarkMode 
                    ? '1px solid rgba(59, 130, 246, 0.25)' 
                    : '1px solid #DBEAFE',
                  boxShadow: isDarkMode 
                    ? '0 8px 32px rgba(59, 130, 246, 0.1)' 
                    : '0 8px 32px rgba(59, 130, 246, 0.08)'
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-3">
                    <h3 
                      className="text-2xl font-semibold sf-pro-display group-hover:text-blue-500 transition-colors" 
                      style={{ 
                        color: isDarkMode ? '#FFFFFF' : '#1F2937',
                        fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 600,
                        letterSpacing: '-0.01em'
                      }}
                    >
                      AI-Powered Portfolio Platform
                    </h3>
                    <p 
                      className="text-lg leading-relaxed sf-pro-text" 
                      style={{ 
                        color: isDarkMode ? '#D4D4D8' : '#6B7280',
                        fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        lineHeight: '1.6'
                      }}
                    >
                      Interactive portfolio with macOS-inspired design, featuring AI-driven animations, 
                      real-time window management, and responsive 3D elements built with React and TypeScript.
                    </p>
                  </div>
                  <ExternalLink 
                    className="w-6 h-6 group-hover:scale-110 transition-transform" 
                    style={{ color: isDarkMode ? '#9CA3AF' : '#9CA3AF' }} 
                  />
                </div>
                
                {/* Technology Tags */}
                <div className="flex flex-wrap gap-3">
                  <span 
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105" 
                    style={{ 
                      background: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : '#DBEAFE',
                      color: isDarkMode ? '#93C5FD' : '#1E40AF',
                      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid #BFDBFE'
                    }}
                  >
                    React
                  </span>
                  <span 
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105" 
                    style={{ 
                      background: isDarkMode ? 'rgba(34, 197, 94, 0.2)' : '#DCFCE7',
                      color: isDarkMode ? '#86EFAC' : '#166534',
                      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      border: isDarkMode ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid #BBF7D0'
                    }}
                  >
                    TypeScript
                  </span>
                  <span 
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105" 
                    style={{ 
                      background: isDarkMode ? 'rgba(147, 51, 234, 0.2)' : '#F3E8FF',
                      color: isDarkMode ? '#C4B5FD' : '#7C3AED',
                      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      border: isDarkMode ? '1px solid rgba(147, 51, 234, 0.3)' : '1px solid #C4B5FD'
                    }}
                  >
                    Framer Motion
                  </span>
                  <span 
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105" 
                    style={{ 
                      background: isDarkMode ? 'rgba(251, 191, 36, 0.2)' : '#FEF3C7',
                      color: isDarkMode ? '#FCD34D' : '#92400E',
                      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      border: isDarkMode ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid #FCD34D'
                    }}
                  >
                    Three.js
                  </span>
                </div>
              </div>
              
              <div 
                className="rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] cursor-pointer group" 
                style={{ 
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.12) 0%, rgba(20, 184, 166, 0.08) 100%)' 
                    : 'linear-gradient(135deg, #F0FDF4 0%, #F0FDFA 100%)',
                  border: isDarkMode 
                    ? '1px solid rgba(34, 197, 94, 0.25)' 
                    : '1px solid #DCFCE7',
                  boxShadow: isDarkMode 
                    ? '0 8px 32px rgba(34, 197, 94, 0.1)' 
                    : '0 8px 32px rgba(34, 197, 94, 0.08)'
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-3">
                    <h3 
                      className="text-2xl font-semibold sf-pro-display group-hover:text-green-500 transition-colors" 
                      style={{ 
                        color: isDarkMode ? '#FFFFFF' : '#1F2937',
                        fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 600,
                        letterSpacing: '-0.01em'
                      }}
                    >
                      Rust Systems Programming
                    </h3>
                    <p 
                      className="text-lg leading-relaxed sf-pro-text" 
                      style={{ 
                        color: isDarkMode ? '#D4D4D8' : '#6B7280',
                        fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        lineHeight: '1.6'
                      }}
                    >
                      High-performance systems programming projects including embedded systems, 
                      network protocols, and memory-safe applications built with Rust and modern tooling.
                    </p>
                  </div>
                  <ExternalLink 
                    className="w-6 h-6 group-hover:scale-110 transition-transform" 
                    style={{ color: isDarkMode ? '#9CA3AF' : '#9CA3AF' }} 
                  />
                </div>
                
                {/* Technology Tags */}
                <div className="flex flex-wrap gap-3">
                  <span 
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105" 
                    style={{ 
                      background: isDarkMode ? 'rgba(239, 68, 68, 0.2)' : '#FEE2E2',
                      color: isDarkMode ? '#FCA5A5' : '#DC2626',
                      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      border: isDarkMode ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid #FCA5A5'
                    }}
                  >
                    Rust
                  </span>
                  <span 
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105" 
                    style={{ 
                      background: isDarkMode ? 'rgba(147, 51, 234, 0.2)' : '#F3E8FF',
                      color: isDarkMode ? '#C4B5FD' : '#7C3AED',
                      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      border: isDarkMode ? '1px solid rgba(147, 51, 234, 0.3)' : '1px solid #C4B5FD'
                    }}
                  >
                    WebAssembly
                  </span>
                  <span 
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105" 
                    style={{ 
                      background: isDarkMode ? 'rgba(34, 197, 94, 0.2)' : '#DCFCE7',
                      color: isDarkMode ? '#86EFAC' : '#166534',
                      fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      border: isDarkMode ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid #BBF7D0'
                    }}
                  >
                    Embedded Systems
                  </span>
                </div>
              </div>
            </div>
          </div>
        )

      case 'skills':
        return (
          <div className="space-y-8 max-w-5xl">
            {/* Header */}
            <div className="space-y-2">
              <h2 
                className="text-3xl font-light tracking-tight sf-pro-display" 
                style={{ 
                  color: isDarkMode ? '#FFFFFF' : '#1F2937',
                  fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 300,
                  letterSpacing: '-0.02em'
                }}
              >
                Skills & Technologies
              </h2>
              <p 
                className="text-lg sf-pro-text" 
                style={{ 
                  color: isDarkMode ? '#A1A1AA' : '#6B7280',
                  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                Technical expertise across the full development stack
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div 
                className="rounded-3xl p-8 transition-all duration-300 hover:scale-105" 
                style={{ 
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)' 
                    : 'linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%)',
                  border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid #DBEAFE',
                  boxShadow: isDarkMode 
                    ? '0 8px 32px rgba(59, 130, 246, 0.1)' 
                    : '0 8px 32px rgba(59, 130, 246, 0.08)'
                }}
              >
                <h3 
                  className="font-semibold mb-6 flex items-center sf-pro-display" 
                  style={{ 
                    color: isDarkMode ? '#93C5FD' : '#1E40AF',
                    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '20px',
                    fontWeight: 600,
                    letterSpacing: '-0.01em'
                  }}
                >
                  <Code className="w-6 h-6 mr-3" />
                  Frontend Development
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'React & Next.js', level: 95 },
                    { name: 'TypeScript', level: 90 },
                    { name: 'Tailwind CSS', level: 88 }
                  ].map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span 
                          className="text-sm font-medium sf-pro-text" 
                          style={{ 
                            color: isDarkMode ? '#BFDBFE' : '#1E40AF',
                            fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif'
                          }}
                        >
                          {skill.name}
                        </span>
                        <span 
                          className="text-xs font-medium sf-pro-text" 
                          style={{ 
                            color: isDarkMode ? '#93C5FD' : '#3B82F6',
                            fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif'
                          }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div 
                        className="w-full h-2 rounded-full overflow-hidden" 
                        style={{ background: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : '#DBEAFE' }}
                      >
                        <div 
                          className="h-full rounded-full transition-all duration-1000 ease-out" 
                          style={{ 
                            width: `${skill.level}%`,
                            background: 'linear-gradient(90deg, #3B82F6 0%, #6366F1 100%)'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div 
                className="rounded-3xl p-8 transition-all duration-300 hover:scale-105" 
                style={{ 
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)' 
                    : 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)',
                  border: isDarkMode ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid #DCFCE7',
                  boxShadow: isDarkMode 
                    ? '0 8px 32px rgba(34, 197, 94, 0.1)' 
                    : '0 8px 32px rgba(34, 197, 94, 0.08)'
                }}
              >
                <h3 
                  className="font-semibold mb-6 flex items-center sf-pro-display" 
                  style={{ 
                    color: isDarkMode ? '#86EFAC' : '#166534',
                    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '20px',
                    fontWeight: 600,
                    letterSpacing: '-0.01em'
                  }}
                >
                  <Briefcase className="w-6 h-6 mr-3" />
                  Backend & Systems
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Rust & WebAssembly', level: 92 },
                    { name: 'Node.js & Python', level: 88 },
                    { name: 'Database Design', level: 85 }
                  ].map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span 
                          className="text-sm font-medium sf-pro-text" 
                          style={{ 
                            color: isDarkMode ? '#BBF7D0' : '#166534',
                            fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif'
                          }}
                        >
                          {skill.name}
                        </span>
                        <span 
                          className="text-xs font-medium sf-pro-text" 
                          style={{ 
                            color: isDarkMode ? '#86EFAC' : '#22C55E',
                            fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif'
                          }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div 
                        className="w-full h-2 rounded-full overflow-hidden" 
                        style={{ background: isDarkMode ? 'rgba(34, 197, 94, 0.2)' : '#DCFCE7' }}
                      >
                        <div 
                          className="h-full rounded-full transition-all duration-1000 ease-out" 
                          style={{ 
                            width: `${skill.level}%`,
                            background: 'linear-gradient(90deg, #22C55E 0%, #16A34A 100%)'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div 
                className="rounded-3xl p-8 transition-all duration-300 hover:scale-105" 
                style={{ 
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(168, 85, 247, 0.1) 100%)' 
                    : 'linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 100%)',
                  border: isDarkMode ? '1px solid rgba(147, 51, 234, 0.3)' : '1px solid #E9D5FF',
                  boxShadow: isDarkMode 
                    ? '0 8px 32px rgba(147, 51, 234, 0.1)' 
                    : '0 8px 32px rgba(147, 51, 234, 0.08)'
                }}
              >
                <h3 
                  className="font-semibold mb-6 flex items-center sf-pro-display" 
                  style={{ 
                    color: isDarkMode ? '#C4B5FD' : '#7C3AED',
                    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '20px',
                    fontWeight: 600,
                    letterSpacing: '-0.01em'
                  }}
                >
                  <MessageSquare className="w-6 h-6 mr-3" />
                  AI & DevOps Tools
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'AI/ML Frameworks', level: 90 },
                    { name: 'Docker & K8s', level: 85 },
                    { name: 'Cloud Platforms', level: 88 }
                  ].map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span 
                          className="text-sm font-medium sf-pro-text" 
                          style={{ 
                            color: isDarkMode ? '#DDD6FE' : '#7C3AED',
                            fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif'
                          }}
                        >
                          {skill.name}
                        </span>
                        <span 
                          className="text-xs font-medium sf-pro-text" 
                          style={{ 
                            color: isDarkMode ? '#C4B5FD' : '#9333EA',
                            fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif'
                          }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div 
                        className="w-full h-2 rounded-full overflow-hidden" 
                        style={{ background: isDarkMode ? 'rgba(147, 51, 234, 0.2)' : '#F3E8FF' }}
                      >
                        <div 
                          className="h-full rounded-full transition-all duration-1000 ease-out" 
                          style={{ 
                            width: `${skill.level}%`,
                            background: 'linear-gradient(90deg, #9333EA 0%, #A855F7 100%)'
                          }}
                        />
                      </div>
                    </div>
                  ))}
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
        {windows.map((window) => {
          // Calculate initial position for genie effect
          const sourceX = window.sourcePosition?.x || window.position.x
          const sourceY = window.sourcePosition?.y || (typeof globalThis.window !== 'undefined' ? globalThis.window.innerHeight - 100 : 500)
          const targetX = window.isMaximized ? 0 : window.position.x
          const targetY = window.isMaximized ? 32 : window.position.y
          
          return (
            <motion.div
              key={window.id}
              initial={{ 
                opacity: 0,
                scale: 0.05,
                x: sourceX,
                y: sourceY,
                rotateX: -15,
                rotateY: 0,
                rotateZ: 0,
                transformOrigin: 'center bottom',
                filter: 'blur(8px)',
                borderRadius: '50px'
              }}
              animate={{ 
                opacity: window.isClosing ? 0 : (window.isMinimized ? 0 : 1),
                scale: window.isClosing ? 0.3 : (window.isMinimized ? 0.05 : 1),
                x: window.isClosing ? sourceX : (window.isMinimized ? sourceX : targetX),
                y: window.isClosing ? sourceY + 50 : (window.isMinimized ? sourceY : targetY),
                width: window.isMaximized ? '100vw' : window.size.width,
                height: window.isMaximized ? 'calc(100vh - 32px - 80px)' : window.size.height,
                rotateX: window.isClosing ? -25 : (window.isMinimized ? -15 : 0),
                rotateY: window.isClosing ? 10 : (window.isMinimized ? 0 : 0),
                rotateZ: window.isClosing ? -5 : (window.isMinimized ? 0 : 0),
                filter: window.isClosing ? 'blur(12px)' : (window.isMinimized ? 'blur(8px)' : 'blur(0px)'),
                borderRadius: window.isClosing ? '25px' : (window.isMinimized ? '50px' : (window.isMaximized ? '0px' : '12px'))
              }}
              exit={{ 
                opacity: 0,
                scale: 0.05,
                x: sourceX,
                y: sourceY,
                rotateX: -15,
                filter: 'blur(8px)',
                borderRadius: '50px',
                transition: { 
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
              transition={{ 
                duration: window.isClosing ? 0.4 : (window.isOpening ? 0.8 : (window.isMinimized ? 0.6 : 0.4)),
                ease: window.isClosing ? [0.4, 0, 1, 1] : (window.isOpening ? [0.25, 0.1, 0.25, 1] : [0.16, 1, 0.3, 1]),
                type: 'tween'
              }}
              className={`
                absolute pointer-events-auto
                ${window.isMaximized ? 'rounded-none' : 'rounded-2xl'}
                ${isDragging && draggedWindow === window.id ? 'cursor-grabbing' : 'cursor-default'}
              `}
              style={{
                zIndex: window.zIndex,
                minWidth: typeof globalThis.window !== 'undefined' && globalThis.window.innerWidth < 640 ? '280px' : '400px',
                minHeight: typeof globalThis.window !== 'undefined' && globalThis.window.innerWidth < 640 ? '200px' : '300px',
                maxWidth: typeof globalThis.window !== 'undefined' && globalThis.window.innerWidth < 640 ? 'calc(100vw - 32px)' : '90vw',
                maxHeight: typeof globalThis.window !== 'undefined' && globalThis.window.innerWidth < 640 ? 'calc(100vh - 120px)' : '90vh',
                left: window.isMaximized ? '0' : 'auto',
                right: window.isMaximized ? '0' : 'auto',
                bottom: window.isMaximized ? '80px' : 'auto',
              }}
              onMouseDown={(e) => handleMouseDown(e, window.id)}
            >
            <motion.div 
              className="flex-1 flex flex-col overflow-hidden h-full w-full" 
              style={{
                background: isDarkMode 
                  ? '#1C1C1E' 
                  : '#FFFFFF',
                borderRadius: window.isMaximized ? '0' : '12px',
                border: isDarkMode 
                  ? '1px solid #3A3A3C' 
                  : '1px solid #D1D1D6',
                boxShadow: isDarkMode 
                  ? '0 20px 60px rgba(0, 0, 0, 0.8), 0 8px 32px rgba(0, 0, 0, 0.6)' 
                  : '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
              initial={{ 
                borderRadius: '50px',
                background: isDarkMode ? '#1C1C1E' : '#FFFFFF',
                opacity: 0
              }}
              animate={{ 
                borderRadius: window.isMaximized ? '0px' : '12px',
                background: isDarkMode 
                  ? '#1C1C1E' 
                  : '#FFFFFF',
                opacity: 1
              }}
              transition={{ 
                duration: window.isOpening ? 0.8 : 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: window.isOpening ? 0.2 : 0
              }}
            >
              {/* Window Title Bar */}
              <motion.div 
                className="window-title-bar flex items-center justify-between px-4 py-2.5 cursor-move select-none"
                style={{
                  background: isDarkMode 
                    ? '#2C2C2E' 
                    : '#F2F2F7',
                  borderBottom: isDarkMode 
                    ? '1px solid #3A3A3C' 
                    : '1px solid #D1D1D6',
                  borderRadius: window.isMaximized ? '0' : '12px 12px 0 0'
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4,
                  delay: window.isOpening ? 0.3 : 0,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {/* Traffic Light Buttons */}
                <motion.div 
                  className="flex items-center space-x-1.5"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.4,
                    delay: window.isOpening ? 0.4 : 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <motion.button
                    whileHover={{ 
                      scale: 1.08, 
                      boxShadow: '0 0 0 2px rgba(255, 107, 107, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                    whileTap={{ 
                      scale: 0.88,
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                    onClick={() => onCloseWindow(window.id)}
                    className="w-3 h-3 rounded-full transition-all duration-200 relative group"
                    style={{ 
                      background: 'linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)',
                      border: '0.5px solid rgba(0, 0, 0, 0.15)'
                    }}
                    aria-label="Close window"
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 0, rotate: 0 }}
                      whileHover={{ opacity: 1, rotate: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <X className="w-2 h-2 text-red-900" strokeWidth={2.5} />
                    </motion.div>
                  </motion.button>
                  <motion.button
                    whileHover={{ 
                      scale: 1.08,
                      boxShadow: '0 0 0 2px rgba(255, 217, 61, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                    whileTap={{ 
                      scale: 0.88,
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                    onClick={() => onMinimizeWindow(window.id)}
                    className="w-3 h-3 rounded-full transition-all duration-200 relative group"
                    style={{ 
                      background: window.isMinimized 
                        ? 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)'
                        : 'linear-gradient(135deg, #FFD93D 0%, #FFC107 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)',
                      border: '0.5px solid rgba(0, 0, 0, 0.15)'
                    }}
                    aria-label={window.isMinimized ? "Restore window" : "Minimize window"}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center"
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 0, y: 0 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Minus className="w-2 h-2 text-yellow-900" strokeWidth={2.5} />
                    </motion.div>
                  </motion.button>
                  <motion.button
                    whileHover={{ 
                      scale: 1.08,
                      boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                    whileTap={{ 
                      scale: 0.88,
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                    onClick={() => onMaximizeWindow(window.id)}
                    className="w-3 h-3 rounded-full transition-all duration-200 relative group"
                    style={{ 
                      background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)',
                      border: '0.5px solid rgba(0, 0, 0, 0.15)'
                    }}
                    aria-label={window.isMaximized ? "Restore window" : "Maximize window"}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0, scale: 1 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {window.isMaximized ? (
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 0 }}
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Maximize2 className="w-1.5 h-1.5 text-green-900" strokeWidth={2.5} />
                        </motion.div>
                      ) : (
                        <Square className="w-1.5 h-1.5 text-green-900" strokeWidth={2.5} />
                      )}
                    </motion.div>
                  </motion.button>
                </motion.div>

                {/* Window Title */}
                <motion.div 
                  className="flex-1 text-center"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4,
                    delay: window.isOpening ? 0.5 : 0.2,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <h1 className="text-sm font-medium truncate" style={{
                    fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    color: isDarkMode ? '#FFFFFF' : '#1F2937',
                    textShadow: isDarkMode ? 'none' : '0 1px 0 rgba(255, 255, 255, 0.8)'
                  }}>
                    {window.title}
                  </h1>
                </motion.div>

                {/* Spacer for symmetry */}
                <div className="w-16" />
              </motion.div>

              {/* Window Content */}
              <motion.div
                initial={{ 
                  opacity: 0,
                  scale: 0.9,
                  y: 20
                }}
                animate={{
                  height: window.isMinimized ? 0 : 'auto',
                  opacity: window.isMinimized ? 0 : 1,
                  scale: window.isMinimized ? 0.8 : 1,
                  y: window.isMinimized ? -20 : 0
                }}
                transition={{ 
                  duration: window.isOpening ? 0.8 : 0.3,
                  ease: [0.16, 1, 0.3, 1],
                  delay: window.isOpening ? 0.4 : 0,
                  type: 'tween'
                }}
                className="flex-1 overflow-auto"
              >
                <motion.div 
                  className="p-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6,
                    delay: window.isOpening ? 0.6 : 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  {getWindowContent(window.type)}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )})}
      </AnimatePresence>
    </div>
  )
}

export default WindowManager
