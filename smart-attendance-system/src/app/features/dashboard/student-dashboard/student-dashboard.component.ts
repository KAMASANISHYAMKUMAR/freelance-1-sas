import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AttendanceService } from '../../../core/services/attendance.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-student-dashboard',
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
                <a routerLink="/attendance" 
                  class="border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-150"
                >
                  Attendance
                </a>
                <a routerLink="/profile" 
                  class="border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-150"
                >
                  Profile
                </a>
                 <!-- Student doesn't see User Management -->
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
            Welcome, {{ currentUser?.firstName }}!
          </h1>
          <p class="mt-1 text-sm text-gray-600">Your personal attendance dashboard.</p>
        </header>

        <main class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <!-- Recognition Status -->
          <section class="mb-8">
            <div [ngClass]="recognitionStatus ? 'bg-teal-50 border-teal-200' : 'bg-yellow-50 border-yellow-200'" 
                 class="border-l-4 p-4 rounded-md shadow-sm">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg *ngIf="recognitionStatus" class="h-6 w-6 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg *ngIf="!recognitionStatus" class="h-6 w-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p [ngClass]="recognitionStatus ? 'text-teal-700' : 'text-yellow-700'" class="text-sm font-medium">
                    {{ recognitionStatus ? 'Attendance system is ACTIVE. Be visible to the camera.' : 'Attendance system is currently INACTIVE.' }}
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <!-- Stats Cards -->
          <section class="mb-8">
             <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4 px-4 sm:px-0">Your Stats</h3>
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <!-- Today's Status Card -->
              <div class="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                       <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Today's Status</dt>
                        <dd>
                          <div class="text-2xl font-semibold text-gray-900">Present</div> 
                          <!-- Replace with actual data -->
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Attendance This Month Card -->
              <div class="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div class="p-5">
                   <div class="flex items-center">
                    <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Attendance (This Month)</dt>
                        <dd>
                          <div class="text-2xl font-semibold text-gray-900">95%</div> 
                          <!-- Replace with actual data -->
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Last Check-in Card -->
              <div class="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
                       <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                       </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Last Check-in</dt>
                        <dd>
                          <div class="text-lg font-semibold text-gray-900">Today, 9:15 AM</div> 
                          <!-- Replace with actual data -->
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Recent Attendance History Table -->
           <section class="mt-8">
             <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4 px-4 sm:px-0">Recent History</h3>
            <div class="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
              <div class="px-4 py-5 sm:p-0">
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Check-in Time
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <!-- Mock data - Replace with actual data loop -->
                      <tr class="hover:bg-gray-50 transition-colors duration-150">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {{ today }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          9:15 AM
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Present
                          </span>
                        </td>
                      </tr>
                      <tr class="hover:bg-gray-50 transition-colors duration-150">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                           {{ yesterday }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          9:05 AM
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Present
                          </span>
                        </td>
                      </tr>
                       <tr class="hover:bg-gray-50 transition-colors duration-150">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                           {{ twoDaysAgo }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          -
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Absent
                          </span>
                        </td>
                      </tr>
                      <!-- End Mock Data -->
                    </tbody>
                  </table>
                </div>
                 <div class="border-t border-gray-200">
                  <a routerLink="/attendance" class="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:bg-gray-100 transition-colors duration-150">
                    View full attendance history
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
export class StudentDashboardComponent implements OnInit {
  currentUser: User | null = null;
  recognitionStatus = false;
  
  // For demo data
  today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  twoDaysAgo = new Date(Date.now() - 172800000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  constructor(
    private authService: AuthService,
    private attendanceService: AttendanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    
    this.attendanceService.recognitionStatus$.subscribe(status => {
      this.recognitionStatus = status.active;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
} 