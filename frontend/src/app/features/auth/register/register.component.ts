import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Join us and start building amazing things together.
          </p>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg border border-gray-200">
          <div class="px-8 py-6">
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <!-- First Name Field -->
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  formControlName="firstName"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your first name"
                  [class.border-red-500]="isFieldInvalid('firstName')"
                />
                <div *ngIf="isFieldInvalid('firstName')" class="mt-1 text-sm text-red-600">
                  <span *ngIf="registerForm.get('firstName')?.errors?.['required']">First name is required</span>
                </div>
              </div>

              <!-- Last Name Field -->
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  formControlName="lastName"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your last name"
                  [class.border-red-500]="isFieldInvalid('lastName')"
                />
                <div *ngIf="isFieldInvalid('lastName')" class="mt-1 text-sm text-red-600">
                  <span *ngIf="registerForm.get('lastName')?.errors?.['required']">Last name is required</span>
                </div>
              </div>

              <!-- Email Field -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                  [class.border-red-500]="isFieldInvalid('email')"
                />
                <div *ngIf="isFieldInvalid('email')" class="mt-1 text-sm text-red-600">
                  <span *ngIf="registerForm.get('email')?.errors?.['required']">Email is required</span>
                  <span *ngIf="registerForm.get('email')?.errors?.['email']">Please enter a valid email</span>
                </div>
              </div>

              <!-- Organization Name Field -->
              <div>
                <label for="tenantName" class="block text-sm font-medium text-gray-700 mb-2">
                  Organization Name
                </label>
                <input
                  id="tenantName"
                  type="text"
                  formControlName="tenantName"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your organization name"
                  [class.border-red-500]="isFieldInvalid('tenantName')"
                />
                <div *ngIf="isFieldInvalid('tenantName')" class="mt-1 text-sm text-red-600">
                  <span *ngIf="registerForm.get('tenantName')?.errors?.['required']">Organization name is required</span>
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Create a password"
                  [class.border-red-500]="isFieldInvalid('password')"
                />
                <div *ngIf="isFieldInvalid('password')" class="mt-1 text-sm text-red-600">
                  <span *ngIf="registerForm.get('password')?.errors?.['required']">Password is required</span>
                  <span *ngIf="registerForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</span>
                </div>
              </div>

              <!-- Confirm Password Field -->
              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  formControlName="confirmPassword"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Confirm your password"
                  [class.border-red-500]="isFieldInvalid('confirmPassword')"
                />
                <div *ngIf="isFieldInvalid('confirmPassword')" class="mt-1 text-sm text-red-600">
                  <span *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">Please confirm your password</span>
                  <span *ngIf="registerForm.get('confirmPassword')?.errors?.['passwordMismatch']">Passwords do not match</span>
                </div>
              </div>

              <!-- Terms and Conditions -->
              <div class="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  formControlName="acceptTerms"
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label for="terms" class="ml-2 block text-sm text-gray-900">
                  I agree to the
                  <a href="#" class="font-medium text-green-600 hover:text-green-500">Terms of Service</a>
                  and
                  <a href="#" class="font-medium text-green-600 hover:text-green-500">Privacy Policy</a>
                </label>
              </div>
              <div *ngIf="registerForm.get('acceptTerms')?.invalid && registerForm.get('acceptTerms')?.touched" class="text-sm text-red-600">
                You must accept the terms and conditions
              </div>

              <!-- Submit Button -->
              <div>
                <button
                  type="submit"
                  [disabled]="registerForm.invalid || isLoading"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span *ngIf="!isLoading">Create Account</span>
                  <span *ngIf="isLoading" class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                </button>
              </div>

              <!-- Sign In Link -->
              <div class="text-center">
                <p class="text-sm text-gray-600">
                  Already have an account?
                  <a href="#" class="font-medium text-green-600 hover:text-green-500" (click)="goToLogin()">
                    Sign in
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
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tenantName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    
    try {
      // TODO: Implement actual registration service call
      const formData = this.registerForm.value;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any valid form
      if (formData.email && formData.password) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Account created successfully! Welcome aboard!'
        });
        
        // Navigate to dashboard
        this.router.navigate(['/dashboard']);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Registration failed. Please try again.'
      });
    } finally {
      this.isLoading = false;
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  goToLanding() {
    this.router.navigate(['/']);
  }
} 