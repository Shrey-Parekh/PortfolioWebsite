import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Code, 
  Palette, 
  Database, 
  Cloud, 
  Smartphone,
  Globe,
  Zap,
  TrendingUp
} from 'lucide-react'

interface Skill {
  name: string
  level: number
  category: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Skills', icon: TrendingUp },
    { id: 'frontend', label: 'Frontend', icon: Palette },
    { id: 'backend', label: 'Backend', icon: Code },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
    { id: 'cloud', label: 'Cloud & DevOps', icon: Cloud }
  ]

  const skills: Skill[] = [
    // Frontend
    { name: 'React', level: 95, category: 'frontend', icon: Code, color: 'bg-blue-500' },
    { name: 'TypeScript', level: 90, category: 'frontend', icon: Code, color: 'bg-blue-600' },
    { name: 'Next.js', level: 85, category: 'frontend', icon: Code, color: 'bg-gray-800' },
    { name: 'Tailwind CSS', level: 95, category: 'frontend', icon: Palette, color: 'bg-cyan-500' },
    { name: 'Three.js', level: 80, category: 'frontend', icon: Globe, color: 'bg-gray-700' },
    { name: 'Framer Motion', level: 85, category: 'frontend', icon: Zap, color: 'bg-pink-500' },
    
    // Backend
    { name: 'Node.js', level: 90, category: 'backend', icon: Code, color: 'bg-green-600' },
    { name: 'Express', level: 85, category: 'backend', icon: Code, color: 'bg-gray-600' },
    { name: 'Python', level: 80, category: 'backend', icon: Code, color: 'bg-yellow-500' },
    { name: 'REST APIs', level: 95, category: 'backend', icon: Globe, color: 'bg-blue-500' },
    { name: 'GraphQL', level: 75, category: 'backend', icon: Code, color: 'bg-pink-600' },
    
    // Database
    { name: 'PostgreSQL', level: 85, category: 'database', icon: Database, color: 'bg-blue-700' },
    { name: 'MongoDB', level: 80, category: 'database', icon: Database, color: 'bg-green-600' },
    { name: 'Redis', level: 75, category: 'database', icon: Database, color: 'bg-red-600' },
    { name: 'Supabase', level: 90, category: 'database', icon: Database, color: 'bg-green-500' },
    
    // Mobile
    { name: 'React Native', level: 80, category: 'mobile', icon: Smartphone, color: 'bg-blue-500' },
    { name: 'Expo', level: 75, category: 'mobile', icon: Smartphone, color: 'bg-gray-800' },
    { name: 'Flutter', level: 70, category: 'mobile', icon: Smartphone, color: 'bg-blue-400' },
    
    // Cloud & DevOps
    { name: 'AWS', level: 80, category: 'cloud', icon: Cloud, color: 'bg-orange-500' },
    { name: 'Docker', level: 85, category: 'cloud', icon: Cloud, color: 'bg-blue-600' },
    { name: 'Vercel', level: 90, category: 'cloud', icon: Cloud, color: 'bg-black' },
    { name: 'GitHub Actions', level: 80, category: 'cloud', icon: Cloud, color: 'bg-gray-800' }
  ]

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

  const getCategoryStats = () => {
    const stats = categories.slice(1).map(category => {
      const categorySkills = skills.filter(skill => skill.category === category.id)
      const avgLevel = categorySkills.length > 0 
        ? Math.round(categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length)
        : 0
      return { ...category, avgLevel, skillCount: categorySkills.length }
    })
    return stats
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-macos-gray-900 dark:text-macos-gray-100 mb-4">
          Skills & Expertise
        </h2>
        <p className="text-lg text-macos-gray-600 dark:text-macos-gray-400 max-w-2xl mx-auto">
          A comprehensive overview of my technical skills and proficiency levels across different domains
        </p>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
        {getCategoryStats().map((category) => {
          const Icon = category.icon
          return (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              className="macos-card p-4 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-macos-blue/10 dark:bg-macos-blue/20 rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6 text-macos-blue" />
              </div>
              <h3 className="font-semibold text-macos-gray-900 dark:text-macos-gray-100 mb-1">
                {category.label}
              </h3>
              <div className="text-2xl font-bold text-macos-blue mb-1">
                {category.avgLevel}%
              </div>
              <div className="text-sm text-macos-gray-500 dark:text-macos-gray-400">
                {category.skillCount} skills
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${selectedCategory === category.id
                  ? 'bg-macos-blue text-white shadow-md'
                  : 'bg-macos-gray-100 dark:bg-macos-gray-800 text-macos-gray-700 dark:text-macos-gray-300 hover:bg-macos-gray-200 dark:hover:bg-macos-gray-700'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{category.label}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, index) => {
          const Icon = skill.icon
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="macos-card p-6 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${skill.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-macos-gray-900 dark:text-macos-gray-100">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-macos-gray-500 dark:text-macos-gray-400 capitalize">
                      {skill.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-macos-blue">
                    {skill.level}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-macos-gray-200 dark:bg-macos-gray-700 rounded-full h-2 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-2 rounded-full ${skill.color}`}
                />
              </div>

              {/* Skill Level Indicator */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-macos-gray-500 dark:text-macos-gray-400">
                  Proficiency
                </span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-2 h-2 rounded-full ${
                        level <= Math.ceil(skill.level / 20)
                          ? 'bg-macos-blue'
                          : 'bg-macos-gray-300 dark:bg-macos-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 grid md:grid-cols-2 gap-8"
      >
        <div className="macos-card p-6">
          <h3 className="text-lg font-semibold text-macos-gray-900 dark:text-macos-gray-100 mb-4">
            Learning Goals
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-macos-blue rounded-full" />
              <span className="text-macos-gray-600 dark:text-macos-gray-400">
                Advanced WebGL and 3D Graphics
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-macos-blue rounded-full" />
              <span className="text-macos-gray-600 dark:text-macos-gray-400">
                Machine Learning Integration
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-macos-blue rounded-full" />
              <span className="text-macos-gray-600 dark:text-macos-gray-400">
                Advanced DevOps Practices
              </span>
            </div>
          </div>
        </div>

        <div className="macos-card p-6">
          <h3 className="text-lg font-semibold text-macos-gray-900 dark:text-macos-gray-100 mb-4">
            Certifications
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-macos-gray-600 dark:text-macos-gray-400">
                AWS Certified Developer
              </span>
              <span className="text-sm text-macos-blue font-medium">2023</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-macos-gray-600 dark:text-macos-gray-400">
                React Professional Certificate
              </span>
              <span className="text-sm text-macos-blue font-medium">2022</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-macos-gray-600 dark:text-macos-gray-400">
                TypeScript Fundamentals
              </span>
              <span className="text-sm text-macos-blue font-medium">2022</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Skills
