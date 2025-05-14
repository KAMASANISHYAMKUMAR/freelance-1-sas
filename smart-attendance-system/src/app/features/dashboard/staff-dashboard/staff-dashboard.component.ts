import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AttendanceService } from '../../../core/services/attendance.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { Router } from '@angular/router';

interface Attendance {
  status: 'present' | 'absent' | 'late';
  timestamp: string;
}

@Component({
  selector: 'app-staff-dashboard',
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
            Staff Dashboard
          </h1>
          <p class="mt-1 text-sm text-gray-600">Manage your attendance and view student records.</p>
        </header>

        <main class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <!-- Stats Section -->
          <section>
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4 px-4 sm:px-0">Attendance Overview</h3>
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <!-- Students Present Card -->
              <div class="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Students Present Today</dt>
                        <dd>
                          <div class="text-2xl font-semibold text-gray-900">{{ studentsPresent }}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Attendance Percentage Card -->
              <div class="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                      <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Attendance Percentage</dt>
                        <dd>
                          <div class="text-2xl font-semibold text-gray-900">{{ attendancePercentage }}%</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Your Attendance Status Card -->
              <div class="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 rounded-md p-3" [ngClass]="currentUserAttendance?.status === 'present' ? 'bg-teal-500' : 'bg-yellow-500'">
                      <svg *ngIf="currentUserAttendance?.status === 'present'" class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <svg *ngIf="currentUserAttendance?.status !== 'present'" class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Your Status</dt>
                        <dd>
                          <div class="text-2xl font-semibold text-gray-900">{{ currentUserAttendance?.status || 'Not Marked' }}</div>
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
                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <button (click)="openCameraModal()"
                    [disabled]="isMarkingAttendance"
                    [ngClass]="{'opacity-50 cursor-not-allowed': isMarkingAttendance}"
                    class="inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ isMarkingAttendance ? 'Marking Attendance...' : 'Mark Attendance' }}
                  </button>
                  
                  <a routerLink="/attendance"
                    class="inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    View Attendance History
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!-- Recent Student List -->
          <section class="mt-8">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4 px-4 sm:px-0">Recent Students</h3>
            <div class="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
              <div class="px-4 py-5 sm:p-6">
                <div class="flow-root">
                  <ul role="list" class="-my-5 divide-y divide-gray-200">
                    <li *ngIf="recentStudents.length === 0" class="py-4 text-center text-gray-500">No students found.</li>
                    <li *ngFor="let student of recentStudents" class="py-4 hover:bg-gray-50 transition-colors duration-150">
                      <div class="flex items-center space-x-4 px-2">
                        <div class="flex-shrink-0">
                          <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span class="text-sm font-medium text-indigo-700">
                              {{ student.firstName.charAt(0) }}{{ student.lastName.charAt(0) }}
                            </span>
                          </div>
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900 truncate">
                            {{ student.firstName }} {{ student.lastName }}
                          </p>
                          <p class="text-sm text-gray-500 truncate">
                            {{ student.email }}
                          </p>
                        </div>
                        <div>
                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Student
                          </span>
                        </div>
                        <div>
                          <a routerLink="/profile" [queryParams]="{ email: student.email }" class="inline-flex items-center shadow-sm px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-150">
                            View
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="mt-6 border-t border-gray-200">
                  <a routerLink="/attendance" class="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:bg-gray-100 transition-colors duration-150">
                    View all attendance records
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <!-- Camera Modal -->
      <div *ngIf="showCameraModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Mark Attendance
                  </h3>
                  <div class="mt-4">
                    <div class="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                      <video #videoElement class="w-full h-full object-cover" autoplay playsinline></video>
                      <canvas #canvasElement class="hidden"></canvas>
                    </div>
                    <div class="mt-4 flex justify-center">
                      <button (click)="captureImage()" 
                        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Capture Image
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" (click)="closeCameraModal()" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class StaffDashboardComponent implements OnInit {
  studentsPresent = 0;
  attendancePercentage = 0;
  recentStudents: User[] = [];
  currentUser: User | null = null;
  currentUserAttendance: Attendance | null = null;
  isMarkingAttendance = false;
  showCameraModal = false;
  private videoStream: MediaStream | null = null;

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  constructor(
    private userService: UserService,
    private attendanceService: AttendanceService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadUserAttendance();
      }
    });
  }

  private loadDashboardData(): void {
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.recentStudents = users.filter((u: User) => u.role === 'student').slice(-5).reverse();
        this.calculateAttendanceStats();
      },
      error: (error: Error) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }

  private loadUserAttendance(): void {
    if (!this.currentUser?.id) return;
    
    this.attendanceService.getUserAttendance(this.currentUser.id).subscribe({
      next: (attendance: Attendance) => {
        this.currentUserAttendance = attendance;
      },
      error: (error: Error) => {
        console.error('Error loading user attendance:', error);
      }
    });
  }

  private calculateAttendanceStats(): void {
    // This would be replaced with actual API calls
    this.studentsPresent = Math.floor(Math.random() * 50) + 20;
    this.attendancePercentage = Math.floor((this.studentsPresent / 100) * 100);
  }

  async openCameraModal(): Promise<void> {
    this.showCameraModal = true;
    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (this.videoElement?.nativeElement) {
        this.videoElement.nativeElement.srcObject = this.videoStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      // Show error message to user
    }
  }

  closeCameraModal(): void {
    this.showCameraModal = false;
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = null;
    }
  }

  captureImage(): void {
    if (!this.videoElement?.nativeElement || !this.canvasElement?.nativeElement || !this.currentUser?.id) return;

    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob
    canvas.toBlob(async (blob) => {
      if (!blob || !this.currentUser?.id) return;

      this.isMarkingAttendance = true;
      try {
        const formData = new FormData();
        formData.append('image', blob, 'attendance.jpg');
        formData.append('userId', this.currentUser.id.toString());

        const response = await this.attendanceService.markAttendance(formData).toPromise();
        this.currentUserAttendance = response;
        this.closeCameraModal();
      } catch (error) {
        console.error('Error marking attendance:', error);
        // Show error message to user
      } finally {
        this.isMarkingAttendance = false;
      }
    }, 'image/jpeg');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
} 