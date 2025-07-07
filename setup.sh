#!/bin/bash

# Feline Minimalist - Setup Script
# This script will set up your development environment

echo "🐱 Setting up Feline Minimalist..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d 'v' -f 2)
MAJOR_VERSION=$(echo $NODE_VERSION | cut -d '.' -f 1)

if [ "$MAJOR_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js version 18 or higher is required. Current version: $NODE_VERSION"
    exit 1
fi

echo "✅ Node.js version: $NODE_VERSION"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo ""
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "✅ .env.local created from template"
fi

# Make scripts executable
chmod +x generate-images.sh

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Generate product images by running: ./generate-images.sh"
echo "2. Start the development server: npm run dev"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📚 Additional commands:"
echo "- npm run build    : Build for production"
echo "- npm run start    : Start production server"
echo "- npm run lint     : Run linting"
echo ""
echo "🚀 Happy coding!"
