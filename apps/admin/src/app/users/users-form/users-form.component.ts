import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '@eshop/users';
import { timer } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnInit{
  form!:FormGroup
  constructor( private fb:FormBuilder,
              private usersService: UsersService,
              private messageService:MessageService,
               private router:Router){}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:['', Validators.required],
      email:['', Validators.required],
      phone:['', Validators.required],
      city:['', Validators.required],
      apartment:['', Validators.required],
      street:['', Validators.required],
      country:['', Validators.required],
      zip:['', Validators.required],
      password:['', Validators.required],

    })
  }

  onSubmit(){
    const user = {
      name:this.usersForm['name'].value,
      email:this.usersForm['email'].value,
      phone:this.usersForm['phone'].value,
      city:this.usersForm['city'].value,
      apartment:this.usersForm['apartment'].value,
      street:this.usersForm['street'].value,
      country:this.usersForm['country'].value,
      zip:this.usersForm['zip'].value,
      password:this.usersForm['password'].value
    }
    if(this.form.invalid){
      return;
    }
    this.usersService.createUsers(user).subscribe(
      user =>{
        console.log(user)
        this.messageService.add({
          severity:'success',
          summary:'User successfully created', });

          timer(3500).toPromise().then(()=>{
            this.router.navigate(['/orders'])
          })
      })
  }

  get usersForm(){
    return this.form.controls
  }
}
