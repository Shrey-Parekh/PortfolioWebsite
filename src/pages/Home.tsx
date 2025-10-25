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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] // macOS-like spring
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



        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/15 rounded-full"
              style={{
                width: `${8 + Math.random() * 4}px`,
                height: `${8 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, 20, 0],
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.7, 0.2],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
          
          {/* Larger floating elements */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`large-${i}`}
              className="absolute bg-white/10 rounded-full"
              style={{
                width: `${16 + Math.random() * 8}px`,
                height: `${16 + Math.random() * 8}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, 25, 0],
                scale: [1, 1.4, 1],
                opacity: [0.1, 0.5, 0.1],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Home

