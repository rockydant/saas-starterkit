import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <aside class="w-64 bg-gray-800 min-h-screen">
      <nav class="mt-5 px-2">
        <a href="/dashboard" class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
          Dashboard
        </a>
        <a href="/users" class="mt-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
          Users
        </a>
        <a href="/billing" class="mt-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
          Billing
        </a>
        <a href="/settings" class="mt-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
          Settings
        </a>
      </nav>
    </aside>
  `
})
export class SidebarComponent { } 