import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { RecognitionStatus } from '../models/attendance.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private readonly API_URL = environment.apiUrl;
  
  private recognitionStatusSubject = new BehaviorSubject<RecognitionStatus>({
    active: false,
    message: 'Recognition service is not running'
  });
  
  public recognitionStatus$ = this.recognitionStatusSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUserAttendance(userId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/attendance/${userId}`);
  }

  markAttendance(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/attendance/mark`, formData).pipe(
      catchError(error => {
        console.error('Error marking attendance:', error);
        return of({ success: false, error: error.message });
      })
    );
  }

  startRecognition(): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/start-recognition`, {}).pipe(
      tap(() => {
        this.recognitionStatusSubject.next({
          active: true,
          message: 'Recognition service is running'
        });
      }),
      catchError(error => {
        console.error('Error starting recognition:', error);
        this.recognitionStatusSubject.next({
          active: false,
          message: 'Failed to start recognition service'
        });
        return of({ success: false, error: error.message });
      })
    );
  }

  stopRecognition(): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/stop-recognition`, {}).pipe(
      tap(() => {
        this.recognitionStatusSubject.next({
          active: false, 
          message: 'Recognition service has been stopped'
        });
      }),
      catchError(error => {
        console.error('Error stopping recognition:', error);
        return of({ success: false, error: error.message });
      })
    );
  }

  // Update status based on operations
  updateStatus(active: boolean, message: string): void {
    this.recognitionStatusSubject.next({ active, message });
  }
} 