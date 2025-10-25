import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Minus, Square } from 'lucide-react'

interface WindowProps {
  title: string
  children: React.ReactNode
  className?: string
  width?: string
  height?: string
}

const Window: React.FC<WindowProps> = ({ title, children, className = '', width = '80%', height = '80%' }) => {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  const handleClose = () => {
    // Navigate back to home or close window
    window.history.back()
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.window-title-bar')) {
      setIsDragging(true)
      const rect = e.currentTarget.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        x: position.x,
        y: position.y
      }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`
        fixed z-40 flex flex-col
        ${isMaximized ? 'inset-4' : ''}
        ${className}
      `}
      style={{
        width: isMaximized ? 'calc(100vw - 2rem)' : width,
        height: isMaximized ? 'calc(100vh - 2rem)' : height,
        left: isMaximized ? '1rem' : `${position.x}px`,
        top: isMaximized ? '1rem' : `${position.y}px`,
        transform: isMaximized ? 'none' : 'translate(0, 0)'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="flex-1 flex flex-col overflow-hidden shadow-2xl" style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        {/* Window Title Bar */}
        <div className="window-title-bar flex items-center justify-between px-4 py-3 border-b border-gray-200 cursor-move select-none">
          {/* Traffic Light Buttons */}
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200"
              aria-label="Close window"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMinimize}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200"
              aria-label="Minimize window"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMaximize}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-200"
              aria-label="Maximize window"
            />
          </div>

          {/* Window Title */}
          <div className="flex-1 text-center">
            <h1 className="text-sm font-medium text-gray-800 truncate">
              {title}
            </h1>
          </div>

          {/* Spacer for symmetry */}
          <div className="w-16" />
        </div>

        {/* Window Content */}
        <motion.div
          animate={{
            height: isMinimized ? 0 : 'auto',
            opacity: isMinimized ? 0 : 1
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-1 overflow-auto"
        >
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Window