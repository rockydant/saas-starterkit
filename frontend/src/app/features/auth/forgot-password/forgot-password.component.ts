import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg border border-gray-200">
          <div class="px-8 py-6">
            <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <!-- Email Field -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email address"
                  [class.border-red-500]="isFieldInvalid('email')"
                />
                <div *ngIf="isFieldInvalid('email')" class="mt-1 text-sm text-red-600">
                  <span *ngIf="forgotPasswordForm.get('email')?.errors?.['required']">Email is required</span>
                  <span *ngIf="forgotPasswordForm.get('email')?.errors?.['email']">Please enter a valid email</span>
                </div>
              </div>

              <!-- Submit Button -->
              <div>
                <button
                  type="submit"
                  [disabled]="forgotPasswordForm.invalid || isLoading"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span *ngIf="!isLoading">Send Reset Link</span>
                  <span *ngIf="isLoading" class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                </button>
              </div>

              <!-- Back to Login -->
              <div class="text-center">
                <p class="text-sm text-gray-600">
                  Remember your password?
                  <a href="#" class="font-medium text-purple-600 hover:text-purple-500" (click)="goToLogin()">
                    Back to login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>

        <!-- Success Message -->
        <div *ngIf="emailSent" class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">
                Reset link sent!
              </p>
              <p class="mt-1 text-sm text-green-700">
                We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  emailSent = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.forgotPasswordForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  async onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    
    try {
      // TODO: Implement actual forgot password service call
      const { email } = this.forgotPasswordForm.value;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, accept any valid email
      if (email) {
        this.emailSent = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Password reset link has been sent to your email!'
        });
        
        // Reset form
        this.forgotPasswordForm.reset();
      } else {
        throw new Error('Failed to send reset link');
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to send reset link. Please try again.'
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