# How to Run the macOS Portfolio

This guide will walk you through setting up and running the macOS-themed portfolio website locally.

## 🚀 Quick Start (5 minutes)

### 1. Prerequisites
Make sure you have installed:
- **Node.js 18+** ([Download here](https://nodejs.org/))
- **Git** ([Download here](https://git-scm.com/))

### 2. Clone and Install
```bash
# Clone the repository
git clone <your-repo-url>
cd macos-portfolio

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Start Development
```bash
# Terminal 1: Start frontend (http://localhost:3000)
npm run dev

# Terminal 2: Start backend (http://localhost:3001)
cd server
npm start
```

That's it! 🎉 Your portfolio should be running at `http://localhost:3000`

## 🔧 Detailed Setup

### Option 1: Without Database (Demo Mode)
The application works perfectly without any database setup. The contact form will work in "demo mode" and log messages to the console.

### Option 2: With Supabase Database
For full functionality including contact form storage:

#### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

#### 2. Setup Database
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL to create tables

#### 3. Configure Environment Variables
Create `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:3001
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Create `server/.env` file:
```env
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
FRONTEND_URL=http://localhost:3000
PORT=3001
```

## 🎨 Customization

### Personal Information
Edit these files to add your information:

**About Page** (`src/pages/About.tsx`):
- Update name, title, location
- Modify bio text
- Add your skills and experience
- Update profile image

**Projects Page** (`src/pages/Projects.tsx`):
- Replace with your actual projects
- Add project images to `public/images/`
- Update project descriptions and links

**Contact Page** (`src/pages/Contact.tsx`):
- Update email, phone, location
- Add your social media links
- Update resume file path

**Resume File**:
- Add your resume PDF to `public/resume.pdf`

### Styling
The macOS theme is highly customizable through `tailwind.config.js`:

```javascript
// Customize colors
colors: {
  macos: {
    blue: '#007AFF',        // Change primary color
    gray: { /* ... */ }     // Modify gray scale
  }
}
```

### 3D Hero Section
Customize the 3D scene in `src/components/Hero3D.tsx`:
- Change geometric shapes (torus, sphere, box)
- Modify colors and materials
- Adjust lighting and camera position
- Add new interactive elements

## 🚀 Deployment

### Frontend to Vercel
1. Push your code to GitHub
2. Connect repository to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variables
6. Deploy!

### Backend to Render
1. Push your code to GitHub
2. Connect repository to Render
3. Set build command: `cd server && npm install`
4. Set start command: `cd server && node index.js`
5. Add environment variables
6. Deploy!

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- --port 3001
```

**Module not found errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3D graphics not loading:**
- Check browser console for WebGL errors
- Ensure your browser supports WebGL
- Try disabling hardware acceleration

**Contact form not working:**
- Check backend server is running
- Verify environment variables
- Check browser network tab for errors

### Performance Issues

**Slow 3D rendering:**
- Reduce particle count in `Hero3D.tsx`
- Lower camera resolution
- Disable post-processing effects

**Large bundle size:**
```bash
# Analyze bundle
npm run build -- --analyze
```

## 📱 Mobile Testing

Test on different devices:
- **Desktop**: Full macOS experience
- **Tablet**: Scaled dock and responsive layout
- **Mobile**: Simplified navigation and touch-optimized

## 🔍 Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Automatic on file save
- Backend: Restart server manually or use `nodemon`

### Debugging
- Use browser DevTools for frontend debugging
- Check server logs in terminal for backend issues
- Use React DevTools for component debugging

### Code Quality
```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint -- --fix
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Supabase Documentation](https://supabase.com/docs)

## 🆘 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Look at the browser console for errors
3. Verify all environment variables are set
4. Ensure all dependencies are installed
5. Check that both servers are running

---

**Happy coding! 🚀**
