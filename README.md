# SaaS Multi-Tenant Platform

A comprehensive, production-ready SaaS platform built with NestJS backend, Angular frontend, and admin dashboard for managing multi-tenant applications with complete tenant, user, role, and subscription management.

## 🚀 Features

### Backend (NestJS)
- **Multi-tenant Architecture**: Complete tenant isolation with subdomain-based routing
- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Complete user lifecycle management with role assignment
- **Tenant Management**: Full CRUD operations for tenant administration
- **Billing & Payments**: Stripe integration for subscription management
- **Email System**: Transactional emails with templates
- **File Upload**: AWS S3 integration for file storage
- **Rate Limiting**: API protection with configurable limits
- **Queue Management**: Background job processing with Bull/Redis
- **API Documentation**: Swagger/OpenAPI documentation
- **Database**: PostgreSQL with TypeORM
- **Caching**: Redis for session and data caching

### Frontend (Angular)
- **Modern UI**: Tailwind CSS with PrimeNG components
- **Responsive Design**: Mobile-first approach
- **Landing Page**: Beautiful, modern landing page with hero, features, pricing, and CTA sections
- **Authentication**: Login, registration, password reset
- **Dashboard**: Analytics and metrics visualization
- **User Management**: Profile, settings, preferences
- **Billing Portal**: Subscription management and payment history
- **Real-time Updates**: WebSocket integration
- **PWA Ready**: Service worker for offline capabilities

### Admin Dashboard
- **Modern UI**: Tailwind CSS with clean, professional interface
- **Tenant Management**: Create, edit, suspend tenants with full CRUD operations
- **User Administration**: Manage users across all tenants with role assignment
- **Billing Overview**: Revenue tracking and subscription management
- **Analytics**: Platform-wide metrics and insights with stats cards and charts
- **System Monitoring**: Health checks and performance metrics
- **Content Management**: Global content and settings

## 🏗️ Architecture

```
SaaS-StarterKit/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── modules/        # Feature modules
│   │   │   ├── tenants/    # Tenant management
│   │   │   ├── users/      # User management
│   │   │   ├── billing/    # Subscription & billing
│   │   │   └── auth/       # Authentication
│   │   ├── common/         # Shared utilities
│   │   ├── config/         # Configuration files
│   │   └── database/       # Migrations and seeds
├── frontend/               # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── features/   # Feature modules
│   │   │   ├── shared/     # Shared components
│   │   │   ├── core/       # Core services
│   │   │   └── landing/    # Landing page component
│   │   └── assets/         # Static assets
├── admin/                  # Admin dashboard
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Dashboard components
│   │   │   └── features/   # Admin features
├── shared/                 # Shared types and utilities
└── docker-compose.yml      # Development environment
```

## 🛠️ Technology Stack

### Backend
- **Framework**: NestJS 10.x
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **ORM**: TypeORM
- **Cache**: Redis
- **Queue**: Bull
- **Payment**: Stripe
- **Email**: Nodemailer
- **File Storage**: AWS S3
- **Authentication**: JWT + Passport
- **Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: Angular 17
- **Language**: TypeScript
- **Styling**: Tailwind CSS (exclusively)
- **UI Components**: PrimeNG
- **Charts**: Chart.js
- **State Management**: NgRx (optional)
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router

### Admin Dashboard
- **Framework**: Angular 17
- **Styling**: Tailwind CSS (exclusively)
- **UI Components**: PrimeNG
- **Charts**: Chart.js integration ready

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Database**: PostgreSQL
- **Cache**: Redis
- **Email Testing**: MailHog

## 📋 Prerequisites

- Node.js 18+ 
- npm 9+
- Docker & Docker Compose
- PostgreSQL (for production)
- Redis (for production)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd SaaS-StarterKit
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

### 3. Environment Setup
```bash
# Copy environment files
cp backend/env.example backend/.env
cp frontend/src/environments/environment.example.ts frontend/src/environments/environment.ts
cp admin/src/environments/environment.example.ts admin/src/environments/environment.ts
```

### 4. Start Development Environment

#### Option A: Start All Services Together
```bash
# Start Docker services (PostgreSQL, Redis, MailHog)
docker-compose up -d

# Start all applications
npm run dev
```

#### Option B: Start Services Individually (Recommended for Development)
```bash
# Start Docker services first
docker-compose up -d

# Terminal 1: Start Backend
cd backend
npm run start:dev

# Terminal 2: Start Frontend
cd frontend
npm start

# Terminal 3: Start Admin Dashboard
cd admin
npm start
```

