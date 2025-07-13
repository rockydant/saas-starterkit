import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Welcome back! Please sign in to continue.
          </p>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg border border-gray-200">
          <div class="px-8 py-6">
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <!-- Email Field -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  [class.border-red-500]="isFieldInvalid('email')"
                />
                <div *ngIf="isFieldInvalid('email')" class="mt-1 text-sm text-red-600">
                  <span *ngIf="loginForm.get('email')?.errors?.['required']">Email is required</span>
                  <span *ngIf="loginForm.get('email')?.errors?.['email']">Please enter a valid email</span>
                </div>
              </div>

              <!-- Password Field -->
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  formControlName="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  [class.border-red-500]="isFieldInvalid('password')"
                />
                <div *ngIf="isFieldInvalid('password')" class="mt-1 text-sm text-red-600">
                  <span *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</span>
                  <span *ngIf="loginForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</span>
                </div>
              </div>

              <!-- Remember Me & Forgot Password -->
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div class="text-sm">
                  <a href="#" class="font-medium text-blue-600 hover:text-blue-500" (click)="forgotPassword()">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <!-- Submit Button -->
              <div>
                <button
                  type="submit"
                  [disabled]="loginForm.invalid || isLoading"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span *ngIf="!isLoading">Sign in</span>
                  <span *ngIf="isLoading" class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                </button>
              </div>

              <!-- Sign Up Link -->
              <div class="text-center">
                <p class="text-sm text-gray-600">
                  Don't have an account?
                  <a href="#" class="font-medium text-blue-600 hover:text-blue-500" (click)="goToRegister()">
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    
    try {
      // TODO: Implement actual authentication service call
      const { email, password } = this.loginForm.value;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any valid email/password
      if (email && password) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login successful!'
        });
        
        // Navigate to dashboard
        this.router.navigate(['/dashboard']);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid email or password. Please try again.'
      });
    } finally {
      this.isLoading = false;
    }
  }

  forgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  goToLanding() {
    this.router.navigate(['/']);
  }
} 