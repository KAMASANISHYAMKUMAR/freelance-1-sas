import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

// Define an interface for the update payload, including optional password
interface UserUpdateRequest extends Partial<Omit<User, 'password'>> { // Omit password from User type
  password?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
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
                  class="border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-150"
                >
                  Attendance
                </a>
                <a routerLink="/profile" 
                  class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Profile
                </a>
                <a *ngIf="user?.role === 'admin'" routerLink="/user-management" 
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
            Your Profile
          </h1>
           <p class="mt-1 text-sm text-gray-600">View and edit your personal information and settings.</p>
        </header>

        <main class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="bg-white shadow-lg overflow-hidden sm:rounded-lg border border-gray-100">
            <div class="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
              <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900 flex items-center">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                  Personal Information
                </h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                  Your details. Click edit to make changes.
                </p>
              </div>
              <div>
                <button (click)="toggleEditMode()" type="button" 
                  class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 transform hover:scale-[1.02]"
                >
                   <svg *ngIf="!isEditMode" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                   <svg *ngIf="isEditMode" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {{ isEditMode ? 'Cancel Edit' : 'Edit Profile' }}
                </button>
              </div>
            </div>

            <!-- View Mode -->
            <div *ngIf="!isEditMode" class="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl class="sm:divide-y sm:divide-gray-200">
                <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Full name</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user?.firstName }} {{ user?.lastName }}</dd>
                </div>
                <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Email address</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user?.email }}</dd>
                </div>
                <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Role</dt>
                  <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">
                     <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                           [ngClass]="user?.role === 'admin' ? 'bg-red-100 text-red-800' : (user?.role === 'staff' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800')">
                        {{ user?.role }}
                      </span>
                  </dd>
                </div>
                <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Member since</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user?.createdAt ? (user?.createdAt | date:'longDate') : 'N/A' }}</dd>
                </div>
              </dl>
            </div>

            <!-- Edit Mode -->
            <div *ngIf="isEditMode" class="border-t border-gray-200 px-4 py-5 sm:px-6">
              <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
                <div class="space-y-6">
                  <!-- Error Message -->
                  <div *ngIf="errorMessage" class="bg-red-50 border-l-4 border-red-400 p-4 rounded-md mb-6 transition-opacity duration-300">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <p class="text-sm font-medium text-red-800">
                          {{ errorMessage }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Form Fields -->
                  <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                      <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First name</label>
                      <input type="text" id="firstName" formControlName="firstName" 
                        [ngClass]="{'border-red-300 focus:ring-red-500 focus:border-red-500': profileForm.get('firstName')?.invalid && profileForm.get('firstName')?.touched}"
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150"
                      />
                      <div *ngIf="profileForm.get('firstName')?.invalid && profileForm.get('firstName')?.touched" class="text-red-600 text-xs mt-1">
                        First name is required.
                      </div>
                    </div>

                    <div class="sm:col-span-3">
                      <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                      <input type="text" id="lastName" formControlName="lastName" 
                         [ngClass]="{'border-red-300 focus:ring-red-500 focus:border-red-500': profileForm.get('lastName')?.invalid && profileForm.get('lastName')?.touched}"
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150"
                      />
                      <div *ngIf="profileForm.get('lastName')?.invalid && profileForm.get('lastName')?.touched" class="text-red-600 text-xs mt-1">
                        Last name is required.
                      </div>
                    </div>

                    <div class="sm:col-span-4">
                      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                      <input type="email" id="email" formControlName="email" 
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                        readonly
                      />
                       <p class="mt-1 text-xs text-gray-500">Email address cannot be changed.</p>
                    </div>

                    <div class="sm:col-span-4">
                      <label for="password" class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input type="password" id="password" formControlName="password" 
                        [ngClass]="{'border-red-300 focus:ring-red-500 focus:border-red-500': profileForm.get('password')?.invalid && profileForm.get('password')?.touched}"
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150"
                        placeholder="Leave blank to keep current password"
                      />
                       <div *ngIf="profileForm.get('password')?.errors?.['minlength'] && profileForm.get('password')?.touched" class="text-red-600 text-xs mt-1">
                        New password must be at least 6 characters long.
                      </div>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button type="button" (click)="toggleEditMode()" 
                      class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                    >
                      Cancel
                    </button>
                    <button type="submit" [disabled]="profileForm.invalid || isSubmitting"
                      class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      <span *ngIf="!isSubmitting" class="flex items-center">
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        Save Changes
                      </span>
                      <span *ngIf="isSubmitting" class="flex items-center">
                        <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Attendance Stats (Keep simple for now) -->
          <div class="mt-8 bg-white shadow-lg overflow-hidden sm:rounded-lg border border-gray-100">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 class="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                   <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                 </svg>
                 Attendance Statistics
              </h3>
               <p class="mt-1 max-w-2xl text-sm text-gray-500">
                 A quick look at your attendance trends.
               </p>
            </div>
            <div class="px-4 py-5 sm:p-0">
               <dl class="sm:divide-y sm:divide-gray-200">
                 <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                   <dt class="text-sm font-medium text-gray-500">Current Month Attendance</dt>
                   <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                     <div class="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                       <div class="bg-indigo-600 h-2.5 rounded-full" [style.width.%]="95"></div> <!-- Mock Data -->
                     </div>
                     <span class="font-semibold">95%</span> <!-- Mock Data -->
                   </dd>
                 </div>
                 <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                   <dt class="text-sm font-medium text-gray-500">Total Present Days (Year)</dt>
                   <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">182</dd> <!-- Mock Data -->
                 </div>
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                   <dt class="text-sm font-medium text-gray-500">Total Absent Days (Year)</dt>
                   <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">10</dd> <!-- Mock Data -->
                 </div>
               </dl>
            </div>
             <div class="border-t border-gray-200">
               <a routerLink="/attendance" class="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:bg-gray-100 transition-colors duration-150">
                 View Detailed Attendance History
               </a>
             </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: []
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profileForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }], 
      password: ['', [Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        });
      }
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    this.errorMessage = '';
    if (!this.isEditMode && this.user) {
      this.profileForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: ''
      });
      this.profileForm.get('password')?.setErrors(null);
    } else {
       this.profileForm.get('password')?.reset('');
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    if (!this.user) {
       this.errorMessage = 'User data not found.';
       return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    // Use the specific UserUpdateRequest interface
    const updatedUserData: UserUpdateRequest = {
      id: this.user.id,
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      email: this.user.email, // Keep original email
      role: this.user.role // Keep original role
    };

    const newPassword = this.profileForm.value.password;
    if (newPassword) {
      updatedUserData.password = newPassword; // Add password if provided
    }

    // Cast the payload type for the service call if necessary, or ensure service accepts UserUpdateRequest
    this.userService.updateUser(updatedUserData as User).subscribe({ // Assuming updateUser might expect User type
      next: (updatedUser) => {
        this.isSubmitting = false;
        this.isEditMode = false;
        // Call the new public method in AuthService
        this.authService.updateCurrentUserState(updatedUser);
         // Optionally show success message
      },
      error: (error: any) => {
        this.isSubmitting = false;
        this.errorMessage = error.error?.message || 'Failed to update profile. Please try again.';
        console.error('Profile update error:', error);
      },
       complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
} 