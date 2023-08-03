import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl='http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}getusers`)
  }

  createUsers(user:User):Observable<User>{
    return this.http.post<User>(`${this.apiUrl}createuser`, user)
  }

  deleteUser(userId:string): Observable<User>{
    return this.http.delete<User>(`${this.apiUrl}deleteuser/${userId}`)
  }

  getUser(userId:string):Observable<User>{
    return this.http.get<User>(`${this.apiUrl}getuser/${userId}`)
  }
  updateUser(userId:string, user:User):Observable<User>{
    return this.http.put<User>(`${this.apiUrl}updateuser/${userId}`,user)
  }
}
