import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],

  declarations: [LoginComponent],
})
export class UsersModule {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('http://localhost:3000/api/getusers');
  }
}
