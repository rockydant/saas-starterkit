import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div class="card">
          <div class="card-body">
            <p class="text-center text-gray-600">
              Login component will be implemented here.
            </p>
            <div class="mt-4 text-center">
              <p-button label="Go to Landing" (click)="goToLanding()"></p-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  constructor() {}

  goToLanding() {
    window.location.href = '/';
  }
} 