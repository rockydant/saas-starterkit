import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="flex items-center justify-center h-32">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  `
})
export class LoadingComponent { } 