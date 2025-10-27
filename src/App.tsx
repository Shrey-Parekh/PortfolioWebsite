import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Components
import Dock from './components/Dock'
import MenuBar from './components/MenuBar'
import WindowManager from './components/WindowManager'


// Pages
import Home from './pages/Home'

// Context
import { ThemeProvider } from './context/ThemeContext'

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

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [windows, setWindows] = useState<Window[]>([])
  const [nextZIndex, setNextZIndex] = useState(1)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Keyboard shortcuts for window management
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Get the focused window (highest z-index)
      const focusedWindow = windows.reduce((prev, current) => 
        (prev.zIndex > current.zIndex) ? prev : current, windows[0]
      )

      if (!focusedWindow) return

      // Cmd/Ctrl + W: Close window
      if ((e.metaKey || e.ctrlKey) && e.key === 'w') {
        e.preventDefault()
        closeWindow(focusedWindow.id)
      }
      
      // Cmd/Ctrl + M: Minimize window
      if ((e.metaKey || e.ctrlKey) && e.key === 'm') {
        e.preventDefault()
        minimizeWindow(focusedWindow.id)
      }
      
      // Cmd/Ctrl + Shift + F: Toggle maximize
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'F') {
        e.preventDefault()
        maximizeWindow(focusedWindow.id)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [windows])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark')
  }

  const openWindow = (windowType: string, sourceElement?: HTMLElement) => {
    const windowTitles: { [key: string]: string } = {
      'about': 'About Me',
      'projects': 'Projects',
      'skills': 'Skills & Stack',
      'contact': 'Contact',
      'blog': 'Blog & Articles'
    }

    // Check if window already exists
    const existingWindow = windows.find(w => w.type === windowType)
    if (existingWindow) {
      // Focus existing window with genie effect
      setWindows(prev => prev.map(w => 
        w.id === existingWindow.id 
          ? { 
              ...w, 
              isMinimized: false, 
              zIndex: nextZIndex,
              isOpening: true,
              sourcePosition: sourceElement ? {
                x: sourceElement.getBoundingClientRect().left + sourceElement.offsetWidth / 2,
                y: sourceElement.getBoundingClientRect().top + sourceElement.offsetHeight / 2
              } : undefined
            }
          : w
      ))
      setNextZIndex(prev => prev + 1)
      
      // Reset opening state after animation
      setTimeout(() => {
        setWindows(prev => prev.map(w => 
          w.id === existingWindow.id ? { ...w, isOpening: false } : w
        ))
      }, 1000)
      return
    }

    // Get source position from dock icon
    let sourcePosition = undefined
    if (sourceElement) {
      const rect = sourceElement.getBoundingClientRect()
      sourcePosition = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      }
    }

    // Responsive window sizing
    const isMobile = window.innerWidth < 640
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024
    
    let windowWidth, windowHeight, posX, posY
    
    if (isMobile) {
      // Mobile: Use most of the screen
      windowWidth = Math.min(window.innerWidth - 32, 400)
      windowHeight = Math.min(window.innerHeight - 120, 500)
      posX = Math.max(16, (window.innerWidth - windowWidth) / 2)
      posY = Math.max(60, (window.innerHeight - windowHeight) / 2)
    } else if (isTablet) {
      // Tablet: Moderate sizing
      windowWidth = Math.min(600, window.innerWidth - 80)
      windowHeight = Math.min(500, window.innerHeight - 160)
      posX = Math.max(40, (window.innerWidth - windowWidth) / 2 + windows.length * 15)
      posY = Math.max(80, (window.innerHeight - windowHeight) / 2 + windows.length * 15)
    } else {
      // Desktop: Original sizing
      windowWidth = Math.min(800, window.innerWidth - 100)
      windowHeight = Math.min(600, window.innerHeight - 200)
      posX = Math.max(50, (window.innerWidth - windowWidth) / 2 + windows.length * 20)
      posY = Math.max(100, (window.innerHeight - windowHeight) / 2 + windows.length * 20)
    }

    // Create new window
    const newWindow: Window = {
      id: `${windowType}-${Date.now()}`,
      type: windowType,
      title: windowTitles[windowType] || windowType,
      isMinimized: false,
      isMaximized: false,
      position: { x: posX, y: posY },
      size: { width: windowWidth, height: windowHeight },
      zIndex: nextZIndex,
      sourcePosition,
      isOpening: true
    }

    setWindows(prev => [...prev, newWindow])
    setNextZIndex(prev => prev + 1)
    
    // Reset opening state after animation
    setTimeout(() => {
      setWindows(prev => prev.map(w => 
        w.id === newWindow.id ? { ...w, isOpening: false } : w
      ))
    }, 1000)
  }

  const closeWindow = (id: string) => {
    // Add closing animation state before removing
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isClosing: true } : w
    ))
    
    // Remove window after animation completes
    setTimeout(() => {
      setWindows(prev => prev.filter(w => w.id !== id))
    }, 400)
  }

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { 
        ...w, 
        isMinimized: !w.isMinimized,
        isOpening: false, // Reset opening state when minimizing
        isMaximized: w.isMinimized ? w.isMaximized : false // Reset maximize when minimizing
      } : w
    ))
  }

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { 
        ...w, 
        isMaximized: !w.isMaximized,
        isMinimized: false, // Ensure window is not minimized when maximizing
        zIndex: nextZIndex // Bring to front when maximizing
      } : w
    ))
    setNextZIndex(prev => prev + 1)
  }

  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { 
        ...w, 
        zIndex: nextZIndex,
        isMinimized: false // Restore window when focusing
      } : w
    ))
    setNextZIndex(prev => prev + 1)
  }

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, position } : w
    ))
  }

  const pageVariants = {
    initial: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
      rotateX: -10
    },
    in: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0
    },
    out: { 
      opacity: 0, 
      y: -30,
      scale: 0.95,
      rotateX: 10
    }
  }

  const pageTransition = {
    type: 'tween',
    ease: [0.16, 1, 0.3, 1], // macOS-like spring easing
    duration: 0.5
  }

  return (
    <ThemeProvider value={{ isDarkMode, toggleTheme }}>
      <div className="min-h-screen relative overflow-hidden transition-all duration-500 ease-in-out" style={{
        background: isDarkMode 
          ? 'linear-gradient(180deg, #1a1a2e 0%, #16213e 30%, #0f3460 70%, #533483 100%)'
          : 'linear-gradient(180deg, #87CEEB 0%, #FFB347 30%, #FF69B4 70%, #9370DB 100%)'
      }}>
        {/* macOS Big Sur Wallpaper Effect */}
        <div className="absolute inset-0 opacity-90 transition-all duration-500 ease-in-out" style={{
          background: isDarkMode
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #2d1b69 100%)'
            : 'linear-gradient(135deg, #87CEEB 0%, #FFB347 25%, #FF69B4 50%, #9370DB 75%, #4B0082 100%)'
        }} />
        
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-10 transition-all duration-500 ease-in-out" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
        
        <Router>
          {/* macOS Menu Bar */}
          <MenuBar />
          
          {/* Desktop Content Area */}
          <div className="relative z-10 pt-8 pb-20 min-h-screen">
            <Routes>
              <Route path="/" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="h-full"
                >
                  <Home />
                </motion.div>
              } />
            </Routes>
          </div>
          
          {/* Window Manager */}
          <WindowManager
            windows={windows}
            onCloseWindow={closeWindow}
            onMinimizeWindow={minimizeWindow}
            onMaximizeWindow={maximizeWindow}
            onFocusWindow={focusWindow}
            onUpdateWindowPosition={updateWindowPosition}
          />
          
                  {/* macOS Dock */}
                  <Dock 
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage} 
                    onOpenWindow={openWindow}
                  />
                  

                </Router>
              </div>
            </ThemeProvider>
          )
        }

export default App
