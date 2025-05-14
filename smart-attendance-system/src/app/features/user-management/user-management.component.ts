import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
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
                  class="border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-150"
                >
                  Profile
                </a>
                <a routerLink="/user-management" 
                  class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
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
          <div class="md:flex md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
              <h1 class="text-3xl font-bold leading-tight text-gray-900">
                User Management
              </h1>
              <p class="mt-1 text-sm text-gray-600">Manage users, roles, and permissions.</p>
            </div>
            <div class="mt-4 flex md:mt-0 md:ml-4">
              <button type="button" (click)="showAddUserModal = true"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 transform hover:scale-[1.02]"
              >
                <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                Add User
              </button>
            </div>
          </div>
        </header>

        <main class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <!-- Search and Filter Bar -->
          <div class="bg-white shadow-md rounded-lg p-4 mb-6 border border-gray-100">
            <div class="flex flex-col md:flex-row md:items-center md:space-x-4">
              <div class="relative flex-grow mb-4 md:mb-0">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input type="text" [(ngModel)]="searchQuery" (input)="filterUsers()"
                  placeholder="Search by name or email..."
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150"
                />
              </div>
              
              <div class="flex items-center space-x-2">
                 <select [(ngModel)]="roleFilter" (change)="filterUsers()"
                    class="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md transition-colors duration-150"
                  >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                    <option value="student">Student</option>
                  </select>
                  
                  <button (click)="resetFilters()" title="Reset Filters"
                    class="p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 transition-colors duration-150"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 00-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
              </div>
            </div>
          </div>
              
          <!-- Users Table Card -->
          <div class="bg-white shadow-xl overflow-hidden rounded-lg border border-gray-100">
             <div *ngIf="isLoading" class="flex justify-center items-center py-20">
               <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                 <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               <p class="ml-3 text-gray-600">Loading users...</p>
             </div>
             
             <div *ngIf="!isLoading && filteredUsers.length === 0" class="text-center py-20 px-6">
               <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
               </svg>
               <h3 class="mt-2 text-sm font-medium text-gray-900">No Users Found</h3>
               <p class="mt-1 text-sm text-gray-500">No users match your current search and filter criteria.</p>
             </div>
             
             <div *ngIf="!isLoading && filteredUsers.length > 0">
               <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                         <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Registered On
                         </th>
                        <th scope="col" class="relative px-6 py-3">
                          <span class="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr *ngFor="let user of displayedUsers" class="hover:bg-gray-50 transition-colors duration-150">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                              <span class="text-indigo-700 font-medium">{{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}</span>
                            </div>
                            <div class="ml-4">
                              <div class="text-sm font-medium text-gray-900">{{ user.firstName }} {{ user.lastName }}</div>
                              <div class="text-xs text-gray-500">ID: {{ user.id || 'N/A' }}</div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ user.email }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                                [ngClass]="user.role === 'admin' ? 'bg-red-100 text-red-800' : (user.role === 'staff' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800')">
                            {{ user.role }}
                          </span>
                        </td>
                         <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ user.createdAt ? (user.createdAt | date:'short') : 'N/A' }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                           <button (click)="openEditModal(user)" title="Edit User"
                              class="p-1 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-md transition-colors duration-150">
                             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button (click)="confirmDelete(user)" title="Delete User"
                            class="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors duration-150">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <!-- Pagination -->
                <div *ngIf="totalPages > 1" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <!-- Mobile Pagination -->
                  <div class="flex-1 flex justify-between sm:hidden">
                    <button (click)="goToPage(currentPage - 1)" [disabled]="currentPage === 1"
                      class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                      Previous
                    </button>
                    <button (click)="goToPage(currentPage + 1)" [disabled]="currentPage === totalPages"
                      class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                      Next
                    </button>
                  </div>
                  <!-- Desktop Pagination -->
                  <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p class="text-sm text-gray-700">
                        Showing
                        <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span>
                        to
                        <span class="font-medium">{{ Math.min(currentPage * pageSize, filteredUsers.length) }}</span>
                        of
                        <span class="font-medium">{{ filteredUsers.length }}</span>
                        results
                      </p>
                    </div>
                    <div>
                      <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button (click)="goToPage(currentPage - 1)" [disabled]="currentPage === 1"
                          class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150">
                          <span class="sr-only">Previous</span>
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                        </button>
                        
                        <ng-container *ngFor="let page of getPageNumbers()">
                          <button *ngIf="page !== '...'" (click)="goToPage(page)"
                            [attr.aria-current]="page === currentPage ? 'page' : null"
                            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors duration-150"
                            [ngClass]="page === currentPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'">
                            {{ page }}
                          </button>
                          <span *ngIf="page === '...'"
                            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            ...
                          </span>
                        </ng-container>
                        
                        <button (click)="goToPage(currentPage + 1)" [disabled]="currentPage === totalPages"
                          class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150">
                          <span class="sr-only">Next</span>
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </div> 
          </div>
        </main>
      </div>
      
      <!-- Add/Edit User Modal Placeholder (Implement actual modal later) -->
      <div *ngIf="showAddUserModal || showEditModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50 flex justify-center items-center">
        <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ showEditModal ? 'Edit User' : 'Add New User' }}</h3>
          <!-- Placeholder form -->
          <p class="text-gray-600">Form for {{ showEditModal ? ('editing ' + selectedUser?.email) : 'adding a new user' }} goes here.</p>
          <div class="mt-4 flex justify-end space-x-2">
            <button (click)="closeModal()" class="px-4 py-2 border rounded-md text-sm">Cancel</button>
            <button class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm">Save</button>
          </div>
        </div>
      </div>

       <!-- Delete Confirmation Modal Placeholder -->
      <div *ngIf="showDeleteConfirm" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50 flex justify-center items-center">
        <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Delete User
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Are you sure you want to delete the user {{ userToDelete?.email }}? This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button (click)="deleteUserConfirmed()" type="button" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
              Delete
            </button>
            <button (click)="cancelDelete()" type="button" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  displayedUsers: User[] = []; // Users for the current page

  searchQuery = '';
  roleFilter = '';
  isLoading = true;

  // Pagination state
  currentPage = 1;
  pageSize = 10; // Number of users per page
  totalPages = 1;
  Math = Math; // To use Math in template

  // Modal states
  showAddUserModal = false;
  showEditModal = false;
  selectedUser: User | null = null;
  showDeleteConfirm = false;
  userToDelete: User | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService, // Inject AuthService
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.filteredUsers = [...users];
        this.updateDisplayedUsers();
        this.isLoading = false;
      },
      error: (error: Error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
      }
    });
  }

  private updateDisplayedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedUsers = this.filteredUsers.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  filterUsers(): void {
    let tempUsers = this.users;

    // Filter by search query (name or email)
    if (this.searchQuery) {
      const lowerQuery = this.searchQuery.toLowerCase();
      tempUsers = tempUsers.filter(user => 
        user.firstName.toLowerCase().includes(lowerQuery) ||
        user.lastName.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery)
      );
    }

    // Filter by role
    if (this.roleFilter) {
      tempUsers = tempUsers.filter(user => user.role === this.roleFilter);
    }

    this.filteredUsers = tempUsers;
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.currentPage = 1; // Reset to first page after filtering
    this.updateDisplayedUsers();
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.roleFilter = '';
    this.filterUsers();
  }

  goToPage(page: number | string): void {
    if (typeof page === 'string') return; // Ignore '...'
    
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedUsers();
    }
  }

  getPageNumbers(): Array<number | string> {
    const pageNumbers: Array<number | string> = [];
    const maxPagesToShow = 5; // Adjust number of page links shown
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);

    if (this.totalPages <= maxPagesToShow) {
      for (let i = 1; i <= this.totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page
      pageNumbers.push(1);

      // Ellipsis after first page?
      if (this.currentPage > halfPagesToShow + 1) {
        pageNumbers.push('...');
      }

      // Middle pages
      const startPage = Math.max(2, this.currentPage - halfPagesToShow);
      const endPage = Math.min(this.totalPages - 1, this.currentPage + halfPagesToShow);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Ellipsis before last page?
      if (this.currentPage < this.totalPages - halfPagesToShow) {
        pageNumbers.push('...');
      }

      // Show last page
      pageNumbers.push(this.totalPages);
    }

    return pageNumbers;
  }

  // --- Modal Methods ---
  openEditModal(user: User): void {
    this.selectedUser = { ...user }; // Clone user to avoid modifying original object
    this.showEditModal = true;
    // TODO: Implement edit form logic inside the modal
  }

   showAddUser(): void {
     this.showAddUserModal = true;
      // TODO: Implement add form logic inside the modal
   }

  closeModal(): void {
    this.showAddUserModal = false;
    this.showEditModal = false;
    this.selectedUser = null;
  }

  confirmDelete(user: User): void {
    this.userToDelete = user;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.userToDelete = null;
  }

  deleteUserConfirmed(): void {
    if (!this.userToDelete) return;

    this.userService.deleteUser(this.userToDelete.email).subscribe({
      next: () => {
        console.log(`User ${this.userToDelete?.email} deleted successfully`);
        this.showDeleteConfirm = false;
        this.userToDelete = null;
        this.loadUsers(); // Refresh the user list
        // Optionally show success message
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        this.showDeleteConfirm = false;
        this.userToDelete = null;
        // Optionally show error message
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
} 