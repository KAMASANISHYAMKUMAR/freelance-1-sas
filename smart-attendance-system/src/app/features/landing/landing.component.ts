import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      <!-- Enhanced Hero Section -->
      <header class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-100 to-blue-200 opacity-30 blur-3xl"></div>
        <div class="relative container mx-auto px-6 pt-20 pb-32 text-center z-10">
          <h1 class="text-5xl md:text-6xl font-extrabold text-indigo-900 mb-6 leading-tight tracking-tight">
            Smart Attendance System
          </h1>
          <p class="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
            Streamline attendance tracking with our cutting-edge facial recognition technology.
            Accurate, efficient, and effortlessly integrated.
          </p>
          <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              routerLink="/auth/login" 
              class="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In
            </a>
            <a 
              routerLink="/auth/register" 
              class="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white hover:bg-gray-100 text-indigo-600 font-semibold border border-indigo-300 shadow-sm transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Register
            </a>
          </div>
        </div>
      </header>

      <!-- Enhanced Features Section -->
      <section class="container mx-auto px-6 py-20 -mt-16 relative z-20">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">Why Choose Smart Attendance?</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature Card 1 -->
          <div class="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-indigo-200 transform hover:-translate-y-1">
            <div class="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-center text-gray-900 mb-3">Seamless Facial Recognition</h3>
            <p class="text-gray-600 text-center text-sm leading-relaxed">
              Utilizes advanced AI for quick and accurate identification, minimizing errors and saving time.
            </p>
          </div>
          
          <!-- Feature Card 2 -->
          <div class="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-indigo-200 transform hover:-translate-y-1">
            <div class="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-center text-gray-900 mb-3">Insightful Analytics</h3>
            <p class="text-gray-600 text-center text-sm leading-relaxed">
              Gain valuable insights with real-time reports and dashboards visualizing attendance trends.
            </p>
          </div>
          
          <!-- Feature Card 3 -->
          <div class="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-indigo-200 transform hover:-translate-y-1">
            <div class="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-inner">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-center text-gray-900 mb-3">Secure & Scalable</h3>
            <p class="text-gray-600 text-center text-sm leading-relaxed">
              Built with robust security features and designed to scale with your organization's needs.
            </p>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-50 py-10 mt-16 border-t border-gray-200">
        <div class="container mx-auto px-6 text-center text-gray-500 text-sm">
          <p>&copy; {{ currentYear }} Smart Attendance System. All rights reserved.</p>
          <p class="mt-2">Built with Angular & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  `,
  styles: []
})
export class LandingComponent {
  currentYear = new Date().getFullYear();
} 