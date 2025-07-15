# Render.com Deployment Guide for Xenith College Fest

## Prerequisites
- GitHub account with your code pushed
- MongoDB Atlas account (for database)
- Render.com account

## Step 1: Prepare Your Code

1. **Update all API calls in frontend components** to use the API configuration:
   - Replace all `http://localhost:5000` with `${API_BASE_URL}`
   - Import `API_BASE_URL` from `../config/api` in each component

2. **Files to update**:
   - `frontend/src/components/Home.js` ✅ (Updated)
   - `frontend/src/components/Category.js`
   - `frontend/src/components/Createpost.js`
   - `frontend/src/components/SignIn.js`
   - `frontend/src/components/SignUp.js`
   - `frontend/src/components/Profile.js`
   - Any other components making API calls

## Step 2: MongoDB Setup

1. **MongoDB Atlas**:
   - Ensure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0)
   - Get your connection string
   - Replace password and database name in the connection string

## Step 3: Deploy to Render

### Method 1: Manual Web Service (Recommended)

1. **Go to Render.com**
   - Sign up/login at https://render.com
   - Connect your GitHub account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Select your repository: `Xenith_College_Fest`
   - Click "Connect"

3. **Configure Service**:
   ```
   Name: xenith-college-fest
   Root Directory: (leave empty)
   Environment: Node
   Region: Oregon (US West) or closest to you
   Branch: main
   Build Command: npm run build
   Start Command: npm start
   ```

4. **Environment Variables**:
   ```
   NODE_ENV = production
   MONGODB_URI = your_mongodb_atlas_connection_string
   JWT_SECRET = your_jwt_secret_key
   ```

5. **Advanced Settings**:
   - Auto-Deploy: Yes
   - Plan: Free (for testing)

6. **Click "Create Web Service"**

### Method 2: Using Blueprint (render.yaml)

1. Go to Render Dashboard
2. Click "New +" → "Blueprint"
3. Connect your repository
4. Render will detect the `render.yaml` file
5. Add environment variables in the dashboard

## Step 4: Post-Deployment

1. **Your app will be available at**:
   `https://your-service-name.onrender.com`

2. **Update Frontend API URLs** (if not done):
   - The current setup serves frontend from backend
   - All API calls should work automatically

3. **Test Your Application**:
   - Sign up/Sign in functionality
   - Create posts
   - Upload images
   - Category filtering

## Step 5: Custom Domain (Optional)

1. In Render dashboard, go to your service
2. Click "Settings" → "Custom Domains"
3. Add your domain name
4. Update DNS records as instructed

## Environment Variables Details

```bash
# Required Environment Variables
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-secret-key-here
PORT=10000  # Render sets this automatically
```

## Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check if all dependencies are in package.json
   - Ensure Node.js version compatibility

2. **App Crashes**:
   - Check logs in Render dashboard
   - Verify environment variables
   - Check MongoDB connection

3. **API Calls Fail**:
   - Ensure all localhost URLs are replaced
   - Check CORS configuration
   - Verify JWT token handling

### Monitoring:

1. **Render Dashboard**:
   - View logs in real-time
   - Monitor performance
   - Check deployment status

2. **Health Checks**:
   - Render automatically monitors your app
   - Restarts if it becomes unresponsive

## Cost Considerations

- **Free Tier Limitations**:
  - 750 hours/month
  - Sleeps after 15 minutes of inactivity
  - Wakes up on first request (cold start ~30 seconds)

- **Paid Plans**:
  - $7/month for starter plan
  - No sleeping
  - Faster builds
  - More resources

## Deployment Commands

```bash
# Build and deploy
npm run build

# Start production server
npm start

# Install all dependencies
npm run install-all
```

## Security Checklist

- ✅ Environment variables for sensitive data
- ✅ JWT secret in environment variables
- ✅ MongoDB connection string secured
- ✅ CORS properly configured
- ✅ No hardcoded credentials in code

## Next Steps

1. Update all frontend API calls
2. Test locally with production build
3. Deploy to Render
4. Test all functionality
5. Monitor for issues
6. Consider upgrading to paid plan for production use
