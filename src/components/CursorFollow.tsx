import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

interface Position {
  x: number
  y: number
}

export const CursorFollow: React.FC = () => {
  const { isDarkMode } = useTheme()
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [trail, setTrail] = useState<Position[]>([])

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setMousePosition(newPosition)
      setIsVisible(true)
      
      // Update trail with theme-based particles
      setTrail(prevTrail => {
        const newTrail = [newPosition, ...prevTrail.slice(0, 8)]
        return newTrail
      })
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setTrail([])
    }

    window.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  // Theme-aware colors for better contrast
  const themeColors = isDarkMode 
    ? ['#3B82F6', '#8B5CF6', '#10B981'] // Bright colors for dark mode
    : ['#1E40AF', '#7C3AED', '#059669'] // Darker colors for light mode

  return (
    <>
      {/* Enhanced Themed Cursor Trail */}
      {trail.map((position, index) => {
        const colorIndex = index % themeColors.length
        const color = themeColors[colorIndex]
        const size = 10 - index * 0.8 // Larger trail particles
        const opacity = (8 - index) / 8 * (isDarkMode ? 0.8 : 0.6)
        
        return (
          <motion.div
            key={index}
            className="fixed pointer-events-none z-40"
            style={{
              left: position.x - size / 2,
              top: position.y - size / 2,
              width: size,
              height: size,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: opacity,
              scale: 1 - index * 0.1,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut"
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: isDarkMode
                  ? `radial-gradient(circle, ${color}CC 0%, ${color}66 60%, transparent 100%)`
                  : `radial-gradient(circle, ${color}AA 0%, ${color}44 60%, transparent 100%)`,
                filter: 'blur(1px)',
                boxShadow: isDarkMode
                  ? `0 0 ${12 - index}px ${color}88`
                  : `0 0 ${8 - index}px ${color}66`,
              }}
            />
          </motion.div>
        )
      })}
      
      {/* Theme-Aware macOS Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 400,
          mass: 0.3,
        }}
      >
        {/* macOS Cursor Shape - Larger and Theme-Aware */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          style={{
            transform: 'translate(-2px, -2px)',
            filter: isDarkMode
              ? 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 12px rgba(59, 130, 246, 0.2))'
              : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 8px rgba(0, 0, 0, 0.1))',
          }}
        >
          {/* Enhanced Cursor Shadow */}
          <path
            d="M4 4L24 13.5L15.5 15.5L13.5 24L4 4Z"
            fill={isDarkMode ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)"}
            transform="translate(1, 1)"
          />
          {/* Main Cursor Body */}
          <path
            d="M3.5 3.5L23.5 13L15 15L13 23.5L3.5 3.5Z"
            fill={isDarkMode ? "#FFFFFF" : "#FFFFFF"}
            stroke={isDarkMode ? "rgba(59, 130, 246, 0.3)" : "rgba(0, 0, 0, 0.3)"}
            strokeWidth="0.8"
          />
          {/* Inner Highlight */}
          <path
            d="M5 5L21.5 12.5L14.5 14L12.5 21.5L5 5Z"
            fill={isDarkMode ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.9)"}
          />
          {/* Theme-aware Edge Accent */}
          <path
            d="M4 4L22.5 12.8L14.8 14.2L12.8 22.5L4 4Z"
            fill="none"
            stroke={isDarkMode ? "rgba(59, 130, 246, 0.4)" : "rgba(30, 64, 175, 0.2)"}
            strokeWidth="0.3"
          />
        </svg>
      </motion.div>
    </>
  )
}

export default CursorFollow