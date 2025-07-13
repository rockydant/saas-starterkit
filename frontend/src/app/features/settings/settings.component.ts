import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  template: `
    <div class="p-6">
      <div class="card">
        <div class="card-header">
          <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
        <div class="card-body">
          <p class="text-gray-600">
            Settings component will be implemented here.
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
export class SettingsComponent {
  constructor() {}

  goToLanding() {
    window.location.href = '/';
  }
} 