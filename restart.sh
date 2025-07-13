#!/bin/bash

echo "🔄 Restarting SaaS Platform..."

# Stop all processes
echo "⏹️  Stopping all services..."
pkill -f "nest start" 2>/dev/null
pkill -f "ng serve" 2>/dev/null
pkill -f "node" 2>/dev/null

# Stop Docker services
echo "🐳 Stopping Docker services..."
docker-compose down

# Start Docker services
echo "🐳 Starting Docker services..."
docker-compose up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Start Backend
echo "🔧 Starting Backend..."
cd backend
npm run start:dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 15

# Start Frontend
echo "🎨 Starting Frontend..."
cd ../frontend
npm start &
FRONTEND_PID=$!

# Wait for frontend to start
sleep 15

# Start Admin Dashboard
echo "📊 Starting Admin Dashboard..."
cd ../admin
npm start &
ADMIN_PID=$!

# Wait for admin to start
sleep 15

# Check status
echo "✅ Checking service status..."
echo "Backend: $(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)"
echo "Frontend: $(curl -s -o /dev/null -w "%{http_code}" http://localhost:4200)"
echo "Admin: $(curl -s -o /dev/null -w "%{http_code}" http://localhost:4201)"

echo ""
echo "🎉 All services restarted!"
echo "📱 Frontend: http://localhost:4200"
echo "📊 Admin: http://localhost:4201"
echo "🔧 Backend: http://localhost:3000"
echo "📚 API Docs: http://localhost:3000/api/docs"
echo "📧 MailHog: http://localhost:8025"

# Keep script running
echo "Press Ctrl+C to stop all services"
wait 