import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <h1 class="text-xl font-bold text-blue-600">Smart Attendance</h1>
              </div>
              <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a routerLink="/dashboard" 
                  class="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </a>
                
                <a routerLink="/attendance" 
                  class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Attendance
                </a>
                
                <a routerLink="/profile" 
                  class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Profile
                </a>
                
                <a *ngIf="currentUser?.role === 'admin'" routerLink="/user-management" 
                  class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  User Management
                </a>
              </div>
            </div>
            
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <button (click)="logout()" type="button" 
                  class="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="py-10">
        <header>
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold leading-tight text-gray-900">
              Welcome, {{ currentUser?.firstName }}!
            </h1>
          </div>
        </header>
        <main>
          <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="px-4 py-8 sm:px-0">
              <div *ngIf="currentUser?.role === 'admin'" class="mt-4">
                <a routerLink="/dashboard/admin" class="block w-full py-4 px-6 text-center font-medium rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors">
                  Go to Admin Dashboard
                </a>
              </div>

              <div *ngIf="currentUser?.role === 'staff'" class="mt-4">
                <a routerLink="/dashboard/staff" class="block w-full py-4 px-6 text-center font-medium rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors">
                  Go to Staff Dashboard
                </a>
              </div>

              <div *ngIf="currentUser?.role === 'student'" class="mt-4">
                <a routerLink="/dashboard/student" class="block w-full py-4 px-6 text-center font-medium rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors">
                  Go to Student Dashboard
                </a>
              </div>
              
              <div class="bg-white shadow rounded-lg mt-8">
                <div class="px-4 py-5 sm:p-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Quick Summary
                  </h3>
                  <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div class="bg-blue-50 overflow-hidden shadow rounded-lg">
                      <div class="px-4 py-5 sm:p-6">
                        <dl>
                          <dt class="text-sm font-medium text-gray-500 truncate">
                            Today's Status
                          </dt>
                          <dd class="mt-1 text-3xl font-semibold text-blue-600">
                            Present
                          </dd>
                        </dl>
                      </div>
                    </div>

                    <div class="bg-green-50 overflow-hidden shadow rounded-lg">
                      <div class="px-4 py-5 sm:p-6">
                        <dl>
                          <dt class="text-sm font-medium text-gray-500 truncate">
                            This Month's Attendance
                          </dt>
                          <dd class="mt-1 text-3xl font-semibold text-green-600">
                            95%
                          </dd>
                        </dl>
                      </div>
                    </div>

                    <div class="bg-purple-50 overflow-hidden shadow rounded-lg">
                      <div class="px-4 py-5 sm:p-6">
                        <dl>
                          <dt class="text-sm font-medium text-gray-500 truncate">
                            System Status
                          </dt>
                          <dd class="mt-1 text-3xl font-semibold text-purple-600">
                            Active
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: ``
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      
      if (user) {
        // Redirect based on role if on the main dashboard
        /*
        if (this.router.url === '/dashboard') {
          switch (user.role) {
            case 'admin':
              this.router.navigate(['/dashboard/admin']);
              break;
            case 'staff':
              this.router.navigate(['/dashboard/staff']);
              break;
            case 'student':
              this.router.navigate(['/dashboard/student']);
              break;
          }
        }
        */
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
} 