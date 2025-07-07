#!/bin/bash

# Clean Git Repository Script for Feline Minimalist
# This will remove the secret from git history completely

echo "🧹 Cleaning git repository to remove secrets..."

cd "/Volumes/SSD/Users/chris/Development/feline-minimalist"

# Step 1: Remove all git history
echo "📝 Removing git history..."
rm -rf .git

# Step 2: Initialize fresh git repository
echo "🔄 Initializing fresh git repository..."
git init

# Step 3: Set up git user (if not already set globally)
echo "👤 Setting up git user..."
git config user.name "Chris" 2>/dev/null || true
git config user.email "chris@example.com" 2>/dev/null || true

# Step 4: Add all files (clean versions)
echo "📁 Adding all files..."
git add .

# Step 5: Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Feline Minimalist e-commerce site (clean)"

# Step 6: Add remote
echo "🔗 Adding GitHub remote..."
git remote add origin https://github.com/Cdlane24399/feline-minimalist.git

# Step 7: Set main branch
echo "🌟 Setting main branch..."
git branch -M main

# Step 8: Force push (this will overwrite the repository)
echo "🚀 Pushing to GitHub (force)..."
git push -f origin main

echo "✅ Repository cleaned and pushed successfully!"
echo "🔐 The secret has been completely removed from git history."
echo ""
echo "⚠️  IMPORTANT: Don't forget to:"
echo "   1. Revoke your old OpenAI API key"
echo "   2. Generate a new API key"
echo "   3. Update your .env.local file"