### 5. Access Applications
- **Frontend**: http://localhost:4200 (Landing page)
- **Admin Dashboard**: http://localhost:4201
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api/docs
- **MailHog**: http://localhost:8025

### 6. Development Tips

#### Individual Service Management
```bash
# Backend only
npm run dev:backend

# Frontend only
npm run dev:frontend

# Admin only
npm run dev:admin

# Docker services only
npm run docker:up
npm run docker:down
```

#### Troubleshooting Individual Services
```bash
# Check if backend is responding
curl http://localhost:3000/api/v1/auth/health

# Check if frontend is running
curl http://localhost:4200

# Check if admin is running
curl http://localhost:4201

# View Docker logs
docker-compose logs -f
```

## ✅ Current Status

**All services are running successfully:**

- ✅ **Backend (NestJS)**: Running on http://localhost:3000
  - API endpoints available at `/api/v1/*`
  - Database connected with clean schema
  - All modules loaded successfully
  - Swagger documentation available
  - Complete multi-tenant management APIs

- ✅ **Frontend**: Running on http://localhost:4200
  - Modern landing page with Tailwind CSS
  - Responsive design with hero, features, pricing sections
  - Placeholder components for all features (login, register, dashboard, users, billing, settings)
  - PrimeNG components integrated with Tailwind styling

- ✅ **Admin Dashboard**: Running on http://localhost:4201
  - Clean, professional admin interface
  - Stats cards and dashboard charts
  - Sidebar navigation with icons
  - Recent activity feed
  - Fully responsive design

- ✅ **Database**: PostgreSQL running with clean schema
  - All tables created successfully
  - TypeORM synchronization working
  - Ready for data

## 🎨 UI/UX Features

### Frontend Landing Page
- **Hero Section**: Eye-catching headline with CTA buttons
- **Features Section**: Highlighted platform capabilities
- **Pricing Section**: Clear plan comparison
- **Call-to-Action**: Engaging user conversion elements
- **Footer**: Professional branding and links

### Admin Dashboard
- **Sidebar Navigation**: Clean navigation with icons
- **Stats Cards**: Key metrics with colored icons
- **Dashboard Charts**: Analytics visualization placeholders
- **Recent Activity**: Real-time activity feed
- **Responsive Design**: Works on all screen sizes

### Styling
- **Tailwind CSS**: Used exclusively across all applications
- **PrimeNG Integration**: Components styled with Tailwind utilities
- **Consistent Design**: Unified design language across frontend and admin
- **Modern Aesthetics**: Clean, professional appearance

## 🏢 Multi-Tenant Management

### Tenant Management
- **Create Tenants**: Set up new organizations with subdomains
- **Update Tenant Details**: Modify name, description, settings
- **Manage Tenant Status**: Activate, suspend, or cancel tenants
- **Plan Management**: Upgrade/downgrade tenant plans
- **View Tenant Users**: See all users for a specific tenant
- **View Tenant Subscriptions**: Track billing for each tenant

### User Management
- **Create Users**: Add new users to tenants
- **Update User Details**: Modify profile information
- **Role Management**: Assign SUPER_ADMIN, ADMIN, USER, VIEWER roles
- **Status Management**: Activate, suspend, or deactivate users
- **Tenant-Specific Users**: View users for specific tenants
- **User Statistics**: Track user growth and activity

### Subscription & Billing Management
- **Create Subscriptions**: Set up billing for tenants
- **Manage Subscription Status**: Active, cancelled, past due, trial
- **Billing Cycles**: Monthly and yearly subscriptions
- **Revenue Tracking**: Monthly and yearly revenue analytics
- **Plan Management**: Free, Basic, Professional, Enterprise plans
- **Stripe Integration**: Webhook handling for payment processing

