import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  MapPin, 
  Calendar, 
  Award, 
  Code, 
  Palette,
  Database,
  Cloud
} from 'lucide-react'

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experience', label: 'Experience', icon: Award }
  ]

  const skills = [
    { category: 'Frontend', icon: Palette, technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion'] },
    { category: 'Backend', icon: Code, technologies: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'Microservices'] },
    { category: 'Database', icon: Database, technologies: ['PostgreSQL', 'MongoDB', 'Supabase', 'Redis', 'Prisma'] },
    { category: 'Cloud & DevOps', icon: Cloud, technologies: ['AWS', 'Vercel', 'Docker', 'GitHub Actions', 'CI/CD'] }
  ]

  const experience = [
    {
      year: '2023 - Present',
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      description: 'Leading development of scalable web applications and mentoring junior developers.'
    },
    {
      year: '2021 - 2023',
      title: 'Frontend Developer',
      company: 'Digital Solutions Ltd.',
      description: 'Specialized in React applications and modern UI/UX implementations.'
    },
    {
      year: '2020 - 2021',
      title: 'Junior Developer',
      company: 'StartupXYZ',
      description: 'Built responsive web applications and learned modern development practices.'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-macos-gray-100 dark:bg-macos-gray-800 p-1 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200
                ${activeTab === tab.id
                  ? 'bg-white dark:bg-macos-gray-700 text-macos-blue shadow-sm'
                  : 'text-macos-gray-600 dark:text-macos-gray-400 hover:text-macos-gray-900 dark:hover:text-macos-gray-200'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        {activeTab === 'profile' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Profile Section */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-macos-blue to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                  S
                </div>
                <h2 className="text-2xl font-bold text-macos-gray-900 dark:text-macos-gray-100 mb-2">
                  Shrey
                </h2>
                <p className="text-macos-gray-600 dark:text-macos-gray-400 mb-4">
                  Full Stack Developer & UI/UX Designer
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-macos-gray-500 dark:text-macos-gray-400">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Available for work</span>
                  </div>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold mb-3">About Me</h3>
                <p className="text-macos-gray-600 dark:text-macos-gray-400 leading-relaxed">
                  I'm a passionate full-stack developer with over 4 years of experience creating 
                  digital experiences that users love. I specialize in modern web technologies, 
                  with a particular focus on React, TypeScript, and creating pixel-perfect 
                  interfaces that feel native to their platforms.
                </p>
                <p className="text-macos-gray-600 dark:text-macos-gray-400 leading-relaxed mt-4">
                  When I'm not coding, you'll find me exploring the latest design trends, 
                  contributing to open-source projects, or experimenting with 3D graphics 
                  and WebGL. I believe in the power of clean code, thoughtful design, and 
                  continuous learning.
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Quick Stats</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="macos-card p-4 text-center">
                  <div className="text-2xl font-bold text-macos-blue mb-1">50+</div>
                  <div className="text-sm text-macos-gray-600 dark:text-macos-gray-400">Projects Completed</div>
                </div>
                <div className="macos-card p-4 text-center">
                  <div className="text-2xl font-bold text-macos-blue mb-1">4+</div>
                  <div className="text-sm text-macos-gray-600 dark:text-macos-gray-400">Years Experience</div>
                </div>
                <div className="macos-card p-4 text-center">
                  <div className="text-2xl font-bold text-macos-blue mb-1">25+</div>
                  <div className="text-sm text-macos-gray-600 dark:text-macos-gray-400">Happy Clients</div>
                </div>
                <div className="macos-card p-4 text-center">
                  <div className="text-2xl font-bold text-macos-blue mb-1">10+</div>
                  <div className="text-sm text-macos-gray-600 dark:text-macos-gray-400">Technologies</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-8">
            <h3 className="text-xl font-semibold">Technical Skills</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon
                return (
                  <motion.div
                    key={skill.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="macos-card p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-macos-blue/10 dark:bg-macos-blue/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-macos-blue" />
                      </div>
                      <h4 className="text-lg font-semibold">{skill.category}</h4>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {skill.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-macos-gray-100 dark:bg-macos-gray-700 text-macos-gray-700 dark:text-macos-gray-300 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Professional Experience</h3>
            
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="macos-card p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-macos-gray-900 dark:text-macos-gray-100">
                        {exp.title}
                      </h4>
                      <p className="text-macos-blue font-medium">{exp.company}</p>
                    </div>
                    <span className="text-sm text-macos-gray-500 dark:text-macos-gray-400 mt-1 md:mt-0">
                      {exp.year}
                    </span>
                  </div>
                  <p className="text-macos-gray-600 dark:text-macos-gray-400">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default About
