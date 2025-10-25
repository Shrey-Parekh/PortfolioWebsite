/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        macos: {
          // System Colors - Exact macOS palette
          blue: '#007AFF',
          green: '#30D158',
          orange: '#FF9500',
          red: '#FF3B30',
          yellow: '#FFCC00',
          purple: '#AF52DE',
          pink: '#FF2D92',
          teal: '#5AC8FA',
          indigo: '#5856D6',
          
          // Light Mode Colors
          light: {
            background: '#F5F5F7',
            surface: '#FFFFFF',
            surfaceSecondary: '#F2F2F7',
            border: '#D1D1D6',
            text: '#000000',
            textSecondary: '#3C3C43',
            textTertiary: '#8E8E93',
            separator: '#C6C6C8',
            fill: '#F2F2F7',
            fillSecondary: '#E5E5EA',
            fillTertiary: '#D1D1D6',
            fillQuaternary: '#C7C7CC',
          },
          
          // Dark Mode Colors
          dark: {
            background: '#000000',
            surface: '#1C1C1E',
            surfaceSecondary: '#2C2C2E',
            border: '#38383A',
            text: '#FFFFFF',
            textSecondary: '#EBEBF5',
            textTertiary: '#8E8E93',
            separator: '#38383A',
            fill: '#2C2C2E',
            fillSecondary: '#3A3A3C',
            fillTertiary: '#48484A',
            fillQuaternary: '#636366',
          },
          
          // Glass Effects
          glass: {
            light: 'rgba(255, 255, 255, 0.8)',
            dark: 'rgba(28, 28, 30, 0.8)',
            dock: 'rgba(255, 255, 255, 0.7)',
            'dock-dark': 'rgba(28, 28, 30, 0.7)',
            menu: 'rgba(255, 255, 255, 0.9)',
            'menu-dark': 'rgba(28, 28, 30, 0.9)',
          }
        }
      },
      fontFamily: {
        'sf-pro': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'sans-serif'],
      },
      backdropBlur: {
        'macos': '80px',
      },
      boxShadow: {
        'macos': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'macos-dark': '0 10px 40px rgba(0, 0, 0, 0.5)',
        'dock': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'window': '0 20px 60px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'dock-bounce': 'dock-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'scale-in': 'scale-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      keyframes: {
        'dock-bounce': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      borderRadius: {
        'macos': '12px',
        'macos-lg': '20px',
      }
    },
  },
  plugins: [],
}
