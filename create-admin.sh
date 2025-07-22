#!/bin/bash

echo "🔧 Creating Super Admin User..."
echo ""

# Check if backend directory exists
if [ ! -d "backend" ]; then
    echo "❌ Backend directory not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

# Navigate to backend
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Create admin user
echo "👤 Creating super admin user..."
npm run create:admin

echo ""
echo "✅ Admin user creation completed!"
echo ""
echo "📧 Login Credentials:"
echo "   Email: admin@admin.com"
echo "   Password: admin123"
echo ""
echo "🌐 You can now login to:"
echo "   - Admin Dashboard: http://localhost:4201"
echo "   - Frontend: http://localhost:4200" 