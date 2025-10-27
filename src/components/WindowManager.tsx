import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minus,
  Square,
  Maximize2,
  Briefcase,
  Code,
  MessageSquare,
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  GraduationCap,
  Brain,
  Rocket,
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
          <div className="space-y-10 max-w-5xl">
            {/* Hero Section with Image */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12"
              >
                {/* Profile Image */}
                <motion.div
                  initial={{ opacity: 0, x: -50, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    transition: {
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  }}
                  className="relative group"
                >
                  <div
                    className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-3xl overflow-hidden"
                    style={{
                      background: isDarkMode
                        ? "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)"
                        : "linear-gradient(135deg, #F0F4FF 0%, #FAF5FF 100%)",
                      border: isDarkMode
                        ? "3px solid rgba(255, 255, 255, 0.1)"
                        : "3px solid rgba(59, 130, 246, 0.1)",
                      boxShadow: isDarkMode
                        ? "0 25px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)"
                        : "0 25px 50px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)",
                    }}
                  >
                    <img
                      src="/src/components/image.jpg"
                      alt="Shrey Parekh"
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      style={{
                        filter: isDarkMode
                          ? "brightness(0.9) contrast(1.1) saturate(1.1)"
                          : "brightness(1) contrast(1.05) saturate(1.05)",
                      }}
                    />

                    {/* Professional Status Indicators */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full"
                      style={{
                        background: isDarkMode
                          ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                          : "linear-gradient(135deg, #34D399 0%, #10B981 100%)",
                        boxShadow: isDarkMode
                          ? "0 2px 8px rgba(16, 185, 129, 0.3)"
                          : "0 2px 8px rgba(52, 211, 153, 0.4)",
                        border: isDarkMode
                          ? "2px solid #1C1C1E"
                          : "2px solid #FFFFFF",
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    <motion.div
                      className="absolute -bottom-2 -left-2 w-6 h-6 rounded-lg"
                      style={{
                        background: isDarkMode
                          ? "linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(99, 102, 241, 0.6) 100%)"
                          : "linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(99, 102, 241, 0.7) 100%)",
                        boxShadow: isDarkMode
                          ? "0 3px 10px rgba(59, 130, 246, 0.2)"
                          : "0 3px 10px rgba(59, 130, 246, 0.3)",
                        border: isDarkMode
                          ? "1px solid #1C1C1E"
                          : "1px solid #FFFFFF",
                        backdropFilter: "blur(10px)",
                      }}
                      animate={{
                        rotate: [0, 3, -3, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 space-y-6 text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <motion.h1
                        className="text-4xl lg:text-5xl font-bold tracking-tight"
                        style={{
                          color: isDarkMode ? "#FFFFFF" : "#1F2937",
                          fontFamily:
                            '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                          fontWeight: 700,
                          letterSpacing: "-0.03em",
                          background: isDarkMode
                            ? "linear-gradient(135deg, #FFFFFF 0%, #E5E7EB 100%)"
                            : "linear-gradient(135deg, #1F2937 0%, #374151 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.3 },
                        }}
                      >
                        Shrey Parekh
                      </motion.h1>

                      <motion.div
                        className="flex flex-wrap justify-center lg:justify-start gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <span
                          className="px-4 py-2 rounded-full text-sm font-medium"
                          style={{
                            background: isDarkMode
                              ? "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.15) 100%)"
                              : "linear-gradient(135deg, #DBEAFE 0%, #E0E7FF 100%)",
                            color: isDarkMode ? "#93C5FD" : "#1E40AF",
                            border: isDarkMode
                              ? "1px solid rgba(59, 130, 246, 0.3)"
                              : "1px solid #BFDBFE",
                          }}
                        >
                          B.Tech CS Student
                        </span>
                        <span
                          className="px-4 py-2 rounded-full text-sm font-medium"
                          style={{
                            background: isDarkMode
                              ? "linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(168, 85, 247, 0.15) 100%)"
                              : "linear-gradient(135deg, #E9D5FF 0%, #F3E8FF 100%)",
                            color: isDarkMode ? "#C4B5FD" : "#7C3AED",
                            border: isDarkMode
                              ? "1px solid rgba(147, 51, 234, 0.3)"
                              : "1px solid #C4B5FD",
                          }}
                        >
                          AI/ML Enthusiast
                        </span>
                        <span
                          className="px-4 py-2 rounded-full text-sm font-medium"
                          style={{
                            background: isDarkMode
                              ? "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.15) 100%)"
                              : "linear-gradient(135deg, #DCFCE7 0%, #D1FAE5 100%)",
                            color: isDarkMode ? "#86EFAC" : "#166534",
                            border: isDarkMode
                              ? "1px solid rgba(34, 197, 94, 0.3)"
                              : "1px solid #BBF7D0",
                          }}
                        >
                          Tech Explorer
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Bio */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="space-y-4"
                  >
                    <p
                      className="text-lg leading-relaxed"
                      style={{
                        color: isDarkMode ? "#D1D5DB" : "#4B5563",
                        fontFamily:
                          '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        lineHeight: "1.8",
                        fontWeight: 400,
                      }}
                    >
                      I'm a third-year B.Tech Computer Science student at
                      MPSTME, passionate about AI, Machine Learning, and
                      software development. I love exploring how technology can
                      be used to build smart, efficient, and reliable systems.
                    </p>
                    <p
                      className="text-lg leading-relaxed"
                      style={{
                        color: isDarkMode ? "#D1D5DB" : "#4B5563",
                        fontFamily:
                          '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        lineHeight: "1.8",
                        fontWeight: 400,
                      }}
                    >
                      As a tech enthusiast, I'm always experimenting with new
                      tools, frameworks, and ideas to keep learning and create
                      something impactful.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Interactive Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: GraduationCap,
                  title: "Education",
                  value: "3rd Year B.Tech",
                  subtitle: "Computer Science",
                  color: isDarkMode ? "#3B82F6" : "#1E40AF",
                  bgColor: isDarkMode
                    ? "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)"
                    : "linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 100%)",
                  borderColor: isDarkMode
                    ? "rgba(59, 130, 246, 0.3)"
                    : "#BFDBFE",
                },
                {
                  icon: Brain,
                  title: "Focus Area",
                  value: "AI & ML",
                  subtitle: "Smart Systems",
                  color: isDarkMode ? "#8B5CF6" : "#7C3AED",
                  bgColor: isDarkMode
                    ? "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(168, 85, 247, 0.1) 100%)"
                    : "linear-gradient(135deg, #F3E8FF 0%, #FAF5FF 100%)",
                  borderColor: isDarkMode
                    ? "rgba(139, 92, 246, 0.3)"
                    : "#C4B5FD",
                },
                {
                  icon: Rocket,
                  title: "Mindset",
                  value: "Always Learning",
                  subtitle: "Building Impact",
                  color: isDarkMode ? "#10B981" : "#059669",
                  bgColor: isDarkMode
                    ? "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%)"
                    : "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
                  borderColor: isDarkMode
                    ? "rgba(16, 185, 129, 0.3)"
                    : "#BBF7D0",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 1.2 + index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    transition: {
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  }}
                  className="relative group cursor-pointer"
                >
                  <div
                    className="rounded-3xl p-8 h-full transition-all duration-500"
                    style={{
                      background: stat.bgColor,
                      border: `1px solid ${stat.borderColor}`,
                      boxShadow: isDarkMode
                        ? "0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)"
                        : "0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    <div className="text-center space-y-4">
                      <motion.div
                        className="mb-4 flex justify-center"
                        animate={{
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5,
                        }}
                      >
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${stat.color}20 0%, ${stat.color}10 100%)`,
                            border: `1px solid ${stat.color}30`,
                          }}
                        >
                          <stat.icon
                            className="w-8 h-8"
                            style={{ color: stat.color }}
                          />
                        </div>
                      </motion.div>

                      <div>
                        <h3
                          className="text-sm font-medium mb-2 uppercase tracking-wider"
                          style={{
                            color: stat.color,
                            fontFamily:
                              '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                          }}
                        >
                          {stat.title}
                        </h3>
                        <p
                          className="text-xl font-bold mb-1"
                          style={{
                            color: isDarkMode ? "#FFFFFF" : "#1F2937",
                            fontFamily:
                              '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                          }}
                        >
                          {stat.value}
                        </p>
                        <p
                          className="text-sm"
                          style={{
                            color: isDarkMode ? "#9CA3AF" : "#6B7280",
                            fontFamily:
                              '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                          }}
                        >
                          {stat.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-8 max-w-5xl">
            {/* Header */}
            <div className="space-y-2">
              <h2
                className="text-3xl font-light tracking-tight sf-pro-display"
                style={{
                  color: isDarkMode ? "#FFFFFF" : "#1F2937",
                  fontFamily:
                    '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                }}
              >
                Featured Projects
              </h2>
              <p
                className="text-lg sf-pro-text"
                style={{
                  color: isDarkMode ? "#A1A1AA" : "#6B7280",
                  fontFamily:
                    '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                A showcase of my recent work and technical expertise
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-8">
              <div
                className="rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                style={{
                  background: isDarkMode
                    ? "linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(147, 51, 234, 0.08) 100%)"
                    : "linear-gradient(135deg, #EFF6FF 0%, #FAF5FF 100%)",
                  border: isDarkMode
                    ? "1px solid rgba(59, 130, 246, 0.25)"
                    : "1px solid #DBEAFE",
                  boxShadow: isDarkMode
                    ? "0 8px 32px rgba(59, 130, 246, 0.1)"
                    : "0 8px 32px rgba(59, 130, 246, 0.08)",
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-3">
                    <h3
                      className="text-2xl font-semibold sf-pro-display group-hover:text-blue-500 transition-colors"
                      style={{
                        color: isDarkMode ? "#FFFFFF" : "#1F2937",
                        fontFamily:
                          '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      AI-Powered Portfolio Platform
                    </h3>
                    <p
                      className="text-lg leading-relaxed sf-pro-text"
                      style={{
                        color: isDarkMode ? "#D4D4D8" : "#6B7280",
                        fontFamily:
                          '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        lineHeight: "1.6",
                      }}
                    >
                      Interactive portfolio with macOS-inspired design,
                      featuring AI-driven animations, real-time window
                      management, and responsive 3D elements built with React
                      and TypeScript.
                    </p>
                  </div>
                  <ExternalLink
                    className="w-6 h-6 group-hover:scale-110 transition-transform"
                    style={{ color: isDarkMode ? "#9CA3AF" : "#9CA3AF" }}
                  />
                </div>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-3">
                  <span
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      background: isDarkMode
                        ? "rgba(59, 130, 246, 0.2)"
                        : "#DBEAFE",
                      color: isDarkMode ? "#93C5FD" : "#1E40AF",
                      fontFamily:
                        '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      border: isDarkMode
                        ? "1px solid rgba(59, 130, 246, 0.3)"
                        : "1px solid #BFDBFE",
                    }}
                  >
                    React
                  </span>
                  <span
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      background: isDarkMode
                        ? "rgba(34, 197, 94, 0.2)"
                        : "#DCFCE7",
                      color: isDarkMode ? "#86EFAC" : "#166534",
                      fontFamily:
                        '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      border: isDarkMode
                        ? "1px solid rgba(34, 197, 94, 0.3)"
                        : "1px solid #BBF7D0",
                    }}
                  >
                    TypeScript
                  </span>
                  <span
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      background: isDarkMode
                        ? "rgba(147, 51, 234, 0.2)"
                        : "#F3E8FF",
                      color: isDarkMode ? "#C4B5FD" : "#7C3AED",
                      fontFamily:
                        '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      border: isDarkMode
                        ? "1px solid rgba(147, 51, 234, 0.3)"
                        : "1px solid #C4B5FD",
                    }}
                  >
                    Framer Motion
                  </span>
                  <span
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      background: isDarkMode
                        ? "rgba(251, 191, 36, 0.2)"
                        : "#FEF3C7",
                      color: isDarkMode ? "#FCD34D" : "#92400E",
                      fontFamily:
                        '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      border: isDarkMode
                        ? "1px solid rgba(251, 191, 36, 0.3)"
                        : "1px solid #FCD34D",
                    }}
                  >
                    Three.js
                  </span>
                </div>
              </div>

              <div
                className="rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                style={{
                  background: isDarkMode
                    ? "linear-gradient(135deg, rgba(34, 197, 94, 0.12) 0%, rgba(20, 184, 166, 0.08) 100%)"
                    : "linear-gradient(135deg, #F0FDF4 0%, #F0FDFA 100%)",
                  border: isDarkMode
                    ? "1px solid rgba(34, 197, 94, 0.25)"
                    : "1px solid #DCFCE7",
                  boxShadow: isDarkMode
                    ? "0 8px 32px rgba(34, 197, 94, 0.1)"
                    : "0 8px 32px rgba(34, 197, 94, 0.08)",
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-3">
                    <h3
                      className="text-2xl font-semibold sf-pro-display group-hover:text-green-500 transition-colors"
                      style={{
                        color: isDarkMode ? "#FFFFFF" : "#1F2937",
                        fontFamily:
                          '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Rust Systems Programming
                    </h3>
                    <p
                      className="text-lg leading-relaxed sf-pro-text"
                      style={{
                        color: isDarkMode ? "#D4D4D8" : "#6B7280",
                        fontFamily:
                          '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        lineHeight: "1.6",
                      }}
                    >
                      High-performance systems programming projects including
                      embedded systems, network protocols, and memory-safe
                      applications built with Rust and modern tooling.
                    </p>
                  </div>
                  <ExternalLink
                    className="w-6 h-6 group-hover:scale-110 transition-transform"
                    style={{ color: isDarkMode ? "#9CA3AF" : "#9CA3AF" }}
                  />
                </div>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-3">
                  <span
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      background: isDarkMode
                        ? "rgba(239, 68, 68, 0.2)"
                        : "#FEE2E2",
                      color: isDarkMode ? "#FCA5A5" : "#DC2626",
                      fontFamily:
                        '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      border: isDarkMode
                        ? "1px solid rgba(239, 68, 68, 0.3)"
                        : "1px solid #FCA5A5",
                    }}
                  >
                    Rust
                  </span>
                  <span
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      background: isDarkMode
                        ? "rgba(147, 51, 234, 0.2)"
                        : "#F3E8FF",
                      color: isDarkMode ? "#C4B5FD" : "#7C3AED",
                      fontFamily:
                        '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      border: isDarkMode
                        ? "1px solid rgba(147, 51, 234, 0.3)"
                        : "1px solid #C4B5FD",
                    }}
                  >
                    WebAssembly
                  </span>
                  <span
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      background: isDarkMode
                        ? "rgba(34, 197, 94, 0.2)"
                        : "#DCFCE7",
                      color: isDarkMode ? "#86EFAC" : "#166534",
                      fontFamily:
                        '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      border: isDarkMode
                        ? "1px solid rgba(34, 197, 94, 0.3)"
                        : "1px solid #BBF7D0",
                    }}
                  >
                    Embedded Systems
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-8 max-w-5xl">
            {/* Header Section */}
            <div className="space-y-2">
              <h2
                className="text-3xl font-light tracking-tight sf-pro-display"
                style={{
                  color: isDarkMode ? "#FFFFFF" : "#1F2937",
                  fontFamily:
                    '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                }}
              >
                Technical Expertise
              </h2>
              <p
                className="text-lg sf-pro-text"
                style={{
                  color: isDarkMode ? "#A1A1AA" : "#6B7280",
                  fontFamily:
                    '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                Core technologies and frameworks I work with daily
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid gap-8">
              {/* Programming Languages Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl p-8 transition-all duration-300 hover:scale-[1.01] group"
                style={{
                  background: isDarkMode
                    ? "linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(147, 51, 234, 0.08) 100%)"
                    : "linear-gradient(135deg, #EFF6FF 0%, #FAF5FF 100%)",
                  border: isDarkMode
                    ? "1px solid rgba(59, 130, 246, 0.25)"
                    : "1px solid #DBEAFE",
                  boxShadow: isDarkMode
                    ? "0 8px 32px rgba(59, 130, 246, 0.1)"
                    : "0 8px 32px rgba(59, 130, 246, 0.08)",
                }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: isDarkMode
                        ? "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 100%)"
                        : "linear-gradient(135deg, #DBEAFE 0%, #E9D5FF 100%)",
                    }}
                  >
                    <Code
                      className="w-6 h-6"
                      style={{ color: isDarkMode ? "#93C5FD" : "#1E40AF" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="text-2xl font-semibold sf-pro-display group-hover:text-blue-500 transition-colors"
                      style={{
                        color: isDarkMode ? "#FFFFFF" : "#1F2937",
                        fontFamily:
                          '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Programming Languages
                    </h3>
                    <p
                      className="text-base sf-pro-text"
                      style={{
                        color: isDarkMode ? "#D4D4D8" : "#6B7280",
                        fontFamily:
                          '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      }}
                    >
                      Core languages for systems and web development
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      name: "Rust",
                      color: "#CE422B",
                      description: "Systems programming",
                    },
                    {
                      name: "Python",
                      color: "#3776AB",
                      description: "AI/ML & Backend",
                    },
                    {
                      name: "JavaScript",
                      color: "#F7DF1E",
                      description: "Web development",
                    },
                    {
                      name: "Java",
                      color: "#ED8B00",
                      description: "Application development",
                    },
                    {
                      name: "C/C++",
                      color: "#00599C",
                      description: "System programming",
                    },
                    {
                      name: "HTML",
                      color: "#E34F26",
                      description: "Web markup",
                    },
                    {
                      name: "CSS",
                      color: "#1572B6",
                      description: "Web styling",
                    },
                  ].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -4,
                        transition: { duration: 0.2 },
                      }}
                      className="p-4 rounded-2xl transition-all duration-200 cursor-pointer group/skill"
                      style={{
                        background: isDarkMode
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(255, 255, 255, 0.7)",
                        border: isDarkMode
                          ? "1px solid rgba(255, 255, 255, 0.1)"
                          : "1px solid rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className="w-4 h-4 rounded-full flex-shrink-0 group-hover/skill:scale-110 transition-transform"
                          style={{ backgroundColor: skill.color }}
                        />
                        <span
                          className="font-semibold sf-pro-text"
                          style={{
                            color: isDarkMode ? "#FFFFFF" : "#1F2937",
                            fontFamily:
                              '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: "14px",
                          }}
                        >
                          {skill.name}
                        </span>
                      </div>
                      <p
                        className="text-xs sf-pro-text"
                        style={{
                          color: isDarkMode ? "#9CA3AF" : "#6B7280",
                          fontFamily:
                            '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        }}
                      >
                        {skill.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Tools & Databases Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-3xl p-8 transition-all duration-300 hover:scale-[1.01] group"
                style={{
                  background: isDarkMode
                    ? "linear-gradient(135deg, rgba(34, 197, 94, 0.12) 0%, rgba(20, 184, 166, 0.08) 100%)"
                    : "linear-gradient(135deg, #F0FDF4 0%, #F0FDFA 100%)",
                  border: isDarkMode
                    ? "1px solid rgba(34, 197, 94, 0.25)"
                    : "1px solid #DCFCE7",
                  boxShadow: isDarkMode
                    ? "0 8px 32px rgba(34, 197, 94, 0.1)"
                    : "0 8px 32px rgba(34, 197, 94, 0.08)",
                }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: isDarkMode
                        ? "linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(20, 184, 166, 0.2) 100%)"
                        : "linear-gradient(135deg, #DCFCE7 0%, #CCFBF1 100%)",
                    }}
                  >
                    <Briefcase
                      className="w-6 h-6"
                      style={{ color: isDarkMode ? "#86EFAC" : "#166534" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="text-2xl font-semibold sf-pro-display group-hover:text-green-500 transition-colors"
                      style={{
                        color: isDarkMode ? "#FFFFFF" : "#1F2937",
                        fontFamily:
                          '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Tools & Databases
                    </h3>
                    <p
                      className="text-base sf-pro-text"
                      style={{
                        color: isDarkMode ? "#D4D4D8" : "#6B7280",
                        fontFamily:
                          '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      }}
                    >
                      Development tools and database technologies
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Git",
                      color: "#F05032",
                      description: "Version control",
                    },
                    {
                      name: "MySQL",
                      color: "#4479A1",
                      description: "Relational database",
                    },
                    {
                      name: "Supabase",
                      color: "#3ECF8E",
                      description: "Backend platform",
                    },
                  ].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.1 + index * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -4,
                        transition: { duration: 0.2 },
                      }}
                      className="p-4 rounded-2xl transition-all duration-200 cursor-pointer group/skill"
                      style={{
                        background: isDarkMode
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(255, 255, 255, 0.7)",
                        border: isDarkMode
                          ? "1px solid rgba(255, 255, 255, 0.1)"
                          : "1px solid rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className="w-4 h-4 rounded-full flex-shrink-0 group-hover/skill:scale-110 transition-transform"
                          style={{ backgroundColor: skill.color }}
                        />
                        <span
                          className="font-semibold sf-pro-text"
                          style={{
                            color: isDarkMode ? "#FFFFFF" : "#1F2937",
                            fontFamily:
                              '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: "14px",
                          }}
                        >
                          {skill.name}
                        </span>
                      </div>
                      <p
                        className="text-xs sf-pro-text"
                        style={{
                          color: isDarkMode ? "#9CA3AF" : "#6B7280",
                          fontFamily:
                            '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        }}
                      >
                        {skill.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Data Analytics & AI/ML Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-3xl p-8 transition-all duration-300 hover:scale-[1.01] group"
                style={{
                  background: isDarkMode
                    ? "linear-gradient(135deg, rgba(147, 51, 234, 0.12) 0%, rgba(168, 85, 247, 0.08) 100%)"
                    : "linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 100%)",
                  border: isDarkMode
                    ? "1px solid rgba(147, 51, 234, 0.25)"
                    : "1px solid #E9D5FF",
                  boxShadow: isDarkMode
                    ? "0 8px 32px rgba(147, 51, 234, 0.1)"
                    : "0 8px 32px rgba(147, 51, 234, 0.08)",
                }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: isDarkMode
                        ? "linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, rgba(168, 85, 247, 0.2) 100%)"
                        : "linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)",
                    }}
                  >
                    <MessageSquare
                      className="w-6 h-6"
                      style={{ color: isDarkMode ? "#C4B5FD" : "#7C3AED" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="text-2xl font-semibold sf-pro-display group-hover:text-purple-500 transition-colors"
                      style={{
                        color: isDarkMode ? "#FFFFFF" : "#1F2937",
                        fontFamily:
                          '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Data Analytics & AI/ML
                    </h3>
                    <p
                      className="text-base sf-pro-text"
                      style={{
                        color: isDarkMode ? "#D4D4D8" : "#6B7280",
                        fontFamily:
                          '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      }}
                    >
                      Data analysis and machine learning expertise
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Data Analytics",
                      color: "#8B5CF6",
                      description: "Data analysis & insights",
                    },
                    {
                      name: "AI/ML",
                      color: "#A855F7",
                      description: "Machine learning & AI",
                    },
                  ].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + index * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -4,
                        transition: { duration: 0.2 },
                      }}
                      className="p-4 rounded-2xl transition-all duration-200 cursor-pointer group/skill"
                      style={{
                        background: isDarkMode
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(255, 255, 255, 0.7)",
                        border: isDarkMode
                          ? "1px solid rgba(255, 255, 255, 0.1)"
                          : "1px solid rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className="w-4 h-4 rounded-full flex-shrink-0 group-hover/skill:scale-110 transition-transform"
                          style={{ backgroundColor: skill.color }}
                        />
                        <span
                          className="font-semibold sf-pro-text"
                          style={{
                            color: isDarkMode ? "#FFFFFF" : "#1F2937",
                            fontFamily:
                              '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: "14px",
                          }}
                        >
                          {skill.name}
                        </span>
                      </div>
                      <p
                        className="text-xs sf-pro-text"
                        style={{
                          color: isDarkMode ? "#9CA3AF" : "#6B7280",
                          fontFamily:
                            '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        }}
                      >
                        {skill.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Currently Learning Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-3xl p-6 transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background: isDarkMode
                    ? "linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(245, 158, 11, 0.05) 100%)"
                    : "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
                  border: isDarkMode
                    ? "1px dashed rgba(251, 191, 36, 0.3)"
                    : "1px dashed #FCD34D",
                  boxShadow: isDarkMode
                    ? "0 4px 20px rgba(251, 191, 36, 0.05)"
                    : "0 4px 20px rgba(251, 191, 36, 0.08)",
                }}
              >
                <h3
                  className="text-lg font-semibold mb-4 sf-pro-text flex items-center"
                  style={{
                    color: isDarkMode ? "#FCD34D" : "#92400E",
                    fontFamily:
                      '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 600,
                  }}
                >
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 animate-pulse" />
                  Currently Exploring
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      name: "WebAssembly",
                      color: "#654FF0",
                      description: "High-performance web apps",
                    },
                    {
                      name: "Kubernetes",
                      color: "#326CE5",
                      description: "Container orchestration",
                    },
                    {
                      name: "GraphQL",
                      color: "#E10098",
                      description: "Query language for APIs",
                    },
                  ].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + index * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      className="p-4 rounded-xl transition-all duration-200 cursor-pointer"
                      style={{
                        background: isDarkMode
                          ? "rgba(255, 255, 255, 0.03)"
                          : "rgba(255, 255, 255, 0.5)",
                        border: isDarkMode
                          ? "1px dashed rgba(255, 255, 255, 0.1)"
                          : "1px dashed rgba(146, 64, 14, 0.2)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0 animate-pulse"
                          style={{ backgroundColor: skill.color }}
                        />
                        <span
                          className="font-medium sf-pro-text"
                          style={{
                            color: isDarkMode ? "#FCD34D" : "#92400E",
                            fontFamily:
                              '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: "14px",
                          }}
                        >
                          {skill.name}
                        </span>
                      </div>
                      <p
                        className="text-xs sf-pro-text"
                        style={{
                          color: isDarkMode ? "#A3A3A3" : "#78716C",
                          fontFamily:
                            '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        }}
                      >
                        {skill.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl">
            {/* Header Section */}
            <div className="space-y-2">
              <h2
                className="text-3xl font-light tracking-tight sf-pro-display"
                style={{
                  color: isDarkMode ? "#FFFFFF" : "#1F2937",
                  fontFamily:
                    '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                }}
              >
                Let's Connect
              </h2>
              <p
                className="text-lg sf-pro-text"
                style={{
                  color: isDarkMode ? "#A1A1AA" : "#6B7280",
                  fontFamily:
                    '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                Ready to collaborate on your next project
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid gap-4 sm:gap-6">
              {/* Email Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
                className="rounded-3xl p-6 cursor-pointer group relative overflow-hidden"
                style={{
                  background: isDarkMode
                    ? "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.12) 50%, rgba(168, 85, 247, 0.08) 100%)"
                    : "linear-gradient(135deg, #F0F4FF 0%, #E0E7FF 50%, #F3E8FF 100%)",
                  border: isDarkMode
                    ? "1px solid rgba(99, 102, 241, 0.3)"
                    : "1px solid rgba(99, 102, 241, 0.2)",
                  boxShadow: isDarkMode
                    ? "0 10px 40px rgba(99, 102, 241, 0.15), 0 4px 16px rgba(139, 92, 246, 0.1)"
                    : "0 10px 40px rgba(99, 102, 241, 0.12), 0 4px 16px rgba(139, 92, 246, 0.08)",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
                onClick={() =>
                  window.open("mailto:shreyparekh3@gmail.com", "_blank")
                }
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
                  style={{
                    background: isDarkMode
                      ? "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(168, 85, 247, 0.1) 100%)"
                      : "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.06) 50%, rgba(168, 85, 247, 0.04) 100%)",
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                />

                <div className="flex items-center space-x-4 relative z-10">
                  <motion.div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: isDarkMode
                        ? "linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.3) 100%)"
                        : "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.12) 100%)",
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotate: 5,
                      transition: {
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    }}
                  >
                    <Mail
                      className="w-6 h-6"
                      style={{ color: isDarkMode ? "#A5B4FC" : "#4338CA" }}
                    />
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3
                      className="text-xl font-semibold sf-pro-display"
                      style={{
                        color: isDarkMode ? "#FFFFFF" : "#1F2937",
                        fontFamily:
                          '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                      }}
                      whileHover={{
                        color: isDarkMode ? "#A5B4FC" : "#4338CA",
                        transition: { duration: 0.3 },
                      }}
                    >
                      Email
                    </motion.h3>
                    <p
                      className="text-base sf-pro-text"
                      style={{
                        color: isDarkMode ? "#D1D5DB" : "#6B7280",
                        fontFamily:
                          '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      }}
                    >
                      shreyparekh3@gmail.com
                    </p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    whileHover={{
                      opacity: 1,
                      scale: 1.1,
                      x: 0,
                      transition: {
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    }}
                  >
                    <ExternalLink
                      className="w-5 h-5"
                      style={{ color: isDarkMode ? "#A5B4FC" : "#4338CA" }}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Social Links Section */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {/* LinkedIn Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    transition: {
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  }}
                  className="rounded-3xl p-6 cursor-pointer group relative overflow-hidden"
                  style={{
                    background: isDarkMode
                      ? "linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 165, 233, 0.12) 50%, rgba(59, 130, 246, 0.08) 100%)"
                      : "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 50%, #F0F4FF 100%)",
                    border: isDarkMode
                      ? "1px solid rgba(6, 182, 212, 0.3)"
                      : "1px solid rgba(6, 182, 212, 0.2)",
                    boxShadow: isDarkMode
                      ? "0 10px 40px rgba(6, 182, 212, 0.15), 0 4px 16px rgba(14, 165, 233, 0.1)"
                      : "0 10px 40px rgba(6, 182, 212, 0.12), 0 4px 16px rgba(14, 165, 233, 0.08)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/shrey-parekh-599a44276/",
                      "_blank"
                    )
                  }
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: isDarkMode
                        ? "linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(14, 165, 233, 0.15) 50%, rgba(59, 130, 246, 0.1) 100%)"
                        : "linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(14, 165, 233, 0.06) 50%, rgba(59, 130, 246, 0.04) 100%)",
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />

                  <div className="flex items-center space-x-4 relative z-10">
                    <motion.div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        background: isDarkMode
                          ? "linear-gradient(135deg, rgba(6, 182, 212, 0.4) 0%, rgba(14, 165, 233, 0.3) 100%)"
                          : "linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 165, 233, 0.12) 100%)",
                      }}
                      whileHover={{
                        scale: 1.15,
                        rotate: -5,
                        transition: {
                          duration: 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        },
                      }}
                    >
                      <Linkedin
                        className="w-6 h-6"
                        style={{ color: isDarkMode ? "#67E8F9" : "#0369A1" }}
                      />
                    </motion.div>
                    <div className="flex-1">
                      <motion.h3
                        className="text-lg font-semibold sf-pro-display"
                        style={{
                          color: isDarkMode ? "#FFFFFF" : "#1F2937",
                          fontFamily:
                            '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                        }}
                        whileHover={{
                          color: isDarkMode ? "#67E8F9" : "#0369A1",
                          transition: { duration: 0.3 },
                        }}
                      >
                        LinkedIn
                      </motion.h3>
                      <p
                        className="text-sm sf-pro-text"
                        style={{
                          color: isDarkMode ? "#D1D5DB" : "#6B7280",
                          fontFamily:
                            '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        }}
                      >
                        Professional network
                      </p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: -10 }}
                      whileHover={{
                        opacity: 1,
                        scale: 1.1,
                        x: 0,
                        transition: {
                          duration: 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        },
                      }}
                    >
                      <ExternalLink
                        className="w-5 h-5"
                        style={{ color: isDarkMode ? "#67E8F9" : "#0369A1" }}
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* GitHub Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.25,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    transition: {
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  }}
                  className="rounded-3xl p-6 cursor-pointer group relative overflow-hidden"
                  style={{
                    background: isDarkMode
                      ? "linear-gradient(135deg, rgba(71, 85, 105, 0.15) 0%, rgba(100, 116, 139, 0.12) 50%, rgba(148, 163, 184, 0.08) 100%)"
                      : "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 50%, #E2E8F0 100%)",
                    border: isDarkMode
                      ? "1px solid rgba(71, 85, 105, 0.3)"
                      : "1px solid rgba(71, 85, 105, 0.2)",
                    boxShadow: isDarkMode
                      ? "0 10px 40px rgba(71, 85, 105, 0.15), 0 4px 16px rgba(100, 116, 139, 0.1)"
                      : "0 10px 40px rgba(71, 85, 105, 0.12), 0 4px 16px rgba(100, 116, 139, 0.08)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                  onClick={() =>
                    window.open("https://github.com/Shrey-Parekh", "_blank")
                  }
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: isDarkMode
                        ? "linear-gradient(135deg, rgba(71, 85, 105, 0.2) 0%, rgba(100, 116, 139, 0.15) 50%, rgba(148, 163, 184, 0.1) 100%)"
                        : "linear-gradient(135deg, rgba(71, 85, 105, 0.08) 0%, rgba(100, 116, 139, 0.06) 50%, rgba(148, 163, 184, 0.04) 100%)",
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />

                  <div className="flex items-center space-x-4 relative z-10">
                    <motion.div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        background: isDarkMode
                          ? "linear-gradient(135deg, rgba(71, 85, 105, 0.4) 0%, rgba(100, 116, 139, 0.3) 100%)"
                          : "linear-gradient(135deg, rgba(71, 85, 105, 0.15) 0%, rgba(100, 116, 139, 0.12) 100%)",
                      }}
                      whileHover={{
                        scale: 1.15,
                        rotate: 5,
                        transition: {
                          duration: 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        },
                      }}
                    >
                      <Github
                        className="w-6 h-6"
                        style={{ color: isDarkMode ? "#CBD5E1" : "#334155" }}
                      />
                    </motion.div>
                    <div className="flex-1">
                      <motion.h3
                        className="text-lg font-semibold sf-pro-display"
                        style={{
                          color: isDarkMode ? "#FFFFFF" : "#1F2937",
                          fontFamily:
                            '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                        }}
                        whileHover={{
                          color: isDarkMode ? "#CBD5E1" : "#334155",
                          transition: { duration: 0.3 },
                        }}
                      >
                        GitHub
                      </motion.h3>
                      <p
                        className="text-sm sf-pro-text"
                        style={{
                          color: isDarkMode ? "#D1D5DB" : "#6B7280",
                          fontFamily:
                            '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        }}
                      >
                        Code repositories
                      </p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: -10 }}
                      whileHover={{
                        opacity: 1,
                        scale: 1.1,
                        x: 0,
                        transition: {
                          duration: 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        },
                      }}
                    >
                      <ExternalLink
                        className="w-5 h-5"
                        style={{ color: isDarkMode ? "#CBD5E1" : "#334155" }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
                className="rounded-3xl p-8 text-center relative overflow-hidden"
                style={{
                  background: isDarkMode
                    ? "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.08) 50%, rgba(4, 120, 87, 0.05) 100%)"
                    : "linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 50%, #D1FAE5 100%)",
                  border: isDarkMode
                    ? "1px solid rgba(16, 185, 129, 0.3)"
                    : "1px solid rgba(16, 185, 129, 0.2)",
                  boxShadow: isDarkMode
                    ? "0 8px 32px rgba(16, 185, 129, 0.1), 0 4px 16px rgba(5, 150, 105, 0.08)"
                    : "0 8px 32px rgba(16, 185, 129, 0.08), 0 4px 16px rgba(5, 150, 105, 0.06)",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                {/* Animated background pulse */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-30"
                  style={{
                    background: isDarkMode
                      ? "radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%)"
                      : "radial-gradient(circle at center, rgba(16, 185, 129, 0.05) 0%, transparent 70%)",
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <motion.div
                      className="w-3 h-3 rounded-full mr-3"
                      style={{
                        backgroundColor: isDarkMode ? "#34D399" : "#059669",
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <h3
                      className="text-xl font-semibold sf-pro-display"
                      style={{
                        color: isDarkMode ? "#34D399" : "#059669",
                        fontFamily:
                          '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 600,
                      }}
                    >
                      Available for Work
                    </h3>
                  </div>
                  <p
                    className="text-base sf-pro-text max-w-2xl mx-auto"
                    style={{
                      color: isDarkMode ? "#D1D5DB" : "#6B7280",
                      fontFamily:
                        '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      lineHeight: "1.6",
                    }}
                  >
                    I'm currently open to new opportunities and exciting
                    projects. Whether you have a project in mind or just want to
                    chat about technology, feel free to reach out!
                  </p>
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
                    className="p-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: window.isOpening ? 0.6 : 0.1,
                      ease: [0.16, 1, 0.3, 1],
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
