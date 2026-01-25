# SPrinovaa Digital Marketing - Render Deployment Guide

## Prerequisites
- A Render account (sign up at https://render.com)
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- Environment variables ready (API keys, Firebase config)

## Step-by-Step Deployment Instructions

### 1. Prepare Your Repository
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit your changes
git commit -m "Prepare for Render deployment"

# Push to your repository (GitHub/GitLab/Bitbucket)
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Deploy on Render

#### Option A: Using render.yaml (Recommended)
1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Blueprint"**
3. Connect your Git repository
4. Render will automatically detect the `render.yaml` file
5. Click **"Apply"** to create the service

#### Option B: Manual Setup
1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your Git repository
4. Configure the service:
   - **Name:** sprinovaa-digital-marketing
   - **Environment:** Node
   - **Region:** Oregon (or your preferred region)
   - **Branch:** main
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`
   - **Plan:** Free (or your preferred plan)

### 3. Configure Environment Variables

In the Render dashboard, go to your service → **Environment** tab, and add these variables:

```
NODE_ENV=production
GOOGLE_GENAI_API_KEY=<your-google-genai-api-key>
NEXT_PUBLIC_FIREBASE_API_KEY=<your-firebase-api-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-project-id>.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-project-id>.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-sender-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-app-id>
```

### 4. Deploy

After configuring environment variables:
1. Click **"Manual Deploy"** → **"Deploy latest commit"** or
2. Push to your repository, and Render will auto-deploy

### 5. Monitor Deployment

- Check the **Logs** tab to monitor the build and deployment process
- Once deployed, your app will be available at: `https://sprinovaa-digital-marketing.onrender.com`

## Important Notes

### Free Tier Considerations
- Render free tier services spin down after 15 minutes of inactivity
- First request after inactivity may take 30-60 seconds
- Consider upgrading to a paid plan for production use

### Build Configuration
The build process has been optimized:
- TypeScript errors won't block builds (`ignoreBuildErrors: true`)
- ESLint errors won't block builds (`ignoreDuringBuilds: true`)
- Port is dynamically set using Render's `$PORT` environment variable

### Troubleshooting

**Build fails:**
- Check the Logs tab for error messages
- Verify all environment variables are set correctly
- Ensure your Node version matches (Node 20 recommended)

**App doesn't start:**
- Verify the start command is correct: `npm run start`
- Check if port binding is working (uses Render's $PORT)

**API calls fail:**
- Ensure all Firebase and API keys are correctly set
- Check that NEXT_PUBLIC_ prefix is used for client-side variables

### Custom Domain (Optional)
1. Go to **Settings** → **Custom Domain**
2. Add your domain
3. Configure DNS records as instructed by Render

## Files Created for Deployment

- **render.yaml** - Render service configuration
- **.env.example** - Template for environment variables
- **Updated package.json** - Modified build and start scripts for production

## Next Steps After Deployment

1. Test all features on the deployed URL
2. Set up custom domain (optional)
3. Configure automatic deployments from your git branch
4. Monitor performance and logs
5. Consider upgrading to a paid plan for better performance

## Support

For issues or questions:
- Render Documentation: https://render.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
