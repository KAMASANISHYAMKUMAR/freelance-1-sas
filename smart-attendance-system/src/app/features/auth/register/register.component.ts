import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-lg">
        <h2 class="text-center text-3xl font-extrabold text-indigo-900">
          Create your Smart Attendance account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Already have an account?
          <a routerLink="/auth/login" class="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-150">
            Sign in here
          </a>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div class="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-gray-100">
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
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
            
            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">
                  First name
                </label>
                <input id="firstName" name="firstName" type="text" formControlName="firstName" required 
                  [ngClass]="{'border-red-300 focus:ring-red-500 focus:border-red-500': registerForm.get('firstName')?.invalid && registerForm.get('firstName')?.touched}"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150"
                  placeholder="Jane"
                />
                <div *ngIf="registerForm.get('firstName')?.invalid && registerForm.get('firstName')?.touched" class="text-red-600 text-xs mt-1">
                  First name is required.
                </div>
              </div>

              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">
                  Last name
                </label>
                <input id="lastName" name="lastName" type="text" formControlName="lastName" required 
                  [ngClass]="{'border-red-300 focus:ring-red-500 focus:border-red-500': registerForm.get('lastName')?.invalid && registerForm.get('lastName')?.touched}"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150"
                  placeholder="Doe"
                />
                 <div *ngIf="registerForm.get('lastName')?.invalid && registerForm.get('lastName')?.touched" class="text-red-600 text-xs mt-1">
                  Last name is required.
                </div>
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div class="relative rounded-md shadow-sm">
                 <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input id="email" name="email" type="email" formControlName="email" required 
                  [ngClass]="{'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500': registerForm.get('email')?.invalid && registerForm.get('email')?.touched}"
                  class="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150"
                  placeholder="you@example.com"
                />
              </div>
              <div *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched" class="text-red-600 text-xs mt-1">
                Please enter a valid email address.
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
               <div class="relative rounded-md shadow-sm">
                 <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zM7 8a1 1 0 11-2 0 1 1 0 012 0zm5 0a1 1 0 11-2 0 1 1 0 012 0zm-9.11 4.083A5.99 5.99 0 002 14c0 1.657 2.686 3 6 3s6-1.343 6-3a5.99 5.99 0 00-.89-2.917A5.973 5.973 0 0012 13a5.973 5.973 0 00-5.11-1.917z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input id="password" name="password" type="password" formControlName="password" required
                  [ngClass]="{'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500': registerForm.get('password')?.invalid && registerForm.get('password')?.touched}"
                  class="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150"
                  placeholder="Must be at least 6 characters"
                />
              </div>
              <div *ngIf="registerForm.get('password')?.hasError('required') && registerForm.get('password')?.touched" class="text-red-600 text-xs mt-1">
                Password is required.
              </div>
               <div *ngIf="registerForm.get('password')?.hasError('minlength') && registerForm.get('password')?.touched" class="text-red-600 text-xs mt-1">
                Password must be at least 6 characters long.
              </div>
            </div>

            <div>
              <label for="role" class="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select id="role" name="role" formControlName="role" required
                 [ngClass]="{'border-red-300 focus:ring-red-500 focus:border-red-500': registerForm.get('role')?.invalid && registerForm.get('role')?.touched}"
                 class="appearance-none block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150"
              >
                <option value="" disabled>Select your role</option>
                <option value="student">Student</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
              <div *ngIf="registerForm.get('role')?.invalid && registerForm.get('role')?.touched" class="text-red-600 text-xs mt-1">
                Please select a role.
              </div>
            </div>

            <div>
              <button type="submit" [disabled]="registerForm.invalid || isLoading"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.01]"
              >
                 <span *ngIf="!isLoading" class="flex items-center">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                   </svg>
                   Create account
                 </span>
                 <span *ngIf="isLoading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const userData = this.registerForm.value;

    this.authService.register(userData).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        console.error('Registration error:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
} 