import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@eshop/users';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit{
  users: User[] = []

  constructor(private usersService: UsersService,
              private messageService:MessageService,
              private confirmationService :ConfirmationService,
              private router:Router
            ){}

  ngOnInit(): void {
      this.getUsers();

  }

  getUsers(){
    this.usersService.getUsers().subscribe((users)=>{
      this.users= users
    })
  }

  deleteUser(userId:string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
    this.usersService.deleteUser(userId).subscribe((response)=>{
      this.getUsers();
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
    },
    reject: () => {console.log("response")}
    });
  }

  editUser(userId:string){
    this.router.navigateByUrl(`users/form/${userId}`)
  }
}
