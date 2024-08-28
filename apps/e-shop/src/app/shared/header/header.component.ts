import { Component, OnInit } from '@angular/core';
import { LocalstorageService, UsersService } from '@eshop/users';
import { Router } from '@angular/router';

@Component({
  selector: 'eshop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
  currentId!:string;
  username!:string;
  userId!:string;

  constructor(private usersService: UsersService,
              private localStorage:LocalstorageService,
              private router: Router){}


  ngOnInit(): void {
    this.getCurrentUser()
  }

  getCurrentUser(){
    const token = this.localStorage.getToken();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      this.usersService.getUser(tokenDecode.userId).subscribe(user =>{
        if((user.name || user.email) && user.id ){
          this.username = user.name ? user.name : user.email!;
          this.userId = user.id
        }
      })
    }
  }

  logOut(){
    this.localStorage.removeToken();
    window.location.reload();
    // this.router.navigate(['']);
  }
}
