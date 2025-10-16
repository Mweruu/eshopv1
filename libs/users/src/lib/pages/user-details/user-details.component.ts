import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UsersService } from '../../services/users.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { User } from '../../models/users';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'eshop-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit{
  // user!:User;
  myuser:any;
  userId!:string
  form!:FormGroup;
  emailControl= new FormControl('',[ Validators.email, Validators.required]);
  countries:any[] =[];
  isSubmitted = false;
  editMode = false;
  currentId!:string;


  constructor(private usersService: UsersService,
              private fb:FormBuilder,
              private messageService:MessageService,
              private router:Router,
               private activatedRoute:ActivatedRoute,
               private confirmationService :ConfirmationService,
              private localStorage:LocalstorageService
            ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:['', Validators.required],
      email:this.emailControl,
      phone:['', Validators.required],
      city:['', Validators.required],
      apartment:['', Validators.required],
      street:['', Validators.required],
      country:['', Validators.required],
      zip:['', Validators.required],
      password:['', Validators.required],
      isAdmin:[true]
    })
    this.getUsers();
    this._getCountries();
    this._checkEditMode();

  }

  private _getCountries(){
    this.countries = this.usersService.getCountries()

  }

  getUsers(){
    const token = this.localStorage.getToken();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      this.usersService.getUser(tokenDecode.userId).subscribe(user =>{
        this.myuser = user
        if(user.id){this.userId = user.id}
      })
    }
  }
  deleteUser(userId:string){
    // this.confirmationService.confirm({
      // message: 'Do you want to delete this record?',
      // header: 'Delete Confirmation',
      // icon: 'pi pi-info-circle',
      // accept: () => {
    this.usersService.deleteUser(userId).subscribe((response)=>{
      this.localStorage.removeToken();
      window.location.reload();
      this.messageService.add({
        severity:'success',
        summary:'user successfully deleted'
      })
    }, error =>{
      console.log(error)
      this.messageService.add({
        severity:'error',
        summary:'Failed to delete user'
      })
    })
    // },
    // reject: () => {console.log("response")}
    // });
  }

  private _checkEditMode(){
    this.activatedRoute.params.subscribe(params =>{
      const token = this.localStorage.getToken();
      if(token){
        const tokenDecode = JSON.parse(atob(token.split('.')[1]));
        this.usersService.getUser(tokenDecode.userId).subscribe(user =>{
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
    this.isSubmitted =true
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
      this._updateUser(user);

  }

  private _updateUser(user:User){
    this.usersService.updateUser(this.userId,user).subscribe(
      user =>{
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
