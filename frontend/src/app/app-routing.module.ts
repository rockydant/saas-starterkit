import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'app',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'billing',
    loadChildren: () => import('./features/billing/billing.module').then(m => m.BillingModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 