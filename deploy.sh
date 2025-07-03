#!/bin/bash

# Sequoia Pay Landing Deployment Script
# Usage: ./deploy.sh [platform]
# Platforms: netlify, vercel, surge, github

set -e

echo "🚀 Sequoia Pay Landing Deployment Script"
echo "========================================="

# Check if platform is specified
PLATFORM=${1:-""}

if [ -z "$PLATFORM" ]; then
    echo "Please specify a deployment platform:"
    echo "  ./deploy.sh netlify   - Deploy to Netlify"
    echo "  ./deploy.sh vercel    - Deploy to Vercel"
    echo "  ./deploy.sh surge     - Deploy to Surge.sh"
    echo "  ./deploy.sh github    - Deploy to GitHub Pages"
    exit 1
fi

# Validate files exist
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found!"
    exit 1
fi

if [ ! -f "style.css" ]; then
    echo "❌ Error: style.css not found!"
    exit 1
fi

if [ ! -f "script.js" ]; then
    echo "❌ Error: script.js not found!"
    exit 1
fi

echo "✅ All required files found"

# Deploy based on platform
case $PLATFORM in
    "netlify")
        echo "📦 Deploying to Netlify..."
        if ! command -v netlify &> /dev/null; then
            echo "Installing Netlify CLI..."
            npm install -g netlify-cli
        fi
        netlify deploy --prod --dir .
        echo "✅ Deployed to Netlify!"
        ;;
    
    "vercel")
        echo "📦 Deploying to Vercel..."
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi
        vercel --prod
        echo "✅ Deployed to Vercel!"
        ;;
    
    "surge")
        echo "📦 Deploying to Surge.sh..."
        if ! command -v surge &> /dev/null; then
            echo "Installing Surge CLI..."
            npm install -g surge
        fi
        surge . sequoia-pay-landing.surge.sh
        echo "✅ Deployed to Surge.sh!"
        echo "🌐 URL: https://sequoia-pay-landing.surge.sh"
        ;;
    
    "github")
        echo "📦 Deploying to GitHub Pages..."
        
        # Check if we're in a git repository
        if [ ! -d ".git" ]; then
            echo "❌ Error: Not a git repository!"
            echo "Initialize git first: git init"
            exit 1
        fi
        
        # Create gh-pages branch if it doesn't exist
        if ! git show-ref --verify --quiet refs/heads/gh-pages; then
            git checkout -b gh-pages
        else
            git checkout gh-pages
        fi
        
        # Copy files and commit
        git add .
        git commit -m "Deploy landing page to GitHub Pages"
        git push origin gh-pages
        
        echo "✅ Deployed to GitHub Pages!"
        echo "🌐 URL will be available at: https://[username].github.io/[repository]"
        ;;
    
    *)
        echo "❌ Unknown platform: $PLATFORM"
        echo "Supported platforms: netlify, vercel, surge, github"
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment completed successfully!"
echo "📱 Your Sequoia Pay landing page is now live!" 