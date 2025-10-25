import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ExternalLink, 
  Github, 
  Star, 
  Calendar,
  Grid,
  List,
  Eye,
  X
} from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  category: string
  date: string
  status: 'completed' | 'in-progress' | 'planned'
}

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'featured', label: 'Featured' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'open-source', label: 'Open Source' }
  ]

  const projects: Project[] = [
    {
      id: '1',
      title: 'macOS Portfolio Website',
      description: 'A pixel-perfect macOS-themed portfolio built with React, Three.js, and Tailwind CSS.',
      longDescription: 'This project showcases advanced React development skills with a focus on creating a native macOS experience in the browser. Features include 3D graphics, smooth animations, and responsive design.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: 'https://portfolio.vercel.app',
      githubUrl: 'https://github.com/username/portfolio',
      featured: true,
      category: 'web',
      date: '2024-01',
      status: 'completed'
    },
    {
      id: '2',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory management.',
      longDescription: 'A comprehensive e-commerce platform built with modern technologies, featuring real-time updates, payment processing, and admin dashboard.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
      liveUrl: 'https://ecommerce.example.com',
      githubUrl: 'https://github.com/username/ecommerce',
      featured: true,
      category: 'web',
      date: '2023-11',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Task Management App',
      description: 'Collaborative task management with real-time synchronization.',
      longDescription: 'A modern task management application with real-time collaboration features, drag-and-drop interface, and team management capabilities.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Socket.io', 'MongoDB', 'Express', 'JWT'],
      liveUrl: 'https://tasks.example.com',
      githubUrl: 'https://github.com/username/taskmanager',
      featured: false,
      category: 'web',
      date: '2023-09',
      status: 'completed'
    },
    {
      id: '4',
      title: 'Weather Mobile App',
      description: 'Cross-platform weather application with location-based forecasts.',
      longDescription: 'A beautiful weather application built with React Native, featuring location-based weather data, forecasts, and interactive maps.',
      image: '/api/placeholder/600/400',
      technologies: ['React Native', 'TypeScript', 'Expo', 'Weather API'],
      githubUrl: 'https://github.com/username/weather-app',
      featured: false,
      category: 'mobile',
      date: '2023-07',
      status: 'completed'
    }
  ]

  const filteredProjects = projects.filter(project => {
    if (selectedCategory === 'all') return true
    if (selectedCategory === 'featured') return project.featured
    return project.category === selectedCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'in-progress': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'planned': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-macos-gray-900 dark:text-macos-gray-100 mb-2">
            Projects & Portfolio
          </h2>
          <p className="text-macos-gray-600 dark:text-macos-gray-400">
            A collection of my recent work and side projects
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <div className="flex bg-macos-gray-100 dark:bg-macos-gray-800 rounded-lg p-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-macos-gray-700 text-macos-blue'
                  : 'text-macos-gray-600 dark:text-macos-gray-400'
              }`}
            >
              <Grid className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-macos-gray-700 text-macos-blue'
                  : 'text-macos-gray-600 dark:text-macos-gray-400'
              }`}
            >
              <List className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${selectedCategory === category.id
                ? 'bg-macos-blue text-white shadow-md'
                : 'bg-macos-gray-100 dark:bg-macos-gray-800 text-macos-gray-700 dark:text-macos-gray-300 hover:bg-macos-gray-200 dark:hover:bg-macos-gray-700'
              }
            `}
          >
            {category.label}
          </motion.button>
        ))}
      </div>

      {/* Projects Grid/List */}
      <div className={
        viewMode === 'grid'
          ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      }>
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              macos-card group cursor-pointer overflow-hidden
              ${viewMode === 'list' ? 'flex' : ''}
            `}
            onClick={() => setSelectedProject(project)}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            {/* Project Image */}
            <div className={`
              relative overflow-hidden
              ${viewMode === 'grid' ? 'aspect-video' : 'w-48 h-32 flex-shrink-0'}
            `}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {project.featured && (
                <div className="absolute top-2 left-2">
                  <span className="bg-macos-blue text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Featured</span>
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="bg-white/90 dark:bg-macos-gray-800/90 rounded-full p-3"
                >
                  <Eye className="w-5 h-5 text-macos-gray-900 dark:text-macos-gray-100" />
                </motion.div>
              </div>
            </div>

            {/* Project Info */}
            <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-macos-gray-900 dark:text-macos-gray-100 group-hover:text-macos-blue transition-colors">
                  {project.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              <p className="text-macos-gray-600 dark:text-macos-gray-400 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-macos-gray-100 dark:bg-macos-gray-700 text-macos-gray-700 dark:text-macos-gray-300 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-macos-gray-100 dark:bg-macos-gray-700 text-macos-gray-700 dark:text-macos-gray-300 rounded text-xs">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-macos-gray-500 dark:text-macos-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{project.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {project.githubUrl && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-macos-gray-100 dark:hover:bg-macos-gray-700 rounded-lg transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-macos-gray-100 dark:hover:bg-macos-gray-700 rounded-lg transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="macos-window max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-macos-gray-900 dark:text-macos-gray-100 mb-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-macos-gray-600 dark:text-macos-gray-400">
                    {selectedProject.longDescription}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-macos-gray-100 dark:hover:bg-macos-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-macos-blue/10 text-macos-blue rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex space-x-4">
                    {selectedProject.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 macos-button"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View Live</span>
                      </motion.a>
                    )}
                    {selectedProject.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-macos-gray-100 dark:bg-macos-gray-800 text-macos-gray-900 dark:text-macos-gray-100 px-4 py-2 rounded-lg hover:bg-macos-gray-200 dark:hover:bg-macos-gray-700 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Projects
