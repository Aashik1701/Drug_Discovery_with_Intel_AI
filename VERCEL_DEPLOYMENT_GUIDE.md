# Vercel Deployment Guide for DrugForge

## 🚀 Deployment Steps

### 1. Environment Variables Setup in Vercel Dashboard

Before deploying, you need to set up the environment variables in your Vercel project:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the following variables:

```
VITE_API_GENERATIVE_LANGUAGE_CLIENT = AIzaSyA8-5p0GwyPeW816xN3YdHyerksOvlAG0s
VITE_FLASK_API_URL = https://your-backend-url.com (or leave as localhost for frontend-only deployment)
NODE_ENV = production
```

### 2. Build Configuration

✅ **Local build test successful** - The application builds correctly locally.

**Optimizations applied:**
- Disabled sourcemaps for production builds
- Added manual chunking to reduce bundle size
- Configured build timeout to 60 seconds
- Added proper routing configuration for SPA

### 3. Current Build Size Analysis

The application has been successfully built with:
- **Main bundle**: 735.59 kB (226.01 kB gzipped)
- **Total assets**: 28 JavaScript chunks + 1 CSS file
- **Build time**: ~3.6 seconds locally

### 4. Deployment Commands

**Option 1: Continue with current deployment**
Your deployment should proceed once environment variables are set.

**Option 2: Redeploy from Vercel dashboard**
1. Go to your Vercel project
2. Click on "Deployments"
3. Click "Redeploy" on the latest deployment

**Option 3: Deploy via Vercel CLI**
```bash
npm i -g vercel
vercel --prod
```

### 5. Troubleshooting Build Issues

If the build continues to hang at "transforming...", try these solutions:

**A. Check Environment Variables**
- Ensure all required environment variables are set in Vercel
- The Gemini API key must be properly configured

**B. Increase Build Timeout**
- The vercel.json has been configured with a 60-second timeout
- If needed, contact Vercel support for larger timeout limits

**C. Memory Issues**
- The build has been optimized with chunk splitting
- Large dependencies are separated into vendor chunks

### 6. Post-Deployment Verification

Once deployed, verify:
1. **Chatbot functionality** - Test with a simple message
2. **Dark/Light mode toggle** - Check theme switching
3. **Prediction tools** - Test at least one prediction component
4. **API connectivity** - Verify Gemini API responses

### 7. Expected Performance

**Chatbot Features:**
- ✅ Google Gemini API integration
- ✅ Intelligent fallback responses
- ✅ Dark/light mode support
- ✅ Error handling and offline mode
- ✅ Development debugging tools

**All Components:**
- ✅ Complete dark/light theme support
- ✅ Responsive design
- ✅ Optimized bundle splitting

## 🔧 If Build Still Fails

1. **Check Vercel Function Logs**
   - Go to Vercel dashboard → Functions → View logs

2. **Increase Memory Allocation**
   - Contact Vercel support for memory increase

3. **Alternative: Deploy to Netlify**
   ```bash
   npm run build
   # Then drag and drop the 'build' folder to Netlify
   ```

## 📋 Checklist

- [ ] Environment variables set in Vercel
- [ ] Gemini API key configured correctly
- [ ] Build completes without errors
- [ ] Chatbot responds to messages
- [ ] Dark/light mode works properly
- [ ] All prediction tools functional

Your application is ready for deployment! The chatbot now uses Google Gemini API as requested.