### Role-Based Access Control
**User Roles:**
- **SUPER_ADMIN**: Full platform access, can manage all tenants
- **ADMIN**: Tenant administrator, can manage users within their tenant
- **USER**: Regular tenant user with standard permissions
- **VIEWER**: Read-only access to tenant data

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Application
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:4200
ADMIN_URL=http://localhost:4201

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=saas_user
DB_PASSWORD=saas_password
DB_NAME=saas_platform

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@saasplatform.com

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name
```

### Frontend Configuration
Update `frontend/src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1',
  stripePublishableKey: 'pk_test_...',
};
```

## 📊 Database Setup

The database is automatically set up when you start the application. TypeORM will:

1. **Create all tables** based on entity definitions
2. **Set up relationships** between entities
3. **Create indexes** for optimal performance
4. **Initialize enums** for status and role fields

### Database Schema
- **Users**: User management with roles and tenant association
- **Tenants**: Multi-tenant organization management
- **Subscriptions**: Billing and subscription tracking
- **Base Entity**: Common fields (id, timestamps, soft delete)

## 🔐 Authentication

### User Roles
- **SUPER_ADMIN**: Platform owner with full access
- **ADMIN**: Tenant administrator
- **USER**: Regular tenant user
- **VIEWER**: Read-only access

### JWT Tokens
- Access tokens expire in 7 days
- Refresh tokens for seamless authentication
- Secure token storage in HTTP-only cookies

## 💳 Billing & Payments

### Stripe Integration
- Subscription management
- Payment processing
- Webhook handling
- Invoice generation
- Tax calculation

### Plans
- **FREE**: Basic features, limited usage
- **BASIC**: Core features, moderate usage
- **PROFESSIONAL**: Advanced features, high usage
- **ENTERPRISE**: Full features, unlimited usage

## 🚀 Development

### Available Scripts

```bash
# Development
npm run dev                    # Start all services
npm run dev:backend           # Start backend only
npm run dev:frontend          # Start frontend only
npm run dev:admin             # Start admin only

# Docker
npm run docker:up             # Start Docker services
npm run docker:down           # Stop Docker services
npm run docker:logs           # View Docker logs

# Database
npm run db:reset              # Reset database
npm run db:migrate            # Run migrations
npm run db:seed               # Seed data

# Build
npm run build                 # Build all applications
npm run build:backend         # Build backend
npm run build:frontend        # Build frontend
npm run build:admin           # Build admin
```

### API Endpoints

The backend provides comprehensive API endpoints for multi-tenant management:

#### Tenant Management
- `GET /api/v1/tenants` - Get all tenants
- `GET /api/v1/tenants/:id` - Get tenant by ID
- `POST /api/v1/tenants` - Create new tenant
- `PUT /api/v1/tenants/:id` - Update tenant
- `DELETE /api/v1/tenants/:id` - Delete tenant
- `PUT /api/v1/tenants/:id/status` - Update tenant status
- `PUT /api/v1/tenants/:id/plan` - Update tenant plan
- `GET /api/v1/tenants/:id/users` - Get users for tenant
- `GET /api/v1/tenants/:id/subscriptions` - Get subscriptions for tenant
- `GET /api/v1/tenants/stats/overview` - Get tenant statistics

#### User Management
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create new user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user
- `PUT /api/v1/users/:id/role` - Update user role
- `PUT /api/v1/users/:id/status` - Update user status
- `GET /api/v1/users/tenant/:tenantId` - Get users for tenant
- `GET /api/v1/users/stats/overview` - Get user statistics

#### Billing Management
- `GET /api/v1/billing/subscriptions` - Get all subscriptions
- `GET /api/v1/billing/subscriptions/:id` - Get subscription by ID
- `POST /api/v1/billing/subscriptions` - Create new subscription
- `PUT /api/v1/billing/subscriptions/:id` - Update subscription
- `DELETE /api/v1/billing/subscriptions/:id` - Cancel subscription
- `PUT /api/v1/billing/subscriptions/:id/status` - Update subscription status
- `GET /api/v1/billing/tenants/:tenantId/subscriptions` - Get tenant subscriptions
- `GET /api/v1/billing/stats/overview` - Get billing statistics
- `GET /api/v1/billing/revenue/monthly` - Get monthly revenue
- `GET /api/v1/billing/revenue/yearly` - Get yearly revenue
- `GET /api/v1/billing/plans` - Get available plans

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 4200, 4201 are available
2. **Database connection**: Check if PostgreSQL is running in Docker
3. **Node modules**: Run `npm install` in each directory if needed
4. **Docker issues**: Restart Docker and run `docker-compose down && docker-compose up -d`
5. **Tailwind CSS issues**: Ensure all components use Tailwind classes only
6. **Service startup issues**: Use individual service startup for debugging

### Debugging Individual Services

If `npm run dev` fails, start services individually to identify the problem:

```bash
# 1. Start Docker services
docker-compose up -d

# 2. Test Backend
cd backend
npm run start:dev
# Check: http://localhost:3000/api/v1/auth/health

# 3. Test Frontend (in new terminal)
cd frontend
npm start
# Check: http://localhost:4200

# 4. Test Admin (in new terminal)
cd admin
npm start
# Check: http://localhost:4201
```

### Reset Everything

```bash
# Stop all services
npm run docker:down
pkill -f "nest start"
pkill -f "ng serve"

# Reset database
docker volume rm saas-starterkit_postgres_data

# Restart
docker-compose up -d
npm run dev
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation at http://localhost:3000/api/docs 