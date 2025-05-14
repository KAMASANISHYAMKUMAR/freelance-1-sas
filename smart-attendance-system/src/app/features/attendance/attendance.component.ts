import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AttendanceService } from '../../core/services/attendance.service';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { RecognitionStatus, Attendance } from '../../core/models/attendance.model';
import { User } from '../../core/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-attendance',
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
                  class="border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-150"
                >
                  Dashboard
                </a>
                <a routerLink="/attendance" 
                  class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Attendance
                </a>
                <a routerLink="/profile" 
                  class="border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-150"
                >
                  Profile
                </a>
                <a *ngIf="currentUser?.role === 'admin'" routerLink="/user-management" 
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
            Attendance Details
          </h1>
           <p class="mt-1 text-sm text-gray-600">Manage recognition service, upload your image, and view attendance history.</p>
        </header>

        <main class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- Left Column: Status & Image -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Recognition Status Card -->
              <section class="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div class="px-4 py-5 sm:p-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900 flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                    </svg>
                    Recognition Service Status
                  </h3>
                   <div [ngClass]="recognitionStatus?.active ? 'bg-teal-50 border-teal-200' : 'bg-yellow-50 border-yellow-200'" 
                         class="border-l-4 p-4 rounded-md mb-6">
                      <div class="flex items-center">
                        <div class="flex-shrink-0">
                          <svg *ngIf="recognitionStatus?.active" class="h-6 w-6 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <svg *ngIf="!recognitionStatus?.active" class="h-6 w-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <div class="ml-3">
                          <p [ngClass]="recognitionStatus?.active ? 'text-teal-700' : 'text-yellow-700'" class="text-sm font-medium">
                            {{ recognitionStatus?.message }}
                          </p>
                        </div>
                      </div>
                    </div>
                  
                  <!-- Admin Controls -->
                  <div *ngIf="currentUser?.role === 'admin' || currentUser?.role === 'staff'" class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <button (click)="toggleRecognition()" 
                      [ngClass]="recognitionStatus?.active ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'"
                      class="inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02]"
                    >
                      <svg *ngIf="recognitionStatus?.active" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> <path stroke-linecap="round" stroke-linejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 110 2H10a1 1 0 01-1-1z" />
                      </svg>
                      <svg *ngIf="!recognitionStatus?.active" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /> <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ recognitionStatus?.active ? 'Stop Service' : 'Start Service' }}
                    </button>
                    
                    <button (click)="markAttendance()" 
                      [disabled]="!recognitionStatus?.active"
                      [ngClass]="{'opacity-50 cursor-not-allowed': !recognitionStatus?.active}"
                      class="inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Mark Attendance Now
                    </button>
                  </div>
                </div>
              </section>

              <!-- Upload Image Section -->
               <section class="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div class="px-4 py-5 sm:p-6">
                   <h3 class="text-lg leading-6 font-medium text-gray-900 flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                    </svg>
                    Your Face Image for Recognition
                  </h3>
                  <div class="mt-5 flex flex-col sm:flex-row items-start">
                    <div class="flex-shrink-0 h-40 w-40 sm:h-48 sm:w-48 bg-gray-100 rounded-lg overflow-hidden shadow-inner border border-gray-200">
                      <img *ngIf="faceImageUrl" [src]="faceImageUrl" alt="Your face image" class="h-full w-full object-cover transition-opacity duration-300 hover:opacity-90">
                      <div *ngIf="!faceImageUrl" class="h-full w-full flex items-center justify-center bg-gray-50">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div class="mt-4 sm:mt-0 sm:ml-6 flex-1">
                      <p class="text-sm text-gray-600 mb-4">
                        Upload a clear, well-lit, frontal face image for the best recognition results. This image is used solely for attendance purposes.
                      </p>
                      <div class="space-y-3">
                        <div class="flex items-center">
                          <input #fileInput type="file" accept="image/*" class="hidden" (change)="onFileSelected($event)">
                          <button (click)="fileInput.click()" type="button" 
                            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
                          >
                            <svg class="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                            </svg>
                            {{ faceImageUrl ? 'Upload New Image' : 'Upload Image' }}
                          </button>
                        </div>
                        <!-- Upload Status Notifications -->
                        <div class="h-5">
                          <div *ngIf="isUploading" class="flex items-center text-sm text-indigo-600 animate-pulse">
                            <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading...
                          </div>
                          <div *ngIf="uploadSuccess" class="flex items-center text-sm text-green-600">
                            <svg class="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                            Image uploaded successfully!
                          </div>
                          <div *ngIf="uploadError" class="flex items-center text-sm text-red-600">
                            <svg class="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                            Upload failed. Please try again.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <!-- Right Column: Attendance History -->
            <div class="lg:col-span-1">
              <section class="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                 <h3 class="text-lg leading-6 font-medium text-gray-900 flex items-center px-4 py-5 sm:px-6 border-b border-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                    </svg>
                    Recent Attendance History
                  </h3>
                <div class="px-4 py-5 sm:p-0">
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <!-- Mock data - Replace with actual data -->
                        <tr class="hover:bg-gray-50 transition-colors duration-150">
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                             {{ today | date: 'mediumDate' }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            09:15 AM
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Present
                            </span>
                          </td>
                        </tr>
                        <tr class="hover:bg-gray-50 transition-colors duration-150">
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {{ yesterday | date: 'mediumDate' }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            09:05 AM
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Present
                            </span>
                          </td>
                        </tr>
                        <tr class="hover:bg-gray-50 transition-colors duration-150">
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {{ twoDaysAgo | date: 'mediumDate' }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                             09:30 AM
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Late
                            </span>
                          </td>
                        </tr>
                         <!-- Add more rows as needed -->
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>

          </div>
        </main>
      </div>
    </div>
  `,
  styles: []
})
export class AttendanceComponent implements OnInit, OnDestroy {
  recognitionStatus: RecognitionStatus | null = null;
  currentUser: User | null = null;
  currentUserAttendance: Attendance[] = [];
  faceImageUrl: string | null = null;
  isUploading = false;
  uploadSuccess = false;
  uploadError = false;
  
  // Date formatting for the attendance history
  today = new Date();
  yesterday = new Date(Date.now() - 86400000);
  twoDaysAgo = new Date(Date.now() - 172800000);
  
  private subscriptions: Subscription[] = [];

  constructor(
    private attendanceService: AttendanceService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const statusSub = this.attendanceService.recognitionStatus$.subscribe(status => {
      this.recognitionStatus = status;
    });
    this.subscriptions.push(statusSub);
    
    const userSub = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadFaceImage(user.email);
      }
    });
    this.subscriptions.push(userSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  toggleRecognition(): void {
    const action = this.recognitionStatus?.active ? this.attendanceService.stopRecognition() : this.attendanceService.startRecognition();
    action.subscribe({
      error: (error: Error) => {
        console.error(`Error ${this.recognitionStatus?.active ? 'stopping' : 'starting'} recognition:`, error);
        // Optionally show user feedback
      }
    });
  }

  markAttendance(): void {
    if (!this.currentUser?.id) {
      console.error('No user ID available');
      return;
    }

    const formData = new FormData();
    formData.append('userId', this.currentUser.id.toString());
    
    this.attendanceService.markAttendance(formData).subscribe({
      next: () => {
        console.log('Attendance marked successfully');
        this.loadUserAttendance();
      },
      error: (error: Error) => {
        console.error('Error marking attendance:', error);
      }
    });
  }

  private loadUserAttendance(): void {
    if (!this.currentUser?.id) return;
    
    this.attendanceService.getUserAttendance(this.currentUser.id).subscribe({
      next: (attendance: Attendance[]) => {
        this.currentUserAttendance = attendance;
      },
      error: (error: Error) => {
        console.error('Error loading user attendance:', error);
      }
    });
  }

  loadFaceImage(email: string): void {
    const imageSub = this.userService.getImage(email).subscribe({
      next: (blob: Blob) => {
        this.faceImageUrl = URL.createObjectURL(blob);
      },
      error: (error: Error) => {
        console.error('Error loading face image:', error);
        this.faceImageUrl = null;
      }
    });
    this.subscriptions.push(imageSub);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      if (file.type.startsWith('image/')) {
        this.uploadImage(file);
      } else {
        this.showUploadStatus(false, 'Please select an image file.');
      }
    }
  }

  uploadImage(file: File): void {
    this.isUploading = true;
    this.uploadSuccess = false;
    this.uploadError = false;
    
    if (!this.currentUser) {
      this.isUploading = false;
      this.showUploadStatus(false, 'User not logged in.');
      return;
    }

    const uploadSub = this.userService.uploadImage(this.currentUser.email, file).subscribe({
      next: () => {
        this.isUploading = false;
        this.showUploadStatus(true, 'Image uploaded successfully!');
        this.loadFaceImage(this.currentUser!.email); // Refresh image
      },
      error: (error: Error) => {
        console.error('Error uploading image:', error);
        this.isUploading = false;
        this.showUploadStatus(false, 'Upload failed. Please try again.');
      }
    });
     this.subscriptions.push(uploadSub);
  }

  private showUploadStatus(success: boolean, message: string): void {
    this.uploadSuccess = success;
    this.uploadError = !success;
    // Could potentially display the message string in the UI
    console.log(`Upload status: ${message}`); 
    setTimeout(() => {
        this.uploadSuccess = false;
        this.uploadError = false;
    }, 4000); // Clear status after 4 seconds
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
} 