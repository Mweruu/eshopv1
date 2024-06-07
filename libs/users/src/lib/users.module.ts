import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './+state/users.reducer';
import { UsersEffects } from './+state/users.effects';
import { UsersFacade } from './+state/users.facade';
import { UserDetailsComponent } from './pages/user-details/user-details.component'

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { SignupComponent } from './pages/signup/signup.component';
import { DropdownModule } from 'primeng/dropdown';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputTextModule,
    DividerModule,
    CardModule,
    DropdownModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects]),
  ],

  declarations: [LoginComponent, UserDetailsComponent, SignupComponent],

  providers: [UsersFacade],
  exports:[LoginComponent, UserDetailsComponent, SignupComponent]
})
export class UsersModule {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('https://eshopbackend-nrdd.onrender.com/api//getusers');

  }
}
