#!/bin/bash

# SaaS Platform Setup Script
# This script sets up the complete SaaS multi-tenant platform

set -e

echo "🚀 Setting up SaaS Multi-Tenant Platform..."
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node -v)"
        exit 1
    fi
    print_success "Node.js version: $(node -v)"
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed."
        exit 1
    fi
    print_success "npm version: $(npm -v)"
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_warning "Docker is not installed. You'll need to install Docker for the development environment."
    else
        print_success "Docker version: $(docker --version)"
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_warning "Docker Compose is not installed. You'll need to install Docker Compose for the development environment."
    else
        print_success "Docker Compose version: $(docker-compose --version)"
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install root dependencies
    npm install
    
    # Install backend dependencies
    if [ -d "backend" ]; then
        print_status "Installing backend dependencies..."
        cd backend
        npm install
        cd ..
    fi
    
    # Install frontend dependencies
    if [ -d "frontend" ]; then
        print_status "Installing frontend dependencies..."
        cd frontend
        npm install
        cd ..
    fi
    
    # Install admin dependencies
    if [ -d "admin" ]; then
        print_status "Installing admin dependencies..."
        cd admin
        npm install
        cd ..
    fi
    
    print_success "All dependencies installed successfully!"
}

# Setup environment files
setup_environment() {
    print_status "Setting up environment files..."
    
    # Backend environment
    if [ -f "backend/env.example" ] && [ ! -f "backend/.env" ]; then
        cp backend/env.example backend/.env
        print_success "Backend environment file created"
    fi
    
    # Frontend environment
    if [ -d "frontend/src/environments" ]; then
        if [ ! -f "frontend/src/environments/environment.ts" ]; then
            cat > frontend/src/environments/environment.ts << EOF
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1',
  stripePublishableKey: 'pk_test_your_stripe_publishable_key',
};
EOF
            print_success "Frontend environment file created"
        fi
        
        if [ ! -f "frontend/src/environments/environment.prod.ts" ]; then
            cat > frontend/src/environments/environment.prod.ts << EOF
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com/api/v1',
  stripePublishableKey: 'pk_live_your_stripe_publishable_key',
};
EOF
            print_success "Frontend production environment file created"
        fi
    fi
    
    # Admin environment
    if [ -d "admin/src/environments" ]; then
        if [ ! -f "admin/src/environments/environment.ts" ]; then
            cat > admin/src/environments/environment.ts << EOF
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1',
  adminUrl: 'http://localhost:4201',
};
EOF
            print_success "Admin environment file created"
        fi
        
        if [ ! -f "admin/src/environments/environment.prod.ts" ]; then
            cat > admin/src/environments/environment.prod.ts << EOF
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com/api/v1',
  adminUrl: 'https://admin.yourdomain.com',
};
EOF
            print_success "Admin production environment file created"
        fi
    fi
}

# Start Docker services
start_docker_services() {
    print_status "Starting Docker services..."
    
    if command -v docker-compose &> /dev/null; then
        docker-compose up -d
        print_success "Docker services started successfully!"
        
        # Wait for services to be ready
        print_status "Waiting for services to be ready..."
        sleep 10
        
        # Check if services are running
        if docker-compose ps | grep -q "Up"; then
            print_success "All Docker services are running!"
        else
            print_warning "Some Docker services might not be running. Check with 'docker-compose ps'"
        fi
    else
        print_warning "Docker Compose not found. Please start services manually:"
        echo "  docker-compose up -d"
    fi
}

# Create database and run migrations
setup_database() {
    print_status "Setting up database..."
    
    if [ -d "backend" ]; then
        cd backend
        
        # Wait for database to be ready
        print_status "Waiting for database to be ready..."
        sleep 5
        
        # Run migrations
        print_status "Running database migrations..."
        npm run migration:run || print_warning "Migrations failed. Database might not be ready yet."
        
        # Seed data
        print_status "Seeding database..."
        npm run seed || print_warning "Seeding failed. You can run it manually later."
        
        cd ..
        print_success "Database setup completed!"
    fi
}

# Build applications
build_applications() {
    print_status "Building applications..."
    
    # Build backend
    if [ -d "backend" ]; then
        print_status "Building backend..."
        cd backend
        npm run build
        cd ..
    fi
    
    # Build frontend
    if [ -d "frontend" ]; then
        print_status "Building frontend..."
        cd frontend
        npm run build
        cd ..
    fi
    
    # Build admin
    if [ -d "admin" ]; then
        print_status "Building admin dashboard..."
        cd admin
        npm run build
        cd ..
    fi
    
    print_success "All applications built successfully!"
}

# Display setup completion
show_completion() {
    echo ""
    echo "🎉 SaaS Platform Setup Complete!"
    echo "================================"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Configure your environment variables in:"
    echo "   - backend/.env"
    echo "   - frontend/src/environments/environment.ts"
    echo "   - admin/src/environments/environment.ts"
    echo ""
    echo "2. Start the development servers:"
    echo "   npm run dev"
    echo ""
    echo "3. Access your applications:"
    echo "   - Frontend: http://localhost:4200"
    echo "   - Admin Dashboard: http://localhost:4201"
    echo "   - Backend API: http://localhost:3000"
    echo "   - API Documentation: http://localhost:3000/api/docs"
    echo "   - MailHog: http://localhost:8025"
    echo ""
    echo "4. Create a super admin user:"
    echo "   cd backend && npm run create:admin"
    echo ""
    echo "🔧 Useful Commands:"
    echo "   npm run dev          # Start all development servers"
    echo "   npm run docker:up    # Start Docker services"
    echo "   npm run docker:down  # Stop Docker services"
    echo "   npm run build        # Build all applications"
    echo ""
    echo "📚 Documentation:"
    echo "   See README.md for detailed documentation"
    echo ""
}

# Main setup function
main() {
    echo "Starting SaaS Platform setup..."
    echo ""
    
    check_prerequisites
    install_dependencies
    setup_environment
    start_docker_services
    setup_database
    build_applications
    show_completion
}

# Run main function
main "$@" 