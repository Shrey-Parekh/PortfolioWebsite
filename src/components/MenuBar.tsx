import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Wifi, Battery } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const MenuBar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 h-8"
      style={{
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 h-full max-w-screen-xl mx-auto">
        {/* Left Side - Brand */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-1 sm:space-x-2 cursor-pointer"
          >
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm" style={{ 
              background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
              boxShadow: '0 2px 8px rgba(0, 122, 255, 0.4)'
            }} />
            <span className="text-xs sm:text-sm font-medium text-white hidden sm:block" style={{
              fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 500,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
            }}>
              Portfolio
            </span>
          </motion.div>
        </div>

        {/* Center - Time Display */}
        <div className="flex-1 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-2 sm:px-4 py-1.5 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            <span className="text-xs sm:text-sm font-medium text-white" style={{
              fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 500,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
            }}>
              {formatTime(currentTime)}
            </span>
          </motion.div>
        </div>

        {/* Right Side - System Indicators */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-1 sm:p-1.5 rounded-md hover:bg-white/15 transition-all duration-200"
            aria-label="Toggle theme"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {isDarkMode ? (
              <Sun className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            ) : (
              <Moon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            )}
          </motion.button>

          {/* WiFi Indicator */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="p-1 sm:p-1.5 rounded-md hover:bg-white/15 transition-all duration-200"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Wifi className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </motion.div>

          {/* Battery Indicator */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="p-1 sm:p-1.5 rounded-md hover:bg-white/15 transition-all duration-200"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Battery className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default MenuBar
