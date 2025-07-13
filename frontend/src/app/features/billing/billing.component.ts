import { Component } from '@angular/core';

@Component({
  selector: 'app-billing',
  template: `
    <div class="p-6">
      <div class="bg-white rounded-xl shadow-lg border border-gray-200">
        <div class="px-6 py-4 border-b border-gray-200">
          <h1 class="text-2xl font-bold text-gray-900">Billing & Payments</h1>
        </div>
        <div class="px-6 py-4">
          <p class="text-gray-600">
            Billing and payments component will be implemented here.
          </p>
          <div class="mt-4">
            <p-button label="Go to Landing" (click)="goToLanding()"></p-button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BillingComponent {
  constructor() {}

  goToLanding() {
    window.location.href = '/';
  }
} 