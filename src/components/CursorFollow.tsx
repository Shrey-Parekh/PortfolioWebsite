import React, { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Position {
  x: number
  y: number
  timestamp: number
}

interface TrailParticle extends Position {
  id: string
  velocity: number
}

export const CursorFollow: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [trail, setTrail] = useState<TrailParticle[]>([])
  
  // Use motion values for smoother performance
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Spring physics for smooth following
  const springX = useSpring(mouseX, { damping: 25, stiffness: 400, mass: 0.2 })
  const springY = useSpring(mouseY, { damping: 25, stiffness: 400, mass: 0.2 })

  const updateTrail = useCallback((newPosition: Position, velocity: number) => {
    const newParticle: TrailParticle = {
      ...newPosition,
      id: `${Date.now()}-${Math.random()}`,
      velocity
    }
    
    setTrail(prevTrail => {
      const updatedTrail = [newParticle, ...prevTrail.slice(0, 11)]
      return updatedTrail
    })
  }, [])

  useEffect(() => {
    let lastPosition = { x: 0, y: 0, timestamp: Date.now() }
    let animationFrame: number

    const updateMousePosition = (e: MouseEvent) => {
      const currentTime = Date.now()
      const newPosition = { 
        x: e.clientX, 
        y: e.clientY, 
        timestamp: currentTime 
      }
      
      // Calculate velocity for trail intensity
      const deltaTime = currentTime - lastPosition.timestamp
      const deltaX = newPosition.x - lastPosition.x
      const deltaY = newPosition.y - lastPosition.y
      const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / Math.max(deltaTime, 1)
      
      mouseX.set(newPosition.x)
      mouseY.set(newPosition.y)
      setIsVisible(true)
      
      // Only create trail particles if moving fast enough
      if (velocity > 0.5) {
        updateTrail(newPosition, velocity)
      }
      
      lastPosition = newPosition
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => {
      setIsHovering(false)
      setIsVisible(false)
      setTrail([])
    }

    // Detect interactive elements
    const updateHoverState = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, [role="button"], .dock-item, .window-title-bar, input, textarea, select'
      )
      
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnter)
        element.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }

    // Clean up trail particles
    const cleanupTrail = () => {
      const currentTime = Date.now()
      setTrail(prevTrail => 
        prevTrail.filter(particle => currentTime - particle.timestamp < 800)
      )
      animationFrame = requestAnimationFrame(cleanupTrail)
    }

    window.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseleave', handleMouseLeave)
    updateHoverState()
    cleanupTrail()

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [mouseX, mouseY, updateTrail])

  if (!isVisible) return null

  return (
    <>
      {/* Enhanced Cursor Trail */}
      {trail.map((particle) => {
        const age = Date.now() - particle.timestamp
        const maxAge = 800
        const progress = Math.min(age / maxAge, 1)
        const opacity = (1 - progress) * 0.8
        const scale = (1 - progress) * (0.8 + particle.velocity * 0.02)
        
        return (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none z-40"
            style={{
              left: particle.x - 4,
              top: particle.y - 4,
              width: 8,
              height: 8,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: opacity,
              scale: scale,
            }}
            transition={{
              duration: 0.1,
              ease: "easeOut"
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(0, 0, 0, ${opacity * 0.6}) 0%, rgba(0, 0, 0, ${opacity * 0.2}) 70%, transparent 100%)`,
                filter: 'blur(0.5px)',
                boxShadow: `0 0 ${4 + particle.velocity * 0.5}px rgba(0, 0, 0, ${opacity * 0.3})`,
              }}
            />
          </motion.div>
        )
      })}
      
      {/* Main macOS Black Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          x: springX,
          y: springY,
        }}
      >
        {/* Cursor Glow Effect */}
        <motion.div
          className="absolute"
          style={{
            left: -8,
            top: -8,
            width: 32,
            height: 32,
          }}
          animate={{
            scale: isHovering ? 1.3 : 1,
            opacity: isHovering ? 0.8 : 0.4,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0, 0, 0, 0.1) 0%, transparent 70%)',
              filter: 'blur(4px)',
            }}
          />
        </motion.div>

        {/* macOS Black Cursor Shape */}
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          style={{
            transform: 'translate(-1px, -1px)',
            filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 8px rgba(0, 0, 0, 0.1))',
          }}
          animate={{
            scale: isHovering ? 1.2 : 1,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
        >
          {/* Outer Shadow */}
          <path
            d="M2.5 2.5L17.5 9.5L11 10.8L9.5 17.5L2.5 2.5Z"
            fill="rgba(0, 0, 0, 0.15)"
            transform="translate(0.5, 0.5)"
          />
          
          {/* Main Black Cursor Body */}
          <path
            d="M2 2L17 9L10.5 10.3L9 17L2 2Z"
            fill="#1a1a1a"
            stroke="rgba(0, 0, 0, 0.8)"
            strokeWidth="0.3"
          />
          
          {/* Inner Highlight */}
          <path
            d="M3 3L15.5 8.5L10 9.5L8.8 15.5L3 3Z"
            fill="rgba(255, 255, 255, 0.1)"
          />
          
          {/* Edge Highlight */}
          <path
            d="M2.5 2.5L16.5 9L10.2 10.1L9 16.5L2.5 2.5Z"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="0.2"
          />
        </motion.svg>

        {/* Interactive Hover Ring */}
        {isHovering && (
          <motion.div
            className="absolute"
            style={{
              left: -6,
              top: -6,
              width: 32,
              height: 32,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeOut"
            }}
          >
            <div
              className="w-full h-full rounded-full border"
              style={{
                borderColor: 'rgba(0, 0, 0, 0.3)',
                borderWidth: '1px',
                background: 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 0%, transparent 70%)',
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </>
  )
}

export default CursorFollow