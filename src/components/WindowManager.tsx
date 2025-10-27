import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minus,
  Square,
  Maximize2,
  Briefcase,
  Code,
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  GraduationCap,
  Brain,
  Rocket,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import ContactForm from "./ContactForm";

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
                        ? `linear-gradient(45deg, #3B82F6${Math.floor(
                            Math.random() * 50 + 30
                          ).toString(16)}, #8B5CF6${Math.floor(
                            Math.random() * 50 + 30
                          ).toString(16)})`
                        : `linear-gradient(45deg, #FBBF24${Math.floor(
                            Math.random() * 50 + 30
                          ).toString(16)}, #F59E0B${Math.floor(
                            Math.random() * 50 + 30
                          ).toString(16)})`,
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
                            transition: {
                              duration: 0.4,
                              ease: [0.23, 1, 0.32, 1],
                            },
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
                        border: isDarkMode
                          ? "2px solid #1C1C1E"
                          : "2px solid #FFFFFF",
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
                        border: isDarkMode
                          ? "1px solid rgba(255, 255, 255, 0.1)"
                          : "1px solid rgba(255, 255, 255, 0.8)",
                      }}
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <Code className="w-5 h-5 text-white" strokeWidth={1.5} />
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
                          fontFamily:
                            '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                          letterSpacing: "-0.04em",
                          lineHeight: "0.9",
                          color: isDarkMode ? "#FFFFFF" : "#1F2937",
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
                          fontFamily:
                            '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
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
                          bg: isDarkMode
                            ? "rgba(59, 130, 246, 0.15)"
                            : "#EFF6FF",
                        },
                        {
                          text: "AI/ML Explorer",
                          color: isDarkMode ? "#8B5CF6" : "#7C3AED",
                          bg: isDarkMode
                            ? "rgba(139, 92, 246, 0.15)"
                            : "#F3E8FF",
                        },
                        {
                          text: "Problem Solver",
                          color: isDarkMode ? "#10B981" : "#059669",
                          bg: isDarkMode
                            ? "rgba(16, 185, 129, 0.15)"
                            : "#ECFDF5",
                        },
                      ].map((tag, index) => (
                        <motion.span
                          key={index}
                          className="px-4 py-2 rounded-full text-sm font-semibold"
                          style={{
                            background: tag.bg,
                            color: tag.color,
                            border: `1px solid ${tag.color}40`,
                            fontFamily:
                              '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
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
                          fontFamily:
                            '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                          lineHeight: "1.8",
                        }}
                      >
                        Currently in my third year of B.Tech Computer Science at
                        MPSTME, I'm fascinated by the intersection of AI,
                        machine learning, and real-world problem solving.
                      </p>
                      <p
                        className="text-lg lg:text-xl leading-relaxed"
                        style={{
                          color: isDarkMode ? "#D1D5DB" : "#4B5563",
                          fontFamily:
                            '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                          lineHeight: "1.8",
                        }}
                      >
                        When I'm not coding, you'll find me experimenting with
                        new frameworks, diving deep into research papers, or
                        building something that might just change how we
                        interact with technology.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Journey Milestones - Theme Reactive */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 1.8,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2
                  className="text-3xl lg:text-4xl font-bold mb-4"
                  style={{
                    color: isDarkMode ? "#FFFFFF" : "#1F2937",
                    fontFamily:
                      '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    letterSpacing: "-0.02em",
                  }}
                >
                  My Journey So Far
                </h2>
                <p
                  className="text-lg"
                  style={{
                    color: isDarkMode ? "#9CA3AF" : "#6B7280",
                    fontFamily:
                      '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  Every milestone tells a story
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: GraduationCap,
                    title: "Academic Excellence",
                    value: "3rd Year B.Tech",
                    subtitle: "Computer Science @ MPSTME",
                    description:
                      "Building strong foundations in algorithms, data structures, and system design",
                    color: isDarkMode ? "#3B82F6" : "#1E40AF",
                    accent: isDarkMode ? "#3B82F6" : "#FBBF24",
                  },
                  {
                    icon: Brain,
                    title: "AI/ML Passion",
                    value: "6+ Projects",
                    subtitle: "From Vision to Voice AI",
                    description:
                      "Exploring computer vision, NLP, and machine learning applications",
                    color: isDarkMode ? "#8B5CF6" : "#7C3AED",
                    accent: isDarkMode ? "#8B5CF6" : "#F59E0B",
                  },
                  {
                    icon: Rocket,
                    title: "Innovation Drive",
                    value: "Always Learning",
                    subtitle: "Building Tomorrow's Solutions",
                    description:
                      "Constantly experimenting with new technologies and frameworks",
                    color: isDarkMode ? "#10B981" : "#059669",
                    accent: isDarkMode ? "#10B981" : "#EF4444",
                  },
                ].map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 2 + index * 0.2,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -10,
                      rotateX: 5,
                      transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
                    }}
                    className="relative group cursor-pointer"
                  >
                    <div
                      className="rounded-3xl p-8 h-full relative overflow-hidden"
                      style={{
                        background: isDarkMode
                          ? `linear-gradient(135deg, ${milestone.color}15 0%, ${milestone.color}05 100%)`
                          : `linear-gradient(135deg, ${milestone.accent}15 0%, ${milestone.accent}05 100%)`,
                        border: isDarkMode
                          ? `1px solid ${milestone.color}30`
                          : `1px solid ${milestone.accent}30`,
                        boxShadow: isDarkMode
                          ? `0 10px 40px ${milestone.color}10`
                          : `0 10px 40px ${milestone.accent}10`,
                      }}
                    >
                      {/* Animated Background Pattern - Theme Reactive */}
                      <motion.div
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: `radial-gradient(circle at 70% 30%, ${milestone.color}40 0%, transparent 50%)`,
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      <div className="relative z-10 text-center space-y-6">
                        {/* Icon */}
                        <motion.div
                          className="flex justify-center"
                          animate={{
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5,
                          }}
                        >
                          <div
                            className="w-20 h-20 rounded-3xl flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${milestone.color}80, ${milestone.color}60)`,
                              boxShadow: `0 8px 32px ${milestone.color}40`,
                            }}
                          >
                            <milestone.icon
                              className="w-10 h-10 text-white"
                              strokeWidth={1.5}
                            />
                          </div>
                        </motion.div>

                        {/* Content */}
                        <div className="space-y-3">
                          <h3
                            className="text-sm font-bold uppercase tracking-wider"
                            style={{
                              color: milestone.color,
                              fontFamily:
                                '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                            }}
                          >
                            {milestone.title}
                          </h3>
                          <p
                            className="text-2xl font-bold"
                            style={{
                              color: isDarkMode ? "#FFFFFF" : "#1F2937",
                              fontFamily:
                                '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                            }}
                          >
                            {milestone.value}
                          </p>
                          <p
                            className="text-base font-medium"
                            style={{
                              color: milestone.color,
                              fontFamily:
                                '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                            }}
                          >
                            {milestone.subtitle}
                          </p>
                          <p
                            className="text-sm leading-relaxed"
                            style={{
                              color: isDarkMode ? "#9CA3AF" : "#6B7280",
                              fontFamily:
                                '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                              lineHeight: "1.6",
                            }}
                          >
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-8 w-full">
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

            {/* Projects Showcase */}
            <div className="space-y-12">
              {[
                {
                  title: "Margin Detection & Personality Prediction",
                  subtitle: "Computer Vision meets Psychology",
                  description:
                    "What if handwriting could reveal personality? This project analyzes margin patterns in handwritten text to predict personality traits. Built with computer vision and machine learning.",
                  technologies: ["Python", "EasyOCR", "OpenCV", "ML"],
                  link: "https://github.com/Shrey-Parekh/Margin-Detection/",
                  accent: "#8B5CF6",
                  pattern: "psychology",
                },
                {
                  title: "Interactive Quiz Platform",
                  subtitle: "Learning made engaging",
                  description:
                    "A full-stack quiz application that makes learning fun. Features real-time scoring, user progress tracking, and an admin dashboard for quiz management.",
                  technologies: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "Node.js",
                    "MySQL",
                  ],
                  link: "https://github.com/Shrey-Parekh/Quiz-App",
                  accent: "#3B82F6",
                  pattern: "web",
                },
                {
                  title: "IET Committee Portal",
                  subtitle: "Collaboration reimagined",
                  description:
                    "A modern committee management platform used by multiple organizations. Real-time collaboration, event management, and member coordination all in one place.",
                  technologies: [
                    "React",
                    "TypeScript",
                    "Supabase",
                    "Tailwind",
                    "Vite",
                  ],
                  link: "https://iet-portal.vercel.app/",
                  accent: "#10B981",
                  pattern: "portal",
                  isLive: true,
                },
                {
                  title: "AI Voice Assistant",
                  subtitle: "Your personal AI companion",
                  description:
                    "A voice-powered assistant that understands and responds naturally. Powered by Google's Gemini Flash 2.0 for intelligent conversations and task automation.",
                  technologies: [
                    "Python",
                    "Speech Recognition",
                    "Gemini 2.0",
                    "gTTS",
                  ],
                  link: "https://github.com/Shrey-Parekh/voiceassistant",
                  accent: "#F59E0B",
                  pattern: "voice",
                },
                {
                  title: "Diet Recommendation Engine",
                  subtitle: "Personalized nutrition intelligence",
                  description:
                    "Smart nutrition recommendations tailored to individual health goals and dietary preferences. Uses machine learning to analyze patterns and suggest optimal meal plans.",
                  technologies: [
                    "Python",
                    "Streamlit",
                    "Scikit-learn",
                    "Data Science",
                  ],
                  link: "https://github.com/Shrey-Parekh/Diet_Recommendation",
                  accent: "#EF4444",
                  pattern: "health",
                },
                {
                  title: "AI Tutor System",
                  subtitle: "Intelligent learning companion",
                  description:
                    "An AI-powered tutoring platform that processes PDFs and provides contextual learning assistance. Makes complex topics accessible through personalized explanations.",
                  technologies: [
                    "Python",
                    "Ollama",
                    "Streamlit",
                    "PyPDF2",
                    "LangChain",
                  ],
                  link: "https://github.com/Shrey-Parekh/AI-TUTOR",
                  accent: "#14B8A6",
                  pattern: "education",
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -60 : 60,
                    rotateY: index % 2 === 0 ? -5 : 5,
                  }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.2,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Project Visual */}
                  <motion.div
                    className="flex-shrink-0 w-full lg:w-80 xl:w-96"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
                    }}
                  >
                    <div
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                      style={{
                        background: isDarkMode
                          ? `linear-gradient(135deg, ${project.accent}20 0%, ${project.accent}05 100%)`
                          : `linear-gradient(135deg, ${project.accent}15 0%, ${project.accent}05 100%)`,
                        border: `2px solid ${project.accent}30`,
                        boxShadow: `0 20px 40px ${project.accent}20, 0 0 0 1px ${project.accent}10`,
                      }}
                      onClick={() => window.open(project.link, "_blank")}
                    >
                      {/* Animated Pattern Background */}
                      <div className="absolute inset-0 opacity-30">
                        {project.pattern === "psychology" && (
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              backgroundImage: `radial-gradient(circle at 20% 30%, ${project.accent}40 2px, transparent 2px),
                                               radial-gradient(circle at 80% 70%, ${project.accent}30 1px, transparent 1px),
                                               radial-gradient(circle at 40% 80%, ${project.accent}20 1.5px, transparent 1.5px)`,
                              backgroundSize: "60px 60px, 40px 40px, 80px 80px",
                            }}
                            animate={{
                              backgroundPosition: ["0% 0%", "100% 100%"],
                            }}
                            transition={{
                              duration: 20,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        )}
                        {project.pattern === "web" && (
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              backgroundImage: `linear-gradient(45deg, ${project.accent}20 25%, transparent 25%),
                                               linear-gradient(-45deg, ${project.accent}20 25%, transparent 25%),
                                               linear-gradient(45deg, transparent 75%, ${project.accent}15 75%),
                                               linear-gradient(-45deg, transparent 75%, ${project.accent}15 75%)`,
                              backgroundSize: "20px 20px",
                            }}
                            animate={{
                              backgroundPosition: ["0px 0px", "20px 20px"],
                            }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        )}
                        {project.pattern === "portal" && (
                          <motion.div className="absolute inset-0 flex items-center justify-center">
                            {[...Array(6)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-16 h-16 border-2 rounded-full"
                                style={{ borderColor: `${project.accent}40` }}
                                animate={{
                                  scale: [1, 2, 1],
                                  opacity: [0.8, 0, 0.8],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  delay: i * 0.5,
                                  ease: "easeInOut",
                                }}
                              />
                            ))}
                          </motion.div>
                        )}
                        {project.pattern === "voice" && (
                          <motion.div className="absolute inset-0 flex items-center justify-center">
                            {[...Array(4)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-2 rounded-full"
                                style={{
                                  backgroundColor: project.accent,
                                  left: `${30 + i * 15}%`,
                                  height: "20%",
                                }}
                                animate={{
                                  scaleY: [0.5, 2, 0.8, 1.5, 0.5],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                  ease: "easeInOut",
                                }}
                              />
                            ))}
                          </motion.div>
                        )}
                        {project.pattern === "health" && (
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              backgroundImage: `conic-gradient(from 0deg at 50% 50%, ${project.accent}30 0deg, transparent 60deg, ${project.accent}20 120deg, transparent 180deg, ${project.accent}25 240deg, transparent 300deg)`,
                            }}
                            animate={{
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 15,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        )}
                        {project.pattern === "education" && (
                          <motion.div className="absolute inset-0">
                            {[...Array(12)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full"
                                style={{
                                  backgroundColor: project.accent,
                                  left: `${Math.random() * 100}%`,
                                  top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                  y: [-20, 20, -20],
                                  opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                  duration: 3 + Math.random() * 2,
                                  repeat: Infinity,
                                  delay: i * 0.3,
                                  ease: "easeInOut",
                                }}
                              />
                            ))}
                          </motion.div>
                        )}
                      </div>

                      {/* Project Icon/Symbol */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-20 h-20 rounded-2xl flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${project.accent}80 0%, ${project.accent}60 100%)`,
                            boxShadow: `0 8px 32px ${project.accent}40`,
                          }}
                          whileHover={{
                            scale: 1.1,
                            rotate: 5,
                            transition: { duration: 0.3 },
                          }}
                        >
                          <Code
                            className="w-10 h-10 text-white"
                            strokeWidth={1.5}
                          />
                        </motion.div>
                      </div>

                      {/* Live Badge */}
                      {project.isLive && (
                        <motion.div
                          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-2"
                          style={{
                            background: isDarkMode
                              ? "rgba(34, 197, 94, 0.9)"
                              : "#10B981",
                            color: "white",
                            backdropFilter: "blur(10px)",
                          }}
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          <span>Live</span>
                        </motion.div>
                      )}

                      {/* Hover Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center"
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileHover={{ scale: 1, opacity: 1 }}
                          className="flex items-center space-x-2 text-white font-medium"
                        >
                          <ExternalLink className="w-5 h-5" />
                          <span>View Project</span>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Project Content */}
                  <div className="flex-1 space-y-6 text-center lg:text-left">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.2 + 0.3,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                    >
                      <h3
                        className="text-3xl lg:text-4xl font-bold mb-2"
                        style={{
                          color: isDarkMode ? "#FFFFFF" : "#1F2937",
                          fontFamily:
                            '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                          letterSpacing: "-0.02em",
                          lineHeight: "1.2",
                        }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-lg font-medium mb-4"
                        style={{
                          color: project.accent,
                          fontFamily:
                            '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        }}
                      >
                        {project.subtitle}
                      </p>
                    </motion.div>

                    <motion.p
                      className="text-lg leading-relaxed"
                      style={{
                        color: isDarkMode ? "#D1D5DB" : "#6B7280",
                        fontFamily:
                          '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                        lineHeight: "1.7",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.2 + 0.5,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                    >
                      {project.description}
                    </motion.p>

                    <motion.div
                      className="flex flex-wrap gap-3 justify-center lg:justify-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.2 + 0.7,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                    >
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="px-4 py-2 rounded-full text-sm font-medium"
                          style={{
                            background: isDarkMode
                              ? `${project.accent}20`
                              : `${project.accent}15`,
                            color: project.accent,
                            border: `1px solid ${project.accent}40`,
                            fontFamily:
                              '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                          }}
                          whileHover={{
                            scale: 1.05,
                            y: -2,
                            backgroundColor: project.accent,
                            color: "white",
                            transition: { duration: 0.2 },
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.2 + 0.8 + techIndex * 0.1,
                            ease: [0.23, 1, 0.32, 1],
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="w-full space-y-16">
            {/* Hero Section */}
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-4"
              >
                <h1
                  className="text-4xl lg:text-5xl xl:text-6xl font-bold"
                  style={{
                    fontFamily:
                      '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    letterSpacing: "-0.03em",
                    lineHeight: "1.1",
                    color: isDarkMode ? "#FFFFFF" : "#1F2937",
                  }}
                >
                  My Tech Arsenal
                </h1>
                <p
                  className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
                  style={{
                    color: isDarkMode ? "#D1D5DB" : "#4B5563",
                    fontFamily:
                      '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                    lineHeight: "1.6",
                  }}
                >
                  The tools and technologies I use to bring ideas to life. From
                  systems programming to AI development.
                </p>
              </motion.div>

              {/* Floating Tech Elements */}
              <div className="relative">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: isDarkMode
                        ? `linear-gradient(45deg, #3B82F6${Math.floor(
                            Math.random() * 50 + 30
                          ).toString(16)}, #8B5CF6${Math.floor(
                            Math.random() * 50 + 30
                          ).toString(16)})`
                        : `linear-gradient(45deg, #FBBF24${Math.floor(
                            Math.random() * 50 + 30
                          ).toString(16)}, #F59E0B${Math.floor(
                            Math.random() * 50 + 30
                          ).toString(16)})`,
                      left: `${20 + Math.random() * 60}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -40, 0],
                      opacity: [0.4, 1, 0.4],
                      scale: [1, 1.5, 1],
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
            </div>

            {/* Skills Showcase */}
            <div className="space-y-12">
              {[
                {
                  category: "Languages I Speak",
                  subtitle: "The core languages that power my projects",
                  skills: [
                    "Rust",
                    "Python",
                    "JavaScript",
                    "Java",
                    "C/C++",
                    "HTML",
                    "CSS",
                  ],
                  color: isDarkMode ? "#3B82F6" : "#1E40AF",
                  accent: isDarkMode ? "#3B82F6" : "#FBBF24",
                  icon: Code,
                },
                {
                  category: "Tools I Use",
                  subtitle: "Development tools and platforms I work with",
                  skills: ["Git", "MySQL", "Supabase"],
                  color: isDarkMode ? "#10B981" : "#059669",
                  accent: isDarkMode ? "#10B981" : "#F59E0B",
                  icon: Briefcase,
                },
                {
                  category: "AI & Data",
                  subtitle: "Machine learning and data analysis expertise",
                  skills: ["Data Analytics", "AI/ML"],
                  color: isDarkMode ? "#8B5CF6" : "#7C3AED",
                  accent: isDarkMode ? "#8B5CF6" : "#EF4444",
                  icon: Brain,
                },
              ].map((section, sectionIndex) => (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, y: 60, rotateX: -10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.3 + sectionIndex * 0.2,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="relative"
                >
                  <div
                    className="rounded-3xl p-8 lg:p-12 relative overflow-hidden"
                    style={{
                      background: isDarkMode
                        ? `linear-gradient(135deg, ${section.color}15 0%, ${section.color}05 100%)`
                        : `linear-gradient(135deg, ${section.accent}15 0%, ${section.accent}05 100%)`,
                      border: isDarkMode
                        ? `2px solid ${section.color}30`
                        : `2px solid ${section.accent}30`,
                      boxShadow: isDarkMode
                        ? `0 20px 60px ${section.color}20`
                        : `0 20px 60px ${section.accent}15`,
                    }}
                  >
                    {/* Animated Background Pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: `radial-gradient(circle at 70% 30%, ${section.color}40 0%, transparent 50%)`,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-center space-x-6 mb-8">
                        <motion.div
                          className="flex-shrink-0"
                          animate={{
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: sectionIndex * 0.5,
                          }}
                        >
                          <div
                            className="w-16 h-16 lg:w-20 lg:h-20 rounded-3xl flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${section.color}80, ${section.color}60)`,
                              boxShadow: `0 10px 40px ${section.color}40`,
                            }}
                          >
                            <section.icon
                              className="w-8 h-8 lg:w-10 lg:h-10 text-white"
                              strokeWidth={1.5}
                            />
                          </div>
                        </motion.div>

                        <div className="flex-1">
                          <h3
                            className="text-2xl lg:text-3xl font-bold mb-2"
                            style={{
                              color: isDarkMode ? "#FFFFFF" : "#1F2937",
                              fontFamily:
                                '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {section.category}
                          </h3>
                          <p
                            className="text-base lg:text-lg"
                            style={{
                              color: section.color,
                              fontFamily:
                                '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                            }}
                          >
                            {section.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Skills Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {section.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                              duration: 0.6,
                              delay:
                                0.5 + sectionIndex * 0.2 + skillIndex * 0.1,
                              ease: [0.23, 1, 0.32, 1],
                            }}
                            whileHover={{
                              scale: 1.05,
                              y: -8,
                              transition: {
                                duration: 0.3,
                                ease: [0.23, 1, 0.32, 1],
                              },
                            }}
                            className="relative group cursor-pointer"
                          >
                            <div
                              className="p-6 rounded-2xl text-center relative overflow-hidden"
                              style={{
                                background: isDarkMode
                                  ? "rgba(255, 255, 255, 0.08)"
                                  : "rgba(255, 255, 255, 0.8)",
                                border: isDarkMode
                                  ? `1px solid ${section.color}40`
                                  : `1px solid ${section.accent}40`,
                                backdropFilter: "blur(20px)",
                              }}
                            >
                              {/* Hover Effect */}
                              <motion.div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                                style={{
                                  background: `linear-gradient(135deg, ${section.color}20 0%, ${section.color}10 100%)`,
                                }}
                                transition={{ duration: 0.3 }}
                              />

                              <div className="relative z-10">
                                <p
                                  className="font-semibold"
                                  style={{
                                    color: isDarkMode ? "#FFFFFF" : "#1F2937",
                                    fontFamily:
                                      '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                                    fontSize: "16px",
                                  }}
                                >
                                  {skill}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Learning Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 1.2,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="text-center"
              >
                <div
                  className="inline-block p-8 rounded-3xl"
                  style={{
                    background: isDarkMode
                      ? "linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)"
                      : "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
                    border: isDarkMode
                      ? "2px dashed rgba(251, 191, 36, 0.3)"
                      : "2px dashed #FCD34D",
                  }}
                >
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <motion.div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: isDarkMode ? "#FCD34D" : "#F59E0B",
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <h3
                      className="text-xl font-bold"
                      style={{
                        color: isDarkMode ? "#FCD34D" : "#92400E",
                        fontFamily:
                          '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                      }}
                    >
                      Always Learning
                    </h3>
                  </div>
                  <p
                    className="text-base max-w-md"
                    style={{
                      color: isDarkMode ? "#A3A3A3" : "#78716C",
                      fontFamily:
                        '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      lineHeight: "1.6",
                    }}
                  >
                    Currently exploring WebAssembly, Kubernetes, and GraphQL to
                    expand my toolkit
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="w-full space-y-16">
            {/* Hero Message */}
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-4"
              >
                <h1
                  className="text-4xl lg:text-5xl xl:text-6xl font-bold"
                  style={{
                    fontFamily:
                      '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    letterSpacing: "-0.03em",
                    lineHeight: "1.1",
                    color: isDarkMode ? "#FFFFFF" : "#1F2937",
                  }}
                >
                  Let's Build Something Amazing
                </h1>
                <p
                  className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
                  style={{
                    color: isDarkMode ? "#D1D5DB" : "#4B5563",
                    fontFamily:
                      '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                    lineHeight: "1.6",
                  }}
                >
                  Got an idea? Want to collaborate? Or just want to chat about
                  tech? I'm always excited to connect with fellow developers and
                  innovators.
                </p>
              </motion.div>

              {/* Floating Contact Elements */}
              <div className="relative">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: isDarkMode
                        ? `linear-gradient(45deg, #3B82F6${Math.floor(
                            Math.random() * 50 + 30
                          ).toString(16)}, #8B5CF6${Math.floor(
                            Math.random() * 50 + 30
                          ).toString(16)})`
                        : `linear-gradient(45deg, #FBBF24${Math.floor(
                            Math.random() * 50 + 30
                          ).toString(16)}, #F59E0B${Math.floor(
                            Math.random() * 50 + 30
                          ).toString(16)})`,
                      left: `${20 + Math.random() * 60}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.4, 1, 0.4],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Contact Methods */}
            <div className="space-y-12">
              {/* Primary Contact - Email */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="text-center"
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
                  }}
                  className="inline-block cursor-pointer group"
                  onClick={() =>
                    window.open("mailto:shreyparekh3@gmail.com", "_blank")
                  }
                >
                  <div
                    className="relative p-8 lg:p-12 rounded-3xl"
                    style={{
                      background: isDarkMode
                        ? "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)"
                        : "linear-gradient(135deg, #EFF6FF 0%, #F3E8FF 100%)",
                      border: isDarkMode
                        ? "2px solid rgba(99, 102, 241, 0.3)"
                        : "2px solid rgba(99, 102, 241, 0.2)",
                      boxShadow: isDarkMode
                        ? "0 20px 60px rgba(99, 102, 241, 0.2)"
                        : "0 20px 60px rgba(99, 102, 241, 0.15)",
                    }}
                  >
                    {/* Animated Background Pattern */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-30"
                      style={{
                        background: `radial-gradient(circle at 30% 70%, ${
                          isDarkMode ? "#6366F1" : "#FBBF24"
                        }40 0%, transparent 50%)`,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <div className="relative z-10 space-y-6">
                      {/* Email Icon */}
                      <motion.div
                        className="flex justify-center"
                        animate={{
                          y: [0, -10, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div
                          className="w-20 h-20 lg:w-24 lg:h-24 rounded-3xl flex items-center justify-center"
                          style={{
                            background: isDarkMode
                              ? "linear-gradient(135deg, #6366F1, #8B5CF6)"
                              : "linear-gradient(135deg, #FBBF24, #F59E0B)",
                            boxShadow: isDarkMode
                              ? "0 10px 40px rgba(99, 102, 241, 0.4)"
                              : "0 10px 40px rgba(251, 191, 36, 0.4)",
                          }}
                        >
                          <Mail
                            className="w-10 h-10 lg:w-12 lg:h-12 text-white"
                            strokeWidth={1.5}
                          />
                        </div>
                      </motion.div>

                      {/* Content */}
                      <div className="space-y-4">
                        <h2
                          className="text-2xl lg:text-3xl font-bold"
                          style={{
                            color: isDarkMode ? "#FFFFFF" : "#1F2937",
                            fontFamily:
                              '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                          }}
                        >
                          Drop me a line
                        </h2>
                        <p
                          className="text-lg lg:text-xl font-medium"
                          style={{
                            color: isDarkMode ? "#6366F1" : "#F59E0B",
                            fontFamily:
                              '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                          }}
                        >
                          shreyparekh3@gmail.com
                        </p>
                        <p
                          className="text-base max-w-md mx-auto"
                          style={{
                            color: isDarkMode ? "#9CA3AF" : "#6B7280",
                            fontFamily:
                              '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                            lineHeight: "1.6",
                          }}
                        >
                          Whether it's a project idea, collaboration
                          opportunity, or just a friendly hello
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Social Connections */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.6,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h3
                    className="text-2xl lg:text-3xl font-bold mb-4"
                    style={{
                      color: isDarkMode ? "#FFFFFF" : "#1F2937",
                      fontFamily:
                        '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    }}
                  >
                    Find me around the web
                  </h3>
                  <p
                    className="text-lg"
                    style={{
                      color: isDarkMode ? "#9CA3AF" : "#6B7280",
                      fontFamily:
                        '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                    }}
                  >
                    Let's connect on these platforms
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  {[
                    {
                      name: "LinkedIn",
                      description: "Professional network",
                      icon: Linkedin,
                      url: "https://www.linkedin.com/in/shrey-parekh-599a44276/",
                      color: isDarkMode ? "#0EA5E9" : "#0369A1",
                      bgGradient: isDarkMode
                        ? "linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)"
                        : "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
                    },
                    {
                      name: "GitHub",
                      description: "Code & projects",
                      icon: Github,
                      url: "https://github.com/Shrey-Parekh",
                      color: isDarkMode ? "#64748B" : "#334155",
                      bgGradient: isDarkMode
                        ? "linear-gradient(135deg, rgba(100, 116, 139, 0.15) 0%, rgba(71, 85, 105, 0.1) 100%)"
                        : "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)",
                    },
                  ].map((platform, index) => (
                    <motion.div
                      key={platform.name}
                      initial={{ opacity: 0, y: 30, rotateY: -10 }}
                      animate={{ opacity: 1, y: 0, rotateY: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.8 + index * 0.2,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -8,
                        rotateY: 5,
                        transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
                      }}
                      className="relative group cursor-pointer"
                      onClick={() => window.open(platform.url, "_blank")}
                    >
                      <div
                        className="p-8 rounded-3xl relative overflow-hidden"
                        style={{
                          background: platform.bgGradient,
                          border: `2px solid ${platform.color}30`,
                          boxShadow: isDarkMode
                            ? `0 15px 50px ${platform.color}20`
                            : `0 15px 50px ${platform.color}15`,
                        }}
                      >
                        {/* Animated Background */}
                        <motion.div
                          className="absolute inset-0 opacity-20"
                          style={{
                            background: `radial-gradient(circle at 70% 30%, ${platform.color}40 0%, transparent 50%)`,
                          }}
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 180, 270, 360],
                          }}
                          transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />

                        <div className="relative z-10 text-center space-y-4">
                          {/* Icon */}
                          <motion.div
                            className="flex justify-center"
                            animate={{
                              rotate: [0, 5, -5, 0],
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
                                background: `linear-gradient(135deg, ${platform.color}80, ${platform.color}60)`,
                                boxShadow: `0 8px 32px ${platform.color}40`,
                              }}
                            >
                              <platform.icon
                                className="w-8 h-8 text-white"
                                strokeWidth={1.5}
                              />
                            </div>
                          </motion.div>

                          {/* Content */}
                          <div className="space-y-2">
                            <h4
                              className="text-xl font-bold"
                              style={{
                                color: isDarkMode ? "#FFFFFF" : "#1F2937",
                                fontFamily:
                                  '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                              }}
                            >
                              {platform.name}
                            </h4>
                            <p
                              className="text-sm"
                              style={{
                                color: platform.color,
                                fontFamily:
                                  '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                              }}
                            >
                              {platform.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Form */}
              <ContactForm isDarkMode={isDarkMode} />

              {/* Availability Status */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 1.2,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="text-center"
              >
                <motion.div
                  className="inline-flex items-center space-x-4 px-8 py-6 rounded-3xl"
                  style={{
                    background: isDarkMode
                      ? "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%)"
                      : "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
                    border: isDarkMode
                      ? "2px solid rgba(16, 185, 129, 0.3)"
                      : "2px solid rgba(16, 185, 129, 0.2)",
                    boxShadow: isDarkMode
                      ? "0 15px 50px rgba(16, 185, 129, 0.2)"
                      : "0 15px 50px rgba(16, 185, 129, 0.15)",
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full"
                    style={{
                      background: isDarkMode
                        ? "linear-gradient(135deg, #10B981, #059669)"
                        : "linear-gradient(135deg, #34D399, #10B981)",
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(16, 185, 129, 0.4)",
                        "0 0 0 8px rgba(16, 185, 129, 0)",
                        "0 0 0 0 rgba(16, 185, 129, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="text-left">
                    <p
                      className="text-lg font-bold"
                      style={{
                        color: isDarkMode ? "#10B981" : "#059669",
                        fontFamily:
                          '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                      }}
                    >
                      Available for opportunities
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        color: isDarkMode ? "#9CA3AF" : "#6B7280",
                        fontFamily:
                          '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      }}
                    >
                      Open to internships, projects & collaborations
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="w-full space-y-16">
            {/* Hero Section */}
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-4"
              >
                <h1
                  className="text-4xl lg:text-5xl xl:text-6xl font-bold"
                  style={{
                    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    letterSpacing: "-0.03em",
                    lineHeight: "1.1",
                    color: isDarkMode ? "#FFFFFF" : "#1F2937",
                  }}
                >
                  Let's Connect
                </h1>
                <p
                  className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
                  style={{
                    color: isDarkMode ? "#D1D5DB" : "#4B5563",
                    fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                    lineHeight: "1.6",
                  }}
                >
                  Whether it's a project idea, collaboration opportunity, or just a friendly hello
                </p>
              </motion.div>

              {/* Floating Elements */}
              <div className="relative">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: isDarkMode
                        ? `linear-gradient(45deg, #3B82F6${Math.floor(Math.random() * 50 + 30).toString(16)}, #8B5CF6${Math.floor(Math.random() * 50 + 30).toString(16)})`
                        : `linear-gradient(45deg, #FBBF24${Math.floor(Math.random() * 50 + 30).toString(16)}, #F59E0B${Math.floor(Math.random() * 50 + 30).toString(16)})`,
                      left: `${20 + Math.random() * 60}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.4, 1, 0.4],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Contact Methods */}
            <div className="space-y-12">
              {/* Primary Contact - Email */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="text-center"
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
                  }}
                  className="inline-block cursor-pointer group"
                  onClick={() => window.open("mailto:shreyparekh3@gmail.com", "_blank")}
                >
                  <div
                    className="relative p-8 lg:p-12 rounded-3xl"
                    style={{
                      background: isDarkMode
                        ? "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)"
                        : "linear-gradient(135deg, #EFF6FF 0%, #F3E8FF 100%)",
                      border: isDarkMode
                        ? "2px solid rgba(99, 102, 241, 0.3)"
                        : "2px solid rgba(99, 102, 241, 0.2)",
                      boxShadow: isDarkMode
                        ? "0 20px 60px rgba(99, 102, 241, 0.2)"
                        : "0 20px 60px rgba(99, 102, 241, 0.15)",
                    }}
                  >
                    <div className="relative z-10 space-y-6">
                      <motion.div
                        className="flex justify-center"
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div
                          className="w-20 h-20 lg:w-24 lg:h-24 rounded-3xl flex items-center justify-center"
                          style={{
                            background: isDarkMode
                              ? "linear-gradient(135deg, #6366F1, #8B5CF6)"
                              : "linear-gradient(135deg, #FBBF24, #F59E0B)",
                            boxShadow: isDarkMode
                              ? "0 10px 40px rgba(99, 102, 241, 0.4)"
                              : "0 10px 40px rgba(251, 191, 36, 0.4)",
                          }}
                        >
                          <Mail className="w-10 h-10 lg:w-12 lg:h-12 text-white" strokeWidth={1.5} />
                        </div>
                      </motion.div>

                      <div className="space-y-4">
                        <h2
                          className="text-2xl lg:text-3xl font-bold"
                          style={{
                            color: isDarkMode ? "#FFFFFF" : "#1F2937",
                            fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                          }}
                        >
                          Drop me a line
                        </h2>
                        <p
                          className="text-lg lg:text-xl font-medium"
                          style={{
                            color: isDarkMode ? "#6366F1" : "#F59E0B",
                            fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                          }}
                        >
                          shreyparekh3@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Social Connections */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.6,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h3
                    className="text-2xl lg:text-3xl font-bold mb-4"
                    style={{
                      color: isDarkMode ? "#FFFFFF" : "#1F2937",
                      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    }}
                  >
                    Find me around the web
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  {[
                    {
                      name: "LinkedIn",
                      description: "Professional network",
                      icon: Linkedin,
                      url: "https://www.linkedin.com/in/shrey-parekh-599a44276/",
                      color: isDarkMode ? "#0EA5E9" : "#0369A1",
                      bgGradient: isDarkMode
                        ? "linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)"
                        : "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
                    },
                    {
                      name: "GitHub",
                      description: "Code & projects",
                      icon: Github,
                      url: "https://github.com/Shrey-Parekh",
                      color: isDarkMode ? "#64748B" : "#334155",
                      bgGradient: isDarkMode
                        ? "linear-gradient(135deg, rgba(100, 116, 139, 0.15) 0%, rgba(71, 85, 105, 0.1) 100%)"
                        : "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)",
                    },
                  ].map((platform, index) => (
                    <motion.div
                      key={platform.name}
                      initial={{ opacity: 0, y: 30, rotateY: -10 }}
                      animate={{ opacity: 1, y: 0, rotateY: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.8 + index * 0.2,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -8,
                        rotateY: 5,
                        transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
                      }}
                      className="relative group cursor-pointer"
                      onClick={() => window.open(platform.url, "_blank")}
                    >
                      <div
                        className="p-8 rounded-3xl relative overflow-hidden"
                        style={{
                          background: platform.bgGradient,
                          border: `2px solid ${platform.color}30`,
                          boxShadow: isDarkMode
                            ? `0 15px 50px ${platform.color}20`
                            : `0 15px 50px ${platform.color}15`,
                        }}
                      >
                        <div className="relative z-10 text-center space-y-4">
                          <motion.div
                            className="flex justify-center"
                            animate={{ rotate: [0, 5, -5, 0] }}
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
                                background: `linear-gradient(135deg, ${platform.color}80, ${platform.color}60)`,
                                boxShadow: `0 8px 32px ${platform.color}40`,
                              }}
                            >
                              <platform.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                            </div>
                          </motion.div>

                          <div className="space-y-2">
                            <h4
                              className="text-xl font-bold"
                              style={{
                                color: isDarkMode ? "#FFFFFF" : "#1F2937",
                                fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                              }}
                            >
                              {platform.name}
                            </h4>
                            <p
                              className="text-sm"
                              style={{
                                color: platform.color,
                                fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                              }}
                            >
                              {platform.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Form */}
              <ContactForm isDarkMode={isDarkMode} />

              {/* Availability Status */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 1.8,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="text-center"
              >
                <motion.div
                  className="inline-flex items-center space-x-4 px-8 py-6 rounded-3xl"
                  style={{
                    background: isDarkMode
                      ? "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%)"
                      : "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
                    border: isDarkMode
                      ? "2px solid rgba(16, 185, 129, 0.3)"
                      : "2px solid rgba(16, 185, 129, 0.2)",
                    boxShadow: isDarkMode
                      ? "0 15px 50px rgba(16, 185, 129, 0.2)"
                      : "0 15px 50px rgba(16, 185, 129, 0.15)",
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full"
                    style={{
                      background: isDarkMode
                        ? "linear-gradient(135deg, #10B981, #059669)"
                        : "linear-gradient(135deg, #34D399, #10B981)",
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(16, 185, 129, 0.4)",
                        "0 0 0 8px rgba(16, 185, 129, 0)",
                        "0 0 0 0 rgba(16, 185, 129, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="text-left">
                    <p
                      className="text-lg font-bold"
                      style={{
                        color: isDarkMode ? "#10B981" : "#059669",
                        fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                      }}
                    >
                      Available for opportunities
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        color: isDarkMode ? "#9CA3AF" : "#6B7280",
                        fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                      }}
                    >
                      Open to internships, projects & collaborations
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        );

      case "blog":
        return (
          <div className="w-full space-y-8">
            <div className="space-y-2">
              <h2
                className="text-3xl font-light tracking-tight"
                style={{
                  color: isDarkMode ? "#FFFFFF" : "#1F2937",
                  fontFamily:
                    '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                Blog & Articles
              </h2>
              <p
                className="text-lg"
                style={{
                  color: isDarkMode ? "#A1A1AA" : "#6B7280",
                  fontFamily:
                    '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                Thoughts on technology and development
              </p>
            </div>
            <div
              className="text-center py-16"
              style={{
                background: isDarkMode
                  ? "rgba(251, 191, 36, 0.1)"
                  : "rgba(251, 191, 36, 0.05)",
                border: "1px dashed rgba(251, 191, 36, 0.3)",
                borderRadius: "16px",
              }}
            >
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#F59E0B" }}
              >
                Coming Soon
              </h3>
              <p style={{ color: isDarkMode ? "#D1D5DB" : "#4B5563" }}>
                Blog posts and technical articles are in development
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <h3
                className="text-xl font-semibold"
                style={{ color: isDarkMode ? "#FFFFFF" : "#1F2937" }}
              >
                Welcome
              </h3>
              <p style={{ color: isDarkMode ? "#9CA3AF" : "#6B7280" }}>
                Select a section from the dock to get started
              </p>
            </div>
          </div>
        );
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
                    className={
                      window.isMaximized ? "p-8 lg:p-12 xl:p-16" : "p-6"
                    }
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
