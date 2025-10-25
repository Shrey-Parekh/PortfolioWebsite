import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Download } from 'lucide-react'
import Hero3D from '../components/Hero3D'

const Home: React.FC = () => {
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  
  const texts = [
    'AI/ML Development',
    'Rust Developer',
    'Web Development ',
    'Tech Enthusiast',
    'Software Development',
    'Embedded Systems'
  ]

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[textIndex]
      
      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1))
      } else {
        setCurrentText(current.substring(0, currentText.length + 1))
      }
      
      if (!isDeleting && currentText === current) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false)
        setTextIndex((prev) => (prev + 1) % texts.length)
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, textIndex, texts])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Main Heading with macOS Big Sur Typography */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light mb-6 md:mb-8 tracking-tight"
          style={{ 
            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: 200,
            letterSpacing: '-0.03em',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}
        >
          <motion.span 
            className="block text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Shrey Parekh
          </motion.span>
          <motion.span 
            className="block font-medium"
            style={{ 
              background: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #F472B6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Portfolio
          </motion.span>
        </motion.h1>

        {/* Animated Subtitle with macOS Big Sur Style */}
        <motion.div
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 h-8 md:h-10 flex items-center justify-center"
        >
          <span className="font-light tracking-wide" style={{ 
            fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: 300,
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}>
            {currentText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="ml-1"
              style={{ 
                background: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              |
            </motion.span>
          </span>
        </motion.div>

        {/* Description with macOS Big Sur Typography */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl mb-12 md:mb-16 max-w-4xl mx-auto leading-relaxed font-light px-4"
          style={{ 
            fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: 300,
            lineHeight: '1.7',
            color: 'rgba(255, 255, 255, 0.85)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}
        >
Building intelligent and seamless digital solutions that blend clean design, smart automation, and the power of AI-driven innovation.
        </motion.p>

        {/* CTA Buttons with macOS Big Sur Styling */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="text-white font-medium px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-150 text-base sm:text-lg backdrop-blur-sm w-full sm:w-auto"
            style={{ 
              fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
              background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              fontWeight: 500,
              letterSpacing: '0.02em',
              boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
            }}
          >
            View My Work
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="flex items-center justify-center space-x-3 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-150 text-base sm:text-lg backdrop-blur-sm border border-white/30 w-full sm:w-auto"
            style={{ 
              fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              fontWeight: 500,
              letterSpacing: '0.02em',
              boxShadow: '0 10px 40px rgba(255, 255, 255, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
            }}
          >
            <Download className="w-5 h-5" />
            <span>Download Resume</span>
          </motion.button>
        </motion.div>


        {/* Minimalistic 3D Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
          
          {/* Larger floating elements */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`large-${i}`}
              className="absolute w-4 h-4 bg-white/10 rounded-full"
              style={{
                left: `${60 + i * 20}%`,
                top: `${20 + i * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + i * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Home

