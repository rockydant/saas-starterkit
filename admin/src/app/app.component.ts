import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm border-b">
        <div class="container mx-auto px-4 py-4">
          <h1 class="text-2xl font-bold text-gray-900">SaaS Admin Dashboard</h1>
        </div>
      </header>
      
      <main class="container mx-auto px-4 py-8">
        <div class="card">
          <h2 class="text-xl font-semibold mb-4">Welcome to Admin Dashboard</h2>
          <p class="text-gray-600">
            This is the admin dashboard for the SaaS platform. 
            Backend API is running and ready for integration.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div class="card">
            <h3 class="text-lg font-medium mb-2">Users</h3>
            <p class="text-gray-600">Manage platform users</p>
          </div>
          
          <div class="card">
            <h3 class="text-lg font-medium mb-2">Tenants</h3>
            <p class="text-gray-600">Manage tenant organizations</p>
          </div>
          
          <div class="card">
            <h3 class="text-lg font-medium mb-2">Billing</h3>
            <p class="text-gray-600">Handle payments and subscriptions</p>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'saas-admin';
} 