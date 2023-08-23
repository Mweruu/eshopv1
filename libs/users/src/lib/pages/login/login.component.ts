import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'eshop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  LoginFormData!:FormGroup;
  isSubmitted =false;
  authError = false;
  authMessage  = 'Email or Password are wrong';


  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private localStorage:LocalstorageService,
              private router:Router){}

  ngOnInit(): void {
      this.LoginFormData = this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password: ['', Validators.required]
      })
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.LoginFormData.invalid){
      return
    }
    const loginData = {
      email:this.loginForm['email'].value,
      password:this.loginForm['password'].value
    }
    this.authService.login(loginData.email, loginData.password).subscribe(user =>{
      console.log(user);
      this.authError = false
      this.localStorage.setToken(user.token)
      console.log(this.localStorage.getToken())

      this.router.navigate(['/'])

    },(error:HttpErrorResponse)=>{
      this.authError = true;
      if(error.status !== 400){
        this.authMessage = 'Error in the server please try again later!';
      }
      console.log(error);
    })
  }

  get loginForm(){
    return this.LoginFormData.controls;
  }
}
