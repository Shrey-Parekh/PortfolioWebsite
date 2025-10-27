import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import Hero3D from '../components/Hero3D'
import { useTheme } from '../context/ThemeContext'

const Home: React.FC = () => {
  const { isDarkMode } = useTheme()
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const textControls = useAnimation()
  const cursorRef = useRef<HTMLSpanElement>(null)
  
  const texts = [
    'AI/ML Development',
    'Rust Developer', 
    'Web Development',
    'Tech Enthusiast',
    'Software Development',
    'Embedded Systems'
  ]

  // Fixed typing effect with proper timing
  useEffect(() => {
    const current = texts[textIndex]
    
    const getTypingSpeed = () => {
      // More consistent typing speed
      if (isDeleting) {
        return 50 + Math.random() * 30 // 50-80ms for deleting
      } else {
        return 100 + Math.random() * 50 // 100-150ms for typing
      }
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(current.substring(0, currentText.length - 1))
          setIsTyping(true)
        }
      } else {
        if (currentText.length < current.length) {
          setCurrentText(current.substring(0, currentText.length + 1))
          setIsTyping(true)
        }
      }
      
      // Check if we've finished typing the current word
      if (!isDeleting && currentText === current) {
        setIsTyping(false)
        setTimeout(() => {
          setIsDeleting(true)
          // Animate text color change before deleting
          textControls.start({
            color: 'rgba(255, 255, 255, 0.6)',
            transition: { duration: 0.4 }
          })
        }, 3000) // Longer pause to read complete text
      } 
      // Check if we've finished deleting
      else if (isDeleting && currentText === '') {
        setIsDeleting(false)
        setTextIndex((prev) => (prev + 1) % texts.length)
        setIsTyping(false)
        // Reset color for new text
        textControls.start({
          color: 'rgba(255, 255, 255, 0.95)',
          transition: { duration: 0.4 }
        })
      }
    }, getTypingSpeed())

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, textIndex, texts, textControls])

  // Enhanced cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, isTyping ? 300 : 600) // Faster blink when typing

    return () => clearInterval(cursorInterval)
  }, [isTyping])

  // Enhanced animation variants with macOS-style easing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  const itemVariants = {
    hidden: { 
      y: 40, 
      opacity: 0, 
      scale: 0.92,
      filter: 'blur(8px)'
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // macOS spring curve
      }
    }
  }

  // Character animation for typing effect
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 z-5" style={{
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%)'
      }} />
      
      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Enhanced Main Heading with Authentic macOS Typography */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 md:mb-8"
          style={{ 
            fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 100,
            letterSpacing: '-0.04em',
            lineHeight: '0.9',
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale'
          }}
        >
          <motion.div 
            className="block"
            initial={{ opacity: 0, y: 50, rotateX: -15, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2
            }}
            style={{
              color: 'rgba(255, 255, 255, 0.98)',
              textShadow: '0 10px 40px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(255, 255, 255, 0.1)',
              filter: 'drop-shadow(0 8px 24px rgba(255, 255, 255, 0.15))',
              fontWeight: 100
            }}
          >
            {/* Animate each character of the name with enhanced visibility */}
            {'Shrey Parekh'.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ 
                  opacity: 0, 
                  y: 30, 
                  rotateX: -90,
                  filter: 'blur(4px)'
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  filter: 'blur(0px)'
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + index * 0.06,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
                  transition: { duration: 0.2 }
                }}
                style={{ 
                  display: 'inline-block',
                  transformOrigin: 'center bottom',
                  cursor: 'default',
                  color: 'rgba(255, 255, 255, 0.98)',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 255, 255, 0.2)'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.div 
            className="block font-medium mt-2 relative"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Simple character animation with SOLID colors */}
            {'Portfolio'.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  color: isDarkMode 
                    ? ['#60A5FA', '#A78BFA', '#F472B6', '#FB7185', '#60A5FA']
                    : ['#1E40AF', '#7C3AED', '#BE185D', '#DC2626', '#1E40AF']
                }}
                transition={{
                  opacity: { duration: 0.5, delay: 1.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 0.5, delay: 1.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] },
                  color: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2 + index * 0.2
                  }
                }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
                style={{ 
                  display: 'inline-block',
                  cursor: 'default',
                  color: isDarkMode ? '#60A5FA' : '#1E40AF',
                  fontWeight: 'inherit'
                }}
              >
                {char}
              </motion.span>
            ))}
            

          </motion.div>
        </motion.h1>

        {/* Enhanced Typing Animation with macOS Typography */}
        <motion.div
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 md:mb-12 h-10 md:h-12 lg:h-14 flex items-center justify-center"
        >
          <div className="relative">
            {/* Typing container with enhanced effects */}
            <motion.div
              animate={textControls}
              className="flex items-center"
              style={{ 
                fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
              }}
            >
              {/* Animated text with character-by-character reveal */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={textIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    color: 'rgba(255, 255, 255, 0.95)',
                    textShadow: '0 6px 20px rgba(0, 0, 0, 0.4), 0 3px 10px rgba(0, 122, 255, 0.2)',
                    filter: 'drop-shadow(0 2px 8px rgba(255, 255, 255, 0.1))'
                  }}
                >
                  {currentText.split('').map((char, index) => (
                    <motion.span
                      key={`${textIndex}-${index}`}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{
                        delay: index * 0.03
                      }}
                      style={{ 
                        display: 'inline-block',
                        minWidth: char === ' ' ? '0.3em' : 'auto'
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
              
              {/* Enhanced cursor with macOS-style animation */}
              <motion.span
                ref={cursorRef}
                className="ml-1"
                animate={{ 
                  opacity: showCursor ? 1 : 0,
                  scale: isTyping ? [1, 1.1, 1] : 1
                }}
                transition={{ 
                  opacity: { duration: 0.1 },
                  scale: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
                }}
                style={{ 
                  background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 50%, #AF52DE 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 8px rgba(0, 122, 255, 0.6))',
                  fontSize: '0.9em',
                  fontWeight: 200,
                  display: 'inline-block',
                  width: '2px',
                  height: '1em',
                  backgroundColor: '#007AFF',
                  borderRadius: '1px',
                  boxShadow: '0 0 12px rgba(0, 122, 255, 0.5)'
                }}
              />
            </motion.div>
            
            {/* Enhanced glow effect with animation */}
            <motion.div 
              className="absolute inset-0 -z-10"
              animate={{
                background: isTyping 
                  ? 'radial-gradient(ellipse at center, rgba(0, 122, 255, 0.15) 0%, rgba(88, 86, 214, 0.08) 50%, transparent 80%)'
                  : 'radial-gradient(ellipse at center, rgba(0, 122, 255, 0.08) 0%, transparent 70%)',
                scale: isTyping ? 1.1 : 1
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                filter: 'blur(25px)',
                transform: 'scale(1.8)'
              }}
            />
            
            {/* Typing indicator particles */}
            {isTyping && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      background: 'rgba(0, 122, 255, 0.6)',
                      left: `${50 + (i - 1) * 20}%`,
                      top: '50%',
                      boxShadow: '0 0 6px rgba(0, 122, 255, 0.8)'
                    }}
                    animate={{
                      y: [0, -8, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Enhanced Description with macOS Typography */}
        <motion.div
          variants={itemVariants}
          className="mb-12 md:mb-16 max-w-4xl mx-auto px-4"
        >
          <div className="relative">
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed"
              style={{ 
                fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 300,
                lineHeight: '1.6',
                letterSpacing: '-0.01em',
                color: 'rgba(255, 255, 255, 0.92)',
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textShadow: '0 6px 16px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)',
                filter: 'drop-shadow(0 2px 6px rgba(255, 255, 255, 0.05))'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 2.5, // After name animation completes
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              {/* Animate description text word by word */}
              {'Crafting intelligent, minimal, and high-performance solutions that combine modern web design, automation, and the precision of AI and Rust-based development.'.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 2.8 + index * 0.08,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  style={{ 
                    display: 'inline-block',
                    marginRight: '0.3em'
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
            
            {/* Enhanced glassmorphism background */}
            <motion.div 
              className="absolute inset-0 -z-10 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                backdropFilter: 'blur(25px)',
                WebkitBackdropFilter: 'blur(25px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 0.8, scale: 1.05 }}
              transition={{ 
                duration: 0.8, 
                delay: 2.7,
                ease: [0.16, 1, 0.3, 1] 
              }}
            />
          </div>
        </motion.div>




      </motion.div>
    </div>
  )
}

export default Home

