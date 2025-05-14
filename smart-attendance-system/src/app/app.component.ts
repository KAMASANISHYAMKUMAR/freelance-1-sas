import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <router-outlet></router-outlet>
    
    <!-- API Connection Error -->
    <div *ngIf="apiConnectionError" 
      class="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-md flex items-center"
      role="alert">
      <div class="flex items-center">
        <svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
        </svg>
        <div>
          <p class="font-bold">API Connection Error</p>
          <p class="text-sm">Unable to connect to the backend services. Please check your connection.</p>
        </div>
      </div>
      <button (click)="apiConnectionError = false" class="ml-4">
        <svg class="fill-current h-5 w-5" role="button" viewBox="0 0 20 20">
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
        </svg>
      </button>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'smart-attendance-system';
  apiConnectionError = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Test API connection
    this.checkApiConnection();
  }

  private checkApiConnection(): void {
    this.http.get(`${environment.apiUrl}/hello`, { responseType: 'text' })
      .pipe(
        catchError(error => {
          console.error('API Connection Error:', error);
          this.apiConnectionError = true;
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          console.log('API Connection Successful:', response);
          this.apiConnectionError = false;
        },
        error: (error) => {
          console.error('API Connection Error:', error);
          this.apiConnectionError = true;
        }
      });
  }
}
