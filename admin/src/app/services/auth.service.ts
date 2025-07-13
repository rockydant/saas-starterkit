import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  user: AdminUser;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private currentUserSubject: BehaviorSubject<AdminUser | null>;
  public currentUser: Observable<AdminUser | null>;
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AdminUser | null>(
      this.getUserFromStorage()
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AdminUser | null {
    return this.currentUserSubject.value;
  }

  public get token(): string | null {
    return localStorage.getItem('admin_access_token');
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(map(response => {
        // Store user details and token in local storage
        localStorage.setItem('admin_access_token', response.access_token);
        localStorage.setItem('admin_current_user', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
        return response;
      }));
  }

  logout(): Observable<any> {
    const token = this.token;
    const headers: { [key: string]: string } = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Call backend logout endpoint
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, { headers }).pipe(
      map(() => {
        // Remove user from local storage and set current user to null
        this.clearAuthData();
        return { message: 'Logged out successfully' };
      })
    );
  }

  // Separate method to clear auth data without calling backend
  clearAuthData(): void {
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_current_user');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getUserProfile(): Observable<AdminUser> {
    return this.http.get<AdminUser>(`${this.apiUrl}/auth/profile`);
  }

  private getUserFromStorage(): AdminUser | null {
    const userStr = localStorage.getItem('admin_current_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  // Helper method to check if user has specific role
  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    return user ? user.role === role : false;
  }

  // Helper method to check if user is admin
  isAdmin(): boolean {
    return this.hasRole('admin') || this.hasRole('super_admin');
  }

  // Helper method to check if user is super admin
  isSuperAdmin(): boolean {
    return this.hasRole('super_admin');
  }
} 