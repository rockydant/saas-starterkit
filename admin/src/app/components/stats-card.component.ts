import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="p-3 rounded-full" [ngClass]="iconBgClass">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" [innerHTML]="iconSvg"></svg>
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-600">{{ label }}</p>
          <p class="text-2xl font-semibold text-gray-900">{{ value }}</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class StatsCardComponent {
  @Input() label: string = 'Label';
  @Input() value: string = '0';
  @Input() iconSvg: string = '';
  @Input() iconBgClass: string = 'bg-blue-100 text-blue-600';
} 