import { Component, OnInit } from '@angular/core';
import { User, UsersService } from '@eshop/users';

@Component({
  selector: 'admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit{
  users: User[] = []

  constructor(private usersService: UsersService){}

  ngOnInit(): void {
      this.getUsers()
  }

  getUsers(){
    this.usersService.getUsers().subscribe((users)=>{
      this.users= users
      console.log(this.users)
    })
  }
}
