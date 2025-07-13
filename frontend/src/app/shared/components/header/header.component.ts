import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">SaaS Platform</h1>
          </div>
          
          <!-- User Menu -->
          <div class="flex items-center space-x-4" *ngIf="authService.isAuthenticated()">
            <div class="relative user-menu-container">
              <button 
                (click)="toggleUserMenu()"
                class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
              >
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-medium">
                    {{ getInitials() }}
                  </span>
                </div>
                <span class="hidden md:block text-sm font-medium">
                  {{ currentUser?.firstName }} {{ currentUser?.lastName }}
                </span>
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
                  <div class="font-medium">{{ currentUser?.email }}</div>
                  <div class="text-gray-500 capitalize">{{ currentUser?.role?.toLowerCase() }}</div>
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
          
          <!-- Login/Register buttons for unauthenticated users -->
          <div class="flex items-center space-x-4" *ngIf="!authService.isAuthenticated()">
            <button 
              (click)="navigateToLogin()"
              class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign in
            </button>
            <button 
              (click)="navigateToRegister()"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  currentUser: User | null = null;
  showUserMenu = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser.subscribe((user: User | null) => {
      this.currentUser = user;
    });
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

  getInitials(): string {
    if (!this.currentUser) return '';
    const firstName = this.currentUser.firstName || '';
    const lastName = this.currentUser.lastName || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }

  navigateToProfile(event: Event): void {
    event.preventDefault();
    this.showUserMenu = false;
    this.router.navigate(['/profile']);
  }

  navigateToSettings(event: Event): void {
    event.preventDefault();
    this.showUserMenu = false;
    this.router.navigate(['/settings']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.showUserMenu = false;
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Logout error:', error);
        // Even if backend call fails, clear local storage
        this.authService.logout();
        this.router.navigate(['/']);
      }
    });
  }
} 