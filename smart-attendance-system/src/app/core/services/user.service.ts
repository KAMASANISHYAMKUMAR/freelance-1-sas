import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/users`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/user?email=${email}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/user`, user);
  }

  deleteUser(email: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/user?email=${email}`);
  }

  uploadImage(email: string, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('email', email);
    
    return this.http.post<any>(`${this.API_URL}/image`, formData);
  }

  getImage(email: string): Observable<Blob> {
    return this.http.get(`${this.API_URL}/image?email=${email}`, { responseType: 'blob' });
  }
} 