import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  template: `
    <div class="p-6">
      <div class="card">
        <div class="card-header">
          <h1 class="text-2xl font-bold text-gray-900">Users Management</h1>
        </div>
        <div class="card-body">
          <p class="text-gray-600">
            Users management component will be implemented here.
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
export class UsersComponent {
  constructor() {}

  goToLanding() {
    window.location.href = '/';
  }
} 