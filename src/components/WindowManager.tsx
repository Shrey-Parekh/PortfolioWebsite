import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minus,
  Square,
  Maximize2,
  Code,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface Window {
  id: string;
  type: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  sourcePosition?: { x: number; y: number };
  isOpening?: boolean;
  isClosing?: boolean;
}

interface WindowManagerProps {
  windows: Window[];
  onCloseWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  onMaximizeWindow: (id: string) => void;
  onFocusWindow: (id: string) => void;
  onUpdateWindowPosition: (
    id: string,
    position: { x: number; y: number }
  ) => void;
}

const WindowManager: React.FC<WindowManagerProps> = ({
  windows,
  onCloseWindow,
  onMinimizeWindow,
  onMaximizeWindow,
  onFocusWindow,
  onUpdateWindowPosition,
}) => {
  const { isDarkMode } = useTheme();
  const [draggedWindow, setDraggedWindow] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const getWindowContent = (type: string) => {
    switch (type) {
      case "about":
        return (
          <div className="w-full space-y-16">
            {/* Hero Story Section */}
            <div className="relative">
              {/* Ambient Background Elements - Day/Night Reactive */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: isDarkMode 
                        ? `linear-gradient(45deg, #3B82F6${Math.floor(Math.random() * 50 + 30).toString(16)}, #8B5CF6${Math.floor(Math.random() * 50 + 30).toString(16)})`
                        : `linear-gradient(45deg, #FBBF24${Math.floor(Math.random() * 50 + 30).toString(16)}, #F59E0B${Math.floor(Math.random() * 50 + 30).toString(16)})`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
              >
                {/* Profile Visual Story */}
                <motion.div
                  initial={{ opacity: 0, x: -80, rotateY: -20 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{
                    duration: 1.4,
                    delay: 0.3,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="relative flex-shrink-0"
                >
                  {/* Main Image Container */}
                  <motion.div
                    className="relative w-64 h-64 lg:w-80 lg:h-80"
                    whileHover={{
                      scale: 1.05,
                      rotateY: 8,
                      transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
                    }}
                  >
                    {/* Professional Border - Day/Night Reactive */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: isDarkMode
                          ? "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.2) 100%)"
                          : "linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.2) 100%)",
                        padding: "3px",
                      }}
                    >
                      <div
                        className="w-full h-full rounded-full overflow-hidden"
                        style={{
                          background: isDarkMode ? "#1C1C1E" : "#FFFFFF",
                          boxShadow: isDarkMode
                            ? "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                            : "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                        }}
                      >
                        <motion.img
                          src="/src/components/image.jpg"
                          alt="Shrey Parekh"
                          className="w-full h-full object-cover"
                          style={{
                            filter: isDarkMode
                              ? "brightness(0.95) contrast(1.05) saturate(1.1)"
                              : "brightness(1.02) contrast(1.03) saturate(1.05)",
                          }}
                          whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
                          }}
                        />
                      </div>
                    </div>

                    {/* Professional Status Indicators */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        background: isDarkMode
                          ? "linear-gradient(135deg, #10B981, #059669)"
                          : "linear-gradient(135deg, #34D399, #10B981)",
                        boxShadow: isDarkMode
                          ? "0 2px 12px rgba(16, 185, 129, 0.3)"
                          : "0 2px 12px rgba(52, 211, 153, 0.4)",
                        border: isDarkMode ? "2px solid #1C1C1E" : "2px solid #FFFFFF",
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.9, 1, 0.9],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>

                    {/* Subtle Tech Badge */}
                    <motion.div
                      className="absolute -bottom-4 -left-4 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: isDarkMode
                          ? "rgba(59, 130, 246, 0.8)"
                          : "rgba(251, 191, 36, 0.8)",
                        backdropFilter: "blur(20px)",
                        border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.8)",
                      }}
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <Code 
                        className="w-5 h-5 text-white" 
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Personal Story Content */}
                <div className="flex-1 space-y-8 text-center lg:text-left">
                  {/* Name & Identity */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.6,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <motion.h1
                        className="text-5xl lg:text-6xl xl:text-7xl font-bold"
                        style={{
                          fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                          letterSpacing: "-0.04em",
                          lineHeight: "0.9",
                          background: isDarkMode
                            ? "linear-gradient(135deg, #FFFFFF 0%, #E5E7EB 50%, #9CA3AF 100%)"
                            : "linear-gradient(135deg, #1F2937 0%, #374151 50%, #6B7280 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.4 },
                        }}
                      >
                        Hey, I'm Shrey
                      </motion.h1>

                      <motion.p
                        className="text-xl lg:text-2xl font-medium"
                        style={{
                          color: isDarkMode ? "#3B82F6" : "#F59E0B",
                          fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      >
                        Building the future, one line of code at a time
                      </motion.p>
                    </div>

                    {/* Dynamic Role Tags - Theme Reactive */}
                    <motion.div
                      className="flex flex-wrap gap-3 justify-center lg:justify-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    >
                      {[
                        { 
                          text: "CS Student @ MPSTME", 
                          color: isDarkMode ? "#3B82F6" : "#1E40AF",
                          bg: isDarkMode ? "rgba(59, 130, 246, 0.15)" : "#EFF6FF"
                        },
                        { 
                          text: "AI/ML Explorer", 
                          color: isDarkMode ? "#8B5CF6" : "#7C3AED",
                          bg: isDarkMode ? "rgba(139, 92, 246, 0.15)" : "#F3E8FF"
                        },
                        { 
                          text: "Problem Solver", 
                          color: isDarkMode ? "#10B981" : "#059669",
                          bg: isDarkMode ? "rgba(16, 185, 129, 0.15)" : "#ECFDF5"
                        },
                      ].map((tag, index) => (
                        <motion.span
                          key={index}
                          className="px-4 py-2 rounded-full text-sm font-semibold"
                          style={{
                            background: tag.bg,
                            color: tag.color,
                            border: `1px solid ${tag.color}40`,
                            fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                          }}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: tag.color,
                            color: "white",
                            transition: { duration: 0.3 },
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 1.2 + index * 0.1,
                            duration: 0.5,
                            ease: [0.23, 1, 0.32, 1],
                          }}
                        >
                          {tag.text}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Personal Story */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 1,
                      delay: 1.4,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <p
                        className="text-lg lg:text-xl leading-relaxed"
                        style={{
                          color: isDarkMode ? "#D1D5DB" : "#4B5563",
                          fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                          lineHeight: "1.8",
                        }}
                      >
                        Currently in my third year of B.Tech Computer Science at MPSTME, 
                        I'm fascinated by the intersection of AI, machine learning, and 
                        real-world problem solving. 
                      </p>
                      <p
                        className="text-lg lg:text-xl leading-relaxed"
                        style={{
                          color: isDarkMode ? "#D1D5DB" : "#4B5563",
                          fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                          lineHeight: "1.8",
                        }}
                      >
                        When I'm not coding, you'll find me experimenting with new 
                        frameworks, diving deep into research papers, or building 
                        something that might just change how we interact with technology.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        );

      default:
        return <div>Window content not found</div>;
    }
  };

  const handleMouseDown = (e: React.MouseEvent, windowId: string) => {
    if ((e.target as HTMLElement).classList.contains("window-title-bar")) {
      e.preventDefault();
      setDraggedWindow(windowId);
      setIsDragging(true);
      onFocusWindow(windowId);

      const windowElement = e.currentTarget as HTMLElement;
      const rect = windowElement.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggedWindow && isDragging) {
      e.preventDefault();
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Constrain to viewport with responsive margins
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

      let minWindowWidth, minWindowHeight;
      if (isMobile) {
        minWindowWidth = 300;
        minWindowHeight = 250;
      } else if (isTablet) {
        minWindowWidth = 350;
        minWindowHeight = 280;
      } else {
        minWindowWidth = 400;
        minWindowHeight = 300;
      }

      const maxX = window.innerWidth - minWindowWidth;
      const maxY = window.innerHeight - minWindowHeight;

      const constrainedX = Math.max(isMobile ? 16 : 0, Math.min(newX, maxX));
      const constrainedY = Math.max(32, Math.min(newY, maxY)); // 32px for menu bar

      // Use requestAnimationFrame for smooth updates
      requestAnimationFrame(() => {
        onUpdateWindowPosition(draggedWindow, {
          x: constrainedX,
          y: constrainedY,
        });
      });
    }
  };

  const handleMouseUp = () => {
    setDraggedWindow(null);
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [isDragging, draggedWindow, dragOffset]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {windows.map((window) => {
          // Calculate initial position for genie effect
          const sourceX = window.sourcePosition?.x || window.position.x;
          const sourceY =
            window.sourcePosition?.y ||
            (typeof globalThis.window !== "undefined"
              ? globalThis.window.innerHeight - 100
              : 500);
          const targetX = window.isMaximized ? 0 : window.position.x;
          const targetY = window.isMaximized ? 32 : window.position.y;

          return (
            <motion.div
              key={window.id}
              initial={{
                opacity: 0,
                scale: 0.05,
                x: sourceX,
                y: sourceY,
                rotateX: -15,
                rotateY: 0,
                rotateZ: 0,
                transformOrigin: "center bottom",
                filter: "blur(8px)",
                borderRadius: "50px",
              }}
              animate={{
                opacity: window.isClosing ? 0 : window.isMinimized ? 0 : 1,
                scale: window.isClosing ? 0.3 : window.isMinimized ? 0.05 : 1,
                x: window.isClosing
                  ? sourceX
                  : window.isMinimized
                  ? sourceX
                  : targetX,
                y: window.isClosing
                  ? sourceY + 50
                  : window.isMinimized
                  ? sourceY
                  : targetY,
                width: window.isMaximized ? "100vw" : window.size.width,
                height: window.isMaximized
                  ? "calc(100vh - 32px - 80px)"
                  : window.size.height,
                rotateX: window.isClosing ? -25 : window.isMinimized ? -15 : 0,
                rotateY: window.isClosing ? 10 : window.isMinimized ? 0 : 0,
                rotateZ: window.isClosing ? -5 : window.isMinimized ? 0 : 0,
                filter: window.isClosing
                  ? "blur(12px)"
                  : window.isMinimized
                  ? "blur(8px)"
                  : "blur(0px)",
                borderRadius: window.isClosing
                  ? "25px"
                  : window.isMinimized
                  ? "50px"
                  : window.isMaximized
                  ? "0px"
                  : "12px",
              }}
              exit={{
                opacity: 0,
                scale: 0.05,
                x: sourceX,
                y: sourceY,
                rotateX: -15,
                filter: "blur(8px)",
                borderRadius: "50px",
                transition: {
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                },
              }}
              transition={{
                duration: window.isClosing
                  ? 0.4
                  : window.isOpening
                  ? 0.8
                  : window.isMinimized
                  ? 0.6
                  : 0.4,
                ease: window.isClosing
                  ? [0.4, 0, 1, 1]
                  : window.isOpening
                  ? [0.25, 0.1, 0.25, 1]
                  : [0.16, 1, 0.3, 1],
                type: "tween",
              }}
              className={`
                absolute pointer-events-auto
                ${window.isMaximized ? "rounded-none" : "rounded-2xl"}
                ${
                  isDragging && draggedWindow === window.id
                    ? "cursor-grabbing"
                    : "cursor-default"
                }
              `}
              style={{
                zIndex: window.zIndex,
                minWidth:
                  typeof globalThis.window !== "undefined" &&
                  globalThis.window.innerWidth < 640
                    ? "300px"
                    : typeof globalThis.window !== "undefined" &&
                      globalThis.window.innerWidth < 1024
                    ? "350px"
                    : "400px",
                minHeight:
                  typeof globalThis.window !== "undefined" &&
                  globalThis.window.innerWidth < 640
                    ? "250px"
                    : typeof globalThis.window !== "undefined" &&
                      globalThis.window.innerWidth < 1024
                    ? "280px"
                    : "300px",
                maxWidth:
                  typeof globalThis.window !== "undefined" &&
                  globalThis.window.innerWidth < 640
                    ? "calc(100vw - 32px)"
                    : typeof globalThis.window !== "undefined" &&
                      globalThis.window.innerWidth < 1024
                    ? "calc(100vw - 80px)"
                    : "90vw",
                maxHeight:
                  typeof globalThis.window !== "undefined" &&
                  globalThis.window.innerWidth < 640
                    ? "calc(100vh - 120px)"
                    : typeof globalThis.window !== "undefined" &&
                      globalThis.window.innerWidth < 1024
                    ? "calc(100vh - 160px)"
                    : "90vh",
                left: window.isMaximized ? "0" : "auto",
                right: window.isMaximized ? "0" : "auto",
                bottom: window.isMaximized ? "80px" : "auto",
              }}
              onMouseDown={(e) => handleMouseDown(e, window.id)}
            >
              <motion.div
                className="flex-1 flex flex-col overflow-hidden h-full w-full"
                style={{
                  background: isDarkMode ? "#1C1C1E" : "#FFFFFF",
                  borderRadius: window.isMaximized ? "0" : "12px",
                  border: isDarkMode
                    ? "1px solid #3A3A3C"
                    : "1px solid #D1D1D6",
                  boxShadow: isDarkMode
                    ? "0 20px 60px rgba(0, 0, 0, 0.8), 0 8px 32px rgba(0, 0, 0, 0.6)"
                    : "0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
                initial={{
                  borderRadius: "50px",
                  background: isDarkMode ? "#1C1C1E" : "#FFFFFF",
                  opacity: 0,
                }}
                animate={{
                  borderRadius: window.isMaximized ? "0px" : "12px",
                  background: isDarkMode ? "#1C1C1E" : "#FFFFFF",
                  opacity: 1,
                }}
                transition={{
                  duration: window.isOpening ? 0.8 : 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: window.isOpening ? 0.2 : 0,
                }}
              >
                {/* Window Title Bar */}
                <motion.div
                  className="window-title-bar flex items-center justify-between px-4 py-2.5 cursor-move select-none"
                  style={{
                    background: isDarkMode ? "#2C2C2E" : "#F2F2F7",
                    borderBottom: isDarkMode
                      ? "1px solid #3A3A3C"
                      : "1px solid #D1D1D6",
                    borderRadius: window.isMaximized ? "0" : "12px 12px 0 0",
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: window.isOpening ? 0.3 : 0,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Traffic Light Buttons */}
                  <motion.div
                    className="flex items-center space-x-1.5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: window.isOpening ? 0.4 : 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <motion.button
                      whileHover={{
                        scale: 1.08,
                        boxShadow:
                          "0 0 0 2px rgba(255, 107, 107, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)",
                      }}
                      whileTap={{
                        scale: 0.88,
                        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
                      }}
                      onClick={() => onCloseWindow(window.id)}
                      className="w-3 h-3 rounded-full transition-all duration-200 relative group"
                      style={{
                        background:
                          "linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%)",
                        boxShadow:
                          "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)",
                        border: "0.5px solid rgba(0, 0, 0, 0.15)",
                      }}
                      aria-label="Close window"
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 0, rotate: 0 }}
                        whileHover={{ opacity: 1, rotate: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <X className="w-2 h-2 text-red-900" strokeWidth={2.5} />
                      </motion.div>
                    </motion.button>
                    <motion.button
                      whileHover={{
                        scale: 1.08,
                        boxShadow:
                          "0 0 0 2px rgba(255, 217, 61, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)",
                      }}
                      whileTap={{
                        scale: 0.88,
                        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
                      }}
                      onClick={() => onMinimizeWindow(window.id)}
                      className="w-3 h-3 rounded-full transition-all duration-200 relative group"
                      style={{
                        background: window.isMinimized
                          ? "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)"
                          : "linear-gradient(135deg, #FFD93D 0%, #FFC107 100%)",
                        boxShadow:
                          "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)",
                        border: "0.5px solid rgba(0, 0, 0, 0.15)",
                      }}
                      aria-label={
                        window.isMinimized
                          ? "Restore window"
                          : "Minimize window"
                      }
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center"
                        initial={{ opacity: 0, y: 2 }}
                        animate={{ opacity: 0, y: 0 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Minus
                          className="w-2 h-2 text-yellow-900"
                          strokeWidth={2.5}
                        />
                      </motion.div>
                    </motion.button>
                    <motion.button
                      whileHover={{
                        scale: 1.08,
                        boxShadow:
                          "0 0 0 2px rgba(76, 175, 80, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)",
                      }}
                      whileTap={{
                        scale: 0.88,
                        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
                      }}
                      onClick={() => onMaximizeWindow(window.id)}
                      className="w-3 h-3 rounded-full transition-all duration-200 relative group"
                      style={{
                        background:
                          "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)",
                        boxShadow:
                          "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)",
                        border: "0.5px solid rgba(0, 0, 0, 0.15)",
                      }}
                      aria-label={
                        window.isMaximized
                          ? "Restore window"
                          : "Maximize window"
                      }
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0, scale: 1 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {window.isMaximized ? (
                          <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 0 }}
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Maximize2
                              className="w-1.5 h-1.5 text-green-900"
                              strokeWidth={2.5}
                            />
                          </motion.div>
                        ) : (
                          <Square
                            className="w-1.5 h-1.5 text-green-900"
                            strokeWidth={2.5}
                          />
                        )}
                      </motion.div>
                    </motion.button>
                  </motion.div>

                  {/* Window Title */}
                  <motion.div
                    className="flex-1 text-center"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: window.isOpening ? 0.5 : 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <h1
                      className="text-sm font-medium truncate"
                      style={{
                        fontFamily:
                          "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                        fontWeight: 500,
                        letterSpacing: "0.01em",
                        color: isDarkMode ? "#FFFFFF" : "#1F2937",
                        textShadow: isDarkMode
                          ? "none"
                          : "0 1px 0 rgba(255, 255, 255, 0.8)",
                      }}
                    >
                      {window.title}
                    </h1>
                  </motion.div>

                  {/* Spacer for symmetry */}
                  <div className="w-16" />
                </motion.div>

                {/* Window Content */}
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                  }}
                  animate={{
                    height: window.isMinimized ? 0 : "auto",
                    opacity: window.isMinimized ? 0 : 1,
                    scale: window.isMinimized ? 0.8 : 1,
                    y: window.isMinimized ? -20 : 0,
                  }}
                  transition={{
                    duration: window.isOpening ? 0.8 : 0.3,
                    ease: [0.16, 1, 0.3, 1],
                    delay: window.isOpening ? 0.4 : 0,
                    type: "tween",
                  }}
                  className="flex-1 overflow-auto"
                >
                  <motion.div
                    className={window.isMaximized ? "p-8 lg:p-12 xl:p-16" : "p-6"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: window.isOpening ? 0.6 : 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      maxWidth: window.isMaximized ? "1400px" : "none",
                      margin: window.isMaximized ? "0 auto" : "0",
                    }}
                  >
                    {getWindowContent(window.type)}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default WindowManager;