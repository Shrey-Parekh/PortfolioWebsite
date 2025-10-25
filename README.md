# 🍎 macOS Portfolio Website

A pixel-perfect macOS-themed portfolio website that replicates the authentic macOS Big Sur/Monterey/Ventura design system. Built with modern web technologies and featuring smooth animations, glassmorphism effects, and an interactive 3D hero section.

![Portfolio Preview](https://img.shields.io/badge/macOS-Portfolio-blue?style=for-the-badge&logo=apple&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## ✨ Features

### 🎨 **Pixel-Perfect macOS Design**
- **Authentic Color Palette**: Exact macOS system colors and gradients
- **SF Pro Typography**: Native macOS font system with proper weights
- **Glassmorphism Effects**: Backdrop blur and transparency throughout
- **Layered Shadows**: Depth and dimension matching macOS interface
- **Smooth Animations**: 60fps animations with macOS timing curves

### 🚀 **Modern Tech Stack**
- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development and building
- **Tailwind CSS** with custom macOS theme configuration
- **Three.js** & **React Three Fiber** for 3D graphics
- **Framer Motion** for smooth animations
- **Express.js** backend with Supabase integration

### 📱 **Responsive Design**
- **Desktop**: Full macOS experience with dock navigation
- **Tablet**: Scaled interface with touch-optimized interactions
- **Mobile**: Simplified navigation with performance optimizations

### 🎯 **Interactive Components**
- **3D Hero Section**: Interactive Three.js scene with mouse tracking
- **macOS Dock**: Animated dock with magnification effects
- **Window Management**: Traffic light buttons and window chrome
- **Contact Form**: Real-time validation with Supabase backend
- **Dark/Light Mode**: System preference detection and smooth transitions

## 🖼️ Screenshots

### Desktop View
![Desktop Preview](https://via.placeholder.com/1200x800/007AFF/FFFFFF?text=macOS+Portfolio+Desktop)

### Mobile View
![Mobile Preview](https://via.placeholder.com/400x800/007AFF/FFFFFF?text=macOS+Portfolio+Mobile)

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **Supabase Account** (Optional, for contact form)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/macos-portfolio.git
   cd macos-portfolio
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Environment setup**
   ```bash
   # Copy environment files
   cp env.example .env
   cp server/env.example server/.env
   ```

4. **Configure environment variables**
   
   **Frontend (.env):**
   ```env
   VITE_API_URL=http://localhost:3001
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

   **Backend (server/.env):**
   ```env
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_ANON_KEY=your_supabase_anon_key_here
   FRONTEND_URL=http://localhost:3000
   PORT=3001
   ```

5. **Start development servers**
   ```bash
   # Terminal 1: Start frontend
   npm run dev
   
   # Terminal 2: Start backend
   cd server
   npm start
   ```

6. **Open your browser**
   ```
   Frontend: http://localhost:3000
   Backend:  http://localhost:3001
   ```

## 🗄️ Database Setup (Optional)

### Supabase Configuration

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Run the database schema**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Execute the SQL to create tables

3. **Update environment variables** with your Supabase credentials

### Database Schema

The project includes a complete database schema with:
- **Contact Messages**: Store form submissions
- **Projects**: Manage portfolio projects (optional CMS)
- **Skills**: Dynamic skills management (optional)

## 🎨 Customization

### Personal Information

Update your information in these files:

**About Page** (`src/pages/About.tsx`):
```typescript
// Update your name, title, location
const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  location: "Your Location"
}
```

**Contact Page** (`src/pages/Contact.tsx`):
```typescript
// Update contact information
const contactInfo = [
  { icon: Mail, label: 'Email', value: 'your.email@example.com' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
  { icon: MapPin, label: 'Location', value: 'Your City, Country' }
]
```

**Projects** (`src/pages/Projects.tsx`):
```typescript
// Add your projects
const projects = [
  {
    title: "Your Project",
    description: "Project description",
    technologies: ["React", "TypeScript"],
    liveUrl: "https://your-project.com",
    githubUrl: "https://github.com/yourusername/project"
  }
]
```

### Styling & Colors

Customize the macOS theme in `tailwind.config.js`:

```javascript
colors: {
  macos: {
    blue: '#007AFF',        // Change primary color
    light: {
      background: '#F5F5F7', // Light mode background
      surface: '#FFFFFF',    // Card backgrounds
    },
    dark: {
      background: '#000000',  // Dark mode background
      surface: '#1C1C1E',     // Dark card backgrounds
    }
  }
}
```

### 3D Hero Section

Customize the 3D scene in `src/components/Hero3D.tsx`:

```typescript
// Change geometric shapes
<torusGeometry args={[1, 0.4, 16, 32]} />

// Modify colors and materials
<meshStandardMaterial
  color="#007AFF"
  metalness={0.7}
  roughness={0.3}
/>
```

## 📁 Project Structure

```
macos-portfolio/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Dock.tsx         # macOS Dock navigation
│   │   ├── MenuBar.tsx      # macOS Menu Bar
│   │   ├── Window.tsx       # macOS Window wrapper
│   │   └── Hero3D.tsx      # 3D Hero section
│   ├── pages/              # Page components
│   │   ├── Home.tsx         # Landing page
│   │   ├── About.tsx        # About page
│   │   ├── Projects.tsx     # Projects showcase
│   │   ├── Skills.tsx       # Skills & expertise
│   │   └── Contact.tsx      # Contact form
│   ├── context/            # React Context
│   │   └── ThemeContext.tsx
│   ├── lib/                # Utilities
│   │   ├── supabase.ts     # Supabase client
│   │   └── animations.ts   # Animation presets
│   └── App.tsx             # Main app component
├── server/                 # Backend server
│   ├── index.js           # Express server
│   ├── package.json       # Server dependencies
│   └── env.example        # Server environment template
├── public/                # Static assets
│   └── resume.pdf         # Your resume file
├── supabase-schema.sql    # Database schema
├── tailwind.config.js     # Tailwind configuration
├── vite.config.ts        # Vite configuration
└── README.md             # This file
```

## 🚀 Deployment

### Frontend (Vercel)

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect repository to Vercel
   - Set build command: `npm run build`
   - Set output directory: `dist`

2. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend.onrender.com
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Deploy!** 🚀

### Backend (Render)

1. **Connect to Render**
   - Push your code to GitHub
   - Connect repository to Render
   - Set build command: `cd server && npm install`
   - Set start command: `cd server && node index.js`

2. **Environment Variables**
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   FRONTEND_URL=https://your-portfolio.vercel.app
   PORT=3001
   ```

3. **Deploy!** 🚀

### Alternative Deployment Options

- **Frontend**: Netlify, GitHub Pages, AWS S3
- **Backend**: Railway, Heroku, AWS Lambda
- **Database**: PlanetScale, Railway, AWS RDS

## 🛠️ Development

### Available Scripts

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend
cd server
npm start           # Start production server
npm run dev         # Start development server with nodemon
```

### Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (recommended)
- **Tailwind CSS**: Utility-first styling

### Performance Optimization

- **Code Splitting**: Routes are lazy-loaded
- **Image Optimization**: WebP format with fallbacks
- **3D Optimization**: LOD and texture compression
- **Bundle Analysis**: `npm run build -- --analyze`

## 🎯 Browser Support

- **Chrome 90+**
- **Firefox 88+**
- **Safari 14+**
- **Edge 90+**

## 📱 Mobile Optimization

- **Touch Interactions**: Optimized for mobile devices
- **Performance**: Reduced 3D complexity on mobile
- **Responsive Design**: Adapts to all screen sizes
- **PWA Ready**: Can be converted to Progressive Web App

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add TypeScript types for new features
- Test on multiple browsers
- Ensure responsive design
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Apple** for the macOS design system inspiration
- **Three.js** community for 3D graphics
- **Tailwind CSS** team for the utility-first framework
- **React** team for the amazing library
- **Framer Motion** for smooth animations

## 📞 Support

If you have any questions or need help:

- **Open an issue** on GitHub
- **Check the documentation** in the `/docs` folder
- **Review the examples** in the codebase

## 🌟 Showcase

If you use this template, please consider:

- ⭐ **Starring** this repository
- 🐛 **Reporting** bugs and issues
- 💡 **Suggesting** new features
- 🔄 **Contributing** improvements

---

**Built with ❤️ and attention to detail**

*Creating pixel-perfect digital experiences that feel native to their platforms.*