import React, { useState, useRef } from 'react'
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
  onOpenWindow: (windowType: string, sourceElement?: HTMLElement) => void
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
  const [clickedItem, setClickedItem] = useState<string | null>(null)
  const itemRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  const dockItems: DockItem[] = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'about', icon: User, label: 'About Me', path: '/about' },
    { id: 'projects', icon: Briefcase, label: 'Projects', path: '/projects' },
    { id: 'skills', icon: Code, label: 'Skills', path: '/skills' },
    { id: 'contact', icon: MessageSquare, label: 'Contact', path: '/contact' },
    { id: 'blog', icon: BookOpen, label: 'Blog & Articles', path: '/blog' }
  ]

  const handleItemClick = (item: DockItem, event: React.MouseEvent) => {
    const element = event.currentTarget as HTMLElement
    
    // Set clicked state for bounce animation
    setClickedItem(item.id)
    
    if (item.id === 'home') {
      setCurrentPage('home')
      setTimeout(() => setClickedItem(null), 300)
      return
    }
    
    if (item.id === 'blog') {
      // Open blog window
      onOpenWindow(item.id, element)
      setTimeout(() => setClickedItem(null), 800)
      return
    }
    
    // Open window for other items with source element for animation
    onOpenWindow(item.id, element)
    
    // Keep clicked state longer for window opening
    setTimeout(() => setClickedItem(null), 800)
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 z-50 flex justify-center px-4">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex items-center justify-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 shadow-2xl" 
        style={{
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
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
                ref={(el) => { itemRefs.current[item.id] = el }}
                className="relative flex flex-col items-center cursor-pointer group mx-1 sm:mx-2 md:mx-3 dock-item"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={(e) => handleItemClick(item, e)}
                whileHover={{ scale: 1.15, y: -8 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: isHovered ? 1.15 : isActive ? 1.05 : clickedItem === item.id ? 1.3 : 1,
                  y: isHovered ? -8 : isActive ? -3 : clickedItem === item.id ? -12 : 0,
                  rotateZ: clickedItem === item.id ? [0, -2, 2, -1, 1, 0] : 0
                }}
                transition={{
                  duration: clickedItem === item.id ? 0.3 : 0.15,
                  ease: clickedItem === item.id ? [0.68, -0.55, 0.265, 1.55] : [0.25, 0.46, 0.45, 0.94]
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
                <motion.div 
                  className={`
                    w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-150 relative overflow-hidden
                    ${isActive 
                      ? 'bg-white/25' 
                      : 'hover:bg-white/15'
                    }
                  `} 
                  style={{
                    background: isActive ? 'rgba(255, 255, 255, 0.4)' : isHovered ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: isActive 
                      ? '0 4px 20px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)' 
                      : isHovered 
                        ? '0 2px 12px rgba(255, 255, 255, 0.2)' 
                        : 'none',
                    border: isActive ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  animate={{
                    boxShadow: clickedItem === item.id 
                      ? '0 8px 32px rgba(255, 255, 255, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.5)'
                      : isActive 
                        ? '0 4px 20px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                        : isHovered 
                          ? '0 2px 12px rgba(255, 255, 255, 0.1)' 
                          : 'none'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    animate={{
                      scale: clickedItem === item.id ? 1.1 : 1,
                      rotate: clickedItem === item.id ? [0, -1, 1, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon 
                      className={`
                        w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-all duration-150
                        ${isActive 
                          ? 'text-white drop-shadow-sm' 
                          : 'text-white/90'
                        }
                      `} 
                    />
                  </motion.div>
                  
                  {/* Click ripple effect */}
                  {clickedItem === item.id && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)'
                      }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  )}
                  
                  {/* Magnification Effect */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-white/10"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.15, 
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                    />
                  )}
                </motion.div>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.2,
                      ease: 'easeOut'
                    }}
                  />
                )}
                
                {/* Opening Indicator */}
                {clickedItem === item.id && (
                  <motion.div
                    className="absolute -bottom-2 flex space-x-1"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-1 bg-white/60 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: 'easeInOut'
                        }}
                      />
                    ))}
                  </motion.div>
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
