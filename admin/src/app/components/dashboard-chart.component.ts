import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ title }}</h3>
      <div class="h-64 bg-gray-50 rounded flex items-center justify-center">
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <p class="text-gray-500 mb-2">{{ description }}</p>
          <p class="text-2xl font-bold text-gray-900">{{ value }}</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardChartComponent implements OnInit {
  @Input() title: string = 'Chart';
  @Input() description: string = 'Chart description';
  @Input() value: string = '0';

  ngOnInit() {
    // Initialize chart data
  }
} 