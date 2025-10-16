import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { User } from '../../models/users';
import { MessageService } from 'primeng/api';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'eshop-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  SignupFormData!:FormGroup;
  isSubmitted =false;
  authError = false;
  authMessage  = 'Email or Password are wrong';


  constructor(private fb:FormBuilder,
              private usersService: UsersService,
              private messageService:MessageService,
              private router:Router){}

  ngOnInit(): void {
      this.SignupFormData = this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password: ['', Validators.required],
        name:[''],
        phone:[''],
        city:[''],
        apartment:[''],
        street:[''],
        country:[''],
        zip:[''],
        isAdmin:[true]
      })
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.SignupFormData.invalid){
      return
    }
    const signupData = {
      email:this.signupForm['email'].value,
      password:this.signupForm['password'].value,
      name:this.signupForm['name'].value,
      phone:this.signupForm['phone'].value,
      city:this.signupForm['city'].value,
      apartment:this.signupForm['apartment'].value,
      street:this.signupForm['street'].value,
      country:this.signupForm['country'].value,
      zip:this.signupForm['zip'].value,
      isAdmin:this.signupForm['isAdmin'].value
    }
    this._createUser(signupData)
  }

  private _createUser(user:User){
    this.usersService.createUsers(user).subscribe(
      user =>{
        this.messageService.add({
          severity:'success',
          summary:'User successfully created', });
            timer(3500).toPromise().then(()=>{
              this.router.navigate(['/login'])
            })
      },error=>{
        console.error("Failed to create user",error)
        this.messageService.add({
          severity:'error',
          summary:'Failed to create user'})
      }
      )
  }

  get signupForm(){
    return this.SignupFormData.controls;
  }
}

