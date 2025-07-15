#!/bin/bash

# Script to update all API URLs in React components
# Run this script from the root directory

echo "Updating API URLs in React components..."

# Files to update
declare -a files=(
    "frontend/src/components/Home.js"
    "frontend/src/components/Createpost.js"
    "frontend/src/components/Category.js"
    "frontend/src/components/MyFollowingPost.js"
    "frontend/src/components/PostDetail.js"
    "frontend/src/components/Profie.js"
    "frontend/src/components/ProfilePic.js"
    "frontend/src/components/SignIn.js"
    "frontend/src/components/SignUp.js"
    "frontend/src/components/UserProfile.js"
)

# Add API import to each file
for file in "${files[@]}"
do
    echo "Updating $file..."
    
    # Add import statement if not already present
    if ! grep -q "import API_BASE_URL" "$file"; then
        # Find the last import statement and add after it
        sed -i '/^import.*from/a import API_BASE_URL from "../config/api";' "$file"
    fi
    
    # Replace localhost URLs
    sed -i 's|http://localhost:5000|\${API_BASE_URL}|g' "$file"
    
    echo "✅ Updated $file"
done

echo "🎉 All API URLs have been updated!"
echo "📝 Don't forget to:"
echo "   1. Test your app locally"
echo "   2. Commit and push changes to GitHub"
echo "   3. Deploy to Render.com"
