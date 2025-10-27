# API Integration Guide

## Overview
This document describes the integration between the frontend (deployed on Vercel) and the backend API (deployed on Render).

## Backend API
- **URL**: https://portfolio-website-1-5m6o.onrender.com
- **Health Check**: `GET /health`
- **Contact Form**: `POST /api/contact`

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=https://portfolio-website-1-5m6o.onrender.com
VITE_API_BASE_URL=https://portfolio-website-1-5m6o.onrender.com
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Backend (server/.env)
```
FRONTEND_URL=https://your-vercel-domain.vercel.app
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
PORT=10000
```

## CORS Configuration
The backend is configured to accept requests from:
- `http://localhost:3000` (development)
- `http://localhost:5173` (Vite dev server)
- `https://portfolio-website-shrey.vercel.app` (production)
- Any localhost origin (for development)
- Custom `FRONTEND_URL` environment variable

## API Endpoints

### Health Check
```
GET /health
Response: {
  "status": "OK",
  "timestamp": "2025-01-27T...",
  "supabase": "connected" | "not configured"
}
```

### Contact Form
```
POST /api/contact
Content-Type: application/json

Body: {
  "name": "string",
  "email": "string", 
  "subject": "string",
  "message": "string"
}

Response: {
  "success": boolean,
  "message": "string"
}
```

## Frontend Components

### ContactForm
- Located: `src/components/ContactForm.tsx`
- Uses: `src/lib/api.ts` for API calls
- Features: Form validation, loading states, success/error messages

### HealthCheck
- Located: `src/components/HealthCheck.tsx`
- Uses: `src/lib/api.ts` for health checks
- Features: Real-time backend status monitoring

### API Utility
- Located: `src/lib/api.ts`
- Functions:
  - `getApiUrl()`: Returns the configured API URL
  - `checkBackendHealth()`: Performs health check
  - `submitContactForm()`: Submits contact form data

## Deployment Notes

### Vercel (Frontend)
- Environment variables are configured in Vercel dashboard
- Build command: `npm run build`
- Output directory: `dist`

### Render (Backend)
- Environment variables are configured in Render dashboard
- Build command: `cd server && npm install`
- Start command: `cd server && npm start`
- Port: Automatically assigned by Render (process.env.PORT)

## Testing the Integration

1. **Health Check**: Visit the contact page and look for the health status indicator
2. **Contact Form**: Fill out and submit the contact form
3. **CORS**: Verify no CORS errors in browser console
4. **Network**: Check browser DevTools Network tab for successful API calls

## Troubleshooting

### Common Issues
1. **CORS Errors**: Add your Vercel domain to the backend CORS configuration
2. **Environment Variables**: Ensure all required variables are set in both environments
3. **Network Errors**: Check if the backend is running and accessible
4. **Rate Limiting**: Backend has rate limiting (10 requests per 15 minutes per IP)

### Debug Steps
1. Check browser console for errors
2. Verify environment variables are loaded
3. Test API endpoints directly using curl or Postman
4. Check backend logs in Render dashboard