import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Loading Spinner -->
      <ngx-spinner
        bdColor="rgba(0, 0, 0, 0.8)"
        size="medium"
        color="#3b82f6"
        type="ball-clip-rotate"
        [fullScreen]="true"
      >
        <p style="color: white">Loading...</p>
      </ngx-spinner>

      <!-- Toast Messages -->
      <p-toast position="top-right"></p-toast>
      <p-confirmDialog></p-confirmDialog>

      <!-- Header -->
      <app-header *ngIf="showHeader"></app-header>

      <!-- Main Content -->
      <div class="flex">
        <!-- Sidebar -->
        <app-sidebar *ngIf="showSidebar"></app-sidebar>

        <!-- Page Content -->
        <main class="flex-1 min-h-screen">
          <div class="p-6">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>

      <!-- Footer -->
      <app-footer *ngIf="showFooter"></app-footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `],
  providers: [MessageService, ConfirmationService],
})
export class AppComponent implements OnInit {
  showHeader = true;
  showSidebar = true;
  showFooter = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen to route changes to show/hide layout components
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateLayoutVisibility(event.url);
      });
  }

  private updateLayoutVisibility(url: string) {
    // Hide header and sidebar for auth pages
    if (url.includes('/auth')) {
      this.showHeader = false;
      this.showSidebar = false;
      this.showFooter = false;
    } else {
      this.showHeader = true;
      this.showSidebar = true;
      this.showFooter = true;
    }
  }
} 