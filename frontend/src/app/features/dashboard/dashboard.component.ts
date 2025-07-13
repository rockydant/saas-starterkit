import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="p-6">
      <div class="card">
        <div class="card-header">
          <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <div class="card-body">
          <p class="text-gray-600">
            Dashboard component will be implemented here with charts and analytics.
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
export class DashboardComponent {
  constructor() {}

  goToLanding() {
    window.location.href = '/';
  }
} 