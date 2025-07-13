import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: AppComponent },
  { path: '**', redirectTo: '' }
]; 