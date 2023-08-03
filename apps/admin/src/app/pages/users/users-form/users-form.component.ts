import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, UsersService } from '@eshop/users';
import { timer } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnInit{
  form!:FormGroup;
  editMode = false;
  currentId!:string;
  // countries:COUNTRIES;
  countries = [];


  constructor( private fb:FormBuilder,
              private usersService: UsersService,
              private messageService:MessageService,
              private router:Router,
              private activatedRoute:ActivatedRoute){}

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
      isAdmin:['']
    })
    this._checkEditMode();


  }

  private _checkEditMode(){
    this.activatedRoute.params.subscribe(params =>{
      if(params['id']){
        this.editMode = true;
        this.currentId = params['id']
        this.usersService.getUser(this.currentId).subscribe(user =>{
          console.log(user)
          this.usersForm['name'].setValue(user.name)
          this.usersForm['email'].setValue(user.email)
          this.usersForm['phone'].setValue(user.phone)
          this.usersForm['city'].setValue(user.city)
          this.usersForm['apartment'].setValue(user.apartment)
          this.usersForm['street'].setValue(user.street)
          this.usersForm['country'].setValue(user.country)
          this.usersForm['zip'].setValue(user.zip)
          this.usersForm['password'].setValue(user.password)
          this.usersForm['isAdmin'].setValue(user.isAdmin)

        })
      }
    })
  }

  onSubmit(){
    if(this.form.invalid){
      return;
    }

    const user = {
      name:this.usersForm['name'].value,
      email:this.usersForm['email'].value,
      phone:this.usersForm['phone'].value,
      city:this.usersForm['city'].value,
      apartment:this.usersForm['apartment'].value,
      street:this.usersForm['street'].value,
      country:this.usersForm['country'].value,
      zip:this.usersForm['zip'].value,
      password:this.usersForm['password'].value,
      isAdmin:this.usersForm['isAdmin'].value

    }

    if(this.editMode){
      this._updateUser(user);
    }else{
      this._createUser(user)
    }


  }

  private _createUser(user:User){
    this.usersService.createUsers(user).subscribe(
      user =>{
        console.log(user)
        this.messageService.add({
          severity:'success',
          summary:'User successfully created', });

          timer(3500).toPromise().then(()=>{
            this.router.navigate(['/users'])
          })
      },error=>{
        console.error("Failed to create user",error)
        this.messageService.add({
          severity:'error',
          summary:'Failed to create user'})
      }
      )
  }
  private _updateUser(user:User){
    this.usersService.updateUser(this.currentId,user).subscribe(
      user =>{
        console.log(user)
        this.messageService.add({
          severity:'success',
          summary:'User successfully updated', });

          timer(3500).toPromise().then(()=>{
            this.router.navigate(['/users'])
          })
      },error=>{
        console.error("Failed to update user",error)
        this.messageService.add({
          severity:'error',
          summary:'Failed to update use'})
      }
      )
  }
  get usersForm(){
    return this.form.controls
  }
}
