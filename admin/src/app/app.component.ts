import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StatsCardComponent } from './components/stats-card.component';
import { DashboardChartComponent } from './components/dashboard-chart.component';
import { AdminAuthService, AdminUser } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, StatsCardComponent, DashboardChartComponent],
  template: `
    <div class="flex h-screen bg-gray-100">
      <!-- Login Form (when not authenticated) -->
      <div *ngIf="!authService.isAuthenticated()" class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
          <div>
            <div class="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Dashboard
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
              Sign in to access the admin panel
            </p>
          </div>
          
          <form class="mt-8 space-y-6" (ngSubmit)="onLoginSubmit()">
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email" class="sr-only">Email address</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  [(ngModel)]="loginCredentials.email"
                  required 
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                  placeholder="Email address"
                >
              </div>
              <div>
                <label for="password" class="sr-only">Password</label>
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  [(ngModel)]="loginCredentials.password"
                  required 
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                  placeholder="Password"
                >
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                [disabled]="isLoginLoading"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg class="h-5 w-5 text-blue-500 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </span>
                {{ isLoginLoading ? 'Signing in...' : 'Sign in' }}
              </button>
            </div>

            <div *ngIf="loginErrorMessage" class="text-red-600 text-sm text-center">
              {{ loginErrorMessage }}
            </div>
          </form>
        </div>
      </div>

      <!-- Dashboard (when authenticated) -->
      <div *ngIf="authService.isAuthenticated()" class="flex h-screen bg-gray-100">
        <!-- Sidebar -->
        <div class="w-64 bg-white shadow-lg">
          <div class="flex items-center justify-center h-16 bg-blue-600">
            <h1 class="text-white text-xl font-bold">Saikai Admin</h1>
          </div>
          
          <nav class="mt-8">
            <div class="px-4 space-y-2">
              <a href="#" class="flex items-center px-4 py-2 text-gray-700 bg-blue-50 border-r-4 border-blue-500 rounded-r-lg">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
                </svg>
                Dashboard
              </a>
              
              <a href="#" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700 rounded-lg">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
                Users
              </a>
              
              <a href="#" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700 rounded-lg">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                Tenants
              </a>
              
              <a href="#" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700 rounded-lg">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
                Billing
              </a>
              
              <a href="#" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700 rounded-lg">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Analytics
              </a>
              
              <a href="#" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700 rounded-lg">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Settings
              </a>
            </div>
          </nav>
        </div>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
          <!-- Top Navigation -->
          <header class="bg-white shadow-sm border-b">
            <div class="flex items-center justify-between px-6 py-4">
              <div>
                <h2 class="text-2xl font-bold text-gray-900">Dashboard</h2>
                <p class="text-sm text-gray-600">Welcome back, {{ currentUser?.firstName || 'Admin' }}</p>
              </div>
              
              <div class="flex items-center space-x-4">
                <button class="p-2 text-gray-400 hover:text-gray-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </button>
                
                <!-- User Menu (when authenticated) -->
                <div class="relative user-menu-container">
                  <button 
                    (click)="toggleUserMenu()"
                    class="flex items-center space-x-3 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
                  >
                    <img class="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User avatar">
                    <span class="text-sm font-medium">{{ currentUser?.firstName || 'Admin' }} {{ currentUser?.lastName || 'User' }}</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  <!-- Dropdown Menu -->
                  <div 
                    *ngIf="showUserMenu"
                    class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                  >
                    <div class="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      <div class="font-medium">{{ currentUser?.email || 'admin&#64;saasplatform.com' }}</div>
                      <div class="text-gray-500">{{ currentUser?.role || 'Super Admin' }}</div>
                    </div>
                    
                    <a 
                      href="#" 
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      (click)="navigateToProfile($event)"
                    >
                      Profile
                    </a>
                    
                    <a 
                      href="#" 
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      (click)="navigateToSettings($event)"
                    >
                      Settings
                    </a>
                    
                    <div class="border-t border-gray-100"></div>
                    
                    <button 
                      (click)="logout()"
                      class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <!-- Main Content Area -->
          <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div class="container mx-auto px-6 py-8">
              <!-- Stats Cards -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <app-stats-card 
                  label="Total Users" 
                  value="1,234"
                  iconSvg="<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'></path>"
                  iconBgClass="bg-blue-100 text-blue-600">
                </app-stats-card>

                <app-stats-card 
                  label="Active Tenants" 
                  value="89"
                  iconSvg="<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'></path>"
                  iconBgClass="bg-green-100 text-green-600">
                </app-stats-card>

                <app-stats-card 
                  label="Revenue" 
                  value="$45,678"
                  iconSvg="<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'></path>"
                  iconBgClass="bg-yellow-100 text-yellow-600">
                </app-stats-card>

                <app-stats-card 
                  label="Growth" 
                  value="+12.5%"
                  iconSvg="<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'></path>"
                  iconBgClass="bg-purple-100 text-purple-600">
                </app-stats-card>
              </div>

              <!-- Charts Section -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <app-dashboard-chart 
                  title="User Growth" 
                  description="User growth over time"
                  value="+15% this month">
                </app-dashboard-chart>

                <app-dashboard-chart 
                  title="Revenue Analytics" 
                  description="Revenue trends and insights"
                  value="$12,450 this month">
                </app-dashboard-chart>
              </div>

              <!-- Recent Activity -->
              <div class="bg-white rounded-lg shadow">
                <div class="px-6 py-4 border-b border-gray-200">
                  <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
                </div>
                <div class="p-6">
                  <div class="space-y-4">
                    <div class="flex items-center space-x-4">
                      <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900">New tenant registered</p>
                        <p class="text-sm text-gray-500">Acme Corp joined the platform</p>
                      </div>
                      <span class="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    
                    <div class="flex items-center space-x-4">
                      <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900">Payment received</p>
                        <p class="text-sm text-gray-500">$299.00 from TechStart Inc</p>
                      </div>
                      <span class="text-sm text-gray-500">4 hours ago</span>
                    </div>
                    
                    <div class="flex items-center space-x-4">
                      <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900">Subscription upgraded</p>
                        <p class="text-sm text-gray-500">Global Solutions upgraded to Pro plan</p>
                      </div>
                      <span class="text-sm text-gray-500">6 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'saas-admin';
  showUserMenu = false;
  currentUser: AdminUser | null = null;
  
  // Login properties
  loginCredentials = {
    email: '',
    password: ''
  };
  isLoginLoading = false;
  loginErrorMessage = '';

  constructor(
    public router: Router,
    public authService: AdminAuthService
  ) {
    this.authService.currentUser.subscribe((user: AdminUser | null) => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    // Initialize any dashboard data
    console.log('AppComponent initialized');
    console.log('Is authenticated:', this.authService.isAuthenticated());
    console.log('Current user:', this.currentUser);
    console.log('Token:', this.authService.token);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu-container')) {
      this.showUserMenu = false;
    }
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  navigateToProfile(event: Event): void {
    event.preventDefault();
    this.showUserMenu = false;
    // Navigate to profile page
  }

  navigateToSettings(event: Event): void {
    event.preventDefault();
    this.showUserMenu = false;
    // Navigate to settings page
  }

  navigateToLogin(): void {
    // Just reload the page to reset the state
    window.location.reload();
  }

  onLoginSubmit(): void {
    if (!this.loginCredentials.email || !this.loginCredentials.password) {
      this.loginErrorMessage = 'Please enter both email and password';
      return;
    }

    this.isLoginLoading = true;
    this.loginErrorMessage = '';

    this.authService.login(this.loginCredentials).subscribe({
      next: (response) => {
        this.isLoginLoading = false;
        console.log('Login successful:', response);
        // Login successful, the template will automatically show the dashboard
      },
      error: (error) => {
        this.isLoginLoading = false;
        console.error('Login error:', error);
        this.loginErrorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }

  logout(): void {
    console.log('Logout button clicked');
    console.log('Current auth state:', this.authService.isAuthenticated());
    console.log('Current token:', this.authService.token);
    
    // Clear authentication data
    this.authService.clearAuthData();
    this.showUserMenu = false;
    
    // Reload the page to reset the application state
    window.location.reload();
  }
} 