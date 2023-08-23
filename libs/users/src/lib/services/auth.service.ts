import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl='http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  login(email:string, password:string):Observable<User>{
    return this.http.post<User>(`${this.apiUrl}login`, {email,password})
  }
}
