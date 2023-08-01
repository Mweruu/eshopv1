import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { User } from './models/users';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [CommonModule],
})
export class UsersModule {
constructor(private http:HttpClient){}

getUsers(){
  return this.http.get('http://localhost:3000/api/getusers')
}
}
