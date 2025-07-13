import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Set new password
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Enter your new password below.
          </p>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg border border-gray-200">
          <div class="px-8 py-6">
            <form [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <!-- New Password Field -->
              <div>
                <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  formControlName="newPassword"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your new password"
                  [class.border-red-500]="isFieldInvalid('newPassword')"
                />
                <div *ngIf="isFieldInvalid('newPassword')" class="mt-1 text-sm text-red-600">
                  <span *ngIf="resetPasswordForm.get('newPassword')?.errors?.['required']">Password is required</span>
                  <span *ngIf="resetPasswordForm.get('newPassword')?.errors?.['minlength']">Password must be at least 6 characters</span>
                </div>
              </div>

              <!-- Confirm Password Field -->
              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  formControlName="confirmPassword"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Confirm your new password"
                  [class.border-red-500]="isFieldInvalid('confirmPassword')"
                />
                <div *ngIf="isFieldInvalid('confirmPassword')" class="mt-1 text-sm text-red-600">
                  <span *ngIf="resetPasswordForm.get('confirmPassword')?.errors?.['required']">Please confirm your password</span>
                  <span *ngIf="resetPasswordForm.get('confirmPassword')?.errors?.['passwordMismatch']">Passwords do not match</span>
                </div>
              </div>

              <!-- Submit Button -->
              <div>
                <button
                  type="submit"
                  [disabled]="resetPasswordForm.invalid || isLoading"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span *ngIf="!isLoading">Reset Password</span>
                  <span *ngIf="isLoading" class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resetting...
                  </span>
                </button>
              </div>

              <!-- Back to Login -->
              <div class="text-center">
                <p class="text-sm text-gray-600">
                  Remember your password?
                  <a href="#" class="font-medium text-orange-600 hover:text-orange-500" (click)="goToLogin()">
                    Back to login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>

        <!-- Success Message -->
        <div *ngIf="passwordReset" class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">
                Password reset successful!
              </p>
              <p class="mt-1 text-sm text-green-700">
                Your password has been updated. You can now sign in with your new password.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  isLoading = false;
  passwordReset = false;
  resetToken: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    // Get token from URL parameters
    this.route.queryParams.subscribe(params => {
      this.resetToken = params['token'] || '';
      if (!this.resetToken) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid reset link. Please request a new password reset.'
        });
        this.router.navigate(['/auth/forgot-password']);
      }
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.resetPasswordForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  async onSubmit() {
    if (this.resetPasswordForm.invalid || !this.resetToken) {
      return;
    }

    this.isLoading = true;
    
    try {
      // TODO: Implement actual reset password service call
      const { newPassword } = this.resetPasswordForm.value;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, accept any valid password
      if (newPassword) {
        this.passwordReset = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Password has been reset successfully!'
        });
        
        // Reset form
        this.resetPasswordForm.reset();
        
        // Redirect to login after a delay
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 3000);
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to reset password. Please try again.'
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