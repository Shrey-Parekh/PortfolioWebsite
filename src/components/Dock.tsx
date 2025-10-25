import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Home, 
  User, 
  FolderOpen, 
  Trophy, 
  Code, 
  Mail, 
  FileText,
  BookOpen,
  Monitor,
  Briefcase,
  Award,
  MessageSquare,
  Download,
  Book
} from 'lucide-react'

interface DockProps {
  currentPage: string
  setCurrentPage: (page: string) => void
  onOpenWindow: (windowType: string) => void
}

interface DockItem {
  id: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  path: string
  isActive?: boolean
}

const Dock: React.FC<DockProps> = ({ currentPage, setCurrentPage, onOpenWindow }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const dockItems: DockItem[] = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'about', icon: User, label: 'About Me', path: '/about' },
    { id: 'projects', icon: Briefcase, label: 'Projects', path: '/projects' },
    { id: 'skills', icon: Code, label: 'Skills', path: '/skills' },
    { id: 'contact', icon: MessageSquare, label: 'Contact', path: '/contact' },
    { id: 'resume', icon: Download, label: 'Resume', path: '/resume' }
  ]

  const handleItemClick = (item: DockItem) => {
    if (item.id === 'home') {
      setCurrentPage('home')
      return
    }
    
    if (item.id === 'resume') {
      // Download resume functionality
      const link = document.createElement('a')
      link.href = '/resume.pdf'
      link.download = 'resume.pdf'
      link.click()
      return
    }
    
    // Open window for other items
    onOpenWindow(item.id)
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 z-50 flex justify-center px-4">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex items-center justify-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 shadow-2xl" 
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
          minWidth: 'fit-content',
          maxWidth: '90vw'
        }}
      >
        {dockItems.map((item, index) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          const isHovered = hoveredItem === item.id
          const isSeparator = index === 4 // Add separator before last 2 items

          return (
            <React.Fragment key={item.id}>
              {isSeparator && (
                <div className="w-px h-8 bg-white/20 mx-3" />
              )}
              
              <motion.div
                className="relative flex flex-col items-center cursor-pointer group mx-1 sm:mx-2 md:mx-3 dock-item"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleItemClick(item)}
                whileHover={{ scale: 1.15, y: -8 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: isHovered ? 1.15 : isActive ? 1.05 : 1,
                  y: isHovered ? -8 : isActive ? -3 : 0
                }}
                transition={{
                  duration: 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94] // Professional easing
                }}
              >
                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.9 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 5,
                    scale: isHovered ? 1 : 0.9
                  }}
                  transition={{ 
                    duration: 0.1, 
                    ease: 'easeOut' // Professional easing
                  }}
                  className="absolute -top-12 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none"
                  style={{ 
                    fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {item.label}
                </motion.div>

                {/* Icon Container */}
                <div className={`
                  w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-150 relative
                  ${isActive 
                    ? 'bg-white/25' 
                    : 'hover:bg-white/15'
                  }
                `} style={{
                  background: isActive ? 'rgba(255, 255, 255, 0.25)' : isHovered ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  boxShadow: isActive ? '0 4px 20px rgba(255, 255, 255, 0.2)' : 'none'
                }}>
                  <Icon 
                    className={`
                      w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-all duration-150
                      ${isActive 
                        ? 'text-white' 
                        : 'text-white/90'
                      }
                    `} 
                  />
                  
                  {/* Magnification Effect */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-white/20"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.1, 
                        ease: 'easeOut' // Professional easing
                      }}
                    />
                  )}
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.2,
                      ease: 'easeOut' // Professional easing
                    }}
                  />
                )}
              </motion.div>
            </React.Fragment>
          )
        })}
      </motion.div>
    </div>
  )
}

export default Dock
