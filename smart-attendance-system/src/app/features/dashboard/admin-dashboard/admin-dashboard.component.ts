import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <!-- Navbar -->
      <nav class="bg-white shadow-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <h1 class="text-xl font-bold text-indigo-600">Smart Attendance</h1>
              </div>
              <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a routerLink="/dashboard" 
                  class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </a>
                <a routerLink="/profile" 
                  class="border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-150"
                >
                  Profile
                </a>
                <a routerLink="/user-management" 
                  class="border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-150"
                >
                  User Management
                </a>
              </div>
            </div>
            <div class="flex items-center">
              <button (click)="logout()" title="Logout" class="p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150">
                <span class="sr-only">Logout</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div class="py-10">
        <header class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">
            Admin Dashboard
          </h1>
          <p class="mt-1 text-sm text-gray-600">Manage users and system settings.</p>
        </header>

        <main class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <!-- Stats Section -->
          <section>
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4 px-4 sm:px-0">User Statistics</h3>
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <!-- Total Users Card -->
              <div class="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                      <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21H9v-1a6 6 0 016-6v6z" />
                      </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                        <dd class="flex items-baseline">
                          <div class="text-2xl font-semibold text-gray-900">{{ totalUsers }}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Staff Count Card -->
              <div class="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                      <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Staff Members</dt>
                        <dd>
                          <div class="text-2xl font-semibold text-gray-900">{{ staffCount }}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Students Count Card -->
              <div class="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                      <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Students</dt>
                        <dd>
                          <div class="text-2xl font-semibold text-gray-900">{{ studentCount }}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Quick Actions Section -->
          <section class="mt-8">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4 px-4 sm:px-0">Quick Actions</h3>
            <div class="bg-white shadow-lg rounded-lg border border-gray-100">
              <div class="px-4 py-5 sm:p-6">
                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <a routerLink="/user-management" [queryParams]="{ action: 'add', type: 'staff' }"
                    class="inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 transform hover:scale-[1.02]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Add Staff Member
                  </a>
                  
                  <a routerLink="/user-management" [queryParams]="{ action: 'add', type: 'student' }"
                    class="inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 transform hover:scale-[1.02]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Add Student
                  </a>

                  <a routerLink="/user-management"
                    class="inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200 transform hover:scale-[1.02]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21H9v-1a6 6 0 016-6v6z" />
                    </svg>
                    Manage Users
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!-- Recent User Activity -->
          <section class="mt-8">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4 px-4 sm:px-0">Recent User Activity</h3>
            <div class="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
              <div class="px-4 py-5 sm:p-6">
                <div class="flow-root">
                  <ul role="list" class="-my-5 divide-y divide-gray-200">
                    <li *ngIf="recentUsers.length === 0" class="py-4 text-center text-gray-500">No recent user activity.</li>
                    <li *ngFor="let user of recentUsers" class="py-4 hover:bg-gray-50 transition-colors duration-150">
                      <div class="flex items-center space-x-4 px-2">
                        <div class="flex-shrink-0">
                          <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span class="text-sm font-medium text-indigo-700">
                              {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
                            </span>
                          </div>
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900 truncate">
                            {{ user.firstName }} {{ user.lastName }}
                          </p>
                          <p class="text-sm text-gray-500 truncate">
                            {{ user.email }}
                          </p>
                        </div>
                        <div>
                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                [ngClass]="user.role === 'admin' ? 'bg-red-100 text-red-800' : (user.role === 'staff' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800')">
                            {{ user.role | titlecase }}
                          </span>
                        </div>
                        <div>
                          <a routerLink="/profile" [queryParams]="{ email: user.email }" class="inline-flex items-center shadow-sm px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-150">
                            View
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="mt-6 border-t border-gray-200">
                  <a routerLink="/user-management" class="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:bg-gray-100 transition-colors duration-150">
                    View all users
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  `,
  styles: []
})
export class AdminDashboardComponent implements OnInit {
  totalUsers = 0;
  staffCount = 0;
  studentCount = 0;
  recentUsers: User[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.totalUsers = users.length;
        this.staffCount = users.filter((u: User) => u.role === 'staff').length;
        this.studentCount = users.filter((u: User) => u.role === 'student').length;
        this.recentUsers = users.slice(-5).reverse();
      },
      error: (error: Error) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
} 